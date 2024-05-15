//bcrypt is used to hash the passwords
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // way to store the user in a browser for some period of time
import User from '../models/user.js';

//mongoose save is an instance methd of the model, while create is called directly from model, as method call

export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser)
            return res.status(404).json({ message: "User doesn't exist."});
        //else
        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials."});
        
        // if user exists and password is correct we can get its jwt and send it to frontend.
        const token = jwt.sign({ email : existingUser.email, id: existingUser._id }, 'test', { expiresIn : "1h"}); // we pass all the info that we want it to be stored in token
        // second argument is secret string that only we know, last is options obj here token expiry time duration

        res.status(200).json({ result : existingUser, token });

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

export const signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {

        // here alsow we are checking bcoz we dont want 2 users with same email id
        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ message : "User already exists. "});

        // check if password is same as confirmed password
        if( password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match."});

        // else create user
        const hashedPassword = await bcrypt.hash(password, 12); // 12 here is salt i.e. level of difficulty to hash

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn : "1h"});

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}