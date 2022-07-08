import Heap from "./Heap";

class SimpleMaxHeap extends Heap<number> {
  constructor(...initElements: number[]) {
    super(...initElements);
    this.setSentry(Infinity);
    this.setCompare((preVal, curVal) => {
      return preVal <= curVal;
    });
  }

  deleteMax() {
    return this.deleteQueue();
  }
}

export default SimpleMaxHeap;
