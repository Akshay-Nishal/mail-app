import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import del from '../../images/del.png'
import '../Inbox/inbox.css'
import { mailActions } from '../../Store/store'

function Outbox() {
  const dispatch = useDispatch()
  const [mailShow,setMailShow] = useState(false)
  const [to,setTo] = useState('')
  const [subject,setSubject] = useState('')
  const [content,setContent] = useState('')
  const mails = useSelector((state)=>state.mails.sent)
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const updateDataOnline = (key,type) =>{
    const url = `https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/${localStorage.getItem('currentEmail').replace('@', '').replace('.', '')}/sent/${key}.json`

    /********* Delete Mail *********/
    if(type==='Delete'){
      console.log('Deleting...')
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res=>{
        if(res.ok===true){
          console.log("Deleted Succesfully")
          dispatch(mailActions.onDelete({id:key,in:"sent"}))
        }
      })
    }

  }

  const showMail = (mail) =>{
    setTo(mail[1].to)
    setSubject(mail[1].subject)
    setContent(mail[1].mail)
    setMailShow(true)

  }

  const closeMail = () =>{
    setTo('')
    setContent('')
    setSubject('')
    setMailShow(false)

  }



  return (
    
    <div>
      <h2>Sent Mails</h2>
      {mailShow && <div className='mailShow'>
        <button onClick={closeMail} className='close'>X</button>
        <h2>Mail</h2>
        <h4>To: {to}</h4>
        <h5>Subject: {subject}</h5>
        <p dangerouslySetInnerHTML = {{ __html: content }}/>
      </div>}
      {mails.length>0 && mails.map(mail=>{
          return(
          <div className='mail' key={mail[0]}>
            <button onClick={()=>updateDataOnline(mail[0],'Delete')}><img src={del} alt="Delete" /></button>
            <div onClick={()=>{showMail(mail)}} className='mail-content'>
              <span className='from'>{mail[1].to}</span>
              <span className='mail-text' dangerouslySetInnerHTML={{ __html: truncateText(mail[1].mail, 50) }} />
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default Outbox