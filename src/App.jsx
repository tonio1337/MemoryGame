import { Card } from "./components/card";
import { GameHeader } from "./components/GameHeader";

const CardValues=[
  "🐉", 
  "🚀", 
  "💎", 
  "🌊",
  "🐉", 
  "🚀", 
  "💎", 
  "🌊",
  "🍒", 
  "☀️", 
  "🌠", 
  "🐈",
  "🍒", 
  "☀️", 
  "🌠", 
  "🐈",
];

function App(){
  const [cards, SetCards] = UseState([])

  const InitiliazeGame = () => {
      // Shuffles Cards
     console.log(CardValues);
     const FinalCards = CardValues.map((value, index) => (
      {
        id:index,
        value,
        isFlipped: false,
        isMatched: false
      }))
      console.log(CardValues);
    }
  return (
    <div className="app">
      <GameHeader score={3} moves={10}/>
      <div className="cards-grid">
        {CardValues.map((card)=> (
          <Card card={card} />        
        ))}
      </div>
    </div>
  );
}

export default App
