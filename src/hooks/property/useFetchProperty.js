import { useEffect, useState } from 'react';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

export const useFetchProperty = (id) => {

  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addressProperty, setAdressProperty] = useState(null);
  const [error, setError] = useState(null);

	useEffect(() => {
    fetch(`${REACT_APP_API_URL}/property/${id}`)
    .then(res => res.json())
    .then(data => {
      setAdressProperty(data.address);
      setProperty(data);
      setIsLoading();
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    })
  
	},[id]);
  
  return{
    property,
    isLoading,
    addressProperty,
    error
  };
}
