// const {author} = require("../../database");

const Router = require('express').Router();

const authorModel = require("../../database/author");




/*
   Router         /author
   Description    get all book based on author
   Parameter      none
   Method         get
   Access         public

  */
   Router.get('/author',async(req,res)=>
   {
    try{
      const allAuthor = await authorModel.find();
      return res.json({allAuthor});
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
 
 Router.get("/id/:id",async(req,res)=>{
  try{
     const getSpecificAuthor = await authorModel.findOne(
     {
       id : parseInt(req.params.id)
    }
 
     );
   
   if(!getSpecificAuthor){
     return res.json({
       error:`No author is found based on this id ${req.params.id}`
      });
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
 
 Router.get("/book/:isbn",async(req,res)=>{
  try {  
      const getSpecificAuthor = await authorModel.findOne(
      {
        books : req.params.isbn
      }
    );
    
    if(!getSpecificAuthor ){
       return res.json({error:`No author is found based on this isbn ${req.params.isbn}`})
    }
    
    return res.json({author: getSpecificAuthor});
 }
 
 catch(error){
  return res.json({
    error : error.message
  });
 }
});

//............ Post method............



/*
  Route         /author/add
  Description   add new author
  Access        public
  Parameter     none
  Method        post
*/

Router.post("/add",async(req,res)=>{

    const {newAuthor} = req.body;
  const nAuthor = await authorModel.create(newAuthor);
  
    return res.json({nAuthor});
  
  });

  
//.........PUT method.................


/*
   Route         /author/update/name/
   Description   update author name
   Access        Public
   Parameter     /:id/:name
   Method        put
  
 */

   Router.put("/update/:id/:name",async(req,res)=>
   {
       const upAuthor = await authorModel. findOneAndUpdate(
         {  
         id : parseInt(req.params.id)
        },
         { $addToSet:{
           name : req.params.name
          } 
        }
          
        );
   
          return res.json({upAuthor});
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

//..........NOT Completed...........

// Router.delete("/delete/:id",async(req,res)  =>{
//     const updateAuthor = await authorModel.findOneAndUpdate({
//       id : parseInt(req.params.id)
//     },
//     {
      
//     }
//     );
    
//     authorModel.author = updateAuthor;
//     return res.json({author :authorModel.author});
//   });

module.exports =Router;