export function persistence(num: number): number {
    // your code here
    //number of times to multiply the digits in num till you get single digit
    let arr=num.toString().split('').map(x=>Number(x));
    console.log(arr, 'in funct' );
    let count=0;
    while(arr.length>1){
        let product=arr.reduce((a,b)=>a*b);
        arr=product.toString().split('').map(x=>Number(x));
        count++;
    }
    console.log(count);
    return count;

}
persistence(39);