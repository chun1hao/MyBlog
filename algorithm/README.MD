## 时间复杂度
程序运行从开始到结束所需要的时间

### 常见时间复杂度：
- O(1): 常数阶 
```
  没有循环语句
 ```
- O(n): 线性阶 
```
  一重循环
 ```
 - O(log n): 对数阶
 ```
 var number = 1
while(number < 100){
    number *= 2
}
// 假设循环次数为 x，2^x = n, x = log2n, 即 O(logn)
 ```
 - O(n^2): 平方阶
 ```
// 常见两层循环
for(let i=0;i<n;i++){
    for(let j=i;j<n;j++){
      ......
    }
}
// n+n-1+n-2+n-3+...+3+2+1
// n+n(n-1)/2
// n/2+n^2/2
// 保留最高阶 n^2*1/2
// 去掉常数 n^2
 ```
 - O(n^3): 立方阶
 - O(2^n): 指数阶
 - O(n!):  阶乘阶 
 
 *O(1) < O(logn) < O(n) < O(nlogn) < O(n²) < O(n³) < O(2ⁿ) <O(n!)*
 
## 空间复杂度
运行完一个程序所需内存的大小

假设原始数据大小为n，一个算法需要m大小的内存才能运行，那么我们就有一个函数f(n)=m。这个函数去掉常数项和尾数项就是空间复杂度

比如说，如果用冒泡排序对数据排序，如果直接在原始数据上排，那么根本不需要额外的存储空间，而最多只需要定义几个变量，那么复杂度就是1
如果排序产生一个新的数组，不修改原来的数组，那么对于排序n个数据，就需要n个新的存储空间，那么复杂度就是n。
再比如，对于两个数组，求它们的笛卡儿积（比如a=1,2,3 b=a,b，结果是1a 1b 2a 2b 3a 3b），那么它的复杂度就是n^2

## 推算方法
1. 用常数1来取代运行时间中所有加法常数。
2. 修改后的运行次数函数中，只保留最高阶项
3. 如果最高阶项存在且不是1，则去除与这个项相乘的常数。
 
  
  