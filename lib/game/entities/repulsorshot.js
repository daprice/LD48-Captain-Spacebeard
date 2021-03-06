ig.module(
	'game.entities.repulsorshot'
)
.requires(
	'game.entities.projectile',
	'impact.entity-pool'
)
.defines(function(){

EntityRepulsorshot = EntityProjectile.extend({

	size: {x: 17, y: 12},
	offset: {x: 0, y: 0},
	maxVel: {x: 1900, y: 1900},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/Repulsorshot.png', 17, 12 ),
	
	life: 1,
	velocity: -1900,
	dmg: 1,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim('idle', 1, [0]);
		this.currentAnim.flip.x = settings.flip;
	},
	
	reset: function( x, y, settings ) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent( x, y, settings );
		
		this.flip = settings.flip;
		this.currentAnim.flip.x = settings.flip;
	},

	update: function() {
		this.parent();
		
		
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		//move the other entity toward the shooter
		if (!this.flip) {
			other.vel.x += -50;
		}
		else {
			other.vel.x += 50;
		}
		
		other.vel.y += -30;
		
		this.kill();
	}	
});


// If you have an Entity Class that instanced and removed rapidly, such as this 
// Fireball class, it makes sense to enable pooling for it. This will reduce
// strain on the GarbageCollector and make your game a bit more fluid.

// With pooling enabled, instances that are removed from the game world are not 
// completely erased, but rather put in a pool and resurrected when needed.

ig.EntityPool.enableFor( EntityRepulsorshot );


});
