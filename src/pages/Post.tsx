import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import io from 'socket.io-client';

import './css/Post.css';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import Header from '../components/Header';

const Post: React.FC = () => {
  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token register: "+token);
  if (!token) history.push('/login');
  const [post, setPost] = useState<any>();
  const [content, setContent] = useState('');
  const params = useParams<{ postId: string }>();
  const { postId } = params;

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:3000/api/posts/${postId}`, {
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
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setPost(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const sendComment = (postId: any) => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: 'POST', // or any other HTTP method
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json' // Set the Content-Type header if needed
      },
      body: JSON.stringify({ content })
    })
      .then((response) => {
        console.log("response: ");
        console.log(response);
        return response.json()
      })
      .then((data) => {
        console.log("data: ");
        console.log(data);
        setPost(data.post);
        console.log("post");
        console.log(post);
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  const likePost = (postId: any) => {
    fetch(`http://localhost:3000/api/posts/${postId}/reactions`, {
      method: 'POST', // or any other HTTP method
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json' // Set the Content-Type header if needed
      },
      body: JSON.stringify({ type: "like" })
    })
      .then((response) => {
        console.log("response: ");
        console.log(response);
        return response.json()
      })
      .then((data) => {
        console.log("data: ");
        console.log(data);
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setPost(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  const goBack = () => {
    history.goBack();
  }

  return (
    <div className="container">
      {/* <Header /> */}
      <div className="card-container">

        {post && (
          <div key={post.post._id} id={post.post._id} className="card">
            <img src="assets/goBack.svg" alt="" className='goBack' onClick={() => goBack()} />
            {/* ...other card content */}
            <div key={post.post.user._id} className='card-head'>
              <img src={post.post.user && post.post.user.profile ? post.post.user.profile : 'assets/user.jpg'} alt="" />
              <a href={'/users/' + post.post.user._id}><h2 className="card-title">{post.post.user.first_name} {post.post.user.last_name}</h2></a>
            </div>
            <div className='post'>
              {post.post.content && <p className='card-text'>{post.post.content}</p>}
              {post.post.links.map((file: any) => (
                <img key={file.path} src={'http://localhost:3000/' + file.path} alt="" />
              ))}
            </div>
            {/* ...other card content */}
            {/* <div key={post.post.reactions.legth} className='reactions'>{post.post.reactions.length}</div> */}
            <div key={post.post._id} className='card-footer'>
              <span className="reaction">
                <img src="assets/like.svg" onClick={() => likePost(post.post._id)} alt="" /> {post.post.reactions && (post.post.reactions.length ? post.post.reactions.length : 0)}
              </span>
              <span className="comment">
                <a href={`/posts/${post.post._id}`}>
                  <img src="assets/comment.svg" alt="" /> {post.post.comments && (post.post.comments.length ? post.post.comments.length : 0)}
                </a>
              </span>
            </div>
            <div className='comments'>
              {post.post.comments.map((comment: any) => (
                <div className='commentText'>
                  <p>{comment.content}</p>
                  <span className="date">{comment.date_time.split('T')[0]}</span>
                </div>
              ))}
            </div>
            <div className='commentDiv'>
              <input className="messageInput" placeholder="Comment..." type="text"
                onChange={(e: any) => setContent(e.target.value)} />
              <img src="assets/send.svg" alt="" onClick={() => sendComment(post.post._id)} />
            </div>
          </div>

        )}
      </div>
    </div>
  );
}

export default Post;
