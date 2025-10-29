

function countPrime(max) {
  let count = 0;
  for (let n = 2; n <= max; n++) {
    if (isPrime(n)) count++;
  }
  return count;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function sumOfSquares(max) {
  let total = 0;
  for (let i = 1; i <= max; i++) {
    total += i * i;
  }
  return total;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}


function sumOfArray(max) {
  const arr = [];
  let total = 0;
  for (let i = 1; i <= max; i++) {
    arr.push(i);
    total += i;
  }
  return total;
}



async function test() {
  const response=await fetch('../build/release.wasm')
  const bytes=await response.arrayBuffer()
  const {instance}=await WebAssembly.instantiate(bytes,{
    env:{abort(){}}
  })

  const wasm=instance.exports

  console.time('wasm som of squares')
  wasm.sumOfSquares(500000000)
  console.timeEnd('wasm som of squares')


  
  console.time('js som of squares')
  sumOfSquares(500000000)
  console.timeEnd('js som of squares')




    console.time('wasm prime count')
  wasm.countPrime(5000000)
  console.timeEnd('wasm prime count')


  
  console.time('js prime count')
  countPrime(5000000)
  console.timeEnd('js prime count')


     console.time('wasm fibo')
  wasm.fibonacci(20)
  console.timeEnd('wasm fibo')


  
  console.time('js fibo')
  fibonacci(20)
  console.timeEnd('js fibo')



      console.time('wasm sumof')
  wasm.sumOfArray(200000)
  console.timeEnd('wasm sumof')


  
  console.time('js sumof')
  sumOfArray(200000)
  console.timeEnd('js sumof')
}

test()