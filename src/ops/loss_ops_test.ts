/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '../index';
// tslint:disable-next-line:max-line-length
import {ALL_ENVS, describeWithFlags, expectArraysClose, expectNumbersClose} from '../test_util';

describeWithFlags('computeWeightedLoss', ALL_ENVS, () => {
  it('1D - no weights', () => {
    const losses = tf.tensor1d([1, 2, 3]);

    const y = tf.losses.computeWeightedLoss(losses);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 + 2 + 3) / 3);
  });

  it('1D - no weights - Reduction.NONE', () => {
    const losses = tf.tensor1d([1, 2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.NONE);

    expect(y.shape).toEqual([3]);
    expectArraysClose(y, [1, 2, 3]);
  });

  it('1D - no weights - Reduction.MEAN', () => {
    const losses = tf.tensor1d([1, 2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 + 2 + 3) / 3);
  });

  it('1D - no weights - Reduction.SUM', () => {
    const losses = tf.tensor1d([1, 2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.SUM);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 + 2 + 3));
  });

  it('1D - weights', () => {
    const losses = tf.tensor1d([1, 2, 3]);
    const weights = tf.tensor1d([0.1, 0, 0.3]);

    const y = tf.losses.computeWeightedLoss(losses, weights);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 * 0.1 + 2 * 0 + 3 * 0.3) / 2);
  });

  it('1D - weights - Reduction.NONE', () => {
    const losses = tf.tensor1d([1, 2, 3]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.NONE);

    expect(y.shape).toEqual([3]);
    expectArraysClose(y, [1 * 0.1, 2 * 0.2, 3 * 0.3]);
  });

  it('1D - weights - Reduction.MEAN', () => {
    const losses = tf.tensor1d([1, 2, 3]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 * 0.1 + 2 * 0.2 + 3 * 0.3) / 0.6);
  });

  it('1D - weights - Reduction.SUM', () => {
    const losses = tf.tensor1d([1, 2, 3]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.SUM);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (1 * 0.1 + 2 * 0.2 + 3 * 0.3));
  });

  it('2D - no weights', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);

    const y = tf.losses.computeWeightedLoss(losses);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (4 + 8 + 12 + 8 + 1 + 3) / 6);
  });

  it('2D - weights', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);

    const y = tf.losses.computeWeightedLoss(losses, weights);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(), (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6) / 4);
  });

  it('2D - no weights - Reduction.MEAN', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (4 + 8 + 12 + 8 + 1 + 3) / 6);
  });

  it('2D - weights - Reduction.MEAN', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(), (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6) / 4);
  });

  it('2D - no weights - Reduction.SUM', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.SUM);

    expect(y.shape).toEqual([]);
    expectNumbersClose(y.get(), (4 + 8 + 12 + 8 + 1 + 3));
  });

  it('2D - weights - Reduction.SUM', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.SUM);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(), (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6));
  });

  it('2D - no weights - Reduction.NONE', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);

    const y =
        tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.NONE);

    expect(y.shape).toEqual([2, 3]);
    expectArraysClose(y, [4, 8, 12, 8, 1, 3]);
  });

  it('2D - weights - Reduction.NONE', () => {
    const losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);

    const y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.NONE);

    expect(y.shape).toEqual([2, 3]);
    expectArraysClose(y, [4 * 1, 8 * 0, 12 * 2, (8 * -5), 1 * 0, 3 * 6]);
  });
});

