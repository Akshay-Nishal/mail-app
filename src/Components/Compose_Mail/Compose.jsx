import React, { useRef, useState } from "react"
import JoditEditor from 'jodit-react';
import './Compose.css'

function Compose() {
    const editor = useRef(null);
    const toMail = useRef(null)
    const sub = useRef(null)
	const [content, setContent] = useState('');
    const submitHandler =()=>{
        // console.log(editor.current.value)
        const mess = editor.current.value
        const to = toMail.current.value
        const subject = sub.current.value

        if(mess && to && subject){
            console.log(mess,to)
        }
        fetch(`https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/`+localStorage.getItem('currentEmail')+'/sent.json',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({to:to,subject:subject,mail:mess})
        }).then(res=>{console.log(res)})
        .catch(err=>console.log(err))
    }
  return (
    <div className="compose">
        <h3>Compose Mail</h3>
        <br />
        <h5><label htmlFor="email">To: </label><input ref = {toMail} type="email" name="" id="email" placeholder="xyz@ex.com" /></h5>
        <h5><label htmlFor="sub">Subject: </label><input ref = {sub} type="text" name="" id="sub" placeholder="Type subject here" /></h5>
        
        <JoditEditor
			ref={editor}
			value={content}
			onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>
        <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Compose