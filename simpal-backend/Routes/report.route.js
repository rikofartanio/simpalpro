const express= require('express');
const { getAllReports, createReport, updateReportStatus, updateReport, deleteReport } = require('../controllers/report.controller');
const upload = require('../Middlewares/upload');
const verifyToken = require('../Middlewares/verifyToken');
const isAdmin = require('../Middlewares/isAdmin');


const router= express.Router();

// endpoint to get all reports
router.get('/reports', getAllReports);

// endpoint to post report image
router.post('/reports', upload.single('photo'), createReport);

// PATCH update status & notes (admin only)
router.patch('/reports/:id/status', verifyToken, isAdmin, updateReportStatus);


// PUT update report 
router.put('/reports/:id', upload.single('photo'), updateReport);

// DELETE report
router.delete('/reports/:id', deleteReport);

module.exports= router;