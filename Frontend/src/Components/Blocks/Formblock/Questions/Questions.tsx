import Error from '../Error/Error'
import './Questions.css'
import { toast } from 'react-toastify'
import axios from 'axios'
const BaseUrl = "http://localhost:5000"

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

        let ans: any[] = [];

        localStorage.setItem('survey', JSON.stringify(survey));

        const validQue = survey.questions?.every((que: queType) => {
            return que.questions.length >= 10;
        });

        survey.questions?.forEach((que: queType) => {
            if (que.type === 'Checkbox' || que.type === 'Radio') {
                ans[1] = que.type === 'Checkbox' || que.type === 'Radio';
                ans[2] = que.options.length >= 2;
               {
                que.options?.map((opt: opt)=>(
                    ans[3]= opt.text !== ''
                ))
               }
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
            survey.desc.replace(/\s/g, '').length > 45 &&
            (ans[1] ? ans[2] : true) &&
            ans[3] &&
            validQue
        ) {
          
            const postform = {
                type: 'Survey',
                formsurvey: survey
            }
            try {
                const res = await axios.post(`${BaseUrl}/formsurvey`, postform);
                console.log(res);
                if (res.status === 200) {
                    toast.success("Survey uploaded successfully!!");
                    setTimeout(()=>{
                        window.location.reload();
                    },2000)
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


