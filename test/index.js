var tape = require("tape"),
    vec3 = require("@nathanfaucett/vec3"),
    aabb3 = require("..");


tape("aabb3.intersects(a, b)", function(assert) {
    var a = aabb3.create(
            vec3.create(-1, -1, -1),
            vec3.create(1, 1, 1)
        ),
        b = aabb3.create(
            vec3.create(0, 0, 0),
            vec3.create(2, 2, 2)
        );

    assert.equals(aabb3.intersects(a, b), true);
    assert.end();
});
