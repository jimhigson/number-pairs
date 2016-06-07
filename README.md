# number-pairs
Javascript utility for dealing with ranges of numbers and/or dates expressed as length-2 arrays.

contains
---

tests if a range expressed as a pair of numbers contains some other value

```js
contains([2,6],4) // true, 4 is in contained in the range 2-6
contains([2,6],7) // false
```

A range is considered to contain its lower bound but not its upper:

```js
contains([2,6],2)       // true
contains([2,6],5.99)    // true
contains([2,6],6)       // false
```

centredOn
---

Creates a new range of the same size, but centred around a new value (think panning):

```js
centredOn([2,3], 10) // [-9.5, 10.5]
```

mid
---

Calculates the midpoint of a pair of numbers

```js
mid(-5, 5) // 0
mid(5, 10) // 7.5

```

pairExtent
---

```js
pairExtent(-1, 10) // 11

```

interpolateBetweenPair
---

```js
interpolateBetweenPair([5,10], 0.5) // 7.5
interpolateBetweenPair([5,10], 0)   // 5
interpolateBetweenPair([5,10], 1)   // 10
```

rangesOverlap
---

```js
rangesOverlap([1,4],[3,8]) // returns true - these ranges overlap
rangesOverlap([1,4],[5,8]) // returns false - these ranges do notoverlap
```

overlap
---

```js
overlap(a,b,c,d)
// same as:
rangesOverlap([a,b], [c,d])

```

expandPair
---

Expand a range so that it the returned value is proptionally larger (or smaller)
than the given value.

it holds that:

```js
extent( expand( r, n ) ) / extent(r) === n
```

so, to double the extent of a range:

```js
expand( r, 2 )
```

to half the extent of a range:

```js
expand( r, 0.5 )
```

max
---

Enforces the maximum extent of a range, while keeping the centre point the same (think viewport minimum)

```js
max([a,b], maxExtent)
```

min
---

Enforces the minimum extent of a range, while keeping the centre point the same (think viewport minimum)

```js
min([a,b], minExtent)
```

