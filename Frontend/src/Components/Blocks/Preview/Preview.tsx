import React, { useEffect, useState } from 'react';
import './Preview.css';

const Preview = () => {
 
    let queId = Math.ceil(Math.random() * 100000);
    type opt = {
        id: number,
        text: string
    }

    type queType = {
        id: number,
        type: string,
        questions: string,
        options: opt[]
    }

    const [survey, setSuvey] = useState<any>();
    useEffect(()=>{
    const storedData = localStorage.getItem('survey');

    if (storedData !== null) {
      const data = JSON.parse(storedData);
      setSuvey(data);
    } 
    },[])
    console.log(survey);

  return (
    <div className='preview-que'>
    {survey?.questions?.map((que: queType) => (
      <div key={que.id} className='question-input'>
        {que.type === 'Input' && (
            <div>
                <p>{que.questions}</p> 
                <input className='input-type' type='text' placeholder='Enter your answer'/>
            </div>
           )
        }
        {(que.type === 'Checkbox' || que.type === 'Radio') && (
          <div>
            <p>{que.questions}</p>
            {que.options?.map((opt: opt) => (
              <div key={opt.id} className='question-check-radio'>
                <input type={que.type.toLowerCase()} id={opt.id.toString()} name='same' />
                <label htmlFor={opt.id.toString()}>{opt.text}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
    <div className='preview-submit-btn'>
        <button>SUBMIT</button>
    </div>
  </div>
  )
}

export default Preview;