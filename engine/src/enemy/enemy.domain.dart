import 'package:rxdart/rxdart.dart';

import 'enemy.dart';

typedef Enemies$ = Observable<List<Enemy>> Function(); // New form.

