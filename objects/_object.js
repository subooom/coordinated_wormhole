class WorldObject
{
  constructor(position, size, hp)
  {
    this.position = position;
    this.size = size;
    this.hp = hp;
    this.damageAngle = null;
    this.toDelete = false;
    this.isDestructible = true;
  }

  addDamage(damage, angle)
  {
    if (this.isDestructible)
    {
      this.damageAngle = angle;
      this.hp -= damage;
    }
  }
}