import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Slider } from '../../models/slider';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SliderService {
  private path = 'api/sliders';
  constructor(private api: ApiService) {}
  getAll(): Observable<Slider[]> {
    return this.api.get<Slider[]>(this.path);
  }
}
