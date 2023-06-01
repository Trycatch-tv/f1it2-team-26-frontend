import { useEffect, useState } from 'react';

export const useFetchListProperties = () => {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
    fetch(`http://localhost:8080/api/v1/property/getall`)
    .then(res => res.json())
    .then(data => {
      setProperties(data);
      setIsLoading();
    })
    .catch(err => err)
	}, []);
  
  return{
    properties,
    isLoading
  };
}
