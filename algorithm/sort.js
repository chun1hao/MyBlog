//排序的稳定性：如果两个相等的元素，在排序前后的相对位置保持不变，则是稳定的排序

// 冒泡:遍历n次，每次循环相邻元素两两比较，把其中大的元素往后放
// 冒泡排序不需要额外空间，是本地排序
// 相等元素是不会交换前后顺序，是稳定排序
// 时间复杂度最差情况为O(n^2)，即倒序排列，最好为O(n),已经排好的情况，平均O(n^2)
function bubbleSort(arr){
  for(let i=0;i<arr.length-1;i++){
    // 最后一个比是最大值，且每循环一次后面的大值就多一个
    for(let j=0;j<arr.length-i-1;j++){
      if(arr[j]>arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

// 冒泡优化，在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者)
function bubbleSort(arr){
  let len = arr.length, l = 0,h = len - 1
  while(l<h){
      // 将最大值，冒泡到最后面
      for(let i = l; i< h;i++){
          if(arr[i]>arr[i+1]){
              [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
          }            
      }
      h--
      // // 将最小值，冒泡到最前面
      for(let i = h; i > l;i--){
          if(arr[i] < arr[i-1]){
              [arr[i],arr[i-1]] = [arr[i-1],arr[i]]
          }            
      }
      l++
  }
}

// 选择排序：每次都找一个最大或者最小的排在开始
// 选择排序不需要额外空间，是本地排序，是不稳定排序，时间复杂度稳定为O(n^2)
// 在数据规模小的时候可以选择
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
// 插入排序不需要额外空间，是本地排序，相等元素是不会交换前后顺序，因而也是稳定排序，时间复杂度为O(n^2)
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

// 希尔排序：先将整个待排序的记录序列按照增量分割成为若干子序列，然后分别进行直接插入排序，再减小增量（直至为1）
// 利用了插入排序的特性，越有序插入排序越快
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
// 归并排序需要额外空间，空间复杂度稳定为O(n)，不受数据影响，不是本地排序，相等元素是不会交换前后顺序，因而是稳定排序。时间复杂度为O(nlogn)
function merge(left, right){
  let result = [];
  while(left.length && right.length){
      // 注意此处比较为 <= ,否则排序不稳定
      if(left[0] <= right[0]){
          result.push(left.shift())
      }else{
          result.push(right.shift())
      }
  }
  // 处理剩余元素，只会有一个还存在元素
  return result.concat(left).concat(right)
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
// 快速排序需要额外空间，复杂度为O(n)，时间复杂度为O(nlogn)，不稳定
function quickSort(arr){
  let len = arr.length
  if(len<2) {
    return arr
  }
  // 找到基准，并从原数组删除
  let pivotIndex = Math.floor(len/2) 
  let pivot = arr[pivotIndex]  

  let min = []
  let max = []  
  for(let i=0;i<len;i++){
    if(i===pivotIndex) continue
    if(arr[i]>pivot){
      max.push(arr[i])
    }else{
      min.push(arr[i])
    }
  }
  return quickSort(min).concat(pivot, quickSort(max))
}
// 快排优化：原地排序
// 已最后一个元素为基准，创建一个指针 pos，默认值为开始的位置 -1，遇到小于或等于基准的元素 +1，然后交换元素
// 完成后，已pos将数组分隔为两个数，递归执行
// 直到 开始 位置大于等于 结束位置，即只有一个元素或0个元素的时候，结束排序
function quickSort(arr, start = 0, end = arr.length - 1){
  if(start < end){
    let pos = start - 1
    let povit = arr[end]
    for(let i=start;i<=end;i++){
      if(arr[i] <= povit){ // 必须是小于等于 否则死循环
        pos++
        [arr[i], arr[pos]] = [arr[pos], arr[i]]
      }
    }
    quickSort(arr, start, pos - 1);
    quickSort(arr, pos + 1 , end);
  }  
  return arr
}
// 三路快排：分成三个，大于基准、小于基准和等于基准
// 原地排序
function quickSort(arr, start = 0, end = arr.length - 1){
  let povit = arr[start] // 取第一个为基准
  let leftPos = start - 1
  let rightPos = end + 1
  if(start<end){ // 数组为0或1时，递归结束
    for(let i=start+1;i<rightPos;){ // 遍历到大于基准的数组开始的位置
      if(arr[i]<povit){
        leftPos++
        [arr[i], arr[leftPos]] = [arr[leftPos], arr[i]]
        i++
      }else if(arr[i]>povit){
        rightPos--
        [arr[i], arr[rightPos]] = [arr[rightPos], arr[i]]
      }else{
        i++
      }
    }
    quickSort(arr, start, leftPos)
    quickSort(arr, rightPos, end)
  }    
  return arr
}
// 简易版
const quickSort = arr=> arr.length > 1 ? [...quickSort(arr.filter(i=>i<arr[0])), ...arr.filter(i=>i==arr[0]),...quickSort(arr.filter(i=>i>arr[0]))]:arr

// 堆排序
// 堆排序不需要额外空间，本地排序，空间复杂度为O(1)，时间复杂度为O(nlogn)，不稳定

// 二叉树的基本知识：
// 满二叉树：所有节点都是满的，假设深度为 k，节点数为 2^(k+1)-1，第 i 层拥有节点 2^(i-1) 
// 完全二叉树：除最后一层，其他都是满的

// 0,1,2,3,4,5,6,7,8,9
//             0
//       1         2
//    3     4   5   6
//  7 8   9
// 某个节点下标为 idx 
// 父节点下标：Math.floor((idx-1)/2)
// 左边子节点：2*idx+1 右边：2*idx+2

// 递归
function heapify(arr, i, len){
  let maxIdx = i,
      leftChildIdx = 2*i + 1,
      rightChildIdx = 2*i + 2;
  // 这里是 <len 是处理后面最大值已经交换之后的情况
  if(leftChildIdx < len && arr[leftChildIdx] > arr[maxIdx]){
    maxIdx = leftChildIdx
  }
  if(rightChildIdx < len && arr[rightChildIdx] > arr[maxIdx]){
    maxIdx = rightChildIdx
  }
  if(i !== maxIdx){
    [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]]
    // 处理交换后的节点的子节点
    heapify(arr, maxIdx, len)
  }
}
// 遍历
function heapify(arr, i, len){
  // 这里一个节点比较完后，下一个为当前节点的子节点
  for(let j=2*i+1;j<len;j=2*j+1){
    // 找出子节点大的哪一个与父节点比较
    if(j+1<len && arr[j]<arr[j+1]){
      // 如果右边的大，则将 j 置为右边的 index
      j++
    }
    if(arr[j]>arr[i]){
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i = j
    }
  }
}
function heapSort(arr){
  let len = arr.length
  // 先初始化数组为一个大堆根，从最后一个父节点开始调整
  for(let i = Math.floor(len/2) -1; i>=0; i--){
    heapify(arr, i, len)
  }
  // 将第一个元素与最后一个元素交换，然后将第一到最后一个之前的再进行调整
  for(let i = len-1; i>=0; i--){    
    [arr[0], arr[i]] = [arr[i], arr[0]]
    len -= 1
    heapify(arr, 0, len) 
  }
  return arr
}

// 计数排序：统计每个元素重复出现的次数，然后从小到大按顺序填充数组
// 开一个新数组，新数组下标对应给定数组的值，其对应值为出现次数，最后遍历新数组，将值写入到之前数组中
// 计数排序适合整数排序，时间复杂度为O(n+k)，其中 K 为最大最小之差，空间复杂度为O(k)，稳定排序
function countSort(arr){
  let min = arr[0]
  let count = []
  for(let i=1;i<arr.length;i++){
    if(min > arr[i]){
      min = arr[i]
    }
  }
  // 将下标置为arr中元素的值，下标对应出现的次数
  for(let i=0;i<arr.length;i++){
    // 处理有负数的情况
    let tem = arr[i] - min
    count[tem] = count[tem] ?  count[tem] + 1 : 1
  }

  let idx = 0
  for(let i=0;i<count.length;i++){
    let current = count[i]
    while(current){
      arr[idx++] = i + min
      current--
    }
  }
  return arr
}

// 桶排序：将数组放置到给的桶中，然后每个桶排成有序，最后合成一个
// 桶排序需要额外空间，是外部排序，稳定性取决于每个桶内的排序，时间复杂度是线性级O(n)
function bucketSort(arr, num = 5){    
  let min = arr[0]
  let max = arr[0]
  let buckets = []
  
  for(let i=0;i<arr.length;i++){
    min = arr[i] < min ? arr[i] : min 
    max = arr[i] > max ? arr[i] : max
  } 
  
  // 求出每一个桶的数值范围 
  let count = (max - min + 1)/num 
  while(num){
    buckets.push([])
    num--
  }     
  for(let i=0;i<arr.length;i++){
    let current = arr[i]
    // 计算放置当前元素的桶的下标
    let idx = Math.floor((current - min) / count)
    let A = buckets[idx]
    let _len = A.length     
    if(_len){
        // 插入排序
        while(_len>0 && A[_len - 1] > current){
          A[_len] = A[_len - 1]
          _len--            
        }
        A[_len] = current
    }else{
      A.push(current)
    }
  }
  let index = 0
  // 最后将每个桶合并
  for(let i=0;i<buckets.length;i++){
    for(let j=0;j<buckets[i].length;j++){
      arr[index++] = buckets[i][j]
    }
  }
  return arr
}

// 基数排序：先按照数字的个位，将其置于下标为其个位数的桶中，然后再按照十位数字放于桶，至到排到最大数的最高位
// 基数排序也可以从高位开始排，排了之后如果当前桶不止一个元素，则再次将改桶又分成10个桶递归排列，不推荐，假设有1000个不同的数，则需要1000个桶，会增加内存开销
// 基数排序是稳定的，时间复杂度为O(k*n)，k是最大元素的位数

// 获取最大元素长度
function getNumLen(num){
    let n = 0
    do{
        n++
        num = num /10
    }while(num > 1)
    return n
}
// 获取指定元素指定位置的数字
function getPositionNum(num, i){
    return Math.floor(num/10**(i-1)%10)
}
function radixSort(arr){
    let max = arr[0]
    let min = arr[0] // 用于处理负数
    for(let i=0;i<arr.length;i++){
        max = max < arr[i] ? arr[i] : max
        min = min > arr[i] ? arr[i] : min
    }
    let maxLen = getNumLen(max)
    let buckets = Array.from({length: 10}, ()=>[])
    for(let k=1;k<=maxLen;k++){
        for(let j=0;j<arr.length;j++){
            // - min 是处理负数的情况
            let current = arr[j]-min
            let idx = getPositionNum(current, k)
            buckets[idx].push(current)
        }
        let index = 0
        for(let i=0;i<buckets.length;i++){
            for(let j=0;j<buckets[i].length;j++){
                arr[index++] = buckets[i][j] + min
            }
            // 数字取出后将桶清空
            buckets[i] = []
        }
    }
    return arr
}





