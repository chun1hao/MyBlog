//排序的稳定性：如果两个相等的元素，在排序前后的相对位置保持不变，则是稳定的排序

// 冒泡:遍历n次，每次循环相邻元素两两比较，把其中大的元素往后放
// 冒泡排序不需要额外空间，是本地排序，相等元素是不会交换前后顺序，因而也是稳定排序，时间复杂度为O(n^2)
function bubbleSort(arr){
  for(let i=0;i<arr.length;i++){
    // 最后一个比是最大值，且每循环一次后面的大值就多一个
    for(let j=0;j<arr.length-i-1;j++){
      if(arr[j]>arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

// 选择排序：每次都找一个最大或者最小的排在开始
// 选择排序不需要额外空间，是本地排序，是不稳定排序，时间复杂度为O(n^2)
function selectionSort(arr){
    for(let i=0;i<arr.length-1;i++){
        let minIdx = i
        for(let j=i+1;j<arr.length;j++){
            if(arr[minIdx]>arr[j]){
                minIdx = j
            }
        }
        [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
    }
    return arr
}

// 插入排序：将数组的第一个数认为是有序数组，从后往前（从前往后）扫描该有序数组，把数组中其余n-1个数，根据数值的大小，插入到有序数组中，直至数组中的所有数有序排列为止
// 插入排序：插入排序不需要额外空间，是本地排序，相等元素是不会交换前后顺序，因而也是稳定排序，时间复杂度为O(n^2)
function insertionSort(arr){
    for(let i=1;i<arr.length;i++){
        let current = arr[i]
        let idx = i
        while(idx>0 && arr[idx-1]>current){
            arr[idx] = arr[idx-1]
            idx--
        }
        arr[idx] = current
    }
    return arr
}

// 希尔排序：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序
// 希尔排序不需要额外空间，是本地排序，不稳定，时间复杂度为O(nlogn)

// 原版希尔排序
function shellSort(arr){
  let len = arr.length
  for(let gap=Math.floor(len/2);gap>0;gap=Math.floor(gap/2)){
    for(let i=gap;i<arr.length;i++){
      let idx = i
      let current = arr[i]
      while(idx>0 && arr[idx-gap]>current){
        arr[idx] = arr[idx-gap]
        idx -= gap
      }
      arr[idx] = current
    }
  }
  return arr
}
// Knuth 步长版希尔排序，步长 1, 4, 13, 40, ...
function shellSort(arr){
  let len = arr.length
  let gap = 1
  while(gap < len/3){
    gap = gap*3 +1
  }
  for(;gap>0;gap=Math.floor(gap/3)){
    for(let i=gap;i<len;i++){
      let idx = i
      let current = arr[i]
      for(;idx>0&&arr[idx-gap]>current;idx-=gap){
        arr[idx] = arr[idx-gap]
      }
      arr[idx] = current
    }
  }
  return arr
}

// 归并排序：分而治之算法，以折半的方式来递归/迭代排序元素
// 首先把一个未排序的序列从中间分割成2部分，再把2部分分成4部分，依次分割下去，直到分割成一个一个的数据，再把这些数据两两归并到一起，使之有序，不停的归并，最后成为一个排好序的序列
// 归并排序需要额外空间，空间复杂度为O(n)，不是本地排序，相等元素是不会交换前后顺序，因而是稳定排序。时间复杂度为O(nlogn)
function merge(left, right){
  let i=0
  let j=0
  let res = []
  while(i<left.length && j<right.length){
    if(left[i]<right[j]){
      res.push(left[i++])
    }else{
      res.push(right[j++])
    }
  }  
  // 处理剩余的元素
  if(i<left.length){
    res = res.concat(left.slice(i))
  }
  if(j<right.length){
    res = res.concat(right.slice(j))
  }
  return res
}
// 递归
function mergeSort(arr){
  let len = arr.length
  if(len<2) return arr
  let mid = Math.floor(len/2)
  let left = mergeSort(arr.slice(0,mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
// 迭代
function mergeSort(arr){
  let len = arr.length
  for(let i=1; i<len; i*= 2){
    for(let j=0; j<len; j+= i*2){
      let C = merge(arr.slice(j, i+j),arr.slice(i+j, j+i*2))
      arr.splice(j ,i*2, ...C)
    }
  }
  return arr
}

// 快速排序：同归并，也是分而治之的排序
// 先找基准，然后分隔为两个数组，再在分隔的数组中找基准，继续分隔到只有一个元素
// 快速排序额外空间，复杂度为O(n)，时间复杂度为O(nlogn)，不稳定
function quickSort(arr){  
  if(arr.length<2) {
    return arr
  }
  // 找到基准，并从原数组删除
  let pivotIndex = Math.floor(arr.length/2) 
  let pivot = arr.splice(pivotIndex,1)[0]  

  let min = []
  let max = []  
  for(let i=0;i<arr.length;i++){
    if(arr[i]>pivot){
      max.push(arr[i])
    }else{
      min.push(arr[i])
    }
  }
  return quickSort(min).concat(pivot, quickSort(max))
}

