import { useState } from 'react';
import { Square } from './components/square';
import { TURNS } from './constans';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

function App() {

const [board, setBoard] = useState(() => {
  const boardFromStorage = window.localStorage.getItem('board')
  if (boardFromStorage) return JSON.parse(boardFromStorage)
  return Array(9).fill(null)
})

const [turn, setTurn] = useState(() => {
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
})

const [winner, setWinner] = useState(null)


const resetGame = () => {
setBoard(Array(9).fill(null))
setTurn(TURNS.X)
setWinner(null)

window.localStorage.removeItem('board')
window.localStorage.removeItem('turn')
}


const updateBoard = (index) => {
  if(board[index]) return
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
 
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)
  //guardar partida
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)

  const newWinerr = checkWinnerFrom(newBoard)
  if (newWinerr) {
    setWinner(newWinerr)
  } else if(checkEndGame(newBoard)) {
    setWinner(false)
  }
}

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>resetear game</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
               {board[index]}
              </Square>
            )
          }
         )
        }
      </section>

      <section className='turn'>
        <Square isSelected ={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

        <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
    
}

export default App
