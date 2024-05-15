import { FaReply } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import { updateCount ,deleteComment } from "../store/postSlice.js";
import Reply from "./Reply.js";
import Comment from "./comment.js";
import Modal from "./Modal";

function Post({post}){

  const dispatch=useDispatch();

  const[voteCount,setVoteCount]=useState(post?.voteCount || 0); // setting voteCount state as the count value in data fetched//
  const[showReply,setShowReply]= useState(false); // using useState to toggle reply section when user wants to reply//
  const[isDelete,setDelete]=useState(false); // to toggle Modal component//

  useEffect(() => {
    if (post && post.voteCount !== undefined) {
      setVoteCount(post.voteCount);
    }
  }, [post]);

  function handleDecrease(){ // function to handle decreasing vote count when user clicks on "minus" button//
    const newCount= voteCount-1;
    setVoteCount(newCount);
    dispatch(updateCount({id:post.id,count:newCount}));
  }

  function handleIncrease(){ // function to handle increasing vote count when user clicks on "plus" button//
    const newCount= voteCount+1;
    setVoteCount(newCount);
    dispatch(updateCount({id:post.id,count:newCount}));
  }

  function handleReply(){  // to show Reply Component
    setShowReply(true);
  }
  function handleSendReply(){ // to close Reply component when reply is sent
    setShowReply(false);
  }

  function handleDelete(){  //to show Modal Component
    setDelete(true);
 }

 function handleYesDelete(){ // calling dispatch function of delete comment and deleting the comment from database//
    dispatch(deleteComment({id:post.id}));
    setDelete(false);
 }

 function handleNoCancel(){  // setting show Modal Component state as false
    setDelete(false);
 }
 
 function formatDate(dateString) { //function to format the post's date
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


 const renderComments = (comments, level = 1) => { // recursive function to traverse through all the comments under each post//
        return comments.map((comment) => (
          <div key={comment.id} className={`ml-${level * 6} border-l-2 border-blue-100 pl-2`} >
            <Comment handleReply={handleReply} comment={comment} />
            { comment.comments && renderComments(comment.comments, level + 1)}
        </div>
    ));
};
if (!post) { // adding case when the posts are not rendered
  return <div>Loading...</div>;
}
return <div key={post.id} class="flex bg-white pl-10 pr-0 shadow-lg rounded-lg mx-4 md:mx-auto mt-10 max-w-md md:max-w-2xl ">
         <div class="flex items-start px-4 py-6">
         <div className='flex flex-col items-center mb-2 mr-5 px-2 py-1 bg-blue-100 rounded'>
          <FaMinus onClick={handleDecrease} className="text-blue-500 cursor-pointer hover:text-blue-700 mb-1" />
          <span className="text-blue-500 font-bold">{voteCount}</span>
         <FaPlus onClick={handleIncrease} className="text-blue-500 cursor-pointer hover:text-blue-700 mt-1" />
         </div>
         <div class="">
           <div class="flex items-center justify-between">
             <div class="flex">
               <img class="w-8 h-8 mr-1 mb-4 rounded-full object-cover mr-4 shadow" src= {post.avatar} alt="avatar"/>
               <h2 class="text-lg font-semibold text-gray-900 mt-0">{post.author} </h2>
               <small class="text-sm text-gray-700 ml-3 mt-1">  {formatDate(post.createdAt)} </small>
            </div> 
            {post.author === "Amit Sharma" ? ( // using conditional rendering to display Delete icon to the user's post when logged in
              <div class="flex ml-20 px-0">
                <div class="flex">
                  <MdDelete class="mt-0.5 ml-10 text-red-500" />
                  <small onClick={handleDelete} class="text-sm font-bold mr-4 mb-5 text-red-500 cursor-pointer hover:text-red-700"> Delete</small>
                </div>
                <div class="flex mt-0   ">
                <FaReply class= "mt-0.5 text-blue-500"></FaReply>
                <small onClick={handleReply} class="text-sm  font-bold text-blue-500 ml-1 mb-5 cursor-pointer hover:text-blue-700"> Reply </small> 
              </div>
              </div>
            ) : (
              <div class="flex mt-0   ">
                <FaReply class= "mt-0.5 text-blue-500"></FaReply>
                <small onClick={handleReply} class="text-sm  font-bold text-blue-500 ml-1 mb-5 cursor-pointer hover:text-blue-700"> Reply </small> 
              </div>
            )}
          </div>
         <p class="mt-0 text-gray-700 text-sm">
            {post.message}
         </p>
         {showReply&& //using conditional rendering to show Reply Component
         <Reply onReply={handleSendReply} id={post.id} />} 
         {isDelete&&   // using conditonal rendering to show Modal Component//
          <Modal onYesDelete={handleYesDelete} onNoCancel={handleNoCancel}/>}
         <div class="mt-4">
         {renderComments(post.comments)}  
         </div>
        </div>
      </div>
      </div>
   }
export default Post;
