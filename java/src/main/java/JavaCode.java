import de.inetsoftware.jwebassembly.api.annotation.Export;

public class JavaCode {
    @Export
    public static int findPrimes(int number) {
        int primeNumbers = 0;
        for (int i = 2; i <= number; i++) {
            boolean isPrime = true;
            for (int j = 2; j < i; j++) {
                if (i % j == 0 ) {
                    isPrime = false;
                }
            }
            if (isPrime){
                primeNumbers++;
            }
        }
        return primeNumbers;
    }
}