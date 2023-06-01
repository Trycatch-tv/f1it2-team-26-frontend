import { useEffect, useState } from 'react';

export const useFetchGetProperty = (id) => {

  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
    fetch(`http://localhost:8080/api/v1/property/${id}`)
    .then(res => res.json())
    .then(data => {
      setProperty(data);
      setIsLoading();
    })
    .catch(err => err);
	},[]);
  
  return{
    property,
    isLoading
  };
}
