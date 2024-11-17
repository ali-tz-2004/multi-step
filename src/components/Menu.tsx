import { useEffect, useState } from "react";
import ToggleButton from "./Toggle-button";
import store from "storejs";
import useStoreState from "../hooks/useStoreState";
import { IconMenuBar } from "../assets/icons/IconMenuBar";
import { IconClose } from "../assets/icons/IconClose";

interface MenuProps {
  visible: boolean;
}

export const Menu = ({ visible }: MenuProps) => {
  const [isDarkThem, setIsDarkThem] = useStoreState("isDarkThem", false);
  const [isMenu, setIsMenu] = useState(false);

  const menuHandler = () => {
    setIsMenu(!isMenu);
  };

  const addClassToBody = (nextIsDarkThem: boolean) => {
    if (nextIsDarkThem) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  const toggleHandle = () => {
    const nextIsDarkThem = !isDarkThem;
    setIsDarkThem(nextIsDarkThem);
    addClassToBody(nextIsDarkThem);
  };

  useEffect(() => {
    const them = store.get("isDarkThem") as boolean;
    setIsDarkThem(them);
    addClassToBody(them);
  }, []);

  return (
    <div className="z-10 h-full">
      <div
        className="absolute top-0 right-0 md:m-10 m-4 cursor-pointer"
        onClick={menuHandler}
      >
        <IconMenuBar />
      </div>
      {isMenu ? (
        <div className="h-full bg-card md:w-56 w-40 fixed right-0 cursor-pointer">
          <div className="absolute left-0 top-0 m-3" onClick={menuHandler}>
            <IconClose />
          </div>
          <div className="absolute md:top-10 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <ToggleButton
              isToggled={isDarkThem}
              onToggle={toggleHandle}
              label1="سیاه"
              label2="سفید"
            ></ToggleButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};
