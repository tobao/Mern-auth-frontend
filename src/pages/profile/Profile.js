import React, { useState, useEffect, useLayoutEffect } from 'react'
import Card from '../../components/card/Card'
import profileImg from '../../assets/avatarr.png'
import './Profile.scss'
import PageMenu from '../../components/pageMenu/PageMenu'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import {getUser, selectUser, updateUser} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from 'react-toastify'
import Notification from '../../components/notification/Notification'

const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET 

export const shortenText = (text,n) => {
  if(text.length > n){
     const shoretenedText = text.substring(0,n).concat("...") //text.substring(0, n): Hàm substring lấy một phần của chuỗi text, bắt đầu từ chỉ mục 0 và kết thúc tại chỉ mục n (không bao gồm chỉ mục n). Điều này lấy n ký tự đầu tiên của chuỗi text.
     //.concat("..."): Hàm concat thêm chuỗi "..." vào cuối chuỗi đã được rút ngắn.
    return shoretenedText
  }
  return text
}


const Profile = () => {
  useRedirectLoggedOutUser('/login')
  const dispatch = useDispatch();

  const {isLoading, isLoggedIn, isSuccess, message,user} = useSelector((state) => state.auth)

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])


  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  


  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
    // const file = e.target.files[0];
    // if (file) { // Kiểm tra nếu file không phải là null hoặc undefined
    //   setProfileImage(file);
    //   setImagePreview(URL.createObjectURL(file));
    // } else {
    //   console.error("Invalid file input");
    // }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setProfile({...profile, [name]:value})
  };

  const saveProfile = async (e) =>{
    e.preventDefault()
    let imageURL  
    try {
      if(profileImage != null && (
        profileImage.type === 'image/jpeg' || 
        profileImage.type === 'image/jpg' ||
        profileImage.type === 'image/png' 
     )) {
       const image = new FormData()
       image.append('file', profileImage)
       image.append('cloud_name', cloud_name)
       image.append('upload_preset', upload_preset)

       //Save image to Cloudinary
       const response = await fetch(
        "https://api.cloudinary.com/v1_1/dddirtlsn/image/upload", 
        {method: "POST", body: image}
        //Tham khảo https://cloudinary.com/documentation/image_upload_api_reference
       )
       const imgData = await response.json()
       console.log(imgData)
       imageURL = imgData.url.toString()
      }

      //Save profile to MongDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage? imageURL: profile.photo,
      }

      dispatch(updateUser(userData))

      toast.success('Image Uploaded')
    } catch (error) {
      toast.error(error.message)
    }
  }

  useLayoutEffect(() => {
    if(user){
      setProfile({
        ...profile,
        name:user.name,
        email:user.email,
        phone:user.phone,
        photo:user.photo,
        bio:user.bio,
        role:user.role,
        isVerified: user.isVerified
      })
    }

  },[user])

  return (
    <>
      {isLoading && <Loader/>}
      {!profile.isVerified && <Notification />}
      <section>
        <div className='container'>
        <PageMenu/>
          <h2>Profile</h2>
          <div className="--flex-center profile">
          <Card cardClass={'card'}>
            {!isLoading && user && (
              <>
                <div className="profile-photo">
                  <div>
                    <img src={imagePreview === null ? user?.photo: imagePreview} alt="Profileimg" />
                    <h3>{profile.role}</h3>
                  </div>
                </div>
                <form onSubmit={saveProfile}>
                  <p>
                    <label >Change Photo:</label>
                    <input type="file" accept='image/*' onChange={handleImageChange} />
                  </p>
                  <p>
                    <label >Name:</label>
                    <input type="text" name='name' value={profile?.name} onChange={handleInputChange} />
                  </p>
                  <p>
                    <label >Email:</label>
                    <input type="email" name='email' value={profile?.email} onChange={handleInputChange} disabled/>
                  </p>
                  <p>
                    <label >Phone:</label>
                    <input type="text" name='phone' value={profile?.phone} onChange={handleInputChange}/>
                  </p>
                  <p>
                    <label >Bio:</label>
                    <textarea name="bio" value={profile?.bio} onChange={handleInputChange} cols='30' rows='10'></textarea>
                  </p>
                  <button className='--btn --btn-primary --btn-block'>
                    Update Profile
                  </button>
                </form>
              </>
            )}
          </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export const UserName = () => {
  const user = useSelector(selectUser) 

  const username = user?.name || "..."

  return <p className="--color-white"> Hi, {shortenText(username,5) } </p> 

}

export default Profile