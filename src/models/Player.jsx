class Player {
  constructor(status) {
    this.status=status
    this.life = 5;
    this.itens = [];
    this.locked = false;
    this.turn = this.status === 0 ? true : false;
  }
}

export default Player