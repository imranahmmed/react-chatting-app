import React, { useState } from 'react';
import Header from '../components/Header';
import Heading from '../components/Heading';
import Img from '../components/Img';
import Grid from '@mui/material/Grid';
import InputBox from '../components/InputBox';
import Div from '../components/Div';
import CButton from '../components/CButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthConfirmationLink from '../components/AuthConfirmationLink';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginSubmitButton = styled(Button)({
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
const googleloginButton = styled(Button)({
    fontSize: 18,
    padding: '18px 50px',
    marginBottom: '50px',
    marginTop: '15px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#000',
    display: 'flex',
    gap: '10px',
    border: '1px solid',
    borderColor: 'transparent',
    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: '#b8bacf',
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

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    let [formErrorMsg, setformErrorMsg] = useState({
        email: "",
        password: ""
    });

    let [showPass, setShowPass] = useState(false)
    let handleForm = (e) => {
        let { name, value } = e.target
        setFormData({ ...formData, [name]: value });
        setformErrorMsg({ ...formErrorMsg, [name]: "" });
    }

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                navigate("/home")
            })
    }
    let handleClick = () => {
        const validationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (formData.email === "") {
            setformErrorMsg({ ...formErrorMsg, email: "Email Required." })
        } else if (!validationPattern.test(formData.email)) {
            setformErrorMsg({ ...formErrorMsg, email: "Valid Email Required." })
        } else if (formData.password === "") {
            setformErrorMsg({ ...formErrorMsg, password: "Password Required." })
        } else {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    if (userCredential.user.emailVerified) {
                        navigate("/home")
                    } else {
                        toast.error('Please Verify your Email First.!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes("auth/wrong-password")) {
                        setformErrorMsg({ ...formErrorMsg, email: "Wrong Email." })
                        setformErrorMsg({ ...formErrorMsg, password: "Wrong password." })
                    } else if (errorCode.includes("auth/user-not-found")) {
                        toast.warn('User Not Found!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                });
        }

        // setFormData({ ...formData, email: "" })
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Div className="registrationLeftSide">
                    <Div>
                        <Header>
                            <Heading as="h2" className="regHeading" content="Login to your account!" />
                            <CButton onClick={handleGoogleLogin} buttonType={googleloginButton} >
                                <Img src="assets/images/google.png" />
                                Login With Google
                            </CButton>
                        </Header>
                        <Div className="registrationFormContainer">
                            <InputBox className="regInput" onChange={handleForm} label="Email Address" placeholder="yourmail@example.com" variant="standard" type="email" name="email" />
                            {formErrorMsg.email
                                &&
                                <Alert className='errorAlert' variant="filled" severity="error">
                                    {formErrorMsg.email}
                                </Alert>
                            }
                            <Div className="regInputContainer">
                                <InputBox className="regInput" onChange={handleForm} label="Password" placeholder="Enter Your Password" variant="standard" type={showPass ? "text" : "password"} name="password" />
                                {showPass
                                    ?
                                    <AiFillEye onClick={() => setShowPass(false)} className='passEyeIcon passEyeIconShow' />
                                    :
                                    <AiFillEyeInvisible onClick={() => setShowPass(true)} className='passEyeIcon' />
                                }
                            </Div>

                            {formErrorMsg.password
                                &&
                                <Alert className='errorAlert' variant="filled" severity="error">
                                    {formErrorMsg.password}
                                </Alert>
                            }

                            <CButton onClick={handleClick} buttonType={loginSubmitButton}>Sign in</CButton>

                            <AuthConfirmationLink className="loginAuthLink" title="Don’t have an account ?" href="/" hrefTitle="Sign up" />
                        </Div>
                    </Div>
                </Div>
            </Grid>
            <Grid item xs={6}>
                <Img className='registrationImg' src="assets/images/03.jpg" />
            </Grid>
        </Grid>
    )
}

export default Login