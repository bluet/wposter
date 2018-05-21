// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var csv = require("csvtojson");

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

	
	// csv().fromFile(x.files[0].path).on("end_parsed", function(jsonArrayObj) {
	// 	console.log(jsonArrayObj);
  	// })



}

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


var tmp_path = '/Users/yiyuchang/Desktop/dev/EDQblogbot - 工作表1.csv';
csv().fromFile(tmp_path).on("end_parsed", function(jsonArrayObj) {
	// console.log(jsonArrayObj[0]['date tag as YYYYMM']);

	for(let i in jsonArrayObj){

		let title   = jsonArrayObj[i]['12']

		let context = jsonArrayObj[i]['field9'] + '\n' +
					  jsonArrayObj[i]['field12'] + '\n' +
					  jsonArrayObj[i]['field4'];
		
		// console.log(context);
	}

	console.log(jsonArrayObj)
})