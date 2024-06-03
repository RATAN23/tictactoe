import { useState } from 'react'

const initialBoard = (size) => Array(size*size).fill(null);

const generateWinningPatterns = (boardSize) => {
    const patterns = [];

    for(let i = 0 ; i < boardSize ; i++){
        const horizontalPattern = [];
        const verticalPattern = [];
        for(let j = 0 ; j < boardSize ; j++){
            horizontalPattern.push(i* boardSize + j );
            verticalPattern.push(i + boardSize * j); 
        }
        patterns.push(horizontalPattern);
        patterns.push(verticalPattern);
    }
   

    const diagonal1 = [];
    const diagonal2 = [];
    for(let i = 0 ; i < boardSize ; i++){
        diagonal1.push(i * (boardSize+1));
        diagonal2.push((i+1) * (boardSize-1));
    }
    patterns.push(diagonal1); 
    patterns.push(diagonal2);

    return patterns;
}


const useTictactoe = (boardSize) => {
    const [board, setBoard] = useState(initialBoard(boardSize));
    const [isXNext , setIsXNext ] = useState(true);

    const WINNING_PATTERNS = generateWinningPatterns(boardSize);
    console.log(WINNING_PATTERNS);

    const calculateWinner = (currentBoard) => {
        for(let i = 0 ; i < WINNING_PATTERNS.length;i++){
        //    const[a,b,c]  = WINNING_PATTERNS[i];
        const pattern  = WINNING_PATTERNS[i];
        let countX = 0 ;
        let countY = 0;
        
        for(let j = 0 ; j < pattern.length;j++){
            const cell  = currentBoard[pattern[j]];
            if(cell === 'X') countX++;
            else if(cell === 'Y') countY++;
        }
    
        if(countX == boardSize) return "X";
        else if(countY == boardSize) return "Y";
    }
        return null;

    };

    const handleClick = (index) => {
        //check winner
        const winner = calculateWinner(board);
        if(winner || board[index]) return;

        const newBoard = [...board]
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if(winner) return `Player ${winner} wins!`;

        if(!board.includes(null)) return `Its a Draw!`;

        return `Player ${isXNext ? "X" : "O"} turn`;

    }; 

    const resetGame = () => {
        setBoard(initialBoard(boardSize));
        setIsXNext(true);
    };

    return {calculateWinner , handleClick , getStatusMessage , resetGame , board};
}

export default useTictactoe;
