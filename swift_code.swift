import Dispatch

func findPrimes(number: Int){
	let start = DispatchTime.now()
    for i in 2...number {
        var isPrime = true;
        for j in 2..<i {
            if i % j == 0 {
               isPrime = false;
            }
        }
        if isPrime{
          //print(i)
        }
    }
	let end = DispatchTime.now() 
	let nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds // <<<<< Difference in nano seconds (UInt64)
    let timeInterval = Double(nanoTime) / 1_000_000_000 // Technically could overflow for long running tests

    print("Time to evaluate problem: \(timeInterval) seconds")
}

findPrimes(number:2000)