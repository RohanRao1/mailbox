import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authentication'
import inboxSlice from './inboxSlice'


const store = configureStore({
    reducer : {
        auth : authSlice,
        inbox : inboxSlice,
        
    }
})

export default store