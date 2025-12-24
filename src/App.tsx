import GameInfo from "./components/game-info";
import { useGameState } from "./hooks/use-game-state";
import Board  from "./components/board";
import ScoreBoard  from "./components/score-board";
import GameHistory  from "./components/game-history";
import './App.css'

function App() {
    const { gameState, makeMove, resetGame, resetAll, getWinningCells, scoreBoard, gameHistory } = useGameState();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-8">Tic Tac Toe</h1>
          <GameInfo
            status={gameState.status}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            onReset={resetGame}
          />
          <Board
            board={gameState.board}
            onCellClick={makeMove}
            winningCells={getWinningCells()}
          />
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-80">
          <ScoreBoard scoreBoard={scoreBoard} onResetAll={resetAll} />
          <GameHistory history={gameHistory} />
        </div>
      </div>
    </div>
  );
}

export default App
