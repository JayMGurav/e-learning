import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { navigate, Link } from '@reach/router';

import { ThemeContext } from '../context/themeContext.js';

const signInMutation = gql`
    mutation loginMutation($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

//SignUp page
function SignIn(props) {
    const [values, setValues] = useState({});
    const { themeColors, brandColors } = useContext(ThemeContext);

    function onchange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    async function LogMeIn(mutate, event) {
        event.preventDefault();
        let { data } = await mutate({ variables: values });
        let token = data.signIn;
        await localStorage.setItem('token', token);
        if (token) {
            navigate('/dashboard/profile', { replace: true });
        }
    }

    return (
        <Mutation mutation={signInMutation}>
            {mutate => (
                <div
                    css={css`
                        height: 85vh;
                        background: ${themeColors.primaryBgColor};
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        form {
                            display: flex;
                            flex-direction: column;
                            background: ${themeColors.secondaryBgColor};
                            border-radius: 4px;
                            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
                            padding: 1rem 2rem;
                            label {
                                margin: 0;
                                color: ${themeColors.secondaryFontColor};
                                :first-of-type {
                                    margin-top: 1.5rem;
                                }
                            }
                            input {
                                padding: 0.4rem 1rem;
                                border: none;
                                border-radius: 4px;
                                margin: 0.5rem 0 1rem 0;
                                background: ${themeColors.primaryBgColor};
                                color: ${themeColors.fontColor};
                                font-size: 1rem;
                            }
                            button {
                                margin: 1rem 0;
                                padding: 0.4rem 1rem;
                                border: none;
                                border-radius: 4px;
                                background: ${brandColors.primaryBrandColor};
                            }
                        }
                    `}
                >
                    <form>
                        <h4>
                            Sign in with AIOC <span>.</span>
                        </h4>
                        <p>
                            <span>Enter</span> your details below
                        </p>
                        <br />
                        {props.location.state.error && (
                            <p>
                                <span>{props.location.state.error}</span>
                            </p>
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            onChange={() => onchange(event)}
                        />
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            onChange={() => onchange(event)}
                        />
                        <button onClick={event => LogMeIn(mutate, event)}>
                            Signin
                        </button>
                        <Link to="/signup">
                            Not registered yet...? Please register before
                            signing in <span>&rarr;</span>
                        </Link>
                    </form>
                </div>
            )}
        </Mutation>
    );
}

export default SignIn;
