import { Response } from "express";

export class ApiResponse {
  constructor(
    private res: Response,
    private statusCode: number,
    private data: any = null,
    private message: string = ""
  ) {
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      success: this.statusCode >= 200 && this.statusCode < 300,
      message: this.message,
      data: this.data,
    });
  }
}
