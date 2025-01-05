import './App.css'
import itens from "./models/Itens.jsx"
import Player from "./models/Player.jsx"
import Game from "./models/Game.jsx"
import Arma from "./models/Arma.jsx"
import Start from './components/Start/Start.jsx'
import Deck from './components/Deck/Deck.jsx'
import { useState } from 'react'
import Card from './components/Card/Card.jsx'
import { flushSync } from 'react-dom'
import cartuchoVazio from "./assets/cartucho_vazio.png"
import cartuchoCheio from "./assets/cartucho_cheio.png"
import bangShot from "./assets/Bang-PNG-HD-Image.png"

function App() {
  let [playerOne,setPlayerOne] = useState(new Player(0))
  let [playerTwo,setPlayerTwo] = useState(new Player(1))
  let [arma,setArma] = useState(new Arma())
  let [game,setGame] = useState(new Game(playerOne,playerTwo,arma,itens))
  let [listaPlayerOne,setListaPlayerOne] = useState([])
  let [listaPlayerTwo,setListaPlayerTwo] = useState([])

  let [displayShot, setDisplayShot] = useState("none")

  let [displayCount, setDisplayCount] = useState("none")
  let [count,setCount] = useState("")

  let [lockPlay,setLockPlay] = useState(false)

  const deletarItemOne = (index,player,enemy) => {
    game.players[player.status].itens.splice(index,1)
    if (player.status === 0) {
      setListaPlayerOne(createDeck(game.players[player.status],game.players[enemy.status],game,game.gun))
    } else {
      setListaPlayerTwo(createDeck(game.players[player.status],game.players[enemy.status],game,game.gun))
    }
  }

  const createDeck = (player,enemy,game,gun) => {
    let deck = []
    for (let i=0;i<player.itens.length;i++) {
      deck.push(<Card index={i} onHandleClick={deletarItemOne} item={player.itens[i]} player={player} enemy={enemy} game={game} gun={gun}></Card>)
    }
    return deck
  }

  const [statusArma,setStatusArma] = useState("Status da Arma")

  const startRound = () => {
    game.start_round()
    setGame(game)
    setPlayerOne(game.players[0])
    setPlayerTwo(game.players[1])
    setListaPlayerOne(createDeck(game.players[0],game.players[1],game,game.gun))
    setListaPlayerTwo(createDeck(game.players[1],game.players[0],game,game.gun))
  }

  const shotPlayerOne = () => {
    if (game.players[0].turn === false || game.gun.bullets.length === 0 || lockPlay === true) {
      return false
    } else {
      setLockPlay(true)
      if (game.gun.bullets[game.gun.bullets.length-1] === 1) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setDisplayCount("none")
          setDisplayShot("")
        },3000)
        setTimeout(()=>{
          setDisplayShot("none")
        },4000)
      } else if (game.gun.bullets[game.gun.bullets.length-1] === 0) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setCount("click")
        },3000)
        setTimeout(()=>{
          setDisplayCount("none")
        },4000)
      }
      setTimeout(()=>{
        setGame(game.gun.shot_player(game))
        game.generate_count()
        setPlayerOne(game.players[0])
      setPlayerTwo(game.players[1])
      setListaPlayerOne(createDeck(game.players[0],game.players[1],game,game.gun))
      setListaPlayerTwo(createDeck(game.players[1],game.players[0],game,game.gun))
      setLockPlay(false)
      if (game.players[0].life <= 0 || game.players[1].life <= 0) {
        setStatusArma(game.players[0].life <= 0 ? "Player 1 perdeu!" : "Player 2 perdeu!")
        setTimeout(()=>{
          location.reload()
        },2000)
      }
      if (game.gun.bullets.length === 0) {
        startRound()
      }
      if (game.before[game.before.length-1] === 1 && game.players[1].locked === false) {
        game.players[0].turn = false
        game.players[1].turn = true
        game.gun.damage = 1
      } else {
        game.gun.damage = 1
        if (game.players[1].locked === true && game.before[game.before.length-1] === 1) {
          game.players[1].locked = false
        }
        return false
      }
      },4000)
      
    }
  }

  const shotPlayerTwo = () => {
    if (game.players[1].turn === false || game.players[1].locked === true || game.gun.bullets.length === 0 || lockPlay === true) {
      return false
    } else {
      setLockPlay(true)
      if (game.gun.bullets[game.gun.bullets.length-1] === 1) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setDisplayCount("none")
          setDisplayShot("")
        },3000)
        setTimeout(()=>{
          setDisplayShot("none")
        },4000)
      } else if (game.gun.bullets[game.gun.bullets.length-1] === 0) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setCount("click")
        },3000)
        setTimeout(()=>{
          setDisplayCount("none")
        },4000)
      }
      setTimeout(()=>{
        setGame(game.gun.shot_player(game))
        game.generate_count()
        setPlayerOne(game.players[0])
      setPlayerTwo(game.players[1])
      setListaPlayerOne(createDeck(game.players[0],game.players[1],game,game.gun))
      setListaPlayerTwo(createDeck(game.players[1],game.players[0],game,game.gun))
      setLockPlay(false)
      if (game.players[0].life <= 0 || game.players[1].life <= 0) {
        setStatusArma(game.players[0].life <= 0 ? "Player 1 perdeu!" : "Player 2 perdeu!")
        setTimeout(()=>{
          location.reload()
        },2000)
      }
      if (game.gun.bullets.length === 0) {
        startRound()
      }
      if (game.players[0].locked === false) {
        game.players[1].turn = false
        game.players[0].turn = true
        game.gun.damage = 1
      } else {
        game.players[0].locked = false
        game.gun.damage = 1
      }

      },4000)
      
    }
  }

  const shotEnemyOne = () => {
    if (game.players[0].turn === false || game.players[0].locked === true || game.gun.bullets.length === 0 || lockPlay === true) {
      return false
    } else {
      setLockPlay(true)
      if (game.gun.bullets[game.gun.bullets.length-1] === 1) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setDisplayCount("none")
          setDisplayShot("")
        },3000)
        setTimeout(()=>{
          setDisplayShot("none")
        },4000)
      } else if (game.gun.bullets[game.gun.bullets.length-1] === 0) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setCount("click")
        },3000)
        setTimeout(()=>{
          setDisplayCount("none")
        },4000)
      }
      setTimeout(()=>{
        setGame(game.gun.shot_enemy(game))
        game.generate_count()
        setPlayerOne(game.players[0])
      setPlayerTwo(game.players[1])
      setListaPlayerOne(createDeck(game.players[0],game.players[1],game,game.gun))
      setListaPlayerTwo(createDeck(game.players[1],game.players[0],game,game.gun))
      setLockPlay(false)
      if (game.players[0].life <= 0 || game.players[1].life <= 0) {
        setStatusArma(game.players[0].life <= 0 ? "Player 1 perdeu!" : "Player 2 perdeu!")
        setTimeout(()=>{
          location.reload()
        },2000)
      }
      if (game.gun.bullets.length === 0) {
        startRound()
      }
      if (game.players[1].locked === false) {
        game.players[0].turn = false
        game.players[1].turn = true
        game.gun.damage = 1
      } else {
        game.players[1].locked = false
        game.gun.damage = 1
      }

      },4000)
      
    }
  }

  const shotEnemyTwo = () => {
    if (game.players[1].turn === false || game.players[1].locked === true || game.gun.bullets.length === 0 || lockPlay === true) {
      return false
    } else {
      setLockPlay(true)
      if (game.gun.bullets[game.gun.bullets.length-1] === 1) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setDisplayCount("none")
          setDisplayShot("")
        },3000)
        setTimeout(()=>{
          setDisplayShot("none")
        },4000)
      } else if (game.gun.bullets[game.gun.bullets.length-1] === 0) {
        setDisplayCount("")
        setCount(".")
        setTimeout(()=>{
          setCount("..")
        },1000)
        setTimeout(()=>{
          setCount("...")
        },2000)
        setTimeout(()=>{
          setCount("click")
        },3000)
        setTimeout(()=>{
          setDisplayCount("none")
        },4000)
      }
      setTimeout(()=>{
        setGame(game.gun.shot_enemy(game))
        game.generate_count()
        setPlayerOne(game.players[0])
      setPlayerTwo(game.players[1])
      setListaPlayerOne(createDeck(game.players[0],game.players[1],game,game.gun))
      setListaPlayerTwo(createDeck(game.players[1],game.players[0],game,game.gun))
      setLockPlay(false)
      if (game.players[0].life <= 0 || game.players[1].life <= 0) {
        setStatusArma(game.players[0].life <= 0 ? "Player 1 perdeu!" : "Player 2 perdeu!")
        setTimeout(()=>{
          location.reload()
        },2000)
      }
      if (game.gun.bullets.length === 0) {
        startRound()
      }
      if (game.before[game.before.length-1] === 1 && game.players[0].locked === false) {
        game.players[1].turn = false
        game.players[0].turn = true
        game.gun.damage = 1
      } else {
        game.gun.damage = 1
        if (game.players[0].locked === true) {
          game.players[0].locked = false
        }
        return false
      }
      },4000)
      
    }
  }

  const handleStart = () => {
    if (game.gun.bullets.length === 0) {
      startRound()
    }
  }

  return (
    <div className='app'>
      <div className="enemy-deck">
      <div className="status">
      <h1 style={{color: `${game.players[1].turn === false || game.players[1].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Player 2</h1>
      <div className='life-bar'>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life >= 1 ? "green" : "#2f2f2f"}`}}></div>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life >= 2 ? "green" : "#2f2f2f"}`}}></div>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life >= 3 ? "green" : "#2f2f2f"}`}}></div>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life >= 4 ? "green" : "#2f2f2f"}`}}></div>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life >= 5 ? "green" : "#2f2f2f"}`}}></div>
        <div className="status-life" style={{backgroundColor: `${game.players[1].life === 6 ? "green" : "#2f2f2f"}`}}></div>
      </div>
      <h3 style={{color: `${game.players[1].turn === false || game.players[1].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Status: {game.players[1].locked === false ? "Livre" : "Algemado"}</h3>
      <h3 style={{color: `${game.players[1].turn === false || game.players[1].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Turno: {game.players[1].turn === false || lockPlay === true ? "Aguarde" : "Seu turno"}</h3>
      <button onClick={shotPlayerTwo} style={{backgroundColor: `${game.players[1].turn === false || game.players[1].locked === true || lockPlay === true ? "#2f2f2f" : "green"}`, color: `${game.players[1].turn === false || game.players[1].locked === true ? "#ffffff20" : "azure"}`}}>Atirar no Inimigo</button>
      <button onClick={shotEnemyTwo} style={{backgroundColor: `${game.players[1].turn === false || game.players[1].locked === true || lockPlay === true ? "#2f2f2f" : "green"}` , color: `${game.players[1].turn === false || game.players[1].locked === true ? "#ffffff20" : "azure"}`}}>Atirar em si próprio</button>
     </div>
      <Deck lista={listaPlayerTwo}/>
      </div>
      <div className="battlefield">
        <div className="status_arma">
          <h1>{statusArma}</h1>
          <div className="cartucheira">
          <div style={{display: `${game.bullets.falsas >= 1 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 2 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 3 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 4 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 5 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 6 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas >= 7 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio} alt="" /></div>
          <div style={{display: `${game.bullets.falsas === 8 ? "" : "none"}`}} className="cartucho"><img src={cartuchoVazio}alt="" /></div>
          </div>
          <div className="cartucheira">
          <div style={{display: `${game.bullets.verdadeiras >= 1 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 2 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 3 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 4 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 5 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 6 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras >= 7 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          <div style={{display: `${game.bullets.verdadeiras === 8 ? "" : "none"}`}} className="cartucho"><img src={cartuchoCheio} alt="" /></div>
          </div>
          <p>Lupa: {game.lupa[game.lupa.length -1]}</p>
        </div>
        <div className="centro">
          <h1 style={{position: "absolute", transition: "all .2s ease-in-out", display: `${displayCount}`}}>{count}</h1>
          <img style={{position: "absolute", transition: "all .2s ease-in-out", display: `${displayShot}`}} src={bangShot} alt="" />
        </div>
        <div className="deck-arma">
          <img src={game.before[game.before.length-1] === 0 ? cartuchoVazio : cartuchoCheio} alt="" />
          <Start start={handleStart} />
        </div>
      </div>
      <div className="friendly-deck">
      <Deck lista={listaPlayerOne}/>
      <div className="status">
        <h1 style={{color: `${game.players[0].turn === false || game.players[0].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Player 1</h1>
        <div className='life-bar'>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life >= 1 ? "green" : "#2f2f2f"}`}}></div>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life >= 2 ? "green" : "#2f2f2f"}`}}></div>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life >= 3 ? "green" : "#2f2f2f"}`}}></div>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life >= 4 ? "green" : "#2f2f2f"}`}}></div>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life >= 5 ? "green" : "#2f2f2f"}`}}></div>
          <div className="status-life" style={{backgroundColor: `${game.players[0].life === 6 ? "green" : "#2f2f2f"}`}}></div>
        </div>
        <h3 style={{color: `${game.players[0].turn === false || game.players[0].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Status: {game.players[0].locked === false ? "Livre" : "Algemado"}</h3>
        <h3 style={{color: `${game.players[0].turn === false || game.players[0].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Turno: {game.players[0].turn === false || lockPlay === true ? "Aguarde" : "Seu turno"}</h3>
        <button onClick={shotEnemyOne} style={{backgroundColor: `${game.players[0].turn === false || lockPlay === true ? "#2f2f2f" : "green"}`, color: `${game.players[0].turn === false || game.players[0].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Atirar no Inimigo</button>
        <button onClick={shotPlayerOne} style={{backgroundColor: `${game.players[0].turn === false || lockPlay === true ? "#2f2f2f" : "green"}`, color: `${game.players[0].turn === false || game.players[0].locked === true || lockPlay === true ? "#ffffff20" : "azure"}`}}>Atirar em si próprio</button>
    </div>
      </div>
    </div>
  )
}

export default App
