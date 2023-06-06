import { useEffect, useState } from 'react';
const URL_API = process.env.REACT_APP_API_URL;

export const useFetchListProperties = () => {
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL_API}/property/getall`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch(err => err)
  }, []);

  return {
    properties,
    isLoading,
  };
}
