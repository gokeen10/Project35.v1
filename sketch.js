//Create variables here
var dog, happyDog, dogIMG, happyDogIMG;
var database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;


function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  dog=createSprite(250, 250, 10, 10);
  dog.scale = .5;
  dog.addImage(dogIMG);

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref(' / ').update({
      Food:foodObj.getFoodStock(),
      fedTime:hour()
    })
  }
  
  function addFoods(){
    foodS++;
    database.ref(' / ').update({
      Food:foodS
    })
  }

  feed=createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })


  foodObj.display();

  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref(' / ').update({
    Food:x
  })
}

function addFood() {

}


