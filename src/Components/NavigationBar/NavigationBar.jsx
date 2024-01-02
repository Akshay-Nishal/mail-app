import React from 'react';
import './NavigationBar.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/store';


function NavigationBar() {
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(authActions.logout())
    localStorage.clear()
  }
  return (
    <div className="NavigationBar flex">
      <div className="LeftNav">
        <Link className='navItem' to='/home'>
          <img style={{height:'30px', marginRight:'10px'}} src="https://cdn-icons-png.flaticon.com/128/888/888912.png" alt="" />
          <span>Mail-App</span>
        </Link> 
        <Link className='navItem' to='/compose'>Compose</Link>
        <Link className='navItem' to='/inbox'>Inbox</Link>
        <Link className='navItem' to='/outbox'>Sent</Link>
      </div>
      <div className="RightNav">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default NavigationBar
