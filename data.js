//Data Source
var data = new Object();

//Used to create image id's
data['types'] = ['eye','lid','crease','accent','liner','lashes']

//Question Data Scheme
//data[answer] = [imageId, labelText, NextQuestion, NextQuestionAnswers];

//First Question - Lid Color
data['init'] = ['eye','Lid Color:','Choose your lid color...','Peach','Mint','Sunbeam','Mauve'];

//Second Question - Crease Color
data['Peach'] = ['lid','Crease Color:','Choose your crease color...','Bubblegum','Sky','Sand','Taupe'];
data['Mint'] = ['lid','Crease Color:','Choose your crease color...','Bubblegum','Sky','Sand','Taupe'];
data['Sunbeam'] = ['lid','Crease Color:','Choose your crease color...','Bubblegum','Sky','Sand','Taupe'];
data['Mauve'] = ['lid','Crease Color:','Choose your crease color...','Bubblegum','Sky','Sand','Taupe'];

//Third Question - Accent Color
data['Bubblegum'] = ['crease','Accent Color:','Choose your accent color...','Chocolate','Forest','Mermaid','Violet'];
data['Sky'] = ['crease','Accent Color:','Choose your accent color...','Chocolate','Forest','Mermaid','Violet'];
data['Sand'] = ['crease','Accent Color:','Choose your accent color...','Chocolate','Forest','Mermaid','Violet'];
data['Taupe'] = ['crease','Accent Color:','Choose your accent color...','Chocolate','Forest','Mermaid','Violet'];

//Fourth Question - Liner
data['Chocolate'] = ['accent','Eyeliner Style:','Choose your eyeliner style...','Simple','Winged'];
data['Forest'] = ['accent','Eyeliner Style:','Choose your eyeliner style...','Simple','Winged'];
data['Mermaid'] = ['accent','Eyeliner Style:','Choose your eyeliner style...','Simple','Winged'];
data['Violet'] = ['accent','Eyeliner Style:','Choose your eyeliner style...','Simple','Winged'];

//Fifth Question - Lashes
data['Simple'] = ['liner','False Lashes:','Choose your false eyelashes...','Natural','Dramatic'];
data['Winged'] = ['liner','False Lashes:','Choose your false eyelashes...','Natural','Dramatic'];

//End of Data
data['Natural'] = ['lashes'];
data['Dramatic'] = ['lashes'];


//Used to create instructions
var steps = new Object();

steps['lid'] = ['Sweep ',' eyeshadow onto your eyelid.'];
steps['crease'] = ['Blend ',' eyeshadow into the crease.'];
steps['accent'] = ['Press ',' eyeshadow into the outer corner and smudge along the lower lashline.'];
steps['liner'] = ['Simple','Line your upper and lower lashline with a black pencil liner.','Winged','Line your upper lashline with a black liquid liner. To form the wing, extend the line from your outer corner toward the end of your eyebrow. Connect the wing back to your upper lashline and fill in the gap.'];
steps['lashes'] = ['Apply your ',' false lashes.'];