import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

const useFetchPropertyDelete = (id) => {
  const navigate = useNavigate();
  
    const handleDelete = () => {
        Swal.fire({
          title: 'Eliminar Propiedad',
          text: '¿Está seguro de eliminar esta propiedad?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No, volver',
        }).then(async(result) => {
          if (result.isConfirmed) {
           await fetch(`${REACT_APP_API_URL}/property/deleteproperty/${id}`, { method: 'DELETE' })
              .then((res) => {
                if (res.ok) {
                  Swal.fire({
                    title: 'Eliminar propiedad',
                    text: 'Propiedad eliminada exitosamente',
                    icon: 'success',
                  })
                .then(() => {
                  navigate('/');
                });
                } else {
                  throw new Error('Error al eliminar la propiedad');
                }
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  title: 'Eliminar propiedad',
                  text: 'Ha ocurrido un error. No se pudo eliminar esta propiedad',
                  icon: 'error',
                });
              });
          }
        });
      };
  return {handleDelete}
}

export default useFetchPropertyDelete