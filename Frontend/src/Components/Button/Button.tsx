import './Button.css'

const Button = ({addQuestion, text, type}:any) => {
  
  const handleClick = () =>{
      addQuestion(`${type}`)
  }

  return (
    <div>
      <button onClick={handleClick}>
            <p>{text}</p>
      </button>
    </div>
  )
}

export default Button
