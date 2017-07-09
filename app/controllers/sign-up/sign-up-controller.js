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
            //promise+validation
            const item = req.body;

            proUser.proUsers.createProUser(item.username, item.password);

            //navigation to logged in proUser
            res.redirect('/auth/sign-in-proUser');
        },
        signUpNewRegularUser(req, res){
            //promise+validation
            const item = req.body;
            regularUser.regularUsers.createRegularUser(item.username, item.password, item.adress, item.email);

            res.redirect('/auth/sign-in-regularUser');
        }

    };
};