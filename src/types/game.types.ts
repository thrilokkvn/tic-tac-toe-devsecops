export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
}

export interface GameHistory {
  id: string;
  winner: Player | null;
  timestamp: Date;
  result: 'win' | 'draw';
}

export interface ScoreBoard {
  playerX: number;
  playerO: number;
  draws: number;
}