import logo from '../assets/skoteLogo.png'
import linkedIn from '../assets/linkedIn.png'
import email from '../assets/email.png'

function scrollToSection(elementId) {
  console.log('scrollToSection called with elementId:', elementId);
  const element = document.getElementById(elementId);
  if(element){
    element.scrollIntoView({ behavior: 'smooth' });
  };
}

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col md:flex-row justify-between w-fit md:w-full px-5 space-y-10 md:space-y-0'>
        <img src={logo} alt='Georgios Logo' className='h-24 md:pb-2 transition-all duration-300 hover:scale-110 cursor-pointer' onClick={(e) => {e.preventDefault(); scrollToSection('showreel')}}></img>
        <div className='flex flex-col md:flex-row'>
          <a target="_blank" rel="noreferrer" href="mailto:georgiosaudio@gmail.com" className="flex flex-col md:flex-row h-full w-auto justify-end items-center md:justify-start group">
            <span className='pt-5 transition-all duration-300 md:group-hover:pr-5'>georgiosaudio@gmail.com</span>
            <img className="h-[7rem] w-auto pt-5 transition-all duration-300 group-hover:scale-125" src={email} alt='email'/>
          </a>
          <a className="flex h-[7rem] w-auto pt-6 justify-center" target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/georgios-georgakis/'><img className="h-5/6 w-auto transition-all duration-300 hover:scale-125" src={linkedIn} alt='linked in'/></a>
          <a className="flex h-[7rem] w-auto pt-6 justify-center" target="_blank" rel="noreferrer" href='https://bsky.app/profile/georgiosaudio.bsky.social/'><img className="h-5/6 w-auto transition-all duration-300 hover:scale-125" src={bluesky} alt='bluesky'/></a>
        </div>
      </div>
      <h1 className='text-xs md:text-base md:order-2'>Copyright© 2025-26 Created by <a target="_blank" rel="noreferrer" href='https://www.kwtsos.bio' className='hover:text-slate-500'>Kostas</a></h1>
    </div>
  );
}

export default Footer;
