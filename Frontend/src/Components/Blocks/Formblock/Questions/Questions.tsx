import { useState } from 'react'
import Error from '../Error/Error'
import './Questions.css'
import { toast } from 'react-toastify'
import axios from 'axios'
const BaseUrl = "http://localhost:5000"

const Questions = ({ survey, handleQuestions, handleOptions, handleRemove, addOption, error, setError}: any) => {

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

    const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitClicked(true);
    
        let ans: any[] = [];

        localStorage.setItem('survey',JSON.stringify(survey));
    
        const validQue = survey.questions?.every((que: queType) => {
            return que.questions.length >= 10;
        });
    
        survey.questions?.forEach((que: queType) => {
            if (que.type === 'Checkbox' || que.type === 'Radio') {
                ans[1] = que.type === 'Checkbox' || que.type === 'Radio';
                ans[2] = que.options.length >= 2; 
                ans[3] = que.questions.length >= 10;
            }
        });
    
        setError({
            ...error,
            title: survey.title === '',
            desc: survey.desc === ''
        });
    
        if (
            survey.title !== '' &&
            survey.desc !== '' &&
            survey.desc.replace(/\s/g, '').length > 40 &&
            (ans[1] ? ans[2] : true) && 
            validQue
        ) {
            console.log(survey);
            
            const postform ={
                type: 'Survey',
                formsurvey: survey
            }
            try {
                const res = await axios.post(`${BaseUrl}/formsurvey`,postform);
                console.log(res);
                if (res.status === 200){
                    toast.success("Survey uploaded successfully!!");
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                toast.error('Something is wrong');
            }
        }
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
                                        required 
                                        />
                                        { survey.questions[index].questions===''&& survey.questions[index].id === que.id &&
                                            <Error text={'Question is required'}/>
                                        }
                                        { survey.questions[index].questions.replace(/\s/g, '').length < 10 && survey.questions[index].questions !== '' && isSubmitClicked &&
                                                <Error text={'Question must contains minimum 10 char'}/>
                                        }
                                    </div>
                                }
                                {(que.type === 'Checkbox' || que.type === 'Radio') &&
                                    <div className='checkbox'>
                                        <input 
                                        type="text" 
                                        placeholder='Enter your questions?' 
                                        onChange={(e) => handleQuestions(e, index)} 
                                        required
                                        />
                                        { survey.questions[index].questions==='' && survey.questions[index].id === que.id &&
                                            <Error text={'Question is required'}/>
                                        }
                                        { survey.questions[index].questions.replace(/\s/g, '').length < 10 && 
                                        survey.questions[index].questions !== '' && isSubmitClicked &&
                                                <Error text={'Question must contains minimum 10 char'}/> 
                                        }
                                        { survey.questions[index].options.length < 2 && 
                                                <Error text={'Please add at least two options'}/> 
                                        }
                                        {
                                            que?.options?.map((opt: opt, optIndex: number) => {
                                                return (
                                                    <div key={opt.id} className='options'>
                                                        <input 
                                                        type="text" 
                                                        placeholder='Option' 
                                                        onChange={(e) => handleOptions(e, index, optIndex)} 
                                                        required 
                                                        />
                                                        <button onClick={() => handleRemove(index, opt.id)}>Remove</button>
                                                        { survey.questions[index].options[optIndex].id === opt.id && 
                                                        survey.questions[index].options[optIndex].text === '' &&
                                                            <Error text={'Option is required'}/>
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
                    <input type='submit' disabled={survey.questions?.length === 0 && isSubmitClicked } />
                </div>
            </form>
        </div>
    )
}

export default Questions


