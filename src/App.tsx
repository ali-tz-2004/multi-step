import { useTranslation } from "react-i18next";
import { Card } from "./components/Card";
import { Menu } from "./components/Menu";
import { Language_EN, Language_FA } from "./constants/Languages";

function App() {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex justify-center md:items-center h-screen w-full bg-background text-foreground transition
        ${i18n.language === Language_EN ? "ubuntu-font" : "vazirmant-font"}
        `}
      dir={`${i18n.language === Language_FA ? "rtl" : "ltr"}`}
    >
      <Menu />
      <Card />
    </div>
  );
}

export default App;
