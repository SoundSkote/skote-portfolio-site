import { useEffect, useState } from "react";
import fm from 'front-matter';
import PostCard from "./components/postCard";
import image from './assets/divider.svg';
import splatter from './assets/splatter.png';

const importAll = (r) => r.keys().map(r);
const tmp = require.context('./posts', false, /\.md$/);
const markdownFiles = importAll(tmp);

function Blog() {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        const mdposts = await Promise.all(
            markdownFiles.map(async (file) => {
                const content = await fetch(file).then((res) => res.text());
                return { content, fileName: file};
            })
        );
        setPosts(mdposts);
    };

    useEffect(() => {
        loadPosts(); 
    }, []);
    
    return (
      <div className="flex flex-col pt-40 justify-center items-center bg-white max-w-screen overflow-hidden">
        <h1 className="text-3xl text-black font-extrabold lg:text-5xl">Blog</h1>        
        <div className="flex flex-col space-y-12 pt-10 w-full items-center p-2 z-10">
            {posts.map((post, index) => (
                <PostCard key={index} title={fm(post.content).attributes.title} filename={post.fileName}/>
            ))}
        </div>
        <img className="w-full z-50 object-cover pt-20" src={image} alt='divider'/>
        <img className='absolute top-80 lg:top-40 -left-20 lg:w-1/2' src={splatter} alt=''/>
        
      </div>
    );
  }
  
export default Blog;
  
