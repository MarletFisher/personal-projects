import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainShellComponent } from 'src/app/components/main-shell/main-shell.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'sign%up', component: SignupFormComponent },
  { path: 'products', component: MainShellComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'prod-desc/:id', component: ProductDescriptionComponent },
  { path: 'terms%of%use', component: TermsOfUseComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
