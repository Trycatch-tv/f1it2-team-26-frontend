import { useEffect, useState } from 'react';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

export const useFetchProperties = () => {
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/property/getall`)
    .then(res => res.json())
    .then(data => {
      setProperties(data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    })
  }, []);

  return {
    properties,
    isLoading,
    error,
  };
}
