# 堆(优先队列)在 JS 中的实现

本项目是使用 JS 实现的一个优先队列，可以支持基本数据类型或者对象类型，队列元素的优先级由外部决定

# 如何使用

## 1、使用打包工具

如果队列的元素不是基本数据类型，可以使用以下方式生成一个`最小堆`

```js
import { Heap } from "js-priority-queue";

const minHeap = new Heap();

minHeap.setSentry({
  name: "sentry",
  score: -Infinity,
});

minHeap.setCompare((preVal, curVal) => {
  return preVal.score >= curVal.score;
});

minHeap.insertQueue({
  name: "zhangsan",
  score: 100,
});

minHeap.insertQueue({
  name: "lisi",
  score: 112,
});

minHeap.insertQueue({
  name: "wangwu",
  score: 67,
});

while (!minHeap.isEmpty()) {
  console.log(minHeap.deleteQueue());
}
// 依次打印
// { name: 'wangwu', score: 67 }
// { name: 'zhangsan',score: 100 }
// { name: 'lisi',score: 112 }
```

如果队列的元素不是基本数据类型，可以使用以下方式生成一个`最大堆`

```js
import { Heap } from "js-priority-queue";
const maxHeap = new Heap();

maxHeap.setSentry({
  name: "sentry",
  score: Infinity,
});

maxHeap.setCompare((preVal, curVal) => {
  return preVal.score <= curVal.score;
});

maxHeap.insertQueue({
  name: "zhangsan",
  score: 100,
});

maxHeap.insertQueue({
  name: "lisi",
  score: 112,
});

maxHeap.insertQueue({
  name: "wangwu",
  score: 67,
});

while (!maxHeap.isEmpty()) {
  console.log(maxHeap.deleteQueue());
}
// 依次打印
// { name: 'lisi',score: 112 }
// { name: 'zhangsan',score: 100 }
// { name: 'wangwu', score: 67 }
```

如果队列的元素基本类型，如 number，可以按以下方式使用`最大堆`:

```js
import { SimpleMaxHeap as MaxHeap } from "js-priority-queue";
const MaxHeap = SimpleMaxHeap;
const maxHeap = new MaxHeap();

maxHeap.insertQueue(100);

maxHeap.insertQueue(112);

maxHeap.insertQueue(67);

while (!maxHeap.isEmpty()) {
  console.log(maxHeap.deleteQueue());
}
// 依次打印
// 112
// 100
// 67
```

## 2、不使用构建工具

如果你不想使用构建工具，可以直接使用打包好的`UMD`版本

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>heap test</title>
  </head>
  <body>
    <script src="../dist/index.js"></script>
    <script>
      /* 最小堆测试 */
      const MinHeap = JsPriorityQueue.Heap;
      const minHeap = new MinHeap();

      minHeap.setSentry({
        name: "sentry",
        score: -Infinity,
      });

      minHeap.setCompare((preVal, curVal) => {
        return preVal.score >= curVal.score;
      });

      minHeap.insertQueue({
        name: "zhangsan",
        score: 100,
      });

      minHeap.insertQueue({
        name: "lisi",
        score: 112,
      });

      minHeap.insertQueue({
        name: "wangwu",
        score: 67,
      });

      while (!minHeap.isEmpty()) {
        console.log(minHeap.deleteQueue());
      }
    </script>
  </body>
</html>
```

# API

### Heap

| 参数名      | 类型                              | 释义                                                                                                                                       |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| size        | number                            | 返回当前堆中的元素个数                                                                                                                     |
| setSentry   | T                                 | 设置哨兵元素，设置堆所允许存储不超过其值的最大或最小元素，用于参与堆的元素顺序调整时的比较，必须在开始插入元素之前设置                     |
| setCompare  | (preVal: T, curVal: T) => boolean | 设置交换元素的规则，如果 preVal 大于等于 curVal 返回 true,则会将 curVal 向堆前部移动，否则向后移动，可以用其来控制当前堆是最大堆还是最小堆 |
| getMin      | () => T                           | 获取堆顶的元素                                                                                                                             |
| isEmpty     | () = boolean                      | 判断堆是否为空                                                                                                                             |
| insertQueue | (val: T） => void                 | 向堆中插入一个元素                                                                                                                         |
| deleteQueue | (） => T                          | 从堆顶删除一个元素                                                                                                                         |

### SimpleMaxHeap

继承自 Heap,简化调用

| 参数名     | 类型                              | 释义                                                                                                                                       | 默认值                                          |     |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | --- |
| setSentry  | number                            | 设置哨兵元素，设置堆所允许存储不超过其值的最大或最小元素，用于参与堆的元素顺序调整时的比较，必须在开始插入元素之前设置                     | Infinity                                        |
| setCompare | (preVal: T, curVal: T) => boolean | 设置交换元素的规则，如果 preVal 大于等于 curVal 返回 true,则会将 curVal 向堆前部移动，否则向后移动，可以用其来控制当前堆是最大堆还是最小堆 | (preVal, curVal) => { return preVal <= curVal;} |
| deleteMax  | () => T                           | 语义化 API 需要，封装自 deleteQueue 方法                                                                                                   | -                                               |

### SimpleMinHeap

继承自 Heap,简化调用

| 参数名     | 类型                              | 释义                                                                                                                                       | 默认值                                          |     |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | --- |
| setSentry  | number                            | 设置哨兵元素，设置堆所允许存储不超过其值的最大或最小元素，用于参与堆的元素顺序调整时的比较，必须在开始插入元素之前设置                     | -Infinity                                       |
| setCompare | (preVal: T, curVal: T) => boolean | 设置交换元素的规则，如果 preVal 大于等于 curVal 返回 true,则会将 curVal 向堆前部移动，否则向后移动，可以用其来控制当前堆是最大堆还是最小堆 | (preVal, curVal) => { return preVal >= curVal;} |
| deleteMin  | () => T                           | 语义化 API 需要，封装自 deleteQueue 方法                                                                                                   | -                                               |
