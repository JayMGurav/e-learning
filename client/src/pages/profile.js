import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const MeQuery = gql`
    query {
        me {
            username
            email
        }
    }
`;

function Profile() {
    return (
        <Query query={MeQuery}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return `Error!: ${error}`;

                return (
                    <>
                        <h1>
                            <span>P</span>rofile
                        </h1>
                        <h6>Email : {data.me.email}</h6>
                        <h6>Username : {data.me.username}</h6>
                    </>
                );
            }}
        </Query>
    );
}

export default Profile;
