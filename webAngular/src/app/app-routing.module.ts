import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { LoginComponent } from './components/login/login.component';
// import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
  {
    path: 'ingredientes',
    component: IngredientesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
