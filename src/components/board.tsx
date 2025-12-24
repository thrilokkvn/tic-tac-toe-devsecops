import type { Board } from "../types/game.types";
import Cell from "./cell";

export default function Board({board, onCellClick, winningCells} : {board: Board, onCellClick: (index: number) => void, winningCells: number[] | null}) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {board.map((cell, index) => (
                <Cell key={index} value={cell} onClick={() => onCellClick(index)} isWinningCell={winningCells?.includes(index) || false}/>
            ))}
        </div>
    )
}