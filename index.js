const fs = require('fs');
const glob = require("glob");
const im = require('imagemagick');

var sourceImg = null;
var toBeReplaced1 = null;
var toBeReplaced2 = null;

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(index==2){
  	sourceImg = val;
  }
  if(index==3){
  	toBeReplaced1 = val;
  }
  if(index==4){
  	toBeReplaced2 = val;
  }
});
console.log(sourceImg,toBeReplaced1,toBeReplaced2);
console.log("---Traversing Destination 1---");
var cnt = 0;
var filesArr = null;
glob(toBeReplaced1, function (er, files) {
	console.log(files);
	filesArr = files;
	processFileImg();
})

function processFileImg(){
	if(cnt<filesArr.length){
		var tmpFile = filesArr[cnt];
		im.identify(tmpFile, function(err, features){
		  if (err) throw err;
		  //console.log(features);
		  if(features.width == features.height){
	  		im.resize({
			  srcPath: sourceImg,
			  dstPath: tmpFile,
			  width:   features.width,
			  quality: 1,
			  format: 'png'
			}, function(err, stdout, stderr){
			  if (err) throw err;
			  console.log('resized kittens.jpg to fit within '+features.width+'px');
			  cnt++;processFileImg();
			});
		  } else {
		  	var greater = features.width > features.height?features.width:features.height;
		  	var opt = {
			  srcPath: sourceImg,
			  dstPath: tmpFile,
			  quality: 1,
			  format: 'png'
			};

			if(features.width > features.height){
				opt.width = greater;
			}else{
				opt.height = greater;
			}

		  	im.resize(opt, function(err, stdout, stderr){
			  if (err) throw err;
			  console.log('resized '+greater+'now going to crop');
			  im.crop({
				  srcPath: tmpFile,
				  dstPath: tmpFile,
				  width: features.width,
				  height: features.height,
				  quality: 1
				}, function(err, stdout, stderr){
				  if (err) throw err;
				  cnt++;processFileImg();
				});
			});
		  }
		});
	}else{
		return 1;
	}
}