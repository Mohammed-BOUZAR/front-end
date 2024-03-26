import Cookies from "js-cookie";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import './css/Messages.css';
import { IonBackButton, IonButtons } from "@ionic/react";

const Messages: React.FC = () => {
    const history = useHistory();
    const token = Cookies.get('token');
    // alert("token register: "+token);
    if (!token) history.push('/login');

    const [Messages, setMessages] = useState([]);

    const goBack = () => {
        history.goBack();
    }
    // useEffect(() => {
    //     // Fetch data from API
    //     fetch("http://localhost:3000/api/Messages", {
    //         method: 'GET', // or any other HTTP method
    //         headers: {
    //             'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
    //             'Content-Type': 'application/json' // Set the Content-Type header if needed
    //         }
    //     })
    //         .then((response) => {
    //             console.log("response: ");
    //             console.log(response);
    //             return response.json()
    //         })
    //         .then((data) => {
    //             // console.log("data: ");
    //             // console.log(data);
    //             // data.forEach((e: any) => console.log(e._id +" "+e.content));
    //             if (data.message) return alert(data.message);
    //             setMessages(data);
    //         })
    //         .catch((error) => console.error("Error fetching Messages:", error));
    // }, []);

    return (
        <div className="container">
            <div className="header">
                <div className="userInfo">
                    <img src="assets/person3.svg" alt="" />
                    <h3>Marwane Roumani</h3>
                </div>
                <img src="assets/goBack.svg" alt="" onClick={goBack} />
            </div>
            <div className="messages">
                {/* <h1>Messages</h1> */}
                {/* {Messages.length != 0 ? (Messages.map((notification: any) => (
                    <div className='notification' key={notification._id} id={notification._id}>
                        <img src={notification.user.profile ? notification.user.profile : 'assets/person3.svg'} alt="" />
                        <h4>{notification.user.first_name} {notification.user.last_name}</h4>
                    </div>

                ))) : <p>No Notification Found!</p>} */}
                <div className="message messageLeft">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo esse reprehenderit molestias enim molestiae modi, ea tempora dolores praesentium eligendi, aspernatur atque, voluptas error neque magni! Laboriosam deleniti minus consectetur?</p>
                    <span className="date">hier</span>
                </div>
                <div className="message messageLeft">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo esse reprehenderit molestias enim molestiae modi, ea tempora dolores praesentium eligendi, aspernatur atque, voluptas error neque magni! Laboriosam deleniti minus consectetur?</p>
                    <span className="date">hier</span>
                </div>
                <div className="message messageRight">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo esse reprehenderit molestias enim molestiae modi, ea tempora dolores praesentium eligendi, aspernatur atque, voluptas error neque magni! Laboriosam deleniti minus consectetur?</p>
                    <span className="date">hier</span>
                </div>
                <div className="message messageRight">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo esse reprehenderit molestias enim molestiae modi, ea tempora dolores praesentium eligendi, aspernatur atque, voluptas error neque magni! Laboriosam deleniti minus consectetur?</p>
                    <span className="date">hier</span>
                </div>

            </div>
            <div className="messageDiv">
                <input className="messageInput" placeholder="Message..." type="text" />
                <a href="">
                    <img src="assets/send.svg" alt="" />
                </a>
            </div>
        </div>
    );
};

export default Messages;