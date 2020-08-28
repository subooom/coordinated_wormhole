class Bullet extends WorldObject
{
  constructor(position, velocity, color, angle, burst_gif)
  {
    super(position, 10, 50);
    this.velocity = velocity;
    this.angle = angle;
    this.burst_gif = burst_gif;
    this.isDeflected = false;
    this.xOff = 0;
    this.yOff = 10000;
    this.color = color;
    this.damage = 50;
    this.toDelete = false;

    this.deacceleration  = 0.001;
  }

  deflect()
  {
    this.velocity += this.velocity*.2;
    this.damage -= this.damage*.75;
    this.deacceleration  += this.deacceleration *.2;

    this.isDeflected = true;

    if (this.angle === 'up')
    {
      this.angle = 'down';

    } else if (this.angle === 'down')
    {
      this.angle = 'up';

    } else if (this.angle === 'right')
    {
      this.angle = 'left';

    } else if (this.angle === 'left')
    {
      this.angle = 'right';
    }

  }

  burst()
  {
    this.toDelete = true;
  }

  hits(obj)
  {
    let oY = obj.y || obj.position.y;

    let oX = obj.x || obj.position.x;

    let oW = obj.w || obj.size;

    let oH = obj.h || obj.size

    return (oY <= this.position.y &&
      oY + oH >= this.position.y &&
      oX + oW >= this.position.x &&
      oX <= this.position.x)
  }

  show()
  {
    fill(this.color);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size, this.size);
  }

  isOffscreen()
  {
    return (this.position.y + this.size < 0 || this.position.y  - this.size > height || this.position.x + this.size < 0 || this.position.x - this.size > width);
  }

  update()
  {
    this.velocity -= this.deacceleration;
    if(this.angle === 'up')
    {
      this.position.y -= this.velocity;

    } else if(this.angle === 'down')
    {
      this.position.y += this.velocity;

    } else if(this.angle === 'right')
    {
      this.position.x += this.velocity;

    } else if(this.angle === 'left')
    {
      this.position.x -= this.velocity;
    }
  }
}