import { useState } from 'react'
import useTictactoe from '../hooks/use-tic-tac-toe';

function TicTacToe({boardSize = 3}) {

    const {board , handleClick , resetGame , calculateWinner , getStatusMessage} =  useTictactoe(boardSize);     

  return (
    <>
      <div className='game' style={{"--board-size" : boardSize}}>
        <div className="status">
          {getStatusMessage()}
          <button className='reset' onClick={resetGame}>Reset Game</button>
        </div>
        <div className='board'>
          {
            board.map((b, index) => {
              return <button className='cell' key={index} onClick={() => handleClick(index)}
              disabled = {b !== null}
              >
               {b}
              </button>
            })
          }
        </div>
      </div>
    </>
  )
}

export default TicTacToe;
