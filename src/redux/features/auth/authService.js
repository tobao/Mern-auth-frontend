import axios from 'axios'   //Axios là một thư viện JavaScript được sử dụng để thực hiện các yêu cầu HTTP từ phía client hoặc server
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL //Lấy URL của backend từ biến môi trường REACT_APP_BACKEND_URL.
export const API_URL = `${BACKEND_URL}/api/users/` //Tạo URL cơ sở cho API của người dùng bằng cách nối BACKEND_URL với đường dẫn `/api/users/`

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


//Register User 
const register = async (userData) => {
  //Gửi yêu cầu HTTP POST đến endpoint API_URL + 'register' với dữ liệu userData. (Gửi yêu cầu đăng ký người dùng mới đến server)
  const response = await axios.post(API_URL + 'register', userData)
  return response.data //Chờ phản hồi từ server và trả về dữ liệu phản hồi (response.data).
}

//Login User 
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  return response.data 
}

//Logout User
const logout = async () => {
  const response = await axios.get(API_URL + 'logout')
  return response.data.message
}

//Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + 'getLoginStatus')
  return response.data
}

//Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + 'getUser')
  return response.data
}

//Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + 'updateUser', userData)
  return response.data
}

//Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + 'sendVerificationEmail')
  return response.data.message
}

//Verify User 
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`)

  return response.data.message
}
//Change Password 
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + 'changePassword',userData)

  return response.data.message
}

//Forgot Password 
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + 'forgotPassword',userData)

  return response.data.message
}

//Reset Password 
const resetPassword= async (userData,resetToken) => {
  const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`,userData)

  return response.data.message
}

//Get Users 
const getUsers= async () => {
  const response = await axios.get(API_URL + 'getUsers')

  return response.data
}

//Delete User 
const deleteUser= async (id) => {
  const response = await axios.delete(API_URL + id)

  return response.data.message
}

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);

  return response.data.message;
}

// Send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data.message;
}

// Login With Code
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
}
// Login With Google
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken);

  return response.data;
}

// Tạo đối tượng authService chứa các hàm dịch vụ
const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
}

export default authService