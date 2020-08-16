## 1. 栈
运算受限的线性表，只能在栈顶进行删除和插入操作，**先进后出** 概念

## 2. 队列
受限的线性表,''受限''体现在只能从表的前端(队头)进行删除,只能从表的后端(队尾)进行插入，**先进先出**

```javascript
// 循环队列实现
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
3. 链表
链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。链表由一系列结点（链表中每一个元素称为结点）组成，每个结点都包含一个值和一个 next 指针

**单链表**

```javascript
// 定义 node 结点
class Node{
    constructor(val, next = null){
        this.val = val
        this.next = next
    }
}
class MyLinkedList{
    constructor(){
        this.length = 0
        this.head = null
    }
    
    // 获取 index 结点的值
    get(index){ 
        if(index <0 || index >=this.length) return -1
        let cur = this.head
        while(index-- >0){
            cur = cur.next
        }
        return cur.val
    }
    
    // 在链表开头新增一个结点
    addAtHead(val){
        let node = new Node(val)
        node.next = this.head
        this.head = node
        this.length++
    }
    
    // 在链表末尾新增一个结点
    addAtTail(val){
        let node = new Node(val), cur = this.head
        while(cur && cur.next){
            cur = cur.next
        }
        cur.next = node
        this.length++
    }
    
    // 在链表 index 处新增一个结点
    addAtIndex(index,val){
        if(index <= 0) return this.addAtHead(val)
        if(index > this.length) return
        if(index == this.length) return this.addAtTail(val)
        let node = new Node(val), cur = this.head
        while(index-- > 1){
            cur = cur.next
        }
        node.next = cur.next
        cur.next = node        
        this.length++
    }
    
    // 删除 index 处的结点
    deleteAtIndex(index){
        if(index <0 || index >= this.length) return 
        if(index ==0) {
            this.head = this.head.next            
        }else{            
            let cur = this.head
            while(index-- >1){
                cur = cur.next
            }
            cur.next = cur.next.next
        }
        this.length--
    }
}
```

**双链表**

不同于单链表，其每个结点还包含一个向前的指针

**循环链表**

最后一个结点的 next 不是指向 null，而是指向 head
