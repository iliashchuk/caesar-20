function sortCollisionsDesc({ data: { value: a } }, { data: { value: b } }) {
    return a - b;
}

export function createCircleCollisionDetectionForRadius(radius) {
    function getCircleIntersection(entry, target) {
        var circle1 = { radius, x: entry.left, y: entry.top };
        var circle2 = { radius, x: target.left, y: target.top };

        var dx = circle1.x - circle2.x - radius;
        var dy = circle1.y - circle2.y - radius;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
            return distance;
        }

        return 0;
    }

    return function circleIntersection({
        collisionRect,
        droppableRects,
        droppableContainers,
    }) {
        const collisions = [];

        for (const droppableContainer of droppableContainers) {
            const { id } = droppableContainer;
            const rect = droppableRects.get(id);

            if (rect) {
                const intersectionRatio = getCircleIntersection(
                    rect,
                    collisionRect,
                );

                if (intersectionRatio > 0) {
                    collisions.push({
                        id,
                        data: { droppableContainer, value: intersectionRatio },
                    });
                }
            }
        }

        return collisions.sort(sortCollisionsDesc);
    };
}
