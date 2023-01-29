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

export class PercentCommand extends Command {
  constructor() {
    super({
      execute: CalculatorOperations.divide,
      undo: CalculatorOperations.multiply,
      value: 100,
    });
  }
}

export class Calculator {
  private commands: Command[] = [];
  public currentValue = 0;

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

    this.currentValue = command!.undo(this.currentValue, command.value);
  }

  public reset() {
    this.commands = [];
		this.currentValue = 0;
  }
}
