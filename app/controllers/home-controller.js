module.exports = function() {
    return {
        loadHomePage(req, res) {
            res.status(200).render('homePage');
        }
    };
};