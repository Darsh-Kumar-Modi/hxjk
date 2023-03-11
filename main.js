status = "";
objects = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = loading";
}
function modelLoaded() {
    console.log("model loaded");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {
        r = random(125);
         g = random(165); 
         b = random(325);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = " Status = Object detected";
            document.getElementById("objs").innerHTML = "Total No of objects detected = " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x + 11, objects[i].y + 11);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }

}