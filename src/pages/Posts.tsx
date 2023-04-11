import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import './css/Posts.css';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import Header from '../components/Header';

const Posts: React.FC = () => {
  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token register: "+token);
  if (!token) history.push('/login');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:3000/api/posts", {
      method: 'GET', // or any other HTTP method
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json' // Set the Content-Type header if needed
      }
    })
      .then((response) => {
        console.log("response: ");
        console.log(response);
        return response.json()
      })
      .then((data) => {
        console.log("data: ");
        console.log(data);
        data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const display = (post: any) => {
    console.log(post);
  }

  return (
    <div className="container">
      <Header/>
      <div className="card-container">
        {posts.map((post: any) => (
          
          <div key={post._id} id={post._id} className="card">
            <div key={post._id}>
              <img src={post.user.profile ? post.user.profile : 'assets/person3.svg'} alt="" />
              <h2 className="card-title">{post.user.first_name} {post.user.last_name}</h2>
            </div>
            {post.content && <p>{post.content}</p>}
            {post.links && post.links.map((file: any) => {
              <img src={file.path} alt="" />
            })}
            <div  key={post._id}>{post.reactions ? post.reactions.length : 0}</div>
            <div  key={post._id}>
              <span className='reaction'>
                <img src="" alt="" /> {post.reactions ? post.reactions.length : 0}
              </span>
              <span className='comment'>
                <img src="" alt="" /> {post.comments ? post.comments.length : 0}
              </span>
            </div>
          </div>


          // <div key={post._id} className="card">
          //   <h2 className="card-title">{post.title}</h2>
          //   <p className="card-text">UserId: {post.userId}</p>
          //   <p className="card-text">Id: {post._id}</p>
          //   {post.content && (
          //     <p className="card-text">Content: {post.content}</p>
          //   )}
          //   {post.file && <p className="card-text">File: {post.file}</p>}
          //   <p className="card-text">Reactions: {post.reactions}</p>
          //   <p className="card-text">Comments: {post.comments}</p>
          //   <p className="card-text">Subcomments: {post.subcomments}</p>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
