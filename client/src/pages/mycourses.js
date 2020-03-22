import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { css } from '@emotion/core';

const MeCourseQuery = gql`
    query {
        me {
            coursesBought {
                _id
                coursename
                topic
                about
            }
        }
    }
`;

function MyCourses() {
    return (
        <Query query={MeCourseQuery}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return `Error!: ${error}`;
                return (
                    <div
                        css={css`
                            width: 100%;
                            height: 100%;
                            display: inline-flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                        `}
                    >
                        {data.me.coursesBought.map(course => (
                            <div
                                key={course._id}
                                css={css`
                                    padding: 1rem 2rem;
                                    margin: 0.5rem;
                                    border: none;
                                    border-radius: 8px;
                                    box-shadow: 0 0.5rem 0.5rem
                                        rgba(0, 0, 0, 0.3);
                                    background: #121212;

                                    h1 {
                                        font-size: 2.8rem;
                                        margin: 0;
                                    }
                                    h6 {
                                        margin: 0;
                                        font-size: 1.2rem;
                                    }
                                    p {
                                        max-width: 20rem;
                                        padding: 0.2rem 0;
                                        margin: 1rem 0;
                                    }
                                `}
                            >
                                <h1>
                                    <span>{course.coursename[0]}</span>
                                    {course.coursename.slice(1)}
                                    <span>.</span>
                                </h1>
                                <h6>{course.topic}</h6>

                                <p>{course.about}</p>
                            </div>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
}

export default MyCourses;
