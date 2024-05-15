import { configureStore } from "@reduxjs/toolkit";
import { PostReducer } from "./postSlice.js";

const store=configureStore({ //confuguring redux store//
 reducer :{
    post:PostReducer,
 }
});

export default store;
