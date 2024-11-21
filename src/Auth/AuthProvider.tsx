import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { IAuthFromInitialValue, IAuthContext, IUserData } from "../utils/interface";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, AuthError, onAuthStateChanged, signOut } from "firebase/auth";
import { app, } from "./firebaseConfig";
import { uploadProfilePicture } from "../api/authApi";
import { getDataById, storeUserData } from "../api/userApi";
import toast from "react-hot-toast";
import usePersistentState from "../hooks/usePersistentState";

const defaultAuthContext: IAuthContext = {
    user: null,
    login: async () => {
        throw new Error("Not implemented");
    },
    signUp: async () => {
        throw new Error("Not implemented");
    },
    signOut: () => { },
    isLoading: false,
    setIsLoading: () => { },
    authStatus: "unauthenticated",
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<IUserData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [authStatus, setAuthStatus] = usePersistentState<'authenticated' | 'unauthenticated'>('authStatus', 'unauthenticated')
    console.log('authStatus', authStatus);

    const auth = getAuth()
    const location = window.location.pathname

    const login = useCallback(({ email, password }: IAuthFromInitialValue) => {
        setIsLoading(true)
        const loginRes = new Promise<UserCredential>((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password).then((data) => {
                resolve(data)
                setAuthStatus('authenticated')
                toast.success('Login Successfully')
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
                reject(error)
            })
        })

        return loginRes
    }, [auth]);


    const signUp = useCallback(({ email, password, name, image }: IAuthFromInitialValue) => {
        const signUpResponse = new Promise<UserCredential>((resolve, reject) => {
            setIsLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const { uid } = userCredential.user
                    uploadProfilePicture({ uid, image }).then((imageUrl) => {
                        storeUserData({ collectionName: 'users', data: { uid, email, name, profilePicture: imageUrl }, customId: uid }).then(() => {
                            setIsLoading(false)
                            resolve(userCredential)
                            getDataById(uid, 'users').then((data) => {
                                setAuthStatus('authenticated')
                                toast.success('Register Successfully')
                                setUser({ ...data, id: data?.uid } as IUserData)

                            }).catch((error) => {
                                setAuthStatus('unauthenticated')
                                toast.error(error.message)
                                console.log({ error });

                            })
                        }).catch((error) => {
                            setIsLoading(false)
                            toast.error(error.message)
                            reject(error)
                        })
                    }).catch((error) => {
                        console.log(error);
                        setIsLoading(false)
                        toast.error(error.message)
                        reject(error)
                    })

                })
                .catch((_error) => {
                    setIsLoading(false)
                    toast.error(_error.message)
                    const error = _error as AuthError;
                    reject(error);
                });
        });

        return signUpResponse;
    }, [auth]);

    const signOutFun = useCallback(async () => {
        return await signOut(auth).then(() => {
            setUser(null)
            setAuthStatus('unauthenticated')
        })
    }, [auth]);
    useEffect(() => {
        const getCurrentUser = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;

                    getDataById(uid, 'users').then((data) => {
                        setAuthStatus('authenticated')
                        setUser({ ...data, id: data?.uid } as IUserData)

                    }).catch((error) => {
                        setAuthStatus('unauthenticated')
                        console.log({ error });

                    })

                } else {
                    setAuthStatus('unauthenticated')
                }
            });

        }
        return () => {
            getCurrentUser()
        }
    }, [auth, location])
    const authContextValue = useMemo(
        () =>
        ({
            user,
            authStatus,
            isLoading,
            login,
            signUp,
            signOut: signOutFun,
            setIsLoading,
            setUser,
            setAuthStatus,
        } as IAuthContext),
        [user, isLoading, login, signUp, signOutFun, setIsLoading, authStatus]
    );



    return (app ? <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider> : <></>);
}

export default AuthProvider;