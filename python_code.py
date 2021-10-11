import timeit
import time

start = time.time()


print("Starting Execution")
n=int(input("Enter the number:  "))
ans=0;
for i in range(2,n+1,1):
    isPrime=True
    for j in range(2,i,1):
        if((i%j)==0):
            isPrime=False
            break
    if(isPrime):
        ans+=1
print("Total primes is : ",ans)
end = time.time()
k=end - start
print("Ellapse Time is " ,k)