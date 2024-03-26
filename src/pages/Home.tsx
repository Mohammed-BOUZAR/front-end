import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import io from 'socket.io-client';

import './css/Home.css';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import Header from '../components/Header';

const Home: React.FC = () => {
  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token register: "+token);
  if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000/socket', { // Replace the URL with your server's URL and specify the namespace
      path: '/socket.io',
      transports: ['websocket'],
    });
    console.log(socket.id);
    socket.on('connect', () => {

    });
    // Clean up the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setContent(e.target.value);
  // };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Convert FileList to an array and update state
    const fileList = Array.from(e.target.files || []);
    setFiles(fileList);
  };

  const handleSubmit2 = async () => {
    try {
      const formElement = document.querySelector('.create-post-form'); // Replace with appropriate form selector
      const formData = new FormData(); // Create a new FormData object from the form

      // Send FormData to Node.js server using fetch
      const response = await fetch('/api/posts', {
        method: 'POST', // Use appropriate HTTP method
        body: formData // Pass the FormData object as the request body
      });

      if (response.ok) {
        // Handle successful response
        console.log('Form data sent successfully');
      } else {
        // Handle error response
        console.error('Failed to send form data');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Failed to send form data:', error);
    }
  };


  const handleSubmit1 = async (e: FormEvent) => {
    e.preventDefault();
    // Create a FormData object to send the files
    const formData = new FormData();
    formData.append("content", content);

    // Append each file to the FormData object
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    console.log("formData");
    console.log(formData);
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));

    // Send the data to the Node.js server using fetch or Axios
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
          // 'Content-Type': 'multipart/form-data' // Set the Content-Type header if needed
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json(); // Parse response data
        console.log("data: ", data);
        history.push(`/posts/${data._id}`); // Redirect to new post URL
        console.log("Post created successfully!");
      } else {
        // Handle error response
        console.error("Failed to create post.");
      }
    } catch (error) {
      // Handle network error
      console.error("Failed to create post.", error);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const formElement = e.target as HTMLFormElement; // Cast e.target to HTMLFormElement
      const formData = new FormData(formElement);

      // Send FormData to Node.js server using fetch
      const response = await fetch('/api/posts', {
        method: 'POST', // Use appropriate HTTP method
        body: formData // Pass the FormData object as the request body
      });

      if (response.ok) {
        // Handle successful response
        console.log('Form data sent successfully');
      } else {
        // Handle error response
        console.error('Failed to send form data');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Failed to send form data:', error);
    }
  };

  // const handleSubmit = async (e: SyntheticEvent) => {
  //   e.preventDefault();

  //   try {
  //     const formElement = e.target as HTMLFormElement;
  //     const formData = new FormData(formElement);

  //     // Send FormData to Node.js server using fetch
  //     const response = await fetch('/api/posts', {
  //       method: 'POST', // Use appropriate HTTP method
  //       body: formData // Pass the FormData object as the request body
  //     });

  //     if (response.ok) {
  //       // Handle successful response
  //       console.log('Form data sent successfully');
  //     } else {
  //       // Handle error response
  //       console.error('Failed to send form data');
  //     }
  //   } catch (error) {
  //     // Handle any other errors
  //     console.error('Failed to send form data:', error);
  //   }
  // };

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
        // data.forEach((e: any) => console.log(e._id +" "+e.content));
        if (data.message) return alert(data.message);
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const display = (post: any) => {
    console.log(post);
  }

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
        setPosts(data);
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
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  return (
    <div className="container">
      <Header />
      <div className="card-container">

        <form encType="multipart/form-data" className="create-post-form" onSubmit={handleSubmit}>
          <h1 className="title">New Post</h1>
          <div className="create-post">
            <div className="content">
              <input
                type="text"
                id="content"
                value={content}
                name="content"
                placeholder="Content..."
                onChange={handleContentChange}
                className="form-input"
              />
            </div>
            <div className="file">
              {/* Add the "multiple" attribute to allow multiple file selection */}
              <div className="file-upload-container">
                <label htmlFor="file-upload1" className="file-upload-label">
                  <img src="assets/image.svg" alt="Upload" className="upload-image" />
                </label>
                <label htmlFor="file-upload2" className="file-upload-label">
                  <img src="assets/video.svg" alt="Upload" className="upload-image" />
                </label>
                <label htmlFor="file-upload3" className="file-upload-label">
                  <img src="assets/doc.svg" alt="Upload" className="upload-image" />
                </label>
                <input id="file-upload1" type="file" className="file-upload-input" />
                <input id="file-upload2" type="file" className="file-upload-input" />
                <input id="file-upload3" type="file" className="file-upload-input" />
              </div>
              <img onClick={handleSubmit} src="assets/send.svg" alt="" />
            </div>
          </div>
        </form>

        {/* <form  encType='multiple'  className="create-post-form">
          <h1 className="title">New Post</h1>
          <div className='create-post'>
            <div className='content'>
              <input
                type="text"
                id="content"
                value={content}
                name='content'
                placeholder='Content...'
                onChange={handleContentChange}
                className="form-input"
              />
            </div>
            <div className='file'>
              <input type="file" name='files' id="files" onChange={handleFileChange} multiple className="form-input" />
              <div className="file-upload-container">
                <label htmlFor="file-upload1" className="file-upload-label">
                  <img src="assets/image.svg" alt="Upload" className="upload-image" />
                </label>
                <label htmlFor="file-upload2" className="file-upload-label">
                  <img src="assets/video.svg" alt="Upload" className="upload-image" />
                </label>
                <label htmlFor="file-upload3" className="file-upload-label">
                  <img src="assets/doc.svg" alt="Upload" className="upload-image" />
                </label>
                <input id="file-upload1" type="file" className="file-upload-input" />
                <input id="file-upload2" type="file" className="file-upload-input" />
                <input id="file-upload3" type="file" className="file-upload-input" />
              </div>
              <img onClick={handleSubmit} src="assets/send.svg" alt="" />
            </div>
            Add the "multiple" attribute to allow multiple file selection
          </div>
          <button type="submit" className="form-button">Create Post</button>
        </form> */}

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


        {/* {posts.length != 0 ? (posts.map((post: any) => (
          <div key={post._id} id={post._id} className="card">
            <div key={post.user._id} className='card-head'>
              <img src={post.user.profile ? post.user.profile : 'assets/user.jpg'} alt="" />
              <h2 className="card-title">{post.user.first_name} {post.user.last_name}</h2>
            </div>
            <div className='post'>
              {post.content && <p className='card-text'>{post.content}</p>}
              { <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta culpa praesentium</p> }
              {post.links.map((file: any) => {
                <img src={'http://localhost:3000/' + file.path} alt="" />
              })}
              <img src={'http://localhost:3000/' + post.links[0].path} alt="" />
              <p>{post.links.path}</p>
              <img src="assets/image1.jpg" alt="" />
            </div>
            <div key={post.reactions.legth} className='reactions'>{post.reactions.length}</div>
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
  );
}

export default Home;
