let world = [];
let chooser;
let chooserIndex = 0;
let chooserStep = 28;
let aliens = [];
let player;

let sizeUnit;

let wall_texture;
let stone_texture;
let explosion_gif;
let gun_shot_sound;
let wall_break_sound;

let tank_direction = 'up';
let directions = ['up', 'down', 'left', 'right'];

let fire = false;
let tankShouldMove = false;
let isPlaying = false;

let hp;
let hpInner;

let enemies = 0;
let maxEnemies = 3;

let level = {
  num: 1,
  totalEnemies: 20,
  map:
    'ww  wwww  ww\n' +
    'w          w\n' +
    '       w    \n' +
    '  wwwwwwww  \n' +
    '   w        \n' +
    '      s w  s\n' +
    '  wwwwwwww t\n' +
    '   w        \n' +
    '            \n' +
    '      w     \n' +
    'w    www   w\n' +
    'ww  ww ww ww\n'
}


function handleKeyIsDown()
{
  if(isPlaying)
  {
    if (keyIsDown(LEFT_ARROW))
    {
      if (tank_direction == 'left')
      {
        tankShouldMove = true;

      } else tank_direction = 'left';

    } else if (keyIsDown(RIGHT_ARROW))
    {
      if (tank_direction == 'right')
      {
        tankShouldMove = true;

      } else tank_direction = 'right';

    } else if (keyIsDown(UP_ARROW))
    {
      if (tank_direction == 'up')
      {
        tankShouldMove = true;

      } else tank_direction = 'up';

    } else if (keyIsDown(DOWN_ARROW))
    {
      if (tank_direction == 'down')
      {
        tankShouldMove = true;

      } else tank_direction = 'down';

    } else if (keyIsDown(32))
    {
      fire = true;
    }
  }
}
function keyPressed()
{
  if(!isPlaying){
    if (keyCode === (UP_ARROW))
    {
      if(chooserIndex>0){
        chooser.move(0, chooserStep*-1)
        chooserIndex--;
      }

    } else if (keyCode === DOWN_ARROW)
    {
      if(chooserIndex<2){
        chooser.move(0, chooserStep)
        chooserIndex++;
      }

    } else if (keyIsDown(32))
    {
      setTimeout( _ => {
        makeDiv();
        isPlaying = true;
      }, 200)
    }
  }
}

function preload()
{
  wall_texture = loadImage('/images/brick.jpg');

  stone_texture = loadImage('/images/stone.png');

  explosion_gif = loadImage('/images/explosion.gif')

  gun_shot_sound = getSound('/sounds/gun_shot.wav');

  gun_shot_sound.sound.volume = 0.2;

  gun_shot_sound.sound.loop = false;

  wall_break_sound = getSound('/sounds/wall_break.mp3');

  wall_break_sound.sound.volume = 0.2;

  wall_break_sound.sound.loop = false;
}

function setup() {
  createCanvas(500, 500);

  rectMode(CENTER);
  angleMode(DEGREES);

  let options = [
    createVector(170 , 275), // location
    color(234,125,34), // color
    20,  // size
    explosion_gif, // explosion_gif
    gun_shot_sound // gun shot sound url
  ];

  chooser = new Player(...options);

  let rows = level.map.split('\n');

  for (let j = 0; j <= rows.length - 1; j++)
  {
    sizeUnit = width / rows[j].length;

    for (let i = 0; i <= rows[j].length; i++)
    {
      let currentChar = rows[j].charAt(i);

      if (currentChar == 'w')
      {
        let options = [
          createVector(i * sizeUnit + sizeUnit/2, j * sizeUnit +sizeUnit/2), // location
          sizeUnit, // color
          wall_texture, // wall image
          wall_break_sound // wall break sound
        ];
        world.push(new Wall(...options));

      } else if (currentChar == 't')
      {
        let options = [
          createVector(i * sizeUnit + sizeUnit/2+6, j * sizeUnit+sizeUnit/2+6), // location
          color(234,125,34), // color
          sizeUnit,  // size
          explosion_gif, // explosion_gif
          gun_shot_sound // gun shot sound url
        ];

        player = new Player(...options);

      } else if (currentChar == 's')
      {
        let options = [
          createVector(i * sizeUnit + sizeUnit/2, j * sizeUnit + sizeUnit/2),
          sizeUnit,
          stone_texture
        ];
        world.push(new Stone(...options));
      }
      else if (currentChar == ' ')
      {
        if (enemies < maxEnemies)
        {
          let options = [
            createVector(i * sizeUnit + 28 , j * sizeUnit + 28 ), // location
            color(234, 0, 54), // color
            sizeUnit, // size
            directions, // directions Array
            explosion_gif, // explosion_gif
            gun_shot_sound // gun shot sound url
          ];

          aliens.push(new Alien(...options));
          enemies++;
        }
      }
    }
  }

  player.setWorld(world);
  world.push(player);
  world.push(...aliens);
}

