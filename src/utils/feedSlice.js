import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        updateFeed:(state,payload) => {
            state = payload.payload;
            return state;
        },
        removeUserFeed:(state,payload)=>{
            const newFeed = state.filter((u)=>u._id !== payload.payload);
            return newFeed;
        }
    }
});

// Action creators are generated for each case reducer function
export const {updateFeed, removeUserFeed} = feedSlice.actions;
export default feedSlice.reducer;