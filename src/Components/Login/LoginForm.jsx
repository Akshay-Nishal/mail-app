import { useState, useRef} from 'react';
import classes from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/store';
import { useNavigate } from 'react-router';



// import { unstable_HistoryRouter } from 'react-router-dom';
const API_KEY = 'AIzaSyD_wbBxYY-wn1p-CwM8sMA8OSqKorbLUSI'
//const urlf = 'https://crudcrud.com/api/61e24d3555214211b01f03433130d1f7'
const resetPassURL = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='



const LoginForm = (props) => {
  const history = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setLoading] = useState(false)
  const [forgotPass, setforgotPass] = useState(false)

  const emailInputRef = useRef()
  const forgotemailInputRef = useRef()
  const passInputRef = useRef()
  const confPassRef = useRef()
  const dispatch = useDispatch()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const loginFormSubmitHandler = (event)=>{
    // setLoading(true)
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPass = passInputRef.current.value
    // console.log("Login ",enteredEmail,enteredPass)
    if(isLogin){
        console.log("Logging In")
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPass,
                returnSecureToken:true
            }),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(res=>{
            setLoading(false)
            if(res.ok){
              return(res.json())
            }
            else{
              return res.json().then(data=>{
                let errorMessage = 'Authentication Failed!'
                throw new Error(errorMessage)
              })
            }
          })
        .then(data=>{
            console.log(data)
            dispatch(authActions.login(data))
            localStorage.setItem('isLogin',true)
            localStorage.setItem('currentUserData',JSON.stringify(data))
            localStorage.setItem('currentEmail',enteredEmail)
        })
        .catch(error=>{
            window.alert(error)
            console.log(error)
        })
    }
    else{
        const enteredConfPass = confPassRef.current.value
        if(enteredPass===enteredConfPass){
  
          fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            method:'POST',
            body:JSON.stringify({
              email:enteredEmail,
              password:enteredPass,
              returnSecureToken:true
            }),
            headers:{
              'Content-Type':'application/json'
            }
          })
          .then(res=>{
            setLoading(false)
            if(res.ok){
              return(res.json())
            }
            else{
              return res.json().then(data=>{
                let errorMessage = 'Email Already Exists!'
                throw new Error(errorMessage)
                
              })
            }
          })
          .then(data=>{
            dispatch(authActions.login(data))
            // console.log(data)
            localStorage.setItem('isLogin',true)
            localStorage.setItem('currentUserData',JSON.stringify(data))
            localStorage.setItem('currentEmail',enteredEmail)
          })
          .catch(error=>{
            window.alert(error)
            console.log(error)
          })
        }
        else{
          window.alert('Passsword and Confirm password doesnt match!!!')
        }
      }
  }
    

    const changeForgotPass =()=>{
      setforgotPass(!forgotPass)
    }


    const resetPass=()=>{
      const entEmail = forgotemailInputRef.current.value
      console.log("Password Reset ",entEmail)
      fetch(`${resetPassURL}${API_KEY}`,{
        method:'POST',
        requestType:"PASSWORD_RESET",
        email:'ak@gmail.com'
      })
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }

    
    let content = <button onClick={loginFormSubmitHandler}>{isLogin?'Login':'Create Account'}</button>
    
    if (isLoading) {
      content = <p style={{color:'white'}} >Sending Request...</p>;
    }
    
    return (
      <section className={classes.auth}>
      <h1>{isLogin ? 'Login Form' : 'Sign Up Form'}</h1>
      {forgotPass && <div className={classes.forgotPass}>
        <label htmlFor="resetPass"><h2>Enter Email</h2></label>
        <br />
        <input ref={forgotemailInputRef} type="text" id="resetPass" />
        <button className={classes.reset} onClick={resetPass} >Reset</button>
        <button className={classes.close} onClick={changeForgotPass} >Close</button>
      </div>}
      <form >

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passInputRef}
            type='password'
            id='password'
            required
          />
        </div>

        {!isLogin && <div className={classes.control}>
          <label htmlFor='confpassword'>Confirm Password</label>
          <input
            ref={confPassRef}
            type='password'
            id='confpassword'
            required
            />
        </div>}

        {isLogin && <button data-testid="forgotpassword-button" onClick={changeForgotPass} style={{marginTop:'20px'}}>Forgot Password</button> }

        <div className={classes.actions}>
            {content}
          <button data-testid='login-signup-state-change' type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
