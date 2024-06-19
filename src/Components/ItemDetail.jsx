import { useState } from "react"

const ItemDetail = ({el,handleViewing,dataitems,handleDelete}) => {


  // const [isSaving, setIsSaving] = useState(false)

  // const [cardItems,setCardItems] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [eidtedTitle,setEditedTitle] =useState(el.user_title)

  const userdataAPI = import.meta.env.VITE_USERDATA_API_URL


  // const cardItems = dataitems.find(dataitems=>dataitems.user_title === el.user_title)
  // console.log(cardItems)

  const filteredUserData = dataitems.filter(item=>item.user_title === el.user_title)
  console.log(filteredUserData)

  const handleSave = () =>{
    return el.user_saved >= 0;
  }
  // console.log(handleSave())

  const handleEdit = () => {
    setIsEditing(!isEditing)
 }

 const handleChange = () => {
  console.log(eidtedTitle)

  

  handleEdit()
 }

  return ( 
    // <div className="absolute bg-[#D9D9D9] min-w-screen top-0 left-0 w-full min-h-screen h-full">
    //   <div className="cover "></div>

    // </div>
    <div className="absolute top-0 *:z-10 left-0 w-screen h-screen grid place-items-center p-4">
{/* min-h-[615px] min-w-[1020px] */}

    <div onClick={handleViewing} className="backgroundCover bg-[#D9D9D9] opacity-90 -z-10 w-full h-full  absolute"></div>

      <div className="ItemReport flex flex-col items-start justify-between p-4 shadow-2xl w-full max-h-[500px] md:max-w-[1020px] bg-[#FED18C] rounded-xl">

        {/* header section */}
        <div className="header  flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="dot size-[25px] bg-[#FF5252] rounded-full "></div>
            <div>
            <input 
            value ={eidtedTitle}
            onChange={(e)=>{
              setEditedTitle(e.target.value)
            }}
            className={`text-[#FF5252] bg-transparent text-3xl ${isEditing && "ring-2 rounded-xl p-1 focus:outline-none"} ${isEditing && 'bg-slate-50'}`}
            readOnly={!isEditing}
            suppressContentEditableWarning={true}/>
              {/* {el.user_title}</h1> */}
            {handleSave() ? <p className="flex text-sm gap-2">Saving <span className=" text-xl font-bold animate-bounce text-green-800 opacity-100"> {el.user_saved}$</span> looking good 😁<span className=" animate-bounce opacity-100">👌.</span> </p>  
              :
              <p className="text-sm flex gap-2">Running low on <span className=" text-xl font-bold animate-bounce text-green-800 opacity-100"> {el.user_saved}$</span> not looking good 😭<span className=" animate-bounce  opacity-100">💸.</span></p>  
              }
              <p className="font-bold">Total : $ {el.user_total}</p>
            </div>
          </div>
          <div className="*:cursor-pointer flex items-center gap-4">
            <p onClick={()=>handleEdit()} className={`${isEditing ? 'hidden' : 'block'}`}>EDIT</p>
            <p onClick={()=>{handleChange()}} className={`${isEditing ? 'block' : 'hidden'}`}>Save</p>
            <button onClick={handleViewing} className="text-5xl hover:text-[#ff5252] transition">X</button>
          </div>
        </div>

        {/* item status  */}

          <div className="w-full h-full min-h-56 px-4 flex flex-col items-start justify-center">
            <h3 className="noteStats text-sm flex gap-1"><p className="font-bold">Expense Note :</p> <p>{el.user_note}</p></h3>
            
            {/* show expense */}
            <div className="w-full min-h-full p-2 flex justify-between *:rounded-xl gap-4">
                <div className="bg-[#F5FBEF] w-1/2 flex items-end flex-col p-4">
                  <h2 className="text-2xl">Items</h2>
                  <ul className="w-full flex flex-col items-end">
        
                    {
                      filteredUserData.map((item,i)=>(
                        <li key={i} className="opacity-60 hover:opacity-100 cursor-default justify-between">
                          <p>{item.item_name}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="h-auto grid items-center"><h2>for</h2></div>
                <div className={`bg-[#F5FBEF] w-1/2 p-4`}>
                  <h2 className="text-2xl">Expense</h2>
                  <ul>
                  {
                      filteredUserData.map((item,i)=>(
                        <li key={i} className="opacity-60 hover:opacity-100 cursor-default justify-between">
                          <p>${item.item_price}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
            </div>
          </div>

        <button onClick={handleDelete} className="text-[#FF5252] px-4 py-2 bg-white rounded-xl">Delete</button>

      </div>

    </div>
   );
}
 
export default ItemDetail;