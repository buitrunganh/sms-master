const express = require('express');
const router = express.Router();

router.route('/').get((req,res) => {
    console.log("deault routing!!!");
    res.send("Hello World!");
});

module.exports = router;

