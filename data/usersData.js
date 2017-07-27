const BaseData = require('./baseData');
const User = require('../models/userModel');
const ObjectID = require('mongodb').ObjectID;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    findByUsername(username) {
        return this.filterBy({
            username: new RegExp(username, 'i')
        })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }

    checkIfEmailAlreadyExists(email) {
        const props = { email: email };

        return this.collection.findOne(props)
            .then((user) => {
                if (user) {
                    throw new Error('Email already exists!');
                }

                return true;
            });
    }

    assignTripshoptoUser(user, tripshop) {
        if (user.tripshops) {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $push: {
                    tripshops: tripshop
                }
            });
        } else {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $set: {
                    tripshops: [tripshop]
                }
            });
        }
    }
}

module.exports = UsersData;