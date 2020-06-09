
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

// 插入排序：从有序序列的尾部开始，逐个与目标元素比较，如果大于目标元素，该元素需要后移，第一次将第一个元素作为一个有序序列
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




