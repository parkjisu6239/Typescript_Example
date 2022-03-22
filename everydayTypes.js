// 1.1 변수에 대한 타입 표기 - 원시타입(선택사항)
var myName = "jisu";
var age = 27;
var toggle = true;
// 1.2 Array
var numArray1 = [1, 2, 3];
var numArray2 = [4, 5, 6];
var strArray1 = ["a", "b", "c"];
var strArray2 = ["e", "f", 'g'];
// 1.3 any
var obj = { x: 0 };
obj.foo(); // any 지정해서 오류 안 생김
obj();
obj.bar = 100;
obj = "hello";
var n = obj;
// 2.1 함수 - 파라미터의 타입 명시
function greet(name) {
    console.log("Hello, " + name.toUpperCase() + "!");
}
greet(42); // Argument of type 'number' is not assignable to parameter of type 'string'.
// 2.2 함수 - 파라미터, 반환 타입 명시
function addFive(x) {
    return x + 5;
}
// 2.3 익명함수 - 문맥적 타입 부여 :  파라미터의 타입을 지정하지 않았지만, string이라는 것을 ts가 알고 있음
var names = ["Alice", "Bob", "Eve"];
names.forEach(function (s) {
    console.log(s.toUppercase()); // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
// 3.1 객체 타입 - 객체 프로퍼티의 타입
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
// 3.2 옵셔널 프로퍼티 - ? 로 표기
function printName(obj) {
    var _a;
    console.log(obj.last.toUpperCase()); // 오류 - `obj.last`의 값이 제공되지 않는다면 프로그램이 멈추게 됩니다!
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }
    // 최신 JavaScript 문법을 사용하였을 때 또 다른 안전한 코드
    console.log((_a = obj.last) === null || _a === void 0 ? void 0 : _a.toUpperCase());
}
printName({ first: "Bob" }); // OK
printName({ first: "Alice", last: "Alisson" }); // OK
// 4.1 유니언 타입 - or
function printId(id) {
    console.log("Your ID is: " + id); // num, str 둘다 오류 없는 작업
    console.log(id.toUpperCase()); // num 일때 오류 발생
}
printId(101); // OK
printId("202"); // OK
printId({ myID: 22342 }); // obj 여서 오류
// 4.2.1 유니언 좁히기 - 조건 분할(typeof)
function printId2(id) {
    if (typeof id === "string") {
        // 이 분기에서 id는 'string' 타입을 가집니다
        console.log(id.toUpperCase());
    }
    else {
        // 여기에서 id는 'number' 타입을 가집니다
        console.log(id);
    }
}
// 4.2.2 유니언 좁히기 - 조건 분할(isArray)
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // 여기에서 'x'는 'string[]' 타입입니다
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // 여기에서 'x'는 'string' 타입입니다
        console.log("Welcome lone traveler " + x);
    }
}
// 4.3 공통적 특성을 가지는 유니언 - 반환타입은 number[] | string
function getFirstThree(x) {
    return x.slice(0, 3);
}
function printCoord2(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord2({ x: 100, y: 100 });
function sanitizeInput(str) {
    return sanitize(str);
}
// 보안 처리를 마친 입력을 생성
var userInput = sanitizeInput(getInput());
// 물론 새로운 문자열을 다시 대입할 수도 있습니다
userInput = "new input";
function printCoord3(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord3({ x: 100, y: 100 });
number | string; // 객체 모양만 가능
// 7 타입 단언 - 타입 스크립트가 제안하는 타입보다 상세하게 명시 가능
var myCanvas = document.getElementById("main_canvas");
var myCanvas1 = document.getElementById("main_canvas");
var x = "hello"; // 불가능한건 안됨
// 8.1 리터럴 타입 - 구체적인 문자열과 숫자값 지정 가능
function printText(s, alignment) {
    // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// 8.2 함수 반환값 리터럴
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
function configure(x) {
    // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
var req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // "GET" 이라는 리터럴이 아닌, 문자열로 추론되어 오류 발생
// 9.1 해결 방법 - 타입 단언 추가
// 수정 1:
var req2 = { url: "https://example.com", method: "GET" };
// 수정 2
handleRequest(req2.url, req2.method);
// 9.2 as const 로 객체 전체를 리터럴로 변경
var req3 = { url: "https://example.com", method: "GET" };
handleRequest(req3.url, req3.method);
// 10 null 과 undefined - strictNullChecks이 설정한 경우
function doSomething(x) {
    if (x === undefined) {
        // 아무 것도 하지 않는다
    }
    else {
        console.log("Hello, " + x.toUpperCase());
    }
}
// 10.1 Null이 아님을 단언 !
function liveDangerously(x) {
    // 오류 없음
    console.log(x.toFixed());
}
