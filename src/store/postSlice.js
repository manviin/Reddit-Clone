import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// using createAsyncThunk to call Api
export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
    try {
      const response = await axios.get('https://654077a245bedb25bfc1f7eb.mockapi.io/comments');
      return response.data.map(post => ({
        ...post,
        id: uuidv4(), // Generate unique ID for each post
      comments: generateUniqueIdsForComments(post.comments) 
    }));
  } catch (error) {
    throw error;
  }
});
    
  //  function to generate unique IDs for comments and their nested comments
    const generateUniqueIdsForComments = (comments) => {
      return comments.map(comment => ({
        ...comment,
        id: uuidv4(),
        comments: comment.comments ? generateUniqueIdsForComments(comment.comments) : []
      }));
    };

  // function to generate current date
    function getCurrentDate() {
      const currentDate = new Date();
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return currentDate.toLocaleDateString('en-US', options);
    }
    
    
  const postSlice = createSlice({ // creating post slice
    name:"post",
    initialState:{
        posts:[],
        loading:false,
        error:null,
    },
    reducers:{
        addPost(state,action){      // to add post in the post array
        const{author, avatar,message, voteCount, comments} = action.payload;  
        state.posts.push({id: uuidv4(), author,avatar,message, voteCount, createdAt :getCurrentDate(),comments });
        },
        AddComment(state,action){    // to add comment when user clicks sends reply//
          const{author, avatar,message,voteCount, comments} = action.payload;  
          const {id}= action.payload;
          const data={ id : uuidv4(), author, avatar , message , voteCount, createdAt : getCurrentDate(),comments}
            if(findAndAddComment(state.posts,id,data)){
                state.posts=[...state.posts];
            }
        },
        editComment(state,action){   // to edit comment when user updates te comment//
            const{id,editCommentText}= action.payload;
            if (findAndEditComment(state.posts,id,editCommentText)){
                state.posts=[...state.posts];
             }
            },
        

        deleteComment(state, action) { // to delete comment when user clicks delete
              const { id } = action.payload;
              if (findAndDeleteComment(state.posts, id)) {
                  state.posts = [...state.posts];
              }
            },

        updateCount(state,action){ // to update count of the post or comment in the post array//
            const{id,count}=action.payload;
            if(findAndUpdateCount(state.posts,id,count)){
                state.posts=[...state.posts];
            }
          }
        },
          
      extraReducers: (builder) => {
            builder
              .addCase(fetchPosts.pending, (state) => {  // to set state when promise is pending
                state.loading = true;
              })
              .addCase(fetchPosts.fulfilled, (state, action) => { // to set state when promise is fulfilled
                state.posts = action.payload;
                 state.loading = false;
              })
              .addCase(fetchPosts.rejected, (state,action) => {  // to set state when promise is rejected
                state.loading = false; 
                state.error = action.error?.message;
              });
            }
          });
    
    
  const findAndAddComment=(posts,id,data)=>{ //recursive function to Add Comment
    for(let i=0;i<posts.length;i++){
        if(posts[i].id===id){
            posts[i].comments.push(data);
            return true;
        }
        if(posts[i].comments){
          if(findAndAddComment(posts[i].comments,id,data)) {
            return true;
          }
        }
    }
        return false;
};
  const findAndUpdateCount=(posts,id,count)=>{  //recursive function to Update Count
    for(let i=0;i<posts.length;i++){
        if(posts[i].id===id){
            posts[i].voteCount=count;
            return true;
        }
        if(posts[i].comments){
          if(findAndUpdateCount(posts[i].comments,id,count)) {
            return true;
          }
        }
    }
        return false;
};
    
  const findAndEditComment =(posts,id,text)=>{  //recursive function to Edit Comment
    for(let i=0;i<posts.length;i++){
        if(posts[i].id===id){
            posts[i].message=text;
            return true;
        }
        if (posts[i].comments && posts[i].comments.length > 0) {
          if (findAndEditComment(posts[i].comments, id, text)) {
            return true;
          }
        }
    }
        return false;
};

const findAndDeleteComment = (posts, id) => { //recursive function to Delete Comment
  for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
          posts.splice(i, 1);
          return true;
      }
      if (posts[i].comments && posts[i].comments.length > 0) {
          if (findAndDeleteComment(posts[i].comments, id)) { 
              return true;
          }
      }
  }
  return false;
};


export  const {addPost,AddComment,editComment,deleteComment,updateCount}=postSlice.actions;
export const PostReducer=postSlice.reducer;
        

    
 