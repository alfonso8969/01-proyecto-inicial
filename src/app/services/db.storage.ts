import { Injectable } from "@angular/core";
import { StorageInterface } from "./interface.storage";

@Injectable({
  providedIn: 'root'
})
export class dbStorage implements StorageInterface {
  private storage: Storage = window.localStorage;

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
