import React from "react";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity }) => {
    return (
        <div className="menu flex items-center flex-col absolute top-3 p-5 bg-zinc-800 text-white gap-1 border-none rounded-md sm:flex-row">
            <label htmlFor="brushColor">Brush Color:</label>
            <input className="bg-transparent" id="brushColor" type="color" onChange={(e) => { setLineColor(e.target.value); }} />
            <label htmlFor="brushWidth">Brush Width:</label>
            <input id="brushWidth" type="range" min="1" max="10" onChange={(e) => { setLineWidth(e.target.value); }} />
            <label htmlFor="brushOpacity">Brush Opacity:</label>
            <input id="brushOpacity" type="range" min="1" max="100" onChange={(e) => { setLineOpacity(e.target.value / 100); }} />
        </div>
    );
};

export default Menu;
