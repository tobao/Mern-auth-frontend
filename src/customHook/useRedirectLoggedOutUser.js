import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../redux/features/auth/authService'
import { toast } from 'react-toastify'

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
        //gọi hàm authService.getLoginStatus() để kiểm tra trạng thái đăng nhập của người dùng. Nếu người dùng đã đăng nhập, isLoggedIn sẽ được gán giá trị true.
      } catch (error) {
        console.log(error.message);
      }

      //Nếu người dùng không đăng nhập ==> isLoggedIn là false ==> hiển thị thông báo
      if (!isLoggedIn) {
        toast.info("Session expired, please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser(); //Gọi hàm redirectLoggedOutUser ngay lập tức trong useEffect để thực hiện kiểm tra trạng thái đăng nhập và điều hướng nếu cần thiết.
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser

/*
useEffect() trong đoạn code này giúp kiểm tra trạng thái đăng nhập của người dùng 
ngay khi component được mount và điều hướng họ nếu họ không còn đăng nhập,
đảm bảo rằng người dùng không thể truy cập các trang yêu cầu đăng nhập khi phiên làm việc của họ đã hết hạn.
*/