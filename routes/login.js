const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render('login', { title: 'login page' });
  
  });

module.exports = router;
