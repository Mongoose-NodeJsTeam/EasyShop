module.exports = function() {
    return {
        loadMap(req, res) {
            res.status(200).render('mapPage');
        }
    };
};