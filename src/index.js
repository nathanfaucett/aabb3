var vec3 = require("@nathanfaucett/vec3");


var aabb3 = exports;


function AABB3() {
    this.min = vec3.create(Infinity, Infinity, Infinity);
    this.max = vec3.create(-Infinity, -Infinity, -Infinity);
}


aabb3.AABB3 = AABB3;

aabb3.create = function(min, max) {
    var out = new AABB3();

    if (min) {
        vec3.copy(out.min, min);
    }
    if (max) {
        vec3.copy(out.max, max);
    }

    return out;
};

aabb3.copy = function(out, a) {

    vec3.copy(out.min, a.min);
    vec3.copy(out.max, a.max);

    return out;
};

aabb3.clone = function(a) {
    return aabb3.create(a.min, a.max);
};

aabb3.set = function(out, min, max) {

    if (min) {
        vec3.copy(out.min, min);
    }
    if (max) {
        vec3.copy(out.max, max);
    }

    return out;
};

aabb3.expandPoint = function(out, point) {

    vec3.min(out.min, point);
    vec3.max(out.max, point);

    return out;
};

aabb3.expandVector = function(out, vector) {

    vec3.sub(out.min, vector);
    vec3.add(out.max, vector);

    return out;
};

aabb3.expandScalar = function(out, scalar) {

    vec3.ssub(out.min, scalar);
    vec3.sadd(out.max, scalar);

    return out;
};

aabb3.union = function(out, a, b) {

    vec3.min(out.min, a.min, b.min);
    vec3.max(out.max, a.max, b.max);

    return out;
};

aabb3.clear = function(out) {

    vec3.set(out.min, Infinity, Infinity, Infinity);
    vec3.set(out.max, -Infinity, -Infinity, -Infinity);

    return out;
};

aabb3.contains = function(out, point) {
    var min = out.min,
        max = out.max,
        px = point[0],
        py = point[1],
        pz = point[2];

    return !(
        px < min[0] || px > max[0] ||
        py < min[1] || py > max[1] ||
        pz < min[2] || pz > max[2]
    );
};

aabb3.intersects = function(a, b) {
    var aMin = a.min,
        aMax = a.max,
        bMin = b.min,
        bMax = b.max;

    return !(
        bMax[0] < aMin[0] || bMin[0] > aMax[0] ||
        bMax[1] < aMin[1] || bMin[1] > aMax[1] ||
        bMax[2] < aMin[2] || bMin[2] > aMax[2]
    );
};

aabb3.fromPoints = function(out, points) {
    var i = points.length,
        minx = Infinity,
        miny = Infinity,
        minz = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        maxz = -Infinity,
        min = out.min,
        max = out.max,
        x, y, z, v;

    while (i--) {
        v = points[i];
        x = v[0];
        y = v[1];
        z = v[2];

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;
        minz = minz > z ? z : minz;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
        maxz = maxz < z ? z : maxz;
    }

    min[0] = minx;
    min[1] = miny;
    min[2] = minz;
    max[0] = maxx;
    max[1] = maxy;
    max[2] = maxz;

    return out;
};

aabb3.fromPointArray = function(out, points) {
    var i = 0,
        il = points.length,
        minx = Infinity,
        miny = Infinity,
        minz = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        maxz = -Infinity,
        min = out.min,
        max = out.max,
        x, y, z;

    while (i < il) {
        x = points[i];
        y = points[i + 1];
        z = points[i + 2];
        i += 3;

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;
        minz = minz > z ? z : minz;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
        maxz = maxz < z ? z : maxz;
    }

    min[0] = minx;
    min[1] = miny;
    min[2] = minz;
    max[0] = maxx;
    max[1] = maxy;
    max[2] = maxz;

    return out;
};

aabb3.fromCenterSize = function(out, center, size) {
    var min = out.min,
        max = out.max,
        x = center[0],
        y = center[1],
        z = center[2],
        hx = size[0] * 0.5,
        hy = size[1] * 0.5,
        hz = size[2] * 0.5;

    min[0] = x - hx;
    min[1] = y - hy;
    min[2] = z - hz;

    max[0] = x + hx;
    max[1] = y + hy;
    max[2] = z + hz;

    return out;
};

aabb3.fromCenterRadius = function(out, center, radius) {
    var min = out.min,
        max = out.max,
        x = center[0],
        y = center[1],
        z = center[2];

    min[0] = x - radius;
    min[1] = y - radius;
    min[2] = z - radius;

    max[0] = x + radius;
    max[1] = y + radius;
    max[2] = z + radius;

    return out;
};

aabb3.equal = function(a, b) {
    return (
        vec3.equals(a.min, b.min) ||
        vec3.equals(a.max, b.max)
    );
};

aabb3.notEqual = function(a, b) {
    return (
        vec3.notEquals(a.min, b.min) ||
        vec3.notEquals(a.max, b.max)
    );
};

aabb3.str = function(out) {
    return "AABB3(" + vec3.str(out.min) + ", " + vec3.str(out.max) + ")";
};

aabb3.string = aabb3.toString = aabb3.str;

aabb3.toJSON = function(out, json) {
    json = json || {};

    json.min = vec3.copy(json.min || [], out.min);
    json.max = vec3.copy(json.max || [], out.max);

    return json;
};

aabb3.fromJSON = function(out, json) {

    vec3.copy(out.min, json.min);
    vec3.copy(out.max, json.max);

    return json;
};
