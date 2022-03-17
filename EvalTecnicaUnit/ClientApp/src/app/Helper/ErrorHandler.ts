export class ErrorHandler {

  constructor() {

  }

  static handle(error: any): string {

    let message = "";
    if (error.errorMessage)
      message = error.errorMessage;
    else if (error.error)
      message = error.error;
    else if (error.message)
      message = error.message;
    else
      message = error;

    if (message.toUpperCase().indexOf("UNIQUE KEY"))
      message = "Registro duplicado, por favor revise"
    else if (message.toUpperCase().indexOf("FOREIGN KEY"))
      message = "Registro no existe, por favor revise"

    if (message.length > 100)
      message = message.substring(0, 99);

    return message;
  }

}
