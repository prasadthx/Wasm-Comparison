export const findPrimes = (number) => {
    let primeNumbers = 0;
    for (let i = 2; i <= number; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0 ) {
               isPrime = false;
            }
        }
        if (isPrime){
          primeNumbers++;
        }
    }
    return primeNumbers;
}
