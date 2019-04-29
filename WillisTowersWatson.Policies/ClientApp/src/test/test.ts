import { Observable, of } from 'rxjs';
import { switchMap, map, tap, filter, catchError, concat, mergeMap } from "rxjs/operators";
import { throwError } from 'rxjs';

export class Test {
    load(): Observable<any> {
        return of('1')
            .pipe(mergeMap(x => throwError('this is te error message')));
    }
}