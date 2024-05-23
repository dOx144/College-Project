import { useEffect, useState } from "react";

const CreateItem = ({handleCreate,username}) => {
  const [title, setTitle] = useState('')

  const [items, setItems] = useState([]); // State for items
  const [prices, setPrices] = useState([]); // State for prices
  const [note, setNote] = useState('')

  const [total, setTotal] = useState(''); // State for total
  const [saved, setSaved] = useState(''); // State for saved amount
  const [expense, setExpense] = useState(''); // State for expenses


  const handleItemChange = (e, index) => {
    const newItems = [...items];
    newItems[index] = e.target.value;
    setItems(newItems);
  };

  const handlePriceChange = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
  };

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



  const handleSubmit = () => {


    const userData = {
      id:username,
      title,
      data:[],
      note:note
    }

    prices.map((el,i)=>{
      userData.data.push({
        price: el,
        item: items[i]
      })
    })
    // console.log(items)
    // console.log(prices)
    // console.log(total)
    // console.log(expense)
    // console.log(saved)

    
    // fetch('http://localhost:5000/userdata/' + username,{
    //   method:"PUT",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify({userData})
    // })
    const handleUpdate = async () => {
      try {
        // const updatedUserData = { id: userData.id, title, data, note };
        const response = await fetch('http://localhost:5000/userdata' + username, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
  
        alert('Data updated successfully!');
      } catch (error) {
        console.error('Error updating data:', error);
        alert('Failed to update data. Please try again later.');
      }
    };
  

    console.log(userData)
  }
  
  const isValid = () =>{
    return title && note
  }

  const finalSubmit = () => {
    handleSubmit()
    handleCreate()
  }

  return ( 

      <div  className="min-h-screen gluten h-full w-full absolute  grid place-items-center *:z-10">

        {/* dark layer */}
        <div onClick={handleCreate} className="bg-[#00000080] absolute h-full z-0 w-full ">
        </div>

        {/* card */}
        <div className="form-container bg-[#D9D9D9] space-y-3  rounded-xl p-[25px] w-[450px] min-h-[520px]">

         {/* <p>  rough one 
            <div className="flex items-center w-full justify-between ">
            <div className="title-section flex gap-2">
              <div className="size-[22px] rounded-xl bg-[#ff5252]"></div>
              <h2 className="text-2xl text-[#ff5252]">Add Title...</h2>
            </div>
            <p className="text-5xl ">X</p>
          </div>

          <div className="status ">
            <h2 className="text-lg">Total Balance</h2>
            <div className="flex gap-2 items-end w-full ">
              <input
              value={userBal}
              onChange={(e)=>setUserBal(e.target.value)}
              type="number" className=" focus:outline-none after:content-['$'] text-left bg-slate-500 max-w-24 inline-block px-2 py-1  rounded-xl  text-white"
              placeholder="balance" /> 
              {difference !== 0 && <p className={`after:content-['$'] self-end`}>{difference} </p> }
            </div>
          </div>

          <div>
            <ul className=" flex flex-col items-start gap-2">
              <li className="item flex gap-4 justify-between">
                <input type="text" className="px-4 w-3/5 rounded-xl text-xl py-1" placeholder="Items" />
                <input type="text" className="px-4 w-1/4 rounded-xl" placeholder="Price2" />
               </li>
              <button  className="transition p-2 rounded-xl hover:text-white active:scale-[98%] hover:bg-[#757575] opacity-60">+ Add more </button>
            </ul>
          </div>
          </p>  */}

{/* title section */}
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="size-[22px] rounded-full bg-[#FF5252]"></div>
              <input
              value={title}
              className="text-xl opacity-60 active:opacity-90 focus:opacity-90 focus:outline-none bg-transparent"
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Add Expense..."/>
            </div>
            <button onClick={handleCreate} className="active:scale-95 size-[40px]  text-5xl">X</button>
          </div>

  {/* status section */}
          <div className="flex *:w-1/3 gap-2 items-end ">

            <div className="">
              <h2 className="opacity-60">Total Balance</h2>
              <div className="flex items-center justify-start">
                <input
                type='number' 
                value={total}
                onChange={handleTotalChange}
                className="bg-transparent  after:contents-['$'] opacity-60  py-1 w-[60%]" placeholder="120$"/> 
              {total && <span>$</span>}
              </div>
            </div>  

            <div className="">
              <h2 className="opacity-60">Saved</h2>
              <div className="flex items-center justify-start">
                <input
                readOnly
                type='number' 
                value={saved}
                onChange={(e)=>setSaved(e.target.value)}
                className="bg-transparent  after:contents-['$'] opacity-60  py-1 w-[60%]" placeholder="60$"/> 
              {saved && <span>$</span>}
              </div>
            </div>  

              <div className="">
                <h2 className="opacity-60">Expenses</h2>
                <div className="flex items-center justify-start">
                <input
                readOnly
                type='number' 
                value={expense}
                onChange={(e)=>setExpense(e.target.value)}
                className="bg-transparent  after:contents['$'] opacity-60  py-1 w-[60%]" placeholder="60$"/> 
              {expense && <span>$</span>}
              </div>
            </div>  
          </div>

  {/* items input section */}
          <div className="  space-y-3 ">

            {/* ITEM LIST */}
            <ul className="noScroll space-y-2 max-h-[150px] overflow-y-auto">

              {
                items.map((item, index) => (
                  <li key={index} className="flex w-full justify-between *:rounded-xl gap-4">
                    <input type="text" value={item} onChange={(e) => handleItemChange(e, index)} className="px-4 py-1"/>
                    <input  type="number" value={prices[index]} onChange={(e) => handleExpense(e, index)} className=" after:contents-['$'] w-full px-4 py-1 " placeholder="$" />
                    <button onClick={() =>{ 
                      handleItemDelete(index)
                      setSaved(total,expense)
                      }} className="text-red-600">
                      X
                    </button>
                  </li>
                ))
              }
            </ul>
            <button 
            onClick={addItem} 
            className="hover:bg-[#fff9] p-2 rounded-xl active:scale-95 transition"
            >{items.length === 0 ? `+ Add Item` : `+ Add More`}</button>

            {/* NOTE SECTION */}
            <textarea
            value={note} 
            onChange={e=>setNote(e.target.value)}
            className="w-full min-h-[150px] p-2 rounded-xl focus:outline-none" placeholder="short note..." ></textarea>
          </div>
          
          <button className={`${isValid() && 'animate-bounce'} px-4 py-2 bg-[#0004] text-white rounded-xl `} onClick={finalSubmit}>Create</button>
        </div>
      </div>

  );
}
 
export default CreateItem;