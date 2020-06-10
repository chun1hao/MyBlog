
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
        let preIdx = i-1
        let current = arr[i]
        while(preIdx>=0 && arr[preIdx]>current){
            arr[preIdx+1] = arr[preIdx]
            preIdx--
        }
        arr[preIdx+1] = current
    }
    return arr
}




