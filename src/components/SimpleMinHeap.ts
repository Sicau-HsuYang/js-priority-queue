import Heap from "./Heap";

class SimpleMinHeap extends Heap<number> {
  constructor(...initElements: number[]) {
    super(...initElements);
    this.setSentry(-Infinity);
    this.setCompare((preVal, curVal) => {
      return preVal >= curVal;
    });
  }

  deleteMin() {
    return this.deleteQueue();
  }
}

export default SimpleMinHeap;
