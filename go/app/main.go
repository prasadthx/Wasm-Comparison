package main

func main() {

}

//export findPrimes
func findPrimes(number int) int {
    var primeNumbers int = 0;
    for i := 2; i <= number; i++{
        var isPrime bool = true
        for j := 2; j < i; j++{
            if i % j == 0 {
               isPrime = false;
            }
        }
        if isPrime{
          primeNumbers++;
        }
    }
    return primeNumbers;
}
