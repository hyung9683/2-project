const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');






router.get('/quizList', (req, res) => {

    db.query(sql.quiz_All, (error , results, fields) => {

        if (error) {

            return res.status(500).json({ message: '실행 실패', error});
        }

        return res.status(200).json({ message: 'success'});
    });

});


module.exports = router;