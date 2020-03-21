import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const buyCourseMutation = gql`
    mutation BuyCourseMutation(
        $source: String!
        $coursename: String
        $usermail: String
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
                                    courseId: '5e75b54b1556491a6c364df6'
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
