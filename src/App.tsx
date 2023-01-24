import "./App.css";
import { CalculatorInput } from "./Components/CalculatorInput";

function App() {
  return (
    <section className="app">
      <CalculatorInput value={0} />
    </section>
  );
}

export default App;
