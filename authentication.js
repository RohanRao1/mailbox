import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
    token : localStorage.getItem('token'),
    isAuthenticated : localStorage.getItem('isAuthenicated') === 'true',
    userEmail : localStorage.getItem('email')
}

const authSlice = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers : {
        login(state, action) {
            state.token = action.payload.token
            state.userEmail = action.payload.email
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('isAuthenticated', true)
        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('isAuthenticated', false)
        }
    }
})


export const authActions = authSlice.actions

export default authSlice.reducer