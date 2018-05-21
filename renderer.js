// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

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

	var format_data = [];
	
	var csv = require("csvtojson");
	csv().fromFile(x.files[0].path).on("end_parsed", function(jsonArrayObj) {
		console.log(jsonArrayObj);
  		
  		for(let i in jsonArrayObj){

			let time = jsonArrayObj[i]['date tag as YYYYMM'];
			let image = jsonArrayObj[i]['field6'];
			let title = jsonArrayObj[i]['field12'];

			let context = jsonArrayObj[i]['field9'] + '\n' +
					  jsonArrayObj[i]['field12'] + '\n' +
					  jsonArrayObj[i]['field4'];
		
			let tag = [jsonArrayObj[i]['field7'],
					jsonArrayObj[i]['field8'],
					jsonArrayObj[i]['field9'],
					jsonArrayObj[i]['field10']]
		
			format_data.push({
				"time" : time,
				"image" : image,
				"title" : title,
				"context" : context,
				"tag" : tag
			})
			console.log(context);
		}
		console.log(format_data);
  	})
}