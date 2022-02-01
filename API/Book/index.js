const Router = require('express').Router();

const bookModel = require("../../database/book");
const authorModel = require("../../database/author");

const joi = require('joi');

/*
  Route         /all books
  Description   get all books
  Access        public 
  parameter     none
  Method        GET

*/

Router.get('/', async(req,res)=>{
    const allBook = await bookModel.find();
    return res.json(allBook);
 
 });
 
 /* 
 Route         /
 Description   get specific book
 Parameter      :isbn
 Access        public 
 Method        get
 
 */
 
 
 Router.get("/is/:isbn", async(req,res) =>
 {
     const getSpecificBook= await bookModel.findOne( 
      {
         ISBN : req.params.isbn
        }
       );
       
 
       if(!getSpecificBook){
           return res.json({
               error:`no book found for the ISBN of ${req.params.isbn}`
             });
       };
 
        return res.json({book : getSpecificBook});
 });
 
 
 /* 
     Route        /c
     Description  get book based on category.
     Parameter    category:
     Access       Public
     Method        get
  */

 Router.get("/c/:category", async(req, res) => {
   const getCategoryBook =await bookModel.findOne({
   category : req.params.category}
   )
 
   if(!getCategoryBook){
     return res.json({error:`No category match in ${req.params.category}`});
   }
   return res.json({book : getCategoryBook});
 });
 
 /* 
    Route         /l
    Description   get book based on language
    Parameter     /:language
    Access        public
    Method        get
 
 */
 
 Router.get("/l/:language", async(req,res)=>{
   const getLanguageBook = await bookModel.findOne(
     {
       language : req.params.language
    }
     );
    
     if(!getLanguageBook){
 
       return res.json({error:`No book based on ${req.params.language}`});
 
       return res.json({book : getLanguageBook})
     };
 
   });
   
 /* 
   Route         /price
   Description   get book based on price
   Parameter     /:p
   Method        get
   Access        public
 
 */
 
 Router.get("/price/:p", async(req,res)=>{
     const getAllPrice = await bookModel.findOne(
      {
        price : req.params.p
      }
     )
 
     if(!getAllPrice){
        return res.json({error:`No book found in this  price ${req.params.p}`})
     }
     return res.json({book : getAllPrice});
   });
 

//............ Post method............



   /*
  Route         /books/add
  Description   add new book
  Access        public
  Parameter     none
  Method        post
*/

Router.post("/add", async(req,res)=>{
    // console.log(req.body);
    const {addNewBook} = req.body;
    const schema = {
      name : joi.string().min(3).required()
    }
    const result =joi.validate(req.body.schema);

    const newBook = await bookModel.create(addNewBook);
    return res.json({newBook});
  
  });
  

//.........PUT method.................



/*
   Route        /book/update/title
   Description  update book title
   Access       public
   Parameter    /:isbn
   Methods        put

*/

Router.put("/update/:isbn", async(req,res)=>{
   const updateBook = await bookModel.findOneAndUpdate(
      {
        ISBN : req.params.isbn
          
        },
        {
          title : req.body.bookTitle
        },
        {
          new : true
        }
        );
  
  
      return res.json({updateBook});
  
  });
  
  /* 
     Route        /book/update/author
     Description  update/add new author for a book
     Access       public
     Parameter    /:isbn/:authorId
     Methods        put
  
  */
  
  
  //parameter and parameter
  
  
  
  Router.put("/update/author/:isbn/:authorId", async(req,res)=>{
  
  // update books author Database
  // add author in books db
  
   const updateBook = await bookModel.findOneAndUpdate(
     {
       ISBN : req.params.isbn
     },
       {
         $addToSet :{
             author : req.params.authorId
         }
         
       },
       {
         new : true
       }
       );
  
   //update author  books Database.
   // add book 📖 in authors db .
  const newAuthor = await authorModel.findOneAndUpdate(
     {
       id : parseInt(req.params.authorId)
       
     },
     {
       $addToSet :{
         books : req.params.isbn
       }
     },
     {
       new : true
     }
   )
  
  
   return res.json({newBook,newAuthor});
  
  });

  
//.........DELETE..........



/*
    Route         /book/delete
    Description   delete a book
    Parameter     isbn
    Access        public
    Method       put
*/
Router.delete("/delete/:isbn", async(req,res)=>{
    const updatedBookDatabase = await bookModel.findOneAndDelete(
    {
        ISBN : req.params.isbn
      }
      );
      
      return res.json({updatedBookDatabase});
  });
  
  
  
  /*
      Route         /book/delete/author
      Description   delete a author from a book/update
      Parameter     isbn,authorId
      Access        public
      Method        delete
  */
  Router.delete("/delete/author/:isbn/:authorId",async (req, res)=>
     {
    const bookUpdate = await bookModel.findOneAndUpdate(
         {
           ISBN : req.params.isbn
         },
           { 
             $pull : {
               author : PageTransitionEvent(req.params.authorId)
             }
             
         },{
           new : true,
         }
       );
  
  
       //update the author database
  
      const updateAuthor=await bookModel.findOneAndUpdate(
         {
            id : parseInt(req.params.authorId)
         },
            {  
              $pull : {
            books : req.params.isbn
                
          }
        },{
          new : true
        }
      );
  
      return res.json({bookUpdate ,updateAuthor});
  });

  module.exports = Router;
  
  
  