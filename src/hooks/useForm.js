import { useEffect, useState } from "react";

const useForm = (initialData ={}) => {
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
  
  
  useEffect(() => {
    const validationErrors = onValidate(form);
    if(validationErrors !== null) setErrors(validationErrors);
  }, [form])
  

  const onValidate = (form) => {
    const errors = {};
    
    Object.keys(form).forEach((field) => {
      if (!form[field].trim()) {
        errors[field] = `El campo no debe estar vacío`;
      } 
    });
    
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const onResetForm = () => {
    setForm(initialData);
  }


  return { form, errors, handleChange, onResetForm };
};

export default useForm;
