const authResolvers = require('./authResolver');
const testResolvers = require('./testResolver');

const Test = require('../../models/Test');
const User = require('../../models/User');

module.exports = {
    ...authResolvers,
    ...testResolvers,
    search: async args => {
        const _tests = await Test.find();
        
        let tests = [];
        tests = await new Promise((resolve, reject) => {
            _tests.forEach((test, index) => {
                if(test.title.toLowerCase().includes(args.search.toLowerCase()))
                    tests.push(test);
                if(_tests.length-1 == index)
                    resolve(tests);
            });
        });

        const _users = await User.find();
        
        let users = [];
        users = await new Promise((resolve, reject) => {
            _users.forEach((user, index) => {
                if(user.username.toLowerCase().includes(args.search.toLowerCase()))
                    users.push(user);
                if(_users.length-1 == index)
                    resolve(users);
            });
        });

        // if no match - return this
        if(users.length == 0 && tests.length == 0)
            return {
                users: users,
                tests: tests,
                msg: 'Empty'
            }

        return {
            users: users,
            tests: tests,
            msg: 'Success'
        }
    }
}