import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShaderLoaderService {


  constructor(private http: HttpClient) { }

  private loadShader(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  async loadShaders(vertexUrl: string, fragmentUrl: string): Promise<[string, string]> {
    const [vertex, fragment] = await Promise.all([
      firstValueFrom(this.loadShader(vertexUrl)),
      firstValueFrom(this.loadShader(fragmentUrl))
    ]);
    return [vertex, fragment];
  }
}
