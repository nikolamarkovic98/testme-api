# testMe
IT Bootcamp Final Project - testMe

http://nikola-markovic-testme.herokuapp.com/

testMe is platform where you can create your own tests that other people could try to solve.
It's purpose is to provide education by enabling users to create their own tests and by completing tests from other users.

I developed this application using NodeJS/GraphQL API with MongoDB on the backend and ReactJS on the frontend.

The core features of testMe platform are:
1. SignIn

2. SignUp

3. Creating tests

4. Passing tests

5. Your own profile with created tests and passed tests

6. Search functionality

# 1. SignUp
In order to create test, first thing you need to do is create an account. Required information is:

~ Firstname

~ Lastname

~ Email

~ Username

~ Password

# 2. SignIn
After creating an account, user can now SignIn with credentials only known to him. Required information is:

~ Username

~ Password

If the user provides correct credentials, he will get back JSON Web Token, which he will send back everytime he tries to access protected resources. This token is coded with secret key on server, and can only be decoded using that same key.

# 3. Creating tests
Users with created account are able to create tests. Tests consist of:

~ Title

~ Description

~ Resources (You can save URLs of websites that you found useful for a specific topic)
~ Questions


Questions further consist of:

~ Actual question

~ answer A

~ answer B

~ answer C

~ answer D

# 4. Passing tests
You can pass tests that you created or tests that other users created. After completing test, you can view results on your profile such as:

~ Score (Percent of correct answers)

~ Grade

~ Test complete duration

# 5. Profile
Each user have their own profile with lists of created tests and passed tests

# 6. Search
In the header of application, theres input that, when provided with value, gives you back tests and users that match the given input.

~ Users are filtered by username

~ Tests are filtered by title
