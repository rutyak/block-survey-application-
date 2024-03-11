const express = require('express');
const { formAns } = require('../model/formAns');
const router = express.Router();

router.post('/formAns', async (req, res) => {

    try {
        const { name, title, answer} = req.body

        const newData = new formAns({
            name,
            title,
            answer
        })

        await newData.save();
        res.status(200).json({ message: "Response recorded !!", data: newData })

    } catch (error) {
         console.log(error);
    }
})

router.get('/formAnsData',async(req,res)=>{

    try {
        const formData = await formAns.find();
        res.status(200).json({data: formData})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
