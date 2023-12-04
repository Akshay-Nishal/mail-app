// import {createStore} from 'redux'
import {createSlice, configureStore} from '@reduxjs/toolkit'

const initalAuthState={
    isLogin: false,
    currentUserData:''
}

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
        auth:authSlice.reducer
    }
    // reducer:{counter:counterSlice.reducer,}    by this we can merge multiple reducer
})
 
export const authActions = authSlice.actions   //it autogenerates actions for usuth

export default store
