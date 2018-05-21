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
	// console.log(x);

	var csv = require("csvtojson");
	csv()
  	.fromFile(x.files[0].path)
  	.on("end_parsed", function(jsonArrayObj) {
  		console.log(jsonArrayObj);
  	})
 
}