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
    content: "Controlling WordPress from node.js sure is fun!",
    status: "publish",
    termNames: {
		"category": ["Javascript", "Node"],
		"post_tag": ["api", "fun", "js"]
    }
}, function( error, id ) {
    console.log( id );
});

