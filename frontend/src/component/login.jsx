import React, { useState, useEffect } from 'react';
import { EuiFlexGroup, EuiForm, EuiFlexItem, EuiTitle, EuiFieldText, EuiSpacer, EuiButton, EuiText, EuiImage } from '@elastic/eui';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

const image = require('./Secure login-pana (1).png');

const Login = () => {
    const notify = () => {
        toast.success("Login Up Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false
        });
      }
      const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      const loginUser = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            const token = data.accessToken ;
            // Store the token in a cookie
            Cookies.set('token', token);
            notify();
            // Redirect to the home page
            navigate('/home');
          } else {
            const errorMessage = data.error || 'Invalid Login';
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 20000
            });
          }
        } catch (error) {
          console.log('Error:', error);
          toast.error("An error occurred while logging in. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 20000
          });
         
     }
    }

    return (
        <>
            <EuiFlexGroup className="login">
                <EuiFlexItem className="login-left">
                    <EuiImage src={image} className="login-left-image" alt="" />
                </EuiFlexItem>
                <EuiFlexItem className="login-content">
                    <EuiFlexGroup justifyContent="center" alignItems='center' direction="column" className="login-content-list">
                        <EuiFlexItem grow={false}>
                            <EuiTitle>
                                <h1>Login</h1>
                            </EuiTitle>
                        </EuiFlexItem>
                        <EuiSpacer size="l" />
                        <EuiForm method="POST">
                            <EuiFlexItem grow={false}>
                                <EuiFieldText
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-content-field"

                                />
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiFlexItem grow={false}>
                                <EuiFieldText
                                    type="password"
                                    placeholder="Password"
                                    className="login-content-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />

                            <EuiFlexItem grow={false}>
                                <EuiButton color="primary" type="submit" fill onClick={loginUser}>
                                    Login
                                </EuiButton>
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            {/* <EuiFlexItem grow={false}>
                                <EuiText className="login-content-signuplink">
                                    <p>If you haven’t signed up, please </p>
                                    <a href="./signup">Sign Up.</a>
                                </EuiText>
                            </EuiFlexItem> */}
                        </EuiForm>
                    </EuiFlexGroup>
                </EuiFlexItem>
                <ToastContainer/>
            </EuiFlexGroup>
        </>

    );
};
export default Login;
