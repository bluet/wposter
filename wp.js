var wordpress = require( "wordpress" );
var client = wordpress.createClient({
    url: "your_url/",
    username: "x",
    password: "x"
});
 
client.getPosts(function( error, posts ) {
    console.log( "Found " + posts.length + " posts!" );
    console.log(posts);
});


client.newPost({
    title: "My First Post",
    content: "Controlling WordPress from node.js sure is fun!",
    status: 'publishPosts',
    type: 'post'
}, function( error, id ) {
    console.log( id );
});

