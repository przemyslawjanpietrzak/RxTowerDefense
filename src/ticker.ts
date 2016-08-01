import { Observable } from 'rx';

import stage from './stage';

export default Observable
  .interval(17)
  .timeInterval()
  .tap(() => {
    stage.update();
  });
