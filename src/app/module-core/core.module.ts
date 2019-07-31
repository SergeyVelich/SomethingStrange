import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../module-shared/shared.module';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    WrapperComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
