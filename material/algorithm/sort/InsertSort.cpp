#include <stdio.h>

int main(int argc, char *argv[])
{
  int arr[5] = {412, 34, 31, 32, 12};
  for (int i = 1; i < sizeof(arr) / sizeof(arr[0]); i++)
  {
    int value = arr[i];
    int j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = value;
  }
  for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
  }
}