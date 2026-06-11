import { useState, useEffect } from "react";
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

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App(){
  const [cards, setCards] = useState([])
  const [flippedCards,setFlippedCards] = useState([])
  const [matchedCards,setMatchedCards] = useState([])
  const [score,setScore] = useState(0)
  const [moves,setMoves] = useState(0)
  const [isLocked,setIsLocked] = useState(false)

  const InitiliazeGame = () => {
      // Shuffles Cards
     const FinalCards = shuffleArray(CardValues.map((value, index) => (
      {
        id:index,
        value,
        isFlipped: false,
        isMatched: false
      })))
      setCards(FinalCards);
      setIsLocked(false)
      setMoves(0)
      setScore(0)
      setMatchedCards([])
      setFlippedCards([])
      
    }

    useEffect(() => {
      InitiliazeGame();
    }, []);

    const handleCardClick = (card) => {
      // Dont allow flipped cards to be clicked again andor matched
      if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) {
        return;
      }
      
      const newcards = cards.map((c) => {
        if (c.id === card.id){
          return {...c,isFlipped:true}
        } else {
          return c;
        }
      })
     setCards(newcards)
     const newFlippedCards =[...flippedCards,card.id]
     setFlippedCards(newFlippedCards)
     if (flippedCards.length === 1) {
      setIsLocked(true)
      const firstCard = cards.find(c => c.id === flippedCards[0])

      if (firstCard.value === card.value) {
        setTimeout(() => {
          
        setMatchedCards((prev)=>[...prev,firstCard.id,card.id])
        setScore((prev)=> prev +1)
        setCards((prev)=>prev.map((c) => {
          if (c.id === card.id || c.id === firstCard.id){
            return {...c,isMatched:true}
          } else {
            return c;
          }
        }))
        setFlippedCards([])
        setIsLocked(false)
      }, 500); 
      } else{
        setTimeout(() => {
          const flipCardsBack = newcards.map((c)=> {
            if(newFlippedCards.includes(c.id)){
              return {...c, isFlipped:false}
            } else {
              return c;
            }
          })
          setCards(flipCardsBack)
          setIsLocked(false)
          setFlippedCards([])
        }, 1000);
      }
      setMoves((prev)=> prev + 1)
     }
    }

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={InitiliazeGame} gameWon={matchedCards.length === CardValues.length}/>
      <div className="cards-grid">
        {cards.map((card)=> (
          <Card card={card} onClick={handleCardClick} />        
        ))}
      </div>
    </div>
  );
}

export default App
