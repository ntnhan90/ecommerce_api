import { Module } from '@nestjs/common';
import generateModuleSet from './utils/modules-set';

@Module({
  imports: generateModuleSet(),
})
export class AppModule {}
