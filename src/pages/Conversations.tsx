import './css/Conversations.css';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

const Conversations: React.FC = () => {
    const history = useHistory();
    const token = Cookies.get('token');
    // alert("token register: "+token);
    if (!token) history.push('/login');

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:3000/api/conversations", {
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
                setConversations(data);
            })
            .catch((error) => console.error("Error fetching conversations:", error));
    }, []);

    return (
        <div className="container">
            <Header />
            <div className="card-container">
                <h1>Conversations</h1>
                {conversations.map((conversation: any) => (
                    <div className='conversation' key={conversation._id} id={conversation._id}>
                        <img src={conversation.user.profile ? conversation.user.profile : 'assets/person3.svg'} alt="" />
                        <h4>{conversation.user.first_name} {conversation.user.last_name}</h4>
                    </div>

                ))}

            </div>
        </div>
    );
};

export default Conversations;