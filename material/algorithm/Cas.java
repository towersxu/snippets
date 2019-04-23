package material.algorithm;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * @see https://www.cnblogs.com/stateis0/p/9062006.html
 */

class Cas {
  public static void main(String[] args) throws InterruptedException {
    AtomicInteger integer = new AtomicInteger();
    System.out.println(integer.get());


    Thread[] threads = new Thread[1000];

    for (int j = 0; j < 1000; j++) {
      threads[j] = new Thread(() ->
          integer.incrementAndGet()
      );
      threads[j].start();
    }

    for (int j = 0; j < 1000; j++) {
      threads[j].join();
    }

    System.out.println(integer.get());
  }
}