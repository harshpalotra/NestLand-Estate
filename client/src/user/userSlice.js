import { createSlice } from '@reduxjs/toolkit';
import { signin } from '../../../Server/Controllers/auth.controller';

const initialState = {
    currentUser : null,
    error: null,
    loading: false,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart ,signInSuccess, signInFaliure } = userSlice.actions;

export default userSlice.reducer;
