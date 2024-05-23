
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakeItem = ({handleCreate,username, userData}) => {
  
  const id = username

  const [title, setTitle] = useState('')

  const [total, setTotal] = useState('')
  const [saved, setSaved] = useState('')
  const [expense, setExpense] = useState('')

  const [items, setItems] = useState([])
  const [prices, setPrices] = useState([])
  const navigate = useNavigate()

  // const [itemsList, setItemsList] = useState([])
  // const [pricesList, setPricesList] = useState([])

  const [note, setNote] = useState('')


  const handleItemChange = (e, index) => {
    const newItems = [...items];
    newItems[index] = e.target.value;
    setItems(newItems);
  };

  // const handlePriceChange = (e, index) => {
  //   const newPrices = [...prices];
  //   newPrices[index] = e.target.value;
  //   setPrices(newPrices);
  // };

  const handleTotalChange = (e) => {
    const totalValue = parseFloat(e.target.value) || 0;
    setTotal(e.target.value); 
    const expenseValue = parseFloat(expense) || 0;
    const calcSaved = totalValue - expenseValue;
    setSaved(calcSaved);
  };

  const handleExpense = (e, index) => {
    const newPrice = parseFloat(e.target.value) || 0;
    const newPrices = [...prices];
    newPrices[index] = newPrice;
    setPrices(newPrices);

    const totalPrices = newPrices.reduce((acc, price) => acc + parseFloat(price || 0), 0);
    setExpense(totalPrices);

    const totalSaved =  total - totalPrices
    setSaved(totalSaved)
  };

  const handleItemDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);

    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);

    const totalPrices = newPrices.reduce((acc, price) => acc + parseFloat(price || 0), 0);
    setExpense(totalPrices);
  };

  const addItem = () => {
    setItems([...items, '']);
    setPrices([...prices, '']);
  };


  const isValid = () => {
    return title !== '' && note !== '';
  };

  
  const handleSubmit = () =>{

    if(!isValid()){
      alert("invalid input")
      return
    }

    const newData = prices.map((el, i) => ({
      item: items[i],
      price: el
    }));


    const data = {
      title,
      note,
      innerItems:newData,
      total,
      expense,
      saved
    }

    const myDat ={
      id,
      innerdata:[...userData,data],
    }
    console.log(myDat)
    // console.log(userData)
    // console.log(sendData)

    fetch('http://localhost:5000/userdata/' + id,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(myDat)
      }).then(res=>{
        if(!res.ok){
          throw new Error(res.statusText)
        }
        else{
          res.json()
        } 
      }).then(data=>{
        console.log(data)
        handleCreate()
        window.location.reload();
        })
      .catch(err=>console.log(err))
  }

  return ( 

      <div  className="min-h-screen gluten h-full w-full absolute  grid place-items-center *:z-10">

        {/* dark layer */}
        <div 
        onClick={handleCreate}
        className="bg-[#00000080] absolute h-full z-0 w-full">
        </div>

        {/* card */}
        <div className="form-container flex flex-col item-start justify-between bg-[#D9D9D9] space-y-3  rounded-xl p-[25px] w-[450px] min-h-[520px]">


{/* title section */}
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="size-[22px] rounded-full bg-[#FF5252]"></div>
              <input
              value={title}
              onChange={e=>setTitle(e.target.value)}
              className="text-xl opacity-60 active:opacity-90 focus:opacity-90 focus:outline-none bg-transparent"
              placeholder="Add Expense..."/>
            </div>
            <button
            onClick={handleCreate}
             className="active:scale-95 size-[40px]  text-5xl">X</button>
          </div>

  {/* status section */}
          <div className="flex *:w-1/3 gap-2 items-end ">

            <div className="">
              <h2 className="opacity-60">Total Balance</h2>
              <div className="flex items-center justify-start">
                <input
                value={total}
                onChange={handleTotalChange}
                type='number' 
                className="bg-transparent  after:contents-['$'] opacity-60  py-1 w-[60%]" placeholder="120$"/> 
              {total && <span>$</span>}
              </div>
            </div>  

            <div className="">
              <h2 className="opacity-60">Saved</h2>
              <div className="flex items-center justify-start">
                <input
                value={saved}
                readOnly
                type='number' 
                className="bg-transparent  after:contents-['$'] opacity-60  py-1 w-[60%]" placeholder="60$"/> 
              {saved && <span>$</span>}
              </div>
            </div>  

              <div className="">
                <h2 className="opacity-60">Expenses</h2>
                <div className="flex items-center justify-start">
                <input
                readOnly
                value={expense}
                type='number' 
                className="bg-transparent  after:contents['$'] opacity-60  py-1 w-[60%]" placeholder="60$"/> 
              {expense && <span>$</span>} 
              </div>
            </div>  
          </div>

  {/* items input section */}
          <div className="  space-y-3 ">

            {/* ITEM LIST */}
            <ul className="p-1 space-y-2 max-h-[150px] overflow-y-auto">
            {items.map((item, index) => (
              <li key={index} className=" *:rounded-xl *:px-2 *:py-1 group overflow-hidden flex gap-2">
                <input 
                value={item}
                // onChange={e=>handleItem(e,index)}
                onChange={e=>handleItemChange(e, index)}
                type="text" 
                className=""
                placeholder="Item" />

                <input 
                value={prices[index]}
                onChange={e=>handleExpense(e, index)}
                type="number" 
                className="w-full" 
                placeholder="Value" />

                <div
                onClick={()=>{
                  handleItemDelete(index)
                }}
                className="text-red-500 translate-x-full opacity-0 group-hover:translate-x-0 transition group-hover:opacity-100 cursor-pointer"
                >X</div>
              </li>
            ))}
            </ul>
            <button 
            onClick={addItem}
            className="hover:bg-[#fff9] p-2 rounded-xl active:scale-95 transition"
            >{items.length === 0 ? `+ Add Item` : `+ Add More`}</button>

            {/* NOTE SECTION */}
            <textarea
            value={note} 
            onChange={e=>setNote(e.target.value)}
            className="w-full min-h-[150px] max-h-[200px] p-2 rounded-xl focus:outline-none" placeholder="short note..." ></textarea>
          </div>
          
          <button 
          onClick={handleSubmit}
          className={`${isValid() && 'animate-bounce'}
          px-4 py-2 bg-[#0004] text-white rounded-xl `} >Create</button>
        </div>
      </div>

  );
}
export default MakeItem; 

// useEffect(()=>{

//   const fetchData = async () => {
//     try{
//       const res =  await fetch('http://localhost:5000/userdata/'+ id)
      
//       if(!res.ok){
//         throw new Error(res.statusText)
//       }

//       const data =  await res.json()
//       console.log(data)
//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   fetchData()
// },[])
