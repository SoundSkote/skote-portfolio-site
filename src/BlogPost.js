import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fm from "front-matter";

function BlogPost() {
  const [post, setPost] = useState([]);
    let params = useParams();
    const filePath = require(`./posts/${params.post}.md`);

    const loadPosts = async () => {
      const content = await fetch(filePath).then((res) => res.text()).then((text) => {
        return text;
      });
      setPost(content);
    };

    useEffect(() => {
      loadPosts();
    });
  
    return (
      <div className="flex flex-col pt-40 justify-center items-center bg-white text-black">
        <ReactMarkdown className="markdown text-left justify-center items-center space-y-5 w-1/2">{fm(post.toString()).body}</ReactMarkdown>
      </div>
    );
  }
  
export default BlogPost;
