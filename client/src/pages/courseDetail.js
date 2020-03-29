import React from 'react';
import HeaderSection from '../components/HeaderSection.js';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

import StripeCheckout from 'react-stripe-checkout';
import { navigate } from '@reach/router';

const buyCourseMutation = gql`
    mutation BuyCourseMutation(
        $source: String!
        $coursename: String
        $courseId: ID
    ) {
        buyCourse(
            source: $source
            courseId: $courseId
            coursename: $coursename
        ) {
            _id
            email
        }
    }
`;

const MeQuery = gql`
    query {
        me {
            username
            email
        }
    }
`;

const coursesDetailQuery = gql`
    query coursesDetailQuery($id: ID, $coursename: String) {
        course(id: $id, coursename: $coursename) {
            _id
            coursename
            tags
            topic
            skills
            cost
            checkoutCost
            about
            approxTimeToComplete
        }
    }
`;

function CourseDetails(props) {
    return (
        <Query query={coursesDetailQuery} variables={{ id: props.courseId }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return `Error!: ${error}`;

                return (
                    <Mutation mutation={buyCourseMutation}>
                        {mutate => {
                            async function checkOut(token) {
                                const response = await mutate({
                                    variables: {
                                        source: token.id,
                                        courseId: data.course._id
                                    }
                                });
                                if (response) {
                                    navigate('/dashboard/mycourses');
                                }
                                //check if response data is null
                                //if not redirect to mycourses
                            }

                            let userToken = localStorage.getItem('token');

                            return (
                                <>
                                    <HeaderSection
                                        heading={{
                                            firstLetter:
                                                data.course.coursename[0],
                                            remainingLetters: data.course.coursename.slice(
                                                1
                                            )
                                        }}
                                        buttonContent="Get Started"
                                        content={data.course.about}
                                        path="/signup"
                                    />
                                    <h5>
                                        <span>T</span>opic
                                    </h5>
                                    <div>{data.course.topic}</div>
                                    <hr />
                                    <h5>
                                        <span>S</span>kills
                                    </h5>
                                    <div>
                                        {data.course.skills.map(
                                            (skill, index) => (
                                                <p key={index}>{skill}</p>
                                            )
                                        )}
                                    </div>
                                    <div
                                        css={css`
                                            width: 100%;
                                        `}
                                    >
                                        <hr />
                                        <h5>
                                            <span>T</span>ags
                                        </h5>
                                        <div>
                                            {data.course.tags.map(
                                                (skill, index) => (
                                                    <p key={index}>{skill}</p>
                                                )
                                            )}
                                        </div>
                                        <hr />
                                        <h5>
                                            {data.course.approxTimeToComplete}{' '}
                                            Weeks course
                                        </h5>
                                        <hr />
                                        <h5>
                                            <span>C</span>ost
                                        </h5>
                                        <h6
                                            css={css`
                                                text-decoration: line-through;
                                            `}
                                        >
                                            {data.course.cost}Rs
                                        </h6>
                                        <h6>{data.course.checkoutCost}Rs</h6>
                                        <br />
                                        <div id="purchaseBtn">
                                            {userToken ? (
                                                <Query query={MeQuery}>
                                                    {({
                                                        loading,
                                                        error,
                                                        data: meData
                                                    }) => {
                                                        if (loading)
                                                            return (
                                                                <p>Loading</p>
                                                            );
                                                        if (error)
                                                            return `Error!: ${error}`;

                                                        return (
                                                            <StripeCheckout
                                                                name={`AIOC - ${data.course.coursename}`}
                                                                token={token =>
                                                                    checkOut(
                                                                        token
                                                                    )
                                                                }
                                                                email={
                                                                    meData.me
                                                                        .email
                                                                }
                                                                stripeKey="pk_test_Y4CTAMWcBzkL7k1RhmwQe3oR00mfb0n96g"
                                                            >
                                                                <button>
                                                                    Buy this
                                                                    course
                                                                </button>
                                                            </StripeCheckout>
                                                        );
                                                    }}
                                                </Query>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        navigate('/login', {
                                                            state: {
                                                                error:
                                                                    'Please Login before purchasing the course '
                                                            }
                                                        })
                                                    }
                                                >
                                                    Buy this course
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
}
// label="Buy this course"

export default CourseDetails;
