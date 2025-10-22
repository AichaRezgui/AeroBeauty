import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private querySource = new BehaviorSubject<string>('');
  query$ = this.querySource.asObservable();

  setQuery(q: string) { this.querySource.next(q); }
}
