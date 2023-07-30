import './Navbar.css'
import { useNavigate } from 'react-router-dom';


const Navbar = ({isBtnCreateVisible, isBtnReturnVisble, createButtonText, handleShowForm}) => {
  const history = useNavigate();
  
  return (
    <div className='navbar-container'>
    <h1 className='navbar-title'>
        Mob
    </h1>
    <div className='btn-container'>
        {isBtnCreateVisible && (
            <button className={`btn-create ${createButtonText === 'Cerrar' ? 'btn-close' : ''}`} onClick={handleShowForm} >{createButtonText}</button>
        )}
        {isBtnReturnVisble && (
            <button className='btn-return' onClick={() => history(-1)} >Regresar</button>
        )}
    </div>
    </div>
  )
}

export default Navbar