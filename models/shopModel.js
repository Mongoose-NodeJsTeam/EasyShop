const ModelsValidator = require('../app/utils/models-validator');

class Shop {
    static validator(model) {
        if (ModelsValidator._validateString(
                model.name, 1, 20, /^[a-zA-Z0-9_\\.]+$/) &&
            ModelsValidator._validateString(
                model.address, 10, 60, /^[a-zA-z\d\s\\.\-]+$/) &&
            ModelsValidator._validateEmail(
                model.email) &&
            ModelsValidator._validateMobile(
                model.mobile) &&
            ModelsValidator._validateString(
                model.description, 10, 40, /[a-zA-Z0-9_\\.]/)) {
            return true;
        }

        return false;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Shop();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Shop;