function drawMenu()
{
  background(0);
  fill(255)

  textFont('Orbitron')
  textSize(20)
  text('I -', 50, 50)


  noStroke()
  text('00 H1 - 2000', 170, 50)

  textSize(70)
  text('TANK 1A', 85, 150)
  text('2020', 135, 220)

  textSize(20)
  text('1 Player', 200, 280)
  text('2 Players', 200, 310)
  text('Construction', 200, 340)

  text('2020', 220, 400)

  stroke(1)

  chooser.setDirection('right')
  chooser.show()
}


function draw()
{
  drawMenu();

  if(isPlaying){
    handleKeyIsDown();

    updateHP();

    background(0);

    for (let i = world.length-1; i >= 0; i--)
    {
      let obj = world[i];

      obj.type = obj.constructor.name.toLowerCase();

      for (let i = aliens.length - 1; i > 0; i--)
      {
        let alien = aliens[i];

        for(let j = alien.bullets.length - 1; j > 0; j--)
        {
          let bullet = alien.bullets[j];

          if (bullet.hits(obj))
          {
            if (obj.type === 'stone')
            {
              bullet.deflect();

            } else if (bullet.isDeflected)
            {
              obj.addDamage(bullet.damage, bullet.angle);

              updateHP();

              bullet.burst();

            } else if (!bullet.isDeflected && obj !== alien)
            {
              obj.addDamage(bullet.damage, bullet.angle);

              bullet.burst();
            }
          }
        }
      }

      for (let i = player.bullets.length -1; i > 0; i--)
      {
        let bullet = player.bullets[i];

        if (bullet.hits(obj))
        {
          if (obj.type === 'stone')
          {
            bullet.deflect();

          } else if (bullet.isDeflected)
          {
            obj.addDamage(bullet.damage, bullet.angle);

            updateHP();

            bullet.burst();

          } else if (!bullet.isDeflected && obj !== player)
          {
            obj.addDamage(bullet.damage, bullet.angle);

            bullet.burst();
          }
        }
      };

      if (obj.toDelete) world.splice(i, 1);

      if (obj.type === 'wall')
      {
        obj.show();

      } else if (obj.type === 'player')
      {
        obj.setDirection(tank_direction);

        if (tankShouldMove)
        {
          obj.canMoveThrough(world);

          obj.move();

          tankShouldMove = false;
        }

        obj.show();

        if (fire)
        {
          obj.fire();

          fire = false;
        }

      } else if (obj.type === 'alien')
      {
        obj.show();

      } else if(obj.type === 'stone')
      {
        obj.show();
      }

    }
  }
}

function makeDiv(){
  let div = createElement('div');

  div.addClass('title-container');

  let p = createElement('p');

  hp = createElement('div');

  hp.style('background', 'red');

  hp.style('height', '10px');

  hp.style('width', '100%');

  hpInner = createElement('div');

  hpInner.style('background', 'green');

  hpInner.parent(hp)

  hpInner.style('width', '100%');

  hpInner.style('height', '100%');

  hp.parent(div)

  p.html('LEVEL: ' + level.num);

  p.parent(div)

  let h1 = createElement('h1');

  h1.html('Tank Game');

  h1.parent(div)

}

function updateHP()
{
  let width = map(player.hp, 0, 150, 0, parseInt(hp.style('width'), 10));
  hpInner.style('width', width+'%');
}