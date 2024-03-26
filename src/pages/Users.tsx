import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';

import './css/Users.css';


const Users: React.FC = () => {
    const history = useHistory();
    const token = Cookies.get('token');
    // alert("token register: "+token);
    if (!token) history.push('/login');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:3000/api/users", {
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
                // data.users.map((e: any) => console.log(e._id +" "+e.content));
                if (data.message) return alert(data.message);
                setUsers(data.users);
            })
            .catch((error) => console.error("Error fetching Users:", error));
    }, []);

    const createConversation = (userId: any) => {
        fetch("http://localhost:3000/api/conversations", {
            method: 'POST', // or any other HTTP method
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`, // Include the token in the 'Authorization' header
                'Content-Type': 'application/json' // Set the Content-Type header if needed
            },
            body: JSON.stringify({userId})
        })
            .then((response) => {
                console.log("response: ");
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log("data: ");
                console.log(data);
                history.push(`/conversations/${data._id}/messages`)
                // data.users.map((e: any) => console.log(e._id +" "+e.content));
                if (data.message) return alert(data.message);
                setUsers(data.users);
            })
            .catch((error) => console.error("Error fetching Users:", error));
    }

    return (
        <div className="container">
            <Header />
            <div className="card-container">
                <h1>Users</h1>
                {users && users.length != 0 ? (Array.isArray(users) && users.map((user: any) => (
                    <div className='user' key={user._id} id={user._id}>
                        <div>
                            <img src={user.profile ? user.profile : 'assets/person3.svg'} alt="" />
                            <a href={`/users/${user._id}`}>
                                <h4>{user.first_name} {user.last_name}</h4>
                            </a>
                        </div>
                        <button className='send_message' onClick={() => createConversation(user._id)}>Send message</button>
                    </div>

                ))) : <p>No User Found!</p>}

            </div>
        </div>
    );
}

export default Users;
