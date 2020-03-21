import React, { useState } from 'react';
import { Link, Router } from '@reach/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Courses from './courses.js';

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
    return (
        <>
            <div
                css={css`
                    width: 100%;
                    height: 100vh;
                    background: #121212;
                    display: flex;
                `}
            >
                <div
                    css={css`
                        flex: 0.7;
                        background: #212121;
                        height: 100%;
                        display: flex;
                        ${'' /* position: fixed; */}
                        flex-direction: column;
                        justify-content: center;
                    `}
                >
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/courses">Browse courses</NavLink>
                    <NavLink to="/mycourses">My courses</NavLink>
                </div>
                <div
                    css={css`
                        flex: 3;
                        padding: 2rem;
                        background: red;
                        overflow-y: auto;
                    `}
                >
                    <Router>
                        <Profile path="/profile" />
                        <Courses path="/courses" />
                        <MyCourses path="/mycourses" />
                    </Router>
                </div>
            </div>
        </>
    );
}

function Profile() {
    return (
        <>
            <h1>Profile</h1>
        </>
    );
}

function MyCourses() {
    return (
        <>
            <h1>MyCourses</h1>
        </>
    );
}

export default Dashboard;
