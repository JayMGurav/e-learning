// var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var { AuthenticationError } = require('apollo-server-express');
var { stripe } = require('../../stripe.js');

require('dotenv').config();

module.exports = {
    //Sign In mutation

    signUp: async (_, { username, email, password }, { models }) => {
        //hash the password before creating user
        let hashedPassword = await bcrypt.hash(password, 10);
        try {
            //check if there already exist a user with the mail
            let finduser = await models.User.find({ email });
            if (finduser.length != 0) {
                throw new AuthenticationError(
                    'Error Signing up the user : User already exist'
                );
            } else {
                let user = await models.User.create({
                    username,
                    email,
                    password: hashedPassword
                });
                let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                if (token) return true;
                return false;
            }
        } catch (err) {
            console.error('Error signing up user : ', err);
        }
    },

    //Sign In mutation
    signIn: async (_, { email, password }, { models, res }) => {
        //trim the spaces and convert email to lowercase before finding
        email = email.trim().toLowerCase();

        let user = await models.User.findOne({ email }).exec();
        if (!user) {
            throw new AuthenticationError(
                'Error signing in : Not a registered user'
            );
        }
        //compare the user entered password with the saved password from the DB
        let validPassword = bcrypt.compare(password, user.password);
        //if not valid throw auth error with wrong password
        if (!validPassword) {
            throw new AuthenticationError('Error Signing in : Wrong password');
        }
        //if a valid user return token;

        //set token as cookie to expire for a 10 days
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return token;
    },
    updateMe: async (_, { input }, { models, user }) => {
        if (user) {
            try {
                let validUser = await models.User.findOne({
                    _id: user.id
                }).exec();
                if (validUser) {
                    let updatedData = await models.User.findByIdAndUpdate(
                        user.id,
                        {
                            $set: input
                        },
                        { new: true }
                    );
                    return updatedData;
                } else {
                    throw new AuthenticationError(
                        'Error updating user data: Not a valid user'
                    );
                }
            } catch (err) {
                console.error('Error during updation : ', err);
            }
        } else {
            throw new AuthenticationError(
                'Error updating user data: Not signed in'
            );
            // return false;
        }
    },
    buyCourse: async (_, { source, courseId }, { models, user }) => {
        //adds course id to the user document
        // add the transaction details to the transaction details document
        // if (!user) {
        //     throw new Error('User not authenticated');
        // }
        try {
            let user = await models.User.findOne({
                _id: '5e74ef2329ed7243945cea94'
            });
            if (!user) {
                throw new Error('User not found');
            }
            let course = await models.Course.findOne({ _id: courseId }).exec();
            console.log(course);
            console.log(course._doc);
            const customer = await stripe.customers.create({
                email: 'c@c.com',
                source
            });

            const charge = await stripe.charges.create({
                amount: course.checkoutCost.toString().parseInt(),
                description: `charged of the course : ${course.coursename}`,
                currency: 'inr',
                customer: customer.id
            });
            console.log(charge);
            if (charge) {
                console.log(charge);
                user.stripeID = customer.id;
                user.coursesBought.push(courseId);
                user.save();
            }

            return user;
        } catch (err) {
            console.error(err);
        }
    }
};
