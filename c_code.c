// Online C compiler to run C program online
// #include <stdio.h>
// #include <time.h> 
// #include <stdlib.h>

long int findPrimes(long int number){
    double time_spent = 0.0;
    int primeNumbers = 0;
    //clock_t begin = clock();
    
    for (int i = 2; i <= number; i++) {
        int isPrime = 1;
        for (int j = 2; j < i; j++) {
            if (i % j == 0 ) {
               isPrime = 0;
            }
        }
        if (isPrime){
           primeNumbers++;
        }
        //isPrime = 0;
    }
    //clock_t end = clock();
 
    //time_spent += (double)(end - begin) / CLOCKS_PER_SEC;
 
    //printf("The elapsed time is %f seconds \n", time_spent);
    //printf("Function Completed, Numbers = %i \n", primeNumbers);
    return primeNumbers;
}

