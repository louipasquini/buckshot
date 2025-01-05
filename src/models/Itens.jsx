import cervejafoto from "../assets/cerveja.jpg"
import algemafoto from "../assets/algema.jpg"
import canivetefoto from "../assets/canivete.jpg"
import cigarrofoto from "../assets/cigarro.jpg"
import lupafoto from "../assets/lupa.jpg"

class Item {
  constructor(name,description) {
    this.name = name;
    this.description = description;
  }
}

class Lupa extends Item {
  constructor(name,description) {
    super(name,description)
    this.image = lupafoto
  }

  action(player,game,gun,enemy) {
    if (gun.bullets[gun.bullets.length - 1]==1) {
      game.lupa.push("Verdadeira") 
    } else {
      game.lupa.push("Falsa")
    }
  }
}

class Cigarro extends Item {
  constructor(name,description) {
    super(name,description)
    this.image = cigarrofoto
  }

  action(player,game,gun,enemy) {
    if (player.life == 6) {
      return "Não é possível completar essa ação."
    } else {
      player.life += 1;
      return "Vida recuperada."
    }
  }
}

class Canivete extends Item {
  constructor(name,description) {
    super(name,description)
    this.image = canivetefoto
  }

  action(player,game,gun,enemy) {
    gun.damage += 1
  }
}

class Cerveja extends Item {
  constructor(name,description) {
    super(name,description)
    this.image = cervejafoto
  }

  action(player,game,gun,enemy) {
    game.before.push(game.gun.bullets.pop())
    game.bullets = game.gun.bullets.reduce((contador, valor) => {
      if (valor === 0) {
        contador.falsas++;
      } else if (valor === 1) {
        contador.verdadeiras++;
      }
      return contador;
    }, {falsas: 0, verdadeiras: 0});
    
  }
}

class Algema extends Item {
  constructor(name,description) {
    super(name,description)
    this.image = algemafoto
  }

  action(player,game,gun,enemy) {
    enemy.locked = true
  }
}

const lupa = new Lupa("Lupa","Mostra a próxima bala.")
const cigarro = new Cigarro("Cigarro","Dá +1 de vida ao player.")
const canivete = new Canivete("Canivete", "Dobra o dano da arma.")
const cerveja = new Cerveja("Cerveja","Descarta uma bala.")
const algema = new Algema("Algema", "Passa a vez do inimigo.")

const itens = [lupa,cigarro,canivete,cerveja,algema]

export default itens
