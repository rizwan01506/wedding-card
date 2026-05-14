export const EASE = [0.16, 1, 0.3, 1];

export const VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -8% 0px',
};

export function revealTransition(delay = 0, duration = 0.75) {
  return { duration, delay, ease: EASE };
}
