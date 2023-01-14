import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import CButton from '../components/CButton';
import { styled } from '@mui/material/styles';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activeUser } from '../slices/authSlice';

const logOutButton = styled(Button)({
    width: '100%',
    fontSize: 18,
    padding: '18px 12px',
    borderRadius: '8px',
    backgroundColor: '#5F35F5',
    marginTop: "50px",
    marginBottom: "20px",
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

const Home = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const userAuthData = useSelector(state => state)
    const dispatch = useDispatch(state => state)

    useEffect(() => {
        if (!userAuthData.authData.userInfo) {
            navigate("/login")
        }
    }, [])



    let handleLogOut = () => {
        signOut(auth).then(() => {
            dispatch(activeUser(null))
            localStorage.removeItem("userInfo")
            navigate("/login")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            <CButton onClick={handleLogOut} buttonType={logOutButton}>Log Out</CButton>
        </div>
    )
}

export default Home