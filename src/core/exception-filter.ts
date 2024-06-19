import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 400;
    let message: string | Record<string, unknown> = 'Bad Request';
    let details;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
      details = exception.stack;
    } else if (exception instanceof Error) {
      status = 500;
      message = exception.message;
      details = exception.stack;
    }

    response.status(status).send({ status, message, details, timestamp: new Date().toISOString() });
  }
}
