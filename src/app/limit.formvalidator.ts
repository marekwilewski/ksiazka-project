import { FormControl } from '@angular/forms';

export class LimitValidator {

    static Limit(limit: number) {
        return (control: FormControl): {[key: string]: any} => {
            // tslint:disable-next-line:prefer-const
            let val = Number(control.value);
            // tslint:disable-next-line:triple-equals
            if (val != NaN && val > limit) {
                return {'limit': {'limit': limit, 'actualValue': val}};
            } else {
                return null;
            }
        };
    }
}
