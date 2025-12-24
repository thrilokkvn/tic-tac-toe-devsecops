import { Circle, Clock, X } from "lucide-react";
import type { GameHistory } from "../types/game.types";

export default function GameHistory({history}: {history: GameHistory[]}) {
    const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Game History</h3>
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No games played yet</p>
      ) : (
        <div className="space-y-2">
          {history.map((game, index) => (
            <div 
              key={game.id}
              className="bg-gray-700 rounded p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm font-mono">#{history.length - index}</span>
                {game.result === 'win' ? (
                  <div className="flex items-center gap-2">
                    {game.winner === 'X' ? (
                      <X className="w-4 h-4 text-blue-400" strokeWidth={3} />
                    ) : (
                      <Circle className="w-4 h-4 text-red-400" strokeWidth={3} />
                    )}
                    <span className={`font-semibold ${game.winner === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                      Player {game.winner} won
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-300 font-semibold">Draw</span>
                )}
              </div>
              <div className="text-right text-xs">
                <div className="text-gray-400">{formatDate(game.timestamp)}</div>
                <div className="text-gray-500">{formatTime(game.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}