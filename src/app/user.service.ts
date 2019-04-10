import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private limitOptions = of([5, 10, 20, 50]);
  private limitBS = new BehaviorSubject(5).pipe(distinctUntilChanged());

  private users$ = this.limitBS.pipe(
    switchMap(limit => this.http.get(`https://randomuser.me/api/?seed=ngDominicana&results=${limit}`)),
    map((response: any) => response.results)
  );

  vm$ = combineLatest(
    this.users$,
    this.limitBS.asObservable(),
    this.limitOptions
  ).pipe(
    map(([users, limit, limitOptions]) => {
      return { users, limit, limitOptions }
    })
  );

  setLimit(limit: number) {
    this.limitBS.next(limit);
  }

}