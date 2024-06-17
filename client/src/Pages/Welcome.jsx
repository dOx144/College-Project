import takingNotes from '../assets/images/girl-taking-notes.png'
import  { Button, Button2 } from '../Components/Button';

const Welcome = () => {

  return (  
        <div className='flex flex-col-reverse items-center md:flex-row md:h-screen md:justify-center md:gap-[5vw] pb-10 p-8 md:pb-0 ' style= {{background:'#F5FBEF'}}>
          <div className="section-1 px-2 max-w-[570px] gap-[10vw]  flex flex-col">

            <div className="hero space-y-4">
              <h1 className='text-[60px] leading-[3rem] md:leading-[4rem]'>Welcome to <br /> Expense tracker</h1>

              <p >Take control of your finances with our easy-to-use expense tracking solution. </p>
            </div>

            <div className="cta flex flex-col items-center md:items-start gap-4">
              <div>
                <p>
                  Track your expenses on the go, stay within budget, and make smarter financial decisions.
                  </p>
                  <p>
                    from <span className='font-bold text-slate-950 '>Today!</span>
                  </p>
              </div>
              
              <div className="cta-btn  flex gap-4 items-center ">
                <Button anim={`bounce`} to={'/login'} name={'Sign in'} />
                <span> Or </span>
                <Button2 to={'/register'} name={'Sign Up'} />
              </div>
            </div>
          </div>
          <div className="section-2">
            <img className='overflow-hidden mix-blend-multiply scale-110' src={takingNotes} alt="#" />
          </div>
        </div>

  );
}
 
export default Welcome;