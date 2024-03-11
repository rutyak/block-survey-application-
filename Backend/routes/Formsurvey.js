const express = require('express');
const { forms } = require('../model/forms');
const router = express.Router();

router.post('/formsurvey',async (req, res)=>{

   try {
      const {type, formsurvey} = req.body;
      
      const newForm = new forms({
         type,
         formsurvey
      })
   
      await newForm.save();
      res.status(200).json({ data: newForm})
   } 
   catch (error) {
      console.log(error)
   }
 })
 
//  router.put('/updateForm/:id',async (req, res)=>{
//    try {
//       const id = req.params.id;
   
//       const updatedForm = await forms.findByIdAndUpdate(
//          {_id: id},
//          {$set: req.body},
//          {new: true}
//       );
     
//       if(!updatedForm){
//         res.status(404).json({error: 'Not Published'})
//       }
 
//       res.status(200).json(updatedForm);
 
 
//    } catch (error) {
//       console.log(error);
//    }
//  })
 
 module.exports = router