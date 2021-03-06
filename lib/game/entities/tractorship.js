ig.module(
	'game.entities.tractorship'
)
.requires(
	'impact.entity',
	'game.entities.ship',
	'game.entities.tractorshot'
)
.defines(function(){

EntityTractorship = EntityShip.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 27, y: 30},
	offset: {x: 6, y: 4},
	
	animSheet: new ig.AnimationSheet( 'media/tractorship.png', 39, 41 ),
	
	firingSound: new ig.Sound('media/sounds/tractor.*'),

	cooldown: 0.1,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'off', 1, [0] );
		this.addAnim( 'flying_neutral', 0.1, [1,2] );
		this.addAnim( 'flying_fwd', 0.1, [5,6] );
		this.addAnim( 'flying_rev', 0.1, [3,4] );
		this.addAnim( 'firing_mah_laser', 0.05, [7,8] );
		this.addAnim( 'pain', 0.075, [9,0,9,0], true );
	},
	
	
	update: function() {		
		
		if (ig.input.pressed('shoot')) {
			this.firingSound.play();
		}
		
		// Move!
		this.parent();
	},
	
	fire: function() {
		ig.game.spawnEntity( EntityTractorshot, this.pos.x-9, this.pos.y+8 );
		ig.game.spawnEntity( EntityTractorshot, this.pos.x+21, this.pos.y+8, {flip:true});
		//this.firingSound.play();
	}
});


});