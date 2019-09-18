import { NgModule } from '@angular/core';

import { GenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [GenSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [GenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GenSharedCommonModule {}
