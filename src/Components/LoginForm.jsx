import { useEffect, useState } from "react";
import { Button3 } from "./Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const LoginFrom = () => {

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
      fetch('http://localhost:5000/users/'+ username)
      .then(res =>{
        if(!res.ok){
           alert('Please enter valid Email')
        }
        return res.json()
      })
      .then(data => {
       if(data.confirmPass === password){
        console.log(data)
        sessionStorage.setItem('username',username)
        navigate('/home')
       }
       else{
        alert('Password do not match ')
        setPassword('')
        return
       }
        // if(Object.keys(data).length === 0)
        //   {
        //     toast.error('Please Enter Valid User Name')
        //   }else{
        //       if(data.password === password){   
        //         toast.success("Success")
              
        //       }else{
        //         toast.error('Please Enter Valid User Name')

        //       }

        //   }

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