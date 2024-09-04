import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { updateProfile } from "firebase/auth";

export const uploadProfilePicture = async (file, user) => {
  const fileRef = ref(storage, `profile-pictures/${user.uid}.png`);

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);
  updateProfile(user, { photoURL: url });

  return url;
};

export const getProfilePicture = async (userId) => {
  try {
    const fileRef = ref(storage, `profile-pictures/${userId}.png`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    return null;
  }
};
