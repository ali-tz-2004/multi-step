import { Card } from "./components/Card";
import { Menu } from "./components/Menu";

function App() {
  return (
    <div className="flex justify-center md:items-center h-screen w-full bg-background text-foreground">
      <Menu visible={false} />
      <Card />
    </div>
  );
}

export default App;
