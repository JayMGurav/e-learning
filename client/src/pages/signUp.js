import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../context/themeContext.js';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { navigate, Link } from '@reach/router';

const signUpMutation = gql`
    mutation signUpMutation(
        $username: String!
        $email: String!
        $password: String!
    ) {
        signUp(username: $username, email: $email, password: $password)
    }
`;

function SignUp() {
    const [values, setValues] = useState({});
    const { themeColors, brandColors } = useContext(ThemeContext);

    function onchange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Mutation mutation={signUpMutation}>
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
                                padding: 0.6rem 1rem;
                                border: none;
                                border-radius: 4px;
                                background: ${brandColors.primaryBrandColor};
                            }
                        }
                    `}
                >
                    <form>
                        <h5>
                            Sign up with AIOC <span>.</span>
                        </h5>
                        <p>
                            <span>Enter</span> your details below
                        </p>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={() => onchange(event)}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@xyz.com"
                            onChange={() => onchange(event)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            onChange={() => onchange(event)}
                        />
                        <button
                            onClick={async e => {
                                e.preventDefault();
                                const response = await mutate({
                                    variables: values
                                });
                                if (response) {
                                    navigate('/login');
                                }
                            }}
                        >
                            Signup
                        </button>
                        <Link to="/login">
                            Already registered before...? Please login{' '}
                            <span>&rarr;</span>
                        </Link>
                    </form>
                    {/* <h2>{values.username}</h2> */}
                </div>
            )}
        </Mutation>
    );
}

export default SignUp;
