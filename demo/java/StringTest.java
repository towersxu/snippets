package demo.java;

class StringTest {
  public static void main(String[] args) {
    short s = 1;
    s = (short)(s + 1);
    s += 1;
    System.out.println(s);

  }
  private String id;
  public StringTest (String id) {
    
  }
  public String getId () {
    return this.id;
  }
  public void setId (String id) {
    this.id = id;
  }
}

