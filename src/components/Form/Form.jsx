import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import "./Form.css";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import useFetchPropertyCreate from "../../hooks/property/useFetchPropertyCreate";


const property = {
  name: "",
  type: "",
  sale: "",
  state: "",
  address: "",
  city: "",
  area: "",
  price: "",
  characteristics: "",
  description: "",
  image: "",
};


const Form = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [secret] = useState(v4);
  const { form, errors, handleChange } = useForm(property);
  const {submitForm} = useFetchPropertyCreate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const refImage = `propertys/${secret}`;
      const storageRef = ref(storage, refImage);
      uploadBytesResumable(storageRef, file).then((reference) => {
        getDownloadURL(reference.ref).then((url) => {
          handleChange({ target: { name: "image", value: url } });
        });
      });
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(form);
  };
  
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-input">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="textarea" id="name" name="name" value={form.name} onChange={handleChange}/>
              {errors.name && (
                <span className="form-validation">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo:</label>
              <select className="option" id="type" name="type" value={form.type} onChange={handleChange} >
                <option value="" disabled>
                  Seleccione un tipo de propiedad
                </option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
              </select>
              {errors.type && (
                <span className="form-validation">{errors.type}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="sale">Operación:</label>
              <select className="option" id="sale" name="sale" value={form.sale} onChange={handleChange} >
                <option value="" disabled>
                  Seleccione el tipo de operación
                </option>
                <option value="venta">En venta</option>
                <option value="arriendo">En arriendo</option>
              </select>
              {errors.sale && (
                <span className="form-validation">{errors.sale}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">Estado:</label>
              <select className="option" id="state" name="state" value={form.state} onChange={handleChange} >
                <option value="" disabled>
                  Seleccione un estado
                </option>
                <option value="activa">Disponible</option>
                <option value="inactiva">No disponible</option>
              </select>
              {errors.state && (
                <span className="form-validation">{errors.state}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección:</label>
              <input className="textarea" id="address" name="address" value={form.address} onChange={handleChange} />
              {errors.address && (
                <span className="form-validation">{errors.address}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad:</label>
              <input className="textarea" id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && (
                <span className="form-validation">{errors.city}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="comment">Área:</label>
              <input type="number" className="textarea" id="area" name="area" value={form.area} onChange={handleChange} />
              {errors.area && (
                <span className="form-validation">{errors.area}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio:</label>
              <input type="number" className="textarea" id="price" name="price" value={form.price} onChange={handleChange} />
              {errors.price && (
                <span className="form-validation">{errors.price}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="characteristics">Características:</label>
              <input className="textarea" id="characteristics" name="characteristics" value={form.characteristics} onChange={handleChange}  />
              {errors.characteristics && (
                <span className="form-validation">
                  {errors.characteristics}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <input className="textarea" id="description" name="description" value={form.description} onChange={handleChange} />
              {errors.description && (
                <span className="form-validation">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="form-image">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange}  />
            {errors.image && (
              <span className="form-validation">{errors.image}</span>
            )}
          </div>
        </div>

        <button className={Object.keys(errors).length > 0 ? 'form-btn-register--deshabilitated' : 'form-btn-register--habilitated'} type="submit" disabled={Object.keys(errors).length > 0}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Form;
