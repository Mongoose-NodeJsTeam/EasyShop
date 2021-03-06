const ModelsValidator = require('../app/utils/models-validator');

class User {
    static validator(model) {
        if (ModelsValidator._validateString(
                model.username, 2, 15, /^[a-zA-Z0-9_\\.]+$/) &&
            ModelsValidator._validateEmail(
                model.email) &&
            ModelsValidator._validateString(
                model.address, 10, 60, /^[a-zA-z\d\s\\.\-]+$/) &&
            ModelsValidator._validatePassword(
                model.password)) {
            return true;
        }

        return false;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = User;
