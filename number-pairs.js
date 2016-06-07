'use strict';

function pairExtent(pair) {
    return pair[1] - pair[0];
}

function interpolateBetweenPair(pair, proportion) {
    return pair[0] + proportion * pairExtent(pair);
}

function contains(pair, value) {
    return ((value >= pair[0]) && (value < pair[1])) || (+value == +pair[0]);
}

/**
 * Expand a range so that it the returned value is proptionally larger (or smaller)
 * than the given value.
 *
 * it holds that:
 *
 *  extent( expand( r, n ) ) / extent(r) === n
 *
 * so, to double the extent of a range:
 *
 *  expand( r, 2 )
 *
 * to half the extent of a range:
 *
 *  expand( r, 0.5 )
 */
function expandPair(pair, amount) {

    var extent = pairExtent(pair);
    var newExtent = extent * amount;
    var expansionAmount = (newExtent - extent) / 2;

    var Type = pair[0].constructor;

    return typedPair(
        Number(pair[0]) - expansionAmount,
        Number(pair[1]) + expansionAmount,
        Type
    );
}

function typedPair(n1, n2, Type) {
    return [
        new Type( n1 ),
        new Type( n2 )
    ];
}

function positiveOnly(pair) {
    return [Math.max(pair[0], 0), pair[1]];
}

function mid(pair) {
    return (pair[1] - pair[0]) / 2 + Number(pair[0]);
}

function max(pair, maxExtent) {
    var extent = pairExtent(pair);

    if( extent > maxExtent ) {
        var m = mid(pair);
        var r = maxExtent/2;
        var Type = pair[0].constructor;

        return typedPair(
            m-r,
            m+r,
            Type
        );
    } else {
        return pair;
    }
}

function min(pair, minExtent) {

    var extent = pairExtent(pair);

    if( extent < minExtent ) {
        var m = mid(pair);
        var r = minExtent/2;
        var Type = pair[0].constructor;

        return typedPair(
            m-r,
            m+r,
            Type
        );
    } else {
        return pair;
    }
}

function overlap(r1start, r1end, r2start, r2end) {
    return r2start < r1end && r2end > r1start;
}

function rangesOverlapNumbers(r1, r2start, r2end) {
    return overlap(r1[0],r1[1], r2start, r2end);
}

function rangesOverlap(r1, r2) {
    return overlap(r1[0], r1[1], r2[0], r2[1]);
}

/**
 * Returns a range with the same extent as r, but centred on n
 */
function centredOn(pair, n) {

    var r = pairExtent(pair)/2;
    var Type = pair[0].constructor;

    return typedPair(
        +n-r,
        +n+r,
        Type
    );
}

module.exports = {
    pairExtent : pairExtent,
    interpolateBetweenPair: interpolateBetweenPair,
    overlap: overlap,
    rangesOverlap: rangesOverlap,
    rangesOverlapNumbers: rangesOverlapNumbers,
    expandPair: expandPair,
    positiveOnly: positiveOnly,
    max: max,
    min: min,
    mid: mid,
    contains: contains,
    centredOn: centredOn
};