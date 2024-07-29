const { response } = require("express");

const search = async(req, res = response) => {

    const { collection, terminus } = req.body;

    res.status(200).json({
        collection,
        terminus
    });
};

module.exports = {
    search
}