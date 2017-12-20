setBackdropURL('./images/boss-backdrop.jpg')
setBackdropStyle("cover")
 

var bb8 = new Image({
  url: "./images/bb8.png",
  width: 35, 
  height: 50,
  x: 0,
  y: 0
})


var replay = new Text({
  text: () => "REPLAY", 
  size: 40, 
  color: "LIME", 
  fontFamily: "arial", 
}) 

replay.showing = false


var game = 'play'

replay.onMouseDown(() => {
	replay.showing = false
	asteroids.forEach(object => object.delete())
	asteroids = []
	score = 0
	bb8.x = 0
	bb8.y = 0
	countDown()

	after(3, "seconds", ()=>{
		defrost();
		game = 'play'
	})
})

forever(() => {
  if (mouseDown && game == 'play') {
    bb8.x = mouseX
    bb8.y = mouseY
  }
})

asteroids = []

var gameStart = ()=>{

	every(0.25, "seconds", ()=>{
		if (game == 'play'){
			var asteroid = new Image({
				url: "./images/star1.png",
			})

			asteroid.x = randomX()

			var which = random(0, 1)
			if (which == 0){
				asteroid.y = maxY			
			} else {
				asteroid.y = minY
			}
			asteroid.pointTowards(bb8.x, bb8.y)
			asteroids.push(asteroid)
			score++
		}
	})	
}


after(3, "seconds", ()=>{
	gameStart()
})

var countDown = ()=>{

	var count = 3
	var countLabel = new Text({
		text: () => count, 
		size: 40,
		color: "red", 
		y: 50
	})

	after(1,"seconds",()=>{
		count--
	})
	after(2,"seconds",()=>{
		count--
	})
	after(3,"seconds",()=>{
		count = "START" 
	})
	after(4,"seconds",()=>{
		countLabel.showing = false
	})	
}

countDown()


forever(()=>{	
	if (game == 'play'){
		asteroids.forEach(asteroid=>{
			asteroid.move(5)			
			if(asteroid.distanceTo(bb8) < 25){
				replay.showing = true
				replay.sendToFront()
				game = 'over'
				console.log(game)
			}
		})		
	}
})

var num = 1

every(0.1, "seconds", ()=>{
	if (game == 'play'){
		asteroids.forEach(asteroid =>{
			if (num == 1){
				asteroid.setImageURL("./images/star1.png")
				num++	
			} else if (num == 2) {
				asteroid.setImageURL("./images/star2.png")
				num++
			} else {
				asteroid.setImageURL("./images/star3.png")
				num = 1
			}

		})
		
	}
})	



var score = 0
var scoreLabel = new Text({
  text: () => "Score " + score, 
  size: 20, 
  color: "red", 
  fontFamily: "arial", 
  y:maxY - 50
})
