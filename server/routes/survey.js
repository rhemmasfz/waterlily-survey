const express = require('express');
const router = express.Router();
const db = require('../db/database');

/* GET Survey. */
router.get('/:id', async function(req, res, next) {
    try {
        const surveys = await db.query('SELECT * FROM survey WHERE survey_id = ?', [Number(req.params.id)]);

        let result;
        if (surveys.length === 0 || !surveys) {
            result = {
                title: 'Test Survey',
                subtitle: 'Test Subtitle',
                questions: ['What is your name?', 'What is your favorite color?', 'What is the air speed velocity of a laden swallow?']
            };
            await db.execute('INSERT INTO survey (title, subtitle, question) VALUES (?, ?, ?)', [result.title, result.subtitle, JSON.stringify(result.questions)]);
        } else {
            result = surveys[0];
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving survey', error: error.message});
    }
});

//body --> userid and answers
router.post('/:survey_id/answer', async (req, res) =>
    {
        const {survey_id, answers, user_id} = {survey_id: req.params.survey_id, answers: req.body.answers, user_id: req.body.user_id };

        if(survey_id  && user_id){
            await db.execute('INSERT INTO answers (survey_id, user_id, answers) VALUES (?, ?, ?)', [survey_id, user_id, JSON.stringify(answers)]);

        }


    }
)

module.exports = router;
