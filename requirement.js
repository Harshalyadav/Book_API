


// ...Database...

//  1> Books(Details)
// a> ISBN
// d> title
// c> page Numbers
// d> language
// e> publication date
// f> author[]
// g> category[]


//  2> Author(Details)

// a>  auther name
// b> identifie
// c> books[]

//  3> Publication(Details)

// a> publication name
// b> identifier
// c> books[]


//......APIs.......

// 1>... Book...

// a> GET method

// to get all books ✔️.
// to get specifice books ✔️.
// to get list of book based on category ✔️. 
// to get list of book based on language ✔️.

// b> POST method
// add new books ✔️.

//c> PUT method
// update books.
// name, price, pageNo, tile.

//d> Delete method
//delete a book
//delete an author

//2>.... Author...

//a> get method

// get all author ✔️ .
// get spcific author  ✔️.
//get list of author based on book ✔️.

//b> POST method
//add new author ✔️.

//c> PUT method
//update author name

//d> Delete method
//delete an author


//3>....Publications.....

//a>get method

//to get all publication ✔️.
//to get spcific publication ✔️.
//to get list of publication based on book ✔️.

// b> POST method
//add new publication ✔️.

//c> PUT method
// update publication name.
//update/add books to publication.

//Delete method
//delete the publication
//delete a books from publication.