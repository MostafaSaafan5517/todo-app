import { useEffect } from "react";
import Tasks from "./Tasks";
import sunIcon from "../assets/icons/icon-sun.svg";
import moonIcon from "../assets/icons/icon-moon.svg";

function Todos({ changeBackground }: { changeBackground: Function }) {
  useEffect(() => {
    const themeToggle = document.querySelector(
      ".themeToggle"
    ) as HTMLImageElement;

    if (localStorage.getItem("theme") === themeToggle.alt) {
      return;
    } else {
      themeToggle.click();
    }
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = event.target as HTMLImageElement;
    if (target.alt === "light theme") {
      target.src = sunIcon;
      target.alt = "dark theme";
    } else {
      target.src = moonIcon;
      target.alt = "light theme";
    }

    localStorage.setItem("theme", target.alt);

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      changeBackground("dark");
    } else {
      changeBackground("light");
    }
  };

  return (
    <section className="todos absolute top-20 left-1/2 -translate-x-1/2 w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 px-5 py-6">
      <section className="head w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">T O D O</h1>
        <img
          src={moonIcon}
          alt="light theme"
          onClick={handleClick}
          className="themeToggle cursor-pointer"
        />
      </section>

      <Tasks />
    </section>
  );
}

export default Todos;
