import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './css/User.css';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const User: React.FC = () => {
  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token register: "+token);
  if (!token) history.push('/login');

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>([]);
  const params = useParams<{ userId: string }>();
  // console.log("params");
  // console.log(params);
  const { userId } = params;


  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:3000/api/users/" + userId, {
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
        setUser(data)
        setPosts(data.posts);
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
        history.goBack();
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setUser(data)
        setPosts(data.posts);
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
        history.goBack();
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setUser(data)
        setPosts(data.posts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  return (
    <div className='container'>
      <div className='image-back'></div>
      <div className='profile'>
        <img src={user.profile ? user.profile : 'assets/person3.svg'} alt="" />
        <h1>{ user.first_name} {user.last_name}</h1>
        {/* <ul className='info'>
          <li>{user && user.email}</li>
          <li>{user && user.cin}</li>
          <li>{user && user.cne}</li>
          <li>{user && user.state}</li>
        </ul> */}
      </div>
      <div>
        <img src="" alt="" />
      </div>

      <div className='posts'>
        {posts && posts.length !== 0 ? (
          posts.map((post: any) => (
            <div key={post._id} id={post._id} className="card">
              {/* ...other card content */}
              <div key={post.user._id} className='card-head'>
                <img src={post.user.profile ? post.user.profile : 'assets/user.jpg'} alt="" />
                <a href={'/users/' + post.user._id}><h2 className="card-title">{post.user.first_name} {post.user.last_name}</h2></a>
              </div>
              <div className='post'>
                {post.content && <p className='card-text'>{post.content}</p>}
                {post.links.map((file: any) => (
                  <img key={file.path} src={'http://localhost:3000/' + file.path} alt="" />
                ))}
              </div>
              {/* ...other card content */}
              {/* <div key={post.reactions.legth} className='reactions'>{post.reactions.length}</div> */}
              <div key={post._id} className='card-footer'>
                <span className="reaction">
                  <img src="assets/like.svg" onClick={() => likePost(post._id)} alt="" /> {post.reactions && (post.reactions.length ? post.reactions.length : 0)}
                </span>
                <span className="comment">
                  <a href={`/posts/${post._id}`}>
                    <img src="assets/comment.svg" alt="" /> {post.comments && (post.comments.length ? post.comments.length : 0)}
                  </a>
                </span>
              </div>
              {/* <div className='comments'>
                {post.comments.map((comment: any) => (
                  <div className='commentText'>
                    <p>{comment.content}</p>
                    <span className="date">{comment.date_time.split('T')[0]}</span>
                  </div>
                ))}
              </div> */}
              <div className='commentDiv'>
                <input className="messageInput" placeholder="Comment..." type="text"
                  onChange={(e: any) => setContent(e.target.value)} />
                <img src="assets/send.svg" alt="" onClick={() => sendComment(post._id)} />
              </div>
            </div>
          ))
        ) : (
          <p>No Post Found!</p>
        )}


        {/* {Array.isArray(posts) && posts.length !== 0 ? (posts.map((post: any) => (
          <div key={post._id} id={post._id} className="card">
            <div key={post.user._id} className='card-head'>
              <img src={post.user && post.user.profile ? post.user.profile : 'assets/person3.svg'} alt="" />
              <h2 className="card-title">{post.user && post.user.first_name} {post.user && post.user.last_name}</h2>
            </div>
            <div className='post'>
              {post.content && <p className='card-text'>{post.content}</p>}
              {post.links && post.links.map((file: any) => {
                return <img src={file.path} alt="" />; // added return statement
              })}
            </div>
            <div key={post.reactions.length} className='reactions'>{post.reactions.length}</div> {/*fixed typo in key prop}
            <div key={post._id} className='card-footer'>
              <span className='reaction'>
                <img src="assets/like.svg" alt="" /> {post.reactions ? post.reactions.length : 0}
              </span>
              <span className='comment'>
                <img src="assets/comment.svg" alt="" /> {post.comments ? post.comments.length : 0}
              </span>
            </div>
          </div>
        ))) : <p>No Post Found!</p>} */}
      </div>
    </div>

    // <div className='container'>
    //   <div className='image-back'></div>
    //   <div className='profile'>
    //     <img src={user && (user.profile ? user.profile : 'assets/person3.svg')} alt="" />
    //     <h1>{user.first_name} {user.last_name}</h1>
    //     <p></p>
    //   </div>
    //   <div>
    //     <img src="" alt="" />
    //   </div>
    //   <div className='posts'>
    //     {posts.length != 0 ? (Array.isArray(posts) && posts.map((post: any) => (
    //       <div key={post._id} id={post._id} className="card">
    //         <div key={post.user._id} className='card-head'>
    //           <img src={post.user.profile ? post.user.profile : 'assets/person3.svg'} alt="" />
    //           <h2 className="card-title">{post.user.first_name} {post.user.last_name}</h2>
    //         </div>
    //         <div className='post'>
    //           {post.content && <p className='card-text'>{post.content}</p>}
    //           {post.links && post.links.map((file: any) => {
    //             <img src={file.path} alt="" />
    //           })}
    //         </div>
    //         <div key={post.reactions.legth} className='reactions'>{post.reactions.length}</div>
    //         <div key={post._id} className='card-footer'>
    //           <span className='reaction'>
    //             <img src="assets/like.svg" alt="" /> {post.reactions ? post.reactions.length : 0}
    //           </span>
    //           <span className='comment'>
    //             <img src="assets/comment.svg" alt="" /> {post.comments ? post.comments.length : 0}
    //           </span>
    //         </div>
    //       </div>
    //     ))) : <p>No Post Found!</p>}
    //   </div>
    // </div>
  );
}

export default User;
