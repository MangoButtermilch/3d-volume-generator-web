import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class GuidService {

  public static get new(): string {
    return Guid.create().toString()
  }
}