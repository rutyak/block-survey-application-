const express = require('express');
const { forms } = require('../model/forms');
const router =  express.Router();

router.get('/formData', async(req, res)=>{

    try {
        const formData = await forms.find();
        res.status(200).json({data: formData});
    } 
    catch (error) {
        res.status(404).send("Invalid");
        console.log(error);
    }
})

module.exports = router