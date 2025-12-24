import { Circle, X } from "lucide-react";
import type { CellValue } from "../types/game.types";

export default function Cell({value, onClick, isWinningCell}: { value: CellValue, onClick: () => void, isWinningCell: boolean}) {
    return (
        <button
            onClick={onClick}
            className={`
                w-24 h-24 border-2 border-gray-700 bg-gray-800 
                hover:bg-gray-700 transition-all duration-200
                flex items-center justify-center text-5xl font-bold
                ${isWinningCell ? "bg-green-600 hover:bg-green-600" : ""}
                ${value ? "cursor-default" : "cursor-pointer"}
            `}
        >
            {value === "X" && (
                <X className="w-16 h-16 text-blue-300" strokeWidth={3} />
            )}
            {value === "O" && (
                <Circle className="w-16 h-16 text-red-400" strokeWidth={3} />
            )}
        </button>
    );
}
