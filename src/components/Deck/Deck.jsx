import "./Deck.css"
import { useState } from "react"

const Deck = ({lista}) => {

  return <div className="deck">
    {lista}
  </div>
}

export default Deck;