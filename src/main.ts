import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initFlowbite } from 'flowbite';


initFlowbite();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
