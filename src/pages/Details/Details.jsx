import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';
import Navbar from '../../components/Navbar/Navbar';
import data from '../../data/data';

const Details = () => {
  const { id } = useParams();
  const property = data.properties.find((property) => property.id === Number(id));
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = () => {
    // Lógica para eliminar la propiedad
    console.log('Eliminando propiedad');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los cambios en la propiedad
    console.log(editedProperty);
    setIsEditMode(false);
  };

  return (
    <>
      <Navbar />
      <div className='details-container'>
        <div className='details-card'>
          <h1>{property.name}</h1>
          <div className='details-card-image'>
            <img src={property.image} alt={property.name} />
          </div>
          <div className='details-card-content-container'>
            <div className='detail-content'>
              <label>Status:</label>
              {isEditMode ? (
                <input
                  type='text'
                  name='status'
                  value={editedProperty.status}
                  onChange={handleChange}
                  placeholder={editedProperty.status}
                />
              ) : (
                <p>{property.status}</p>
              )}
            </div>
            <div className='detail-content'>
              <label>Address:</label>
              {isEditMode ? (
                <input
                  type='text'
                  name='address'
                  value={editedProperty.address}
                  onChange={handleChange}
                  placeholder={editedProperty.address}
                />
              ) : (
                <p>{property.address}</p>
              )}
            </div>
            <div className='detail-content'>
              <label>City:</label>
              {isEditMode ? (
                <input
                  type='text'
                  name='city'
                  value={editedProperty.city}
                  onChange={handleChange}
                  placeholder={editedProperty.city}
                />
              ) : (
                <p>{property.city}</p>
              )}
            </div>
            <div className='detail-content'>
              <label>Area:</label>
              {isEditMode ? (
                <input
                  type='text'
                  name='area'
                  value={editedProperty.area}
                  onChange={handleChange}
                  placeholder={editedProperty.area}
                />
              ) : (
                <p>{property.area}</p>
              )}
            </div>
            <div className='detail-content'>
              <label>Characteristics:</label>
              {isEditMode ? (
                <input
                  type='text'
                  name='characteristics'
                  value={editedProperty.characteristics}
                  onChange={handleChange}
                  placeholder={editedProperty.characteristics}
                />
              ) : (
                <p>{property.characteristics}</p>
              )}
            </div>
          </div>
          <div className='details-card-buttons'>
            {isEditMode ? (
              <button className='details-card-save' onClick={handleSubmit}>
                Guardar
              </button>
            ) : (
              <button className='details-card-edit' onClick={handleEdit}>
                Editar
              </button>
            )}
            <button className='details-card-delete' onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
