import { useState } from "react";
import Swal from "sweetalert2";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const err = onValidate(form);
    if (err === null) {
      const formData = new FormData();
      formData.append('property_name', form.name);
      formData.append('property_type', form.type);
      formData.append('property_sale', form.sale);
      formData.append('state', form.state);
      formData.append('address', form.address);
      formData.append('city', form.city);
      formData.append('area_size', form.area);
      formData.append('price', form.price);
      formData.append('characteristics', form.characteristics);
      formData.append('description', form.description);
      formData.append('image', form.image);
  
      fetch('http://localhost:8080/api/v1/property/create', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
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
    } 
    else {
      setErrors(err);
    }
  };
  

  return { form, errors, handleChange, handleSubmit }
}

export default useForm;
