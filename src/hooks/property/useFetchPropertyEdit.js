import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { propertyApi } from "../../api/propertyApi";
const { REACT_APP_API_URL } = propertyApi();

const useFetchPropertyEdit = (property,id) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedProperty, setEditedProperty] = useState(property);
    

    useEffect(() => {
        setEditedProperty(property);
    }, [property])
    

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleComeBack = () => {
        setIsEditMode(false);
    };

    const submitForm = (form) => {
        
        Swal.fire({
            title: 'Editar Propiedad',
            text: '¿Esta seguro de editar esta propiedad?',
            icon: 'question',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, Editar',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, volver',
        }).then(async(result) => {
            if (result.isConfirmed) {
            await fetch(`${REACT_APP_API_URL}/property/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then(() => {
                Swal.fire({
                    title: 'Editar propiedad',
                    text: 'Propiedad editada exitosamente',
                    icon: 'success',
                }).then(() => window.location.reload());
                })
                .catch(
                Swal.fire({
                    title: 'Editar propiedad',
                    text: 'Ha ocurrido un error, No se pudo editar esta propiedad',
                    icon: 'error',
                }),
              );
          }
        });
      };
    
  return { isEditMode, handleEdit, editedProperty, handleComeBack, submitForm }
}

export default useFetchPropertyEdit