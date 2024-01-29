import React, { useEffect, useState } from 'react';
import './NavigationBar.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/store';

function NavigationBar() {
  const unreadNum = useSelector((state)=>state.mails.unreadNumber)
  // const [unreadNum, setUnreadNum] = useState(0)
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(authActions.logout())
    localStorage.clear()
  }
  // useEffect(() => {
  //   for(let i = 0; i<mails.length;++i){
  //     if(mails[i][1].status ==='unread'){
  //       setUnreadNum(unreadNum+1)
  //     }
  //     console.log(unreadNum)
  //   }
  // }, [])
  
  return (
    <div className="NavigationBar flex">
      <div className="LeftNav">
        <Link className='navItem' to='/home'>
          <img style={{height:'30px', marginRight:'10px'}} src="https://cdn-icons-png.flaticon.com/128/888/888912.png" alt="" />
          <span>Mail-App</span>
        </Link> 
        <Link className='navItem' to='/compose'>Compose</Link>
        <Link className='navItem' to='/inbox'>Inbox <span className='unreadNumbar'>{unreadNum}</span> </Link>
        <Link className='navItem' to='/outbox'>Sent</Link>
      </div>
      <div className="RightNav">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default NavigationBar
