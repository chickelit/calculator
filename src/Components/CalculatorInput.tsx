import React, { FormEvent, ForwardedRef } from "react";
import { AllHTMLAttributes, Ref, useState } from "react";

export const CalculatorInput = React.forwardRef(
  (
    props: AllHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [stringInputValue, setStringInputValue] = useState(
      props.value?.toString()
    );
    const [numberInputValue, setNumberInputValue] = useState(props.value);

    const validateNumberInputValue = (value: string) =>
      /^[+-]?\d+(\.\d+)?$/.test(value);

    const validateStringInputValue = (value: string) =>
      /^[+-]?\d+(\.\d*)?$/.test(value);

    const addDigit = (event: FormEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value;
      const digit = inputValue.charAt(inputValue.length - 1);

      if (validateStringInputValue(inputValue)) {
        setStringInputValue(`${inputValue}`);
      }

      if (validateNumberInputValue(inputValue)) {
        digit != "0" && setStringInputValue((+inputValue).toString());

        setNumberInputValue(+inputValue);
      }
    };

    return (
      <div className="calculator-input">
        <input
          type="number"
          hidden
          ref={ref}
          value={numberInputValue}
          readOnly
        />
        <input
          type="text"
          className="input-mask"
          data-content={stringInputValue}
          value={stringInputValue}
          onChange={addDigit}
        />
      </div>
    );
  }
);
