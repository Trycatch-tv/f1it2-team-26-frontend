import { useEffect, useState } from 'react';
const URL_API = process.env.REACT_APP_API_URL;

useFetchGetProperty = (id) => {

  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addressProperty, setAdressProperty] = useState(null);
  
	useEffect(() => {
    fetch(`${URL_API}/property/${id}`)
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
