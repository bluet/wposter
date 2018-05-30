
var wordpress = require( "wordpress" );
console.log('login js');

// url: "https://ppsn8787.wordpress.com/",
// username: "ppsn8787",
// password: "ilovesn87"
var client;

function loginWP(){
    console.log('login func');

    var wpURL = document.getElementById('wp_url').value
    var usrName = document.getElementById('user_name').value
    var passwd = document.getElementById('pwd').value	

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

        	//change html page to ../index.html
    		// javascript:location.href='../index.html'

    		//export login value
    		module.exports.url = wpURL;
    		module.exports.pwd = passwd;
    		module.exports.uname = usrName;

    		//print login value
    		console.log(module.exports.url)
    		console.log(module.exports.pwd)
    		console.log(module.exports.uname)

            console.log( "Found " + posts.length + " posts!" );

        }

    });

}