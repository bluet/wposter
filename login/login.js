var wordpress = require( "wordpress" );
console.log('login js');

// url: "https://ppsn8787.wordpress.com/",
// username: "ppsn8787",
// password: "ilovesn87"
var client;
function loginWP(){
    console.log('login func');
    var wpURL   = document.getElementById('wp_url').value;
    var usrName = document.getElementById('user_name').value;
    var passwd  = document.getElementById('passwd').value;

    client = wordpress.createClient({
        url: wpURL,
        username: usrName,
        password: passwd
    });

    //authentication account
    client.getPosts(function( error, posts ) {
        if(error){
            console.log(error);
        }else{
            console.log( "Found " + posts.length + " posts!" );
        }
    });

}