@_cdecl("find_primes")
func find_primes(_ number: Int) -> Int {
    var primeNumbers : Int = 0;
    var isPrime: Bool = true;
    for i in 2...number {
        for j in 2..<i {
            if i % j == 0 {
               isPrime = false;
            }
        }
        if isPrime{
          primeNumbers+=1;
        }
        isPrime = true;
    }
    return primeNumbers;
}

