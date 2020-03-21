import React, { useContext } from 'react';
import HeaderSection from '../components/HeaderSection.js';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ThemeContext } from '../context/themeContext.js';
import { Link } from '@reach/router';

//    query CourseQuery(){
const coursesQuery = gql`
    {
        courses {
            _id
            coursename
            tags
            topic
        }
    }
`;
// }

function Courses() {
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
            <h1>
                <span>Courses</span> offered
            </h1>
            <div
                css={css`
                    width: 100%;
                `}
            >
                <Query query={coursesQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading</p>;
                        if (error) return `Error!: ${error}`;
                        return (
                            <div
                                css={css`
                                    width: 68%;
                                    display: flex;
                                    flex-wrap: wrap;
                                    justify-content: space-around;
                                    margin: auto;
                                    padding: 2rem 0.5rem;
                                `}
                            >
                                {data.courses.map(course => (
                                    <Link
                                        to={`/courses/${course._id}`}
                                        key={course._id}
                                    >
                                        <div
                                            key={course._id}
                                            css={css`
                                                padding: 1rem 2rem;
                                                margin: 0.5rem;

                                                border: none;
                                                border-radius: 8px;
                                                box-shadow: 0 0.5rem 0.5rem
                                                    rgba(0, 0, 0, 0.3);
                                                background: ${themeColors.secondaryBgColor};
                                            `}
                                        >
                                            <h5>
                                                {course.coursename}
                                                <span>.</span>
                                            </h5>
                                            <p
                                                css={css`
                                                    color: #eee;
                                                    font-weight: bold;
                                                    margin: 0;
                                                `}
                                            >
                                                {course.topic}
                                            </p>
                                            <div
                                                css={css`
                                                    display: flex;
                                                    margin: 1rem 0;
                                                    justify-content: flex-start;
                                                    p {
                                                        padding: 0.6rem;
                                                        background: ${themeColors.primaryBgColor};
                                                        margin-right: 0.4rem;
                                                        border-radius: 25px;
                                                    }
                                                `}
                                            >
                                                {course.tags.map(tag => (
                                                    <p key={tag}>{tag}&nbsp;</p>
                                                ))}
                                            </div>
                                            <span>&rarr;</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        );
                    }}
                </Query>
            </div>
        </>
    );
}

export default Courses;
