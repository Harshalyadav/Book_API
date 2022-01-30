const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
   ISBN :{
       type : String,
       required : true,
       minLength : 8,
       maxLength : 10,

   },
   title :{
       type : String,
       required : true,
       minLength :8,
       maxLength :20,
   },
    authors :[Number],
    language : String,
    pubDate : String,
    numOfPage: Number,
    category : [String] ,
    publication: Number,

});

const bookModel = mongoose.model('books',BookSchema);

module.exports =bookModel;