const fs = require('fs');
const path = require('path');
const Report = require('../Models/report.model');
const Division = require('../Models/division.model');


// GET- All Reports
const getAllReports = async (req, res)=> {
    try {
        const reports = await Report.findAll ({
            include : [{
                model: Division,
                as: 'division' 
            }],
            order: [['createdAt','DESC']]
        });

        if (reports.length > 0) {
            res.status(200).json({
                success: true,
                data: reports,
                message: 'Reports retrieved successfully'
            });
        } else {
            res.status(404).json({
                data: [],
                message: 'No reports found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: [],
            message: 'Error retrieving reports',
            error: error.message
        });
    }
};

//POST - Create Report
const createReport = async (req, res)=> {
        try {
        const { reporterName, category, title, description, divisionId }= req.body;
        const photoUrl = req.file? req.file.path : null;

        
        const report = await Report.create({
            reporterName,
            category,
            title,
            description,
            divisionId,
            photoUrl
        });

        res.status(201).json({
            success:true,
            data: report,
            message: 'Report created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating report',
            error: error.message
        });   
    }
};

// Update Report Status
const updateReportStatus = async (req, res)=> {
    try {
        const { id }= req. params;
        const { status, notes }= req.body;

        const report= await Report.findByPk(id);
        if (!report){
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        report.status = status || report.status;
        report.notes = notes || report.notes;
        await report.save();

        res.status(200).json ({
            success: true, 
            data: report,
            message: 'Report status updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error updating report status',
            error: error.message
        });
        
    }
};

//PUT Update entire report (kecuali status & timestamps)
const updateReport =async (req, res) =>{
    try {
        const { id } = req.params;
        const {reporterName, category, title, description, divisionId} = req.body;
        const photoUrl = req.file? req.file.path: null;

        const report = await Report.findByPk(id);
        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }
        // jika ada foto baru dan report sebelumnya punya foto, hapus foto lama
         if (photoUrl && report.photoUrl) {
            fs.unlink(path.join(__dirname, '..', report.photoUrl), (err) => {
                if (err) console.error('Error deleting old photo:', err);
            });
        }

        // Update fields
        report.reporterName = reporterName || report.reporterName;
        report.category= category || report.category;
        report.title= title || report.title;
        report.description= description || report.description;
        report.divisionId= divisionId || report.divisionId;

        if (photoUrl) {
            report.photoUrl= photoUrl
        }

        await report.save();
        
        res.status(200).json({
            success: true,
            data: report,
            message: 'Report update successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Error updating report',
            error: error.message
        });
    }
}

// DELETE report from id 
const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByPk(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Delete file photo from uploads
        if (report.photoUrl) {
            const fs = require('fs');
            const path = require('path');
            fs.unlink(path.join(__dirname, '..',report.photoUrl),(err)=> {
                if (err) console.error('Error deleting image', err);
            });
        }

        await report.destroy();

        res.status(200).json({
            success: true,
            message: 'Report deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting report',
            error: error.message
        });
    }
}



module.exports = {getAllReports, createReport, updateReportStatus, updateReport, deleteReport};
