var cats;
var trains;
var rainbows;
var brain;
var train_count=0;
var cat_count=0;
var rainbow_count=0;
function preload(){
	cats=loadBytes('cat1000.bin');
	trains=loadBytes('train1000.bin');
	rainbows=loadBytes('rainbow1000.bin');
}
function setup(){
	createCanvas(280,280);
	background(0);
	brain=new NeuralNetwork(784,64,3);	
}
function cleardisplay(){
	background(0);
}
function train(){
	console.log("training");
	var training=[];
	var index=0;
	for(var i=0;i<800;i++){
		var temp_cat=[];
		var temp_train=[];
		var temp_rainbows=[];
		var start=(i*784);
		for(var j=0;j<784;j++){
			temp_cat[j]=cats.bytes[j+start]/255;
			temp_train[j]=trains.bytes[j+start]/255;
			temp_rainbows[j]=rainbows.bytes[j+start]/255;
		}
		training[index]=new Object();
		training[index]["data"]=temp_cat;
		training[index]["label"]="cat";
		index++;
		training[index]=new Object();
		training[index]["data"]=temp_train;
		training[index]["label"]="train";
		index++;
		training[index]=new Object();
		training[index]["data"]=temp_rainbows;
		training[index]["label"]="rainbow";
		index++;
	}
	shuffle(training,true);
	console.log(training);
	for(var i=0;i<training.length;i++){
		if(training[i]["label"]=="cat"){
			brain.train(training[i]["data"],[1,0,0]);	
		}
		else if(training[i]["label"]=="train"){
			brain.train(training[i]["data"],[0,1,0]);	
		}
		else{
			brain.train(training[i]["data"],[0,0,1]);	
		}
	}
	console.log("Trained");
}
function accuracy(){
	var total=600;
	var correct=0;
	correct+=test("cat");
	correct+=test("train");
	correct+=test("rainbow");
	console.log(correct);
	document.getElementById('accuracy').innerHTML="Accuracy= "+float((correct/total)*100)+" %"
}
function test(label){
	cat_count=train_count=rainbow_count=0;
	console.log("Testing "+label);
	for(var i=800;i<1000;i++){
		var start=(i*784);
		var temp=[];
		for(var j=0;j<784;j++){
			if(label=="rainbow")
				temp[j]=rainbows.bytes[j+start]/255;
			else if(label=="cat")
				temp[j]=cats.bytes[j+start]/255;
			else
				temp[j]=trains.bytes[j+start]/255;
		}
		var output=brain.predict(temp);
		if(output[0]>output[1] && output[0]>output[2]){
			cat_count++;
		}
		else if(output[1]>output[0] && output[1]>output[2]){
			train_count++;
		}
		else if(output[2]>output[0] && output[2]>output[1]){
			rainbow_count++;
		}
		
	}
	document.getElementById('c').innerHTML="Cat count= "+cat_count;
	document.getElementById('t').innerHTML="Train count= "+train_count;
	document.getElementById('r').innerHTML="Rainbow count= "+rainbow_count;
	console.log("Testing "+label+" done");
	if(label=="cat")
		return cat_count;
	else if(label=="rainbow")
		return rainbow_count;
	else
		return train_count;
}
function guess(){
	var img=get();
	img.resize(28,28);
	img.loadPixels();
	var input=[];
	var index=0;
	for(var i=0;i<img.pixels.length;i+=4){
		input[index]=img.pixels[i]/255;
		index++;
	}
	console.log(input)
	var output=brain.predict(input);
	if(output[0]>output[1] && output[0]>output[2]){
		alert("Guess it is cat")
	}
	else if(output[1]>output[0] && output[1]>output[2]){
		alert("Guess it is Train")	
	}
	else if(output[2]>output[0] && output[2]>output[1]){
		alert("Guess it is Rainbow")
	}
}
function draw(){
	// var total=100;
	// for(var i=0;i<total;i++){
	// 	var img=createImage(28,28);
	// 	img.loadPixels();
	// 	var start=(i*784);
	// 	for(var j=0;j<784;j++){
	// 		img.pixels[j*4]=255-trains.bytes[j+start];
	// 		img.pixels[j*4+1]=255-trains.bytes[j+start];
	// 		img.pixels[j*4+2]=255-trains.bytes[j+start];
	// 		img.pixels[j*4+3]=255;
	// 	}
	// 	img.updatePixels();
	// 	var imgx=28*(i%10);
	// 	var imgy=28*floor(i/10);
	// 	image(img,imgx,imgy);
	// }
	
	strokeWeight(8);
	stroke(255);
	if(mouseIsPressed){
		line(pmouseX,pmouseY,mouseX,mouseY);
	}
}