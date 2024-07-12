import { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import LoginWithCode from './pages/auth/LoginWithCode';
import Verify from './pages/auth/Verify';
import Profile from './pages/profile/Profile';
import ChangePassword from './pages/changePassword/ChangePassword';
import UserList from './pages/userList/UserList';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './redux/features/auth/authSlice';
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.withCredentials = true;

/*

 'axios.defaults.withCredentials = true' trong app.js có tác dụng cấu hình Axios để tự động gửi các thông tin xác thực (credentials) như cookies, headers, hoặc chứng chỉ HTTP khi thực hiện các yêu cầu HTTP đến máy chủ.

Tác dụng của withCredentials
  - Gửi Cookies:
      Khi bạn thực hiện các yêu cầu tới máy chủ mà yêu cầu xác thực dựa trên cookies (ví dụ: session cookies), việc đặt withCredentials thành true sẽ đảm bảo rằng các cookies này được gửi cùng với các yêu cầu.
  
  - Cross-Origin Requests (CORS):
      Nếu ứng dụng của bạn và máy chủ API nằm trên các miền khác nhau, trình duyệt sẽ thực thi chính sách bảo mật CORS (Cross-Origin Resource Sharing). Khi withCredentials được đặt thành true, các yêu cầu CORS sẽ bao gồm các thông tin xác thực, như cookies.
      Máy chủ cũng cần phải cấu hình để cho phép chia sẻ thông tin xác thực bằng cách gửi lại header Access-Control-Allow-Credentials: true.
  
  - Xác thực:
    Một số API yêu cầu gửi thông tin xác thực qua các headers đặc biệt hoặc các chứng chỉ HTTP. withCredentials sẽ đảm bảo rằng các thông tin này được gửi cùng với yêu cầu.

==> Khi 'axios.defaults.withCredentials = true' được đặt trong app.js, tất cả các yêu cầu HTTP được thực hiện bằng Axios sẽ bao gồm các thông tin xác thực như cookies, headers, hoặc chứng chỉ HTTP. 
    Điều này rất quan trọng khi làm việc với các API yêu cầu xác thực hoặc khi thực hiện các yêu cầu CORS có chứa thông tin xác thực.
*/

function App() {
  const dispatch = useDispatch()  //Hàm dispatch này được sử dụng để gửi các action tới Redux store nhằm cập nhật state
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser) 

  useEffect(() => {
    dispatch(getLoginStatus())
    if(isLoggedIn && user ===null){
      dispatch(getUser)
    }
  },[dispatch, isLoggedIn, user])
  // useEffect sẽ chạy ngay sau khi component App được render lần đầu tiên.
  /*
  Khi component App được render lần đầu tiên, useEffect sẽ chạy và gọi dispatch(getLoginStatus()).
  Điều này giúp kiểm tra trạng thái đăng nhập của người dùng ngay khi ứng dụng khởi động. 
  Nếu người dùng đã đăng nhập trước đó, ứng dụng sẽ cập nhật state để phản ánh trạng thái đăng nhập này.
  Nhờ đó, ứng dụng có thể hiển thị giao diện phù hợp (chẳng hạn như hiển thị trang chủ hoặc dashboard nếu người dùng đã đăng nhập, hoặc trang đăng nhập nếu người dùng chưa đăng nhập).
  */
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
  return (
    <>
    <BrowserRouter>
      <ToastContainer />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path='/' element={ <Layout> <Home/> </Layout> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/resetPassword/:resetToken' element={<Reset/>} />
          <Route path='/loginWithCode/:email' element={<LoginWithCode/>} />
          <Route path='/verify/:verificationToken' element={ <Layout> <Verify/> </Layout> } />
          <Route path='/profile' element={ <Layout> <Profile/> </Layout> } />
          <Route path='/changePassword' element={ <Layout> <ChangePassword/> </Layout> } />
          <Route path='/users' element={ <Layout> <UserList/> </Layout> } />
        </Routes>
      </GoogleOAuthProvider> 
    </BrowserRouter>
    </>
  );
}

export default App;
