import React from 'react'
import './Loader.scss'
import ReactDOM from 'react-dom'
import loaderImg from '../../assets/loader.gif'
const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  )
}
/*
  Sử dụng ReactDOM.createPortal để render JSX vào một DOM node cụ thể ngoài cây DOM của React. 
  Điều này rất hữu ích khi cần hiển thị các thành phần như modal hoặc loader mà không bị ảnh hưởng bởi cấu trúc DOM của ứng dụng.
  Và DOM node mục tiêu: document.getElementById('loader') - Đây là một DOM node có ID là 'loader' trong tệp HTML của bạn.
  */

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

/*
  Loader Component: Được thiết kế để hiển thị một loader toàn màn hình, sử dụng ReactDOM.createPortal để đảm bảo loader được render trên tất cả các thành phần khác trong ứng dụng. Điều này giúp loader luôn xuất hiện ở trung tâm và không bị ảnh hưởng bởi các thành phần khác của ứng dụng.

  Spinner Component: Được thiết kế để hiển thị một spinner nhỏ, sử dụng cho các phần cụ thể của trang. Ví dụ, hiển thị spinner khi đang chờ phản hồi từ server cho một hành động nhỏ.

  Sử dụng Hình ảnh Loader: Cả hai thành phần Loader và Spinner đều sử dụng chung một hình ảnh loader (loaderImg), đảm bảo sự nhất quán trong trải nghiệm người dùng.

  CSS Modules: Cả hai thành phần đều dựa vào các lớp CSS để định dạng và căn giữa hình ảnh loader. Điều này giúp tách biệt logic và kiểu dáng, làm cho code dễ bảo trì và mở rộng.
*/

export default Loader