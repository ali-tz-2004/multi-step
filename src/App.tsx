import { useTranslation } from "react-i18next";
import { Card } from "./components/Card";
import { Menu } from "./components/Menu";

function App() {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex justify-center md:items-center h-screen w-full bg-background text-foreground
        ${i18n.language === "en" ? "ubuntu-font" : "vazirmant-font"}
        `}
      dir={`${i18n.language === "fa" ? "rtl" : "ltr"}`}
    >
      <Menu />
      <Card />
    </div>
  );
}

export default App;
