import React, { useContext } from 'react';
import HeaderSection from '../components/HeaderSection.js';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ThemeContext } from '../context/themeContext.js';

const coursesDetailQuery = gql`
    query coursesDetailQuery($id: ID, $coursename: String) {
        course(id: $id, coursename: $coursename) {
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
    const { themeColors } = useContext(ThemeContext);
    return (
        <Query query={coursesDetailQuery} variables={{ id: props.courseId }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return `Error!: ${error}`;
                console.log(data.course);
                return (
                    <>
                        <HeaderSection
                            heading={{
                                firstLetter: data.course.coursename[0],
                                remainingLetters: data.course.coursename.slice(
                                    1
                                )
                            }}
                            buttonContent="Purchase ths course"
                            content={data.course.about}
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
                            {data.course.skills.map((skill, index) => (
                                <p key={index}>{skill}</p>
                            ))}
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
                                {data.course.tags.map((skill, index) => (
                                    <p key={index}>{skill}</p>
                                ))}
                            </div>
                            <hr />
                            <h5>
                                {data.course.approxTimeToComplete} Weeks course
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
                            <button>Buy now</button>
                        </div>
                    </>
                );
            }}
        </Query>
    );
}

export default CourseDetails;
