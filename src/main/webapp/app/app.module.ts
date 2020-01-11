import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GenSharedModule } from 'app/shared/shared.module';
import { GenCoreModule } from 'app/core/core.module';
import { GenAppRoutingModule } from './app-routing.module';
import { GenHomeModule } from './home/home.module';
import { GenEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GenSharedModule,
    GenCoreModule,
    GenHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GenEntityModule,
    GenAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class GenAppModule {}
