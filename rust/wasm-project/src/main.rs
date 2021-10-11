#[no_mangle]
pub extern "C" fn find_primes(number:u32) -> u32{
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
	println!("Function Completed, Numbers = {}", prime_numbers);
  return prime_numbers;
}