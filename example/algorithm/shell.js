// 希尔排序
// 递减增量排序算法， 是插入排序的一种高效改进版本
// 时间复杂度（O(n(logn)^2)）
// 空间复杂度（O(1)）
// 不稳定
// 参考: https://www.runoob.com/data-structures/shell-sort.html

var nums = [4, 3, 5, 2, 1];

// 增加step步长

function shell(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums;
  }

  function swap(nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let h = 1;
  let step = 3;

  while (h < len / step) {
    h = h * step + 1;
  }

  while (h >= 1) {
    for (let m = h; m < len; m++) {
      for (let n = m; n >= h; n -= h) {
        if (nums[n] > nums[n - h]) {
          continue;
        }
        swap(nums, n, n - h);
      }
    }

    h = Math.floor(h / step);
  }

  return nums;
}

console.log("原数组：", nums);
console.log("新数组：", shell(nums));
