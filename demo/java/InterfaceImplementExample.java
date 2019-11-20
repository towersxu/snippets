package demo.java;

public class InterfaceImplementExample implements InterfaceExample {
  @Override
  public void func1() {
    System.out.println("func1");
  }
  public static void main(String[] args) {
    InterfaceImplementExample i = new InterfaceImplementExample();
    i.func1();
    System.out.println(i.x);
  }
}