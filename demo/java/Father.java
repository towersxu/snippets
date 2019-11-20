package demo.java;

interface Father {
  public String getLastName();
  public String getY();
}

interface Person {
  public int getAge(String a);
  public Integer getAge();
}

interface Child extends Father, Person {
  public void goToSchool();
}

class C implements Father, Person {
  
  public String getLastName () {
    return "x";
  }
  
  public String getY() {
    return "Y";
  }

  public Integer getAge() {
    return 11;
  }
  
  public int getAge(String a) {
    return 11;
  }
}
