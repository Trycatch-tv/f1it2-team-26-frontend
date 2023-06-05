import { useState } from "react";
import Swal from "sweetalert2";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const submitForm = () => {
    const validationErrors = onValidate(form);
    if (validationErrors === null) {
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
  
      fetch('http://localhost:8080/api/v1/property/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire({
            title: 'Agregar propiedad',
            text: 'Propiedad agregada exitosamente',
            icon: 'success',
          });
        })
        .catch((err) => {
          const errorMessage = err.response ? err.response.data.message : 'No se pudo agregar la propiedad';
          Swal.fire({
            title: 'Agregar propiedad',
            text: errorMessage,
            icon: 'error',
          });
          console.log(err);
        });
    } else {
      setErrors(validationErrors);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  return { form, errors, handleChange, handleSubmit };
};

export default useForm;
