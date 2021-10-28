const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MPromise {
  $status = PENDING;
  constructor(fn) {
    this.value = null;
    this.reason = null;

    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  get status() {
    return this.$status;
  }
  set status(newStatus) {
    this.$status = newStatus;
    switch (newStatus) {
      case FULFILLED:
        this.fulfilledCallbacks.forEach((cb) => cb());
        break;
      case REJECTED:
        this.rejectedCallbacks.forEach((cb) => cb());
        break;
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    let promise2 = new MPromise((resolve, reject) => {
      let fulfilledCb = () => {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      let rejectedCb = () => {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      switch (this.status) {
        case PENDING:
          this.fulfilledCallbacks.push(fulfilledCb);
          this.rejectedCallbacks.push(rejectedCb);
          break;
        case FULFILLED:
          fulfilledCb();
          break;
        case REJECTED:
          rejectedCb();
          break;
      }
    });
    return promise2;
  }
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError(""));
    }
    if (x instanceof MPromise) {
      x.then((y) => {
        this.resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else if (typeof x === "object" || typeof x === "function") {
      if (!x) return resolve(x);
      let then;
      try {
        then = x.then;
      } catch (e) {
        return reject(e);
      }
      let called = false;
      if (typeof then === "function") {
        try {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (e) {
          if (called) return;
          called = true;
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
  catch(fn) {
    this.then(null, fn);
  }
  static resolve(value) {
    if (value instanceof MPromise) return value;
    return new MPromise((resolve) => resolve(value));
  }
  static reject(reason) {
    return new MPromise((resolve, reject) => reject(reason));
  }
  static race(promiseList) {
    return new MPromise((resolve, reject) => {
      for (let i of promiseList) {
        MPromise.resolve(i).then(
          (res) => {
            return resolve(res);
          },
          (err) => {
            return reject(err);
          }
        );
      }
    });
  }
  static all(promiseList) {
    return new MPromise((resolve, reject) => {
      let ans = [];
      let idx = 0;
      for (let i = 0; i < promiseList.length; i++) {
        MPromise.resolve(promiseList[i]).then(
          (val) => {
            ans[i] = val;
            idx++
            if (idx === promiseList.length) {
              resolve(ans);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  finally(fn) {
    return this.then(
      (val) => {
        return MPromise.resolve(fn()).then(() => val);
      },
      (err) => {
        return MPromise.resolve(fn()).then(() => {
          throw err;
        });
      }
    );
  }
}
// promise/A+ test
MPromise.deferred = MPromise.defer = function () {
  var dfd = {};
  dfd.promise = new MPromise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

try {
  module.exports = MPromise;
} catch (e) {}

