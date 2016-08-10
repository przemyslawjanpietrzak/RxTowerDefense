import Rx from 'rxjs/Rx';
import 'rxjs/add/operator/timeInterval';

export default Rx.Observable
  .interval(17)
  .timeInterval();