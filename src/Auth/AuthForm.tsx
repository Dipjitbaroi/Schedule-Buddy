import { useFormik } from "formik";
import { useLocation } from "react-router";
import { IAuthFromInitialValue } from "../utils/interface";
import * as Yup from 'yup';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const initialValues: IAuthFromInitialValue = {
    name: '',
    email: '',
    password: '',
    image: null
}
const validationSchemaForSignup = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Please give a valid email'),
    password: Yup.string().required('Password is required').min(8, 'Minimum length is 8 '),
    image: Yup.mixed().required('Profile image is required')
})
const validationSchemaForLogin = Yup.object({
    email: Yup.string().required('Email is required').email('Please give a valid email'),
    password: Yup.string().required('Password is required').min(8, 'Minimum length is 8 '),
})
const AuthForm = () => {
    const location = useLocation();
    const { signUp, login, isLoading } = useContext(AuthContext)


    const formik = useFormik<IAuthFromInitialValue>({
        initialValues,
        validationSchema: location?.pathname === '/sign-up' ? validationSchemaForSignup : validationSchemaForLogin,
        onSubmit: async (values) => {

            try {
                const res = location?.pathname === '/sign-up' && signUp ? await signUp(values) : login ? await login(values) : null
                console.log(res);

                formik.resetForm()

            } catch (error) {
                console.log(error);

            }




        }
    })


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[1em]" >
            {location.pathname === '/sign-up' ? <div className="from-control">
                <label className="input input-bordered flex items-center gap-2 bg-[#EFF3FF] !outline-[#d0ddff]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        name="name"
                        type="text"
                        className="grow text-gray-500"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                </label>
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-[12px] mt-1">{formik.errors.name}</div>
                ) : null}
            </div> : <></>}
            <div className="from-control">
                <label className="input input-bordered flex items-center gap-2 bg-[#EFF3FF] !outline-[#d0ddff]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="email"
                        name="email"
                        className="grow text-gray-500" placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                </label>
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-[12px] mt-1">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="form-control ">
                <label className="input input-bordered flex items-center gap-2 bg-[#EFF3FF] !outline-[#d0ddff]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="grow text-gray-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </label>
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-[12px] mt-1">{formik.errors.password}</div>
                ) : null}
            </div>
            {location.pathname === '/sign-up' ? <label className="form-control w-full">
                <div className="label !mt-0 !pt-0">
                    <span className="label-text">Upload your profile picture</span>
                </div>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full file-input-primary bg-[#EFF3FF] !outline-[#d0ddff]"
                    name="image"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => {
                        if (e.target.files) {
                            formik.setFieldValue('image', e.target.files[0])
                        }
                    }}
                    onBlur={formik.handleBlur} />
                {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-500 text-[12px] mt-1">{formik.errors.image}</div>
                ) : null}
            </label> : <></>}
            <div className="form-control">
                <button
                    className="btn btn-primary text-white"
                    type="submit"
                >{location.pathname === '/sign-up' ? 'Create account' : 'Login'}{isLoading ? <span className="loading loading-spinner loading-sm"></span> : ""}</button>
            </div>
        </form>
    );
}

export default AuthForm;