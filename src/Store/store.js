// import {createStore} from 'redux'
import {createSlice, configureStore} from '@reduxjs/toolkit'

const initalAuthState={
    isLogin: false,
    currentUserData:''
}

const initialMailState = {
    sent:{},
    received:{},
    unreadNumber:0,
}

const mailSlice = createSlice({
    name:'mails',
    initialState:initialMailState,
    reducers:{
        firstLoad(state,action){
            state.unreadNumber = 0
            // console.log(Object.entries(action.payload.receivedMails))
            // console.log(action.payload.sentMails)
            state.sent=Object.entries(action.payload.sentMails)
            state.received=Object.entries(action.payload.receivedMails)
            for(let i = 0; i<state.received.length;++i){
                if(state.received[i][1].status ==='unread'){
                state.unreadNumber = state.unreadNumber + 1
              }
            //   console.log(unreadNum)
            }
        },
        onLogOut(state){
            state.sent = {}
            state.received = {}
            state.unreadNumber = 0 
        },
        onRead(state,actions){
            // console.log(actions.payload.id)
            for(let i = 0; i<state.received.length;++i){
                if(state.received[i][1].status ==='unread'){
                    state.received[i][1].status ='read'
                    state.unreadNumber = state.unreadNumber - 1
                    break
                }
            //   console.log(unreadNum)
            }
            
        },
        onDelete(state,action){
            console.log("Here",action.payload)
            var ind = -1
            if(action.payload.in==='received'){
                for(let i = 0; i<state.received.length;++i){
                    if(state.received[i][0]===action.payload.id){
                        ind=i
                        
                        break
                    }
                }
                console.log("Index : ",ind)
                if (ind !== -1) {
                    if(state.received[ind][1].status ==='unread'){
                        state.unreadNumber = state.unreadNumber - 1
                    }
                    state.received.splice(ind, 1);
                }
            }
            if(action.payload.in==='sent'){
                console.log("deleting from sent");
                for(let i = 0; i<state.sent.length;++i){
                    if(state.sent[i][0]===action.payload.id){
                        ind=i
                        break
                    }
                }
                console.log("Index : ",ind)
                if (ind !== -1) {
                    state.sent.splice(ind, 1);
                }
            }
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
