import { configureStore  } from '@reduxjs/toolkit'          //một package cung cấp các công cụ và phương pháp tiện lợi để thiết lập Redux store một cách dễ dàng và hiệu quả. configureStore một hàm từ @reduxjs/toolkit giúp tạo ra một Redux store với các cấu hình mặc định tốt nhất và tích hợp các middleware cần thiết.
import authReducer from '../redux/features/auth/authSlice'  // authReducer là reducer được tạo ra từ slice authSlice, giúp xử lý các thay đổi trong state liên quan đến authentication (xác thực).
import emailReducer from "../redux/features/email/emailSlice"
import filterReducer from "../redux/features/auth/filterSlice"

export const store = configureStore({
  reducer:{
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
  }
})

/*
Tạo một Redux store sử dụng hàm configureStore.
Store này sẽ được export để sử dụng trong các phần khác của ứng dụng.
  reducer là một đối tượng chứa tất cả các reducer của ứng dụng.
  auth: authReducer định nghĩa rằng slice auth sẽ được quản lý bởi authReducer.
  Trong state của store, sẽ có một thuộc tính auth chứa các state liên quan đến authentication.
--------------------------------------------------------------------------------------------------------
(*)Mục đích và chức năng của file store.js
  1.Mục đích:
    - File store.js được sử dụng để tạo và cấu hình Redux store cho ứng dụng.
    - Đây là nơi kết hợp các reducer từ các slice khác nhau để tạo ra state tổng thể của ứng dụng.

  2.Chức năng:
    - Cấu hình Redux store với các reducer cần thiết.
    - Đảm bảo rằng tất cả các state của ứng dụng đều được quản lý thông qua Redux store, giúp theo dõi và quản lý state một cách hiệu quả.
  
  3.Cách hoạt động
    - Khi ứng dụng khởi chạy, store.js sẽ tạo một Redux store mới với các cấu hình đã được định nghĩa.
    - Store này sẽ sử dụng authReducer để xử lý các action liên quan đến authentication và cập nhật state auth tương ứng.
    - Bất kỳ thay đổi nào trong state sẽ được phản ánh thông qua các action được dispatch đến store và được xử lý bởi các reducer tương ứng.

  4.Liên kết với các phần khác của ứng dụng
    Sử dụng store trong ứng dụng:
      Để sử dụng Redux store trong ứng dụng, cần wrap ứng dụng trong Provider component từ react-redux và truyền store vào.
      Ví dụ:
        .....
        import { store } from './redux/store';
        .....

        ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        );

  5.Kết nối component với store:
    Các component trong ứng dụng có thể sử dụng useSelector để truy cập state và useDispatch để dispatch action.
    Ví dụ:

      import React from 'react';
      import { useSelector, useDispatch } from 'react-redux';
      import { login } from './redux/features/auth/authSlice';

      const LoginComponent = () => {
        const dispatch = useDispatch();
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

        const handleLogin = () => {
          dispatch(login());
        };

        return (
          <div>
            {isLoggedIn ? 'Logged In' : 'Not Logged In'}
            <button onClick={handleLogin}>Login</button>
          </div>
        );
      };

      export default LoginComponent;

    
  */