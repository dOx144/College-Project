import { Link } from "react-router-dom";

const Navigation = () => {

  const lists = [
    {
      name:'Credits',
      link:'/credits'
    },
     {
      name:'Logout',
      link:'/login'
    }
  ]

  return ( 
      <header className="bg-[#170f11] gluten p-4 justify-between md:justify-center flex md:flex-col min-w-[360px] md:px-0 md:h-screen md: md:gap-32 ">
        <h2 className = " text-white text-xl md:text-3xl px-[16px] hachi cursor-default">Expense Tracker</h2>
        <ul className="flex items-center gap-4 md:flex-col md:items-start">
        {lists.map((el,i) =>
          <Link key={i} to={el.link} className="rounded-xl px-4 md:max-w-[90%] md:rounded-r-xl md:rounded-none p-2 text-sm md:px-[32px] md:w-full md:py-[12px] md:text-xl bg-[#fefefe] hover:bg-slate-700 hover:text-white transition active:scale-[98%] cursor-pointer origin-left">
            {el.name}
          </Link>
        )}
        </ul>
    </header>
   );
}
 
export default Navigation;