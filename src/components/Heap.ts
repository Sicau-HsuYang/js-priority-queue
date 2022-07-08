/**
 * 抽象堆
 */
class Heap<T> {
  public get count() {
    return this.size;
  }
  /**
   * 定义哨兵的最值，所有插入堆的元素都必须和这个值比较
   */
  protected SENTRY!: T;

  /**
   * 定义一个存储数据的内存空间
   */
  private data: Array<T> = [];

  /**
   * 当前堆的元素个数
   */
  private size: number = 0;

  /**
   * 比较函数, 通过先前和当前元素的比较，决定是否将当前元素提置先前元素前
   */
  protected compare!: (preVal: T, curVal: T) => boolean | undefined;

  /**
   * 自身用于比较的函数
   * @param preVal 被比较的值
   * @param curVal 当前值
   */
  private selfCompare(preVal: T, curVal: T) {
    return this.compare(preVal, curVal);
  }

  private validInitParams() {
    if (this.SENTRY === void 0) {
      throw `can not insert queue before the sentry been set `;
    }
    if (this.compare === void 0) {
      throw `can not insert queue before the compare callback been set `;
    }
  }

  constructor(...initElements: Array<T>) {
    // 初始化数组元素
    initElements.forEach((v, i) => {
      this.data[i + 1] = v;
      this.size++;
    });
    this.buildHeap();
  }

  /**
   * 设置哨兵元素
   * @param sentryEle
   */
  setSentry(sentryEle: T) {
    this.SENTRY = sentryEle;
    this.data[0] = this.SENTRY;
  }

  /**
   * 设置比较函数
   * @param compareFunc 比较函数
   */
  setCompare(compareFunc: (preEle: T, curEle: T) => boolean) {
    this.compare = compareFunc;
  }

  /**
   * 获取堆中最小的元素
   * @returns
   */
  public getMin() {
    if (this.size == 0) {
      throw `can not get element from an empty heap`;
    }
    return this.data[1];
  }

  /**
   * 判断堆是否为空
   * @returns
   */
  public isEmpty() {
    return this.size === 0;
  }

  /**
   * 向堆中插入一个合法值
   * @param val
   */
  public insertQueue(val: T) {
    this.validInitParams();
    if (this.selfCompare(this.SENTRY, val)) {
      throw `can not insert val bigger or smaller than ${this.SENTRY}`;
    }
    // 堆的容量扩充1
    this.size++;
    // 让i指向当前新位置
    let i = this.size;
    // 因为有哨兵的关系，不需要添加约束条件 i > 0
    // this.#data[Math.floor(i / 2)] > val
    while (this.selfCompare(this.data[Math.floor(i / 2)], val)) {
      this.data[i] = this.data[Math.floor(i / 2)];
      i = Math.floor(i / 2);
    }
    this.data[i] = val;
  }

  /**
   * 获取堆中的最小元素
   * @returns {T}
   */
  protected deleteQueue() {
    if (this.isEmpty()) {
      throw "can not delete element from empty heap";
    }
    // 取出堆顶的元素
    let firstVal = this.data[1];
    let temp = this.data[this.size--];
    this.data[1] = temp;
    // JavaScript语言需要进行这一步，让数组的规模缩小，释放空间
    this.data.length--;
    this.percDown(1);
    return firstVal;
  }

  /**
   * 下滤：将堆中以堆data[p]为根的子堆调整为最小堆
   * @param p 根节点索引
   */
  protected percDown(p: number) {
    let parent: number, child: number;
    let temp = this.data[p]; /* 取出根结点存放的值 */
    for (parent = p; parent * 2 <= this.size; parent = child) {
      child = parent * 2;
      /* child指向左右子结点的较?者 */
      if (child != this.size && this.selfCompare(this.data[child + 1], this.data[child])) {
        child++;
      }
      /* 找到了合适位置 */
      if (this.selfCompare(this.data[child], temp)) {
        break;
      } else {
        /* 下滤X */
        this.data[parent] = this.data[child];
      }
    }
    this.data[parent] = temp;
  }

  /**
   * 构建堆
   */
  protected buildHeap() {
    /* 调整data中的元素，使满足最堆的有序性  */
    /* 这里所有size个元素已经存在data[]中 */
    /* 从最后一个结点的父节点开始，到根结点1 */
    for (let i = Math.floor(this.size / 2); i > 0; i--) {
      this.percDown(i);
    }
  }
}

export default Heap;
