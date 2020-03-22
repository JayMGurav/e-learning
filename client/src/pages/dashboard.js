import React, { useContext } from 'react';
import { Link, Router } from '@reach/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Courses from './courses.js';
import CourseDetails from './courseDetail.js';
import { ThemeContext } from '../context/themeContext.js';
import Profile from './profile.js';
import MyCourses from './mycourses.js';

const NavLink = styled(Link)`
    width: 100%;
    text-align: center;
    color: #707070;
    padding: 1rem 0;
    :hover {
        background: #707070;
        color: #eee;
    }
`;

function Dashboard() {
    const { themeColors } = useContext(ThemeContext);
    return (
        <>
            <div
                css={css`
                    margin: 0;
                    width: 100%;
                    height: 100vh;
                    background: #121212;
                    display: flex;
                    flex-direction: column;
                    * + * {
                        margin: 0;
                    }
                `}
            >
                <div
                    css={css`
                        ${'' /* flex: 0.7; */}
                        width:100%;
                        background: ${themeColors.primaryBgColor};
                        display: flex;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 1;
                        flex-direction: row;
                        justify-content: center;
                    `}
                >
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                    <NavLink to="/dashboard/courses">Browse courses</NavLink>
                    <NavLink to="/dashboard/mycourses">My courses</NavLink>
                </div>
                <div
                    css={css`
                        height: 90%;
                        padding: 1rem;
                        background: ${themeColors.secondaryBgColor};
                        overflow-y: auto;
                    `}
                >
                    <Router>
                        <Profile path="profile" />
                        <Courses path="courses" />
                        <CourseDetails path="courses/courses/:courseId" />
                        <MyCourses path="mycourses" />
                    </Router>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
