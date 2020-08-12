## 1. 栈
运算受限的线性表，只能在栈顶进行删除和插入操作，**先进后出** 概念

## 2. 队列
受限的线性表,''受限''体现在只能从表的前端(队头)进行删除,只能从表的后端(队尾)进行插入，**先进先出**
```javascript
class MyCircularQueue{
    // 构造器
    constructor (k) {
        // 建立长度为k的循环队列
        this.arr= Array(k)
        this.length = k
        // 声明队首指针front
        this.front = 0
        // 声明队尾指针rear
        this.rear = 0     
    }
    // 获取队首元素
    Front () {
        // 如果队列为空,返回-1 否则直接返回front指向的值
        return this.isEmpty()? -1 : this.arr[this.front]
    }
    // 获取队尾元素
    Rear () {
        // 如果此时rear指针指向0的位置,返回队列最后一位,否则返回下一位
        let rearItem = this.rear -1 < 0 ? this.length -1 : this.rear -1 
        return this.isEmpty()?-1: this.arr[rearItem]
    }
    // 插入元素
    enQueue (value) {
        // 先判断队列是否是已满状态
        if(this.isFull()){
            return false
        }else{
            // 插入元素
            this.arr[this.rear] = value
            // 移动rear指针位置,考虑到循环队列指针的变动,用取模的方式, 如果this.rear+1超出长度指向开头
            this.rear = (this.rear+1) % this.length
            return true
        }
    }
    // 删除元素
    deQueue () {
        // 先判断队列是否为空
        if(this.isEmpty()){
            return false
        }else{
            this.arr[this.front] = ''
            // 如果this.front+1超出长度指向开头
            this.front = (this.front+1) % this.length
            return true
        }
    }    
    // 判断队列是否为空
    isEmpty () {
        // 头尾指针指向同一个地址并且队首元素为空
        return this.rear === this.front && !this.arr[this.front]
    }
    // 判断队列是否已满
    isFull () {
        // 头尾指针指向同一个地址并且队首元素不为空
        return this.rear === this.front && !!this.arr[this.front]
    }
}
```
