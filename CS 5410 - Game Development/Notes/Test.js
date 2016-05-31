var PI = 3.1415926535;

var circle = {
    radius: 4,
    get diameter() { return this.radius * 2; },
    set diameter(val) { this.radius = val / 2; }
};

Object.defineProperty(circle, 'circumference', {
    value: circle.diameter * PI,
    writable: false,
    enumerable: true,
    configurable: false
});

console.log(circle);
