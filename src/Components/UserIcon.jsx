import { FaCircle } from 'react-icons/fa6';
import './UserIcon.css';

const UserIcon = ({ intials, available, bgColor }) => {
    console.log(bgColor);
    return (
        <div className='user'>
            <div className='user_icon' style={{ backgroundColor: bgColor }}>{intials}</div>
            <div className='dot' style={available ? { color: "#50B053" } : {}}>
                <FaCircle />
            </div>
        </div>
    )
}

export default UserIcon