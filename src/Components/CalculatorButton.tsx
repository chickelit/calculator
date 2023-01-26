import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  symbol?: React.ReactNode;
}

export function CalculatorButton({ text, symbol, ...attributes }: IProps) {
  return (
    <button className="calculator-button" {...attributes}>
      {text || symbol}
    </button>
  );
}
