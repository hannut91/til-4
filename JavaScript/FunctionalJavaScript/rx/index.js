exports.curry = f => 
    (a, ..._) => _.length ? f (a, ..._) : (..._) => f(a, ..._);

exports.map = this.curry((f, iter) => {
    const result = [];
    // 예외 없이 모든 이터러블 요소에 적용됨
    for (const a of iter) {
        result.push(f(a));
    }
    return result;
});

exports.filter = this.curry((f, iter) => {
    const result = [];
    // 조건에 맞는 이터러블 요소에만 적용됨.
    for (const a of iter) {
        if (f(a)) result.push(a);
    }
    return result;
});

exports.reduce = this.curry((f, acc, iter) => {
    if (!iter) {
        // 시작값이 주어지지 않았을 때의 처리
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

exports.go = (...args) => this.reduce((a, f) => f(a), args);

exports.pipe = (f, ...fs) => (...as) => this.go(f(...as), ...fs);
