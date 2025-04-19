import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        updateFeed:(state,payload) => {
            state = payload.payload;
            return state;
        },
        removeFeed:(state)=>{
            state=null;
            return state;
        }
    }
});

// Action creators are generated for each case reducer function
export const {updateFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer;