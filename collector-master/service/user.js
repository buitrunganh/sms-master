const UserDAO = require('../dao/user');

class UserService {
    createUser(userDto){
        const { firstName, lastName, phoneNumber, birthDay, address } = userDto;
        return UserDAO.createUserProfile(firstName, lastName, phoneNumber, birthDay, address);
    }
}

module.exports = new UserService();