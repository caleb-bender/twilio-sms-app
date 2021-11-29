/**
 * ICommand.ts
 * Description: An interface for different types of commands to implement.
 * Use Cases: An implementation of ICommand will be called when a piece of business logic needs to be called.
 */

export default interface ICommand {
    execute(): Promise<any>;
}