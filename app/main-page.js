const Physics = require('nativescript-physics-js');
let world

exports.onLoaded = function(args){
    const page = args.object
    const container = page.getViewById('game')
    const meta = page.getViewById('meta')

    world = Physics()
    world.add(Physics.renderer('ns', {
        container: container,
        metaText: meta,
        meta: true
    }))

    const { width, height } = container.getActualSize()

    world.add([
		Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, width, height - 200) }),
		Physics.behavior('body-collision-detection'),
		Physics.behavior('body-impulse-response'),
		Physics.behavior('sweep-prune'),
		Physics.behavior('constant-acceleration')
	])

    addBall(100, 100)

    setInterval(() => {
        world.step(Date.now())
    }, 17)
}

function addBall(x, y) {
	const ball = Physics.body('circle', {
		label: 'main-ball',
		x,
		y,
		radius: 20,
		styles: { image: "~/ball.png" }
	})

	ball.restitution = 0.3
	world.add(ball)
}