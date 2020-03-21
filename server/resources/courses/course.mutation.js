module.exports = {
    // igh
    addCourse: async (_, { input }, { models }) => {
        try {
            // console.log(input);
            let cost = parseFloat(input.cost);
            let checkOut = parseFloat(input.checkoutCost);

            let { _doc } = await models.Course.create({
                ...input,
                cost: cost,
                checkoutCost: checkOut
            });
            return {
                ..._doc,
                cost: _doc.cost.toString(),
                checkoutCost: _doc.checkoutCost.toString()
            };
        } catch (err) {
            console.error('Error occured while adding course : ', err);
        }
    }

    // addCourseSyllabus: async (_, { input }, { models }) => {
    //     try {
    //         // console.log(input);
    //         let course = await models.Course.findOne({
    //             $or: [{ id: input.id }, { coursename: input.coursename }]
    //         }).exec();
    //         if (course) {
    //             //update the course document to add the course syllabus
    //             console.log('Found Course :  ', course);
    //             return course;
    //         } else {
    //             let err = new Error('Course not found ');
    //             console.error('Error adding course syllabus : ', err);
    //         }

    //         console.log({ ..._doc, cost: _doc.cost.toString() });
    //         return { ..._doc, cost: _doc.cost.toString() };
    //     } catch (err) {
    //         console.error('Error occured while adding course : ', err);
    //     }
    // }
};
