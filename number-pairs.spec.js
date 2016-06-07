
var pairs = require('../../src/js/pairs.js');
var sinon = require('sinon');
var _ = require('lodash');
var rangesEqual = require('../utils/equalityTesters.js').rangesEqual;
var TIME_CONSTANTS = require('time-constants');

describe('pairs', function() {

    describe('ranges overlap', function() {
        describe('given number pairs', function() {

            it('reports as overlapping a range second range which is totally included inside the first', function() {
                expect(pairs.rangesOverlap([2, 10], [6, 7])).toBe(true);
            });

            it('reports as overlapping a range second range which overlaps the first on the left', function() {
                expect(pairs.rangesOverlap([2, 10], [0, 3])).toBe(true);
            });

            it('reports as overlapping a range second which overlaps the first on the right', function() {
                expect(pairs.rangesOverlap([2, 10], [9, 11])).toBe(true);
            });

            it('reports as overlapping a range second range which overlaps the first on both sides', function() {
                expect(pairs.rangesOverlap([2, 10], [0, 11])).toBe(true);
            });

            describe('as a matter of convention, ranges contain their left bound but not their right so', function(){

                it('reports as not overlapping a second range which touches on the left', function() {
                    expect(pairs.rangesOverlap([2, 10], [0, 2])).toBe(false);
                });

                it('reports as not overlapping a second range which touches on the right', function() {
                    expect(pairs.rangesOverlap([2, 10], [10, 11])).toBe(false);
                });

            });

            it('reports as not overlapping a range second range which is over to the left', function() {
                expect(pairs.rangesOverlap([2, 10], [0, 1])).toBe(false);
            });

            it('reports as not overlapping a range second range which is over to the right', function() {
                expect(pairs.rangesOverlap([2, 10], [11, 12])).toBe(false);
            });
        });

        describe('given date pairs', function() {

            it('reports as overlapping a range second range which is totally included inside the first', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 06 2015'), new Date('Jan 7 2015')]
                )).toBe(true);
            });

            it('reports as overlapping a range second range which overlaps the first on the left', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 01 2015'), new Date('Jan 3 2015')]
                )).toBe(true);
            });

            it('reports as overlapping a range second which overlaps the first on the right', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 09 2015'), new Date('Jan 11 2015')]
                )).toBe(true);
            });

            it('reports as overlapping a second range which overlaps the first on both sides', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 01 2015'), new Date('Jan 11 2015')]
                )).toBe(true);
            });

            describe('as a matter of convention, ranges contain their left bound but not their right so', function(){

                it('reports as not overlapping a second range which touches on the left', function() {
                    expect(pairs.rangesOverlap(
                        [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                        [new Date('Jan 01 2015'), new Date('Jan 2 2015')]
                    )).toBe(false);
                });

                it('reports as not overlapping a second range which touches on the right', function() {
                    expect(pairs.rangesOverlap(
                        [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                        [new Date('Jan 10 2015'), new Date('Jan 11 2015')]
                    )).toBe(false);
                });

            });

            it('reports as not overlapping a range second range which is over to the left', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 01 2015'), new Date('Jan 1 2015')]
                )).toBe(false);
            });

            it('reports as not overlapping a range second range which is over to the right', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), new Date('Jan 10 2015')],
                    [new Date('Jan 11 2015'), new Date('Jan 12 2015')]
                )).toBe(false);
            });
        });

        describe('dates overlap ranges containing extreme values', function() {
            it('works with the second range ending at max', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'),  new Date('Jan 10 2015')],
                    [new Date('Jan 08 2015'), TIME_CONSTANTS.MAX_DATE]
                )).toBe(true);
            });

            it('works with the first range ending at max', function() {
                expect(pairs.rangesOverlap(
                    [new Date('Jan 02 2015'), TIME_CONSTANTS.MAX_DATE],
                    [new Date('Jan 08 2015'), new Date('Jan 10 2015')]
                )).toBe(true);
            });
        });

    });

    describe('contains', function() {
        describe('with numbers', function(){
            it('is contained between the two bounds', function() {
                expect(pairs.contains([10, 20], 15)).toBe(true);
            });
            it('is contained on the left bound', function() {
                expect(pairs.contains([10, 20], 10)).toBe(true);
            });
            it('is not contained on the right bound', function() {
                expect(pairs.contains([10, 20], 20)).toBe(false);
            });
            it('is not contained before the left bound', function() {
                expect(pairs.contains([10, 20], 9)).toBe(false);
            });
            it('is not contained after the right bound', function() {
                expect(pairs.contains([10, 20], 21)).toBe(false);
            });
            it('zero-extent pair contains its start point', function() {
                expect(pairs.contains([10, 10], 10)).toBe(true);
            });
        });

        describe('with dates', function(){
            var sampleBounds = [new Date('Jan 10 2015'), new Date('Jan 20 2015')];

            it('is contained between the two bounds', function() {
                expect(pairs.contains(sampleBounds, new Date('Jan 15 2015'))).toBe(true);
            });
            it('is contained on the left bound', function() {
                expect(pairs.contains(sampleBounds, new Date('Jan 10 2015'))).toBe(true);
            });
            it('is not contained on the right bound', function() {
                expect(pairs.contains(sampleBounds, new Date('Jan 20 2015'))).toBe(false);
            });
            it('is not contained before the left bound', function() {
                expect(pairs.contains(sampleBounds, new Date('Jan 9 2015'))).toBe(false);
            });
            it('is not contained after the right bound', function() {
                expect(pairs.contains(sampleBounds, new Date('Jan 21 2015'))).toBe(false);
            });
            it('zero-extent pair contains its start point', function() {
                var zeroWidthPair = [new Date('Jan 10 2015'), new Date('Jan 10 2015')];
                expect(pairs.contains(zeroWidthPair, new Date('Jan 10 2015'))).toBe(true);
            });
        });

    });

    describe('calculating extents', function() {
        it('works between two positive numbers', function(){
            expect(pairs.pairExtent([5,10])).toBe(5);
        });

        it('works while spanning zero', function(){
            expect(pairs.pairExtent([-20,20])).toBe(40);
        });

        it('works between two dates', function(){
            expect(pairs.pairExtent([new Date(1000), new Date(5000)])).toBe(4000);
        });

    });

    describe('interpolating', function() {
        it('can find halfway', function(){
            expect(pairs.interpolateBetweenPair([100, 150], 0.5)).toBe(125);
        });
        it('can find three-quarters', function(){
            expect(pairs.interpolateBetweenPair([100, 200], 0.75)).toBe(175);
        });
    });

    describe('expanding', function() {
        it('can expand a range by one tenth', function(){
            // we go from a range with an extent of 100 to 110
            // after expanding to 1.1 of the original

            expect(pairs.expandPair([0, 100], 1.1))
                .toEqual([-5, 105]);
        });

        it('can shrink a range to half the original extent', function(){
            // we go from a range with an extent of 100 to 50
            // after expanding to 0.5 of the original

            expect(pairs.expandPair([0, 100], 0.5))
                .toEqual([25, 75]);
        });

        it('can expand a date range by half on each side', function(){
            var pairIn = [
                new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                new Date('Wed Apr 22 2015 15:00:00 GMT+0000')
            ]; // range of five hours

            var expected = [
                new Date('Wed Apr 22 2015 07:30:00 GMT+0000'),
                new Date('Wed Apr 22 2015 17:30:00 GMT+0000')
            ]; // expanded by 2.5 hours on each size

            expect(pairs.expandPair(pairIn, 2)).toEqual(expected);
        });

        it('can reduce a date range by three quarters', function(){
            var pairIn = [
                new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
            ]; // range of five hours

            var expected = [
                new Date('Wed Apr 22 2015 10:45:00 GMT+0000'),
                new Date('Wed Apr 22 2015 11:15:00 GMT+0000')
            ]; // expanded by 2.5 hours on each size

            expect(pairs.expandPair(pairIn, 0.25)).toEqual(expected);
        });
    });

    describe('starting from zero', function () {
        it('can stop a range from going into negative', function(){
            expect(pairs.positiveOnly([-50, 100])).toEqual([0, 100]);
        });
    });

    describe('maximum extent', function() {
        describe('with number pairs', function() {

            it('can reduce the extent of a pair to a maximum size', function() {
                expect(pairs.max([0, 10], 5))
                    .toEqual([2.5, 7.5]);
            });

            it('has no effect on pairs below the max', function() {
                expect(pairs.max([5, 10], 50))
                    .toEqual([5, 10]);
            });

            it('has no effect on pairs on the boundary', function() {
                expect(pairs.max([5, 10], 5))
                    .toEqual([5, 10]);
            });
        });

        describe('with date pairs', function() {

            it('can reduce the extent of a pair of dates to a maximum size', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ]; // range of two hours

                var expected = [
                    new Date('Wed Apr 22 2015 10:50:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 11:10:00 GMT+0000')
                ]; // 10 minutes each side of 11

                expect(pairs.max(pairIn, TIME_CONSTANTS.MINUTE * 20))
                    .toEqual(expected);
            });

            it('has no effect on pairs below the max', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ];

                expect(pairs.max(pairIn, TIME_CONSTANTS.YEAR * 20))
                    .toEqual(pairIn);
            });

            it('has no effect on pairs below the max', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ];

                expect(pairs.max(pairIn, TIME_CONSTANTS.HOUR * 2))
                    .toEqual(pairIn);
            });
        });
    });

    describe('minimum extent', function() {
        describe('with number pairs', function() {

            it('can reduce the extent of a pair to a minimum size', function() {
                expect(pairs.min([0, 10], 12))
                    .toEqual([-1, 11]);
            });

            it('has no effect on pairs more than the min', function() {
                expect(pairs.min([5, 10], 2))
                    .toEqual([5, 10]);
            });

            it('has no effect on pairs on the boundary', function() {
                expect(pairs.min([5, 10], 5))
                    .toEqual([5, 10]);
            });
        });

        describe('with date pairs', function() {

            it('can increase the extent of a pair of dates to a minimum size', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ]; // range of two hours

                var expected = [
                    new Date('Wed Apr 22 2015 09:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 13:00:00 GMT+0000')
                ]; // range of four hours

                expect(pairs.min(pairIn, TIME_CONSTANTS.HOUR * 4))
                    .toEqual(expected);
            });

            it('has no effect on pairs above the min', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ];

                expect(pairs.min(pairIn, TIME_CONSTANTS.MINUTE * 20))
                    .toEqual(pairIn);
            });

            it('has no effect on pairs below the max', function() {
                var pairIn = [
                    new Date('Wed Apr 22 2015 10:00:00 GMT+0000'),
                    new Date('Wed Apr 22 2015 12:00:00 GMT+0000')
                ];

                expect(pairs.min(pairIn, TIME_CONSTANTS.HOUR * 2))
                    .toEqual(pairIn);
            });
        });
    });

    describe('centred on', function() {
        describe('with number pairs', function() {
            it('can change values', function() {
                expect(pairs.centredOn([2,4], 6))
                    .toEqual([5,7])
            });
            it('can be an identity transform', function() {
                expect(pairs.centredOn([2,4], 3))
                    .toEqual([2,4])
            });
        });

        describe('with date pairs', function() {
            it('can change values', function() {
                expect(pairs.centredOn([
                        new Date('Jan 01 2015 00:00:00 GMT+0000'),
                        new Date('Jan 03 2015 00:00:00 GMT+0000')
                    ],
                    new Date('Jan 05 2015 00:00:00 GMT+0000')
                ))
                    .toEqual([
                        new Date('Jan 04 2015 00:00:00 GMT+0000'),
                        new Date('Jan 06 2015 00:00:00 GMT+0000')
                    ])
            });
            it('can be an identity transform', function() {
                expect(pairs.centredOn([
                        new Date('Jan 01 2015 00:00:00 GMT+0000'),
                        new Date('Jan 03 2015 00:00:00 GMT+0000')
                    ],
                    new Date('Jan 02 2015 00:00:00 GMT+0000')
                ))
                    .toEqual([
                        new Date('Jan 01 2015 00:00:00 GMT+0000'),
                        new Date('Jan 03 2015 00:00:00 GMT+0000')
                    ])
            });
        });
    });

    // ------------------ end of tests -------------------

    beforeEach(function() {
        jasmine.addCustomEqualityTester(rangesEqual);
    });

});