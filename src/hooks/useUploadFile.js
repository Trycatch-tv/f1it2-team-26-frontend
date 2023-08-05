import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase";

export const useUploadFile = () => {
  const [imagePreview, setImagePreview] = useState("");

  const uploadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveFile = async (file, secret) => {
    if (!file) return "";
    const refImage = `propertys/${secret}`;
    const storageRef = ref(storage, refImage);
    
    try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Se produjo un error cargando el archivo:", error);
    }
  };

  const onResetPreview = () =>{
    setImagePreview("");
  }

  return {
    imagePreview,

    uploadFile,
    saveFile,
    onResetPreview
  };
};