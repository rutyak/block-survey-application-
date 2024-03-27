import Error from '../Error/Error'
import './Questions.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const Questions = ({ survey, handleQuestions, handleOptions, handleRemove, addOption, error, setError, setIsSubmitClicked, isSubmitClicked }: any) => {

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

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitClicked(true);

        localStorage.setItem('survey', JSON.stringify(survey));

        const isValid = validateSurvey();
        
        if (isValid) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_KEY}/formsurvey`, {
                    type: 'Survey',
                    formsurvey: survey
                });
                
                if (res.status === 200) {
                    toast.success("Survey uploaded successfully!!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        }
    }
    function validateSurvey(): boolean {

        setError({
            ...error,
            title: survey.title.replace(/\s/g, '') === '',
            desc: survey.desc.replace(/\s/g, '') === '' || survey.desc.replace(/\s/g, '').length <= 45
        });
    
        const isValidQuestions = survey.questions?.every((que: queType) => {
            if (que.type === 'Input') {
                return que.questions.replace(/\s/g, '') !== '' && que.questions.replace(/\s/g, '').length >= 10;
            } else if (que.type === 'Checkbox' || que.type === 'Radio') {
                return que.options.length >= 2 && que.options.every((opt: opt) => opt.text.replace(/\s/g, '') !== '') && que.questions.replace(/\s/g, '') !== '' && que.questions.replace(/\s/g, '').length >= 10;
            }
            return true;
        });
    
        return survey.title.replace(/\s/g, '') !== '' && survey.desc.replace(/\s/g, '') !== '' && survey.desc.replace(/\s/g, '').length >= 45 && isValidQuestions;
    }

    return (
        <div className='questions'>
            <form action="" onSubmit={(e) => handleSubmitForm(e)} id='form-reset'>
                {
                    survey.questions?.map((que: queType, index: number) => {
                        return (
                            <div key={que.id}>
                                {que.type === 'Input' &&
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Enter your questions?'
                                            onChange={(e) => handleQuestions(e, index)}
                                            onBlur={(e) =>
                                                setError((prevErr: any) => {
                                                    return {
                                                        ...prevErr,
                                                        que: {
                                                            ...prevErr.que,
                                                            [que.id]: que.questions === ''
                                                        }
                                                    }
                                                })
                                            }
                                        />
                                         {error.que && error.que[que.id] || isSubmitClicked &&
                                            que.questions===''?<Error text={'Question is required'}/>:''
                                        }
                                        { que.questions !== '' && que.questions.replace(/\s/g, '').length < 10 &&
                                            isSubmitClicked &&
                                            <Error text={'Question must contains minimum 10 char'} />
                                        }
                                    </div>
                                }
                                {(que.type === 'Checkbox' || que.type === 'Radio') &&
                                    <div className='checkbox'>
                                        <input
                                            type="text"
                                            placeholder='Enter your questions?'
                                            onChange={(e) => handleQuestions(e, index)}
                                            onBlur={() =>
                                                setError((prevErr: any) => {
                                                    return {
                                                        ...prevErr,
                                                        que: {
                                                            ...prevErr.que,
                                                            [que.id]: que.questions === ''
                                                        }
                                                    }
                                                })
                                            }
                                        />
                                        {error.que && error.que[que.id] || isSubmitClicked &&
                                            que.questions===''?<Error text={'Question is required'}/>:''
                                        }
                                        {que.questions.replace(/\s/g, '').length < 10 &&
                                         que.questions !== ''  && isSubmitClicked &&
                                            <Error text={'Question must contains minimum 10 char'} />
                                        }
                                        {que.options.length < 2 &&
                                            <Error text={'Please add at least two options'} />
                                        }
                                        {
                                            que?.options?.map((opt: opt, optIndex: number) => {
                                                return (
                                                    <div key={opt.id} className='options'>
                                                        <input
                                                            type="text"
                                                            placeholder='Option'
                                                            onChange={(e) => handleOptions(e, index, optIndex)}

                                                            onBlur={() =>
                                                                setError((prevErr: any) => {
                                                                    return {
                                                                        ...prevErr,
                                                                        opt: {
                                                                            ...prevErr.opt,
                                                                            [opt.id]: opt.text === ''
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        />
                                                        <button onClick={() => handleRemove(index, opt.id)}>Remove</button>
                                                        {error.opt && error.opt[opt.id]  || isSubmitClicked &&
                                                            opt.text===''?<Error text={'Options is required'}/>:''
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        <button onClick={() => addOption(index)}>Add options</button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className='submit-btn'>
                    <input
                        type='submit'
                        disabled={
                            survey.questions?.length === 0 &&
                            isSubmitClicked 
                        }
                    />
                </div>
            </form>
        </div>
    )
}

export default Questions


