import React, { useState, useEffect } from 'react';

import { EuiFlexGroup, EuiForm, EuiFlexItem, EuiTitle, EuiFieldText, EuiSpacer, EuiButton, EuiText, EuiImage } from '@elastic/eui';

const image = require('./Secure login-rafiki.png');

const Login = () => {


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
                                <h1>Sign Up</h1>
                            </EuiTitle>
                        </EuiFlexItem>
                        <EuiSpacer size="l" />
                        <EuiForm method="POST">
                            <EuiFlexItem grow={false}>
                                <EuiFieldText
                                    type="text"
                                    placeholder="User Name"

                                    className="login-content-field"

                                />
                                <EuiSpacer size="l" />
                              
                                <EuiFieldText
                                    type="email"
                                    placeholder="Email"

                                    className="login-content-field"

                                />
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                         
                            <EuiFlexItem grow={false}>
                                <EuiFieldText
                                    type="password"
                                    placeholder="Password"
                                    className="login-content-field"

                                />
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiFlexItem grow={false}>
                                <EuiFieldText
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="login-content-field"

                                />
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                    

                            <EuiFlexItem grow={false}>
                                <EuiButton color="primary" type="submit" fill>
                                    Signup
                                </EuiButton>
                            </EuiFlexItem>
                            <EuiSpacer size="l" />
                            <EuiSpacer size="l" />
                            <EuiFlexItem grow={false}>
                                <EuiText className="login-content-signuplink">
                                    <p>Have already account, please </p>
                                    <a href="./">Login.</a>
                                </EuiText>
                            </EuiFlexItem>
                        </EuiForm>
                    </EuiFlexGroup>
                </EuiFlexItem>
             
            </EuiFlexGroup>
        </>

    );
};
export default Login;
