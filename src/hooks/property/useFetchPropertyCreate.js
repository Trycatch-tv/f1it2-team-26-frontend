import Swal from "sweetalert2";
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

const useFetchPropertyCreate = () => {
  const submitForm = async (form) => {
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
      image: form.image,
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
        }).then(() => window.location.reload());
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.message
          : "No se pudo agregar la propiedad";
        Swal.fire({
          title: "Agregar propiedad",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  return {
    submitForm,
  };
};

export default useFetchPropertyCreate;
