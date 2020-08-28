class Stone extends WorldObject
{
  constructor(position, size, texture)
  {
    super(position, size, 150);

    this.texture = texture;
    this.isDestructible = false;
    this.toDelete = false;
  }

  show(){
    fill(255);
    if (this.hp <= 0) {
      this.toDelete = true;
    } else {
      image(this.texture, this.position.x, this.position.y, this.size, this.size * this.hp/150);
    }
  }
}