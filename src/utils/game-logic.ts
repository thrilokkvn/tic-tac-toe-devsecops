import type { Board, GameStatus, Player } from "../types/game.types";

export class TicTacToeLogic {
  private readonly WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  createInitialBoard(): Board {
    return Array(9).fill(null);
  }

  checkWinner(board: Board): Player | null {
    for (const [a, b, c] of this.WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }
    return null;
  }

  isBoardFull(board: Board): boolean {
    return board.every(cell => cell !== null);
  }

  getGameStatus(board: Board): { status: GameStatus; winner: Player | null } {
    const winner = this.checkWinner(board);
    if (winner) {
      return { status: 'won', winner };
    }
    if (this.isBoardFull(board)) {
      return { status: 'draw', winner: null };
    }
    return { status: 'playing', winner: null };
  }

  makeMove(board: Board, index: number, player: Player): Board | null {
    if (board[index] !== null) {
      return null;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    return newBoard;
  }

  getWinningCells(board: Board): number[] | null {
    for (const combo of this.WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }
    return null;
  }
}
