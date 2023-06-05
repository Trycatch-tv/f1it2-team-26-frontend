import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Form from '../../components/Form/Form';
import { useFetchListProperties } from '../../hooks/useFetchProperties';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showAllProperties, setShowAllProperties] = useState(true);
  const { properties} = useFetchListProperties();

  const handleFilterStatus = (status) => {
    if (status === filterStatus) {
      setFilterStatus('');
      setShowAllProperties(true);
    } else {
      setFilterStatus(status);
      setShowAllProperties(false);
    }
  };

  const handleToggleFilterButtons = () => {
    setShowFilterButtons(!showFilterButtons);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const changeShowForm = () => {
    setShowForm(!showForm);
  };

  const filteredProperties = showAllProperties
    ? properties
    : properties.filter((property) => {
        if (filterStatus === '') return true;
        return property.property_sale === filterStatus;
      });

  const filteredPropertiesBySearch = filteredProperties.filter((property) =>
    property.property_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Navbar isBtnCreateVisible={true} changeShowForm={changeShowForm} />
      {showForm && <Form />}
      <div className="filter-buttons">
        <button onClick={handleToggleFilterButtons}>Filtrar</button>
        {showFilterButtons && (
          <div className="filter-dropdown">
            <button className="filters" onClick={() => handleFilterStatus('arriendo')}>
              Filtrar por Arrendado
            </button>
            <button className="filters" onClick={() => handleFilterStatus('venta')}>
              Filtrar por En venta
            </button>
            <button className="filters" onClick={() => handleFilterStatus('')}>
              Sin filtrar
            </button>
          </div>
        )}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nombre" value={searchValue} onChange={handleSearch} />
      </div>
      <div className="property-container">
        {filteredPropertiesBySearch.map((property) => (
          <Link
            className="property-card"
            to={`/details/${property.property_id}?name=${property.property_name}`}
            key={property.property_id}
          >
            <div className="property-image--container">
              <img className="property-image" src={property.image} alt={property.name} />
            </div>
            <h2 className="property-name">{property.property_name}</h2>
            <p className="property-type">{property.state === 'activa' ? 'Disponible' : 'No disponible'}</p>
            <p className="property-type">{property.property_sale === 'venta' ? 'En venta' : 'Arrendamiento'}</p>
            <p className="property-description">{property.characteristics}</p>
            <p className="property-description">
              {property.address}, {property.city}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
