const { request } = require('express')
const mongoose = require('mongoose')
// const app = express()
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide an username."],
        unique: [true, "Username exist."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        unique: false
    }

})

// register endpoint
// app.post("/register", (request, response) => {
//     // hash the password
//     bcrypt
//       .hash(request.body.password, 10)
//       .then((hashedPassword) => {
//         // create a new user instance and collect the data
//         const user = new User({
//           username: request.body.username,
//           password: hashedPassword,
//         });
  
//         // save the new user
//         user
//           .save()
//           // return success if the new user is added to the database successfully
//           .then((result) => {
//             response.status(201).send({
//               message: "User Created Successfully",
//               result,
//             });
//           })
//           // catch error if the new user wasn't added successfully to the database
//           .catch((error) => {
//             response.status(500).send({
//               message: "Error creating user",
//               error,
//             });
//           });
//       })
//       // catch error if the password hash isn't successful
//       .catch((e) => {
//         response.status(500).send({
//           message: "Password was not hashed successfully",
//           e,
//         });
//       });
//   });

module.exports = mongoose.model('Users', userSchema)