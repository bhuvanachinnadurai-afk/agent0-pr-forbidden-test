// Token bucket rate limiter.
class RateLimiter {
  constructor(capacity, refillPerSecond) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillPerSecond = refillPerSecond;
    this.last = Date.now();
  }

  allow(cost = 1) {
    const now = Date.now();
    this.tokens = Math.min(
      this.capacity,
      this.tokens + ((now - this.last) / 1000) * this.refillPerSecond,
    );
    this.last = now;

    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    return false;
  }
}

module.exports = { RateLimiter };
