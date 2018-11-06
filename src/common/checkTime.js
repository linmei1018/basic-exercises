export function checkConflictTime(a, b, x, y) {
  let times1 = a < b ? [[a, b]]:[[a, "24:00"], ["00:00", b]];// 未跨天
  let times2 = x < y ? [[x, y]]:[[x, "24:00"], ["00:00", y]];// 跨天
  let check = (a, b, x, y) =>!(y <= a || b <= x);

  let flag = false;
  // 循环比较时间段是否冲突
  for (let i = 0; i < times1.length; i++) {
    if (flag) break;
    for (let j = 0; j < times2.length; j++) {
      if (check(times1[i][0], times1[i][1], times2[j][0], times2[j][1])) {
        flag = true;
        break;
      }
    }
  }
  return !flag;
}
