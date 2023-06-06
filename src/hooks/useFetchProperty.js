import { useEffect, useState } from 'react';

export const useFetchGetProperty = (id) => {

  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addressProperty, setAdressProperty] = useState(null);
  
	useEffect(() => {
    fetch(`http://localhost:8080/api/v1/property/${id}`)
    .then(res => res.json())
    .then(data => {
      setAdressProperty(data.address);
      setProperty(data);
      setIsLoading();
    })
    .catch(err => err);
	},[id]);
  
  return{
    property,
    isLoading,
    addressProperty
  };
}
