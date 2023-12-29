import React, { useRef, useState } from "react"
import JoditEditor from 'jodit-react';
import './Compose.css'

function Compose() {
    const editor = useRef(null)
    const toMail = useRef(null)
    const sub = useRef(null)
    const [status,setStatus] = useState(false)
    const [message,setMessage] = useState('')
	const [content, setContent] = useState('Sample');
    const changeStatus = () =>{
        setStatus(!status)
    }
    const submitHandler =()=>{
        // console.log(editor.current.value)
        const mess = editor.current.value
        const to = toMail.current.value
        const subject = sub.current.value

        if(mess && to && subject){
            setMessage('Mail Sent Successfully')
            setStatus(true)
            console.log(mess,to)
            fetch(`https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/`+localStorage.getItem('currentEmail')+'/sent.json',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({to:to,subject:subject,mail:mess})
            }).then(res=>{console.log(res)})
            .catch(err=>console.log(err))
        }
        else{
            setMessage('Please fill up all data')
            setStatus(true)
        }
    }
  return (
    <div className="compose">
        {status && <div className="sendStatus">
            <h4>{message}</h4>
            <button onClick={changeStatus} id="closeStatus">X</button>
        </div>}
        <h3>Compose Mail</h3>
        <br />
        <h5><label htmlFor="email">To: </label><input data-testid='emailInput' ref = {toMail} type="email" name="" id="email" placeholder="xyz@ex.com" /></h5>
        <h5><label htmlFor="sub">Subject: </label><input data-testid='subInput' ref = {sub} type="text" name="" id="sub" placeholder="Type subject here" /></h5>
        
        <JoditEditor 
            data-testid='contentInput'
			ref={editor}
			value={content}
			onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>
        <button data-testid='email-send-button' onClick={submitHandler}>Send</button>
    </div>
  )
}

export default Compose