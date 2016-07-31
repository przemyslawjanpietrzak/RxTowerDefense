import createjs from 'easel';
import Rx from 'rx';

export default function bulletFactory(x, y, stage, ticker) {
  const circle = new createjs.Shape();
  circle.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };
  circle.graphics.beginFill('black').drawCircle(x, y, 2);
  stage.addChild(circle);

  circle.subscribsion = ticker.subscribe(
    () => {
      const newDirections = getMove(circle);
      circle.x = newDirections.x;
      circle.y = newDirections.y;
      circle.step = newDirections.step;

      circle.actions.move.onNext({ x: circle.x, y: circle.y });
    }
  );
}
