export default class logger {
  log(message: string): void {
    console.log(this.messageAddApendix(message));
  }

  messageAddApendix(str: string): string {
    return `logger : ${str}`;
  }
}
