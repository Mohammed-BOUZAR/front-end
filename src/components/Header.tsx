import Cookies from 'js-cookie';
import './Header.css';
const Header = () => {
    const deleteToken = () => {
        Cookies.remove('token');
    }
    return (
        <header>
            <div>
                <img className="logo" src="assets/usmba.png" alt="" />
                <a href="" onClick={deleteToken}><img src="assets/logout.svg" className='logout' alt="" /></a>
            </div>
            <div className='nav'>
                <a href="/"><img src="assets/home.svg" alt="" /></a>
                <a href="/conversations"> <img src="assets/message.svg" alt="" /></a>
                <a href="/notifications"><img src="assets/notification.svg" alt="" /></a>
                <a href="/users"><img src="assets/user.svg" alt="" /></a>
            </div>
        </header >
    );
};

export default Header;