import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShaderLoaderService {

  constructor(private http: HttpClient) { }

  private loadShader(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  public async loadShaders(shaderMap: Record<string, string>): Promise<Record<string, string>> {
    const entries = Object.entries(shaderMap);

    const loadedEntries = await Promise.all(
      entries.map(async ([key, url]) => {
        const code = await firstValueFrom(this.loadShader(url).pipe(take(1)));
        return [key, code] as [string, string];
      })
    );

    return Object.fromEntries(loadedEntries);
  }
}
