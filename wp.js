// s105213007@ncnu.edu.tw
var wordpress = require( "wordpress" );
var client = wordpress.createClient({
    url: "https://ppsn8787.wordpress.com/",
    username: "ppsn8787",
    password: "ilovesn87"
});
 
// client.getPosts(function( error, posts ) {
//     console.log( "Found " + posts.length + " posts!" );
// });


client.newPost({
    title: "My First Post",
    content: '<img src="https://www.penghu-nsa.gov.tw/FileDownload/Album/Big/20161012162551758864338.jpg"> </img>',
    status: "publish",
    termNames: {
		"category": ["Javascript", "Node"],
		"post_tag": ["api", "fun", "js"]
    }
}, function( error, id ) {
    console.log( id );
});

