function firstElement<T>(arr: T[]): T | undefined {
    return arr[0]
}

// s is of type 'string'
const s = firstElement<string>(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement<number>([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);






function getLength<T extends {length: number} >(arr: T): number {
    return arr.length
}


function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
  


const arr = combine([1, 2, 3], ["hello"]);
const arr2 = combine<string | number>([1, 2, 3], ["hello"]);

function f(x?: number) {
    // ...
}
f(); // OK
f(10); // OK

function f1(x = 1) {
	// ...
}

f1()
f1(4)

function f2(x?: number): void {
    //
}

f2()
f2(1)
f2(undefined)

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
}

myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
});