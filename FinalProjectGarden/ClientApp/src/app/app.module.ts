import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SearchedPlantComponent } from './searched-plant/searched-plant.component';
import { LoginComponent } from './login/login.component';
import { MyGardenComponent } from './my-garden/my-garden.component';
import { POTDComponent } from './potd/potd.component';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Secret } from './Services/secret';
import { WaterFrequencyComponent } from './water-frequency/water-frequency.component';
import { GardenDetailsComponent } from './garden-details/garden-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SearchedPlantComponent,
    LoginComponent,
    MyGardenComponent,
    POTDComponent,
    WaterFrequencyComponent,
    GardenDetailsComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'SearchedPlant', component: SearchedPlantComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'MyGarden', component: MyGardenComponent },
      { path: 'POTD', component: POTDComponent },
      { path: "WaterFrequency", component: WaterFrequencyComponent},
      { path: 'GardenDetails/:GardenName', component : GardenDetailsComponent}

    ]),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(Secret.googleAuth),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
