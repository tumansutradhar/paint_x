import React, { useState, useEffect, useRef } from "react";

const Menu = ({ saveDrawing, lineColor, setLineColor, setLineWidth, setLineOpacity, clearCanvas, hasDrawing, undo, redo, toggleEraser, isEraser }) => {
    const [showSaveOptions, setShowSaveOptions] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSaveOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute top-4 mx-4 flex flex-row flex-wrap justify-center items-center gap-2.5 border border-white p-4 rounded-lg bg-black">
            <label className="text-white flex items-center gap-2">
                Color: <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
            </label>
            <label className="text-white flex items-center gap-2">
                Size: <input type="range" min="1" max="50" onChange={(e) => setLineWidth(e.target.value)} />
            </label>
            <label className="text-white flex items-center gap-2">
                Opacity: <input type="range" min="0.1" max="1" step="0.1" onChange={(e) => setLineOpacity(e.target.value)} />
            </label>
            <button className="p-2 rounded-md border border-white bg-white hover:bg-black transition group" onClick={undo}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-black group-hover:fill-white transition">
                    <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
                </svg>
            </button>
            <button className="p-2 rounded-md border border-white bg-white hover:bg-black transition group" onClick={redo}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-black group-hover:fill-white transition">
                    <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
                </svg>
            </button>
            <button className="p-2 rounded-md border border-yellow-500 bg-yellow-500 hover:border-yellow-600 hover:bg-yellow-600" onClick={toggleEraser}>
                {isEraser ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="M791-55 602-244l-82 84H190l-85-85q-23-23-23.5-57t22.5-58l188-194L55-791l57-57 736 736-57 57ZM224-240h262l59-61-197-197-188 194 64 64Zm491-119-57-57 142-146-198-198-142 146-56-56 140-146q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L715-359ZM559-515ZM447-400Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z" />
                    </svg>
                )}
            </button>
            {hasDrawing && (
                <button className="p-2 rounded-md border border-red-500 bg-red-500 hover:border-red-600 hover:bg-red-600" onClick={clearCanvas}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z" /></svg>
                </button>
            )}
            <div className="relative" ref={dropdownRef}>
                <button className="p-2 rounded-md border border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600 transition" onClick={() => setShowSaveOptions(!showSaveOptions)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z" />
                    </svg>
                </button>
                {showSaveOptions && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 border border-white bg-white rounded-md shadow-md overflow-hidden">
                        <button className="block w-full text-left px-3 py-1 hover:bg-black hover:text-white text-black" onClick={() => saveDrawing("png")}>PNG</button>
                        <button className="block w-full text-left px-3 py-1 hover:bg-black hover:text-white text-black" onClick={() => saveDrawing("jpg")}>JPG</button>
                        <button className="block w-full text-left px-3 py-1 hover:bg-black hover:text-white text-black" onClick={() => saveDrawing("svg")}>SVG</button>
                        <button className="block w-full text-left px-3 py-1 hover:bg-black hover:text-white text-black" onClick={() => saveDrawing("pdf")}>PDF</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
