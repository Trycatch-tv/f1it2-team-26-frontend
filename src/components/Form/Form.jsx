import React,{useReducer,useState} from 'react'
import './Form.css'

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
  return{...state, [action.field] :action.value}
case "reset":
  return property
default:
  return state
  }
}
const Form = () => {
  const [state, dispatch]=useReducer(reducer, property)
  const [imagePreview, setImagePreview] = useState('');
  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
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

  return (
    <div className='form'>
    <form onSubmit >
<div className='form-container'>
    <div className='form-input'>
      <div className="form-group">
        <label htmlFor="comment">Name:</label>
        <input
          className='textarea'
          id="comment"
          value={state.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
              <label htmlFor="status">Status:</label>
                <select
                className='option'
                id="status"
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
        <label htmlFor="comment">Address:</label>
        <input
          className='textarea'
          id="comment"
          value={state.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">City:</label>
        <input
          className='textarea'
          id="comment"
          value={state.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Area:</label>
        <input
          className='textarea'
          id="comment"
          value={state.area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Price:</label>
        <input
          className='textarea'
          id="comment"
          value={state.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Characteristics:</label>
        <input
          className='textarea'
          id="comment"
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