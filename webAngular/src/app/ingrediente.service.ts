import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getIngredientes(): Promise<any[] | undefined> {
    return this.http
      .get<any[]>('http://localhost:3031/ingredients')
      .toPromise();
  }

  inserirIngrediente(ingrediente: any): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .post<any>('http://localhost:3031/ingredients', ingrediente, {
          headers,
        })
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }

  atualizarIngrediente(ingrediente: any): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .put<any>(
          `http://localhost:3031/ingredients/${ingrediente.id}`,
          ingrediente,
          { headers }
        )
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }

  deletarIngrediente(ingredienteId: number): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .delete<any>(`http://localhost:3031/ingredients/${ingredienteId}`, {
          headers,
        })
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }
}
