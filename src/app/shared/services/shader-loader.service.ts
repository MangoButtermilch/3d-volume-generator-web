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

  async loadShadersDefault(vertexUrl: string, fragmentUrl: string): Promise<[string, string]> {
    const [vertex, fragment] = await Promise.all([
      firstValueFrom(this.loadShader(vertexUrl)),
      firstValueFrom(this.loadShader(fragmentUrl))
    ]);
    return [vertex, fragment];
  }

  async loadShaders(shaderMap: Record<string, string>): Promise<Record<string, string>> {
    const entries = Object.entries(shaderMap);

    const loadedEntries = await Promise.all(
      entries.map(async ([key, url]) => {
        const code = await firstValueFrom(this.loadShader(url));
        return [key, code] as [string, string];
      })
    );

    return Object.fromEntries(loadedEntries);
  }
}
