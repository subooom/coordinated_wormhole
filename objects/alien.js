class Alien extends Tank {

    constructor(position, c, size, directions, explosion_gif, gun_shot_sound)
    {
      super(position, c, size, explosion_gif);
      this.setDirection(random(directions));
      this.xOff = 0.0;
      this.gun_shot_sound = gun_shot_sound;
      this.gun_shot_volume = .02;
    }

    startBot()
    {
      this.moveInterval = setInterval( _ => {
        this.move();
        this.canMoveThrough();

        if (this.hp<=0)
        {
          clearInterval(this.moveInterval)
        }
        if (random() > 0.6)
        {
          this.fire();
        }
      }, 17)

      this.turnInterval = setInterval( _ => {

        if (this.hp<=0)
        {
          clearInterval(this.turnInterval)
        }

        if (random() > 0.3)
        {
          this.setDirection(random(directions));
        }
        this.xOff  += 0.1;
      }, 1000)
    }
}