import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const URL_API = process.env.REACT_APP_API_URL;

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
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${URL_API}/property/deleteproperty/${id}`, { method: 'DELETE' })
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