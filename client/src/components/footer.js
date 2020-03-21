import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../context/themeContext.js';

function Footer() {
    const { themeColors, brandColors } = useContext(ThemeContext);

    return (
        <div
            css={css`
                width: 100%;
                background: ${themeColors.primaryBgColor};
                display: flex;
                align-items: center;
                jusify-content: center;
                margin: 0;
            `}
        >
            <div
                css={css`
                    max-width: 94vw;
                    width: 1100px;
                    margin: 2rem auto;
                `}
            >
                <h2>
                    AIOC<span>.</span>
                </h2>
                <div
                    css={css`
                        display: flex;
                        flex-flow: row wrap;
                        margin: 0;
                    `}
                >
                    {' '}
                    <div
                        css={css`
                            flex: 2;
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;

                            jusify-content: center;
                            p,
                            ul {
                                margin: 0 1rem;
                                flex: 1;
                            }
                            li {
                                margin: 0.5rem 0;
                            }
                        `}
                    >
                        <div>
                            <p>Content</p>
                            <ul>
                                <li>Learning Paths</li>
                                <li>Course Catalog</li>
                                <li>Career Guidance</li>
                            </ul>
                        </div>
                        <div>
                            <p>About</p>
                            <ul>
                                <li>Pricing</li>
                                <li>Instructor</li>
                                <li>Success Stories</li>
                            </ul>
                        </div>
                        <div>
                            <p>Legal</p>
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Terms of service</li>
                                <li>Copyright</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        css={css`
                            flex: 1;
                        `}
                    >
                        <p>Search for courses</p>
                        <div
                            css={css`
                                display: inline-flex;
                                margin: 0.5rem 0;
                                border-radius: 8px;
                                box-shadow: 0 0.5rem 8px rgba(0, 0, 0, 0.3);
                                input {
                                    background: ${themeColors.secondaryBgColor};
                                    border: none;
                                    padding: 0.4rem 0.5rem;
                                    border-radius: 8px 0 0 8px;
                                    font-size: 1rem;
                                    flex: 0 1 2;
                                }
                                #search {
                                    padding: 0.4rem 1rem;
                                    border-radius: 0 8px 8px 0;
                                    margin: 0;
                                    flex: 0 1 2;
                                    border: 0 4px 4px 0;
                                    background: #f28705;
                                }
                            `}
                        >
                            <input type="text" />
                            <div id="search">Search</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
