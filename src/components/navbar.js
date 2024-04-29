import logo from '../assets/skoteLogosimple.png'
import React, { useState, useEffect } from 'react';
import './animation.css';
import { useLocation, useNavigate } from 'react-router-dom';

function scrollToSection(elementId) {
  console.log('scrollToSection called with elementId:', elementId);
  const element = document.getElementById(elementId);
  if(element){
    element.scrollIntoView({ behavior: 'smooth' });
  };
}

function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsNavbarVisible(
        currentScrollPos < 10 || currentScrollPos < prevScrollPos
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`flex fixed w-full z-[100] bg-black transition-all duration-300 ${isNavbarVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-full'}`}>
      <div className='flex flex-row justify-between items-center w-full px-3 lg:px-5'>
        <img src={logo} alt='Georgios Logo' className='h-12 transition-all duration-300 hover:scale-110 cursor-pointer' onClick={(e) => {
            e.preventDefault();
            if (!location.pathname.includes('/blog')){
              scrollToSection('showreel');
            }else{
              navigate('/');
              scrollToSection('showreel');
            }
          }}></img>
        <div className='flex flex-row space-x-2 lg:space-x-5'>
          <div id="line-div" className='flex flex-col'>
            <h1 className='rounded-sm cursor-pointer text-xl text-gray-200'><a href='#impReel' onClick={(e) => {
              e.preventDefault();
              if (!location.pathname.includes('/blog')){
                scrollToSection('impReel');
              }else{
                navigate('/');
              }
            }}>Implementation</a></h1>
            <hr id="line" className="h-0.5 bg-white border-0 rounded-full w-0"/>
          </div>
          <div id="line-div" className='flex flex-col'>
            <h1 className='cursor-pointer text-xl text-gray-200'><a href='#about' onClick={(e) => {
              e.preventDefault();
              if (!location.pathname.includes('/blog')){
                scrollToSection('about');
              }else{
                navigate('/');
              }
            }}>About</a></h1>
            <hr id="line" className="h-0.5 bg-white border-0 rounded-full w-0"/>
          </div>
          <div id="line-div" className='flex flex-col'>
            <h1 className='cursor-pointer text-xl text-gray-200'><a href='/blog'>Blog</a></h1>
            <hr id="line" className="h-0.5 bg-white border-0 rounded-full w-0"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
