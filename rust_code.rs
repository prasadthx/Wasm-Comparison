use std::time::{Instant};

fn find_primes(number:u32){
	let now = Instant::now();
	let mut prime_numbers : u32 = 0;
    for i in 2..=number {
        let mut is_prime = true;
        for j in 2..i-1 {
            if i % j == 0 {
               is_prime = false;
            }
        }
        if is_prime {
           prime_numbers+=1;
        }
    }
	let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
	println!("Function Completed, Numbers = {}", prime_numbers);
}

fn main() {
    println!("Hello, world!");
	find_primes(20000);
}