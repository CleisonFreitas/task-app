import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './auth.model';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { API_URL } from '../../core/api/api.config';
import { AuthResponse } from '../../core/api/auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${API_URL}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  register(data: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data)
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.data.access_token);
        })
      );
  }
}