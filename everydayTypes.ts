// 1.1 변수에 대한 타입 표기 - 원시타입(선택사항)
const myName: string = "jisu"
const age: number = 27
const toggle: boolean = true

// 1.2 Array
const numArray1: Array<number> = [1, 2, 3]
const numArray2: number[] = [4, 5, 6]
const strArray1: Array<string> = ["a", "b", "c"]
const strArray2: string[] = ["e", "f", 'g']

// 1.3 any
let obj: any = {x: 0}
obj.foo() // any 지정해서 오류 안 생김
obj()
obj.bar = 100
obj = "hello"
const n: number = obj;

// 2.1 함수 - 파라미터의 타입 명시
function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!")
}
greet(42) // Argument of type 'number' is not assignable to parameter of type 'string'.

// 2.2 함수 - 파라미터, 반환 타입 명시
function addFive(x: number): number {
    return x + 5
}

// 2.3 익명함수 - 문맥적 타입 부여 :  파라미터의 타입을 지정하지 않았지만, string이라는 것을 ts가 알고 있음
const names = ["Alice", "Bob", "Eve"];
names.forEach((s) => {
    console.log(s.toUppercase()) // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
})

// 3.1 객체 타입 - 객체 프로퍼티의 타입
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// 3.2 옵셔널 프로퍼티 - ? 로 표기
function printName(obj: { first: string; last?: string }) {
    console.log(obj.last.toUpperCase()); // 오류 - `obj.last`의 값이 제공되지 않는다면 프로그램이 멈추게 됩니다!

    if (obj.last !== undefined) {
      // OK
      console.log(obj.last.toUpperCase());
    }
   
    // 최신 JavaScript 문법을 사용하였을 때 또 다른 안전한 코드
    console.log(obj.last?.toUpperCase());
}
printName({ first: "Bob" }); // OK
printName({ first: "Alice", last: "Alisson" }); // OK

// 4.1 유니언 타입 - or
function printId(id: number | string) {
    console.log("Your ID is: " + id); // num, str 둘다 오류 없는 작업
    console.log(id.toUpperCase()); // num 일때 오류 발생
}
printId(101); // OK
printId("202"); // OK
printId({ myID: 22342 }); // obj 여서 오류

// 4.2.1 유니언 좁히기 - 조건 분할(typeof)
function printId2(id: number | string) {
    if (typeof id === "string") {
        // 이 분기에서 id는 'string' 타입을 가집니다

        console.log(id.toUpperCase());
    } else {
        // 여기에서 id는 'number' 타입을 가집니다
        console.log(id);
    }
}

// 4.2.2 유니언 좁히기 - 조건 분할(isArray)
function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // 여기에서 'x'는 'string[]' 타입입니다
      console.log("Hello, " + x.join(" and "));
    } else {
      // 여기에서 'x'는 'string' 타입입니다
      console.log("Welcome lone traveler " + x);
    }
}

// 4.3 공통적 특성을 가지는 유니언 - 반환타입은 number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

// 5.1 타입 별칭
// 동일한 객체, 유니언 타입들을 재사용할 경우 이름을 붙혀 사용
type Point = {
    x: number;
    y: number;
};
   
function printCoord2(pt: Point) { // 위의 타입으로 간편하게 사용
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
   
printCoord2({ x: 100, y: 100 });

// 5.2 유니온 타입 별칭
type ID = number | string; // 이것도 가능

// 5.3 타입 별칭은 단지 별칭에 지나지 않는다
// 특별한 의미를 가지지 않는 동일 타입에 대한 별칭일 뿐
declare function getInput(): string;
declare function sanitize(str: string): string;
// ---중간 생략---
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// 보안 처리를 마친 입력을 생성
let userInput = sanitizeInput(getInput());
 
// 물론 새로운 문자열을 다시 대입할 수도 있습니다
userInput = "new input";

// 6.1 인터페이스
interface MyPoint {
    x: number;
    y: number;
}
   
function printCoord3(pt: MyPoint) { // 파라미터의 구조에만 관심, 타입 검사
console.log("The coordinate's x value is " + pt.x);
console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

// 6.2 인터페이스 vs 타입 별칭
// 6.2.1 확장하기
interface Animal {
    name: string
}

interface Bear extends Animal { // extends
    honey: boolean
}

type Animal1 = {
    name: string
  }
  
type Bear1 = Animal1 & {  // &
    honey: Boolean 
}

// 6.2.2 새 필드 추가
// 인터페이스는 가능, 타입은 생성 된 후 추가 불가능
// 인터페이스는 오직 객체 모양을 선언하는데만 사용
interface value = number | string; // 객체 모양만 가능

// 7 타입 단언 - 타입 스크립트가 제안하는 타입보다 상세하게 명시 가능
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas1 = <HTMLCanvasElement>document.getElementById("main_canvas");
const x = "hello" as number; // 불가능한건 안됨

// 8.1 리터럴 타입 - 구체적인 문자열과 숫자값 지정 가능
function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }
printText("Hello, world", "left");
printText("G'day, mate", "centre");
  
// 8.2 함수 반환값 리터럴
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

// 8.3 type과 함께 쓰는 것도 가능
interface Options {
    width: number;
  }

function configure(x: Options | "auto") {
    // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
  
// 9 리터럴 추론 ★
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // "GET" 이라는 리터럴이 아닌, 문자열로 추론되어 오류 발생

// 9.1 해결 방법 - 타입 단언 추가
// 수정 1:
const req2 = { url: "https://example.com", method: "GET" as "GET" };
// 수정 2
handleRequest(req2.url, req2.method as "GET");

// 9.2 as const 로 객체 전체를 리터럴로 변경
const req3 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req3.url, req3.method);

// 10 null 과 undefined - strictNullChecks이 설정한 경우
function doSomething(x: string | undefined) {
    if (x === undefined) {
      // 아무 것도 하지 않는다
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
}

// 10.1 Null이 아님을 단언 !
function liveDangerously(x?: number | undefined) {
    // 오류 없음
    console.log(x!.toFixed());
}
  