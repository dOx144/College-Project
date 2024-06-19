import { useState } from "react";
import ItemDetail from "./ItemDetail";

const Card = ({el,i,handleDelete,dataitems}) => {
   const [isViewing, setIsViewing] = useState(false)

   const handleViewing = () =>{
      setIsViewing(!isViewing)
   }


  return ( 
      <div key={i} className=" bg-[#272838] group flex flex-col justify-between min-h-[190px] w-full sm:min-w-[300px] md:w-full lg:w-[350px] p-[20px] rounded-xl">
         <div>
            <div className="flex w-full items-center justify-between ">
               <h2 className="text-[#f1f1f1] text-2xl">{el.user_title}</h2>
               <button onClick={()=>handleDelete(i)} className="right-4 text-white scale-0 transition group-hover:scale-100 top-4 text-2xl    hover:text-[#fa6c6c] hover:scale-110">X</button>
            </div>
            <p className="text-[#fff]">{el.user_note}</p>
         </div>
         <button onClick={handleViewing} className="text-xl p-3 w-full bg-[#fff] rounded-xl ">View</button>
         {isViewing && <ItemDetail dataitems={dataitems} handleDelete={handleDelete} handleViewing={handleViewing} el={el}/>}
      </div>
   );
}
 
export default Card;