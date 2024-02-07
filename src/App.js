import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Login/LoginForm';
import Home from './Components/Home_Page/Home';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, mailActions } from './Store/store';
import { useEffect } from 'react';
import Compose from './Components/Compose_Mail/Compose';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Inbox from './Components/Inbox/Inbox';
import Outbox from './Components/Sent_Mail/Outbox';


function App() {
  const auth = useSelector(state=>state.auth.isLogin)
  const dispatch = useDispatch()
  let receivedMails = {};
  let sentMails = {};
  const fetchData = async (url) => { 
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  const fetchSentMails = async () => {
    try {
      const data = await fetchData(`https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/${localStorage.getItem('currentEmail').replace('@', '').replace('.', '')}/sent.json`);
      sentMails = data || {};
    } catch (error) {
      console.error('Error fetching sent mails:', error);
    }
  };
  
  const fetchReceivedMails = async () => {
    try {
      const data = await fetchData(`https://react-ecom-f4305-default-rtdb.asia-southeast1.firebasedatabase.app/mailAPP/${localStorage.getItem('currentEmail').replace('@', '').replace('.', '')}/received.json`);
      receivedMails = data || {};
    } catch (error) {
      console.error('Error fetching received mails:', error);
    }
  };

  const fetchDataAsync = async () => {
    if(localStorage.getItem('isLogin')==='true'){
      console.log('Fetching Data...')
      await Promise.all([fetchSentMails(), fetchReceivedMails()]);
      // console.log('Sent', sentMails, 'Received',receivedMails);
      dispatch(mailActions.firstLoad({sentMails,receivedMails}))
    }
  };

  useEffect(() => {
    if(localStorage.getItem('isLogin')==='true'){
      dispatch(authActions.login(JSON.parse(localStorage.getItem('currentUserData'))))
      fetchDataAsync();

      const intervalId = setInterval(fetchDataAsync, 2000); // Call every 2 seconds
      return () => clearInterval(intervalId);
    }
  },[])

  const loginSuccess =()=>{
    console.log("Successfully Logged In")
    fetchDataAsync()
  }

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
        <><Route path="/login" element={<LoginForm onLogin={loginSuccess}/>} ></Route>
        <Route path="*" element={<Navigate to='/login'/>} ></Route>
        </>
        }
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
