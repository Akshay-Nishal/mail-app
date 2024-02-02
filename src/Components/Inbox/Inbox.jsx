import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import del from '../../images/del.png'
import './inbox.css'
import { mailActions } from '../../Store/store'

function Inbox() {
  const dispatch = useDispatch()
  const [mailShow,setMailShow] = useState(false)
  const [from,setFrom] = useState('')
  const [subject,setSubject] = useState('')
  const [content,setContent] = useState('')
  const mails = useSelector((state)=>state.mails.received)
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const updateDataOnline = (key,type) =>{
    const url = `https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/${localStorage.getItem('currentEmail').replace('@', '').replace('.', '')}/received/${key}.json`
  
    /********* Update read status *********/
    if(type==='Update'){
      console.log('Updating...')
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({status:'read'})
      })
      .then(res=>{
        return(res.json())
      })
      .then(data=>{
        console.log(data)
        dispatch(mailActions.onRead({id:key}))
      })
    }

    /********* Delete Mail *********/
    if(type==='Delete'){
      console.log('Deleting...')
      const url = `https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/${localStorage.getItem('currentEmail').replace('@', '').replace('.', '')}/received/${key}.json`
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res=>{
        if(res.ok===true){
          console.log("Deleted Succesfully")
          dispatch(mailActions.onDelete({id:key,in:"received"}))
        }
      })
    }

  }

  const showMail = (mail) =>{
    setFrom(mail[1].from)
    setSubject(mail[1].subject)
    setContent(mail[1].mail)
    if(mail[1].status==='unread'){
      // console.log("Changed")
      updateDataOnline(mail[0],'Update')
    }
    setMailShow(true)

  }

  const closeMail = () =>{
    setFrom('')
    setContent('')
    setSubject('')
    setMailShow(false)

  }



  return (
    
    <div>
      <h2>Received Mails</h2>
      {mailShow && <div className='mailShow'>
        <button onClick={closeMail} className='close'>X</button>
        <h2>Mail</h2>
        <h4>From: {from}</h4>
        <h5>Subject: {subject}</h5>
        <p dangerouslySetInnerHTML = {{ __html: content }}/>
      </div>}
      {mails.length>0 && mails.map(mail=>{
          return(
          <div className={mail[1].status==='unread'?'mail unread':'mail'} key={mail[0]}>
            <button onClick={()=>updateDataOnline(mail[0],'Delete')}><img src={del} alt="Delete" /></button>
            <div onClick={()=>{showMail(mail)}} className='mail-content'>
              <span className='from'>{mail[1].from}</span>
              <span className='mail-text' dangerouslySetInnerHTML={{ __html: truncateText(mail[1].mail, 50) }} />
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default Inbox