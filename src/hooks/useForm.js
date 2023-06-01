import { useState } from "react";
import Swal from "sweetalert2";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const err = onValidate(form);
    if (err === null) {
      fetch('http://localhost:8080/api/v1/property/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          image: form.image
        })
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
        Swal.fire({
          title: 'Agregar propiedad',
          text: 'No se pudo agregar la propiedad',
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
