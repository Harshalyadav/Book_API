let books=[{
    ISBN : "123book",
    title: "Harry porter",
    pubDate:"2021-12-22",
    language: "English",
    price :"3$",
    pagNo :"250",
    author:[1,2],
    category:["entertainments","Action","Drama"],
    publication:[1]
}
, 
{
    ISBN    : "12345abooks",
    title   : "Harry porter part 2",
    pubDate : "2021-12-21",
    language : "English",
    price    : "21$",
    pagNo    : "251",
    author   : [1],
    category : ["entertainments","funny","Drama"], 
    publication:[1]   
}
];

let author =[
    {
    id    : 1, 
    name  : "ekon",
    books : ["123book","12345abooks"],
},
{
    id    : 2,
    name  : "pokemon",
    books : ["12345abooks"],

}];

let publications =[
    {
        id    : "1", 
        names : "pentagon",
        books : ["12345abooks"],

    },
    {
        id    : 2, 
        names : "isro",
        books :["123books"] 
    }
] ;

module.exports={books,author,publications};