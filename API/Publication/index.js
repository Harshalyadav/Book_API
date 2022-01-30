const Router = require('express').Router();

const publicationModel = require('../../database/publication');


/* 
       Route         /publications
       Description   get all publication
       Parameter     None
       Access        public
       Method        get

*/

Router.get("/publications",(req,res)=>{
    return res.json({publications : publicationModel.publications});
  });
  
  
  /* 
    Route         /publications/books
    Description   to get specific publication 
    Access        public
    Parameter     /:id
    Method        get
  
  */
  Router.get("/publications/books/:id",(req,res)=>{
    const getSpecificPublication = publicationModel.publications.filter(
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
  Router.get("/publications/books/pub/:isbn",(req,res)=>{
    const getPublicationBook = publicationModel.publications.filter(
      (publications)=>publications.books.includes(req.params.isbn)
    )
     if(getPublicationBook.length === 0){
       return res.json({error:`no publication found based on this ${req.params.isbn}`});
     }
    return res.json({publications : getPublicationBook})
  });
  
//............ Post method............


/*
    Route        /publication/add 
    Description  add new publication
    Parameter    None
    Method       post
    Access       public

*/

Router.post("/publication/add",(req,res)=>{
    const {newPublication} = req.body;
    publicationModel.publications.push(newPublication);
    return res.json({publications : publicationModel.publications});
  });
  
    

//.........PUT method.................



/*
    Route         /publication/update/book
    Description   update and add new publication
    Parameter      isbn
    Access        public
    Method       put
*/

  //.......parameter  and body......  


  Router.put("/publication/update/book/:isbn",(req,res)=>{

    // update the publication database
    
    publicationModel.publications.forEach(
      (publication)=>{
  
    //.......body......  
  
        if(publication.id === req.body.pubId){
             return publication.books.push(req.params.isbn);
        }
      }
    );
  
  //update the book database
   
   publicationModel.books.forEach(
     (book)=>{
    
      //.......parameter......  
       
      if(book.ISBN === req.params.isbn) 
       {
         book.publication = req.body.pubId;
         return;
      };
     }
     );
  
     return res.json({books:publicationModel.books, publications:publicationModel.publications});
    
  });
  
//.........DELETE..........



/*
    Route         /publication/delete/book
    Description   delete a book from publication /update book database
    Parameter     isbn,publication id
    Access        public
    Method        delete
*/
Router.delete("/publication/delete/book/:isbn/:pubId",(req, res)=>{
    publicationModel.publications.forEach((publication)=>{
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
  
     publicationModel.books.forEach((book)=>{
       if(book.ISBN === req.params.isbn){
         book.publication = 0;
         return;
       }
     });
     return res.json({books : publicationModel.books ,publications : publicationModel.publications});
  });

  module.exports= Router;
  