class Arma {
  constructor(){
    this.bullets = [];
    this.damage = 1;
  }

  shot_player(game) {
    if (this.bullets[this.bullets.length-1] == 1) {
      game.players[0].life -= this.damage;
      game.before.push(this.bullets.pop())
      return game
    } else {
      game.before.push(this.bullets.pop())
      return game
    }
  }

  shot_enemy(game) {
    if (this.bullets[this.bullets.length-1] == 1) {
      game.players[1].life -= this.damage;
      game.before.push(this.bullets.pop())
      return game
    } else {
      game.before.push(this.bullets.pop())
      return game
    }
  }

  reload() {
    let many = Math.floor(Math.random() * (8 - 2) + 2);
    for (let i=0;i<many;i++) {
      this.bullets.push(Math.floor(Math.random() * 2));
    }

    while(this.bullets.length>8) {
      this.bullets = []
    }

    many = 2

  }
}

export default Arma;