// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var wordpress = require( "wordpress" );
var format_data = [];
var client = wordpress.createClient({
    url: "https://ppsn8787.wordpress.com/",
    username: "ppsn8787",
    password: "ilovesn87"
});


function myfile(File) {

	var x = document.getElementById('customFile');
	console.log(x.files[0].path);

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
			
			//the following properties are for preview
			let contextWithoutImg = jsonArrayObj[i]['field9']  + '\n\n' +
					  				jsonArrayObj[i]['field12'] + '\n\n' +
					 				jsonArrayObj[i]['field4']; 

			let firstText = jsonArrayObj[i]['field9'];
			let secText = jsonArrayObj[i]['field12'];
			let thirdText = jsonArrayObj[i]['field4'];

			let tag1 = jsonArrayObj[i]['field7'];
			let tag2 = jsonArrayObj[i]['field8'];
			let tag3 = jsonArrayObj[i]['field10'];
			let tag4 = jsonArrayObj[i]['field11'];
		
			format_data.push({
				"time" : time,
				"image" : image,
				"title" : title,
				"context" : context,
				"tags" : tags,
				"contextWithoutImg" : contextWithoutImg,
				"firstText" : firstText,
				"secText" : secText,
				"thirdText" : thirdText,
				"tag1" : tag1,
				"tag2" : tag2,
				"tag3" : tag3,
				"tag4" : tag4
			})
		}

		show();

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

function show(){


	let stream = "";

	for (let i in format_data) {

		stream += "<label class=\"checkbox-inline\"><input type=\"checkbox\" id=\"" + i + "\" checked/>"
			 + "<p class=\"preview_id\">" + ++i + ".</p>"
			 + "<p class=\"preview_title\">" + format_data[--i].title + "</p>"
			 + "<p><img  class=\"preview_img\" src=\"" + format_data[i].image + "\"></img></p><br>"
			 + "<p class=\"preview_text\">" + format_data[i].firstText + "</p><br>"
			 + "<p class=\"preview_text\">" + format_data[i].secText + "</p><br>"
			 + "<p><a href=\"" + format_data[i].thirdText + "\" target=\"#\">" + format_data[i].thirdText + "</a></p><br>"
			 + "<p class=\"preview_tag\">#"
			 		 + format_data[i].tag1 + " &nbsp&nbsp#"
			 		 + format_data[i].tag2 + " &nbsp&nbsp#"
			 		 + format_data[i].tag3 + " &nbsp&nbsp#"
			 		 + format_data[i].tag4
			 		 + "<hr class=\"preview_divider\"></hr></p></label>";

	}

	$("form.showInfoForm").html(stream);	

	format_data = [];

}

function postToWP(){

	var upload_data = [];

	for (let i in format_data) {
		if(document.getElementById(i).checked) {
			upload_data.push(format_data[i]);
		}
	}

	console.log(upload_data);

	for(let i in upload_data){
		client.newPost({
			title: upload_data[i].title,
			content: upload_data[i].context,
			status: "publish",
			termNames: {
				"post_tag": upload_data[i].tags
			}
		}, function( error, id ) {
			console.log( id );
		});

	}

}
