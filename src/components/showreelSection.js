import ReactPlayer from 'react-player';
import {init} from './textAnimation';
import { useEffect } from 'react';

// window.onload = function() {
//   init();
// };


function Showreel() {
  useEffect(() => {
    init();
  });
  const style ={aspectRatio: '16/9'};
  return (
    <div id="showreel" className="flex flex-col bg-black px-0 space-y-5 pt-32 justify-center items-center xl:px-56">
      <div className='flex flex-row justify-center items-center space-x-5'>
        
        <h1 id="myText" data-value="Game Audio Design Reel" className="text-gray-200 text-3xl font-extrabold lg:text-5xl font-mono">Game Audio Design Reel</h1>
        
      </div>

      <ReactPlayer id="screen" width='100%' height='100%' style={style} url='https://vimeo.com/856761385' controls={true}/>
      
      
    </div>
  );
}

export default Showreel;
