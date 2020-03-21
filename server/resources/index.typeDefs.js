var { mergeTypes } = require('merge-graphql-schemas');
var userTypeDefs = require('./users/user.typeDefs.js');
var courseTypeDefs = require('./courses/course.typeDefs.js');
// var ratingTypeDefs = require('./rating/rating.typeDefs.js');
// var instructortypeDefs = require('./instructor/instructor.typeDefs.js');
// console.log('this is courseTypeDef', courseTypeDefs);
var typeArr = [
    userTypeDefs,
    courseTypeDefs
    // instructortypeDefs
    // ratingTypeDefs,
];

// var typeDefs = {
//     ...userTypeDefs
// };
// ...courseTypeDefs

// console.log('ths is in index.typeDefs => user', ...userTypeDefs);

var typeDefs = mergeTypes(typeArr);
module.exports = typeDefs;
