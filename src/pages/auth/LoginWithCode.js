import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { GrInsecure } from 'react-icons/gr'
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Loader from '../../components/loader/Loader';


const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState('');
  //useState được sử dụng để quản lý trạng thái trong hàm thành phần.
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();

    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth}`}>
       {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>

          <div className="--flex-center">
            <GrInsecure size={35} color='#999'/>
          </div>

          <h2>Enter Access Code</h2>

          <form onSubmit={loginUserWithCode}>
            <input type="text" placeholder='Access Code' required name='accessCode' 
            value={loginCode} onChange={(e)=> setLoginCode(e.target.value)} />

            <button type='submit' className="--btn --btn-primary --btn-block">
              Preceed To Login
            </button>

            <span className='--flex-center'>Check your email for login access code</span>

            <div className={styles.links}>
              <p>
                <Link to='/'>-Home</Link>
              </p>
              <p onClick={sendUserLoginCode} className='v-link --color-primary'>
                <b>Resend Code</b>
              </p>
          </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default LoginWithCode