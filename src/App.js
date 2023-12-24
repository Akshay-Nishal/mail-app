import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Login/LoginForm';
import Home from './Components/Home_Page/Home';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/store';
import { useEffect } from 'react';
import Compose from './Components/Compose_Mail/Compose';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Inbox from './Components/Inbox/Inbox';
import Outbox from './Components/Sent_Mail/Outbox';

function App() {
  const auth = useSelector(state=>state.auth.isLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('isLogin')==='true'){
      dispatch(authActions.login(JSON.parse(localStorage.getItem('currentUserData'))))
    }
  },[])


  return (
    <div className="App">
      <BrowserRouter> 
      <NavigationBar/>
      <Routes>
        {(auth)?
        <>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/compose" element={<Compose/>}></Route>
        <Route path="/inbox" element={<Inbox/>}></Route>
        <Route path="/outbox" element={<Outbox/>}></Route>
        <Route path="*" element={<Navigate to='/'/>}></Route>
        </>
        :
        <><Route path="/login" element={<LoginForm/>} ></Route>
        <Route path="*" element={<Navigate to='/login'/>} ></Route>
        </>
        }
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
