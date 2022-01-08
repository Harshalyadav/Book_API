const express =require('express');

// Using Node.js `require()`
const mongoose = require('mongoose');

const database =require('./database');

const booky=express();

require("dotenv").config();

booky.use(express.json());


//Establish db connection

mongoose.connect( process.env.MONGO_URL,

).then(()=> console.log("Connection Establish !!"));

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
    (author)=> author.id === parseInt(req.params.id)

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
    (publication)=> publication.id === parseInt(req.params.id)
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


//............ Post method............

/*
  Route         /books/add
  Description   add new book
  Access        public
  Parameter     none
  Method        post
*/
booky.post("/book/add",(req,res)=>{
  // console.log(req.body);
  const {addNewBook} = req.body;
  database.books.push(addNewBook);
  return res.json({books: database.books});

});

/*
  Route         /author/add
  Description   add new author
  Access        public
  Parameter     none
  Method        post
*/

booky.post("/author/add",(req,res)=>{

  const {newAuthor} = req.body;
  database.author.push(newAuthor);

  return res.json({author : database.author});

});

/*
    Route        /publication/add 
    Description  add new publication
    Parameter    None
    Method       post
    Access       public

*/

booky.post("/publication/add",(req,res)=>{
  const {newPublication} = req.body;
  database.publications.push(newPublication);
  return res.json({publications : database.publications});
});


//.........PUT method.................

/*
   Route        /book/update/title
   Description  update book title
   Access       public
   Parameter    /:isbn
   Methods        put

*/

booky.put("/book/update/title/:isbn",(req,res)=>{
  database.books.forEach(
    (book)=>{
      if(book.ISBN === req.params.isbn){
        book.title = req.body.newBookTitle;
        return;
      }});


    return res.json({books : database.books});

});

/* 
   Route        /book/update/author
   Description  update/add new author for a book
   Access       public
   Parameter    /:isbn/:authorId
   Methods        put

*/


//parameter and parameter



booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{

// update books author Database
// add author in books db

 database.books.forEach(
   (book)=>{
     if(book.ISBN === req.params.isbn)
     {
       return book.author.push(parseInt(req.params.authorId));
     }});

 //update author  books Database.
 // add book 📖 in authors db .
 database.author.forEach(
   (author)=>{
     if(author.id === parseInt(req.params.authorId))
     return author.books.push(req.params.isbn);
   }
 )


 return res.json({books:database.books,author:database.author});

});
/*
   Route         /author/update/name/
   Description   update author name
   Access        Public
   Parameter     /:id/:name
   Method        put
  
 */

booky.put("/author/update/:id/:name",(req,res)=>
{
     database.author.forEach((author)=>{

    console.log(req.params.name) ;   
      if(author.id === parseInt(req.params.id)){
        author.name = req.params.name;
           return;
         };
       }
     );

       return res.json({author : database.author});
}
);


/*
    Route         /publication/update/book
    Description   update and add new publication
    Parameter      isbn
    Access        public
    Method       put
*/

  //.......parameter  and body......  


booky.put("/publication/update/book/:isbn",(req,res)=>{

  // update the publication database
  
  database.publications.forEach(
    (publication)=>{

  //.......body......  

      if(publication.id === req.body.pubId){
           return publication.books.push(req.params.isbn);
      }
    }
  );

//update the book database
 
 database.books.forEach(
   (book)=>{
  
    //.......parameter......  
     
    if(book.ISBN === req.params.isbn) 
     {
       book.publication = req.body.pubId;
       return;
    };
   }
   );

   return res.json({books:database.books, publications:database.publications});
  
});


//.........DELETE..........

/*
    Route         /book/delete
    Description   delete a book
    Parameter     isbn
    Access        public
    Method       put
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
  const updatedBookDatabase = database.books.filter(
    (book)=>
      book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;
    return res.json({books : database.books});
});



/*
    Route         /book/delete/author
    Description   delete a author from a book/update
    Parameter     isbn,authorId
    Access        public
    Method        delete
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res)=>
   {
     database.books.forEach(
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

    database.author.forEach(
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

    return res.json({book :database.books,author :database.author});
});



/*
    Route         /author/delete
    Description   delete a author 
    Parameter     author id
    Access        public
    Method        delete
*/

booky.delete("/author/delete/:id",(req,res)=>{
  const updateAuthor = database.author.filter((author)=>{
    author.id !== parseInt(req.params.id)
  });
  
  database.author = updateAuthor;
  return res.json({author :database.author});
});


/*
    Route         /publication/delete/book
    Description   delete a book from publication /update book database
    Parameter     isbn,publication id
    Access        public
    Method        delete
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req, res)=>{
  database.publications.forEach((publication)=>{
  if(publication.id === parseInt(req.params.pubId)){
      const newBooksList = publication.books.filter(
        (book)=> book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  }
  );


  // update book database

   database.books.forEach((book)=>{
     if(book.ISBN === req.params.isbn){
       book.publication = 0;
       return;
     }
   });
   return res.json({books : database.books ,publications : database.publications});
});

booky.listen(3000, ()=>{
    console.log("Server is running 🚀")
});