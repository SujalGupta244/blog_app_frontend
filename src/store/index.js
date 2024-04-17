import {configureStore, createSlice} from '@reduxjs/toolkit';


const loginSlice = createSlice({
    name:'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        }
    }
})

export const authActions = loginSlice.actions;

export const store = configureStore({
    reducer: loginSlice.reducer
})


