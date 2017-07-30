const ModelsValidator = require('../app/utils/models-validator');

class Tripshop {
    static validator(model) {
        if (ModelsValidator._validateDatetimeTrip(model)) {
            return true;
        }

        return false;
    }


    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Tripshop();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Tripshop;
