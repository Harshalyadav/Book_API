const express =require('express');
const database =require('./database');

const booky=express();


/*
  Route         /all books
  Description   get all books
  Access        public 
  parameter     none
  Method        GET

*/
booky.get('/',(req,res)=>{
    
   return res.json({books : database.books});

});

/* 
Route         /:isbn
Description   get specific book
Parameter      :isbn
Access        public 
Method        get

*/


booky.get("/:isbn",(req,res)=>
{
    const getSpecificBook= database.books.filter(
      (book)=>
     
        book.ISBN === req.params.isbn
      );
      

      if(getSpecificBook.length === 0){
          return res.json({
              error:`no book found for the ISBN of ${req.params.isbn}`
            });
      };

       return res.json({book : getSpecificBook});
});

booky.get("/:author",(req, res)=>{
  const getAuthor = database.books.filter()
});


booky.listen(3000, ()=>{
    console.log("Server is running 🚀")
});