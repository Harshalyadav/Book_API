const {author} = require("../../database");

const Router = require('express').Router();

const authorModel = require("../../database/author");
/*
   Router         /author
   Description    get all book based on author
   Parameter      none
   Method         get
   Access         public

  */
   Router.get('/author',(req,res)=>
   {
    try{
      return res.json({author:authorModel.author})
    }catch(error){
      return res.json({error : error.message
      });
    }
  });
 
 
  /* 
     Route        /author
     Descrition   get author based on specific id
     Parameter    /:id
     Method       get  
     Access       public   
  */
 
 Router.get("/author/id/:id",(req,res)=>{
  try{
     const getSpecificAuthor = authorModel.author.filter(
     (author)=> author.id === parseInt(req.params.id)
 
     )
   
   if(getSpecificAuthor.length === 0){
     return res.json({error:`No author is found based on this id ${req.params.id}`});
   };
 
   return res.json({author : getSpecificAuthor});
 }
 catch(error){
    return res.json({
      error : error.message
    });
 }
 });
 
 /*
    Route        /author/book/
    Description  get all author based on book 
    Parameter    /:isbn
    Method      get
    Access      public
 */
 
 Router.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = authorModel.author.filter(
      (author) => author.books.includes(req.params.isbn)
    )
    
    if(getSpecificAuthor.length === 0 ){
       return res.json({error:`No author is found based on this isbn ${req.params.isbn}`})
    }
    
    return res.json({author: getSpecificAuthor});
 });

//............ Post method............



/*
  Route         /author/add
  Description   add new author
  Access        public
  Parameter     none
  Method        post
*/

Router.post("/author/add",(req,res)=>{

    const {newAuthor} = req.body;
    authorModel.author.push(newAuthor);
  
    return res.json({author : authorModel.author});
  
  });

  
//.........PUT method.................


/*
   Route         /author/update/name/
   Description   update author name
   Access        Public
   Parameter     /:id/:name
   Method        put
  
 */

   Router.put("/author/update/:id/:name",(req,res)=>
   {
        authorModel.author.forEach((author)=>{
   
       console.log(req.params.name) ;   
         if(author.id === parseInt(req.params.id)){
           author.name = req.params.name;
              return;
            };
          }
        );
   
          return res.json({author : authorModel.author});
   }
   );
   
//.........DELETE..........
   


/*
    Route         /author/delete
    Description   delete a author 
    Parameter     author id
    Access        public
    Method        delete
*/

Router.delete("/author/delete/:id",(req,res)=>{
    const updateAuthor = authorModel.author.filter((author)=>{
      author.id !== parseInt(req.params.id)
    });
    
    authorModel.author = updateAuthor;
    return res.json({author :authorModel.author});
  });
  
  