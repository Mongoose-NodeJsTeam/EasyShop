module.exports = function () {
    return {
        loadProfilePage(req, res) {
            console.log(req.user);

            res.status(200)
                .render('profile', {
                    user: req.user
                });
        }
    };
};
