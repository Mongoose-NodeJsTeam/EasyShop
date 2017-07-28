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
                    return Promise.reject('Invalid user');
                }

                if (user.password !== password) {
                    return Promise.reject('Invalid password');
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
    addBuyersBasketToUser(user, basket) {
        if (user.BuyersBaskets) {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $push: {
                    BuyersBaskets: basket
                }
            });
        } else {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $set: {
                    BuyersBaskets: [basket]
                }
            });
        }
    }
    addBasketToUser(user, basket) {
        if (user.baskets) {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $push: {
                    baskets: basket
                }
            });
        } else {
            return this.collection.updateOne({
                _id: new ObjectID(user._id)
            }, {
                $set: {
                    baskets: [basket]
                }
            });
        }
    }
}

module.exports = UsersData;