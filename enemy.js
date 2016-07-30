import createjs from 'easel';
import Rx from 'rx';

export default function enemyFactory(stage, ticker) {
  const circle = new createjs.Shape();
  circle.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };
  circle.graphics.beginFill('green').drawCircle(0, 0, 5);

  circle.subscribsion = ticker.subscribe(
    () => {
      circle.x += 10;
      circle.y += 5;
      circle.actions.move.onNext({ x: circle.x, y: circle.y });
      stage.update();
    }
  );

  circle.actions.move.subscribe(() => {
    if (circle.x > 500 || circle.y > 1000) {
      circle.actions.die.onNext();
    }
  });

  circle.actions.die.subscribe(() => {
    stage.removeChild(circle);
    circle.actions.move.onCompleted();
    circle.actions.die.onCompleted();
    circle.subscribsion.completed();
  });

  stage.addChild(circle);

  return circle;
}
