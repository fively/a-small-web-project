// 插入排序
// 将一个记录插入到已经排好序的数列中
// 时间复杂度（O(n^2)）
// 空间复杂度（O(1)）
// 稳定
// 参考：https://www.runoob.com/data-structures/insertion-sort.html

var nums = [4, 3, 5, 2, 1];

// m = 1
// n[1] 比较 n[0]

// m = 2
// n[2] 比较 n[1],n[0]

// m = 3
// n[3] 比较 n[2],n[1],n[0]

// m = 4
// n[4] 比较 n[3],n[2],n[1],n[0]

function insertion(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums;
  }

  for (let m = 1; m < len; m++) {
    for (let n = m; n > 0; n--) {
      if (nums[n] > nums[n - 1]) {
        continue;
      }

      [nums[n], nums[n - 1]] = [nums[n - 1], nums[n]];
    }
  }

  return nums;
}

console.log("原数组：", nums);
console.log("新数组：", insertion(nums));
