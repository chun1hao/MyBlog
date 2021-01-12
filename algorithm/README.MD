## [排序算法](https://github.com/chun1hao/MyBlog/blob/master/algorithm/sort.js)

![image](https://github.com/chun1hao/MyBlog/blob/master/algorithm/%E5%A4%8D%E6%9D%82%E5%BA%A6.png)
  
小总结：
1. 在所有排序中，快速排序是最快的排序方法
2. 如果有大量重复元素，可以选择三路快排
3. 近乎有序的，可以选择插入排序
4. 取值范围有限（跨度不大的情况），可以选择计数排序
5. 如果需要稳定排序，可以归并排序

对于有序数组查找是否包含某个元素可以使用二分查找法，其时间复杂度为 O(logn)
```javascript
function binarySearch(arr, target){
    let len= arr.length, l = 0, r = len-1;
    while(l <= r){
        let mid = Math.floor((l+r)/2)
        if(arr[mid] == target){
            return mid
        }else if(arr[mid] < target){
            l = mid + 1
        }else{
            r  = mid - 1
        }
    }
}
```
