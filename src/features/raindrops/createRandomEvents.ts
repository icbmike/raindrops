import { Observable } from "rxjs";

export function createRandomEvents(maxWaitTimeMs: number) {
    return new Observable<number>(subscriber => {
        function timeoutCallback() {
            const delay = Math.random() * maxWaitTimeMs;
            subscriber.next(delay);
            return setTimeout(timeoutCallback, delay);
        }

        timeoutCallback();
    });
}
