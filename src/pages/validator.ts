interface StringValidator {
   isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    public isAcceptable(s: string): boolean {
        return lettersRegexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator {
    public isAcceptable(s: string): boolean {
        return numberRegexp.test(s);
    }
}

let strings = ['Hello', '9394', '110'];

let validators: { [s: string]: StringValidator; } = {};
validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();

for (const s of strings) {
    for (const name in validators) {
        const isMatch = validators[name].isAcceptable(s);
        console.log(`'${ s }' ${ isMatch ? 'matches' : 'does not match' } '${ name }'.`);
    }
}


