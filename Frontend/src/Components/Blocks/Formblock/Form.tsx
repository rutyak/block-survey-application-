import React, { useState } from 'react'
import './Form.css'
import Button from '../../Button/Button';
import Questions from './Questions/Questions';
import { Link } from 'react-router-dom';
import Error from './Error/Error';

const Form = () => {

  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  let typeArr = ['Input', 'Checkbox', 'Radio'];

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

  type surveyType = {
    title: string,
    desc: string,
    questions: queType[]
  }

  const [survey, setSurvey] = useState<surveyType>({
    title: '',
    desc: '',
    questions: []
  })

  type errorType = {
    title: boolean,
    desc: boolean,
  }

  const [error, setError] = useState<errorType>({
    title: false,
    desc: false
  })

  function addQuestion(type: string) {
    const optId = Math.ceil(Math.random() * 1000);
    const opt = [{ id: optId, text: '' }, { id: optId + 1, text: '' }];
    const queId = Math.ceil(Math.random() * 10000);

    setSurvey((prevSurvey: any) => ({
      ...prevSurvey,
      questions: [
        ...prevSurvey.questions,
        type === 'Input' ? 
        { id: queId, type: type, questions: '' } 
        : { id: queId + 1, type: type, questions: '', options: opt }
      ],
    }));
  }

  function handleQuestions(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const copySurvey = { ...survey };
    copySurvey.questions[index].questions = e.target.value;
    setSurvey(copySurvey);
  }

  function handleOptions(e: React.ChangeEvent<HTMLInputElement>, index: number, optIndex: number) {
    const copySurvey = { ...survey };
    copySurvey.questions[index].options[optIndex].text = e.target.value;
    setSurvey(copySurvey);
  }

  function addOption(index: number) {
    const optId = Math.ceil(Math.random() * 1000);
    const copySurvey = { ...survey };
    const opt = [...copySurvey.questions[index].options, { id: optId, text: '' }];
    copySurvey.questions[index].options = opt;
    setSurvey(copySurvey);
  }

  function handleRemove(index: number, id: number) {
    const copySurvey = { ...survey };
    const removed = copySurvey.questions[index].options.filter(opt => id !== opt.id);
    copySurvey.questions[index].options = removed;
    setSurvey(copySurvey);
  }

  return (
    <div className='form-container'>
      <h2>Survey</h2>
      <div className="preview-btn">
        <Link to='/preview'>
          <div className="preview">
            <div className='survey-form'>
              <p>Preview</p>
            </div>
          </div>
        </Link>
      </div>
      <div className='form-survey'>
        <div className='title-desc'>
          <div className='title'>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id='title'
              placeholder='Enter title'
              onChange={(e) => {
                setSurvey({
                  ...survey,
                  title: e.target.value
                })
              }
              }
              onBlur={() => {
                setError({
                  ...error,
                  title: survey.title === ''
                })
              }
              }
              required
            />
            {error.title &&
              survey.title === '' ? <Error text={'Title is required'} /> : ''
            }
          </div>
          <div className='desc'>
            <label htmlFor="desc">Description:</label>
            <textarea
              id='desc'
              placeholder='Enter description'
              onChange={(e) => {
                setSurvey({
                  ...survey,
                  desc: e.target.value
                })
              }}
              onBlur={() => {
                setError({
                  ...error,
                  desc: survey.desc === ''
                })
              }}
            />
          </div>
          {error.desc &&
            survey.desc === '' ? <Error text={'Description is required'} /> : ''
          }
          {survey.desc.replace(/\s/g, '').length < 45 && survey.desc !== '' && isSubmitClicked &&
            <Error text={'Description must contain minimum 45'} />
          }
        </div>
        <div className='input-type-btn'>
          {
            typeArr?.map((btn: string, index: number) => (
              <div key={index}>
                <Button addQuestion={addQuestion} text={btn} type={btn} />
              </div>
            ))
          }
        </div>
        <Questions
          handleQuestions={handleQuestions}
          survey={survey}
          handleOptions={handleOptions}
          handleRemove={handleRemove}
          addOption={addOption}
          error={error}
          setError={setError}
          isSubmitClicked={isSubmitClicked}
          setIsSubmitClicked={setIsSubmitClicked}
        />
      </div>
    </div>
  )
}

export default Form
