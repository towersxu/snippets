/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let hasNext = true;
  let isMore = 0
  let start = l1
  while (hasNext) {
    let added = l1.val + l2.val + isMore;
    hasNext = false;
    isMore = 0;
    if (added > 9) {
      added = added - 10
      isMore = 1
    }
    l1.val = added
    if (l1.next || l2.next) {
      if (l1.next === null) {
        l1.next = new ListNode(0)
      }
      if (l2.next === null) {
        l2.next = new ListNode(0)
      }
      l1 = l1.next
      l2 = l2.next

      hasNext = true
    } else if (isMore === 1) {
      l1.next = new ListNode(1)
    }
  }
  return start
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}

let l1 = new ListNode(0)
let l11 = new ListNode(8)
l1.next = l11;
let l12 = new ListNode(8)
l11.next = l12;
let l13 = new ListNode(8)
l12.next = l13;
let l14 = new ListNode(8)
l13.next = l14;
let l15 = new ListNode(2)
l14.next = l15;
let l16 = new ListNode(9)
l15.next = l16;
let l17 = new ListNode(3)
l16.next = l17;
let l18 = new ListNode(1)
l17.next = l18;
let l19 = new ListNode(1)
l18.next = l19;


let l2 = new ListNode(0)
let l21 = new ListNode(9)
let l22 = new ListNode(1)
let l23 = new ListNode(5)
let l24 = new ListNode(5)
let l25 = new ListNode(5)
let l26 = new ListNode(1)
let l27 = new ListNode(1)
let l28 = new ListNode(6)
l2.next = l21;
l21.next = l22;
l22.next = l23;
l23.next = l24;
l24.next = l25;
l25.next = l26;
l26.next = l27;
l27.next = l28;


addTwoNumbers(l1, l2)