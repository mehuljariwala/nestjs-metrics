import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('slow')
  async handleSlowTask(): Promise<string> {
    try {
      const result = await doSomeHeavyTask();
      return `Task completed in ${result} ms`;
    } catch (error) {
      throw new Error(`Task failed with error: ${error.message}`);
    }
  }
}

function doSomeHeavyTask(): Promise<number> {
  const ms = getRandomValue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500]);
  const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

  if (shouldThrowError) {
    const randomError = getRandomValue([
      'DB Payment Failure',
      'DB Server is Down',
      'Access Denied',
      'Not Found Error',
    ]);
    throw new Error(randomError);
  }

  return new Promise((resolve) => setTimeout(() => resolve(ms), ms));
}

function getRandomValue(array: any[]): any {
  return array[Math.floor(Math.random() * array.length)];
}
