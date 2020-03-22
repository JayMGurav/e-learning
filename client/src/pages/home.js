import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../context/themeContext.js';
import HeaderSection from '../components/HeaderSection.js';
import web_developer from '../assets/web_developer.svg';
import cloud_computing from '../assets/cloud_computing.svg';
import mobile_marketing from '../assets/mobile_marketing.svg';

const hotCourses = [
    {
        imgsrc: web_developer,
        courseName: 'Server-Side Development',
        content: 'Server side development with NodeJs,Express and mongoDB'
    },
    {
        imgsrc: cloud_computing,
        courseName: 'Digital Marketng',
        content: 'search engine optimization, social media, pay-per-click'
    },
    {
        imgsrc: mobile_marketing,
        courseName: 'Cloud Computing',
        content:
            'search engine optimization, social media, pay-per-click, conversion optimization'
    }
];

function Home() {
    const { themeColors } = useContext(ThemeContext);

    return (
        <>
            <HeaderSection
                heading={{
                    firstLetter: 'L',
                    remainingLetters:
                        'earn the best tools and frameworks from industry pros'
                }}
                content="Choose your course to success -Build skills with courses,grab certificates"
                img="SitReadingDoodle"
            />
            <div
                css={css`
                    display: flex;
                    flex-wrap: wrap;
                    margin: 2rem;
                    h4 {
                        font-size: 1.5rem;
                        margin: 2rem 0;
                    }
                    h5 {
                        font-size: 1rem;
                    }
                `}
            >
                <h4>
                    <span>Hot</span> courses
                </h4>
                <div
                    css={css`
                        display: flex;
                        margin-bottom: 2rem;
                        flex-flow: row wrap;
                    `}
                >
                    {hotCourses.map((course, index) => (
                        <div
                            key={index}
                            css={css`
                                flex: 1;
                                padding: 1rem;
                                margin: 3rem 1rem;
                                background: ${themeColors.secondaryBgColor};
                                text-align: center;
                                border-radius: 8px;
                                box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.3);
                            `}
                        >
                            <img
                                css={css`
                                    margin-top: calc(-150px + 4rem);
                                `}
                                src={course.imgsrc}
                                width="150rem"
                                height="150rem"
                            />
                            <div
                                css={css`
                                    width: 80%;
                                    margin: auto;
                                `}
                            >
                                <h5>{course.courseName}</h5>
                                <p>{course.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
