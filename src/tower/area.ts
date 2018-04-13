// import { stage } from '../stage/stage';

import { Tower } from './models';

// export const getArea = (tower: Tower): Shape => {
//     const area: Shape = new Shape();
//     area.graphics.beginFill(settings.areaColor).drawCircle(tower.x, tower.y, tower.range);

//     return area;
// };

export const toggleAreaFactory = (tower: Tower ) => {
    return () => {
        const areaWasVisible = tower.areaVisible;
        // if (areaWasVisible) {
        //     stage.removeChild(tower.area);
        // } else {
        //     stage.addChild(tower.area);
        // }
        tower.areaVisible = !areaWasVisible;
    };
};

export const hideTowerArea = (tower: Tower ) => {
    tower.areaVisible = false;
    // stage.removeChild(tower.area);
};
