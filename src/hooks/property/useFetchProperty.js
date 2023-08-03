import { useEffect, useState } from 'react';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

export const useFetchProperty = (id) => {

  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
    fetch(`${REACT_APP_API_URL}/property/${id}`)
    .then(res => res.json())
    .then(data => {
      setProperty(data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    })
  
	},[id]);
  
  return{
    property,
    isLoading,
    error
  };
}
