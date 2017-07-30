const ObjectID = require('mongodb').ObjectID;
const passHasher = require('../app/utils/passHasher');

class BaseData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Model validation failed!');
        }

        if (model.password) {
            const hashedPass = passHasher.passHashing(model.password);
            model.password = hashedPass;
        }

        return this.collection.insertOne(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model.id
        }, model);
    }

    deleteById(id) {
        return this.collection.deleteOne({
            '_id': new ObjectID(id)
        });
    }

    _isModelValid(model) {
        return this.ModelClass.validator(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}


module.exports = BaseData;