const mongoose = require('mongoose');

const formAnsSchema = mongoose.Schema({
    name: String,
    title: String,
    answer: [{
        que: String,
        ans: mongoose.Schema.Types.Mixed  
    }]
});

let formAns = mongoose.model("formAns", formAnsSchema);

module.exports = { formAns };