describeWithFlags('absoluteDifference', ALL_ENVS, () => {
  it('1D', () => {
    const predictions = tf.tensor1d([1, 2, 3]);
    const label = tf.tensor1d([0.3, -0.6, -0.1]);

    const y = tf.losses.absoluteDifference(label, predictions);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(1 - 0.3) + Math.abs(2 - (-0.6)) + Math.abs(3 - (-0.1))) / 3);
  });

  it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', () => {
    const predictions = tf.tensor1d([1, 2, 3]);
    const label = tf.tensor1d([0.3, -0.6, -0.1]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.absoluteDifference(label, predictions, weights);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(1 - 0.3) * 0.1 + Math.abs(2 - (-0.6)) * 0.2 +
         Math.abs(3 - (-0.1)) * 0.3) /
            3);
  });

  it('1D - weighted - Reduction.NONE', () => {
    const predictions = tf.tensor1d([1, 2, 3]);
    const label = tf.tensor1d([0.3, -0.6, -0.1]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.absoluteDifference(
        label, predictions, weights, tf.Reduction.NONE);

    expect(y.shape).toEqual([3]);
    expectArraysClose(y, [
      Math.abs(1 - 0.3) * 0.1, Math.abs(2 - (-0.6)) * 0.2,
      Math.abs(3 - (-0.1)) * 0.3
    ]);
  });

  it('1D - Reduction.MEAN', () => {
    const predictions = tf.tensor1d([1, 2, 3]);
    const label = tf.tensor1d([0.3, -0.6, -0.1]);

    const y = tf.losses.absoluteDifference(
        label, predictions, undefined, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(1 - 0.3) + Math.abs(2 - (-0.6)) + Math.abs(3 - (-0.1))) / 3);
  });

  it('1D - weighted - Reduction.MEAN', () => {
    const predictions = tf.tensor1d([1, 2, 3]);
    const label = tf.tensor1d([0.3, -0.6, -0.1]);
    const weights = tf.tensor1d([0.1, 0.2, 0.3]);

    const y = tf.losses.absoluteDifference(
        label, predictions, weights, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        ((Math.abs(1 - 0.3) * 0.1) + (Math.abs(2 - (-0.6)) * 0.2) +
         (Math.abs(3 - (-0.1)) * 0.3)) /
            0.6);
  });

  it('2D', () => {
    const predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);

    const y = tf.losses.absoluteDifference(label, predictions);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(4 - 1) + Math.abs(8 - 9) + Math.abs(12 - 2) +
         Math.abs(8 - (-5)) + Math.abs(1 - (-2)) + Math.abs(3 - 6)) /
            6);
  });

  it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', () => {
    const predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
    const weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);

    const y = tf.losses.absoluteDifference(label, predictions, weights);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(4 - 1) * 3 + Math.abs(8 - 9) * 0 + Math.abs(12 - 2) * 5 +
         Math.abs(8 - (-5)) * 0 + Math.abs(1 - (-2)) * 4 +
         Math.abs(3 - 6) * 2) /
            4);
  });

  it('2D - weighted - Reduction.NONE', () => {
    const predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
    const weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);

    const y = tf.losses.absoluteDifference(
        label, predictions, weights, tf.Reduction.NONE);

    expect(y.shape).toEqual([2, 3]);
    expectArraysClose(y, [
      Math.abs(4 - 1) * 3, Math.abs(8 - 9) * 6, Math.abs(12 - 2) * 5,
      Math.abs(8 - (-5)) * 0, Math.abs(1 - (-2)) * 4, Math.abs(3 - 6) * 2
    ]);
  });

  it('2D - Reduction.MEAN', () => {
    const predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);

    const y = tf.losses.absoluteDifference(
        label, predictions, undefined, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(4 - 1) + Math.abs(8 - 9) + Math.abs(12 - 2) +
         Math.abs(8 - (-5)) + Math.abs(1 - (-2)) + Math.abs(3 - 6)) /
            6);
  });

  it('2D - weighted - Reduction.MEAN', () => {
    const predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
    const label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
    const weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);

    const y = tf.losses.absoluteDifference(
        label, predictions, weights, tf.Reduction.MEAN);

    expect(y.shape).toEqual([]);
    expectNumbersClose(
        y.get(),
        (Math.abs(4 - 1) * 3 + Math.abs(8 - 9) * 6 + Math.abs(12 - 2) * 5 +
         Math.abs(8 - (-5)) * 0 + Math.abs(1 - (-2)) * 4 +
         Math.abs(3 - 6) * 2) /
            20);
  });
});
