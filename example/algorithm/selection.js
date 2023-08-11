// 选择排序
// 循环查询最小值下标，进行替换
// 时间复杂度（O(n^2)）
// 空间复杂度（O(1)）
// 不稳定

var nums = [4, 3, 5, 2, 1];

// m = 0
// n[0] 比较 n[1],n[2],n[3],n[4]

// m = 1
// n[1] 比较 n[2],n[3],n[4]

// m = 2
// n[2] 比较 n[3],n[4]

// m = 3
// n[3] 比较 n[4]

function selection(nums) {
  const len = nums.length;

  if (len === 1) {
    return nums;
  }

  for (let m = 0; m < len - 1; m++) {
    let _minIdx = m;
    for (let n = m + 1; n < len; n++) {
      if (nums[_minIdx] > nums[n]) {
        _minIdx = n;
      }
    }

    if (_minIdx !== i) {
      [nums[m], nums[_minIdx]] = [nums[_minIdx], nums[m]];
    }
  }

  return nums;
}

console.log("原数组：", nums);
console.log("新数组：", selection(nums));
