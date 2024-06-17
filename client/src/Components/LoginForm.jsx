import { useEffect, useState } from "react";
import { Button3 } from "./Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const LoginFrom = () => {
  const userAPI = import.meta.env.VITE_USER_API_URL

  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remembered, setIsRemembered] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{
    sessionStorage.clear()
  },[])

  const handleform = (e) =>{
    e.preventDefault()

    if(isValid()){
      fetch(userAPI+ username)
      .then(res =>{
        if(!res.ok){
           alert('Please enter valid Email')
        }
        return res.json()
      })
      .then(data => {

        if(data.length === 0){
          alert("Invalid Username")
        }

       if(data[0]["confirmpass"] == password){
        // console.log(data)
        console.log('LogIn Success!')
        sessionStorage.setItem('username',username)
        navigate('/home')
       }
       else{
        console.log(password)
        alert('Password do not match ')
        setPassword('')
        return
       }
      })
      .catch(err=>console.error(err))
    }


  }

  const isValid = () => {
    let result = true;

    if(username === '' || username === null){
      result = false;
      toast.error('Please Enter UserName')
    } 
     if(password === '' || password === null){
      result = false;
      toast.error('Please Enter UserPassword')
    }

    return result;
  }
  

  return ( 
    <form onSubmit={handleform}  className="space-y-3 text-black">
        <input
         value={username}
          onChange={(e)=>setUsername(e.target.value)} 
          className="w-full focus:outline-[#fcab10] rounded-xl p-[12px]"
          type="text" 
          placeholder="User Name" 
          required />
       
       <input   value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full focus:outline-[#fcab10] rounded-xl p-[12px]" 
        type="password"
        placeholder="password"
        minLength={8} 
        required
        />

        <div className="flex w-full justify-between text-[14px] text-slate-50">
          <p className="flex gap-1 "> 
            <input type="checkbox" checked={remembered} onChange={()=>setIsRemembered(!remembered)} required />
              Remember me</p>
          <p><u>Forgot Password?</u></p>
        </div>
        <Button3 name={`Login`}/>
    </form>
   );
}
 
export default LoginFrom;