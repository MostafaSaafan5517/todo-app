import React from "react";
import bgLight from "./assets/bg-desktop-light.jpg";
import bgDark from "./assets/bg-desktop-dark.jpg";
import Todos from "./components/Todos";

function App() {
  const changeBackground = (theme: string) => {
    const bg = document.querySelector(".bg") as HTMLImageElement;
    if (theme === "light") {
      bg.src = bgLight;
    } else {
      bg.src = bgDark;
    }
  };

  return (
    <div className="App w-screen h-screen relative">
      <img src={bgLight} alt="" className="bg w-full h-52" />
      <Todos changeBackground={changeBackground} />
    </div>
  );
}

export default App;
