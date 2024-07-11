import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//Đây là một hàm tiện lợi giúp chúng ta dễ dàng tạo một slice Redux, bao gồm reducer và các actions tương ứng
import { toast } from 'react-toastify';
import authService from './authService';


const initialState = {
  isLoggedIn: false,
  user:null,
  users:[],
  twoFactor:false,
  isError:false,
  isSuccess: false,
  isLoading: false,
  message:'',
  verifiedUsers: 0,
  suspendedUsers: 0,
}
/*
  Khai báo một biến initialState đại diện cho trạng thái ban đầu của slice auth. 
  Ở đây, isLoggedIn được khởi tạo là false, biểu thị rằng người dùng chưa đăng nhập.
  user: Thông tin người dùng hiện tại.
  users: Một mảng chứa thông tin nhiều người dùng.
  twoFactor: Boolean xác định người dùng có sử dụng xác thực hai yếu tố không.
  isError: Boolean xác định có lỗi xảy ra hay không.
  isSuccess: Boolean xác định hành động có thành công hay không.
  isLoading: Boolean xác định trạng thái đang tải dữ liệu hay không.
  message: Thông báo lỗi hoặc thành công từ các hành động.
*/

//Register User
export const register = createAsyncThunk('auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

/*
  createAsyncThunk là một hàm từ Redux Toolkit, được sử dụng để tạo một async thunk. Async thunks được sử dụng để xử lý các thao tác không đồng bộ, như gọi API, và quản lý các trạng thái khác nhau của thao tác này (pending, fulfilled, rejected).

  Chuỗi 'auth/register' là một định danh duy nhất cho async thunk này. Nó được sử dụng để phân biệt giữa các thunks khác nhau và để tạo ra các action types (auth/register/pending, auth/register/fulfilled, auth/register/rejected).

  Hàm async này nhận hai tham số:
    userData: Dữ liệu người dùng được truyền vào khi gọi async thunk này. Dữ liệu này thường chứa các thông tin đăng ký người dùng như tên, email, mật khẩu, v.v.
    thunkAPI: Đối tượng cung cấp các phương thức và thông tin hữu ích để làm việc với Redux store, như dispatch, getState, và rejectWithValue.

  authService.register(userData)
    Hàm register từ authService được gọi với userData làm tham số. Hàm này thường thực hiện một yêu cầu API để đăng ký người dùng mới trên máy chủ.
    await được sử dụng để đợi kết quả từ lời gọi API. Nếu lời gọi API thành công, kết quả sẽ được trả về và action fulfilled sẽ được dispatch với payload là kết quả đó.

  const message = ...: Dòng này trích xuất thông báo lỗi từ đối tượng lỗi (error). Nó kiểm tra nếu lỗi có phản hồi từ máy chủ (error.response) và có dữ liệu phản hồi (error.response.data), nó sẽ sử dụng thông báo từ đó (error.response.data.message). Nếu không, nó sẽ sử dụng error.message hoặc chuyển đổi đối tượng lỗi thành chuỗi (error.toString()).

  rejectWithValue là một phương thức của thunkAPI được sử dụng để trả về một giá trị lỗi tùy chỉnh khi async thunk bị từ chối. Nó sẽ dispatch action rejected với payload là thông báo lỗi (message).
*/

//Login User
export const login = createAsyncThunk('auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get Login Status
export const getLoginStatus = createAsyncThunk('auth/getLoginStatus',
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get User 
export const getUser = createAsyncThunk('auth/getUser',
  async (_, thunkAPI) => {
    try {
      return await authService.getUser()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update User 
export const updateUser = createAsyncThunk('auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// send Verification Email
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify User
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.verifyUser(verificationToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout User
export const logout = createAsyncThunk('auth/logout',
  async (_, thunkAPI) => {
    try {
      return await authService.logout()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.forgotPassword(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// resetPassword
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      return await authService.resetPassword(userData, resetToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// getUsers
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// deleteUser
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteUser(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// upgradeUser
export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.upgradeUser(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// sendLoginCode
export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async (email, thunkAPI) => {
    try {
      return await authService.sendLoginCode(email)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// loginWithCode
export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async ({ code, email }, thunkAPI) => {
    try {
      return await authService.loginWithCode(code, email);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)
// loginWithGoogle
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (userToken, thunkAPI) => {
    try {
      return await authService.loginWithGoogle(userToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.twoFactor=false;
      state.isError=false;
      state.isSuccess= false;
      state.isLoading= false;
      state.message='';
    },
    CALC_VERIFIED_USER(state, action) {
      const array = [];
      state.users.map((user) => {
        const { isVerified } = user;
        return array.push(isVerified);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === true) {
          count += 1;
        }
      });
      state.verifiedUsers = count;
    },
    CALC_SUSPENDED_USER(state, action) {
      const array = [];
      state.users.map((user) => {
        const { role } = user;
        return array.push(role);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === "suspended") {
          count += 1;
        }
      });
      state.suspendedUsers = count;
    },
  },
  extraReducers: (builder) => {
    builder
    //Register User 
    .addCase(register.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.isLoggedIn=true;
      state.user= action.payload;
      console.log(action.payload)
      toast.success('Registration successful');
    })
    .addCase(register.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      state.user= null;
      toast.error(action.payload);
    })
    
    //Login User 
    .addCase(login.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.isLoggedIn=true;
      state.user= action.payload;
      console.log(action.payload)
      toast.success('Login successful');
    })
    .addCase(login.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      state.user= null;
      toast.error(action.payload);
      if (action.payload.includes("New browser")) {
        state.twoFactor = true;
      }
    })
    //Get Login Status 
    .addCase(getLoginStatus.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(getLoginStatus.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.isLoggedIn=action.payload;
    })
    .addCase(getLoginStatus.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      toast.error(action.payload);
    })
     //Get User 
     .addCase(getUser.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(getUser.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.user=action.payload;
    })
    .addCase(getUser.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      toast.error(action.payload);
    })
     //Update User 
     .addCase(updateUser.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(updateUser.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.isLoggedIn=true;
      state.user=action.payload;
      toast.success("User Updated");
    })
    .addCase(updateUser.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      toast.error(action.payload);
    })
    // send Verification Email
     .addCase(sendVerificationEmail.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendVerificationEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(sendVerificationEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
     // verify User
     .addCase(verifyUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(verifyUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(verifyUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
     // change Password
     .addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    //Logout User 
    .addCase(logout.pending, (state,action)=>{
      state.isLoading = true
    })
    .addCase(logout.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.isSuccess= true;
      state.isLoggedIn=false;
      state.user= null;
      toast.success(action.payload);
    })
    .addCase(logout.rejected, (state,action)=> {
      state.isLoading = false;
      state.isError= true;
      state.message=action.payload;
      toast.error(action.payload);
    })
    // forgotPassword
    .addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // resetPassword
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // getUsers
    .addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // deleteUser
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
     // upgradeUser
     .addCase(upgradeUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(upgradeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(upgradeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // send Login Code
    .addCase(sendLoginCode.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendLoginCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    })
    .addCase(sendLoginCode.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // loginWithCode
    .addCase(loginWithCode.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginWithCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.twoFactor = false;
      state.user = action.payload;
      toast.success(action.payload);
    })
    .addCase(loginWithCode.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      toast.error(action.payload);
    })

    // loginWithGoogle
    .addCase(loginWithGoogle.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      toast.success("Login Successful");
    })
    .addCase(loginWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      toast.error(action.payload);
    });
  }
});

/*
      Tạo một slice tên là auth sử dụng createSlice với các tham số sau:
        name: Tên của slice, ở đây là "auth".
        initialState: Trạng thái ban đầu của slice, được định nghĩa ở trên.
        reducers: Một đối tượng chứa các reducer để xử lý các action.
          RESET: Hành động này đặt lại các state về giá trị mặc định của chúng, giúp làm mới trạng thái của ứng dụng sau một hành động cụ thể.

        extraReducers:Nơi định nghĩa các reducer bổ sung để xử lý các actions được tạo bởi các async thunks hoặc các slice khác.
          - Xử lý trạng thái khi action register.pending được dispatch (gửi đi) ==> Đặt trạng thái isLoading thành true, cho biết rằng quá trình đăng ký đang diễn ra.
          
          - Xử lý trạng thái khi action register.fulfilled được dispatch
            -- Đặt trạng thái isLoading thành false, cho biết rằng quá trình đăng ký đã hoàn tất.
            -- Đặt trạng thái isSuccess thành true, cho biết rằng quá trình đăng ký thành công.
            -- Đặt trạng thái isLoggedIn thành true, cho biết người dùng đã đăng nhập.
            -- state.user = action.payload: Lưu thông tin người dùng được trả về từ action vào state.
            -- toast.success('Registration successful'): Hiển thị thông báo thành công cho người dùng.

          -Xử lý trạng thái khi action register.rejected được dispatch.
            -- Đặt trạng thái isLoading thành false, cho biết rằng quá trình đăng ký đã kết thúc nhưng không thành công.
            -- Đặt trạng thái isError thành true, cho biết rằng có lỗi xảy ra trong quá trình đăng ký.
            -- state.message = action.payload: Lưu thông báo lỗi được trả về từ action vào state.
            -- state.user = null: Đặt thông tin người dùng thành null, vì quá trình đăng ký không thành công.
            -- toast.error(action.payload): Hiển thị thông báo lỗi cho người dùng.
*/


export const {RESET,CALC_VERIFIED_USER,CALC_SUSPENDED_USER} = authSlice.actions
//Xuất các actions từ authSlice. 
//Xuất action RESET được tạo tự động bởi createSlice. Điều này cho phép sử dụng hành động RESET ở các phần khác của ứng dụng để reset state.

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
//Selector này được sử dụng để trích xuất giá trị của thuộc tính isLoggedIn từ slice "auth" trong Redux store. Selector là một cách tiện lợi để truy xuất dữ liệu từ Redux store mà không cần phải lặp lại nhiều lần cú pháp truy cập state trong các component của bạn.
export const selectUser = (state) => state.auth.user
//selector selectUser được sử dụng để truy cập thuộc tính user từ slice auth.
export default authSlice.reducer

/*
Xuất reducer mặc định từ authSlice. 
Đây là reducer sẽ được sử dụng để cập nhật state của slice auth khi các actions tương ứng được dispatch.
*/

/* Note:
  (*)Slice Redux là gì?
      Trong Redux, một "slice" là một phần của state và các reducer kết hợp lại để quản lý phần state đó. 
      Redux Toolkit, một thư viện hỗ trợ việc sử dụng Redux, giới thiệu khái niệm "slice" để giúp việc tạo và quản lý các phần của state trở nên dễ dàng hơn.
    
    Một slice bao gồm:
      State ban đầu: Giá trị mặc định của phần state này khi ứng dụng khởi động.
      Reducers: Các hàm xác định cách state thay đổi để đáp ứng với các actions.
      Actions: Các action creators tự động được tạo dựa trên các reducer đã xác định.

  (*)File authSlice.js này được sử dụng để quản lý trạng thái xác thực (authentication state) của người dùng trong ứng dụng của bạn. 
    Cụ thể, nó quản lý phần state liên quan đến việc người dùng có đăng nhập hay không.

  (*)File này hoạt động như thế nào trong ứng dụng của bạn?
    Cấu trúc Store:
      File này sẽ được import và kết hợp với các slice khác (nếu có) để tạo thành store Redux tổng thể của ứng dụng.
      Store sẽ sử dụng reducer của authSlice để quản lý phần state liên quan đến xác thực.
      
    Sử dụng Actions:
      Bạn sẽ thêm các reducers vào trong đối tượng reducers để xử lý các hành động liên quan đến việc đăng nhập và đăng xuất của người dùng.
      Các action creators tương ứng sẽ được tạo và có thể được sử dụng trong các component React để dispatch các hành động.
    
    Ví dụ về Reducer và Action:
      const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
          logIn(state) {
            state.isLoggedIn = true;
          },
          logOut(state) {
            state.isLoggedIn = false;
          }
        }
      });

      export const { logIn, logOut } = authSlice.actions;
      export default authSlice.reducer;
    
    Ở đây, logIn và logOut là hai reducer được định nghĩa để thay đổi trạng thái đăng nhập của người dùng. 
    Các action creators logIn và logOut cũng được tạo ra và có thể sử dụng để dispatch hành động từ các component React.

  ==>File authSlice.js này tạo ra một slice Redux để quản lý trạng thái đăng nhập của người dùng. 
  Nó định nghĩa state ban đầu và các reducer để cập nhật state khi các hành động liên quan đến xác thực xảy ra. 
  Slice này sẽ được tích hợp vào store Redux của ứng dụng để quản lý trạng thái một cách hiệu quả và có cấu trúc.
  (Xem thêm ở Note.txt)
*/