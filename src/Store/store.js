// import {createStore} from 'redux'
import {createSlice, configureStore} from '@reduxjs/toolkit'

const initalAuthState={
    isLogin: false,
    currentUserData:''
}

const initialMailState = {
    sent:{},
    received:{}
}

const mailSlice = createSlice({
    name:'mails',
    initialState:initialMailState,
    reducers:{
        firstLoad(state,action){
            console.log(action.payload.sentMails)
            console.log(action.payload.receivedMails)
            state.sent=action.payload.sentMails
            state.received=action.payload.receivedMails
        }
    }

})

const authSlice = createSlice({
    name:'authentication',
    initialState:initalAuthState,
    reducers:{
        login(state,action){
            state.isLogin=true
            state.currentUserData = action.payload
        },
        logout(state){
            state.isLogin=false
            state.currentUserData = ''
        }
    }
}) 

const store = configureStore({      //it  helps to merge multople slice reducer 
    reducer:{
        auth:authSlice.reducer,
        mails:mailSlice.reducer
    }
    // reducer:{counter:counterSlice.reducer,}    by this we can merge multiple reducer
})
 
export const authActions = authSlice.actions   //it autogenerates actions for usuth

export const mailActions = mailSlice.actions

export default store
