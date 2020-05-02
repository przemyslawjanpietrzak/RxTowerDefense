import 'package:rxdart/rxdart.dart';

class Ticker {
  static const MILISECONDS_PER_PICK = 17;
  static const PERIOD_DURATION =
      Duration(milliseconds: Ticker.MILISECONDS_PER_PICK);

  Observable<int> tick$;
  PublishSubject<int> _interval$;

  int _tickNumber = 0;
  bool _isPaused = false;

  Ticker() {
    this._interval$ = PublishSubject<int>();
    this.tick$ = this
        ._interval$
        .where((_) => !this._isPaused)
        .map((_) => this._tickNumber++);
  }

  void togglePause() {
    _isPaused = !_isPaused;
  }

  void tick() {
    _interval$.add(0);
  }
}
