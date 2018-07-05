var wordpress = require( "wordpress" );
const download = require('image-downloader')
var fs = require('fs');
var format_data = [];

// var client = wordpress.createClient({
//     url: url,
//     username: pwd,
//     password: name
// });

var obj;

fs.readFile('tag.json', function(err, data) {
	if (err) throw err;

	obj = JSON.parse(data);
})

console.log('this is render');
var client;
fs.readFile('account.txt', function (err, data) {
    if (err) throw err;
    const account = data.toString().split('\n');
 
    client = wordpress.createClient({
        url: account[0],
        username: account[1],
        password: account[2]
    });

    //change the document title
    document.title = 'Wordpress Poster - ' + client.username + ' ( ' + account[0] + ' )';

});

function detectInput() {
	$("#upload").prop("disabled", false)
}


function myfile(File) {

	$("#not-check-all").prop("disabled", false)
	$("#send").prop("disabled", false)

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

		format_data = [];
  		for(let i in jsonArrayObj){

  			let id = i;

			let time    = jsonArrayObj[i]['date tag as YYYYMM'];
			let image   = jsonArrayObj[i]['field6'];
			let title   = jsonArrayObj[i]['field5'];

			let content =   jsonArrayObj[i]['field9']  + '\n\n' +
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

			for (var tmp in obj) {
				tag1 = tag1.replace(obj[tmp].original, obj[tmp].modified);
				tag2 = tag2.replace(obj[tmp].original, obj[tmp].modified);
				tag3 = tag3.replace(obj[tmp].original, obj[tmp].modified);
				tag4 = tag4.replace(obj[tmp].original, obj[tmp].modified);
			}

			format_data.push({
				"id" : i,
				"time" : time,
				"image" : image,
				"title" : title,
				"content" : content,
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

		// DEBUG : show data in console
		// for(let i in format_data){
		// 	console.log('this is data : '+i)
		// 	console.log('title : '+format_data[i].title);
		// 	console.log('context : '+format_data[i].context);
		// 	console.log('tags : '+format_data[i].tags);
		// 	console.log('\n\n');
		// }

	})

}

function show(){

	let stream = "";

	for (let i in format_data) {

		stream += "<label class=\"checkbox-inline\"><input type=\"checkbox\" id=\"" + i + "\" checked/>"
			 + "<p class=\"preview_id\">" + ++format_data[i].id + ".</p>"
			 + "<p class=\"preview_title\">" + format_data[i].title + "</p>"
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

}

function unchecked() {
	for (let i in format_data) {
		$("#" + i).prop("checked", false);
		// console.log(document.getElementById(i).style.checked)
	}
}

function checkall() {
	for (let i in format_data) {
		$("#" + i).prop("checked", true);
		// console.log(document.getElementById(i).style.checked)
	}
}

function logOut() {
	javascript:location.href='../src/login/login.html'
	fs.writeFile('account.txt', '', function (err) {
    	if (err)
     	  	console.log(err);
    	else
        	console.log('Write operation complete.');
	});
}

function postToWP(){

	var info_text = '正在上傳 . . .'

	//hint the status to user
	var info = document.getElementById('info')
	var container = document.getElementById('container').style

	console.log('postTOWP ...');
	var upload_data = [];

	//insert the user checked data into array
	for (let i in format_data) {
		if(document.getElementById(i).checked) {
			upload_data.push(format_data[i]);
		}
	}

	//if user didn't check any data
	if (upload_data.length != 0) {
		info.style.visibility = 'visible'
		$("p.info").html('資料處理中...')
		container.opacity = 0.5
		container.pointerEvents = 'none'
	} 

	console.log(upload_data);
	//above is correct data

	// download images to local (./testdata/images/)
	var file;

	for(let i in upload_data){

		var options = {
            url: upload_data[i].image,
            dest: 'testdata/images/' + i + '.jpg'        // Save to /path/to/dest/photo.jpg
        }
        download.image(options).then(({ filename, image }) => {	
			console.log('File saved to /testdata/images/', filename)

			file = fs.readFileSync('testdata/images/' + i + '.jpg');
			client.authenticatedCall("wp.uploadFile",{
				name: i + '.jpg',
				type: "image/png",
				bits: file,
			},function (error, file_info) {
				console.log("Return from uploadFile...");
				console.dir(arguments);
				client.newPost({
					title: upload_data[i].title,
					content: upload_data[i].content,
					status: "publish",
					thumbnail: file_info.id,
					termNames: {
						"post_tag": [upload_data[i].tag1,
									upload_data[i].tag2,
									upload_data[i].tag3,
									upload_data[i].tag4]
					}
				},
				function ( error ) {
					console.log("Return from newPost...");
					console.log(i," done!");

					//show the upload success info
					info_text += ("<br>已上傳編號" + upload_data[i].id + "的資料")
					$("p.info").html(info_text)

					//at the end of info	
					if ((upload_data.length - 1) == i) {
						console.log("in judge")
						window.setTimeout("uploadSucceed()", 4000)
					}
					// console.dir(arguments);
				});
			});




        }).catch((err) => {
			throw err
			console.log(i,' done');
		});
		//above is save images

		// file = fs.readFileSync('testdata/images/' + i + '.jpg');
        // client.authenticatedCall("wp.uploadFile",{
        //     name: i + '.jpg',
        //     type: "image/png",
        //     bits: file,
        // },function (error, file_info) {
        //     console.log("Return from uploadFile:");
        //     console.dir(arguments);
        //     client.newPost({
        //         title: upload_data[i].title,
        //         content: upload_data[i].content,
        //         status: "publish",
        //         thumbnail: file_info.id,
        //         termNames: {
        //             "post_tag": [upload_data[i].tag1,
        //                          upload_data[i].tag2,
        //                          upload_data[i].tag3,
        //                          upload_data[i].tag4]
        //         }
        //     },
        //     function ( error ) {
        //         console.log("Return from newPost:");
        //         console.dir(arguments);
        //     });
        // });

	}

	
}

function uploadSucceed() {
	info.style.textAlign = "center"
	$("p.info").html("上傳成功")
	window.setTimeout("closeInfo()", 1000)
}


function closeInfo() {
	document.getElementById("container").style.opacity = 1.0
	info.style.textAlign = "justify"
	info.style.visibility = 'hidden'
	info.style.backgroundColor = "#3f3f3f"
	document.getElementById("container").style.pointerEvents = 'auto';
}