import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(10);
  const [lineColor, setLineColor] = useState("#ffffff");
  const [lineOpacity, setLineOpacity] = useState(1);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isEraser, setIsEraser] = useState(false);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    contextRef.current = ctx;

    canvas.style.cursor = "crosshair";
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth;
      contextRef.current.strokeStyle = isEraser ? "black" : lineColor;
      contextRef.current.globalAlpha = lineOpacity;
    }
  }, [lineWidth, lineColor, lineOpacity, isEraser]);

  const saveHistory = () => {
    const canvasData = canvasRef.current.toDataURL();
    setDrawingHistory((prev) => [...prev, canvasData]);
    setRedoStack([]);
  };

  const startDrawing = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawing(true);

    setPaths((prev) => [
      ...prev,
      { points: [{ x, y }], color: lineColor, width: lineWidth },
    ]);
  };

  const draw = (x, y) => {
    if (!isDrawing) return;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    setPaths((prev) => {
      const updatedPaths = [...prev];
      updatedPaths[updatedPaths.length - 1].points.push({ x, y });
      return updatedPaths;
    });
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    saveHistory();
  };

  const undo = () => {
    if (drawingHistory.length === 0) return;
    const newHistory = [...drawingHistory];
    const lastState = newHistory.pop();
    setDrawingHistory(newHistory);
    setRedoStack((prev) => [lastState, ...prev]);

    if (newHistory.length > 0) {
      restoreCanvas(newHistory[newHistory.length - 1]);
    } else {
      clearCanvas();
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const redoState = redoStack.shift();
    setRedoStack([...redoStack]);
    setDrawingHistory((prev) => [...prev, redoState]);
    restoreCanvas(redoState);
  };

  const restoreCanvas = (dataURL) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    };
  };

  const clearCanvas = () => {
    if (!hasDrawing) return;
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
    setDrawingHistory([]);
    setRedoStack([]);
  };

  const toggleEraser = () => {
    setIsEraser((prev) => !prev);
  };

  const saveDrawing = (format) => {
    if (!hasDrawing) {
      alert("No drawing to save!");
      return;
    }

    const canvas = canvasRef.current;
    const link = document.createElement("a");

    if (format === "png" || format === "jpg") {
      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      link.href = canvas.toDataURL(mimeType);
      link.download = `drawing.${format}`;
      link.click();
    } else if (format === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 0);
      pdf.save("drawing.pdf");
    } else if (format === "svg") {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`;

      paths.forEach(({ points, color, width }) => {
        if (points.length > 1) {
          let pathD = `M ${points[0].x} ${points[0].y} `;
          for (let i = 1; i < points.length; i++) {
            pathD += `L ${points[i].x} ${points[i].y} `;
          }

          svgContent += `<path d="${pathD}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" />`;
        }
      });

      svgContent += "</svg>";

      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = "drawing.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleMouseDown = (e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  const handleMouseMove = (e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative bg-black">
      <Menu lineColor={lineColor} setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity} undo={undo} redo={redo} hasDrawing={hasDrawing} clearCanvas={clearCanvas} toggleEraser={toggleEraser} saveDrawing={saveDrawing} isEraser={isEraser} />
      <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={endDrawing} onMouseLeave={endDrawing} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={endDrawing} className="w-full h-full" />
      <Footer />
    </div>
  );
}

export default App;
