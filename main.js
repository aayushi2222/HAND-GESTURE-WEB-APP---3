Webcam.set({
    height: 315,
    width: 350,
    image_format: 'png',
    png_quality:90
});

var Camera = document.getElementById("camera");
Webcam.attach("#camera");


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='Capture_image' src="+ data_uri +"></img>"
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GOmbQdz8O/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    var speakdata1 = "The First Prediction Is" + Prediction1;
    var speakdata2 = "The Second Prediction Is" + Prediction2;
    var utterThis = new SpeechSyntheSisUtterance(speakdata1, speakdata2);
    synth.speak(utterThis);
}
Prediction1 = "";
Prediction2 = "";



function check(){
    img = document.getElementById("Capture_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
if(error){
    console.error();
}

else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;

    Prediction1 = results[0].label;
    Prediction2 = results[1].label;

    speak();
    if(results[0].label == "Peace"){
        document.getElementById("update_gesture").innerHTML = "&#9996";  
    }
    if(results[0].label == "Thumbs up"){
        document.getElementById("update_gesture").innerHTML = "&#128077";
    }
    if(results[0].label == "Ok"){
        document.getElementById("update_gesture").innerHTML = "&#128076";
    }

    if(results[1].label == "Peace"){
        document.getElementById("update_gesture2").innerHTML = "&#9996"; 
    }
    if(results[1].label == "Thumbs up"){
        document.getElementById("update_gesture2").innerHTML = "&#128077";
    }
    if(results[1].label == "Ok"){
        document.getElementById("update_gesture2").innerHTML = "&#128076";
    }
}
}