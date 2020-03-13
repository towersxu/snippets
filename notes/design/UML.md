# UML中定义的类与类的交互关系

UML中定义了六种类之间的关系。它们分别是：泛化、实现、关联、聚合、组合、依赖。

*泛化*（Generalization）：可以理解为继承关系

*实现*（Realization）:一般指接口和实现类的关系

*聚合*（Aggregation）:是一种包含关系，A 类对象包含 B 类对象, B 类对象的生命周期可以不依赖 A 类对象的生命周期。

```typescript
class Course {
  constructor (students: Student[]) {
    this.students = students
  }
}
```

*组合*（Composition）:是一种包含关系。A 类对象包含 B 类对象，B 类对象的生命周期跟依赖 A 类对象的生命周期，B 类对象不可单独存在，比如鸟与翅膀之间的关系。

```java
public class A {
  private B b;
  public A() {
    this.b = new B();
  }
}
```

*关联*（Association）:是一种非常弱的关系，包含聚合、组合两种关系。具体到代码层面，如果 B 类对象是 A 类的成员变量，那 B 类和 A 类就是关联关系。

*依赖*（Dependency）:是一种比关联关系更加弱的关系，包含关联关系。不管是 B 类对象是 A 类对象的成员变量，还是 A 类的方法使用 B 类对象作为参数或者返回值、局部变量，只要 B 类对象和 A 类对象有任何使用关系，我们都称它们有依赖关系。
