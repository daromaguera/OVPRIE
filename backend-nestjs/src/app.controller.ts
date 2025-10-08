import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResearchCenterService } from './research-center/research-center.service';
import { HighestDegreeService } from './highest-degree/highest-degree.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly researchCenterService: ResearchCenterService,
    private readonly highestDegreeService: HighestDegreeService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('form-options')
  async getFormOptions() {
    try {
      const [researchCenters, degrees] = await Promise.all([
        this.researchCenterService.findActiveCenters(),
        this.highestDegreeService.findActiveDegrees(),
      ]);

      return {
        status: 'success',
        data: {
          researchCenters,
          degrees,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch form options',
        error: error.message,
      };
    }
  }
}
