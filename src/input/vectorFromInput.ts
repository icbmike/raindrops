import { InputState } from './input';
import { Down, fromAngleAndSize, Left, Right, Up, Vector, Zero } from '../physics/vector';

export function vectorFromInput(input: InputState): Vector {
    const { up, down, left, right } = input;

    // Zero
    if ((up && down && left && right)
        || (!up && !down && left && right)
        || (!up && !down && !left && !right)
        || (up && down && !left && !right)) {
        return Zero;
    }

    // Up
    if ((up && !down && left && right)
        || (up && !down && !left && !right)) {
        return Up;
    }

    // Down
    if ((!up && down && left && right)
        || (!up && down && !left && !right)) {
        return Down;
    }

    // Left
    if ((up && down && left && !right)
        || (!up && !down && left && !right)) {
        return Left;
    }

    // Right
    if ((up && down && !left && right)
        || (!up && !down && !left && right)) {
        return Right;
    }

    // Diagonals
    if (up && right) {
        return fromAngleAndSize(Math.PI / 4, 1);
    }

    if (up && left) {
        return fromAngleAndSize(Math.PI / 4 * 3, 1);
    }

    if (down && left) {
        return fromAngleAndSize(Math.PI / 4 * 5, 1);
    }

    if (down && right) {
        return fromAngleAndSize(Math.PI / 4 * 7, 1);
    }

    return Zero
}
