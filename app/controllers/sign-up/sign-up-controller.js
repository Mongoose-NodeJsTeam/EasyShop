const proUser = require('../../data/proUserData');
const regularUser = require('../../data/regularUserData');


module.exports = function () {
    return {
        loadSignUpOptions(req, res) {
            res.status(200).render('signUp/sign-up-options');
        },
        loadSignUpRegularUserForm(req, res){
            res.status(200).render('signUp/sign-up-regularUser');
        },
        loadSignUpProUserForm(req, res){
            res.status(200).render('signUp/sign-up-proUser');
        },
        signUpNewProUser(req, res){
            const modelProUser = req.body;

            proUser.proUsers.createProUser(
                modelProUser.username,
                modelProUser.password,
                modelProUser.email);

            res.redirect('/auth/sign-in-proUser');
        },
        signUpNewRegularUser(req, res){
            const modelRegularUser = req.body;

            regularUser.regularUsers.createRegularUser(
                modelRegularUser.username,
                modelRegularUser.password,
                modelRegularUser.adress,
                modelRegularUser.email);

            res.redirect('/auth/sign-in-regularUser');
        }

    };
};