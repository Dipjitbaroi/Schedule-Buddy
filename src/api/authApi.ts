import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IStoreData, IUploadProfileImage } from "../utils/interface";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Auth/firebaseConfig";

export const uploadProfilePicture = async ({
  image,
  uid,
}: IUploadProfileImage): Promise<string> => {
  if (image) {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${uid}/profile_picture`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  } else {
    return Promise.reject("No image provided");
  }
};

export const storeData = async ({ data, collectionName }: IStoreData) => {
  return await addDoc(collection(db, collectionName), data);
};
