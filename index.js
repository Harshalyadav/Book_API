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
Route         /
Description   get specific book
Parameter      :isbn
Access        public 
Method        get

*/


booky.get("/is/:isbn",(req,res)=>
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


/* 
    Route        /c
    Description  get book based on category.
    Parameter    category: string
    Access       Public
    Method        get
 */
booky.get("/c/:category",(req, res) => {
  const getCategoryBook = database.books.filter(
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

booky.get("/l/:language",(req,res)=>{
  const getLanguageBook = database.books.filter(
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

booky.get("/price/:p",(req,res)=>{
    const getAllPrice = database.books.filter(
      (book)=> book.price === req.params.p
    )

    if(getAllPrice.length===0){
       return res.json({error:`No book found in this  price ${req.params.p}`})
    }
    return res.json({book : getAllPrice});
  });

  /*
   Router         /author
   Description    get all book based on author
   Parameter      none
   Method         get
   Access         public

  */
 booky.get('/author',(req,res)=>{
   return res.json({author:database.author})
 });


 /* 
    Route        /author
    Descrition   get author based on specific id
    Parameter    /:id
    Method       get  
    Access       public   
 */

booky.get("/author/id/:id",(req,res)=>{
  const getSpecificAuthor = database.author.filter(
    (author)=> author.id === req.params.id

    )
  
  if(getSpecificAuthor.length === 0){
    return res.json({error:`No author is found based on this id ${req.params.id}`});
  };

  return res.json({author : getSpecificAuthor});

});

/*
   Route        /author/book/
   Description  get all author based on book 
   Parameter    /:isbn
   Method      get
   Access      public
*/

booky.get("/author/book/:isbn",(req,res)=>{
   const getSpecificAuthor = database.author.filter(
     (author) => author.books.includes(req.params.isbn)
   )
   
   if(getSpecificAuthor.length === 0 ){
      return res.json({error:`No author is found based on this isbn ${req.params.isbn}`})
   }
   
   return res.json({author: getSpecificAuthor});
});

/* 
       Route         /publications
       Description   get all publication
       Parameter     None
       Access        public
       Method        get

*/

booky.get("/publications",(req,res)=>{
  return res.json({publications : database.publications});
});


/* 
  Route         /publications/books
  Description   to get specific publication 
  Access        public
  Parameter     /:id
  Method        get

*/
booky.get("/publications/books/:id",(req,res)=>{
  const getSpecificPublication = database.publications.filter(
    (publication)=> publication.id === req.params.id
   )
   if(getSpecificPublication.length === 0){
     return res.json({error : `No publication found based on these id ${req.params.id}`});
   }

   return res.json({publication: getSpecificPublication});

});

/*
   Route         /publications/books/pub
   Description   get list of publications based on book 
   Parameter     /:isbn
   Access        public
   Method        get
*/
booky.get("/publications/books/pub/:isbn",(req,res)=>{
  const getPublicationBook = database.publications.filter(
    (publications)=>publications.books.includes(req.params.isbn)
  )
   if(getPublicationBook.length === 0){
     return res.json({error:`no publication found based on this ${req.params.isbn}`});
   }
  return res.json({publications : getPublicationBook})
});
booky.listen(3000, ()=>{
    console.log("Server is running 🚀")
});