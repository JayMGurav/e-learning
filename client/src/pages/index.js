import React from 'react';
import { Router } from '@reach/router';
import Cookies from 'js-cookie';

import Career from './careerGuidence.js';
import Courses from './courses.js';
import Home from './home.js';
import SignUp from './signUp.js';
import SignIn from './signIn.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
// import Dashboard from './dashboard.js';
import SubscriptionPage from './subscription.js';
import Dashboard from './dashboard.js';
import CourseDetails from './courseDetail.js';
//lazy load all the pages

export function UnSignedUsersRoutes() {
    // ROUTES FOR UNSIGNED USERS
    //home
    //courses
    //career Guidence
    //SignUp
    //signin
    return (
        <>
            <Navbar />
            <Router>
                <Home exact path="/" />
                <Courses path="/courses" />
                <CourseDetails path="/courses/:courseId" />
                <Career path="/career" />
                <SignUp path="/signup" />
                <SignIn path="/login" />
                <SubscriptionPage path="/pricing" />
            </Router>
            <Footer />
            {/* <Router>
                <Dashboard exact path="/dashboard" />
            </Router> */}
        </>
    );
    // }
}

export function SignedUserRoutes() {
    return (
        <>
            <Router>
                <Dashboard exact path="/dashboard" />
            </Router>
        </>
    );
}

// <Route exact path="/dashboard">
//     <Dashboard />
// </Route>
