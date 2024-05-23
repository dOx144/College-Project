import { useState } from "react";

const Mockup = () => {
  const [total, setTotal] = useState(''); // State for total
  const [saved, setSaved] = useState(''); // State for saved amount
  const [expense, setExpense] = useState(''); // State for expenses
  
  const [items, setItems] = useState([]); // State for items
  const [prices, setPrices] = useState([]); // State for prices
  const [note, setNote] = useState('')



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

    const data = {
      id:"jake",
      data:[],
      note:note
    }
 

    prices.map((el,i)=>{
      data.data.push({
        id: el,
        item: items[i]
      })
    })


    fetch('http://localhost:5000/mockup/'+'jake',{
      method:"PUT",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify(data)
    }).then(res=>{
      if(!res.ok){
        throw new Error('couldnt fetch because:' + res.statusText)
      }
      return res.json()
    }).then(data => {
      console.log(data)
    }).catch(err=>console.log(err.message))


    // console.log(items)
    // console.log(prices)
    // console.log(total)
    // console.log(expense)
    // console.log(saved)
    console.log(data)
  }

  const [myItems,setMyItems] = useState(['apple','banana','cow'
  ])
  const handleDelete = (i) => {
    const newItem = [...myItems]
    newItem.splice(i,1)
    setMyItems(newItem)
  }

  return ( 
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input type="number" value={total} onChange={handleTotalChange} className="ring-1" placeholder="Total" />
        <input type="number" value={saved} className="ring-1" placeholder="Saved" readOnly />
        <input type="number" value={expense}  className="ring-1" placeholder="Expense" readOnly />
      </div>
      <ul className="flex flex-col w-[500px]">
        {items.map((item, index) => (
          <li key={index} className="p-4 flex gap-4">
            <input type="text" value={item} onChange={(e) => handleItemChange(e, index)} className="w-full ring-1 ring-black" placeholder="Item" />
            <input type="number" value={prices[index]} onChange={(e) => handleExpense(e, index)} className="basis-1/5 ring-1 ring-black" placeholder="Value" />
            <button onClick={() =>{ 
              handleItemDelete(index)
              setSaved(total,expense)
              }}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
        <textarea className="ring-1 h-[220px]" value={note} onChange={e=>setNote(e.target.value)} name="" id=""></textarea>
      <button onClick={handleSubmit}>Save</button>


      <div className="ring-1 p-4">
      {myItems.map((el, i) => (
        <div key={i} className="flex gap-4">
          <p>{el}</p>
          <button onClick={() => handleDelete(i)}>delete</button>
        </div>
      ))}
      </div>
    </div>
  );
}
 
export default Mockup;
