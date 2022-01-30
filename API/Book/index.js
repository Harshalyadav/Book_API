const Router = require('express').Router();

const bookModel = require("../../database/book");


/*
  Route         /all books
  Description   get all books
  Access        public 
  parameter     none
  Method        GET

*/

Router.get('/',(req,res)=>{
    
    return res.json({books : bookModel.books});
 
 });
 
 /* 
 Route         /
 Description   get specific book
 Parameter      :isbn
 Access        public 
 Method        get
 
 */
 
 
 Router.get("/is/:isbn", (req,res) =>
 {
     const getSpecificBook= bookModel.books.filter(
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
 
 
 /* 
     Route        /c
     Description  get book based on category.
     Parameter    category: string
     Access       Public
     Method        get
  */

 Router.get("/c/:category",(req, res) => {
   const getCategoryBook = bookModel.books.filter(
     (book) => book.category.includes(req.params.category)
   )
 
   if(getCategoryBook.length === 0){
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
 
 Router.get("/l/:language", (req,res)=>{
   const getLanguageBook = bookModel.books.filter(
     (book)=> book.language === req.params.language);
    
     if(getLanguageBook.length === 0){
 
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
 
 Router.get("/price/:p", (req,res)=>{
     const getAllPrice = bookModel.books.filter(
       (book)=> book.price === req.params.p
     )
 
     if(getAllPrice.length===0){
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

Router.post("/book/add",(req,res)=>{
    // console.log(req.body);
    const {addNewBook} = req.body;
    bookModel.books.push(addNewBook);
    return res.json({books: bookModel.books});
  
  });
  

//.........PUT method.................



/*
   Route        /book/update/title
   Description  update book title
   Access       public
   Parameter    /:isbn
   Methods        put

*/

Router.put("/book/update/title/:isbn",(req,res)=>{
    bookModel.books.forEach(
      (book)=>{
        if(book.ISBN === req.params.isbn){
          book.title = req.body.newBookTitle;
          return;
        }});
  
  
      return res.json({books : bookModel.books});
  
  });
  
  /* 
     Route        /book/update/author
     Description  update/add new author for a book
     Access       public
     Parameter    /:isbn/:authorId
     Methods        put
  
  */
  
  
  //parameter and parameter
  
  
  
  Router.put("/book/update/author/:isbn/:authorId",(req,res)=>{
  
  // update books author Database
  // add author in books db
  
   bookModel.books.forEach(
     (book)=>{
       if(book.ISBN === req.params.isbn)
       {
         return book.author.push(parseInt(req.params.authorId));
       }});
  
   //update author  books Database.
   // add book 📖 in authors db .
   bookModel.author.forEach(
     (author)=>{
       if(author.id === parseInt(req.params.authorId))
       return author.books.push(req.params.isbn);
     }
   )
  
  
   return res.json({books:bookModel.books,author:bookModel.author});
  
  });

  
//.........DELETE..........



/*
    Route         /book/delete
    Description   delete a book
    Parameter     isbn
    Access        public
    Method       put
*/
Router.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase = bookModel.books.filter(
      (book)=>
        book.ISBN !== req.params.isbn
      );
  
      bookModel.books = updatedBookDatabase;
      return res.json({books : bookModel.books});
  });
  
  
  
  /*
      Route         /book/delete/author
      Description   delete a author from a book/update
      Parameter     isbn,authorId
      Access        public
      Method        delete
  */
  Router.delete("/book/delete/author/:isbn/:authorId", (req, res)=>
     {
       bookModel.books.forEach(
         (book)=>{
           if(book.ISBN === req.params.isbn)
           {
             const newAuthorList = book.author.filter(
               (author) => author !== parseInt(req.params.authorId)
             );
             book.author = newAuthorList;
             return;
           }
         }
       );
  
  
       //update the author database
  
      bookModel.author.forEach(
         (author) => {
            if(author.id === parseInt(req.params.authorId))
            {
            const newBooksList = author.books.filter(
                (book)=> book !== req.params.isbn
                );
            author.books = newBooksList;
            return;
          }
        }
      );
  
      return res.json({book :bookModel.books,author :bookModel.author});
  });

  module.exports = Router;
  
  
  