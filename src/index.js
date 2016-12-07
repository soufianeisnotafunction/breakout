//
// $.getJSON('film.json').then  (function(data){
//   console.log(data.films[0]);
// });
//
// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext("2d");
// ctx.fillStyle = "rgb(243, 119, 60)";
// ctx.arc(200,200,150,0,Math.PI*2);
// ctx.fill();
//
//
//
//
// function* Gen(){
//   var index = 1;
//   while(index < 4){
//     yield index++;
//   }
// }
//
// var nextVlaue = Gen();
// console.log(nextVlaue.next().value);
// console.log(nextVlaue.next().value);
// console.log(nextVlaue.next().value);

var game = new Phaser.Game(400, 500, Phaser.AUTO, 'breakout', { preload: preload, create: create , update: update ,hit :hit });

function preload() {

  //  You can fill the preloader with as many assets as your game requires

  //  Here we are loading an image. The first parameter is the unique
  //  string by which we'll identify the image later in our code.

  //  The second parameter is the URL of the image (relative)
  game.load.image('paddle', 'paddle.png');
  game.load.image('brick', 'brick.png');
  game.load.image('ball', 'ball.png');

}

function create() {

  //  This creates a simple sprite that is using our loaded image and
  //  displays it on-screen

  game.stage.backgroundColor = '#3598db';
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.enableBody = true;
  this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  this.paddle = game.add.sprite(200, 450, 'paddle');
  this.paddle.body.immovable = true;

  // Create a group that will contain all the bricks
  this.bricks = game.add.group();

  // Add 25 bricks to the group (5 columns and 5 lines)
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      // Create the brick at the correct position
      var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');

      // Make sure the brick won't move when the ball hits it
      brick.body.immovable = true;

      // Add the brick to the group
      this.bricks.add(brick);
    }
  };

  // Add the ball
  this.ball = game.add.sprite(200, 300, 'ball');

  // Give the ball some initial speed
  this.ball.body.velocity.x = 200;
  this.ball.body.velocity.y = 200;

  // Make sure the ball will bounce when hitting something
  this.ball.body.bounce.setTo(1);
  this.ball.body.collideWorldBounds = true;
}

function update() {
  if (this.left.isDown) this.paddle.body.velocity.x = -300;
  else if (this.right.isDown) this.paddle.body.velocity.x = 300;

  // Stop the paddle when no key is pressed
  else this.paddle.body.velocity.x = 0;
  // Add collisions between the paddle and the ball
  game.physics.arcade.collide(this.paddle, this.ball);

  // Call the 'hit' function when the ball hits a brick
  game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

  // Restart the game if the ball is below the paddle
  if(this.ball.y < this.paddle.y){
      game.state.start('main');
  }


}

 function hit (ball, brick) {
  brick.kill();
}
