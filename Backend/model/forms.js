const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true, 
    },
    formsurvey: {
        title: {
            type: String,
            required: true, 
        },
        desc: String, 
        questions: [{
            id: {
                type: Number,
                required: true, 
            },
            type: {
                type: String,
                required: true, 
            },
            questions: {
                type: String,
                required: true, 
            },
            options: [{
                id: Number,              
                text: String,   
            }]
        }]
    }
});

let forms = mongoose.model('forms', formSchema);

module.exports = { forms };
