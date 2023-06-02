import React,{useState} from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = ({isBtnCreateVisible, isBtnReturnVisble, changeShowForm}) => {
  const history = useNavigate();
  const [createButtonText, setCreateButtonText] = useState('Create');
  const handleShowForm = () => {
    changeShowForm();
    if (createButtonText === 'Create') {
      setCreateButtonText('Close');
    } else {
      setCreateButtonText('Create');
    }
  };
  return (
    <div className='navbar-container'>
    <h1 className='navbar-title'>
        Mob
    </h1>
    <div className='btn-container'>
        {isBtnCreateVisible && (
            <button className='btn-create' onClick={handleShowForm}>{createButtonText}</button>
        )}
        {isBtnReturnVisble && (
            <button className='btn-return' onClick={() => history(-1)} >Regresar</button>
        )}
    </div>
    </div>
  )
}

export default Navbar