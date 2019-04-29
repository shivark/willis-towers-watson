import { Test } from "./test";
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { doesNotThrow } from 'assert';

fdescribe('test', () => {
    let test: Test = new Test();

    it('fuck', (done) => {

        // const next = () => (fail(), done())
        // const complete = () => console.log('complete')
        // const err = (m) => (expect(m).toBe('this is te error message'), done())

        // test.load().subscribe(next, err)


        test.load().subscribe({
            next: () => (fail(), done()),
            error: (err) => (expect(err).toBe('this is te error message'), done())
        })

    });

});