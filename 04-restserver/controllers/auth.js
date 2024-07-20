const { response } = require('express');

const login = (req, res = response) => {


    res.json({
        msg: 'Holi'
    });
};



module.exports = {
    login
};
