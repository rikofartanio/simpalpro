const Division = require ('../Models/division.model');

//get all devisions
const getAllDivisions = async (req, res)=> {
    try {
        const divisions = await Division.findAll();

        if (divisions.length > 0) {
            res.status (200).json({
                success: true,
                data: divisions,
                message: "Divisions fetched successfully"
            });
        } else {
            res.status(404).json ({
                success: false,
                message: "No divisions found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: [],
            message: "error fetching divisions"
        })
    }
}

// create a new devision
const createDivision = async (req, res)=> {
    try {
         const {name} = req.body; 
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Division name is required'
            });
        } 
        const newDivision = await Division.create({name});

        res. status(201).json({
            success:true,
            data: newDivision,
            message: "Division created successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create division'
        });
    }

};

// PUT - Update division
const updateDivision = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Division name is required for update',
            });
        }

        const division = await Division.findByPk(id);
        if (!division) {
            return res.status(404).json({
                success: false,
                message: 'Division not found',
            });
        }

        division.name = name;
        await division.save();

        res.status(200).json({
            success: true,
            data: division,
            message: 'Division updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update division',
        });
    }
};

// DELETE - Delete division
const deleteDivision = async (req, res) => {
    try {
        const { id } = req.params;

        const division = await Division.findByPk(id);
        if (!division) {
            return res.status(404).json({
                success: false,
                message: 'Division not found',
            });
        }

        await division.destroy();

        res.status(200).json({
            success: true,
            message: 'Division deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete division',
        });
    }
};


module.exports= {getAllDivisions, createDivision, updateDivision, deleteDivision};