const Router = require('express').Router();

const publicationModel = require('../../database/publication');

const bookModel = require('../../database/book');


/* 
       Route         /publications
       Description   get all publication
       Parameter     None
       Access        public
       Method        get

*/

Router.get("/", async(req,res)=>{

  const publication = await
     publicationModel.find();

  return res.json(publication);
  });
  
  
  /* 
    Route         /publications/books
    Description   to get specific publication 
    Access        public
    Parameter     /:id
    Method        get
  
  */
  Router.get("/books/:id", async(req,res)=>{
    const getSpecificPublication = await publicationModel.findOne(
      {
        id : parseInt(req.params.id)
      }
     )
     if(!getSpecificPublication){
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
  Router.get("/books/pub/:isbn", async(req,res)=>{
    const getPublicationBook = await publicationModel.findOne(
      {
        books : req.params.isbn
      }
    );
     if(!getPublicationBook){
       return res.json({
         error:`no publication found based on this ${req.params.isbn}`
        });
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

Router.post("/add", async(req,res)=>{
    const {newPublication} = req.body;
    const newPublications = await publicationModel.create(newPublication);
    return res.json({newPublications});
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


  Router.put("/book/:isbn", async(req,res)=>{

    // update the publication database
    
 const updatePublication = await   publicationModel.findOneAndUpdate(
      {
    //.......body......    
        id : parseInt(req.body.pubId)
      },
        {  
          $addToSet : {
             books : req.params.isbn
          
        }
      }
    );
  
  //update the book database
   
   const newBook = await bookModel.findOneAndUpdate({
    
      //.......parameter......  
       
      ISBN : req.params.isbn
   },
   {  
     $addToSet :

       {
         publication : req.body.pubId
         
      }
     }
     );
  
     return res.json({
      newBook, updatePublication
    });
    
  });
  
//.........DELETE..........



/*
    Route         /publication/delete/book
    Description   delete a book from publication /update book database
    Parameter     isbn,publication id
    Access        public
    Method        delete
*/


Router.delete("/delete/book/:isbn/:pubId",async(req, res)=>{

  const delPublication = await  publicationModel.findOneAndUpdate({
    id : parseInt(req.params.pubId)},
    {
        $pull :{
        book : req.params.isbn
        
        }
        
      
    }
    );
  
  
    // update book database
  
    const bookUp = await bookModel.findOneAndUpdate({
      ISBN : req.params.isbn},
      {
        
       }
     );
     return res.json({books : bookUp ,publications : delPublication});
  });

  module.exports= Router;
  