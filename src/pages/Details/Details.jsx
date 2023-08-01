import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../../components/Navbar/Navbar';
import Map from '../Map/Map';
import useFetchMap from '../../hooks/useFecthMap';
import useForm from '../../hooks/useForm';
import { useFetchProperty } from '../../hooks/property';
import useFetchPropertyDelete from '../../hooks/property/useFetchPropertyDelete';
import useFetchPropertyEdit from '../../hooks/property/useFetchPropertyEdit';


const Details = () => {
  const { id } = useParams();
  const { property, addressProperty} = useFetchProperty(id);
  const { isEditMode, editedProperty, handleEdit, handleComeBack, submitForm} = useFetchPropertyEdit(property,id);
  const { handleDelete } = useFetchPropertyDelete(id);
  const { searchLocation, handleUbication, address } = useFetchMap();
  const { form , errors ,handleChange, onResetForm } = useForm(editedProperty);

  useEffect(() => {
    if (!addressProperty) return;
    searchLocation(addressProperty);
  }, [addressProperty]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(form);
  };

  const handleCancel = () =>{
    handleComeBack();
    onResetForm();
  }

  return (
    <>
      <Navbar isBtnReturnVisble={true} />
      <div className="details-container">
        <div className="details-card">
          <h1>{property.property_name}</h1>
          <div className="details-header">
            <div className="details-card-image">
              <img src={property.image} alt={property.property_name} />
            </div>
            <div className="details-card-map">
              {address && <Map latitude={address.lat} longitude={address.lon} />}
              {address && (
                <button className="btn-ubication" onClick={handleUbication}>
                  Como llegar
                </button>
              )}
            </div>
          </div>
          <div className="details-card-content-container">
            <div className="detail-content">
              <label>Nombre:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="property_name"
                  value={form.property_name}
                  onChange={handleChange}
                  placeholder={property.property_name}
                  required
                />
              ) : (
                <p>{property.property_name}</p>
              )}
              { isEditMode && errors.property_name && (
                <span className="form-validation">{errors.property_name}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Tipo:</label>
              {isEditMode ? (
                <select className="option" id="type" name="property_type" value={form.property_type} onChange={handleChange} required>
                  <option value="" disabled>
                    Seleccione un tipo de propiedad
                  </option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                </select>
              ) : (
                <p>{property.property_type}</p>
              )}
               { isEditMode && errors.property_type && (
                <span className="form-validation">{errors.property_type}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Estado:</label>
              {isEditMode ? (
                <select className="option" id="sale" name="property_sale" value={form.property_sale} onChange={handleChange} required>
                  <option value="" disabled>
                    Seleccione el tipo de operacion
                  </option>
                  <option value="venta">En venta</option>
                  <option value="arriendo">En arriendo</option>
                </select>
              ) : (
                <p>{property.property_sale === 'venta' ? 'En venta' : 'Arrendamiento'}</p>
              )}
               { isEditMode && errors.property_sale && (
                <span className="form-validation">{errors.property_sale}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Proceso:</label>
              {isEditMode ? (
                <select className="option" id="state" name="state" value={form.state} onChange={handleChange} required>
                  <option value="" disabled>
                    Seleccione un estado
                  </option>
                  <option value="activa">Disponible</option>
                  <option value="inactiva">No disponible</option>
                </select>
              ) : (
                <p>{property.state === 'activa' ? 'Disponible' : 'No disponible'}</p>
              )}
               { isEditMode && errors.state && (
                <span className="form-validation">{errors.state}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Dirección:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder={property.address}
                  required
                />
              ) : (
                <p>{property.address}</p>
              )}
               { isEditMode && errors.address && (
                <span className="form-validation">{errors.address}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Ciudad:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder={property.city}
                  required
                />
              ) : (
                <p>{property.city}</p>
              )}
               { isEditMode && errors.city && (
                <span className="form-validation">{errors.city}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Área:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="area_size"
                  value={form.area_size}
                  onChange={handleChange}
                  placeholder={property.area_size}
                  required
                />
              ) : (
                <p>{property.area_size} mt2</p>
              )}
               { isEditMode && errors.area_size && (
                <span className="form-validation">{errors.area_size}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Precio:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder={property.price}
                />
              ) : (
                <p>{property.price} $</p>
              )}
               { isEditMode && errors.price && (
                <span className="form-validation">{errors.price}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Características:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="characteristics"
                  value={form.characteristics}
                  onChange={handleChange}
                  placeholder={property.characteristics}
                  required
                />
              ) : (
                <p>{property.characteristics}</p>
              )}
               { isEditMode && errors.characteristics && (
                <span className="form-validation">{errors.characteristics}</span>
              )}
            </div>
            <div className="detail-content">
              <label>Descripción:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={property.description}
                  required
                />
              ) : (
                <p>{property.description}</p>
              )}
               { isEditMode && errors.description && (
                <span className="form-validation">{errors.description}</span>
              )}
            </div>
          </div>
          <div className="details-card-buttons">
            {isEditMode ? (
              <button className={Object.keys(errors).length > 0 ? 'details-card-save--deshabilitated' : 'details-card-save'} onClick={handleSubmit} disabled={Object.keys(errors).length > 0} >
                Guardar
              </button>
            ) : (
              <button className="details-card-edit" onClick={handleEdit}>
                Editar
              </button>
            )}
            {isEditMode ? (
              <button className="details-card-delete" onClick={handleCancel}>
                Cancelar
              </button>
            ) : (
              <button className="details-card-delete" onClick={handleDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
