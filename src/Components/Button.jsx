import { Link } from "react-router-dom";

const Button = ({name,to,anim}) => {
  return ( 
      <Link to={to} className={`rounded-xl transition duration-150 shadow-md px-[25px] py-[7px] active:bg-[#939393] active:text-white bg-[#ffffff] inter ${anim && "animate-bounce"}`}>
         {name}
      </Link>
   );
}
const  Button2= ({name,to}) => {
  return ( 
    <Link to={to} className="rounded-xl transition duration-150 shadow-md px-[25px] py-[7px] active:bg-[#939393] bg-[#0c0c0c] text-white inter">
    {name}
 </Link>
   );
}
const Button3 = ({name}) => {
return(
    <button type='submit' className="w-full text-white py-[12px] bg-[#fcab10] rounded-xl ">
      {name} 
    </button>
)
}
 
export {Button, Button2, Button3} ;
 
