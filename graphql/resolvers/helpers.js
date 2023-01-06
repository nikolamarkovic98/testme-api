const User = require("../../models/User");
const Test = require("../../models/Test");

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            password: "",
            createdTests: getTests.bind(this, user.createdTests),
        };
    } catch (err) {
        console.log(err);
    }
};

const getTests = async (testIds) => {
    try {
        const tests = await Test.find({ _id: { $in: testIds } });
        return tests.map((test) => {
            return {
                ...test._doc,
                _id: test.id,
                creator: getUser.bind(this, test.creator),
                createdAt: new Date(test.createdAt).toISOString(),
            };
        });
    } catch (err) {
        console.log(err);
    }
};

// I had to use new Promise because I have forEach... What happened is program didn't wait for forEach to finish, it just continued
// to execute code, and what happened is I would always have empty array. This way we create Promise which makes sure that program
// waits for this function to finish or return something. We return when the index is at the last element of array - beautiful
const getPassedTests = (_passedTests) => {
    return new Promise((resolve, reject) => {
        let passedTests = [];
        _passedTests.forEach(async (passedTest, index, array) => {
            const test = await Test.findById(passedTest._id);
            passedTests.push({
                ...test._doc,
                _id: test.id,
                grade: passedTest.grade,
                score: passedTest.score,
                minutes: passedTest.minutes,
                seconds: passedTest.seconds,
                creator: getUser.bind(this, test.creator),
                createdAt: new Date(test.createdAt).toISOString(),
            });
            if (index == array.length - 1) {
                resolve(passedTests);
            }
        });
    });
};

const removePassedTests = async (usersThatPassedTest, testId) => {
    let err = "";
    // looping through usersThatPassedTest array with userIds > fetching user with userId > looping through passedTests
    // > removing the passedTest because the test doesnt exist anymore
    return new Promise((resolve, reject) => {
        if (!usersThatPassedTest.length) resolve();
        usersThatPassedTest.forEach(async (userId, index, arr) => {
            try {
                const _user = await User.findById(userId);
                for (let i = 0; i < _user.passedTests.length; i++) {
                    if (_user.passedTests[i]._id == testId) {
                        _user.passedTests.splice(i, 1);
                        await _user.save();
                        break;
                    }
                }
            } catch (err) {
                err = "Desila se neka greska";
            }
            if (index == arr.length - 1) {
                if (err == "") resolve("Success");
                else reject(err);
            }
        });
    });
};

const parseStr = (str) => {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "|") {
            newStr += '"';
            continue;
        }
        newStr += str[i];
    }
    return newStr;
};

const calculateGrade = (score) => {
    // for some reason switch didnt work and I spent way too much time on this thing
    if (score <= 59) return "F";
    if (score <= 66) return "D";
    if (score <= 69) return "D+";
    if (score <= 72) return "C-";
    if (score <= 76) return "C";
    if (score <= 79) return "C+";
    if (score <= 82) return "B-";
    if (score <= 86) return "B";
    if (score <= 89) return "B+";
    if (score <= 92) return "A-";
    if (score <= 97) return "A";
    if (score <= 100) return "A+";
};

const calculateScoreAndGrade = (passedQuestions, dbQuestions) => {
    let grade,
        score = 0;

    passedQuestions.forEach((passedQuestion) => {
        dbQuestions.forEach((dbQuestion) => {
            if (passedQuestion._id == dbQuestion.id.toString()) {
                if (passedQuestion.answer == dbQuestion.answer) {
                    score++;
                }
            }
        });
    });

    score = Number((score / dbQuestions.length) * 100);
    grade = calculateGrade(score);

    // percentage and grade
    return [score, grade];
};

module.exports = {
    getUser,
    getTests,
    getPassedTests,
    removePassedTests,
    parseStr,
    calculateScoreAndGrade,
};
