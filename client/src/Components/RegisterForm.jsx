import { useNavigate } from "react-router-dom";
import { Button3 } from "./Button";
import { useState } from 'react'

const RegisterForm = () => {
  const userAPI = import.meta.env.VITE_USER_API_URL
  const userdataAPI = import.meta.env.VITE_USERDATA_API_URL


  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [agreed, setIsAgreed] = useState(false)
  const [confirmPass, setConfirmPass] = useState('')
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  
  
  const [id, setId] = useState('')

  const userData = {
    id,
    innerdata:[]
  }


  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {user_id:id,
                      first_name:fName, 
                      last_name:lName, 
                      user_email:email, 
                      confirmPass, 
                      user_agree:agreed}

    if(pass === confirmPass){

      // fetches user info
      fetch(userAPI,{
         method:'POST',
         headers:{
           'Content-Type':'application/json'
         },
         body: JSON.stringify(newUser)
       }).then(res =>{
              if(res.ok){
                console.log("Registered Successfully")
              }
              console.log(res.status)
              if(!res.ok){
                console.log("couldnt Fetch the data")
              }
                res.json()
       })
       .then(data => console.log(data))
       .catch(error => console.error('Error posting data:', error.message))

      //  fetches user data
      // fetch(userdataAPI,{
      //   method:"POST",
      //   headers:{
      //     'Content-Type':'application/json',
      //   },
      //   body: JSON.stringify(userData)
      // })
      // .then(res=>{
      //   if(!res.ok){
      //     throw new Error(`Couldn't Post the data in database`)
      //   }
      //   res.json()
      // })
      // .then(data => console.log(data))
      // .catch(err=>console.log(err.message))

      setLName('')
      setFName('')
      setEmail('')
      setPass('')
      setConfirmPass('')
      setIsAgreed(false)
      navigate('/login')

     }else {
       console.log('Passwords do not match')
    }
    
   
  }
  // const isValid = () => {
  //   const r = true;

  //     if(fName === '' || fName === null){
  //       alert('Fill up the forms ')
  //       return false
  //     }
  //     if(lName === '' || lName === null){
  //       alert('Fill up the forms ')
  //       return false
  //     }
  //     if(email === '' || email === null){
  //       alert('Fill up the forms ')
  //       return false
  //     }
  //     if(confirmPass === '' || confirmPass === null){
  //       alert('Fill up the forms ')
  //       return false
  //     }  
  //     if(agreed === false){
  //       alert('Fill up the forms ')
  //       return false
  //     }
    

  //   return r;
  // }

  const checkPass = (e) => {
    const newPass = e.target.value
    setConfirmPass(newPass) 
    const tx = newPass === pass ? `#1e1e1e` : `#ff5252` 
    e.target.style.color = tx
    if(newPass != pass) {
      setErr(true)
    }
    else{
      setErr(false)
    }
  }



  return ( 
    <form action="#" onSubmit={handleRegister} className=" space-y-[10px]">
      <div className="flex gap-4">
        <input 
        className="p-3 bg-[#eee] rounded-xl w-full" 
        type="text" 
        name="firstNname" 
        placeholder="First Name" 
        value={fName} 
        onChange={(e)=>setFName(e.target.value)}
        required
        />
        
        <input className="p-3 bg-[#eee] rounded-xl w-full" 
        type="text"
         name="lastName" 
         placeholder="Last Name" 
         value={lName} 
         onChange={(e)=>setLName(e.target.value)}
         required
         />
      </div>
      <input className="p-3 bg-[#eee] rounded-xl w-full" 
        type="text"
         name="username" 
         placeholder="User Name" 
         value={id} 
         onChange={(e)=>setId(e.target.value)}
         required
         />
      <input 
      className="p-3 bg-[#eee] rounded-xl w-full" 
      type="email" 
      name="email" 
      placeholder="Email"
      value={email} 
      onChange={(e)=>setEmail(e.target.value)}
      required
      />

      <input 
      className="p-3 bg-[#eee] rounded-xl w-full" 
      type="password" 
      name="pass" 
      placeholder="Password"
      minLength={8}
      value={pass} 
      onChange={(e)=>setPass(e.target.value)}
      required
       />

      <input className="p-3 bg-[#eee] rounded-xl w-full" 
      type="password" 
      name="confirmPass" 
      placeholder="Confirm Password"
      value={confirmPass} 
      onChange={checkPass}
      required
      />
      {err && 
      <label className="text-sm text-[#ff5252]" name='confirmPass'>Password do not match!</label>
      }
      

      <div className="text-[10px] flex items-center gap-2">
        <input type="checkbox" 
        checked = { agreed}
        onChange={() => setIsAgreed(!agreed)}
        required
        />
        By creating an account, you agree to our Terms and conditions.
      </div>
      <Button3 name={`Register`}/>
    </form>
  );
}
 
export default RegisterForm;