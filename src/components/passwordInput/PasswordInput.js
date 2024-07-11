import React, { useState } from 'react'
import './PasswordInput.scss'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
/*
Sử dụng destructuring để lấy các props truyền vào thành phần này. Các props bao gồm:
  placeholder: Văn bản hiển thị gợi ý trong trường nhập.
  value: Giá trị hiện tại của trường nhập.
  onChange: Hàm xử lý sự kiện khi giá trị trường nhập thay đổi.
  name: Tên của trường nhập.
  onPaste: Hàm xử lý sự kiện khi người dùng dán nội dung vào trường nhập.
*/

const PasswordInput = ({placeholder, value, onChange, name, onPaste}) => {
  const [showPassWord, setShowPassWord] = useState(false)
  //Khai báo một state showPassWord với giá trị ban đầu là false. showPassWord sẽ xác định liệu mật khẩu có được hiển thị hay không.
  const togglePassWord = () => {
    setShowPassWord(!showPassWord)
  }
  //Định nghĩa một hàm togglePassWord để thay đổi giá trị của showPassWord giữa true và false.
  return (
    <div className='password'>
        {
          /*type={showPassWord ? "text" : "password"} 
             Nếu showPassWord là true, loại trường nhập sẽ là "text" để hiển thị mật khẩu. 
            Nếu showPassWord là false, loại trường nhập sẽ là "password" để ẩn mật khẩu.
          */
        }
      <input type={showPassWord? "text":"password"} placeholder={placeholder} required name= {name} 
            value={value} onChange={onChange} onPaste={onPaste} />
      <div className="icon" onClick={togglePassWord}>
        {showPassWord?(<AiOutlineEyeInvisible size={20} />):(<AiOutlineEye size={20} />)}
      </div>
    </div>
  )
}

export default PasswordInput
/*
  Thành phần PasswordInput cho phép người dùng nhập mật khẩu và cung cấp tính năng hiển thị hoặc ẩn mật khẩu bằng cách nhấp vào biểu tượng mắt.
  useState được sử dụng để quản lý trạng thái hiển thị mật khẩu.
  Các biểu tượng được hiển thị động dựa trên trạng thái của showPassWord.
*/