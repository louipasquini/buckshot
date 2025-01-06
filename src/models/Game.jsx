class Game {
  constructor(player_one, player_two, gun, itens) {
    this.players = [player_one,player_two];
    this.gun = gun;
    this.bullets = gun.bullets.reduce((contador, valor) => {
      if (valor === 0) {
        contador.falsas++;
      } else if (valor === 1) {
        contador.verdadeiras++;
      }
      return contador;
    }, {falsas: 0, verdadeiras: 0});
    this.itens = itens;
    this.before = [];
    this.lupa = [];
  }

  generate_count() {
    this.bullets = this.gun.bullets.reduce((contador, valor) => {
      if (valor === 0) {
        contador.falsas++;
      } else if (valor === 1) {
        contador.verdadeiras++;
      }
      return contador;
    }, {falsas: 0, verdadeiras: 0});
  }

  start_round() {
    let starting = 0
    while (this.bullets.falsas === 0 || this.bullets.verdadeiras === 0 || this.bullets.falsas - this.bullets.verdadeiras > 2 || this.bullets.verdadeiras - this.bullets.falsas > 2 || this.bullets.verdadeiras + this.bullets.falsas > 8 && starting < 100) {
      this.gun.reload();
      this.generate_count()
      starting += 1
      console.log(starting)
    }
    let num_itens = Math.floor(Math.random() * (4 - 2) + 2)
    for (let i=0;i<num_itens;i++) {
      if (this.players[0].itens.length >= 8) {
        continue;
      } else {
        this.players[0].itens.push(this.itens[Math.floor(Math.random() * 5)])
      }
    }
    for (let i=0;i<num_itens;i++) {
      if (this.players[1].itens.length >= 8) {
        continue;
      } else {
        this.players[1].itens.push(this.itens[Math.floor(Math.random() * 5)])
      }
    }
  }
}

export default Game;