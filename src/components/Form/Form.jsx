import React,{useReducer,useState} from 'react'
import './Form.css'
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {v4} from 'uuid'

const property={
  name: '',
  status: '',
  type: '',
  address: '',
  city: '',
  area: '',
  price: '',
  characteristics: '',
  Image: ''
}

const reducer=(state, action)=>{
  switch(action.type){
case "updateField":
  console.log(state);
  return {...state, [action.field]:action.value}
case "reset":
  return property
default:
  return state
  }
}
const Form = () => {
  const [state, dispatch]=useReducer(reducer, property)
  const [imagePreview, setImagePreview] = useState('');
  const [secret] =useState(v4);

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value:e.target.value,
    })
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    dispatch({
      type: 'updateField',
      field: 'image',
      value: file
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      const refImage = `propertys/${secret}`
      const storageRef = ref(storage, refImage);
      uploadBytesResumable(storageRef, file).then((reference)=> {
        getDownloadURL(reference.ref).then((url) => {
          dispatch({
            type: 'updateField',
            field: 'Image',
            value: url
          });
        });
      });

    } else {
      setImagePreview('');
    }
  };

  
  const process =[
    {
      id: 1,
      name: 'En venta'
    },
    {
      id: 2,
      name: 'Arrendado'
    },
    {
      id: 3,
      name: 'Vendido'
    }
  ]

  const createProperty = () => {
    
  }

  return (
    <div className='form'>
    <form onSubmit={createProperty}>
<div className='form-container'>
    <div className='form-input'>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type='text'
          name='name'
          className='textarea'
          id="name"
          value={state.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
              <label htmlFor="status">Status:</label>
                <select
                className='option'
                id="status"
                name='status'
                value={state.status}
                onChange={handleChange}
                >
                  <option 
                  value=""
                  disabled
                  defaultValue=""
                  hidden
                  >Seleccione un estado</option>
                {
                  process.map((process) => { 
                    return <option key={process.id} value={process.name}>{process.name}</option>
                  },this)}
                </select>
            </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          name='address'
          className='textarea'
          id="address"
          value={state.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          name='city'
          className='textarea'
          id="city"
          value={state.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="area">Area:</label>
        <input
          name='area'
          className='textarea'
          id="area"
          value={state.area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          name='price'
          className='textarea'
          id="price"
          value={state.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="charac">Characteristics:</label>
        <input
          name='characteristics'
          className='textarea'
          id="charac"
          value={state.characteristics}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className='form-image'>
    {imagePreview && (
      <img src={imagePreview} alt='Preview' className='image-preview' />
    )}
    <input 
    type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleImageChange}
    />
    </div>
</div>

      <button className='form-btn' type="submit">Create property</button>
    </form>
    </div>
  )
}

export default Form