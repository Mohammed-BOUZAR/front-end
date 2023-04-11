import Cookies from "js-cookie";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Notifications: React.FC = () => {
    const history = useHistory();
    const token = Cookies.get('token');
    // alert("token register: "+token);
    if (!token) history.push('/login');

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:3000/api/notifications", {
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
                // console.log("data: ");
                // console.log(data);
                // data.forEach((e: any) => console.log(e._id +" "+e.content));
                if (data.message) return alert(data.message);
                setNotifications(data);
            })
            .catch((error) => console.error("Error fetching Notifications:", error));
    }, []);

    return (
        <div className="container">
            <Header />
            <div className="card-container">
                <h1>Notifications</h1>
                {notifications.map((notification: any) => (
                    <div className='notification' key={notification._id} id={notification._id}>
                        <img src={notification.user.profile ? notification.user.profile : 'assets/person3.svg'} alt="" />
                        <h4>{notification.user.first_name} {notification.user.last_name}</h4>
                    </div>

                ))}

            </div>
        </div>
    );
};

export default Notifications;