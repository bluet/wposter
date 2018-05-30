var wordpress = require( "wordpress" );
var fs = require('fs');
console.log('login js');

// url: "https://ppsn8787.wordpress.com/",
// username: "ppsn8787",
// password: "ilovesn87"
var client;
var wpURL;
var usrName;
var passwd;
function loginWP(){
    console.log('login func');
    ///global
    wpURL = document.getElementById('wp_url').value
    usrName = document.getElementById('user_name').value
    passwd = document.getElementById('pwd').value
    ///end global
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
    		// module.exports.url = wpURL;
            // module.exports.username = usrName;
            // module.exports.password = passwd;
            var account_txt = wpURL + '\n' + usrName + '\n' + passwd;
            fs.writeFile('account.txt', account_txt , function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('Write account complete.');
            });
            //

            javascript:location.href='../index.html'
    		//print login value
    		// console.log(module.exports.url)
    		// console.log(module.exports.pwd)
    		// console.log(module.exports.uname)

            console.log( "Found " + posts.length + " posts!" );

        }

    });

}
// exports.teststr = 'hello,world';

// module.exports.url = wpURL;
// module.exports.username = usrName;
// module.exports.password = passwd;