// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var wordpress = require( "wordpress" );
var client = wordpress.createClient({
    url: "https://ppsn8787.wordpress.com/",
    username: "ppsn8787",
    password: "ilovesn87"
});

var format_data = [];

function myfile(File) {

	var x = document.getElementById('customFile');
	console.log(x.files[0].path);

	var txt = '';
	if ('files' in x) {
		if (x.files.length != 0) {
			txt += "<br><strong>" + 1 + ". file</strong><br>";
			var file = x.files[0];
            if ('name' in file) {
                txt += "name: " + file.name + "<br>";
            }
            if ('size' in file) {
                txt += "size: " + file.size + " bytes <br>";
            }
		}
	}

	document.getElementById("demo").innerHTML = txt;

	// 'date tag as YYYYMM' : is time 
	// 'field6'             : is image
	// 'field5'             : is title
	
	// 'field9'             : is context 1
	// 'field12'            : is context 2
	// 'field4'             : is context 3
	
	// 'field7'             : is tag 1
	// 'field8'             : is tag 2
	// 'field10'            : is tag 3 
	// 'field11'            : is tag 4

	
	
	var csv = require("csvtojson");
	csv().fromFile(x.files[0].path).on("end_parsed", function(jsonArrayObj) {
		// console.log(jsonArrayObj);
  		
  		for(let i in jsonArrayObj){

			let time    = jsonArrayObj[i]['date tag as YYYYMM'];
			let image   = jsonArrayObj[i]['field6'];
			let title   = jsonArrayObj[i]['field5'];

			let context =   '<img src="' + jsonArrayObj[i]['field6'] + '" />'  + '\n\n' +
							jsonArrayObj[i]['field9']  + '\n\n' +
					  		jsonArrayObj[i]['field12'] + '\n\n' +
					 		jsonArrayObj[i]['field4'];
		
			let tags     = [jsonArrayObj[i]['field7'],
					jsonArrayObj[i]['field8'],
					jsonArrayObj[i]['field10'],
					jsonArrayObj[i]['field11']]
		
			format_data.push({
				"time" : time,
				"image" : image,
				"title" : title,
				"context" : context,
				"tags" : tags
			})
			// console.log(context);
		}

		// show data in console
		for(let i in format_data){
			console.log('this is data : '+i)
			console.log('title : '+format_data[i].title);
			console.log('context : '+format_data[i].context);
			console.log('tags : '+format_data[i].tags);
			console.log('\n\n');
		}
  	})
}

function postToWP(){

	for(let i in format_data){
		client.newPost({
			title: format_data[i].title,
			content: format_data[i].context,
			status: "publish",
			termNames: {
				"post_tag": format_data[i].tags
			}
		}, function( error, id ) {
			console.log( id );
		});

		if(i==5){
			break;
		}
	}

}