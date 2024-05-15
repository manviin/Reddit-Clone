function Navbar(){

const handleClick = () => {
   window.location.reload(); //  to Reload the page when the div is clicked
};

return(
<div className=" fixed top-0 left-0 right-0 bottom-10 h-20 flex bg-blue-300 w-full" onClick={handleClick}>
  <img alt="reddit-logo" className=" cursor-pointer pt-3 pb-3 pl-2" src="https://freelogopng.com/images/all_img/1658834095reddit-logo-png.png"></img>
  <div className="text-3xl text-white pl-2 pt-5 font-bold hover:text-blue-700 cursor-pointer">
   Reddit Clone
  </div> 
</div>
)
}

export default Navbar;