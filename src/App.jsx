import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [lineWidth, setLineWidth] = useState(10);
	const [lineColor, setLineColor] = useState("white");
	const [lineOpacity, setLineOpacity] = useState(0.1);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const context = canvas.getContext("2d");
		context.lineCap = "round";
		context.lineJoin = "round";
		contextRef.current = context;
	}, []);

	useEffect(() => {
		if (contextRef.current) {
			contextRef.current.lineWidth = lineWidth;
		}
	}, [lineWidth]);

	useEffect(() => {
		if (contextRef.current) {
			contextRef.current.strokeStyle = lineColor;
		}
	}, [lineColor]);

	useEffect(() => {
		if (contextRef.current) {
			contextRef.current.globalAlpha = lineOpacity;
		}
	}, [lineOpacity]);

	const startDrawing = (e) => {
		contextRef.current.beginPath();
		contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		setIsDrawing(true);
	};

	const endDrawing = () => {
		contextRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = (e) => {
		if (!isDrawing) {
			return;
		}
		contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		contextRef.current.stroke();
	};

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center relative bg-black">
			<Menu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity} />
			<canvas onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={draw} ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
			<Footer />
		</div>
	);
}

export default App;
