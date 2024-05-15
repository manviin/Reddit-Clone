import Post from "./Post";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchPosts } from "../store/postSlice";


 
function PostList(){
   const dispatch= useDispatch();

    useEffect(()=>{  // using useEffect to first renders the post when the app starts//
     dispatch(fetchPosts())
    },[dispatch]);
    
    //accessing states using useSelector//
    const posts = useSelector((state)=>
        state.post.posts);
    
    const loading = useSelector((state)=>
        state.post.loading);
   
    const error = useSelector((state)=>
        state.post.error);
    

    return (
        <div className="mt-28">
          {loading && <p className="text-center mt-2 font-bold text-blue-500 text-3xl">Posts are Loading...</p>}
          {error && <p className="text-center mt-2 font-bold text-red text-3xl">Oops Error!!</p>}
          { posts?.map((post) => ( // mapping through each post items and calling Post component//
            <Post key={post.id}post={post} />
          ))}
        </div>
      );
}

export default PostList;

