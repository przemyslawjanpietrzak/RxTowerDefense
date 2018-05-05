import { Tower } from '../tower/models';

import { Point, Scenario, Sinks, StagePosition } from './models';

const SQUARE_EXPONENT = 2;

export const getDistance = (x1: number, y1: number, x2: number, y2: number): number =>
    Math.sqrt(Math.pow(x1 - x2, SQUARE_EXPONENT) + Math.pow(y1 - y2, SQUARE_EXPONENT));

export const getMove = (position: Point, destination: StagePosition, speed: number): StagePosition => {
    const angle = Math.atan2(destination.z - position.z, destination.x - position.x);
    const newX = position.x + speed * Math.cos(angle);
    const newZ = position.z + speed * Math.sin(angle);

    return {
        x: newX,
        z: newZ,
    };
};

export const isInDistance = (tower: Tower, destination: Point): boolean => {
    return getDistance(tower.position.x, tower.position.z, destination.x, destination.z) <= tower.range;
};

export const getTickerPerEnemy = (counter: number, scenario: Scenario): number => {
    const currentPart = Math.floor(counter / scenario.tickPerStep);

    return scenario.parts[currentPart].tickPerEnemy;
};

export const runEffects = (effects: { [key: string]: (Sinks) => void}) => (sinks: Sinks) => {
    Object.keys(effects).forEach((key: string) => {
        effects[key](sinks);
    });
};
