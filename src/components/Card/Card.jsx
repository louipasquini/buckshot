import "./Card.css"

const Card = ({index,onHandleClick,item,player,enemy,game,gun}) => {
  const handleClick = () => {
    onHandleClick(index,player,enemy)
    item.action(player,game,gun,enemy)
  }

  return <div onClick={player.turn === true ? handleClick : false} className="card" style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%), 
              url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover"}}>
    <h1>{item.name}</h1>
    <p>{item.description}</p>
  </div>
}

export default Card;