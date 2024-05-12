import { useState, useEffect } from "react";

function FollowMouse() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log("effect", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);
  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);

    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);
  useEffect(() => {
    if (!enabled) setPosition({ x: 0, y: 0 });
  });

  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#1b5396",
          borderRadius: "50%",
          opacity: 0.8,
          border: "2px solid #fff",
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </main>
  );
}

function App() {
  return <FollowMouse></FollowMouse>;
}

export default App;
