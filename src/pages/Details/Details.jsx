import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';
import Navbar from '../../components/Navbar/Navbar';
import { useFetchGetProperty } from '../../hooks/useFetchProperty';
import Swal from 'sweetalert2';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property } = useFetchGetProperty(id);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedProperty(property);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Editar Propiedad',
      text: '¿Esta seguro de editar esta propiedad?',
      icon: 'question',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Editar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/v1/property/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProperty),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: 'editar propiedad',
              text: 'Propiedad editada exitosamente',
              icon: 'success',
            });
            navigate('/');
          })
          .catch(
            Swal.fire({
              title: 'Editar propiedad',
              text: 'Ha ocurrido un error, No se pudo editar esta propiedad',
              icon: 'error',
            }),
          );
      }
    });

    console.log(editedProperty);
    // setIsEditMode(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Eliminar Propiedad',
      text: '¿Esta seguro de eliminar esta propiedad?',
      icon: 'question',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/v1/property/deleteproperty/${id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: 'Eliminar propiedad',
              text: 'Propiedad eliminada exitosamente',
              icon: 'success',
            });
            navigate('/');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Eliminar propiedad',
              text: 'Ha ocurrido un error, No se pudo eliminar esta propiedad',
              icon: 'error',
            });
          });
      }
    });
  };

  const handleComeBack = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Navbar isBtnReturnVisble={true} />
      <div className="details-container">
        <div className="details-card">
          <h1>{property.property_name}</h1>
          <div className="details-card-image">
            <img src={property.image} alt={property.property_name} />
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
                <input
                  type="text"
                  name="type"
                  value={editedProperty.property_type}
                  onChange={handleChange}
                  placeholder={property.property_type}
                />
              ) : (
                <p>{property.property_type}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Estado:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="state"
                  value={editedProperty.state}
                  onChange={handleChange}
                  placeholder={property.state}
                />
              ) : (
                <p>{property.state === 'activa' ? 'Disponible' : 'No disponible'}</p>
              )}
            </div>
            <div className="detail-content">
              <label>Proceso:</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="sale"
                  value={editedProperty.property_sale}
                  onChange={handleChange}
                  placeholder={property.property_sale}
                />
              ) : (
                <p>{property.property_sale === 'venta' ? 'En venta' : 'Arrendamiento'}</p>
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
                  name="area"
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
            <button className="details-card-delete" onClick={handleDelete}>
              Eliminar
            </button>
            <button className="details-card-back" onClick={handleComeBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
