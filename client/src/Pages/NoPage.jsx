import { Link } from "react-router-dom";

const NoPage = () => {
  return ( 
    <div className="h-full gluten w-full grid place-items-center min-h-[50vh]">
      <div>
        <h2 className="text-2xl">404 error, such page doesn't exists</h2>
        <p>Couldn't find the page you requested 💀❌</p>
        <Link to={'/login'} className="px-4 py-2 rounded-xl bg-[#fcac34]  text-white hover:bg-[#FED18C] active:scale-95 transition">Go back to main login</Link>
      </div>
    </div>
  );
}
 
export default NoPage;