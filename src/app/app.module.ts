import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CameraPreview} from '@ionic-native/camera-preview/ngx';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {ExploreContainerComponent} from './camera-page/explore-container.component';
import {PopoverComponent} from './popover-component/popover-component.component';
@NgModule({
    declarations: [AppComponent, ExploreContainerComponent, PopoverComponent],
    entryComponents: [PopoverComponent],
    imports: [BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule, CommonModule],
    providers: [
        HttpClientModule,
        StatusBar,
        SplashScreen,
        CameraPreview,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
