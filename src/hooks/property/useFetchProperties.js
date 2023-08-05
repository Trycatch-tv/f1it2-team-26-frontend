import { useEffect, useState } from 'react';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

export const useFetchProperties = () => {
  
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  
  useEffect(() => {
   getAllProperties();
  }, [])
  

  const getAllProperties = async() => {
    await fetch(`${REACT_APP_API_URL}/property/getall`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    })
  }
   
  return {
    
    isLoading,
    error,
    data,

    setIsLoading,
    getAllProperties,
    
  };
}
