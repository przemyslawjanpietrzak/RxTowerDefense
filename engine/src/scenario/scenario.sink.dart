import 'package:rxdart/subjects.dart';

class ScenarioSink {
  final startWave$ = new PublishSubject<dynamic>();
  final endWave$ = new PublishSubject<dynamic>();
}
