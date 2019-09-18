import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GenSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GenSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [GenSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GenSharedModule {
  static forRoot() {
    return {
      ngModule: GenSharedModule
    };
  }
}
