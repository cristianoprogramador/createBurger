import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
// import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  // { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
