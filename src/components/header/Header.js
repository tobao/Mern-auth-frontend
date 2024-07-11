import React from 'react'
import './Header.scss'
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RESET, logout } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../protect/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
/*
 Link và NavLink dùng để điều hướng giữa các trang.
useNavigate là một hook dùng để lập trình điều hướng.
*/
const activeLink = ({isActive}) => (isActive?'active':'');
/*
Định nghĩa một hàm activeLink để áp dụng lớp CSS 'active' cho NavLink khi nó đang hoạt động (active). 
Hàm này kiểm tra thuộc tính isActive và trả về chuỗi 'active' nếu isActive là true, ngược lại trả về chuỗi rỗng.
*/
const Header = () => {
  const navigate = useNavigate()
  //Sử dụng hook useNavigate để lấy hàm navigate dùng để điều hướng.
  const dispatch = useDispatch()
  
  const goHome = () => {
    navigate("/")
    //Định nghĩa một hàm goHome để điều hướng người dùng về trang chủ ("/") khi được gọi.
  };

  
/*
Mục đích tạo ra một hành động khi người dùng nhấp vào logo trong thanh điều hướng (nav). 
Khi người dùng nhấp vào logo, ứng dụng sẽ điều hướng về trang chủ. 
Điều này giúp người dùng dễ dàng quay lại trang chủ từ bất kỳ đâu trong ứng dụng chỉ bằng cách nhấp vào logo.
*/

const logoutuser = async () => {
  dispatch(RESET())
  await dispatch(logout())
  navigate('/login')
}

  return (
    <header className='header'>
      <nav>
        
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span>AUTH:Z</span>
        </div>
        
        <ul className="home-links">
          <ShowOnLogin>
            <li className='--flex-center'>
              <FaUserCircle size={20}/>
              {/* <p className="--color-white"> Hi, Bao To </p>  */}
              <UserName/>
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to='/profile' className={activeLink}>Profile</NavLink>
            </li>
            <li>
              <button onClick={logoutuser} className='--btn --btn-secondary'>Logout</button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  )
}

export default Header