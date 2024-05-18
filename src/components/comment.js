import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { updateCount, deleteComment, editComment } from "../store/postSlice";
import Modal from "./Modal";
import Reply from "./Reply";


function Comment({comment,handleReply}){

  const dispatch=useDispatch();

  const [voteCount,setVoteCount]=useState(comment.voteCount); // setting voteCount state as the count value in data fetched//
  const [editCommentText,setEditComment]=useState("");  // using useState to capture the text user added to the editComment component//
  const [isDelete,setDelete]=useState(false); // to toggle Modal component//
  const [isEdit,setEdit]=useState(false); // to toggle Edit comment component//
  const [showReply,setShowReply]= useState(false); // using useState to toggle reply section when user wants to reply//


  useEffect(()=>{  // using useEffect to first renders the Comment compoent and access the voteCount for each comment in the fetched data and re-renders it as soon as Comment's votecount gets updated in the data//
     setVoteCount(comment.voteCount);
  },[comment.voteCount]);

  function handleDelete(){  // to show Modal Component
     setDelete(!isDelete);
  }
  function handleYesDelete(){ // calling dispatch function of delete comment and deleting the comment from database//
     dispatch(deleteComment({id:comment.id}));
     setDelete(!isDelete);
  }
  function handleEdit(){ // to show Edit comment section
    setEdit(true);
  }
  function handleUpdate(){ //updating data array with the updated comment//
     dispatch(editComment({id:comment.id,editCommentText}))
     setEdit(false);
     setEditComment("");
  }
  function handleChange(event){ //to capture user's input from the edit Comment section
     setEditComment(event.target.value);
    }
  function handleReply(){  //to show reply component
     setShowReply(!showReply);
   }
  function countUpdate(event) { // to update count state whenever user clicks on vote button(plus/minus)
    const name = event.currentTarget.getAttribute('name');
    let newCount;
    if (name === "Plus") {
      newCount = voteCount + 1;
    } else if (name === "Minus") {
      newCount = voteCount - 1;
    }
    setVoteCount(newCount);
    dispatch(updateCount({ id: comment.id, count: newCount }));
  };

  function formatDate(dateString) { // to format comment's date in the data
     const date = new Date(dateString);
     const options = { day: '2-digit', month: 'long', year: 'numeric' };
     return date.toLocaleDateString('en-US', options);
   }
  
return <div key={comment.id} class="flex bg-white shadow-lg rounded-lg mx-auto mt-4 max-w-md md:max-w-2xl">
       <div class="flex items-start px-4 py-6">
         <div className="flex flex-col items-center mb-2 mr-5 px-2 py-1 bg-blue-100 rounded">
           <FaMinus name="Minus" onClick={countUpdate} className="text-blue-500 cursor-pointer hover:text-blue-700 mb-1" />
           <span className="text-blue-500 font-bold">{voteCount}</span>
          <FaPlus name="Plus" onClick={countUpdate} className="text-blue-500 cursor-pointer hover:text-blue-700 mt-1" />
         </div>
         <div cclassName="w-full">
          <div class="flex items-center justify-between">
           <div class="flex items-center">
            <img class="w-8 h-8 mr-4 rounded-full object-cover mr-4 shadow" src={comment.avatar} alt="avatar"/>
            <h2 className="flex items-center justify-between" >{comment.author} </h2>
            <button class=" hidden bg-blue-500 text-white font-bold py-0 px-4 h-6 mt-1 ml-2 mb-1 rounded">
             You
            </button>
            <small class="text-xs mr-4 text-gray-700 ml-2 "> {formatDate(comment.createdAt)}  </small>
           </div>
           {comment.author === "Amit Sharma" ? ( // using conditional rendering to show delete and Edit icon to the user when logged in
             <div class="flex ml-auto mt-4">
               <div class="flex mt-0 mr-2">
                 <MdDelete class="mt-0.5 text-red-500" />
                 <small onClick={handleDelete} class="text-sm font-bold ml-1 mb-5 text-red-500 cursor-pointer hover:text-red-700"> Delete</small>
               </div>
               <div class="flex mt-0 ">
                 <MdEdit class="mt-0.5 mr-0 text-blue-500" />
                 <small onClick={handleEdit} class="text-sm  font-bold text-blue-500 ml-1 mb-5  cursor-pointer hover:text-blue-700"> Edit </small>
               </div>
             </div>
           ) : (  
             <div class="flex mt-4 "> 
               <FaReply class= "mt-0.5  text-blue-500"></FaReply>
               <small onClick={handleReply} class="text-sm font-bold text-blue-500 ml-1 mb-5 cursor-pointer hover:text-blue-700"> Reply </small> 
             </div>
           )}
           </div>
         {isEdit&&  // using conditonal rendering to show EditComment Component//
         <div>
          <textarea onChange={handleChange} value={editCommentText} rows="4" class=" w-full text-sm text-gray-900 rounded-lg border  focus:ring-blue-500 focus:border-blue-500 mx-0 pl-0 " ></textarea>
          <button onClick={handleUpdate} class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 h-12 rounded">
           Update
          </button>
         </div>}
         {!isEdit && ( 
         <p className="mt-0 text-gray-700 text-sm">
             {comment.message}
         </p>
          )}
          {showReply&& // using conditonal rendering to show Reply Component//
          <Reply onReply={handleReply} id={comment.id} />}
          {isDelete&&   // using conditonal rendering to show Modal Component//
          <Modal onYesDelete={handleYesDelete} onNoCancel={handleDelete}/>}
       </div>
     </div>
    </div>
}
export default Comment;
