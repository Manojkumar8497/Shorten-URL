const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../model/url');

// Generate the shorten url
exports.createShorten = async (req, res, next) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url')
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check the longurl
    if (validUrl.isUri(longUrl)) {
        try {
            // If url found
            let url = await Url.findOne({longUrl:longUrl});
            if (url) {
                return res.status(200).json(url);
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                await url.save();
                return res.status(200).json(url)
            }
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json('Server error');
        }
    }
    else {
        return res.status(401).json('Invalid url')
    }
}