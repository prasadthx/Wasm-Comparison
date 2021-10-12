def findPrimes(number):
    primeNumbers = 0
    for i in range(2,number+1,1):
        isPrime=True
        for j in range(2,i,1):
            if((i%j)==0):
                isPrime=False
                break
        if(isPrime):
            primeNumbers+=1
    return primeNumbers

findPrimes(20000)

