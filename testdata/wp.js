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

// client.listMethods(function(n,data){
//     console.log(data['wp.newPost']);
// })


var fs = require('fs');
// var file = fs.readFileSync( "test.png" );
// client.authenticatedCall( "wp.uploadFile", {
//     name: "test.png",
//     type: "image/png",
//     bits: file
// }, function() {
//     console.log( arguments );
// });

// var read_file = fs.readFile("test.png",{ encoding: "base64" });

// // console.log(read_file)


// upload file to media library
// var file = fs.readFileSync( "test.png" );
// client.uploadFile({
//     name: 'file-001',
//     type: 'image/png',
//     bits: read_file,
//     postId: 20
// },function(error,file){
//     console.log(error);
//     console.log(file);
// });



client.newPost({
    title: "gg",
    content: 'test context',
    status: "publish",
    termNames: {
		"category": ["Javascript", "Node"],
		"post_tag": ["api", "fun", "js"]
    }
},function( error , id){
    // console.log(error);
    console.log(id);
    var file = fs.readFileSync( "test.png" );
    client.authenticatedCall( "wp.uploadFile", {
        name: "test.png",
        type: "image/png",
        bits: file,
        postId: id,
    },function( error, file ) {
        console.dir(arguments)
        console.log( file );
        client.editPost(id,{thumbnail:
            {thumbnail:245 }
        },function( error ){
            console.log(error);
        })
    });
});

// client.editPost(posts[0].id, {thumbnail : { thumbnail : "http://xxxxxxxxxxxxx.org/wp-content/uploads/2017/07/japanese-rice-bowl-pottery-150x150.jpg" } }, function( error ) {})



// // turn around XD
// var file = fs.readFileSync( "test.png" );
// client.authenticatedCall( "wp.uploadFile", {
//     name: "test.png",
//     type: "image/png",
//     bits: file,
//     postId: id
// }, function() {
//     client.newPost({
//         title: "My First Post",
//         content: 'test context',
//         status: "publish",
//         thumbnail: file,
//         termNames: {
//             "category": ["Javascript", "Node"],
//             "post_tag": ["api", "fun", "js"]
//         }
//     },function( error, id ){
//         console.log(error);
//         console.log(id);
//     });
// });
