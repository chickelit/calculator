import React, { ForwardedRef } from "react";
import { AllHTMLAttributes } from "react";

export const validatePartialNumberInputValue = (value: string) =>
  /^[+-]?\d+(\.\d*)?$/.test(value);

export const validateNumberInputValue = (value: string) =>
  /^[+-]?\d+(\.\d+)?$/.test(value);

export const CalculatorInput = React.forwardRef(
  (
    props: AllHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        className="calculator-input"
        type="text"
        ref={ref}
        value={props.value}
        readOnly
      />
    );
  }
);
