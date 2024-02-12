import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions, mailActions } from '../Store/store';
const useMailFetcher = () => {
  let sentMails = {}
  let receivedMails = {}
  const dispatch = useDispatch()

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
      // dispatch(authActions.login(JSON.parse(localStorage.getItem('currentUserData'))))
      fetchDataAsync()
    }

    const intervalId = setInterval(fetchDataAsync, 3000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { sentMails, receivedMails };
}

export default useMailFetcher;
