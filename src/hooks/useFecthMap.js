import {useState} from 'react'

const useFecthMap = () => {
    const [address, setAddress] = useState(null);
    const searchLocation = async (query) => {
        const encodedQuery = encodeURIComponent(query);
        const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json`;
      
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              setAddress(data[0]);
            } else {
              console.error('No se encontraron coordenadas para la ubicación especificada.');
            }
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };
      
    
      const handleUbication = () => {
        if(address !=null){
          window.open(`https://www.google.com.ec/maps/dir//${address.lat},${address.lon}/@${address.lat},${address.lon},21z?hl=es&entry=ttu`, '_blanck')
        }
      }
  return {searchLocation, handleUbication, address}
}

export default useFecthMap