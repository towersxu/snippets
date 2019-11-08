function plunk(o, names) {
  return names.map(n => o[n])
}

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: 'Jarid',
  age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]

type s = "name" | "age";

type a = Pick<Person, s >

function getPerson() : a {
  return {
    name: "xx",
    age: 22
  }
}