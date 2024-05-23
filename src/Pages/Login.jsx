import { Link } from "react-router-dom";
import LoginFrom from "../Components/LoginForm";

const Login = () => {

  return ( 
    <div className="bg-[#f5fbef]  inter min-h-screen grid place-items-center min-w-full">
      <div className="form shadow-xl h-screen rounded-none w-full sm:max-h-[570px] sm:rounded-xl text-white  bg-[#494949] flex justify-center items-center flex-col gap-9 sm:w-[430px] px-[43px] ring-1">
        <h1 className="text-3xl "> Welcome Back!</h1>
        <p>Log in to your Expense Tracker account to manage your expense and budgets</p>
        <LoginFrom/>
        <hr className="w-full bg-slate-900" />
        <p>Don't have an Account yet? <Link to={'/register'}> 
        <span className="font-bold cursor-pointer"><u>SignUp</u></span></Link> Now!</p>
      </div>
    </div>
   );
}
 
export default Login;