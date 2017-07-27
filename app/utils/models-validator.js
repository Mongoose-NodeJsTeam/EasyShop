class ModelsValidator {
    static _validateString(value, minLength, maxLength, stringRgxPattern) {
        if ( value ==! 'string') {
            return false;
        }

        if (value.length < minLength ||
            value.length > maxLength) {
            return false;
        }

        if (!stringRgxPattern.test(value)) {
            return false;
        }

        return true;
    }

    static _validateEmail(value) {
        const rexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

        if (!rexEmail.test(value)) {
            return false;
        }

        return true;
    }

    static _validateMobile(value) {
        const rgxMobile = /^0{1}[0-9]{9}$/;
        if (!rgxMobile.test(value)) {
            return false;
        }

        return true;
    }

    static _validatePrice(value) {
        const rgxPrice = /^\d{1,3}$/;

        if (!rgxPrice.test(value)) {
            return false;
        }

        if (+value <= 0 || +value >= 100) {
            return false;
        }

        return true;
    }

    static _validateWeight(value) {
        const rgxWeight = /^\d{1,4}$/;

        if (!rgxWeight.test(value)) {
            return false;
        }

        if (+value <= 0 || +value >= 1000) {
            return false;
        }

        return true;
    }

    static _validatePassword(value) {
        const rgxPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/;

        if (!rgxPass.test(value)) {
            return false;
        }

        return true;
    }
}

module.exports = ModelsValidator;