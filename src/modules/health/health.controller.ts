import { AllConfigType } from 'src/config/config.type';
import { Environment } from 'src/constants/app.constant';
import { Public } from 'src/decorators/pubilc.decorator';
import { Controller, Get} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService
  , HttpHealthIndicator, TypeOrmHealthIndicator
 } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ){}
  
  @Public()
  @ApiOperation({summary: 'Helth check'})
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const list = [
      () => this.db.pingCheck('database'),
      ...(this.configService.get('app.nodeEnv', { infer: true }) ===
      Environment.DEVELOPMENT
        ? [
            () =>
              this.http.pingCheck(
                'api-docs',
                `${this.configService.get('app.url', { infer: true })}/api-docs`,
              ),
          ]
        : []),
    ];
    return this.health.check(list);
  }
}
