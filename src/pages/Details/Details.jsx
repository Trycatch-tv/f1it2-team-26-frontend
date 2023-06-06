import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../../components/Navbar/Navbar';
import { useFetchGetProperty } from '../../hooks/useFetchProperty';
import useFetchPropertyDelete from '../../hooks/useFetchPropertyDelete';
import Map from '../Map/Map';
import useFetchPropertyEdit  from '../../hooks/useFetchPropertyEdit';
import useFetchMap from '../../hooks/useFecthMap';

const Details = () => {
  const { id } = useParams();
  const { property, addressProperty } = useFetchGetProperty(id);
  const { isEditMode, editedProperty, handleChange, handleEdit, handleComeBack, handleSubmit } = useFetchPropertyEdit(property,id);
  const { handleDelete } = useFetchPropertyDelete(id);
  const {searchLocation, handleUbication, address} = useFetchMap();

  useEffect(() => {
    if(addressProperty !== null && addressProperty !== undefined){
      searchLocation(addressProperty);
    }
  },[addressProperty])

  
  return (
    <>
      <Navbar isBtnReturnVisble={true} />
      <div className="details-container">
        <div className="details-card">
          <h1>{property.property_name}</h1>
          <div className='details-header'>
            <div className="details-card-image">
              <img src={property.image} alt={property.property_name} />
            </div>
            <div className='details-card-map'>
              {address != null && <Map latitude={address.lat} longitude={address.lon} />}
              {address != null && <button className='btn-ubication' onClick={handleUbication} >Como llegar</button>}
            </div>
          </div>
          <div className="details-card-content-container">
            <div className="detail-content">
              <label>Nombre:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="property_name"
                  value={editedProperty.property_name}
                  onChange={handleChange}
                  placeholder={property.property_name}
                />
              ) : (
                <p>{property.property_name}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Tipo:</label>
              {isEditMode ? (
                <select className="option" id="type" name="property_type" value={editedProperty.property_type} onChange={handleChange}>
                <option value='' disabled>
                  Seleccione un tipo de propiedad
                </option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
              </select>
              ) : (
                <p>{property.property_type}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Estado:</label>
              {isEditMode ? (
                <select className="option" id="sale" name="property_sale" value={editedProperty.property_sale} onChange={handleChange}>
                <option value="" disabled>
                  Seleccione el tipo de operacion
                </option>
                <option value="venta">En venta</option>
                <option value="arriendo">En arriendo</option>
              </select>
              ) : (
                <p>{property.property_sale === 'venta' ? 'En venta' : 'Arrendamiento'}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Proceso:</label>
              {isEditMode ? (
                <select className="option" id="state" name="state" value={editedProperty.state} onChange={handleChange}>
                <option value="" disabled>
                  Seleccione un estado
                </option>
                <option value="activa">Disponible</option>
                <option value="inactiva">No disponible</option>
              </select>
              ) : (
                <p>{property.state === 'activa' ? 'Disponible' : 'No disponible'}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Dirección:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="address"
                  value={editedProperty.address}
                  onChange={handleChange}
                  placeholder={property.address}
                />
              ) : (
                <p>{property.address}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Ciudad:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="city"
                  value={editedProperty.city}
                  onChange={handleChange}
                  placeholder={property.city}
                />
              ) : (
                <p>{property.city}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Área:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="area_size"
                  value={editedProperty.area_size}
                  onChange={handleChange}
                  placeholder={property.area_size}
                />
              ) : (
                <p>{property.area_size} mt2</p>
              )}
            </div>
            <div className="detail-content">
              <label>Precio:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="price"
                  value={editedProperty.price}
                  onChange={handleChange}
                  placeholder={property.price}
                />
              ) : (
                <p>{property.price} $</p>
              )}
            </div>
            <div className="detail-content">
              <label>Características:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="characteristics"
                  value={editedProperty.characteristics}
                  onChange={handleChange}
                  placeholder={property.characteristics}
                />
              ) : (
                <p>{property.characteristics}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Descripcion:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="description"
                  value={editedProperty.description}
                  onChange={handleChange}
                  placeholder={property.description}
                />
              ) : (
                <p>{property.description}</p>
              )}
            </div>
          </div>
          <div className="details-card-buttons">
  {isEditMode ? (
    <button className="details-card-save" onClick={handleSubmit}>
      Guardar
    </button>
  ) : (
    <button className="details-card-edit" onClick={handleEdit}>
      Editar
    </button>
  )}
  {isEditMode ? (
    <button className="details-card-delete" onClick={handleComeBack}>
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
