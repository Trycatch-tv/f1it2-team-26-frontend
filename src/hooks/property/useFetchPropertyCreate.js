import Swal from "sweetalert2";
import { propertyApi } from "../../api/propertyApi";
import { useUploadFile } from "../useUploadFile";
import { useState } from "react";


const { REACT_APP_API_URL } = propertyApi();

const useFetchPropertyCreate = () => {
  const {saveFile} = useUploadFile();
  const [isLoadingSaveCreate, setIsLoadingSaveCreate] = useState(false);
  
  

  const submitForm = async (form, imageInputRef, secret, getAllProperties) => {
    setIsLoadingSaveCreate(true);
    
    const file = imageInputRef.current.files[0];
    const urlImage = await saveFile(file,secret);

    const formData = {
      property_name: form.name,
      property_type: form.type,
      property_sale: form.sale,
      state: form.state,
      address: form.address,
      city: form.city,
      area_size: form.area,
      price: form.price,
      characteristics: form.characteristics,
      description: form.description,
      image: urlImage,
    };


    await fetch(`${REACT_APP_API_URL}/property/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Agregar propiedad",
          text: "Propiedad agregada exitosamente",
          icon: "success",
        }).then(() => {
          getAllProperties();
          setIsLoadingSaveCreate(false);
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.message
          : "No se pudo agregar la propiedad";
        Swal.fire({
          title: "Agregar propiedad",
          text: errorMessage,
          icon: "error",
        }).then(()=> {
          setIsLoadingSaveCreate(false);
        });
      });
  };

  return {
    isLoadingSaveCreate,
    
    submitForm
  };
};

export default useFetchPropertyCreate;
