import { useDispatch } from "react-redux";
import { AddComment } from "../store/postSlice";
import { useState } from "react";

function Reply({id , onReply}){
  const dispatch = useDispatch();
  const [replyText,setreplyText]=useState("") // using useState to capture user's input in Add comment Section//
  const avatar = "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

function handleReply(){ //adding new post to the data array
  dispatch(AddComment({ id:id,author: "Amit Sharma",message:replyText,avatar,voteCount:0,comments:[]}))
  setreplyText("");
  onReply();
  }

  function handleComment(event){ // setting user's input to the state
  setreplyText(event.target.value);
  }

return (
  
<div class="flex justify-center py-5 bg-white shadow-lg rounded-lg mx-4 md:mx-auto  mb-10 mt-10 max-w-md md:max-w-2xl ">
   <img class="w-8 h-8 ml-5 mr-5 rounded-full object-cover shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar"/>
   <div class="w-96">
      <textarea onChange={handleComment} value={replyText} rows="4" class="w-full text-sm text-gray-900  rounded-lg border  focus:ring-blue-500 focus:border-blue-500 mx-0 pl-0 " placeholder=" Add Comment..."></textarea>
   </div>
   <button onClick={handleReply} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 h-12 ml-10 rounded">
     Reply
   </button>
</div>

)}

export default Reply;