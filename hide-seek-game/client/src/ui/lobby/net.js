// Match dhoondhna: server nahi hai, isliye 60s baad "nahi mila"
export function findMatch(slot, cb) {
  const t = setTimeout(() => cb(null), 60000);
  return () => clearTimeout(t);
}

// Room exchange request: DEMO me 50% accept hoti hai
export function requestExchange(from, to, cb) {
  const t = setTimeout(() => cb(Math.random() < 0.5), 2500);
  return () => clearTimeout(t);
}