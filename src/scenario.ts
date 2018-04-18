
import { Scenario } from './common/models';

const scenario: Scenario = {
    tickPerStep: 400,
    parts: {
        0: {
            tickPerEnemy: 500,
        },
        1: {
            tickPerEnemy: 450,
        },
        2: {
            tickPerEnemy: 300,
        },
        3: {
            tickPerEnemy: 100,
        },
        4: {
            tickPerEnemy: 50,
        },
        5: {
            tickPerEnemy: 30,
        },
        6: {
            tickPerEnemy: 20,
        },
        7: {
            tickPerEnemy: 5,
        },
    },
};

export default scenario;
