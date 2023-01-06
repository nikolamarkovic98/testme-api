const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Question{
        _id: String
        question: String
        answer: String
        A: String
        B: String
        C: String
        D: String
    }    

    input QuestionInput{
        question: String!
        answer: String!
        A: String!
        B: String!
        C: String!
        D: String!
    }

    type Test{
        _id: ID
        title: String
        desc: String
        questions: [Question]
        resources: String
        creator: User
        createdAt: String   
        msg: String
    }

    input TestInput{
        title: String!
        desc: String!
        questions: String!
        resources: String
    }

    type PassedTest{
        _id: ID
        title: String
        desc: String
        questions: [Question]
        resources: String
        grade: String
        score: Int
        minutes: String
        seconds: String
        creator: User
        createdAt: String   
        msg: String
    }

    type User{
        _id: ID
        firstName: String
        lastName: String
        username: String
        password: String
        createdTests: [Test]
        passedTests: [PassedTest]
        msg: String
    }

    input UserInput{
        firstName: String!
        lastName: String!
        email: String!
        username: String!
        password: String!
    }

    type AuthData{
        username: String
        token: String
        userId: String
        tokenExpiration: Int
        msg: String
    }

    type SearchData{
        users: [User]
        tests: [Test]
        msg: String
    }

    type RootMutation{
        createUser(userInput: UserInput): User!
        createTest(testInput: TestInput): Test!
        removeTest(_id: ID): String!
        rateTest(test: String!, minutes: String!, seconds: String!): String!
    }

    type RootQuery{
        tests: [Test]
        test(_id: ID): Test
        login(username: String!, password: String!): AuthData!
        user(username: String!): User!
        search(search: String!): SearchData!
        sendEmail(from: String!, subject: String!, text: String!): String!
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
