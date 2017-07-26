const ModelsValidator = require('../app/utils/models-validator');

class Product {
    static validator(model) {
        if (ModelsValidator._validateString(
                model.name, 1, 20, /[a-zA-Z]/) &&
            ModelsValidator._validatePrice(model.price) &&
            ModelsValidator._validateWeight((model.weight))) {
            return true;
        }

        return false;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Product();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Product;