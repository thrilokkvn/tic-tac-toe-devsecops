import { Circle, Trophy, X } from "lucide-react";
import type { ScoreBoard } from "../types/game.types";

export default function ScoreBoard({ scoreBoard, onResetAll}: { scoreBoard: ScoreBoard, onResetAll: () => void}) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Scoreboard</h3>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                    <div className="flex items-center gap-2">
                        <X className="w-5 h-5 text-blue-400" strokeWidth={3} />
                        <span className="text-white font-semibold">
                            Player X
                        </span>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">
                        {scoreBoard.playerX}
                    </span>
                </div>

                <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                    <div className="flex items-center gap-2">
                        <Circle
                            className="w-5 h-5 text-red-400"
                            strokeWidth={3}
                        />
                        <span className="text-white font-semibold">
                            Player O
                        </span>
                    </div>
                    <span className="text-2xl font-bold text-red-400">
                        {scoreBoard.playerO}
                    </span>
                </div>

                <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                    <span className="text-white font-semibold">Draws</span>
                    <span className="text-2xl font-bold text-gray-300">
                        {scoreBoard.draws}
                    </span>
                </div>
            </div>

            <button
                onClick={onResetAll}
                className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 
                   text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
            >
                Reset All Stats
            </button>
        </div>
    );
}
