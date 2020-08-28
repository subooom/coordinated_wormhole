class Wall extends WorldObject
{
  constructor(position, size, texture, wall_break_sound)
  {
    super(position, size, 150);

    this.texture = texture;

    this.wall_break_sound = wall_break_sound;

    this.toDelete = false;


    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;
  }

  show(){
    fill(255);

    if (this.hp <= 0)
    {
      this.toDelete = true;

    } else {
      let damage = {
        up: false,
        down: false,
        left: false,
        right: false,
      };
      if(this.damageAngle)
      {
        damage[this.damageAngle] = true;
      }


      if (damage.up)
      {
        this.y = this.position.y;
        // wall_break_sound.play();

        this.h = this.size * this.hp/150;

      } else if (damage.down)
      {
        this.h = this.size * this.hp/150;
        // wall_break_sound.play();

        this.y = this.position.y + (this.size - this.h);

      } else if (damage.left)
      {
        // bullet is travelling left so the damage is on the right
        // wall_break_sound.play();
        this.w = this.size * this.hp / 150;


      } else if (damage.right)
      {
        // bullet is travelling right so the damage is on the left
        // wall_break_sound.play();

        this.w = this.size * this.hp/150;

        this.x = this.position.x + this.size - this.w;

      }
      imageMode(CENTER);


      image(this.texture, this.x || this.position.x, this.y || this.position.y, this.w || this.size, this.h || this.size);
    }
  }
}