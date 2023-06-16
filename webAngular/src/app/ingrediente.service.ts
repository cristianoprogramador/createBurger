import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  constructor(private http: HttpClient) {}

  getIngredientes(): Promise<any[] | undefined> {
    return this.http
      .get<any[]>('http://localhost:3031/ingredients')
      .toPromise();
  }

  inserirIngrediente(ingrediente: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3031/ingredients', ingrediente)
      .toPromise();
  }

  atualizarIngrediente(ingrediente: any): Promise<any> {
    return this.http
      .put<any>(
        `http://localhost:3031/ingredients/${ingrediente.id}`,
        ingrediente
      )
      .toPromise();
  }

  deletarIngrediente(ingredienteId: number): Promise<any> {
    return this.http
      .delete<any>(`http://localhost:3031/ingredients/${ingredienteId}`)
      .toPromise();
  }
}
