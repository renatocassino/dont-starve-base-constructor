export function findNextDivisor(v: number, grid: number): number {
  if (v % grid === 0) {
    return v;
  }
  let upper, down;

  for(let i = 0; true; i++) {
    if ((v + i) % grid === 0) {
      upper = i;
      break;
    }
  }

  for(let i = 0; true; i++) {
    if ((v - i) % grid === 0) {
      down = i;
      break;
    }
  }

  return  (upper < down) ? v + upper : v - down;
}