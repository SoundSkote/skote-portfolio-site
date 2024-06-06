import image from '../assets/skote.jpg'
import image1 from '../assets/smash2.jpg'

function About() {
  return (
    <div id="about" className="flex flex-col py-10 justify-center items-center space-y-5 w-full h-full px-10 xl:px-56">
      <h1 className='text-4xl text-gray-200 font-extrabold text-left'>About</h1>
      <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:w-full">
        <div className='flex w-80 h-80 rounded-full overflow-hidden justify-center items-center sm:float-right'>
          <img className="w-full object-cover" src={image} alt='Profile'/>
        </div>
        <p className='text-xl text-gray-200 break-words text-left flex-1 space-y-5 xl:text-2xl'>
          <h1>Welcome!</h1>
          <p>I’m Georgios Georgakis, a game audio sound designer from Athens, Greece.</p>
          <p>My passion for audio began at an early age when I started playing drums and recording music with my friends. I went on to earn a Bachelor’s degree in Music Technology & Acoustics. During my Bachelor’s degree, I discovered the magic of sound design and became passionate about game audio. This led me to relocate to Leeds and graduate from the Sound and Music for Interactive Games master’s program at Leeds Beckett University, which allowed me to further explore game audio design and the video game industry. Additionally, I love connecting with like-minded people and regularly attend game industry events such as the Leeds Games Toast, Game Audio Nexus, Game Audio Symposium, Develop:Conference, and GDA Greece meetups.</p>
          <p>To date, I’ve been involved with a couple of indie titles such as Carbonflesh and Selini. I have also collaborated with Epic Stock Media to create sound libraries, alongside pursuing several personal projects, university assignments, and enthusiastically participating in game jams.</p>
          <p>I revel in the creative freedom this field offers and I love the power of procedural sound design. As for my preferred tools, I tend to favor Reaper for sound design, and Wwise for implementation.</p>
          <p>Currently, I am seeking to join a dynamic audio team to produce great and unique audio experiences.</p>
        </p>
      </div>
      <div className='flex flex-col w-full pt-10 lg:items-top text-2xl items-center lg:justify-start lg:space-x-40'>

        <div className='flex flex-col w-full space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5 items-center'>
          <div className='flex w-full overflow-hidden justify-center items-center sm:w-1/5'>
            <img className="w-full object-cover rounded" src={image1} alt='Profile'/>
          </div>
          <div className='flex flex-col w-full space-y-5 text-gray-200 justify-between items-center lg:flex-row lg:space-y-0 text-center'>
            <ul className='lg:w-1/3'>
              <li className='font-extrabold underline pb-5 list-none'>My favourite games:</li>
              <li>Control</li>
              <li>Apex Legends</li>
              <li>Portal 2</li>
              <li>Titanfall 2</li>
              <li>Amnesia Series</li>
            </ul>
            <ul className='lg:w-1/3'>
              <li className='font-extrabold underline pb-5 list-none'>Can't wait to play:</li>
              <li>Alan Wake 2</li>
              <li>Still Wakes the Deep</li>
              <li>Vampire: The Masquerade - Bloodlines 2</li>
              <li>Silent Hill 2 remake</li>
              <li>Banishers: Ghosts of New Eden</li>
            </ul>
            <ul className='lg:w-1/3'>
              <li className='font-extrabold underline pb-5 list-none'>My hobbies:</li>
              <li>Films</li>
              <li>Skateboarding</li>
              <li>Concerts</li>
              <li>Playing drums</li>
              <li>Sketching</li>
            </ul>
          </div>

        </div>
        
      </div>

    </div>
  );
}

export default About;
