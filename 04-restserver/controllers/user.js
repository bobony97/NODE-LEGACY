const { response } = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
};

const putUsers = (req, res) => {
    res.json({
        msg: 'put API - controlador'
    });
};

const postUsers = (req, res) => {
    res.json({
        msg: 'post API - controlador'
    });
};

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}