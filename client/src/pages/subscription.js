import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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

function SubscriptionPage() {
    return (
        <>
            <Mutation mutation={buyCourseMutation}>
                {mutate => (
                    <StripeCheckout
                        token={async token => {
                            const response = await mutate({
                                variables: {
                                    source: token.id,
                                    courseId: '5e771068257a142d0401273a'
                                }
                            });
                            console.log(response);
                        }}
                        stripeKey="pk_test_Y4CTAMWcBzkL7k1RhmwQe3oR00mfb0n96g"
                    />
                )}
            </Mutation>
        </>
    );
}

export default SubscriptionPage;
