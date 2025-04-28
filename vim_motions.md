Basic Motions:
h j k l    - left, down, up, right
w          - next word start
b          - previous word start
e          - next word end
ge         - previous word end
0          - start of line
$          - end of line
^          - first non-blank character

Larger Motions:
gg         - start of file
G          - end of file
{          - previous empty line
}          - next empty line
(          - previous sentence
)          - next sentence
[[         - previous section
]]         - next section
ctrl+u     - half page up
ctrl+d     - half page down

Find & Till:
f{char}    - find char forward
F{char}    - find char backward
t{char}    - till before char forward
T{char}    - till before char backward
;          - repeat last f/F/t/T
,          - repeat last f/F/t/T reverse

Text Objects:
iw         - inner word
aw         - a word (includes space)
is         - inner sentence
as         - a sentence
ip         - inner paragraph
ap         - a paragraph
i"         - inner quotes
a"         - a quotes (includes quotes)
i(         - inner parentheses
a(         - a parentheses (includes parentheses)

Combining with Operators:
d          - delete
c          - change
y          - yank (copy)
v          - visual select

Examples:
diw        - delete inner word
ci"        - change inside quotes
ya(        - yank including parentheses
dt.        - delete until dot