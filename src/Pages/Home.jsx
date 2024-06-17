import { useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation";
import { useEffect, useState } from "react";
// import CreateItem from "../Components/CreateItem";
import Greeting from "../Components/Greeting";
import MakeItem from "../Components/MakeItem";
import Card from "../Components/Card";


const Home = () => {
  const userDATA = import.meta.env.VITE_USERDATA_API_URL
  const dataitemsAPI = import.meta.env.VITE_DATAITEMS_API_URL

  const [userData, setUserData] = useState([])
  const [dataitems,setDataItems] = useState([])

  const [err,setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [creating, setIsCreating] = useState(false)

  const navigate = useNavigate()

  let username = sessionStorage.getItem('username')
  // http://localhost:5000/userdata/' + username

  useEffect(()=>{

    if(username === '' || username === null){
      navigate('/login')
    }


    const fetchUserData = async () => {
      setIsLoading(true)
      try{
        const res = await fetch(userDATA + username)

        if(!res.ok){
          throw new Error(res.statusText)
        }

        const data = await res.json()
        // console.log(data)
        setUserData(data)
        // console.log(data.innerdata)
      }catch(err){
        setErr(err)
      }finally{
        setIsLoading(false)
      }
    }

    const fetchDataItems = async ()=>{
      try{
        const res = await fetch(dataitemsAPI)

        if(!res.ok){
          throw new Error(res.statusText)
        }

        const data = await res.json()

        // console.log(data)
        setDataItems(data)
      }catch(err){
        console.log(err)
      }
    };
    
    fetchUserData()
    fetchDataItems()
   
  },[])

  
  const handleCreate = () => {
    setIsCreating(!creating)
  }

  const handleDelete = async (el) => {
    // console.log(el.user_title)
    try {
      const response = await fetch(userDATA + el.user_title, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Item DELETED");
      window.location.reload()// Reload the window after deletion
  } catch (err) {
    console.error("An error occurred while deleting the item:", err.message);
  }
  };
      
  return ( 

    <div className="flex relative gluten flex-col md:flex-row transition-all">
      <Navigation />
      
      <main className="flex gap-4 flex-wrap items-start justify-center h-full sm:justify-center px-4 pt-20 sm:pt-32" >
      {isLoading && <p>Loading...</p>}
      {userData.length !== 0 && 
        <div className="absolute top-32 md:top-4 right-8 flex items-center gap-4">
          <p className="px-4 py-2 group bg-[#D6EFFF] rounded-xl active:opacity-100 active:before:contents-['available soon']">Sort by : date</p>
          <button onClick={handleCreate} className=" px-4 py-2 bg-[#D6EFFF] rounded-xl">+Add more</button>
        </div>
        
      }

        {/* shows when no user datas */}
        {userData.length===0 && <Greeting username={username} handleCreate={handleCreate}/>}

        {/* shows when error */}
        {err && <p>{err}</p>}

        {/* shows if data is available  */}
        
          {userData.map((el,i)=>(
            <Card key={i} dataitems={dataitems} handleDelete={()=>{handleDelete(el)}} el={el}/>
          ))}

     </main>
      
      {/* {creating && <CreateItem username={username} handleCreate = { handleCreate }/>} */}
      {
      creating 
      && 
      <MakeItem username={username} userData={userData} handleCreate = { handleCreate }  />
      }
    </div>
    

  );
}
 
export default Home;


    // check user exists
    // fetch('http://localhost:5000/users/'+ username)
    // .then(res => {
    //   if(!res.ok){
    //     throw new Error('User do not exist')
    //   }
    //  return res.json()
    // })
    // .then(data => {
    //   setUserName(data.id)
    //   console.log(data)
    //   // console.log(data)
    //   console.log('Welcome ' + data.fName + "😁👍")
    // })

    // fetches user datas
    // const fetchData = async () => {
    //   try {
    //     const res = await fetch(`http://localhost:5000/userdata/` + username);
        
    //     if (!res.ok) {
    //       setUserData('')
    //     }
        
    //     const dat = await res.json();
    //     setUserData(dat.data)
    //     console.log(dat)
        
    //     // console.log(typeof(userData)) 
    //     // console.log(userData)
    //     // console.log(userData.map(el=>el.title))

    //     // console.log(typeof(userData))
    //     // console.log(userData.map(el=>console.log(el.title)))
        
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchData()