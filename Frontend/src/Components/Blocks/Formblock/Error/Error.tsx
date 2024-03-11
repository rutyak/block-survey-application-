import './Error.css'
import errorIcon from '../../../../Assets/error.png'

const Error = ({text}:any) => {
  return (
    <div className='error que-error'>
        <img src={errorIcon} alt="icon" />
        <p>{text}</p>
    </div>
  )
}

export default Error
