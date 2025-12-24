import { useState } from "react";
import { TicTacToeLogic } from "../utils/game-logic";
import type { GameHistory, GameState, GameStatus, Player, ScoreBoard } from "../types/game.types";

export const useGameState = () => {
  const gameLogic = new TicTacToeLogic();
  
  const [gameState, setGameState] = useState<GameState>({
    board: gameLogic.createInitialBoard(),
    currentPlayer: 'X',
    status: 'playing',
    winner: null
  });

  const [scoreBoard, setScoreBoard] = useState<ScoreBoard>({
    playerX: 0,
    playerO: 0,
    draws: 0
  });

  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  const makeMove = (index: number) => {
    if (gameState.status !== 'playing') return;
    
    const newBoard = gameLogic.makeMove(gameState.board, index, gameState.currentPlayer);
    if (!newBoard) return;

    const { status, winner } = gameLogic.getGameStatus(newBoard);
    
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      status,
      winner
    });

    if (status !== 'playing') {
      updateScoreAndHistory(status, winner);
    }
  };

  const updateScoreAndHistory = (status: GameStatus, winner: Player | null) => {
    if (status === 'won' && winner) {
      setScoreBoard(prev => ({
        ...prev,
        [winner === 'X' ? 'playerX' : 'playerO']: prev[winner === 'X' ? 'playerX' : 'playerO'] + 1
      }));
    } else if (status === 'draw') {
      setScoreBoard(prev => ({ ...prev, draws: prev.draws + 1 }));
    }

    const newHistoryItem: GameHistory = {
      id: Date.now().toString(),
      winner,
      timestamp: new Date(),
      result: status === 'won' ? 'win' : 'draw'
    };

    setGameHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
  };

  const resetGame = () => {
    setGameState({
      board: gameLogic.createInitialBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null
    });
  };

  const resetAll = () => {
    resetGame();
    setScoreBoard({ playerX: 0, playerO: 0, draws: 0 });
    setGameHistory([]);
  };

  const getWinningCells = () => gameLogic.getWinningCells(gameState.board);

  return { gameState, makeMove, resetGame, resetAll, getWinningCells, scoreBoard, gameHistory };
};