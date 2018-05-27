var fs = require('fs');
var wordpress = require( "wordpress" );
var client = wordpress.createClient({
    url: "https://ppsn8787.wordpress.com/",
    username: "ppsn8787",
    password: "ilovesn87"
});
// s105213007@ncnu.edu.tw


// create, upload, edit
client.newPost(
    {
        title: "newPost, upload pic, and editPost",
        content: 'Contents without daIMG',
        status: "publish",
        termNames: {
            "category": ["Javascript", "Node"],
            "post_tag": ["api", "fun", "js"]
        }
    },
    function (error , postid) {
        console.log("Return from newPost:");
        console.log(arguments);

        var file = fs.readFileSync( "test.png" );
        client.authenticatedCall(
            "wp.uploadFile",
            {
                name: "test.png",
                type: "image/png",
                bits: file,
                postId: postid,
            },
            function (error, file_info) {
                console.log("Return from uploadFile:");
                console.dir(arguments);

                client.editPost(
                    postid,
                    { thumbnail: file_info.id },
                    function ( error ) {
                        console.log("Return from editPost:");
                        console.dir(arguments);
                    }
                );
            }
        );
    }
);


// just upload and create
var file = fs.readFileSync( "boom-lines.png" );
client.authenticatedCall(
    "wp.uploadFile",
    {
        name: "boom-lines.png",
        type: "image/png",
        bits: file,
    },
    function (error, file_info) {
        console.log("Return from uploadFile:");
        console.dir(arguments);

        client.newPost(
            {
                title: "Just uploadFile and newPost",
                content: 'Contents without daIMG',
                status: "publish",
                thumbnail: file_info.id,
                termNames: {
                    "category": ["Javascript", "Node"],
                    "post_tag": ["api", "fun", "js"]
                }
            },
            function ( error ) {
                console.log("Return from newPost:");
                console.dir(arguments);
            }
        );
    }
);
