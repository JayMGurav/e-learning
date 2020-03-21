import React, { useContext, useEffect, useState } from 'react';
import Theme, { ThemeContext } from '../context/themeContext.js';
import Resize from '../context/screenResizeContext.js';
import { Global, css } from '@emotion/core';
import { Router, navigate } from '@reach/router';
// import Cookies from 'js-cookie';
import { UnSignedUsersRoutes, SignedUserRoutes } from '../pages/index.js';
import Dashboard from '../pages/dashboard.js';

function ThemeApp() {
    return (
        <Theme>
            <Resize>
                <App />
            </Resize>
        </Theme>
    );
}

// let token = localStorage.getItem('token');

const App = () => {
    const { themeColors, brandColors } = useContext(ThemeContext);
    const [signed, setSigned] = useState(false);

    // useEffect(() => {
    //     let isSubscribed = true;
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         setSigned(true);
    //         navigate('/dashboard', { replace: true });
    //     } else {
    //         setSigned(false);
    //         navigate('/', { replace: true });
    //     }
    //     return () => {
    //         isSubscribed = false;
    //     };
    // }, []);

    return (
        <>
            <Global
                styles={css`
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    * + * {
                        margin: 1rem;
                    }
                    html,
                    body {
                        margin: 0;
                        padding: 0;
                        background: ${themeColors.primaryBgColor};
                        height: 100%;
                        width: 100%;
                        color: ${themeColors.fontColor};
                        font-family: -apple-system, BlinkMacSystemFont,
                            'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.2;
                        overflow: auto;
                    }
                    ::selection {
                        background-color: ${themeColors.fontColor};
                        color: ${themeColors.primaryBgColor};
                    }
                    ::-webkit-scrollbar {
                        width: 3px;
                        cursor: pointer;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: ${themeColors.fontColor};
                        border-radius: 10px;
                    }

                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    strong {
                        font-weight: 900;
                        font-size: 2.4rem;
                        letter-spacing: 0.05rem;
                        margin: 1rem 0;
                        color: ${themeColors.headingColor};
                    }
                    .brandSpan {
                        color: ${brandColors.primaryBrandColor};
                    }
                    p {
                        margin: 0;
                        color: ${themeColors.fontColor};
                        font-size: ;
                    }
                    span {
                        padding: 0;
                        margin: 0;
                        color: ${brandColors.primaryBrandColor};
                    }

                    a,
                    li,
                    ul {
                        text-decoration: none;
                        list-style: none;
                        color: ${themeColors.secondaryFontColor};
                        :focus,
                        :hover {
                            border: none;
                        }
                    }
                    a:hover {
                        cursor: pointer;
                    }

                    button {
                        cursor: pointer;
                        padding: 0.6rem 2rem;
                        margin: 1.5rem 0;
                        background: ${brandColors.primaryBrandColor};
                        border: none;
                        border-radius: 25px;
                        color: #eee;
                    }
                    .someShadow {
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                            0 3px 6px rgba(0, 0, 0, 0.23);
                    }
                    .fullWidth {
                        width: 100%;
                        height: 100vh;
                    }
                `}
            />
            <main
                css={css`
                    position: relative;
                    max-width: 94vw;
                    width: 1200px;
                    margin: 0 auto;
                    background: ${themeColors.primaryBgColor};
                    padding: 0;
                `}
            >
                {/* {signed ? <SignedUserRoutes /> : */}
                <UnSignedUsersRoutes />
                <SignedUserRoutes />
                {/* } */}
                {/* <Dashboard /> */}
            </main>
        </>
    );
};
export default ThemeApp;
