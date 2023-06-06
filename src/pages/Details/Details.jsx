import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../../components/Navbar/Navbar';
import { useFetchGetProperty } from '../../hooks/useFetchProperty';
import Swal from 'sweetalert2';
import Map from '../Map/Map';
import useFetchPropertyEdit  from '../../hooks/useFetchPropertyEdit';

const Details = () => {
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const { property, addressProperty } = useFetchGetProperty(id);
  const { isEditMode, editedProperty, handleChange, handleEdit, handleComeBack, handleSubmit } = useFetchPropertyEdit(property);
  

  const handleDelete = () => {
    Swal.fire({
      title: 'Eliminar Propiedad',
      text: '¿Está seguro de eliminar esta propiedad?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/v1/property/deleteproperty/${id}`, { method: 'DELETE' })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                title: 'Eliminar propiedad',
                text: 'Propiedad eliminada exitosamente',
                icon: 'success',
              });
            } else {
              throw new Error('Error al eliminar la propiedad');
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: 'Eliminar propiedad',
              text: 'Ha ocurrido un error. No se pudo eliminar esta propiedad',
              icon: 'error',
            });
          });
      }
    });
  };
  

  useEffect(() => {
    if(addressProperty !== null && addressProperty !== undefined){
      searchLocation(addressProperty);
    }
  },[addressProperty])

  const searchLocation = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setAddress(data[0]);
        } else {
          console.error('No se encontraron coordenadas para la ubicación especificada.');
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  const handleUbication = () => {
    if(address !=null){
      window.open(`https://www.google.com.ec/maps/dir//${address.lat},${address.lon}/@${address.lat},${address.lon},21z?hl=es&entry=ttu`, '_blanck')
    }
  }
  
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
