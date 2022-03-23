// 1. typeof
function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") { // 타입 가드
        return " ".repeat(padding) + input; // ts가 구문검사로 number로 가이드함
    }
    return padding + input;
}

// 2. && 와 등호
function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }


// 3. !로 빈문자열, undefined 제외
function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
        return values;
    } else {
        return values.map((x) => x * factor);
    }
}

// 4. 느슨한 일치로 둘다 제외
interface Container {
    value: number | null | undefined;
  }
   
function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value != null) {
        console.log(container.value);

    // Now we can safely multiply 'container.value'.
        container.value *= factor;
    }
}

// 5. in
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
  } else {
    animal;
  }
}

// 6. 선언할 때 자동으로 타입도 지정
let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);

x = true;
console.log(x);

// 7. 제어 흐름에서 타입 변경 감지
function example() {
    let x: string | number | boolean;
   
    x = Math.random() < 0.5;
   
    console.log(x);

    if (Math.random() < 0.5) {
      x = "hello";
      console.log(x);
    } else {
      x = 100;
      console.log(x);
    }
   
    return x;
}

// 8. 타입 예측 is
function isFish(pet: Fish | Bird): pet is Fish { // 내가 정의한 타입검사 함수의 반환값을 명시
    return (pet as Fish).swim !== undefined;
}

declare function getSmallPet(): Fish | Bird;
let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// 9. Discriminated unions
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    }
}

// 10. Never
interface Triangle {
    kind: "triangle";
    sideLength: number;
  }
   
type Shape2 = Circle | Square | Triangle;
   
function getArea2(shape: Shape2) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
  