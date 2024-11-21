import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Auth/firebaseConfig";
import { IStoreUser } from "../utils/interface";

export const storeUserData = async ({
  data,
  collectionName,
  customId,
}: IStoreUser) => {
  const docRef = doc(db, collectionName, customId);
  return await setDoc(docRef, data);
};
export const getDataById = async (
  id: string,
  collectionName: string
): Promise<DocumentData> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Promise.resolve(docSnap.data());
    } else {
      console.log("No such document!");
      return Promise.reject("data not found"); // Or handle this case as needed
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
