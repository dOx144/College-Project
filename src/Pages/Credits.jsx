import { Link } from 'react-router-dom';
import dogImg from '../assets/images/dog-sit.png'
import { useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const Credits = () => {

  let username = sessionStorage.getItem('username')
  useEffect(()=>{
    if(username === '' || username === null){
      navigate('/login')
    }
  })

  const socials = [
    {name: 'Github', link: 'https://github.com/dox144', icon:<FaGithub/>},
    {name: 'linkedin', link: 'https://www.linkedin.com/in/jake-dox-75b934295/', icon:<CiLinkedin/>},
    {name: 'Email', link: 'mailto:rashiktamang999@gmail.com',icon:<MdEmail/>},
    {name:'Instagram', link:'https://instagram.com/dumplingsis1020',icon:<FaInstagram/>}
  ]

  return ( 

    <div className='bg-[#FED18C] p-4 gap-4   gluten w-screen h-screen  flex flex-col md:flex-row items-center justify-center'>
      {/* greeing img */}
    

      {/* credit section */}
        <div className='flex items-center justify-start flex-col gap-4 '>
          <Link to={'/home'} className='bg-[#170F11] px-4 py-2 active:scale-95 origin-center text-white rounded-xl transition min-w-fit' >Go to Home Page</Link>
          <div className='flex items-center flex-col'>
            <p >Created by </p>
            <Link to={'https://www.instagram.com/rashik_tamang/'} target='_blank' className='text-2xl cursor-pointer'>Jake dOx:</Link>
            <ul className=' flex flex-row  gap-4 items-center h-[50px] transition-all'>
              {socials.map((el,i)=>(
                <Link to={el.link} target='_blank' key={i} className='flex items-center p-1 gap-1 min-w-fit hover:px-4 origin-center hover:py-2 hover:bg-[#fff] hover:font-black rounded-xl transition-all'>
                 {el.name}
                 <p>{el.icon}</p>
                </Link>
              ))}
            </ul>
          </div>
        </div>

      <div>

      </div>
      <div className='flex items-center justify-center'>
        <img src={dogImg}  className='mix-blend-multiply  max-h-[800px] max-w-[290px]' />
      </div>
    </div>

  );
}
 
export default Credits;