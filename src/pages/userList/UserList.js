import React, { useEffect, useState } from 'react'
import './UserList.scss'
import PageMenu from '../../components/pageMenu/PageMenu'
import UserStats from '../../components/userStats/UserStats'
import Search from '../../components/search/Search'
import { FaTrashAlt } from 'react-icons/fa'
import ChangeRole from '../../components/changeRole/ChangeRole'
import { useDispatch, useSelector } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice'
import { shortenText } from '../profile/Profile'
import { Spinner } from '../../components/loader/Loader'

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FILTER_USERS, selectUsers } from '../../redux/features/auth/filterSlice'
import ReactPaginate from "react-paginate"

const UserList = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()

  const [search, setSearch] = useState("");

  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const filteredUsers = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const removeUser = async (id) => {
    await dispatch(deleteUser(id))
    dispatch(getUsers())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    })
  }

  useEffect(()=>{
    dispatch(FILTER_USERS({users,search}))
  },[dispatch,users,search])

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  /*
    itemsPerPage: Định nghĩa số lượng mục hiển thị trên mỗi trang, ở đây là 5.
    itemOffset: Sử dụng hook useState để lưu trữ chỉ mục của mục đầu tiên trên trang hiện tại. setItemOffset là hàm để cập nhật giá trị của itemOffset.
  */

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    /*
      - endOffset: Chỉ mục của mục cuối cùng trên trang hiện tại, bằng itemOffset cộng với số mục trên mỗi trang.
        Để xác định được dải các mục (items) cần hiển thị trên trang hiện tại, chúng ta cần biết chỉ số của mục đầu tiên (itemOffset) và mục cuối cùng (endOffset). endOffset được tính bằng cách cộng itemOffset với itemsPerPage (số lượng mục trên mỗi trang).
      
      - currentItems: Lấy các mục hiện tại từ danh sách filteredUsers dựa trên itemOffset và endOffset bằng cách sử dụng hàm slice.
        Hàm slice của JavaScript được sử dụng để lấy một phần của mảng filteredUsers. Phần này bắt đầu từ itemOffset và kết thúc ngay trước endOffset. Điều này cho phép chúng ta hiển thị đúng các mục cần thiết cho trang hiện tại.
      
      - pageCount: Tổng số trang cần thiết, tính bằng cách lấy tổng số mục chia cho số mục trên mỗi trang và làm tròn lên (sử dụng Math.ceil).
        Để xác định được số lượng trang, chúng ta chia tổng số mục (filteredUsers.length) cho số lượng mục trên mỗi trang (itemsPerPage). Sử dụng Math.ceil để làm tròn lên, đảm bảo rằng chúng ta có đủ số trang để chứa tất cả các mục. Ví dụ, nếu có 21 mục và mỗi trang chứa 5 mục, chúng ta cần 5 trang (4 trang đầy đủ và 1 trang chứa 1 mục).
    
      Ví dụ minh họa
        Giả sử danh sách filteredUsers có 12 mục và itemsPerPage là 5:

        Trang đầu tiên (itemOffset = 0):
          endOffset = 0 + 5 = 5
          currentItems = filteredUsers.slice(0, 5) - Lấy các mục từ chỉ số 0 đến 4.
        
        Trang thứ hai (itemOffset = 5):
          endOffset = 5 + 5 = 10
          currentItems = filteredUsers.slice(5, 10) - Lấy các mục từ chỉ số 5 đến 9.

        Trang thứ ba (itemOffset = 10):
          endOffset = 10 + 5 = 15 (nhưng danh sách chỉ có 12 mục, nên chỉ lấy đến mục thứ 11)
          currentItems = filteredUsers.slice(10, 12) - Lấy các mục từ chỉ số 10 đến 11.

        Số trang (pageCount) sẽ là:  const pageCount = Math.ceil(12 / 5) = 3
    */

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
    /*
      handlePageClick: Hàm này được gọi khi người dùng chọn một trang khác. event.selected là số trang mà người dùng đã chọn.
      newOffset: Tính toán chỉ mục mới cho trang được chọn bằng cách nhân số trang với số mục trên mỗi trang và lấy phần dư khi chia cho tổng số mục (filteredUsers.length). Điều này đảm bảo chỉ mục luôn nằm trong phạm vi hợp lệ.
      setItemOffset(newOffset): Cập nhật itemOffset với giá trị mới.
    */

  // End Pagination

  return (
    <section>
      <div className="container">
        <PageMenu/>
        <UserStats/>
        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
              <h3>All Users</h3>
              </span>
              <span>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
              </span>
            </div>
            {/*Table */}
            {!isLoading && users.length===0 ?(
              <p>No user found...</p>
            ):(
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const {_id, name, email, role } = user

                    return (
                      <tr key={_id}>
                        <td>{index+1}</td>
                        <td>{shortenText(name,8) }</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole _id={_id} email={email}/>
                        </td>
                        <td><span><FaTrashAlt size={20} color='red' onClick={() => confirmDelete(_id)}/></span></td>
                      </tr>
                    )
                  })}
                  
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
            breakLabel="..." //Nhãn cho các trang không được hiển thị liên tiếp.
            nextLabel="Next" //Nhãn cho nút chuyển đến trang tiếp theo.
            onPageChange={handlePageClick} //Hàm xử lý khi người dùng chọn trang khác, được định nghĩa trước đó.
            pageRangeDisplayed={3} //Số lượng trang được hiển thị xung quanh trang hiện tại.
            pageCount={pageCount} //Tổng số trang, được tính trước đó.
            previousLabel="Prev" //Nhãn cho nút trở về trang trước.
            renderOnZeroPageCount={null} //Xử lý khi số lượng trang bằng 0.
            containerClassName="pagination" //Lớp CSS cho container của phân trang.
            pageLinkClassName="page-num" //Lớp CSS cho các liên kết trang.
            previousLinkClassName="page-num" //Lớp CSS cho liên kết trở về trang trước.
            nextLinkClassName="page-num" //Lớp CSS cho liên kết đến trang tiếp theo.
            activeLinkClassName="activePage" //Lớp CSS cho liên kết trang đang được chọn.
          />
        </div>
      </div>
    </section>
  )
}

export default UserList