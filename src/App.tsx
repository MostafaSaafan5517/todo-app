import React from "react";
import bgLight from "./assets/bg-desktop-light.jpg";
import bgDark from "./assets/bg-desktop-dark.jpg";
import Todos from "./components/Todos";

import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state: any) => state.theme);

  return (
    <div className="App w-screen h-screen relative">
      <img
        src={theme === "dark" ? bgDark : bgLight}
        alt=""
        className="bg w-full h-52"
      />
      <Todos />
    </div>
  );
}

export default App;
