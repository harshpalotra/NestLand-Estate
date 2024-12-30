import { createSlice } from '@reduxjs/toolkit';
import { signin } from '../../../Server/Controllers/auth.controller';
import { updateUser } from '../../../Server/Controllers/user.controller';
import { deleteUser } from 'firebase/auth';

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
        },
        updateUserStart:(state) =>{
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess:(state, action) =>{
            state.currentUser= action.payload;
            state.loading = false;
            state.error = null;
    },
    updateUserFailure:(state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    deleteUserStart:(state)=>{
        state.loading = true;
        state.error = null;

    },
    deleteUserSuccess:(state, action) =>{
        state.currentUser= null;
        state.loading = false;
        state.error = null;

    },
    deleteUserFailure:(state, action) =>{
        state.error = action.payload;
        state.loading = false;
},
signOutUserStart:(state)=>{
    state.loading = true;
    state.error = null;

},
signOutUserSuccess:(state, action) =>{
    state.currentUser= null;
    state.loading = false;
    state.error = null;

},
signOutUserFailure:(state, action) =>{
    state.error = action.payload;
    state.loading = false;
},
    }
});

export const { signInStart ,signInSuccess, signInFaliure
, updateUserStart, updateUserSuccess, updateUserFailure ,
deleteUserStart, deleteUserSuccess, deleteUserFailure,
signOutUserStart, signOutUserSuccess, signOutUserFailure
 } = userSlice.actions;

export default userSlice.reducer;
