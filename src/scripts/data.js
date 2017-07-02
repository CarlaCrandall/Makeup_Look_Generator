/**
* Used to generate questions, images, and instructions
*/
const questionData = {
    lid: {
        nextType: 'crease',
        questionLabel: 'lid color',
        choices: ['peach', 'mint', 'sunbeam', 'mauve'],
        instruction: 'Sweep [OPTION] eyeshadow onto your eyelid.'
    },
    crease: {
        nextType: 'accent',
        questionLabel: 'crease color',
        choices: ['bubblegum', 'sky', 'sand', 'taupe'],
        instruction: 'Blend [OPTION] eyeshadow into the crease.'
    },
    accent: {
        nextType: 'liner',
        questionLabel: 'accent color',
        choices: ['chocolate', 'forest', 'mermaid', 'violet'],
        instruction: 'Press [OPTION] eyeshadow into the outer corner and smudge along the lower lashline.'
    },
    liner: {
        nextType: 'lashes',
        questionLabel: 'eyeliner style',
        choices: ['simple', 'winged'],
        instruction: 'Use black eyeliner to create a [OPTION] line along the top lashline. Smudge eyeliner along the lower lashline.'
    },
    lashes: {
        questionLabel: 'false eyelashes',
        choices: ['natural', 'dramatic'],
        instruction: 'Apply your [OPTION] false lashes.'
    }
};
