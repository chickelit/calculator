import { CalculatorOperations } from "./CalculatorOperations";

export interface ICommand {
  execute: Function;
  undo: Function;
  value: number;
}

export class Command implements ICommand {
  public execute: Function;
  public undo: Function;
  public value: number;

  constructor(command: ICommand) {
    this.execute = command.execute;
    this.undo = command.undo;
    this.value = command.value;
  }
}

export class SumCommand extends Command {
  constructor(value: number) {
    super({
      execute: CalculatorOperations.sum,
      undo: CalculatorOperations.subtract,
      value,
    });
  }
}

export class SubtractCommand extends Command {
  constructor(value: number) {
    super({
      execute: CalculatorOperations.subtract,
      undo: CalculatorOperations.sum,
      value,
    });
  }
}

export class MultiplyCommand extends Command {
  constructor(value: number) {
    super({
      execute: CalculatorOperations.multiply,
      undo: CalculatorOperations.divide,
      value,
    });
  }
}

export class DivideCommand extends Command {
  constructor(value: number) {
    super({
      execute: CalculatorOperations.divide,
      undo: CalculatorOperations.multiply,
      value,
    });
  }
}

export class Calculator {
  private commands: Command[] = [];
  private currentValue = 0;

  get _currentValue() {
    return this.currentValue;
  }

  constructor(initialValue: number) {
    this.currentValue = initialValue;
  }

  public execute(command: Command) {
    this.commands.push(command);

    this.currentValue = command.execute(this.currentValue, command.value);
  }

  public undo() {
    const command = this.commands.pop();

    if (!command) return;

    this.currentValue = command?.undo(this.currentValue, command.value);
  }
}