const express = require('express');
const { getAllDivisions, createDivision, updateDivision, deleteDivision } = require('../controllers/division.controller'); 
const router = express.Router(); 

// endpoint 
router.get('/divisions', getAllDivisions);
router.post('/divisions', createDivision);
router.put('/divisions/:id', updateDivision);
router.delete('/divisions/:id', deleteDivision);

module.exports = router;
