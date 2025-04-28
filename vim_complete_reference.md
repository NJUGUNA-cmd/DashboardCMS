# Vim Complete Reference Guide

## Basic Movement
### Cursor Movement
```
h j k l    - left, down, up, right
w          - jump to start of next word
b          - jump to start of previous word
e          - jump to end of word
ge         - jump to end of previous word
0          - jump to start of line
$          - jump to end of line
^          - jump to first non-blank character of line
```

### Screen Movement
```
H          - move to top of screen
M          - move to middle of screen
L          - move to bottom of screen
ctrl+e     - scroll down one line
ctrl+y     - scroll up one line
ctrl+f     - scroll down one page
ctrl+b     - scroll up one page
ctrl+d     - scroll down half page
ctrl+u     - scroll up half page
zz         - center cursor on screen
zt         - cursor line to top of screen
zb         - cursor line to bottom of screen
```

## Navigation
### File Navigation
```
gg         - go to first line
G          - go to last line
nG         - go to line n
:n         - go to line n
%          - jump to matching bracket
{          - jump to previous paragraph
}          - jump to next paragraph
[[         - jump to previous section
]]         - jump to next section
```

### Search Navigation
```
/pattern   - search forward for pattern
?pattern   - search backward for pattern
n          - repeat search forward
N          - repeat search backward
*          - search forward for word under cursor
#          - search backward for word under cursor
```

## Editing
### Basic Editing
```
i          - insert before cursor
I          - insert at beginning of line
a          - append after cursor
A          - append at end of line
o          - open new line below
O          - open new line above
r          - replace single character
R          - replace mode
s          - substitute character
S          - substitute line
```

### Delete Operations
```
x          - delete character under cursor
X          - delete character before cursor
dd         - delete line
D          - delete to end of line
J          - join lines
```

### Change Operations
```
c          - change operator
cc/C       - change line
cw         - change word
ciw        - change inner word
ci"        - change inside quotes
ci(        - change inside parentheses
ct{char}   - change until character
```

### Copy and Paste
```
y          - yank (copy)
yy         - yank line
p          - paste after cursor
P          - paste before cursor
```

## Text Objects
### Word Objects
```
iw         - inner word
aw         - a word (includes space)
iW         - inner WORD
aW         - a WORD
```

### Quote/Bracket Objects
```
i"         - inner double quotes
a"         - a double quotes
i'         - inner single quotes
a'         - a single quotes
i`         - inner backticks
a`         - a backticks
i[         - inner square brackets
a[         - a square brackets
i(         - inner parentheses
a(         - a parentheses
i{         - inner curly braces
a{         - a curly braces
```

### Other Text Objects
```
is         - inner sentence
as         - a sentence
ip         - inner paragraph
ap         - a paragraph
```

## Visual Mode
```
v          - visual mode (character)
V          - visual mode (line)
ctrl+v     - visual block mode
gv         - reselect last visual selection
o          - move to other end of selection
```

## Marks and Jumps
```
m{a-zA-Z}  - set mark
'{a-zA-Z}  - jump to mark line
`{a-zA-Z}  - jump to mark position
``         - jump to last jump position
`.         - jump to last edit position
```

## Registers
```
"{a-z}     - use register {a-z}
"*         - system clipboard register
"+         - system clipboard register
"_         - black hole register
:reg       - show registers content
```

## Macros
```
q{a-z}     - record macro into register {a-z}
q          - stop recording
@{a-z}     - execute macro
@@         - repeat last macro
```

## Command Mode
### File Operations
```
:w         - write (save)
:w file    - write to file
:q         - quit
:q!        - quit without saving
:wq        - write and quit
:x         - write if changed and quit
:saveas    - save as
```

### Search and Replace
```
:%s/old/new/g     - replace all 'old' with 'new' in file
:%s/old/new/gc    - replace all 'old' with 'new' in file with confirmations
:s/old/new/g      - replace all 'old' with 'new' in current line
```

### Multiple Files
```
:e file    - edit file
:bn        - next buffer
:bp        - previous buffer
:ls        - list buffers
:b{n}      - go to buffer n
:sp file   - split window horizontally
:vsp file  - split window vertically
ctrl+w s   - split window horizontally
ctrl+w v   - split window vertically
ctrl+w w   - switch windows
ctrl+w q   - quit window
```

## Advanced Features
### Folding
```
zf         - create fold
zo         - open fold
zc         - close fold
za         - toggle fold
zR         - open all folds
zM         - close all folds
```

### Text Alignment
```
>>         - indent line
<<         - de-indent line
>%         - indent a block
=%         - re-indent a block
```

### Other
```
.          - repeat last command
u          - undo
ctrl+r     - redo
~          - switch case
g~         - switch case operator
guu        - lowercase line
gUU        - uppercase line
```

## Tips
1. Most commands can be combined with numbers: `3w` moves forward 3 words
2. Operators can be combined with motions: `d3w` deletes 3 words
3. Text objects work with operators: `ci"` changes inside quotes
4. The `.` command is powerful for repeating the last change
5. Use marks to quickly jump between locations in your code

## Common Combinations
```
ciw        - change inner word
ci"        - change inside quotes
yi(        - yank inside parentheses
da{        - delete a block including braces
>ap        - indent a paragraph
gUiw       - uppercase inner word
```