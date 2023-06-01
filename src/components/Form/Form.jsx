import React, { useReducer, useState } from 'react';
import useForm from '../../hooks/useForm';
import './Form.css';

const property = {
  name: '',
  type: '',
  sale: '',
  state: '',
  address: '',
  city: '',
  area: '',
  price: '',
  characteristics: '',
  description: '',
  image: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return property;
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, property);
  const [imagePreview, setImagePreview] = useState('');

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   dispatch({
  //     type: 'updateField',
  //     field: 'image',
  //     value: file,
  //   });

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview('');
  //   }
  // };

  const onValidate = (form) => {
    let isError = false;
    let errors = {};

    if (!form.name.trim()) {
      errors.name = 'El campo nombre no puede ser vacio';
      isError = true;
    }

    if (form.type.length === 0) {
      errors.type = 'Debe seleccionar el tipo de propiedad';
      isError = true;
    }

    if (!form.sale.trim()) {
      errors.sale = 'Debe seleccionar una operacion';
      isError = true;
    }

    if (!form.state.trim()) {
      errors.state = 'Debe seleccionar un estado';
      isError = true;
    }

    if (!form.address.trim()) {
      errors.address = 'El campo dirreccion no debe estar vacio';
      isError = true;
    }

    if (!form.city.trim()) {
      errors.city = 'El campo ciudad no debe estar vacio';
      isError = true;
    }
    if (!form.area.trim()) {
      errors.area = 'El campo area no debe estar vacio';
      isError = true;
    }

    if (!form.price.trim()) {
      errors.price = 'El campo precio no debe estar vacio';
      isError = true;
    }

    if (!form.characteristics.trim()) {
      errors.characteristics = 'El campo caracteristicas no debe estar vacio';
      isError = true;
    }

    if (!form.description.trim()) {
      errors.description = 'El campo descripcion no debe estar vacio';
      isError = true;
    }

    if (!form.image.trim()) {
      errors.image = 'Debe seleccionar una imagen';
      isError = true;
    }

    return isError ? errors : null;
  };

  const { form, errors, handleChange, handleSubmit } = useForm(property, onValidate);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-input">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="textarea" id="name" name="name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="form-validation">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo:</label>
              <select className="option" id="type" name="type" value={form.type} onChange={handleChange}>
                <option defaultValue="" disabled>
                  Seleccione un tipo de propiedad
                </option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
              </select>
              {errors.type && <span className="form-validation">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="sale">Operacion:</label>
              <select className="option" id="sale" name="sale" value={form.sale} onChange={handleChange}>
                <option defaultValue="" disabled>
                  Seleccione el tipo de operacion
                </option>
                <option value="venta">En venta</option>
                <option value="arriendo">En arriendo</option>
              </select>
              {errors.sale && <span className="form-validation">{errors.sale}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">Estado:</label>
              <select className="option" id="state" name="state" value={form.state} onChange={handleChange}>
                <option defaultValue="" disabled>
                  Seleccione un estado
                </option>
                <option value="activa">Disponible</option>
                <option value="inactiva">No disponible</option>
              </select>
              {errors.state && <span className="form-validation">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Direccion:</label>
              <input className="textarea" id="address" name="address" value={form.address} onChange={handleChange} />
              {errors.address && <span className="form-validation">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad:</label>
              <input className="textarea" id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && <span className="form-validation">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="comment">Area:</label>
              <input
                type="number"
                className="textarea"
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
              />
              {errors.area && <span className="form-validation">{errors.area}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio:</label>
              <input
                type="number"
                className="textarea"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              {errors.price && <span className="form-validation">{errors.price}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="characteristics">Caracteristicas:</label>
              <input
                className="textarea"
                id="characteristics"
                name="characteristics"
                value={form.characteristics}
                onChange={handleChange}
              />
              {errors.characteristics && <span className="form-validation">{errors.characteristics}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripcion:</label>
              <input
                className="textarea"
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              {errors.description && <span className="form-validation">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="image">Imagen:</label>
              <input className="textarea" id="image" name="image" value={form.image} onChange={handleChange} />
              {errors.image && <span className="form-validation">{errors.image}</span>}
            </div>
          </div>

          {/* <div className="form-image">
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            {errors.image && <span className="form-validation">{errors.image}</span>}
          </div> */}
        </div>

        <button className="form-btn" type="submit" disabled={!errors === []}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Form;
