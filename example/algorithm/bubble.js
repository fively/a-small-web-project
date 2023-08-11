// 冒泡排序
// 前后进行比较
// 时间复杂度（O(n^2)）
// 空间复杂度（O(1)）
// 稳定

var nums = [4, 3, 5, 2, 1];

// m = 0
// n[0]:n[1] , n[1]:n[2], n[2]:n[3]，n[3]:n[4]
// m:length = nums.length - 1
// n:length = nums.length - 1 => nums.length - 1 - m

// m = 1
// n[0]:n[1] , n[1]:n[2], n[2]:n[3]
// n:length = nums.length - 2 => nums.length - 1 - m

// m = 2
// n[0]:n[1] , n[1]:n[2]
// n:length = nums.length - 3 => nums.length - 1 - m

// m = 3
// n[0]:n[1]
// n:length = nums.length - 4 => nums.length - 1 - m

function bubble(nums) {
  const len = nums.length;
  for (let m = 0; m < len; m++) {
    for (let n = 0; n < len - 1 - m; n++) {
      if (nums[n] > nums[n + 1]) {
        [nums[n], nums[n + 1]] = [nums[n + 1], nums[n]];
      }
    }
  }
  return nums;
}

console.log("原数组：", nums);
console.log("新数组：", bubble(nums));
