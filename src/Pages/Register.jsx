import {  useNavigate } from "react-router-dom";
import RegisterForm from "../Components/RegisterForm";


const Register = () => {

  const navigate = useNavigate()

  const doNavigation = () => {
    navigate('/login')
  }


  return ( 
      <div className="grid place-items-center min-h-screen w-full bg-[#f5fbef]">
        <div className="form grid place-items-center rounded-xl h-screen w-[100vw] sm:max-h-[600px] md:space-y-3 bg-[#fff] sm:max-w-[435px] shadow-xl px-[38px] py-[30px]  ">
          <div className="hero space-y-2">
            <h2 className="text-3xl">Create Your <br /> Expense Tracker Account</h2>
            <p>Join Thousands of users already using Expense Tracker to take control of their finances</p>
          </div>

          <RegisterForm/>

          <hr className="w-full "/>
          <p>Already have an account? <button onClick={doNavigation}>Login</button></p>
        </div>
      </div>
   );
}
 
export default Register;