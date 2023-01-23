import { FormEvent, useState } from "react";
import "./App.css";
import { Calculator, Command } from "./utils/Calculator";

const calculator = new Calculator(0);

function App() {
  const [currentValue, setCurrentValue] = useState(calculator._currentValue);
  const [value, setValue] = useState(0);

  const updateValue = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget?.valueAsNumber);
  };

  const execute = (command: Command) => {
    calculator.execute(command);

    setCurrentValue(calculator._currentValue);
  };

  const undo = () => {
    calculator.undo();

    setCurrentValue(calculator._currentValue);
  };

  return (
    <div className="app">
      
    </div>
  );
}

export default App;
