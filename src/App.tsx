import { useEffect, useState } from "react";
import "./App.css";
import { CalculatorButton } from "./Components/CalculatorButton";
import {
  CalculatorInput,
  validateNumberInputValue,
  validatePartialNumberInputValue,
} from "./Components/CalculatorInput";
import {
  Calculator,
  Command,
  DivideCommand,
  MultiplyCommand,
  PercentCommand,
  SubtractCommand,
  SumCommand,
} from "./utils/Calculator";

const calculator = new Calculator(0);

function App() {
  const [value, setValue] = useState(calculator.currentValue.toString());
  const [result, setResult] = useState(calculator.currentValue);

  const addDigit = (digit: string) => {
    if (value.length >= 16) return;

    if (value === "0") {
      if (digit === ".") {
        let newValue = value + digit;

        validatePartialNumberInputValue(newValue) && setValue(newValue);
      }

      let newValue = digit != "0" ? digit : "0";

      validatePartialNumberInputValue(newValue) && setValue(newValue);
    } else {
      let newValue = value + digit;

      validatePartialNumberInputValue(newValue) && setValue(newValue);
    }
  };

  const execute = (command: Command) => {
    if (validateNumberInputValue(value)) {
      calculator.execute(command);

      setResult(calculator.currentValue);

      setValue("0");
    }
  };
	
  return (
    <section className="app">
      <div className="calculator">
        <div className="calculator-header">
          <div className="calculator-result">{result}</div>
          <CalculatorInput value={value} />
        </div>
        <div className="buttons">
          <CalculatorButton
            text="AC"
            onClick={() => {
              calculator.reset();
              setValue("0");
              setResult(calculator.currentValue);
            }}
          />
          <CalculatorButton
            text="DEL"
            onClick={() => {
              const newValue = value.substring(0, value.length - 1);

              setValue(newValue || "0");
            }}
          />
          <CalculatorButton
            text="UNDO"
            onClick={() => {
              calculator.undo();
              setResult(calculator.currentValue);
            }}
          />
          <CalculatorButton
            symbol={<>&#37;</>}
            onClick={() =>
              validateNumberInputValue(value) && execute(new PercentCommand())
            }
          />
          <CalculatorButton text="7" onClick={() => addDigit("7")} />
          <CalculatorButton text="8" onClick={() => addDigit("8")} />
          <CalculatorButton text="9" onClick={() => addDigit("9")} />
          <CalculatorButton
            symbol={<>&#43;</>}
            data-size="large"
            onClick={() =>
              validateNumberInputValue(value) && execute(new SumCommand(+value))
            }
          />
          <CalculatorButton text="4" onClick={() => addDigit("4")} />
          <CalculatorButton text="5" onClick={() => addDigit("5")} />
          <CalculatorButton text="6" onClick={() => addDigit("6")} />
          <CalculatorButton
            symbol={<>&#8722;</>}
            data-size="large"
            onClick={() =>
              validateNumberInputValue(value) &&
              execute(new SubtractCommand(+value))
            }
          />
          <CalculatorButton text="1" onClick={() => addDigit("1")} />
          <CalculatorButton text="2" onClick={() => addDigit("2")} />
          <CalculatorButton text="3" onClick={() => addDigit("3")} />
          <CalculatorButton
            symbol={<>&#215;</>}
            data-size="large"
            onClick={() =>
              validateNumberInputValue(value) &&
              execute(new MultiplyCommand(+value))
            }
          />
          <CalculatorButton text="0" onClick={() => addDigit("0")} />
          <CalculatorButton
            text="+ -"
            data-size="large"
            onClick={() =>
              validateNumberInputValue(value) && setValue((-value).toString())
            }
          />
          <CalculatorButton
            text="."
            onClick={() => addDigit(".")}
            data-size="large"
          />
          <CalculatorButton
            symbol={<>&#247;</>}
            data-size="large"
            onClick={() =>
              validateNumberInputValue(value) &&
              execute(new DivideCommand(+value))
            }
          />
        </div>
      </div>
    </section>
  );
}

export default App;
