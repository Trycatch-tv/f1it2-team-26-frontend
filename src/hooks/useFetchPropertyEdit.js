import {useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useFetchPropertyEdit = (property) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedProperty, setEditedProperty] = useState(property);
    const URL_API = process.env.REACT_APP_API_URL;   
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProperty({ ...editedProperty, [name]: value });
    };
    const handleEdit = () => {
        setIsEditMode(true);
        setEditedProperty(property);
    };
    const handleComeBack = () => {
        setIsEditMode(false)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Editar Propiedad',
            text: '¿Esta seguro de editar esta propiedad?',
            icon: 'question',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, Editar',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, volver',
        }).then((result) => {
            if (result.isConfirmed) {
            fetch(`${URL_API}/property/update/${property.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProperty),
            })
                .then((res) => res.json())
                .then((res) => {
                console.log(res);
                Swal.fire({
                    title: 'editar propiedad',
                    text: 'Propiedad editada exitosamente',
                    icon: 'success',
                });
                navigate('/');
                })
                .catch(
                Swal.fire({
                    title: 'Editar propiedad',
                    text: 'Ha ocurrido un error, No se pudo editar esta   propiedad',
                    icon: 'error',
                }),
              );
          }
        });
    
        console.log(editedProperty);
      };
    
  return { isEditMode, editedProperty, handleChange, handleEdit, handleComeBack, handleSubmit}
}

export default useFetchPropertyEdit