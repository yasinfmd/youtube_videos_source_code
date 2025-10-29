
export function countPrime(max:i32):i32{
  let count:i32=0
  for(let n:i32=2;n<=max;n++){
    if(isPrime(n))count++
  }
  return count;
}
function isPrime(n:i32):bool{
  if(n<2) return false;
  for(let i:i32=2;i*i<=n;i++){
    if(n%i==0) return false
  }
  return true
}

export function sumOfSquares(max:i32):i64{
let total:i64=0
for(let i:i32=1;i <= max;i++){
  total+=i as i64 * i as i64
}
return total
}


export function fibonacci(n:i32):i32{
  if(n<=1) return n
  return fibonacci(n-1)+fibonacci(n-2)
}



export function sumOfArray(max:i32):i32{
  let arr:i32[]=[]
  let total:i32=0
  for(let i:i32=1;i <= max;i++){
    arr.push(i)
    total+=i
}
return total
}