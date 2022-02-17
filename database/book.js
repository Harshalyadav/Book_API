const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
   ISBN :{
       type : String,
       required : true,
    

   },
   title :{
       type : String,
       required : true,
       
   },
    authors :[Number],
    language : String,
    pubDate : String,
    numOfPage: Number,
    category : [String] ,
    publication: Number,

});

const bookModel = mongoose.model('books',BookSchema);

module.exports = bookModel;