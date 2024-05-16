import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedServiceService } from './seedService';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then((appContext) => {
      const seeder = appContext.get(SeedServiceService);

      seeder
        .seed()
        .then(() => {
          console.log({ seedSuccess: true });
        })
        .catch((e) => {
          console.log({ failedToSeedData: e });
        })
        .finally(() => appContext.close());
    })

    .catch((e) => {
      console.log({ failedSeed: e });
      throw e;
    });
}

bootstrap();
