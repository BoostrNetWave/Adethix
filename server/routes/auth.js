const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// signup route
// router.post("/signup", async (req, res) => {
//     try {
//         // validating email, username and password using joi
//         const {error} = validate(req.body);
//         // console.log(error);
//         if(error) 
//             return res.status(400).send({message: error.details[0].message});

//         // finding if any user with the email already exist or not 
//         let user = await User.findOne({email: req.body.email});
//         if(user){
//             return res.status(409).send({message: "User with given email already exist"});
//         }

//         // finding if any user with the username already exist or not
//         user = await User.findOne({username: req.body.username});
//         if(user){
//             return res.status(409).send({message: "User with given username already exist"});
//         }

//         // creating new user and generating token
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         const newUser = await new User({...req.body, password: hashedPassword}).save();
//         const token = newUser.generateAuthToken();
//         // console.log(token);
//         return res.status(201).send({message: "New user created successfully", token: token});
//     } catch (error) {
//         return res.status(500).send({ message: "Internal server error" });
//     }
// })

// login route - with email and password
router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);

        const { error } = validateLoginData(req.body);
        // console.log(error);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        // console.log(!user);
        if (!user) return res.status(400).send({message: 'Invalid email or password.'});
        if (!user.password) return res.status(400).send({message: 'Invalid email or password.'});

        // ----------- checking password match or not ----------- 
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        // console.log(validPassword);
        if (!validPassword) return res.status(400).send({message: 'Invalid email or password.'});

        // after successfull login creating jwt token
        const token = user.generateAuthToken();
        // console.log(token);
        return res.status(200).send({ message: "Logged in successfully", token: token });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error" });
    }
})

// validating data
const validateLoginData = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("email"),
        password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
}

module.exports = router;