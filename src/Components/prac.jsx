import { useState } from "react";

const Prac = () => {

  const [item, setItem] = useState([])
  const [price, setPrice] = useState([])

  const [innerData, setInnerData] = useState([]) 
  
  const addItem = () => {
    setItem([...item,''])
    setPrice([...price,''])
    console.log(item)
    console.log(price)
  }
  const removeItem = (i) => {
    const newItem = [...item]
    newItem.splice(i, 1)
    setItem(newItem)

    const newPrice = [...price]
    newPrice.splice(i, 1)
    setPrice(newPrice)
   
  }
  const handleAdd = (e,i) => {
     const newItem = [...item]
     newItem[i] = e.target.value
     setItem(newItem)
  }
  const handleExpense = (e,i) =>{
    const newPrice = parseFloat(e.target.value) || 0;
    const newPrices = [...price]
    newPrices[i] = newPrice
    setPrice (newPrices)

    const totalPrices = newPrices.reduce((acc, price) => acc + parseFloat(price || 0), 0);
    setPrice(totalPrtotalPricestotalPricesices)

  }

  return ( 
      <div className="grid min-h-screen *:p-2 gap-4 place-items-center">
        <div className="flex flex-col gap-4">
          <div>
            <div>{item}</div>
            <div>{price}</div>
          </div>
          <ul className="flex flex-col gap-2">
            {item.map((el,i)=>(
              <li key={i} className="*:ring-1  flex gap-4">
                <input type="text"
                value={el} 
                onChange={e=>handleAdd(e,i)}
                />
                <input className="" type="number" 
                value={price[i]} 
                onChange={(e)=>handleExpense(e,i)}
                />
                <button onClick={removeItem}>delete</button>
              </li>
            ))}
            <button
            onClick={()=>{
              addItem()
              console.log(item)
            }} className="ring-1 p-1">+add item</button>
          </ul>
        </div>
      </div>
  );
}
 
export default Prac;