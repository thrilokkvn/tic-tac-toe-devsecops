import { RotateCcw } from "lucide-react";
import type { GameStatus, Player } from "../types/game.types";

export default function GameInfo({status, currentPlayer, winner, onReset} : {status: GameStatus, currentPlayer: Player, winner: Player | null, onReset: () => void}) {
    const getStatusMessage = () => {
        if (status === 'won') return `Player ${winner} wins! 🎉`;
        if (status === 'draw') return "It's a draw! 🤝";
        return `Current player: ${currentPlayer}`;
    };

    return (
        <div className="flex flex-col items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">
                {getStatusMessage()}
            </h2>
            <button
                onClick={onReset}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                        text-white rounded-lg transition-colors duration-200 font-semibold"
            >
                <RotateCcw className="w-5 h-5" />
                New Game
            </button>
        </div>
    )
}