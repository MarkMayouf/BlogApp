import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img
                src={
                  post?.img
                    ? `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/upload/${post.img}`
                    : ""
                }
                alt=""
              />
            </div>
            <div className="content">
                <h1>{post.title}</h1>
            
              <p>{getText(post.desc).slice(0, 200)}...</p>
              <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
