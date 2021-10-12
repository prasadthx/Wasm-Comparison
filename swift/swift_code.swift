@_cdecl("findPrimes")
func findPrimes(_ number: Int) -> Int{
	var primeNumbers : Int = 0;
    for i in 2...number {
        var isPrime = true;
        for j in 2..<i {
            if i % j == 0 {
               isPrime = false;
            }
        }
        if isPrime{
          primeNumbers+=1;
        }
    }
    return primeNumbers;
}

