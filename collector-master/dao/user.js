const db = require('../db/db');
const reminder = require('./reminder');

// making this as async operation
// returning 'id' of table 'user' aka Primary key
// specify the 'id' only

class UserDAO {
    async createUserProfile(firstName, lastName, phoneNumber, birthDay, address) {
        const [id] = await db('user').insert({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            birthday: birthDay,
            address: address
        }).returning('id');

        return id;
    }

}

module.exports = new UserDAO();