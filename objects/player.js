class Player extends Tank {

  constructor(position, c, size, explosion_gif)
  {
    super(position, c, size, explosion_gif);
    this.gun_shot_sound = gun_shot_sound;
    this.gun_shot_volume = .2;

  }

}