import React from 'react'
import { useSelector } from 'react-redux'
import del from '../../images/del.png'
import './inbox.css'

function Inbox() {
  const inboxMails = useSelector((state)=>state.mails.received)
  const mails = Object.entries(inboxMails)
  console.log(mails[0])

  return (
    <div>
      <h2>Received Mails</h2>
      {
        mails.map(mail=>{
          // return(<p>{mail[1].mail}</p>)
          return(
          <div key={mail[0]}>
            <button><img src={del} alt="Delete" /></button>
            <span>{mail[1].from}</span>
            <span dangerouslySetInnerHTML={{ __html: mail[1].mail }} />
          </div>
          )
        })
      }
    </div>
  )
}

export default Inbox