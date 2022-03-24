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
