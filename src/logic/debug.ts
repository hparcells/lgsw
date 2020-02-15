import { ctx } from './canvas';

const DEBUG_BAR_WIDTH = 300;
let text: string, percent: number;

let rStart: number;

export function setRStart(time: number) {
  rStart = time;
}
export function renderDebugOverlay() {
  const frt = performance.now() - rStart;
  if((performance as any).memory) {
    text = `Memory Used: ${((performance as any).memory.usedJSHeapSize / 1000000).toFixed(
      1
    )}MB / ${((performance as any).memory.totalJSHeapSize / 1000000).toFixed(1)} MB`;
    percent =
      (performance as any).memory.usedJSHeapSize / (performance as any).memory.totalJSHeapSize;
  }
  ctx.font = '11px sans-serif';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, DEBUG_BAR_WIDTH, 40);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, (frt / 16.6) * DEBUG_BAR_WIDTH, 20);
  ctx.fillStyle = '#00f';
  if((performance as any).memory) ctx.fillRect(0, 20, percent * DEBUG_BAR_WIDTH, 20);
  ctx.fillStyle = '#fff';
  ctx.fillText(`Frame Render Time: ${frt.toFixed(2)} ms`, 10, 10);
  if((performance as any).memory) {
    ctx.fillText(text, 10, 30);
  }else {
    ctx.fillText('Memory Used: N/A', 10, 30);
  }
}
