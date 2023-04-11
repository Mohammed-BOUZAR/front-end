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

    return (
        <div className="container">
            <Header />
            <div className="card-container">
                <h1>Users</h1>
                {Array.isArray(users) && users.map((user: any) => (
                    <div className='user' key={user._id} id={user._id}>
                        <img src={user.profile ? user.profile : 'assets/person3.svg'} alt="" />
                        <h4>{user.first_name} {user.last_name}</h4>
                    </div>

                ))}

            </div>
        </div>
    );
}

export default Users;
