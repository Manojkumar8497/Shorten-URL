const router = require('express').Router();
const Url = require('../model/url');

// Redirect to longUrl
router.get('/:code', async (req, res, next) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('Url not found');
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');
    }
})

module.exports = router;