import { beforeEach, describe, expect, it } from "vitest";
import type { Board, Player } from "../types/game.types";
import { TicTacToeLogic } from "../utils/game-logic";

describe('TicTacToeLogic', () => {
  let game: TicTacToeLogic;

  beforeEach(() => {
    game = new TicTacToeLogic();
  });

  describe('createInitialBoard', () => {
    it('should create an empty board with 9 cells', () => {
      const board = game.createInitialBoard();
      expect(board).toHaveLength(9);
      expect(board.every(cell => cell === null)).toBe(true);
    });
  });

  describe('makeMove', () => {
    it('should place X on empty cell', () => {
      const board = game.createInitialBoard();
      const result = game.makeMove(board, 0, 'X');
      
      expect(result).not.toBeNull();
      expect(result![0]).toBe('X');
    });

    it('should place O on empty cell', () => {
      const board = game.createInitialBoard();
      const result = game.makeMove(board, 4, 'O');
      
      expect(result).not.toBeNull();
      expect(result![4]).toBe('O');
    });

    it('should return null when cell is already occupied', () => {
      let board = game.createInitialBoard();
      board = game.makeMove(board, 0, 'X')!;
      const result = game.makeMove(board, 0, 'O');
      
      expect(result).toBeNull();
    });

    it('should not mutate original board', () => {
      const board = game.createInitialBoard();
      const originalBoard = [...board];
      game.makeMove(board, 0, 'X');
      
      expect(board).toEqual(originalBoard);
    });
  });

  describe('checkWinner', () => {
    it('should detect horizontal win in top row', () => {
      const board: Board = ['X', 'X', 'X', null, null, null, null, null, null];
      expect(game.checkWinner(board)).toBe('X');
    });

    it('should detect horizontal win in middle row', () => {
      const board: Board = [null, null, null, 'O', 'O', 'O', null, null, null];
      expect(game.checkWinner(board)).toBe('O');
    });

    it('should detect horizontal win in bottom row', () => {
      const board: Board = [null, null, null, null, null, null, 'X', 'X', 'X'];
      expect(game.checkWinner(board)).toBe('X');
    });

    it('should detect vertical win in left column', () => {
      const board: Board = ['X', null, null, 'X', null, null, 'X', null, null];
      expect(game.checkWinner(board)).toBe('X');
    });

    it('should detect vertical win in middle column', () => {
      const board: Board = [null, 'O', null, null, 'O', null, null, 'O', null];
      expect(game.checkWinner(board)).toBe('O');
    });

    it('should detect vertical win in right column', () => {
      const board: Board = [null, null, 'X', null, null, 'X', null, null, 'X'];
      expect(game.checkWinner(board)).toBe('X');
    });

    it('should detect diagonal win from top-left to bottom-right', () => {
      const board: Board = ['X', null, null, null, 'X', null, null, null, 'X'];
      expect(game.checkWinner(board)).toBe('X');
    });

    it('should detect diagonal win from top-right to bottom-left', () => {
      const board: Board = [null, null, 'O', null, 'O', null, 'O', null, null];
      expect(game.checkWinner(board)).toBe('O');
    });

    it('should return null when there is no winner', () => {
      const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
      expect(game.checkWinner(board)).toBeNull();
    });

    it('should return null on empty board', () => {
      const board = game.createInitialBoard();
      expect(game.checkWinner(board)).toBeNull();
    });
  });

  describe('isBoardFull', () => {
    it('should return false for empty board', () => {
      const board = game.createInitialBoard();
      expect(game.isBoardFull(board)).toBe(false);
    });

    it('should return false for partially filled board', () => {
      const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
      expect(game.isBoardFull(board)).toBe(false);
    });

    it('should return true for completely filled board', () => {
      const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(game.isBoardFull(board)).toBe(true);
    });
  });

  describe('getGameStatus', () => {
    it('should return won status when X wins', () => {
      const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      const result = game.getGameStatus(board);
      
      expect(result.status).toBe('won');
      expect(result.winner).toBe('X');
    });

    it('should return won status when O wins', () => {
      const board: Board = ['O', null, null, 'O', 'X', 'X', 'O', null, null];
      const result = game.getGameStatus(board);
      
      expect(result.status).toBe('won');
      expect(result.winner).toBe('O');
    });

    it('should return draw status for full board with no winner', () => {
      const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      const result = game.getGameStatus(board);
      
      expect(result.status).toBe('draw');
      expect(result.winner).toBeNull();
    });

    it('should return playing status for game in progress', () => {
      const board: Board = ['X', 'O', null, null, null, null, null, null, null];
      const result = game.getGameStatus(board);
      
      expect(result.status).toBe('playing');
      expect(result.winner).toBeNull();
    });

    it('should prioritize win over draw', () => {
      const board: Board = ['X', 'X', 'X', 'O', 'O', 'X', 'X', 'O', 'O'];
      const result = game.getGameStatus(board);
      
      expect(result.status).toBe('won');
      expect(result.winner).toBe('X');
    });
  });

  describe('getWinningCells', () => {
    it('should return winning cells for horizontal win', () => {
      const board: Board = ['X', 'X', 'X', null, null, null, null, null, null];
      const result = game.getWinningCells(board);
      
      expect(result).toEqual([0, 1, 2]);
    });

    it('should return winning cells for vertical win', () => {
      const board: Board = ['O', null, null, 'O', null, null, 'O', null, null];
      const result = game.getWinningCells(board);
      
      expect(result).toEqual([0, 3, 6]);
    });

    it('should return winning cells for diagonal win', () => {
      const board: Board = ['X', null, null, null, 'X', null, null, null, 'X'];
      const result = game.getWinningCells(board);
      
      expect(result).toEqual([0, 4, 8]);
    });

    it('should return null when there is no winner', () => {
      const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
      const result = game.getWinningCells(board);
      
      expect(result).toBeNull();
    });
  });

  describe('Complete Game Scenarios', () => {
    it('should handle a complete game with X winning', () => {
      let board = game.createInitialBoard();
      
      board = game.makeMove(board, 0, 'X')!;
      expect(game.getGameStatus(board).status).toBe('playing');
      
      board = game.makeMove(board, 3, 'O')!;
      expect(game.getGameStatus(board).status).toBe('playing');
      
      board = game.makeMove(board, 1, 'X')!;
      expect(game.getGameStatus(board).status).toBe('playing');
      
      board = game.makeMove(board, 4, 'O')!;
      expect(game.getGameStatus(board).status).toBe('playing');
      
      board = game.makeMove(board, 2, 'X')!;
      const status = game.getGameStatus(board);
      
      expect(status.status).toBe('won');
      expect(status.winner).toBe('X');
      expect(game.getWinningCells(board)).toEqual([0, 1, 2]);
    });

    it('should handle a complete game ending in draw', () => {
      let board = game.createInitialBoard();
      
      const moves: Array<[number, Player]> = [
        [0, 'X'], [1, 'O'], [2, 'X'],
        [4, 'O'], [3, 'X'], [5, 'O'],
        [7, 'X'], [6, 'O'], [8, 'X']
      ];
      
      for (const [index, player] of moves) {
        board = game.makeMove(board, index, player)!;
      }
      
      const status = game.getGameStatus(board);
      expect(status.status).toBe('draw');
      expect(status.winner).toBeNull();
    });
  });
});