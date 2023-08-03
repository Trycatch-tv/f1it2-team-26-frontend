import {useEffect, useState} from 'react'

const useFecthMap = (property) => {
    const [address, setAddress] = useState(null);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    useEffect(() => {
      if (property.address?.length > 0) {
        searchLocation(property.address);
      }; 
    }, [property]);

    const searchLocation = async (query) => {
        const encodedQuery = encodeURIComponent(query);
        const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json`;
      
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              setAddress(data[0]);
              setIsLoadingMap(false);
            } else {
              console.error('No se encontraron coordenadas para la ubicación especificada.');
              setIsLoadingMap(false);
            }
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };
      
      const handleUbication = () => {
        if(address){
          window.open(`https://www.google.com.ec/maps/dir//${address.lat},${address.lon}/@${address.lat},${address.lon},21z?hl=es&entry=ttu`, '_blanck')
        }
      }
  return {searchLocation, handleUbication, address, isLoadingMap}
}

export default useFecthMap