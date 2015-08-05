/**
* Used to generate questions, images, and instructions
*/
var questionData = {
	'lid' : {
		'nextType'    : 'crease',
		'optionLabel' : 'lid color',
		'options'     : ['peach', 'mint', 'sunbeam', 'mauve'],
		'instruction' : ['Sweep', 'eyeshadow onto your eyelid.']
	},
	'crease' : {
		'nextType'    : 'accent',
		'optionLabel' : 'crease color',
		'options'     : ['bubblegum', 'sky', 'sand', 'taupe'],
		'instruction' : ['Blend', 'eyeshadow into the crease.']
	},
	'accent' : {
		'nextType'    : 'liner',
		'optionLabel' : 'accent color',
		'options'     : ['chocolate', 'forest', 'mermaid', 'violet'],
		'instruction' : ['Press', 'eyeshadow into the outer corner and smudge along the lower lashline.']
	},
	'liner' : {
		'nextType'    : 'lashes',
		'optionLabel' : 'eyeliner style',
		'options'     : ['simple', 'winged'],
		'instruction' : ['Use black eyeliner to create a', 'line along the top lashline. Smudge eyeliner along the lower lashline.']
	},
	'lashes' : {
		'optionLabel' : 'false eyelashes',
		'options'     : ['natural', 'dramatic'],
		'instruction' : ['Apply your', 'false lashes.']
	}
};