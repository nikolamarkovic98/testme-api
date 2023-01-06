const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { getPassedTests, getTests } = require("./helpers");

const User = require("../../models/User");

module.exports = {
    login: async ({ username, password }) => {
        try {
            // get user
            const user = await User.findOne({ username });
            if (!user) {
                return {
                    msg: "User doesnt exist",
                };
            }

            // compare password from db with input password
            const correctPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!correctPassword) {
                return {
                    msg: "Wrong credentials",
                };
            }

            // generate new token
            const generatedToken = await jwt.sign(
                { userId: user.id },
                "mysecretkey",
                { expiresIn: "2h" }
            );

            // send message
            return {
                username: user.username,
                token: generatedToken,
                userId: user.id,
                tokenExpiration: 2,
                msg: "Success!",
            };
        } catch (err) {
            console.log(err);
        }
    },
    createUser: async (args) => {
        try {
            const userUsername = await User.findOne({
                username: args.userInput.username,
            });
            if (userUsername) {
                return {
                    msg: "Username already taken",
                };
            }

            const userEmail = await User.findOne({
                email: args.userInput.email,
            });
            if (userEmail) {
                return {
                    msg: "Email already taken",
                };
            }

            const hashedPassword = await bcrypt.hash(
                args.userInput.password,
                12
            );
            const newUser = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                username: args.userInput.username,
                password: hashedPassword,
                createdTests: [],
                passedTests: [],
            });
            const savedUser = await newUser.save();
            return {
                ...savedUser._doc,
                _id: savedUser.id,
                password: "",
                msg: "User created!",
            };
        } catch (err) {
            console.log(err);
        }
    },
    user: async ({ username }) => {
        try {
            const _user = await User.findOne({ username: username });
            if (!_user) {
                return {
                    msg: "User does not exist",
                };
            }

            let passedTests = [];
            if (_user.passedTests.length !== 0)
                passedTests = await getPassedTests(_user.passedTests);

            return {
                ..._user._doc,
                _id: _user.id,
                password: "",
                createdTests: getTests.bind(this, _user.createdTests),
                passedTests: passedTests,
                msg: "Success",
            };
        } catch (err) {
            return {
                msg: "Server error!",
            };
        }
    },
    sendEmail: async ({ from, subject, text }) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "saraorci123@gmail.com",
                pass: "pasteta123",
            },
        });

        const mailOptions = {
            from: from,
            to: "nikola9988markovic@gmail.com",
            subject: subject,
            text: `From: ${from}\n\n${text}`,
        };

        return await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, res) => {
                resolve(err ? "Fail" : "Success");
            });
        });
    },
};
