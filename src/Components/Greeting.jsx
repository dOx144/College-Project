const Greeting = ({username,handleCreate}) => {
  return ( 
    <div className="mx-[70px]  min-w-64 *:w-fit space-y-2 gluten mt-[100px] ">
          <div className="text-xl w-fit flex gap-2 opacity-90">
            <p className="min-w-fit">Welcome <span className="font-bold ">{username}</span></p>  
          </div>
          <p >NO expenses recorded 💀...</p>
          <button 
          onClick={handleCreate} 
          className="bg-gray-600 max-w-fit text-xl text-white cursor-pointer p-[10px] flex items-center rounded-xl gap-1"> + Start Tracking 😁👍</button>
      </div>
   );
}
 
export default Greeting;