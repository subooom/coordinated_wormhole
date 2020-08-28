let tankSize;

class Tank extends WorldObject
{
  constructor(position, c, size, explosion_gif)
  {
    super(position, size, 50);

    this.color = c;
    this.nozzleIsNotHot = true;
    this.bullets = [];
    this.explosion_gif = explosion_gif;
    this.hasMoved = false;
    this.gun_shot_volume = .2;
    this.canMoveTo = {
      up: true,
      down: true,
      right: true,
      left: true,
    };
    this.map = {
      up:
        ' * \n' +
        '***\n' +
        '* *\n',
      down:
        '* *\n' +
        '***\n' +
        ' * \n',
      left:
        ' **\n' +
        '** \n' +
        ' **\n',
      right:
        '** \n' +
        ' **\n' +
        '** \n'
    }
  }

  setWorld(world)
  {
    this.world = world;
  }

  fire()
  {
    if (this.nozzleIsNotHot)
    {
      if (this.face == 'left')
      {
        this.fireBullet(this.position.x - 15, this.position.y - this.size / 2 + 15);

      } else if (this.face == 'right')
      {
        this.fireBullet(this.position.x + 15, this.position.y - this.size / 2 + 11);

      } else if (this.face == 'up')
      {
        this.fireBullet(this.position.x - 5, this.position.y - this.size / 2 - 5);

      } else if (this.face == 'down')
      {
        this.fireBullet(this.position.x - 7, this.position.y - this.size / 2 + 25);
      }
    }
  }

  fireBullet(x,y)
  {
    this.bullets.push(new Bullet(createVector(x, y), 5, color(255, 0, 0), this.face, this.explosion_gif));

    this.nozzleIsNotHot = false;

    console.log('firing')
    // gun_shot_sound.play();
    fill(0, 255, 0);

    setTimeout(_=> this.nozzleIsNotHot = true, 300);
  }

  setHasMoved(hasMoved)
  {
    this.hasMoved = hasMoved;
  }

  setDirection(face)
  {
    this.face = face;
  }

  move(x, y)
  {
    if (x, y) {
      this.position.x += x;
      this.position.y += y;
    } else {
      if (this.face == 'left')
      {
        if (this.canMoveTo.left)
        {
          this.position.x -= 2;
          this.position.y += 0;
        } else
        {
          this.position.x =  this.size/2 + 6;
        }
      } else if (this.face == 'right')
      {
        if (this.canMoveTo.right)
        {
          this.position.x += 2;
          this.position.y += 0;
        } else
        {
          this.position.x = width - this.size/2 + 6;
        }
      } else if (this.face == 'up')
      {
        if (this.canMoveTo.up)
        {
          this.position.x += 0;
          this.position.y -= 2;
        } else
        {
          this.position.y = this.size/2 + 6;
        }
      } else if (this.face == 'down')
      {
        if (this.canMoveTo.down)
        {
          this.position.x += 0;
          this.position.y += 2;
        } else
        {
          this.position.y = height - this.size/2 + 6;
        }
      }
      this.hasMoved = true;
    }
  }

  checkEdges()
  {
    this.canMoveTo.left = !(this.position.x - this.size/2 - 6 <= 0);
    this.canMoveTo.right = !(this.position.x + this.size/2 - 6 >= width);
    this.canMoveTo.up = !(this.position.y - this.size/2 - 6  <= 0);
    this.canMoveTo.down = !(this.position.y +  this.size/2 - 6 >= height);
  }

  hits(obj)
  {

    if(obj.position.y - obj.size <= this.position.y &&
      obj.position.y + obj.size >= this.position.y &&
      obj.position.x + obj.size >= this.position.x &&
      obj.position.x - obj.size <= this.position.x + this.size) {
        return true
      }
  }


  canMoveThrough()
  {
    this.checkEdges();

    for (let i = 0; i < world.length; i++)
    {
      let obj = world[i];

      if (obj !== this)
      {
        if (obj.position.x === this.position.x - this.size)
        {
          if(obj.position.y === this.position.y - this.size){

            // is to the left
            console.log('object to the left')
          }
        }
      }

    }
  }

  show()
  {
    for(let i= this.bullets.length-1; i>0; i--)
    {
      let bullet = this.bullets[i];

      if (bullet.isOffscreen() || bullet.toDelete)
      {
        this.bullets.splice(i, 1);

      } else
      {
        bullet.show();
        bullet.update();
      }
    }

    if (this.hp > 0)
    {
      let rows = this.map[this.face].split('\n');

      for (let j = 0; j <= rows.length - 1; j++)
      {
        tankSize = this.size / rows[j].length;

        for (let i = 0; i <= rows[j].length; i++)
        {
          if (rows[j].charAt(i) == '*')
          {
            fill(this.color);
            rect((this.position.x + (i * tankSize)) - this.size / 2, (this.position.y + (j * tankSize)) - this.size / 2, tankSize, tankSize);
          }
        }
      }
    } else {
      imageMode(CENTER);
      image(this.explosion_gif, this.position.x, this.position.y, this.size, this.size)
      setTimeout( _ => this.toDelete = true, 100)
      this.bullets = [];
    }
  }
}