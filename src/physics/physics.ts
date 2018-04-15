import {Scene} from "./Scene";
import {Point} from "./geometry/Point";
import {Easing} from "./Easing";
import {Vector} from "./geometry/Vector";

const scene = new Scene("scene");
for (let i = 0; i < 100; i++) {
    const p = new Point(Math.random()*1500, Math.random()*500);
    p.size = 20;
    p.velocity.y = 1;
    p.gravity = new Vector(1,1);
    p.bounce = 0.25;
    p.groundBounce = -0.50;
    p.isCollisionToBox = true;
    p.isCollide = true;
    scene.add(p, "point" + i);
}

/*
p1.setTarget(new Point(500, 500), 600, null, () => {
    p1.setTarget(new Point(1500, 500), 600, Easing.easeInOutCubic)
});
*/


