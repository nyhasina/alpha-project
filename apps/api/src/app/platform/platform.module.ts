import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformResolver } from './platform.resolver';

@Module({
  providers: [PlatformService, PlatformResolver]
})
export class PlatformModule {}
