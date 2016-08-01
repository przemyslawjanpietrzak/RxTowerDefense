System.register("src/path.ts", ["github:CreateJS/EaselJS@0.8.2.js", "src/map.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      map_1;
  var line,
      firstStep,
      restSteps;
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(map_1_1) {
      map_1 = map_1_1;
    }],
    execute: function() {
      line = new easel_1.default.Shape();
      line.graphics.beginStroke('black');
      firstStep = map_1.default[0], restSteps = map_1.default.slice(1);
      line.graphics.moveTo(firstStep.x, firstStep.y);
      restSteps.forEach(function(_a) {
        var x = _a.x,
            y = _a.y;
        line.graphics.lineTo(x, y);
      });
      exports_1("default", line);
    }
  };
});

System.register("src/map.ts", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function() {
      exports_1("default", [{
        x: 0,
        y: 100
      }, {
        x: 100,
        y: 100
      }, {
        x: 250,
        y: 250
      }, {
        x: 500,
        y: 250
      }, {
        x: 500,
        y: 500
      }, {
        x: 1000,
        y: 1000
      }]);
    }
  };
});

System.register("src/enemy/move.ts", ["src/map.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var map_1;
  var getStepChange,
      getDirection;
  function getMove(_a) {
    var x = _a.x,
        y = _a.y,
        step = _a.step,
        speed = _a.speed;
    var path = map_1.default[step];
    var directionX = getDirection(x, path.x, speed);
    var directionY = getDirection(y, path.y, speed);
    var newX = x + directionX * speed;
    var newY = y + directionY * speed;
    var isNextStep = getStepChange(x, y, path.x, path.y, speed);
    return {
      x: newX,
      y: newY,
      step: isNextStep ? step + 1 : step
    };
  }
  exports_1("default", getMove);
  return {
    setters: [function(map_1_1) {
      map_1 = map_1_1;
    }],
    execute: function() {
      exports_1("getStepChange", getStepChange = function(x, y, endX, endY, speed) {
        return Math.abs(endX - x) <= speed && Math.abs(endY - y) <= speed;
      });
      getDirection = function(position, destination, speed) {
        if (Math.abs(position - destination) < speed) {
          return 0;
        }
        return destination > position ? 1 : -1;
      };
    }
  };
});

System.register("src/enemy/index.ts", ["github:CreateJS/EaselJS@0.8.2.js", "npm:rx@4.1.0.js", "src/stage.ts", "src/ticker.ts", "src/enemy/move.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      rx_1,
      stage_1,
      ticker_1,
      move_1;
  var enemy$,
      enemiesMove$,
      die;
  function enemyFactory() {
    var enemy = new easel_1.default.Shape();
    enemy.graphics.beginFill('red').drawCircle(0, 0, 5);
    enemy.actions = {
      die: new rx_1.default.Subject(),
      move: new rx_1.default.Subject()
    };
    enemy.step = 0;
    enemy.speed = 2;
    enemy.die = function dieEnemy() {
      die(enemy);
    };
    enemy.subscribsion = ticker_1.default.subscribe(function() {
      var newDirections = move_1.default(enemy);
      enemy.x = newDirections.x;
      enemy.y = newDirections.y;
      enemy.step = newDirections.step;
      enemy.actions.move.onNext(enemy);
      enemiesMove$.onNext(enemy);
    });
    enemy.actions.move.subscribe(function() {
      if (enemy.x > 500 || enemy.y > 1000) {
        enemy.actions.die.onNext();
      }
    });
    enemy.actions.die.subscribe(function() {
      die(enemy);
    });
    stage_1.default.addChild(enemy);
    enemy$.onNext(enemy);
    return enemy;
  }
  exports_1("enemyFactory", enemyFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(rx_1_1) {
      rx_1 = rx_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(move_1_1) {
      move_1 = move_1_1;
    }],
    execute: function() {
      exports_1("enemy$", enemy$ = new rx_1.default.Subject());
      exports_1("enemiesMove$", enemiesMove$ = new rx_1.default.Subject());
      die = function(enemy) {
        stage_1.default.removeChild(enemy);
        enemy.actions.move.onCompleted();
        enemy.actions.die.onCompleted();
        enemy.subscribsion.completed();
      };
    }
  };
});

System.register("src/tower.ts", ["github:CreateJS/EaselJS@0.8.2.js", "npm:rx@4.1.0.js", "src/stage.ts", "src/ticker.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      rx_1,
      stage_1,
      ticker_1;
  var tower$,
      towerFireToEnemy$;
  function towerFactory(x, y) {
    var reloadBulltetTime = 100;
    var tower = new easel_1.default.Shape();
    tower.graphics.beginFill('blue').drawCircle(0, 0, 5);
    tower.x = x;
    tower.y = y;
    tower.range = 250;
    tower.reloadBulltetTime = 0;
    d;
    tower.fireToEnemy = function towerFireToEnemy(enemy) {
      towerFireToEnemy$.onNext({
        tower: tower,
        enemy: enemy
      });
      tower.reloadBulltetTime = reloadBulltetTime;
    };
    tower.subscribsion = ticker_1.default.subscribe(function() {
      if (tower.reloadBulltetTime > 0) {
        tower.reloadBulltetTime--;
      }
    });
    stage_1.default.addChild(tower);
    tower$.onNext(tower);
    return tower;
  }
  exports_1("towerFactory", towerFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(rx_1_1) {
      rx_1 = rx_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }],
    execute: function() {
      exports_1("tower$", tower$ = new rx_1.default.Subject());
      exports_1("towerFireToEnemy$", towerFireToEnemy$ = new rx_1.default.Subject());
    }
  };
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.aggregates.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        BinaryDisposable = Rx.BinaryDisposable,
        AnonymousObservable = Rx.AnonymousObservable,
        AbstractObserver = Rx.internals.AbstractObserver,
        disposableEmpty = Rx.Disposable.empty,
        helpers = Rx.helpers,
        defaultComparer = helpers.defaultComparer,
        identity = helpers.identity,
        defaultSubComparer = helpers.defaultSubComparer,
        isFunction = helpers.isFunction,
        isPromise = helpers.isPromise,
        isArrayLike = helpers.isArrayLike,
        isIterable = helpers.isIterable,
        inherits = Rx.internals.inherits,
        observableFromPromise = Observable.fromPromise,
        observableFrom = Observable.from,
        bindCallback = Rx.internals.bindCallback,
        EmptyError = Rx.EmptyError,
        ObservableBase = Rx.ObservableBase,
        ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    var ExtremaByObservable = (function(__super__) {
      inherits(ExtremaByObservable, __super__);
      function ExtremaByObservable(source, k, c) {
        this.source = source;
        this._k = k;
        this._c = c;
        __super__.call(this);
      }
      ExtremaByObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new ExtremaByObserver(o, this._k, this._c));
      };
      return ExtremaByObservable;
    }(ObservableBase));
    var ExtremaByObserver = (function(__super__) {
      inherits(ExtremaByObserver, __super__);
      function ExtremaByObserver(o, k, c) {
        this._o = o;
        this._k = k;
        this._c = c;
        this._v = null;
        this._hv = false;
        this._l = [];
        __super__.call(this);
      }
      ExtremaByObserver.prototype.next = function(x) {
        var key = tryCatch(this._k)(x);
        if (key === errorObj) {
          return this._o.onError(key.e);
        }
        var comparison = 0;
        if (!this._hv) {
          this._hv = true;
          this._v = key;
        } else {
          comparison = tryCatch(this._c)(key, this._v);
          if (comparison === errorObj) {
            return this._o.onError(comparison.e);
          }
        }
        if (comparison > 0) {
          this._v = key;
          this._l = [];
        }
        if (comparison >= 0) {
          this._l.push(x);
        }
      };
      ExtremaByObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      ExtremaByObserver.prototype.completed = function() {
        this._o.onNext(this._l);
        this._o.onCompleted();
      };
      return ExtremaByObserver;
    }(AbstractObserver));
    function firstOnly(x) {
      if (x.length === 0) {
        throw new EmptyError();
      }
      return x[0];
    }
    var ReduceObservable = (function(__super__) {
      inherits(ReduceObservable, __super__);
      function ReduceObservable(source, accumulator, hasSeed, seed) {
        this.source = source;
        this.accumulator = accumulator;
        this.hasSeed = hasSeed;
        this.seed = seed;
        __super__.call(this);
      }
      ReduceObservable.prototype.subscribeCore = function(observer) {
        return this.source.subscribe(new ReduceObserver(observer, this));
      };
      return ReduceObservable;
    }(ObservableBase));
    var ReduceObserver = (function(__super__) {
      inherits(ReduceObserver, __super__);
      function ReduceObserver(o, parent) {
        this._o = o;
        this._p = parent;
        this._fn = parent.accumulator;
        this._hs = parent.hasSeed;
        this._s = parent.seed;
        this._ha = false;
        this._a = null;
        this._hv = false;
        this._i = 0;
        __super__.call(this);
      }
      ReduceObserver.prototype.next = function(x) {
        !this._hv && (this._hv = true);
        if (this._ha) {
          this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
        } else {
          this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
          this._ha = true;
        }
        if (this._a === errorObj) {
          return this._o.onError(this._a.e);
        }
        this._i++;
      };
      ReduceObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      ReduceObserver.prototype.completed = function() {
        this._hv && this._o.onNext(this._a);
        !this._hv && this._hs && this._o.onNext(this._s);
        !this._hv && !this._hs && this._o.onError(new EmptyError());
        this._o.onCompleted();
      };
      return ReduceObserver;
    }(AbstractObserver));
    observableProto.reduce = function() {
      var hasSeed = false,
          seed,
          accumulator = arguments[0];
      if (arguments.length === 2) {
        hasSeed = true;
        seed = arguments[1];
      }
      return new ReduceObservable(this, accumulator, hasSeed, seed);
    };
    var SomeObservable = (function(__super__) {
      inherits(SomeObservable, __super__);
      function SomeObservable(source, fn) {
        this.source = source;
        this._fn = fn;
        __super__.call(this);
      }
      SomeObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new SomeObserver(o, this._fn, this.source));
      };
      return SomeObservable;
    }(ObservableBase));
    var SomeObserver = (function(__super__) {
      inherits(SomeObserver, __super__);
      function SomeObserver(o, fn, s) {
        this._o = o;
        this._fn = fn;
        this._s = s;
        this._i = 0;
        __super__.call(this);
      }
      SomeObserver.prototype.next = function(x) {
        var result = tryCatch(this._fn)(x, this._i++, this._s);
        if (result === errorObj) {
          return this._o.onError(result.e);
        }
        if (Boolean(result)) {
          this._o.onNext(true);
          this._o.onCompleted();
        }
      };
      SomeObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SomeObserver.prototype.completed = function() {
        this._o.onNext(false);
        this._o.onCompleted();
      };
      return SomeObserver;
    }(AbstractObserver));
    observableProto.some = function(predicate, thisArg) {
      var fn = bindCallback(predicate, thisArg, 3);
      return new SomeObservable(this, fn);
    };
    var IsEmptyObservable = (function(__super__) {
      inherits(IsEmptyObservable, __super__);
      function IsEmptyObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      IsEmptyObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new IsEmptyObserver(o));
      };
      return IsEmptyObservable;
    }(ObservableBase));
    var IsEmptyObserver = (function(__super__) {
      inherits(IsEmptyObserver, __super__);
      function IsEmptyObserver(o) {
        this._o = o;
        __super__.call(this);
      }
      IsEmptyObserver.prototype.next = function() {
        this._o.onNext(false);
        this._o.onCompleted();
      };
      IsEmptyObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      IsEmptyObserver.prototype.completed = function() {
        this._o.onNext(true);
        this._o.onCompleted();
      };
      return IsEmptyObserver;
    }(AbstractObserver));
    observableProto.isEmpty = function() {
      return new IsEmptyObservable(this);
    };
    var EveryObservable = (function(__super__) {
      inherits(EveryObservable, __super__);
      function EveryObservable(source, fn) {
        this.source = source;
        this._fn = fn;
        __super__.call(this);
      }
      EveryObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new EveryObserver(o, this._fn, this.source));
      };
      return EveryObservable;
    }(ObservableBase));
    var EveryObserver = (function(__super__) {
      inherits(EveryObserver, __super__);
      function EveryObserver(o, fn, s) {
        this._o = o;
        this._fn = fn;
        this._s = s;
        this._i = 0;
        __super__.call(this);
      }
      EveryObserver.prototype.next = function(x) {
        var result = tryCatch(this._fn)(x, this._i++, this._s);
        if (result === errorObj) {
          return this._o.onError(result.e);
        }
        if (!Boolean(result)) {
          this._o.onNext(false);
          this._o.onCompleted();
        }
      };
      EveryObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      EveryObserver.prototype.completed = function() {
        this._o.onNext(true);
        this._o.onCompleted();
      };
      return EveryObserver;
    }(AbstractObserver));
    observableProto.every = function(predicate, thisArg) {
      var fn = bindCallback(predicate, thisArg, 3);
      return new EveryObservable(this, fn);
    };
    var IncludesObservable = (function(__super__) {
      inherits(IncludesObservable, __super__);
      function IncludesObservable(source, elem, idx) {
        var n = +idx || 0;
        Math.abs(n) === Infinity && (n = 0);
        this.source = source;
        this._elem = elem;
        this._n = n;
        __super__.call(this);
      }
      IncludesObservable.prototype.subscribeCore = function(o) {
        if (this._n < 0) {
          o.onNext(false);
          o.onCompleted();
          return disposableEmpty;
        }
        return this.source.subscribe(new IncludesObserver(o, this._elem, this._n));
      };
      return IncludesObservable;
    }(ObservableBase));
    var IncludesObserver = (function(__super__) {
      inherits(IncludesObserver, __super__);
      function IncludesObserver(o, elem, n) {
        this._o = o;
        this._elem = elem;
        this._n = n;
        this._i = 0;
        __super__.call(this);
      }
      function comparer(a, b) {
        return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
      }
      IncludesObserver.prototype.next = function(x) {
        if (this._i++ >= this._n && comparer(x, this._elem)) {
          this._o.onNext(true);
          this._o.onCompleted();
        }
      };
      IncludesObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      IncludesObserver.prototype.completed = function() {
        this._o.onNext(false);
        this._o.onCompleted();
      };
      return IncludesObserver;
    }(AbstractObserver));
    observableProto.includes = function(searchElement, fromIndex) {
      return new IncludesObservable(this, searchElement, fromIndex);
    };
    var CountObservable = (function(__super__) {
      inherits(CountObservable, __super__);
      function CountObservable(source, fn) {
        this.source = source;
        this._fn = fn;
        __super__.call(this);
      }
      CountObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new CountObserver(o, this._fn, this.source));
      };
      return CountObservable;
    }(ObservableBase));
    var CountObserver = (function(__super__) {
      inherits(CountObserver, __super__);
      function CountObserver(o, fn, s) {
        this._o = o;
        this._fn = fn;
        this._s = s;
        this._i = 0;
        this._c = 0;
        __super__.call(this);
      }
      CountObserver.prototype.next = function(x) {
        if (this._fn) {
          var result = tryCatch(this._fn)(x, this._i++, this._s);
          if (result === errorObj) {
            return this._o.onError(result.e);
          }
          Boolean(result) && (this._c++);
        } else {
          this._c++;
        }
      };
      CountObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      CountObserver.prototype.completed = function() {
        this._o.onNext(this._c);
        this._o.onCompleted();
      };
      return CountObserver;
    }(AbstractObserver));
    observableProto.count = function(predicate, thisArg) {
      var fn = bindCallback(predicate, thisArg, 3);
      return new CountObservable(this, fn);
    };
    var IndexOfObservable = (function(__super__) {
      inherits(IndexOfObservable, __super__);
      function IndexOfObservable(source, e, n) {
        this.source = source;
        this._e = e;
        this._n = n;
        __super__.call(this);
      }
      IndexOfObservable.prototype.subscribeCore = function(o) {
        if (this._n < 0) {
          o.onNext(-1);
          o.onCompleted();
          return disposableEmpty;
        }
        return this.source.subscribe(new IndexOfObserver(o, this._e, this._n));
      };
      return IndexOfObservable;
    }(ObservableBase));
    var IndexOfObserver = (function(__super__) {
      inherits(IndexOfObserver, __super__);
      function IndexOfObserver(o, e, n) {
        this._o = o;
        this._e = e;
        this._n = n;
        this._i = 0;
        __super__.call(this);
      }
      IndexOfObserver.prototype.next = function(x) {
        if (this._i >= this._n && x === this._e) {
          this._o.onNext(this._i);
          this._o.onCompleted();
        }
        this._i++;
      };
      IndexOfObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      IndexOfObserver.prototype.completed = function() {
        this._o.onNext(-1);
        this._o.onCompleted();
      };
      return IndexOfObserver;
    }(AbstractObserver));
    observableProto.indexOf = function(searchElement, fromIndex) {
      var n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      return new IndexOfObservable(this, searchElement, n);
    };
    var SumObservable = (function(__super__) {
      inherits(SumObservable, __super__);
      function SumObservable(source, fn) {
        this.source = source;
        this._fn = fn;
        __super__.call(this);
      }
      SumObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new SumObserver(o, this._fn, this.source));
      };
      return SumObservable;
    }(ObservableBase));
    var SumObserver = (function(__super__) {
      inherits(SumObserver, __super__);
      function SumObserver(o, fn, s) {
        this._o = o;
        this._fn = fn;
        this._s = s;
        this._i = 0;
        this._c = 0;
        __super__.call(this);
      }
      SumObserver.prototype.next = function(x) {
        if (this._fn) {
          var result = tryCatch(this._fn)(x, this._i++, this._s);
          if (result === errorObj) {
            return this._o.onError(result.e);
          }
          this._c += result;
        } else {
          this._c += x;
        }
      };
      SumObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SumObserver.prototype.completed = function() {
        this._o.onNext(this._c);
        this._o.onCompleted();
      };
      return SumObserver;
    }(AbstractObserver));
    observableProto.sum = function(keySelector, thisArg) {
      var fn = bindCallback(keySelector, thisArg, 3);
      return new SumObservable(this, fn);
    };
    observableProto.minBy = function(keySelector, comparer) {
      comparer || (comparer = defaultSubComparer);
      return new ExtremaByObservable(this, keySelector, function(x, y) {
        return comparer(x, y) * -1;
      });
    };
    observableProto.min = function(comparer) {
      return this.minBy(identity, comparer).map(firstOnly);
    };
    observableProto.maxBy = function(keySelector, comparer) {
      comparer || (comparer = defaultSubComparer);
      return new ExtremaByObservable(this, keySelector, comparer);
    };
    observableProto.max = function(comparer) {
      return this.maxBy(identity, comparer).map(firstOnly);
    };
    var AverageObservable = (function(__super__) {
      inherits(AverageObservable, __super__);
      function AverageObservable(source, fn) {
        this.source = source;
        this._fn = fn;
        __super__.call(this);
      }
      AverageObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new AverageObserver(o, this._fn, this.source));
      };
      return AverageObservable;
    }(ObservableBase));
    var AverageObserver = (function(__super__) {
      inherits(AverageObserver, __super__);
      function AverageObserver(o, fn, s) {
        this._o = o;
        this._fn = fn;
        this._s = s;
        this._c = 0;
        this._t = 0;
        __super__.call(this);
      }
      AverageObserver.prototype.next = function(x) {
        if (this._fn) {
          var r = tryCatch(this._fn)(x, this._c++, this._s);
          if (r === errorObj) {
            return this._o.onError(r.e);
          }
          this._t += r;
        } else {
          this._c++;
          this._t += x;
        }
      };
      AverageObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      AverageObserver.prototype.completed = function() {
        if (this._c === 0) {
          return this._o.onError(new EmptyError());
        }
        this._o.onNext(this._t / this._c);
        this._o.onCompleted();
      };
      return AverageObserver;
    }(AbstractObserver));
    observableProto.average = function(keySelector, thisArg) {
      var source = this,
          fn;
      if (isFunction(keySelector)) {
        fn = bindCallback(keySelector, thisArg, 3);
      }
      return new AverageObservable(source, fn);
    };
    observableProto.sequenceEqual = function(second, comparer) {
      var first = this;
      comparer || (comparer = defaultComparer);
      return new AnonymousObservable(function(o) {
        var donel = false,
            doner = false,
            ql = [],
            qr = [];
        var subscription1 = first.subscribe(function(x) {
          if (qr.length > 0) {
            var v = qr.shift();
            var equal = tryCatch(comparer)(v, x);
            if (equal === errorObj) {
              return o.onError(equal.e);
            }
            if (!equal) {
              o.onNext(false);
              o.onCompleted();
            }
          } else if (doner) {
            o.onNext(false);
            o.onCompleted();
          } else {
            ql.push(x);
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          donel = true;
          if (ql.length === 0) {
            if (qr.length > 0) {
              o.onNext(false);
              o.onCompleted();
            } else if (doner) {
              o.onNext(true);
              o.onCompleted();
            }
          }
        });
        (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
        isPromise(second) && (second = observableFromPromise(second));
        var subscription2 = second.subscribe(function(x) {
          if (ql.length > 0) {
            var v = ql.shift();
            var equal = tryCatch(comparer)(v, x);
            if (equal === errorObj) {
              return o.onError(equal.e);
            }
            if (!equal) {
              o.onNext(false);
              o.onCompleted();
            }
          } else if (donel) {
            o.onNext(false);
            o.onCompleted();
          } else {
            qr.push(x);
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          doner = true;
          if (qr.length === 0) {
            if (ql.length > 0) {
              o.onNext(false);
              o.onCompleted();
            } else if (donel) {
              o.onNext(true);
              o.onCompleted();
            }
          }
        });
        return new BinaryDisposable(subscription1, subscription2);
      }, first);
    };
    var ElementAtObservable = (function(__super__) {
      inherits(ElementAtObservable, __super__);
      function ElementAtObservable(source, i, d) {
        this.source = source;
        this._i = i;
        this._d = d;
        __super__.call(this);
      }
      ElementAtObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new ElementAtObserver(o, this._i, this._d));
      };
      return ElementAtObservable;
    }(ObservableBase));
    var ElementAtObserver = (function(__super__) {
      inherits(ElementAtObserver, __super__);
      function ElementAtObserver(o, i, d) {
        this._o = o;
        this._i = i;
        this._d = d;
        __super__.call(this);
      }
      ElementAtObserver.prototype.next = function(x) {
        if (this._i-- === 0) {
          this._o.onNext(x);
          this._o.onCompleted();
        }
      };
      ElementAtObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      ElementAtObserver.prototype.completed = function() {
        if (this._d === undefined) {
          this._o.onError(new ArgumentOutOfRangeError());
        } else {
          this._o.onNext(this._d);
          this._o.onCompleted();
        }
      };
      return ElementAtObserver;
    }(AbstractObserver));
    observableProto.elementAt = function(index, defaultValue) {
      if (index < 0) {
        throw new ArgumentOutOfRangeError();
      }
      return new ElementAtObservable(this, index, defaultValue);
    };
    var SingleObserver = (function(__super__) {
      inherits(SingleObserver, __super__);
      function SingleObserver(o, obj, s) {
        this._o = o;
        this._obj = obj;
        this._s = s;
        this._i = 0;
        this._hv = false;
        this._v = null;
        __super__.call(this);
      }
      SingleObserver.prototype.next = function(x) {
        var shouldYield = false;
        if (this._obj.predicate) {
          var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
          if (res === errorObj) {
            return this._o.onError(res.e);
          }
          Boolean(res) && (shouldYield = true);
        } else if (!this._obj.predicate) {
          shouldYield = true;
        }
        if (shouldYield) {
          if (this._hv) {
            return this._o.onError(new Error('Sequence contains more than one matching element'));
          }
          this._hv = true;
          this._v = x;
        }
      };
      SingleObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SingleObserver.prototype.completed = function() {
        if (this._hv) {
          this._o.onNext(this._v);
          this._o.onCompleted();
        } else if (this._obj.defaultValue === undefined) {
          this._o.onError(new EmptyError());
        } else {
          this._o.onNext(this._obj.defaultValue);
          this._o.onCompleted();
        }
      };
      return SingleObserver;
    }(AbstractObserver));
    observableProto.single = function(predicate, thisArg) {
      var obj = {},
          source = this;
      if (typeof arguments[0] === 'object') {
        obj = arguments[0];
      } else {
        obj = {
          predicate: arguments[0],
          thisArg: arguments[1],
          defaultValue: arguments[2]
        };
      }
      if (isFunction(obj.predicate)) {
        var fn = obj.predicate;
        obj.predicate = bindCallback(fn, obj.thisArg, 3);
      }
      return new AnonymousObservable(function(o) {
        return source.subscribe(new SingleObserver(o, obj, source));
      }, source);
    };
    var FirstObservable = (function(__super__) {
      inherits(FirstObservable, __super__);
      function FirstObservable(source, obj) {
        this.source = source;
        this._obj = obj;
        __super__.call(this);
      }
      FirstObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new FirstObserver(o, this._obj, this.source));
      };
      return FirstObservable;
    }(ObservableBase));
    var FirstObserver = (function(__super__) {
      inherits(FirstObserver, __super__);
      function FirstObserver(o, obj, s) {
        this._o = o;
        this._obj = obj;
        this._s = s;
        this._i = 0;
        __super__.call(this);
      }
      FirstObserver.prototype.next = function(x) {
        if (this._obj.predicate) {
          var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
          if (res === errorObj) {
            return this._o.onError(res.e);
          }
          if (Boolean(res)) {
            this._o.onNext(x);
            this._o.onCompleted();
          }
        } else if (!this._obj.predicate) {
          this._o.onNext(x);
          this._o.onCompleted();
        }
      };
      FirstObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      FirstObserver.prototype.completed = function() {
        if (this._obj.defaultValue === undefined) {
          this._o.onError(new EmptyError());
        } else {
          this._o.onNext(this._obj.defaultValue);
          this._o.onCompleted();
        }
      };
      return FirstObserver;
    }(AbstractObserver));
    observableProto.first = function() {
      var obj = {},
          source = this;
      if (typeof arguments[0] === 'object') {
        obj = arguments[0];
      } else {
        obj = {
          predicate: arguments[0],
          thisArg: arguments[1],
          defaultValue: arguments[2]
        };
      }
      if (isFunction(obj.predicate)) {
        var fn = obj.predicate;
        obj.predicate = bindCallback(fn, obj.thisArg, 3);
      }
      return new FirstObservable(this, obj);
    };
    var LastObservable = (function(__super__) {
      inherits(LastObservable, __super__);
      function LastObservable(source, obj) {
        this.source = source;
        this._obj = obj;
        __super__.call(this);
      }
      LastObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new LastObserver(o, this._obj, this.source));
      };
      return LastObservable;
    }(ObservableBase));
    var LastObserver = (function(__super__) {
      inherits(LastObserver, __super__);
      function LastObserver(o, obj, s) {
        this._o = o;
        this._obj = obj;
        this._s = s;
        this._i = 0;
        this._hv = false;
        this._v = null;
        __super__.call(this);
      }
      LastObserver.prototype.next = function(x) {
        var shouldYield = false;
        if (this._obj.predicate) {
          var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
          if (res === errorObj) {
            return this._o.onError(res.e);
          }
          Boolean(res) && (shouldYield = true);
        } else if (!this._obj.predicate) {
          shouldYield = true;
        }
        if (shouldYield) {
          this._hv = true;
          this._v = x;
        }
      };
      LastObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      LastObserver.prototype.completed = function() {
        if (this._hv) {
          this._o.onNext(this._v);
          this._o.onCompleted();
        } else if (this._obj.defaultValue === undefined) {
          this._o.onError(new EmptyError());
        } else {
          this._o.onNext(this._obj.defaultValue);
          this._o.onCompleted();
        }
      };
      return LastObserver;
    }(AbstractObserver));
    observableProto.last = function() {
      var obj = {},
          source = this;
      if (typeof arguments[0] === 'object') {
        obj = arguments[0];
      } else {
        obj = {
          predicate: arguments[0],
          thisArg: arguments[1],
          defaultValue: arguments[2]
        };
      }
      if (isFunction(obj.predicate)) {
        var fn = obj.predicate;
        obj.predicate = bindCallback(fn, obj.thisArg, 3);
      }
      return new LastObservable(this, obj);
    };
    var FindValueObserver = (function(__super__) {
      inherits(FindValueObserver, __super__);
      function FindValueObserver(observer, source, callback, yieldIndex) {
        this._o = observer;
        this._s = source;
        this._cb = callback;
        this._y = yieldIndex;
        this._i = 0;
        __super__.call(this);
      }
      FindValueObserver.prototype.next = function(x) {
        var shouldRun = tryCatch(this._cb)(x, this._i, this._s);
        if (shouldRun === errorObj) {
          return this._o.onError(shouldRun.e);
        }
        if (shouldRun) {
          this._o.onNext(this._y ? this._i : x);
          this._o.onCompleted();
        } else {
          this._i++;
        }
      };
      FindValueObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      FindValueObserver.prototype.completed = function() {
        this._y && this._o.onNext(-1);
        this._o.onCompleted();
      };
      return FindValueObserver;
    }(AbstractObserver));
    function findValue(source, predicate, thisArg, yieldIndex) {
      var callback = bindCallback(predicate, thisArg, 3);
      return new AnonymousObservable(function(o) {
        return source.subscribe(new FindValueObserver(o, source, callback, yieldIndex));
      }, source);
    }
    observableProto.find = function(predicate, thisArg) {
      return findValue(this, predicate, thisArg, false);
    };
    observableProto.findIndex = function(predicate, thisArg) {
      return findValue(this, predicate, thisArg, true);
    };
    var ToSetObservable = (function(__super__) {
      inherits(ToSetObservable, __super__);
      function ToSetObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      ToSetObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new ToSetObserver(o));
      };
      return ToSetObservable;
    }(ObservableBase));
    var ToSetObserver = (function(__super__) {
      inherits(ToSetObserver, __super__);
      function ToSetObserver(o) {
        this._o = o;
        this._s = new root.Set();
        __super__.call(this);
      }
      ToSetObserver.prototype.next = function(x) {
        this._s.add(x);
      };
      ToSetObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      ToSetObserver.prototype.completed = function() {
        this._o.onNext(this._s);
        this._o.onCompleted();
      };
      return ToSetObserver;
    }(AbstractObserver));
    observableProto.toSet = function() {
      if (typeof root.Set === 'undefined') {
        throw new TypeError();
      }
      return new ToSetObservable(this);
    };
    var ToMapObservable = (function(__super__) {
      inherits(ToMapObservable, __super__);
      function ToMapObservable(source, k, e) {
        this.source = source;
        this._k = k;
        this._e = e;
        __super__.call(this);
      }
      ToMapObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new ToMapObserver(o, this._k, this._e));
      };
      return ToMapObservable;
    }(ObservableBase));
    var ToMapObserver = (function(__super__) {
      inherits(ToMapObserver, __super__);
      function ToMapObserver(o, k, e) {
        this._o = o;
        this._k = k;
        this._e = e;
        this._m = new root.Map();
        __super__.call(this);
      }
      ToMapObserver.prototype.next = function(x) {
        var key = tryCatch(this._k)(x);
        if (key === errorObj) {
          return this._o.onError(key.e);
        }
        var elem = x;
        if (this._e) {
          elem = tryCatch(this._e)(x);
          if (elem === errorObj) {
            return this._o.onError(elem.e);
          }
        }
        this._m.set(key, elem);
      };
      ToMapObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      ToMapObserver.prototype.completed = function() {
        this._o.onNext(this._m);
        this._o.onCompleted();
      };
      return ToMapObserver;
    }(AbstractObserver));
    observableProto.toMap = function(keySelector, elementSelector) {
      if (typeof root.Map === 'undefined') {
        throw new TypeError();
      }
      return new ToMapObservable(this, keySelector, elementSelector);
    };
    var SliceObservable = (function(__super__) {
      inherits(SliceObservable, __super__);
      function SliceObservable(source, b, e) {
        this.source = source;
        this._b = b;
        this._e = e;
        __super__.call(this);
      }
      SliceObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new SliceObserver(o, this._b, this._e));
      };
      return SliceObservable;
    }(ObservableBase));
    var SliceObserver = (function(__super__) {
      inherits(SliceObserver, __super__);
      function SliceObserver(o, b, e) {
        this._o = o;
        this._b = b;
        this._e = e;
        this._i = 0;
        __super__.call(this);
      }
      SliceObserver.prototype.next = function(x) {
        if (this._i >= this._b) {
          if (this._e === this._i) {
            this._o.onCompleted();
          } else {
            this._o.onNext(x);
          }
        }
        this._i++;
      };
      SliceObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SliceObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return SliceObserver;
    }(AbstractObserver));
    observableProto.slice = function(begin, end) {
      var start = begin || 0;
      if (start < 0) {
        throw new Rx.ArgumentOutOfRangeError();
      }
      if (typeof end === 'number' && end < start) {
        throw new Rx.ArgumentOutOfRangeError();
      }
      return new SliceObservable(this, start, end);
    };
    var LastIndexOfObservable = (function(__super__) {
      inherits(LastIndexOfObservable, __super__);
      function LastIndexOfObservable(source, e, n) {
        this.source = source;
        this._e = e;
        this._n = n;
        __super__.call(this);
      }
      LastIndexOfObservable.prototype.subscribeCore = function(o) {
        if (this._n < 0) {
          o.onNext(-1);
          o.onCompleted();
          return disposableEmpty;
        }
        return this.source.subscribe(new LastIndexOfObserver(o, this._e, this._n));
      };
      return LastIndexOfObservable;
    }(ObservableBase));
    var LastIndexOfObserver = (function(__super__) {
      inherits(LastIndexOfObserver, __super__);
      function LastIndexOfObserver(o, e, n) {
        this._o = o;
        this._e = e;
        this._n = n;
        this._v = 0;
        this._hv = false;
        this._i = 0;
        __super__.call(this);
      }
      LastIndexOfObserver.prototype.next = function(x) {
        if (this._i >= this._n && x === this._e) {
          this._hv = true;
          this._v = this._i;
        }
        this._i++;
      };
      LastIndexOfObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      LastIndexOfObserver.prototype.completed = function() {
        if (this._hv) {
          this._o.onNext(this._v);
        } else {
          this._o.onNext(-1);
        }
        this._o.onCompleted();
      };
      return LastIndexOfObserver;
    }(AbstractObserver));
    observableProto.lastIndexOf = function(searchElement, fromIndex) {
      var n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      return new LastIndexOfObservable(this, searchElement, n);
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.async.js", ["npm:rx@4.1.0/dist/rx.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(process) {
    ;
    (function(factory) {
      var objectTypes = {
        'function': true,
        'object': true
      };
      function checkGlobal(value) {
        return (value && value.Object === Object) ? value : null;
      }
      var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
      var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
      var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
      var freeSelf = checkGlobal(objectTypes[typeof self] && self);
      var freeWindow = checkGlobal(objectTypes[typeof window] && window);
      var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
      var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
      var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
      if (typeof define === 'function' && define.amd) {
        define(['./rx.binding', 'exports'], function(Rx, exports) {
          root.Rx = factory(root, exports, Rx);
          return root.Rx;
        });
      } else if (typeof module === 'object' && module && module.exports === freeExports) {
        module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
      } else {
        root.Rx = factory(root, {}, root.Rx);
      }
    }.call(this, function(root, exp, Rx, undefined) {
      var Observable = Rx.Observable,
          observableFromPromise = Observable.fromPromise,
          observableThrow = Observable.throwError,
          AnonymousObservable = Rx.AnonymousObservable,
          ObservableBase = Rx.ObservableBase,
          AsyncSubject = Rx.AsyncSubject,
          disposableCreate = Rx.Disposable.create,
          CompositeDisposable = Rx.CompositeDisposable,
          immediateScheduler = Rx.Scheduler.immediate,
          defaultScheduler = Rx.Scheduler['default'],
          inherits = Rx.internals.inherits,
          isScheduler = Rx.Scheduler.isScheduler,
          isPromise = Rx.helpers.isPromise,
          isFunction = Rx.helpers.isFunction,
          isIterable = Rx.helpers.isIterable,
          isArrayLike = Rx.helpers.isArrayLike;
      var errorObj = {e: {}};
      function tryCatcherGen(tryCatchTarget) {
        return function tryCatcher() {
          try {
            return tryCatchTarget.apply(this, arguments);
          } catch (e) {
            errorObj.e = e;
            return errorObj;
          }
        };
      }
      var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
        if (!isFunction(fn)) {
          throw new TypeError('fn must be a function');
        }
        return tryCatcherGen(fn);
      };
      function thrower(e) {
        throw e;
      }
      Observable.wrap = function(fn) {
        function createObservable() {
          return Observable.spawn.call(this, fn.apply(this, arguments));
        }
        createObservable.__generatorFunction__ = fn;
        return createObservable;
      };
      var spawn = Observable.spawn = function() {
        var gen = arguments[0],
            self = this,
            args = [];
        for (var i = 1,
            len = arguments.length; i < len; i++) {
          args.push(arguments[i]);
        }
        return new AnonymousObservable(function(o) {
          var g = new CompositeDisposable();
          if (isFunction(gen)) {
            gen = gen.apply(self, args);
          }
          if (!gen || !isFunction(gen.next)) {
            o.onNext(gen);
            return o.onCompleted();
          }
          function processGenerator(res) {
            var ret = tryCatch(gen.next).call(gen, res);
            if (ret === errorObj) {
              return o.onError(ret.e);
            }
            next(ret);
          }
          processGenerator();
          function onError(err) {
            var ret = tryCatch(gen.next).call(gen, err);
            if (ret === errorObj) {
              return o.onError(ret.e);
            }
            next(ret);
          }
          function next(ret) {
            if (ret.done) {
              o.onNext(ret.value);
              o.onCompleted();
              return;
            }
            var obs = toObservable.call(self, ret.value);
            var value = null;
            var hasValue = false;
            if (Observable.isObservable(obs)) {
              g.add(obs.subscribe(function(val) {
                hasValue = true;
                value = val;
              }, onError, function() {
                hasValue && processGenerator(value);
              }));
            } else {
              onError(new TypeError('type not supported'));
            }
          }
          return g;
        });
      };
      function toObservable(obj) {
        if (!obj) {
          return obj;
        }
        if (Observable.isObservable(obj)) {
          return obj;
        }
        if (isPromise(obj)) {
          return Observable.fromPromise(obj);
        }
        if (isGeneratorFunction(obj) || isGenerator(obj)) {
          return spawn.call(this, obj);
        }
        if (isFunction(obj)) {
          return thunkToObservable.call(this, obj);
        }
        if (isArrayLike(obj) || isIterable(obj)) {
          return arrayToObservable.call(this, obj);
        }
        if (isObject(obj)) {
          return objectToObservable.call(this, obj);
        }
        return obj;
      }
      function arrayToObservable(obj) {
        return Observable.from(obj).concatMap(function(o) {
          if (Observable.isObservable(o) || isObject(o)) {
            return toObservable.call(null, o);
          } else {
            return Rx.Observable.just(o);
          }
        }).toArray();
      }
      function objectToObservable(obj) {
        var results = new obj.constructor(),
            keys = Object.keys(obj),
            observables = [];
        for (var i = 0,
            len = keys.length; i < len; i++) {
          var key = keys[i];
          var observable = toObservable.call(this, obj[key]);
          if (observable && Observable.isObservable(observable)) {
            defer(observable, key);
          } else {
            results[key] = obj[key];
          }
        }
        return Observable.forkJoin.apply(Observable, observables).map(function() {
          return results;
        });
        function defer(observable, key) {
          results[key] = undefined;
          observables.push(observable.map(function(next) {
            results[key] = next;
          }));
        }
      }
      function thunkToObservable(fn) {
        var self = this;
        return new AnonymousObservable(function(o) {
          fn.call(self, function() {
            var err = arguments[0],
                res = arguments[1];
            if (err) {
              return o.onError(err);
            }
            if (arguments.length > 2) {
              var args = [];
              for (var i = 1,
                  len = arguments.length; i < len; i++) {
                args.push(arguments[i]);
              }
              res = args;
            }
            o.onNext(res);
            o.onCompleted();
          });
        });
      }
      function isGenerator(obj) {
        return isFunction(obj.next) && isFunction(obj['throw']);
      }
      function isGeneratorFunction(obj) {
        var ctor = obj.constructor;
        if (!ctor) {
          return false;
        }
        if (ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction') {
          return true;
        }
        return isGenerator(ctor.prototype);
      }
      function isObject(val) {
        return Object == val.constructor;
      }
      Observable.start = function(func, context, scheduler) {
        return observableToAsync(func, context, scheduler)();
      };
      var observableToAsync = Observable.toAsync = function(func, context, scheduler) {
        isScheduler(scheduler) || (scheduler = defaultScheduler);
        return function() {
          var args = arguments,
              subject = new AsyncSubject();
          scheduler.schedule(null, function() {
            var result;
            try {
              result = func.apply(context, args);
            } catch (e) {
              subject.onError(e);
              return;
            }
            subject.onNext(result);
            subject.onCompleted();
          });
          return subject.asObservable();
        };
      };
      function createCbObservable(fn, ctx, selector, args) {
        var o = new AsyncSubject();
        args.push(createCbHandler(o, ctx, selector));
        fn.apply(ctx, args);
        return o.asObservable();
      }
      function createCbHandler(o, ctx, selector) {
        return function handler() {
          var len = arguments.length,
              results = new Array(len);
          for (var i = 0; i < len; i++) {
            results[i] = arguments[i];
          }
          if (isFunction(selector)) {
            results = tryCatch(selector).apply(ctx, results);
            if (results === errorObj) {
              return o.onError(results.e);
            }
            o.onNext(results);
          } else {
            if (results.length <= 1) {
              o.onNext(results[0]);
            } else {
              o.onNext(results);
            }
          }
          o.onCompleted();
        };
      }
      Observable.fromCallback = function(fn, ctx, selector) {
        return function() {
          typeof ctx === 'undefined' && (ctx = this);
          var len = arguments.length,
              args = new Array(len);
          for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
          return createCbObservable(fn, ctx, selector, args);
        };
      };
      function createNodeObservable(fn, ctx, selector, args) {
        var o = new AsyncSubject();
        args.push(createNodeHandler(o, ctx, selector));
        fn.apply(ctx, args);
        return o.asObservable();
      }
      function createNodeHandler(o, ctx, selector) {
        return function handler() {
          var err = arguments[0];
          if (err) {
            return o.onError(err);
          }
          var len = arguments.length,
              results = [];
          for (var i = 1; i < len; i++) {
            results[i - 1] = arguments[i];
          }
          if (isFunction(selector)) {
            var results = tryCatch(selector).apply(ctx, results);
            if (results === errorObj) {
              return o.onError(results.e);
            }
            o.onNext(results);
          } else {
            if (results.length <= 1) {
              o.onNext(results[0]);
            } else {
              o.onNext(results);
            }
          }
          o.onCompleted();
        };
      }
      Observable.fromNodeCallback = function(fn, ctx, selector) {
        return function() {
          typeof ctx === 'undefined' && (ctx = this);
          var len = arguments.length,
              args = new Array(len);
          for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
          return createNodeObservable(fn, ctx, selector, args);
        };
      };
      function isNodeList(el) {
        if (root.StaticNodeList) {
          return el instanceof root.StaticNodeList || el instanceof root.NodeList;
        } else {
          return Object.prototype.toString.call(el) === '[object NodeList]';
        }
      }
      function ListenDisposable(e, n, fn) {
        this._e = e;
        this._n = n;
        this._fn = fn;
        this._e.addEventListener(this._n, this._fn, false);
        this.isDisposed = false;
      }
      ListenDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this._e.removeEventListener(this._n, this._fn, false);
          this.isDisposed = true;
        }
      };
      function createEventListener(el, eventName, handler) {
        var disposables = new CompositeDisposable();
        var elemToString = Object.prototype.toString.call(el);
        if (isNodeList(el) || elemToString === '[object HTMLCollection]') {
          for (var i = 0,
              len = el.length; i < len; i++) {
            disposables.add(createEventListener(el.item(i), eventName, handler));
          }
        } else if (el) {
          disposables.add(new ListenDisposable(el, eventName, handler));
        }
        return disposables;
      }
      Rx.config.useNativeEvents = false;
      var EventObservable = (function(__super__) {
        inherits(EventObservable, __super__);
        function EventObservable(el, name, fn) {
          this._el = el;
          this._n = name;
          this._fn = fn;
          __super__.call(this);
        }
        function createHandler(o, fn) {
          return function handler() {
            var results = arguments[0];
            if (isFunction(fn)) {
              results = tryCatch(fn).apply(null, arguments);
              if (results === errorObj) {
                return o.onError(results.e);
              }
            }
            o.onNext(results);
          };
        }
        EventObservable.prototype.subscribeCore = function(o) {
          return createEventListener(this._el, this._n, createHandler(o, this._fn));
        };
        return EventObservable;
      }(ObservableBase));
      Observable.fromEvent = function(element, eventName, selector) {
        if (element.addListener) {
          return fromEventPattern(function(h) {
            element.addListener(eventName, h);
          }, function(h) {
            element.removeListener(eventName, h);
          }, selector);
        }
        if (!Rx.config.useNativeEvents) {
          if (typeof element.on === 'function' && typeof element.off === 'function') {
            return fromEventPattern(function(h) {
              element.on(eventName, h);
            }, function(h) {
              element.off(eventName, h);
            }, selector);
          }
        }
        return new EventObservable(element, eventName, selector).publish().refCount();
      };
      var EventPatternObservable = (function(__super__) {
        inherits(EventPatternObservable, __super__);
        function EventPatternObservable(add, del, fn) {
          this._add = add;
          this._del = del;
          this._fn = fn;
          __super__.call(this);
        }
        function createHandler(o, fn) {
          return function handler() {
            var results = arguments[0];
            if (isFunction(fn)) {
              results = tryCatch(fn).apply(null, arguments);
              if (results === errorObj) {
                return o.onError(results.e);
              }
            }
            o.onNext(results);
          };
        }
        EventPatternObservable.prototype.subscribeCore = function(o) {
          var fn = createHandler(o, this._fn);
          var returnValue = this._add(fn);
          return new EventPatternDisposable(this._del, fn, returnValue);
        };
        function EventPatternDisposable(del, fn, ret) {
          this._del = del;
          this._fn = fn;
          this._ret = ret;
          this.isDisposed = false;
        }
        EventPatternDisposable.prototype.dispose = function() {
          if (!this.isDisposed) {
            isFunction(this._del) && this._del(this._fn, this._ret);
            this.isDisposed = true;
          }
        };
        return EventPatternObservable;
      }(ObservableBase));
      var fromEventPattern = Observable.fromEventPattern = function(addHandler, removeHandler, selector) {
        return new EventPatternObservable(addHandler, removeHandler, selector).publish().refCount();
      };
      Observable.startAsync = function(functionAsync) {
        var promise = tryCatch(functionAsync)();
        if (promise === errorObj) {
          return observableThrow(promise.e);
        }
        return observableFromPromise(promise);
      };
      return Rx;
    }));
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.backpressure.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        AnonymousObservable = Rx.AnonymousObservable,
        AbstractObserver = Rx.internals.AbstractObserver,
        CompositeDisposable = Rx.CompositeDisposable,
        BinaryDisposable = Rx.BinaryDisposable,
        NAryDisposable = Rx.NAryDisposable,
        Notification = Rx.Notification,
        Subject = Rx.Subject,
        Observer = Rx.Observer,
        disposableEmpty = Rx.Disposable.empty,
        disposableCreate = Rx.Disposable.create,
        inherits = Rx.internals.inherits,
        addProperties = Rx.internals.addProperties,
        defaultScheduler = Rx.Scheduler['default'],
        currentThreadScheduler = Rx.Scheduler.currentThread,
        identity = Rx.helpers.identity,
        isScheduler = Rx.Scheduler.isScheduler,
        isFunction = Rx.helpers.isFunction,
        checkDisposed = Rx.Disposable.checkDisposed;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    Rx.Pauser = (function(__super__) {
      inherits(Pauser, __super__);
      function Pauser() {
        __super__.call(this);
      }
      Pauser.prototype.pause = function() {
        this.onNext(false);
      };
      Pauser.prototype.resume = function() {
        this.onNext(true);
      };
      return Pauser;
    }(Subject));
    var PausableObservable = (function(__super__) {
      inherits(PausableObservable, __super__);
      function PausableObservable(source, pauser) {
        this.source = source;
        this.controller = new Subject();
        this.paused = true;
        if (pauser && pauser.subscribe) {
          this.pauser = this.controller.merge(pauser);
        } else {
          this.pauser = this.controller;
        }
        __super__.call(this);
      }
      PausableObservable.prototype._subscribe = function(o) {
        var conn = this.source.publish(),
            subscription = conn.subscribe(o),
            connection = disposableEmpty;
        var pausable = this.pauser.startWith(!this.paused).distinctUntilChanged().subscribe(function(b) {
          if (b) {
            connection = conn.connect();
          } else {
            connection.dispose();
            connection = disposableEmpty;
          }
        });
        return new NAryDisposable([subscription, connection, pausable]);
      };
      PausableObservable.prototype.pause = function() {
        this.paused = true;
        this.controller.onNext(false);
      };
      PausableObservable.prototype.resume = function() {
        this.paused = false;
        this.controller.onNext(true);
      };
      return PausableObservable;
    }(Observable));
    observableProto.pausable = function(pauser) {
      return new PausableObservable(this, pauser);
    };
    function combineLatestSource(source, subject, resultSelector) {
      return new AnonymousObservable(function(o) {
        var hasValue = [false, false],
            hasValueAll = false,
            isDone = false,
            values = new Array(2),
            err;
        function next(x, i) {
          values[i] = x;
          hasValue[i] = true;
          if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
            if (err) {
              return o.onError(err);
            }
            var res = tryCatch(resultSelector).apply(null, values);
            if (res === errorObj) {
              return o.onError(res.e);
            }
            o.onNext(res);
          }
          isDone && values[1] && o.onCompleted();
        }
        return new BinaryDisposable(source.subscribe(function(x) {
          next(x, 0);
        }, function(e) {
          if (values[1]) {
            o.onError(e);
          } else {
            err = e;
          }
        }, function() {
          isDone = true;
          values[1] && o.onCompleted();
        }), subject.subscribe(function(x) {
          next(x, 1);
        }, function(e) {
          o.onError(e);
        }, function() {
          isDone = true;
          next(true, 1);
        }));
      }, source);
    }
    var PausableBufferedObservable = (function(__super__) {
      inherits(PausableBufferedObservable, __super__);
      function PausableBufferedObservable(source, pauser) {
        this.source = source;
        this.controller = new Subject();
        this.paused = true;
        if (pauser && pauser.subscribe) {
          this.pauser = this.controller.merge(pauser);
        } else {
          this.pauser = this.controller;
        }
        __super__.call(this);
      }
      PausableBufferedObservable.prototype._subscribe = function(o) {
        var q = [],
            previousShouldFire;
        function drainQueue() {
          while (q.length > 0) {
            o.onNext(q.shift());
          }
        }
        var subscription = combineLatestSource(this.source, this.pauser.startWith(!this.paused).distinctUntilChanged(), function(data, shouldFire) {
          return {
            data: data,
            shouldFire: shouldFire
          };
        }).subscribe(function(results) {
          if (previousShouldFire !== undefined && results.shouldFire !== previousShouldFire) {
            previousShouldFire = results.shouldFire;
            if (results.shouldFire) {
              drainQueue();
            }
          } else {
            previousShouldFire = results.shouldFire;
            if (results.shouldFire) {
              o.onNext(results.data);
            } else {
              q.push(results.data);
            }
          }
        }, function(err) {
          drainQueue();
          o.onError(err);
        }, function() {
          drainQueue();
          o.onCompleted();
        });
        return subscription;
      };
      PausableBufferedObservable.prototype.pause = function() {
        this.paused = true;
        this.controller.onNext(false);
      };
      PausableBufferedObservable.prototype.resume = function() {
        this.paused = false;
        this.controller.onNext(true);
      };
      return PausableBufferedObservable;
    }(Observable));
    observableProto.pausableBuffered = function(pauser) {
      return new PausableBufferedObservable(this, pauser);
    };
    var ControlledObservable = (function(__super__) {
      inherits(ControlledObservable, __super__);
      function ControlledObservable(source, enableQueue, scheduler) {
        __super__.call(this);
        this.subject = new ControlledSubject(enableQueue, scheduler);
        this.source = source.multicast(this.subject).refCount();
      }
      ControlledObservable.prototype._subscribe = function(o) {
        return this.source.subscribe(o);
      };
      ControlledObservable.prototype.request = function(numberOfItems) {
        return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
      };
      return ControlledObservable;
    }(Observable));
    var ControlledSubject = (function(__super__) {
      inherits(ControlledSubject, __super__);
      function ControlledSubject(enableQueue, scheduler) {
        enableQueue == null && (enableQueue = true);
        __super__.call(this);
        this.subject = new Subject();
        this.enableQueue = enableQueue;
        this.queue = enableQueue ? [] : null;
        this.requestedCount = 0;
        this.requestedDisposable = null;
        this.error = null;
        this.hasFailed = false;
        this.hasCompleted = false;
        this.scheduler = scheduler || currentThreadScheduler;
      }
      addProperties(ControlledSubject.prototype, Observer, {
        _subscribe: function(o) {
          return this.subject.subscribe(o);
        },
        onCompleted: function() {
          this.hasCompleted = true;
          if (!this.enableQueue || this.queue.length === 0) {
            this.subject.onCompleted();
            this.disposeCurrentRequest();
          } else {
            this.queue.push(Notification.createOnCompleted());
          }
        },
        onError: function(error) {
          this.hasFailed = true;
          this.error = error;
          if (!this.enableQueue || this.queue.length === 0) {
            this.subject.onError(error);
            this.disposeCurrentRequest();
          } else {
            this.queue.push(Notification.createOnError(error));
          }
        },
        onNext: function(value) {
          if (this.requestedCount <= 0) {
            this.enableQueue && this.queue.push(Notification.createOnNext(value));
          } else {
            (this.requestedCount-- === 0) && this.disposeCurrentRequest();
            this.subject.onNext(value);
          }
        },
        _processRequest: function(numberOfItems) {
          if (this.enableQueue) {
            while (this.queue.length > 0 && (numberOfItems > 0 || this.queue[0].kind !== 'N')) {
              var first = this.queue.shift();
              first.accept(this.subject);
              if (first.kind === 'N') {
                numberOfItems--;
              } else {
                this.disposeCurrentRequest();
                this.queue = [];
              }
            }
          }
          return numberOfItems;
        },
        request: function(number) {
          this.disposeCurrentRequest();
          var self = this;
          this.requestedDisposable = this.scheduler.schedule(number, function(s, i) {
            var remaining = self._processRequest(i);
            var stopped = self.hasCompleted || self.hasFailed;
            if (!stopped && remaining > 0) {
              self.requestedCount = remaining;
              return disposableCreate(function() {
                self.requestedCount = 0;
              });
            }
          });
          return this.requestedDisposable;
        },
        disposeCurrentRequest: function() {
          if (this.requestedDisposable) {
            this.requestedDisposable.dispose();
            this.requestedDisposable = null;
          }
        }
      });
      return ControlledSubject;
    }(Observable));
    observableProto.controlled = function(enableQueue, scheduler) {
      if (enableQueue && isScheduler(enableQueue)) {
        scheduler = enableQueue;
        enableQueue = true;
      }
      if (enableQueue == null) {
        enableQueue = true;
      }
      return new ControlledObservable(this, enableQueue, scheduler);
    };
    var StopAndWaitObservable = (function(__super__) {
      inherits(StopAndWaitObservable, __super__);
      function StopAndWaitObservable(source) {
        __super__.call(this);
        this.source = source;
      }
      function scheduleMethod(s, self) {
        return self.source.request(1);
      }
      StopAndWaitObservable.prototype._subscribe = function(o) {
        this.subscription = this.source.subscribe(new StopAndWaitObserver(o, this, this.subscription));
        return new BinaryDisposable(this.subscription, defaultScheduler.schedule(this, scheduleMethod));
      };
      var StopAndWaitObserver = (function(__sub__) {
        inherits(StopAndWaitObserver, __sub__);
        function StopAndWaitObserver(observer, observable, cancel) {
          __sub__.call(this);
          this.observer = observer;
          this.observable = observable;
          this.cancel = cancel;
          this.scheduleDisposable = null;
        }
        StopAndWaitObserver.prototype.completed = function() {
          this.observer.onCompleted();
          this.dispose();
        };
        StopAndWaitObserver.prototype.error = function(error) {
          this.observer.onError(error);
          this.dispose();
        };
        function innerScheduleMethod(s, self) {
          return self.observable.source.request(1);
        }
        StopAndWaitObserver.prototype.next = function(value) {
          this.observer.onNext(value);
          this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod);
        };
        StopAndWaitObserver.dispose = function() {
          this.observer = null;
          if (this.cancel) {
            this.cancel.dispose();
            this.cancel = null;
          }
          if (this.scheduleDisposable) {
            this.scheduleDisposable.dispose();
            this.scheduleDisposable = null;
          }
          __sub__.prototype.dispose.call(this);
        };
        return StopAndWaitObserver;
      }(AbstractObserver));
      return StopAndWaitObservable;
    }(Observable));
    ControlledObservable.prototype.stopAndWait = function() {
      return new StopAndWaitObservable(this);
    };
    var WindowedObservable = (function(__super__) {
      inherits(WindowedObservable, __super__);
      function WindowedObservable(source, windowSize) {
        __super__.call(this);
        this.source = source;
        this.windowSize = windowSize;
      }
      function scheduleMethod(s, self) {
        return self.source.request(self.windowSize);
      }
      WindowedObservable.prototype._subscribe = function(o) {
        this.subscription = this.source.subscribe(new WindowedObserver(o, this, this.subscription));
        return new BinaryDisposable(this.subscription, defaultScheduler.schedule(this, scheduleMethod));
      };
      var WindowedObserver = (function(__sub__) {
        inherits(WindowedObserver, __sub__);
        function WindowedObserver(observer, observable, cancel) {
          this.observer = observer;
          this.observable = observable;
          this.cancel = cancel;
          this.received = 0;
          this.scheduleDisposable = null;
          __sub__.call(this);
        }
        WindowedObserver.prototype.completed = function() {
          this.observer.onCompleted();
          this.dispose();
        };
        WindowedObserver.prototype.error = function(error) {
          this.observer.onError(error);
          this.dispose();
        };
        function innerScheduleMethod(s, self) {
          return self.observable.source.request(self.observable.windowSize);
        }
        WindowedObserver.prototype.next = function(value) {
          this.observer.onNext(value);
          this.received = ++this.received % this.observable.windowSize;
          this.received === 0 && (this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod));
        };
        WindowedObserver.prototype.dispose = function() {
          this.observer = null;
          if (this.cancel) {
            this.cancel.dispose();
            this.cancel = null;
          }
          if (this.scheduleDisposable) {
            this.scheduleDisposable.dispose();
            this.scheduleDisposable = null;
          }
          __sub__.prototype.dispose.call(this);
        };
        return WindowedObserver;
      }(AbstractObserver));
      return WindowedObservable;
    }(Observable));
    ControlledObservable.prototype.windowed = function(windowSize) {
      return new WindowedObservable(this, windowSize);
    };
    observableProto.pipe = function(dest) {
      var source = this.pausableBuffered();
      function onDrain() {
        source.resume();
      }
      dest.addListener('drain', onDrain);
      source.subscribe(function(x) {
        !dest.write(x) && source.pause();
      }, function(err) {
        dest.emit('error', err);
      }, function() {
        !dest._isStdio && dest.end();
        dest.removeListener('drain', onDrain);
      });
      source.resume();
      return dest;
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.binding.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        AnonymousObservable = Rx.AnonymousObservable,
        ObservableBase = Rx.ObservableBase,
        Subject = Rx.Subject,
        AsyncSubject = Rx.AsyncSubject,
        Observer = Rx.Observer,
        ScheduledObserver = Rx.internals.ScheduledObserver,
        disposableCreate = Rx.Disposable.create,
        disposableEmpty = Rx.Disposable.empty,
        BinaryDisposable = Rx.BinaryDisposable,
        currentThreadScheduler = Rx.Scheduler.currentThread,
        isFunction = Rx.helpers.isFunction,
        inherits = Rx.internals.inherits,
        addProperties = Rx.internals.addProperties,
        checkDisposed = Rx.Disposable.checkDisposed;
    function cloneArray(arr) {
      var len = arr.length,
          a = new Array(len);
      for (var i = 0; i < len; i++) {
        a[i] = arr[i];
      }
      return a;
    }
    var MulticastObservable = (function(__super__) {
      inherits(MulticastObservable, __super__);
      function MulticastObservable(source, fn1, fn2) {
        this.source = source;
        this._fn1 = fn1;
        this._fn2 = fn2;
        __super__.call(this);
      }
      MulticastObservable.prototype.subscribeCore = function(o) {
        var connectable = this.source.multicast(this._fn1());
        return new BinaryDisposable(this._fn2(connectable).subscribe(o), connectable.connect());
      };
      return MulticastObservable;
    }(ObservableBase));
    observableProto.multicast = function(subjectOrSubjectSelector, selector) {
      return isFunction(subjectOrSubjectSelector) ? new MulticastObservable(this, subjectOrSubjectSelector, selector) : new ConnectableObservable(this, subjectOrSubjectSelector);
    };
    observableProto.publish = function(selector) {
      return selector && isFunction(selector) ? this.multicast(function() {
        return new Subject();
      }, selector) : this.multicast(new Subject());
    };
    observableProto.share = function() {
      return this.publish().refCount();
    };
    observableProto.publishLast = function(selector) {
      return selector && isFunction(selector) ? this.multicast(function() {
        return new AsyncSubject();
      }, selector) : this.multicast(new AsyncSubject());
    };
    observableProto.publishValue = function(initialValueOrSelector, initialValue) {
      return arguments.length === 2 ? this.multicast(function() {
        return new BehaviorSubject(initialValue);
      }, initialValueOrSelector) : this.multicast(new BehaviorSubject(initialValueOrSelector));
    };
    observableProto.shareValue = function(initialValue) {
      return this.publishValue(initialValue).refCount();
    };
    observableProto.replay = function(selector, bufferSize, windowSize, scheduler) {
      return selector && isFunction(selector) ? this.multicast(function() {
        return new ReplaySubject(bufferSize, windowSize, scheduler);
      }, selector) : this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
    };
    observableProto.shareReplay = function(bufferSize, windowSize, scheduler) {
      return this.replay(null, bufferSize, windowSize, scheduler).refCount();
    };
    var InnerSubscription = function(s, o) {
      this._s = s;
      this._o = o;
    };
    InnerSubscription.prototype.dispose = function() {
      if (!this._s.isDisposed && this._o !== null) {
        var idx = this._s.observers.indexOf(this._o);
        this._s.observers.splice(idx, 1);
        this._o = null;
      }
    };
    var BehaviorSubject = Rx.BehaviorSubject = (function(__super__) {
      inherits(BehaviorSubject, __super__);
      function BehaviorSubject(value) {
        __super__.call(this);
        this.value = value;
        this.observers = [];
        this.isDisposed = false;
        this.isStopped = false;
        this.hasError = false;
      }
      addProperties(BehaviorSubject.prototype, Observer.prototype, {
        _subscribe: function(o) {
          checkDisposed(this);
          if (!this.isStopped) {
            this.observers.push(o);
            o.onNext(this.value);
            return new InnerSubscription(this, o);
          }
          if (this.hasError) {
            o.onError(this.error);
          } else {
            o.onCompleted();
          }
          return disposableEmpty;
        },
        getValue: function() {
          checkDisposed(this);
          if (this.hasError) {
            thrower(this.error);
          }
          return this.value;
        },
        hasObservers: function() {
          checkDisposed(this);
          return this.observers.length > 0;
        },
        onCompleted: function() {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          this.isStopped = true;
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            os[i].onCompleted();
          }
          this.observers.length = 0;
        },
        onError: function(error) {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          this.isStopped = true;
          this.hasError = true;
          this.error = error;
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            os[i].onError(error);
          }
          this.observers.length = 0;
        },
        onNext: function(value) {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          this.value = value;
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            os[i].onNext(value);
          }
        },
        dispose: function() {
          this.isDisposed = true;
          this.observers = null;
          this.value = null;
          this.error = null;
        }
      });
      return BehaviorSubject;
    }(Observable));
    var ReplaySubject = Rx.ReplaySubject = (function(__super__) {
      var maxSafeInteger = Math.pow(2, 53) - 1;
      function createRemovableDisposable(subject, observer) {
        return disposableCreate(function() {
          observer.dispose();
          !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
        });
      }
      inherits(ReplaySubject, __super__);
      function ReplaySubject(bufferSize, windowSize, scheduler) {
        this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
        this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
        this.scheduler = scheduler || currentThreadScheduler;
        this.q = [];
        this.observers = [];
        this.isStopped = false;
        this.isDisposed = false;
        this.hasError = false;
        this.error = null;
        __super__.call(this);
      }
      addProperties(ReplaySubject.prototype, Observer.prototype, {
        _subscribe: function(o) {
          checkDisposed(this);
          var so = new ScheduledObserver(this.scheduler, o),
              subscription = createRemovableDisposable(this, so);
          this._trim(this.scheduler.now());
          this.observers.push(so);
          for (var i = 0,
              len = this.q.length; i < len; i++) {
            so.onNext(this.q[i].value);
          }
          if (this.hasError) {
            so.onError(this.error);
          } else if (this.isStopped) {
            so.onCompleted();
          }
          so.ensureActive();
          return subscription;
        },
        hasObservers: function() {
          checkDisposed(this);
          return this.observers.length > 0;
        },
        _trim: function(now) {
          while (this.q.length > this.bufferSize) {
            this.q.shift();
          }
          while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
            this.q.shift();
          }
        },
        onNext: function(value) {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          var now = this.scheduler.now();
          this.q.push({
            interval: now,
            value: value
          });
          this._trim(now);
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            var observer = os[i];
            observer.onNext(value);
            observer.ensureActive();
          }
        },
        onError: function(error) {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          this.isStopped = true;
          this.error = error;
          this.hasError = true;
          var now = this.scheduler.now();
          this._trim(now);
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            var observer = os[i];
            observer.onError(error);
            observer.ensureActive();
          }
          this.observers.length = 0;
        },
        onCompleted: function() {
          checkDisposed(this);
          if (this.isStopped) {
            return;
          }
          this.isStopped = true;
          var now = this.scheduler.now();
          this._trim(now);
          for (var i = 0,
              os = cloneArray(this.observers),
              len = os.length; i < len; i++) {
            var observer = os[i];
            observer.onCompleted();
            observer.ensureActive();
          }
          this.observers.length = 0;
        },
        dispose: function() {
          this.isDisposed = true;
          this.observers = null;
        }
      });
      return ReplaySubject;
    }(Observable));
    var RefCountObservable = (function(__super__) {
      inherits(RefCountObservable, __super__);
      function RefCountObservable(source) {
        this.source = source;
        this._count = 0;
        this._connectableSubscription = null;
        __super__.call(this);
      }
      RefCountObservable.prototype.subscribeCore = function(o) {
        var subscription = this.source.subscribe(o);
        ++this._count === 1 && (this._connectableSubscription = this.source.connect());
        return new RefCountDisposable(this, subscription);
      };
      function RefCountDisposable(p, s) {
        this._p = p;
        this._s = s;
        this.isDisposed = false;
      }
      RefCountDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          this._s.dispose();
          --this._p._count === 0 && this._p._connectableSubscription.dispose();
        }
      };
      return RefCountObservable;
    }(ObservableBase));
    var ConnectableObservable = Rx.ConnectableObservable = (function(__super__) {
      inherits(ConnectableObservable, __super__);
      function ConnectableObservable(source, subject) {
        this.source = source;
        this._connection = null;
        this._source = source.asObservable();
        this._subject = subject;
        __super__.call(this);
      }
      function ConnectDisposable(parent, subscription) {
        this._p = parent;
        this._s = subscription;
      }
      ConnectDisposable.prototype.dispose = function() {
        if (this._s) {
          this._s.dispose();
          this._s = null;
          this._p._connection = null;
        }
      };
      ConnectableObservable.prototype.connect = function() {
        if (!this._connection) {
          if (this._subject.isStopped) {
            return disposableEmpty;
          }
          var subscription = this._source.subscribe(this._subject);
          this._connection = new ConnectDisposable(this, subscription);
        }
        return this._connection;
      };
      ConnectableObservable.prototype._subscribe = function(o) {
        return this._subject.subscribe(o);
      };
      ConnectableObservable.prototype.refCount = function() {
        return new RefCountObservable(this);
      };
      return ConnectableObservable;
    }(Observable));
    observableProto.singleInstance = function() {
      var source = this,
          hasObservable = false,
          observable;
      function getObservable() {
        if (!hasObservable) {
          hasObservable = true;
          observable = source['finally'](function() {
            hasObservable = false;
          }).publish().refCount();
        }
        return observable;
      }
      return new AnonymousObservable(function(o) {
        return getObservable().subscribe(o);
      });
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.coincidence.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        ObservableBase = Rx.ObservableBase,
        AbstractObserver = Rx.internals.AbstractObserver,
        CompositeDisposable = Rx.CompositeDisposable,
        BinaryDisposable = Rx.BinaryDisposable,
        RefCountDisposable = Rx.RefCountDisposable,
        SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
        SerialDisposable = Rx.SerialDisposable,
        Subject = Rx.Subject,
        observableProto = Observable.prototype,
        observableEmpty = Observable.empty,
        observableNever = Observable.never,
        AnonymousObservable = Rx.AnonymousObservable,
        addRef = Rx.internals.addRef,
        inherits = Rx.internals.inherits,
        bindCallback = Rx.internals.bindCallback,
        noop = Rx.helpers.noop,
        isPromise = Rx.helpers.isPromise,
        isFunction = Rx.helpers.isFunction,
        observableFromPromise = Observable.fromPromise;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    var Map = root.Map || (function() {
      function Map() {
        this.size = 0;
        this._values = [];
        this._keys = [];
      }
      Map.prototype['delete'] = function(key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
      };
      Map.prototype.get = function(key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
      };
      Map.prototype.set = function(key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          this._keys.push(key);
          this._values.push(value);
          this.size++;
        } else {
          this._values[i] = value;
        }
        return this;
      };
      Map.prototype.forEach = function(cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
          cb.call(thisArg, this._values[i], this._keys[i]);
        }
      };
      return Map;
    }());
    observableProto.join = function(right, leftDurationSelector, rightDurationSelector, resultSelector) {
      var left = this;
      return new AnonymousObservable(function(o) {
        var group = new CompositeDisposable();
        var leftDone = false,
            rightDone = false;
        var leftId = 0,
            rightId = 0;
        var leftMap = new Map(),
            rightMap = new Map();
        var handleError = function(e) {
          o.onError(e);
        };
        group.add(left.subscribe(function(value) {
          var id = leftId++,
              md = new SingleAssignmentDisposable();
          leftMap.set(id, value);
          group.add(md);
          var duration = tryCatch(leftDurationSelector)(value);
          if (duration === errorObj) {
            return o.onError(duration.e);
          }
          md.setDisposable(duration.take(1).subscribe(noop, handleError, function() {
            leftMap['delete'](id) && leftMap.size === 0 && leftDone && o.onCompleted();
            group.remove(md);
          }));
          rightMap.forEach(function(v) {
            var result = tryCatch(resultSelector)(value, v);
            if (result === errorObj) {
              return o.onError(result.e);
            }
            o.onNext(result);
          });
        }, handleError, function() {
          leftDone = true;
          (rightDone || leftMap.size === 0) && o.onCompleted();
        }));
        group.add(right.subscribe(function(value) {
          var id = rightId++,
              md = new SingleAssignmentDisposable();
          rightMap.set(id, value);
          group.add(md);
          var duration = tryCatch(rightDurationSelector)(value);
          if (duration === errorObj) {
            return o.onError(duration.e);
          }
          md.setDisposable(duration.take(1).subscribe(noop, handleError, function() {
            rightMap['delete'](id) && rightMap.size === 0 && rightDone && o.onCompleted();
            group.remove(md);
          }));
          leftMap.forEach(function(v) {
            var result = tryCatch(resultSelector)(v, value);
            if (result === errorObj) {
              return o.onError(result.e);
            }
            o.onNext(result);
          });
        }, handleError, function() {
          rightDone = true;
          (leftDone || rightMap.size === 0) && o.onCompleted();
        }));
        return group;
      }, left);
    };
    observableProto.groupJoin = function(right, leftDurationSelector, rightDurationSelector, resultSelector) {
      var left = this;
      return new AnonymousObservable(function(o) {
        var group = new CompositeDisposable();
        var r = new RefCountDisposable(group);
        var leftMap = new Map(),
            rightMap = new Map();
        var leftId = 0,
            rightId = 0;
        var handleError = function(e) {
          return function(v) {
            v.onError(e);
          };
        };
        function handleError(e) {}
        ;
        group.add(left.subscribe(function(value) {
          var s = new Subject();
          var id = leftId++;
          leftMap.set(id, s);
          var result = tryCatch(resultSelector)(value, addRef(s, r));
          if (result === errorObj) {
            leftMap.forEach(handleError(result.e));
            return o.onError(result.e);
          }
          o.onNext(result);
          rightMap.forEach(function(v) {
            s.onNext(v);
          });
          var md = new SingleAssignmentDisposable();
          group.add(md);
          var duration = tryCatch(leftDurationSelector)(value);
          if (duration === errorObj) {
            leftMap.forEach(handleError(duration.e));
            return o.onError(duration.e);
          }
          md.setDisposable(duration.take(1).subscribe(noop, function(e) {
            leftMap.forEach(handleError(e));
            o.onError(e);
          }, function() {
            leftMap['delete'](id) && s.onCompleted();
            group.remove(md);
          }));
        }, function(e) {
          leftMap.forEach(handleError(e));
          o.onError(e);
        }, function() {
          o.onCompleted();
        }));
        group.add(right.subscribe(function(value) {
          var id = rightId++;
          rightMap.set(id, value);
          var md = new SingleAssignmentDisposable();
          group.add(md);
          var duration = tryCatch(rightDurationSelector)(value);
          if (duration === errorObj) {
            leftMap.forEach(handleError(duration.e));
            return o.onError(duration.e);
          }
          md.setDisposable(duration.take(1).subscribe(noop, function(e) {
            leftMap.forEach(handleError(e));
            o.onError(e);
          }, function() {
            rightMap['delete'](id);
            group.remove(md);
          }));
          leftMap.forEach(function(v) {
            v.onNext(value);
          });
        }, function(e) {
          leftMap.forEach(handleError(e));
          o.onError(e);
        }));
        return r;
      }, left);
    };
    function toArray(x) {
      return x.toArray();
    }
    observableProto.buffer = function() {
      return this.window.apply(this, arguments).flatMap(toArray);
    };
    observableProto.window = function(windowOpeningsOrClosingSelector, windowClosingSelector) {
      if (arguments.length === 1 && typeof arguments[0] !== 'function') {
        return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
      }
      return typeof windowOpeningsOrClosingSelector === 'function' ? observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) : observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
    };
    function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
      return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function(_, win) {
        return win;
      });
    }
    function observableWindowWithBoundaries(windowBoundaries) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var win = new Subject(),
            d = new CompositeDisposable(),
            r = new RefCountDisposable(d);
        observer.onNext(addRef(win, r));
        d.add(source.subscribe(function(x) {
          win.onNext(x);
        }, function(err) {
          win.onError(err);
          observer.onError(err);
        }, function() {
          win.onCompleted();
          observer.onCompleted();
        }));
        isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));
        d.add(windowBoundaries.subscribe(function(w) {
          win.onCompleted();
          win = new Subject();
          observer.onNext(addRef(win, r));
        }, function(err) {
          win.onError(err);
          observer.onError(err);
        }, function() {
          win.onCompleted();
          observer.onCompleted();
        }));
        return r;
      }, source);
    }
    function observableWindowWithClosingSelector(windowClosingSelector) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var m = new SerialDisposable(),
            d = new CompositeDisposable(m),
            r = new RefCountDisposable(d),
            win = new Subject();
        observer.onNext(addRef(win, r));
        d.add(source.subscribe(function(x) {
          win.onNext(x);
        }, function(err) {
          win.onError(err);
          observer.onError(err);
        }, function() {
          win.onCompleted();
          observer.onCompleted();
        }));
        function createWindowClose() {
          var windowClose;
          try {
            windowClose = windowClosingSelector();
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));
          var m1 = new SingleAssignmentDisposable();
          m.setDisposable(m1);
          m1.setDisposable(windowClose.take(1).subscribe(noop, function(err) {
            win.onError(err);
            observer.onError(err);
          }, function() {
            win.onCompleted();
            win = new Subject();
            observer.onNext(addRef(win, r));
            createWindowClose();
          }));
        }
        createWindowClose();
        return r;
      }, source);
    }
    var PairwiseObservable = (function(__super__) {
      inherits(PairwiseObservable, __super__);
      function PairwiseObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      PairwiseObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new PairwiseObserver(o));
      };
      return PairwiseObservable;
    }(ObservableBase));
    var PairwiseObserver = (function(__super__) {
      inherits(PairwiseObserver, __super__);
      function PairwiseObserver(o) {
        this._o = o;
        this._p = null;
        this._hp = false;
        __super__.call(this);
      }
      PairwiseObserver.prototype.next = function(x) {
        if (this._hp) {
          this._o.onNext([this._p, x]);
        } else {
          this._hp = true;
        }
        this._p = x;
      };
      PairwiseObserver.prototype.error = function(err) {
        this._o.onError(err);
      };
      PairwiseObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return PairwiseObserver;
    }(AbstractObserver));
    observableProto.pairwise = function() {
      return new PairwiseObservable(this);
    };
    observableProto.partition = function(predicate, thisArg) {
      var fn = bindCallback(predicate, thisArg, 3);
      return [this.filter(predicate, thisArg), this.filter(function(x, i, o) {
        return !fn(x, i, o);
      })];
    };
    observableProto.groupBy = function(keySelector, elementSelector) {
      return this.groupByUntil(keySelector, elementSelector, observableNever);
    };
    observableProto.groupByUntil = function(keySelector, elementSelector, durationSelector) {
      var source = this;
      return new AnonymousObservable(function(o) {
        var map = new Map(),
            groupDisposable = new CompositeDisposable(),
            refCountDisposable = new RefCountDisposable(groupDisposable),
            handleError = function(e) {
              return function(item) {
                item.onError(e);
              };
            };
        groupDisposable.add(source.subscribe(function(x) {
          var key = tryCatch(keySelector)(x);
          if (key === errorObj) {
            map.forEach(handleError(key.e));
            return o.onError(key.e);
          }
          var fireNewMapEntry = false,
              writer = map.get(key);
          if (writer === undefined) {
            writer = new Subject();
            map.set(key, writer);
            fireNewMapEntry = true;
          }
          if (fireNewMapEntry) {
            var group = new GroupedObservable(key, writer, refCountDisposable),
                durationGroup = new GroupedObservable(key, writer);
            var duration = tryCatch(durationSelector)(durationGroup);
            if (duration === errorObj) {
              map.forEach(handleError(duration.e));
              return o.onError(duration.e);
            }
            o.onNext(group);
            var md = new SingleAssignmentDisposable();
            groupDisposable.add(md);
            md.setDisposable(duration.take(1).subscribe(noop, function(e) {
              map.forEach(handleError(e));
              o.onError(e);
            }, function() {
              if (map['delete'](key)) {
                writer.onCompleted();
              }
              groupDisposable.remove(md);
            }));
          }
          var element = x;
          if (isFunction(elementSelector)) {
            element = tryCatch(elementSelector)(x);
            if (element === errorObj) {
              map.forEach(handleError(element.e));
              return o.onError(element.e);
            }
          }
          writer.onNext(element);
        }, function(e) {
          map.forEach(handleError(e));
          o.onError(e);
        }, function() {
          map.forEach(function(item) {
            item.onCompleted();
          });
          o.onCompleted();
        }));
        return refCountDisposable;
      }, source);
    };
    var UnderlyingObservable = (function(__super__) {
      inherits(UnderlyingObservable, __super__);
      function UnderlyingObservable(m, u) {
        this._m = m;
        this._u = u;
        __super__.call(this);
      }
      UnderlyingObservable.prototype.subscribeCore = function(o) {
        return new BinaryDisposable(this._m.getDisposable(), this._u.subscribe(o));
      };
      return UnderlyingObservable;
    }(ObservableBase));
    var GroupedObservable = (function(__super__) {
      inherits(GroupedObservable, __super__);
      function GroupedObservable(key, underlyingObservable, mergedDisposable) {
        __super__.call(this);
        this.key = key;
        this.underlyingObservable = !mergedDisposable ? underlyingObservable : new UnderlyingObservable(mergedDisposable, underlyingObservable);
      }
      GroupedObservable.prototype._subscribe = function(o) {
        return this.underlyingObservable.subscribe(o);
      };
      return GroupedObservable;
    }(Observable));
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.experimental.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        ObservableBase = Rx.ObservableBase,
        AbstractObserver = Rx.internals.AbstractObserver,
        FlatMapObservable = Rx.FlatMapObservable,
        observableConcat = Observable.concat,
        observableDefer = Observable.defer,
        observableEmpty = Observable.empty,
        disposableEmpty = Rx.Disposable.empty,
        CompositeDisposable = Rx.CompositeDisposable,
        SerialDisposable = Rx.SerialDisposable,
        SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
        Enumerable = Rx.internals.Enumerable,
        enumerableOf = Enumerable.of,
        currentThreadScheduler = Rx.Scheduler.currentThread,
        AsyncSubject = Rx.AsyncSubject,
        Observer = Rx.Observer,
        inherits = Rx.internals.inherits,
        addProperties = Rx.internals.addProperties,
        helpers = Rx.helpers,
        noop = helpers.noop,
        isPromise = helpers.isPromise,
        isFunction = helpers.isFunction,
        isIterable = Rx.helpers.isIterable,
        isArrayLike = Rx.helpers.isArrayLike,
        isScheduler = Rx.Scheduler.isScheduler,
        observableFromPromise = Observable.fromPromise;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) || '_es6shim_iterator_';
    if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
      $iterator$ = '@@iterator';
    }
    var doneEnumerator = Rx.doneEnumerator = {
      done: true,
      value: undefined
    };
    var isIterable = Rx.helpers.isIterable = function(o) {
      return o && o[$iterator$] !== undefined;
    };
    var isArrayLike = Rx.helpers.isArrayLike = function(o) {
      return o && o.length !== undefined;
    };
    Rx.helpers.iterator = $iterator$;
    var WhileEnumerable = (function(__super__) {
      inherits(WhileEnumerable, __super__);
      function WhileEnumerable(c, s) {
        this.c = c;
        this.s = s;
      }
      WhileEnumerable.prototype[$iterator$] = function() {
        var self = this;
        return {next: function() {
            return self.c() ? {
              done: false,
              value: self.s
            } : {
              done: true,
              value: void 0
            };
          }};
      };
      return WhileEnumerable;
    }(Enumerable));
    function enumerableWhile(condition, source) {
      return new WhileEnumerable(condition, source);
    }
    observableProto.letBind = observableProto['let'] = function(func) {
      return func(this);
    };
    Observable['if'] = function(condition, thenSource, elseSourceOrScheduler) {
      return observableDefer(function() {
        elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());
        isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
        isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));
        typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
        return condition() ? thenSource : elseSourceOrScheduler;
      });
    };
    Observable['for'] = Observable.forIn = function(sources, resultSelector, thisArg) {
      return enumerableOf(sources, resultSelector, thisArg).concat();
    };
    var observableWhileDo = Observable['while'] = Observable.whileDo = function(condition, source) {
      isPromise(source) && (source = observableFromPromise(source));
      return enumerableWhile(condition, source).concat();
    };
    observableProto.doWhile = function(condition) {
      return observableConcat([this, observableWhileDo(condition, this)]);
    };
    Observable['case'] = function(selector, sources, defaultSourceOrScheduler) {
      return observableDefer(function() {
        isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
        defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());
        isScheduler(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));
        var result = sources[selector()];
        isPromise(result) && (result = observableFromPromise(result));
        return result || defaultSourceOrScheduler;
      });
    };
    var ExpandObservable = (function(__super__) {
      inherits(ExpandObservable, __super__);
      function ExpandObservable(source, fn, scheduler) {
        this.source = source;
        this._fn = fn;
        this._scheduler = scheduler;
        __super__.call(this);
      }
      function scheduleRecursive(args, recurse) {
        var state = args[0],
            self = args[1];
        var work;
        if (state.q.length > 0) {
          work = state.q.shift();
        } else {
          state.isAcquired = false;
          return;
        }
        var m1 = new SingleAssignmentDisposable();
        state.d.add(m1);
        m1.setDisposable(work.subscribe(new ExpandObserver(state, self, m1)));
        recurse([state, self]);
      }
      ExpandObservable.prototype._ensureActive = function(state) {
        var isOwner = false;
        if (state.q.length > 0) {
          isOwner = !state.isAcquired;
          state.isAcquired = true;
        }
        isOwner && state.m.setDisposable(this._scheduler.scheduleRecursive([state, this], scheduleRecursive));
      };
      ExpandObservable.prototype.subscribeCore = function(o) {
        var m = new SerialDisposable(),
            d = new CompositeDisposable(m),
            state = {
              q: [],
              m: m,
              d: d,
              activeCount: 0,
              isAcquired: false,
              o: o
            };
        state.q.push(this.source);
        state.activeCount++;
        this._ensureActive(state);
        return d;
      };
      return ExpandObservable;
    }(ObservableBase));
    var ExpandObserver = (function(__super__) {
      inherits(ExpandObserver, __super__);
      function ExpandObserver(state, parent, m1) {
        this._s = state;
        this._p = parent;
        this._m1 = m1;
        __super__.call(this);
      }
      ExpandObserver.prototype.next = function(x) {
        this._s.o.onNext(x);
        var result = tryCatch(this._p._fn)(x);
        if (result === errorObj) {
          return this._s.o.onError(result.e);
        }
        this._s.q.push(result);
        this._s.activeCount++;
        this._p._ensureActive(this._s);
      };
      ExpandObserver.prototype.error = function(e) {
        this._s.o.onError(e);
      };
      ExpandObserver.prototype.completed = function() {
        this._s.d.remove(this._m1);
        this._s.activeCount--;
        this._s.activeCount === 0 && this._s.o.onCompleted();
      };
      return ExpandObserver;
    }(AbstractObserver));
    observableProto.expand = function(selector, scheduler) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new ExpandObservable(this, selector, scheduler);
    };
    function argumentsToArray() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      return args;
    }
    var ForkJoinObservable = (function(__super__) {
      inherits(ForkJoinObservable, __super__);
      function ForkJoinObservable(sources, cb) {
        this._sources = sources;
        this._cb = cb;
        __super__.call(this);
      }
      ForkJoinObservable.prototype.subscribeCore = function(o) {
        if (this._sources.length === 0) {
          o.onCompleted();
          return disposableEmpty;
        }
        var count = this._sources.length;
        var state = {
          finished: false,
          hasResults: new Array(count),
          hasCompleted: new Array(count),
          results: new Array(count)
        };
        var subscriptions = new CompositeDisposable();
        for (var i = 0,
            len = this._sources.length; i < len; i++) {
          var source = this._sources[i];
          isPromise(source) && (source = observableFromPromise(source));
          subscriptions.add(source.subscribe(new ForkJoinObserver(o, state, i, this._cb, subscriptions)));
        }
        return subscriptions;
      };
      return ForkJoinObservable;
    }(ObservableBase));
    var ForkJoinObserver = (function(__super__) {
      inherits(ForkJoinObserver, __super__);
      function ForkJoinObserver(o, s, i, cb, subs) {
        this._o = o;
        this._s = s;
        this._i = i;
        this._cb = cb;
        this._subs = subs;
        __super__.call(this);
      }
      ForkJoinObserver.prototype.next = function(x) {
        if (!this._s.finished) {
          this._s.hasResults[this._i] = true;
          this._s.results[this._i] = x;
        }
      };
      ForkJoinObserver.prototype.error = function(e) {
        this._s.finished = true;
        this._o.onError(e);
        this._subs.dispose();
      };
      ForkJoinObserver.prototype.completed = function() {
        if (!this._s.finished) {
          if (!this._s.hasResults[this._i]) {
            return this._o.onCompleted();
          }
          this._s.hasCompleted[this._i] = true;
          for (var i = 0; i < this._s.results.length; i++) {
            if (!this._s.hasCompleted[i]) {
              return;
            }
          }
          this._s.finished = true;
          var res = tryCatch(this._cb).apply(null, this._s.results);
          if (res === errorObj) {
            return this._o.onError(res.e);
          }
          this._o.onNext(res);
          this._o.onCompleted();
        }
      };
      return ForkJoinObserver;
    }(AbstractObserver));
    Observable.forkJoin = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
      Array.isArray(args[0]) && (args = args[0]);
      return new ForkJoinObservable(args, resultSelector);
    };
    observableProto.forkJoin = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      if (Array.isArray(args[0])) {
        args[0].unshift(this);
      } else {
        args.unshift(this);
      }
      return Observable.forkJoin.apply(null, args);
    };
    observableProto.manySelect = observableProto.extend = function(selector, scheduler) {
      isScheduler(scheduler) || (scheduler = Rx.Scheduler.immediate);
      var source = this;
      return observableDefer(function() {
        var chain;
        return source.map(function(x) {
          var curr = new ChainObservable(x);
          chain && chain.onNext(x);
          chain = curr;
          return curr;
        }).tap(noop, function(e) {
          chain && chain.onError(e);
        }, function() {
          chain && chain.onCompleted();
        }).observeOn(scheduler).map(selector);
      }, source);
    };
    var ChainObservable = (function(__super__) {
      inherits(ChainObservable, __super__);
      function ChainObservable(head) {
        __super__.call(this);
        this.head = head;
        this.tail = new AsyncSubject();
      }
      addProperties(ChainObservable.prototype, Observer, {
        _subscribe: function(o) {
          var g = new CompositeDisposable();
          g.add(currentThreadScheduler.schedule(this, function(_, self) {
            o.onNext(self.head);
            g.add(self.tail.mergeAll().subscribe(o));
          }));
          return g;
        },
        onCompleted: function() {
          this.onNext(Observable.empty());
        },
        onError: function(e) {
          this.onNext(Observable['throw'](e));
        },
        onNext: function(v) {
          this.tail.onNext(v);
          this.tail.onCompleted();
        }
      });
      return ChainObservable;
    }(Observable));
    var SwitchFirstObservable = (function(__super__) {
      inherits(SwitchFirstObservable, __super__);
      function SwitchFirstObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      SwitchFirstObservable.prototype.subscribeCore = function(o) {
        var m = new SingleAssignmentDisposable(),
            g = new CompositeDisposable(),
            state = {
              hasCurrent: false,
              isStopped: false,
              o: o,
              g: g
            };
        g.add(m);
        m.setDisposable(this.source.subscribe(new SwitchFirstObserver(state)));
        return g;
      };
      return SwitchFirstObservable;
    }(ObservableBase));
    var SwitchFirstObserver = (function(__super__) {
      inherits(SwitchFirstObserver, __super__);
      function SwitchFirstObserver(state) {
        this._s = state;
        __super__.call(this);
      }
      SwitchFirstObserver.prototype.next = function(x) {
        if (!this._s.hasCurrent) {
          this._s.hasCurrent = true;
          isPromise(x) && (x = observableFromPromise(x));
          var inner = new SingleAssignmentDisposable();
          this._s.g.add(inner);
          inner.setDisposable(x.subscribe(new InnerObserver(this._s, inner)));
        }
      };
      SwitchFirstObserver.prototype.error = function(e) {
        this._s.o.onError(e);
      };
      SwitchFirstObserver.prototype.completed = function() {
        this._s.isStopped = true;
        !this._s.hasCurrent && this._s.g.length === 1 && this._s.o.onCompleted();
      };
      inherits(InnerObserver, __super__);
      function InnerObserver(state, inner) {
        this._s = state;
        this._i = inner;
        __super__.call(this);
      }
      InnerObserver.prototype.next = function(x) {
        this._s.o.onNext(x);
      };
      InnerObserver.prototype.error = function(e) {
        this._s.o.onError(e);
      };
      InnerObserver.prototype.completed = function() {
        this._s.g.remove(this._i);
        this._s.hasCurrent = false;
        this._s.isStopped && this._s.g.length === 1 && this._s.o.onCompleted();
      };
      return SwitchFirstObserver;
    }(AbstractObserver));
    observableProto.switchFirst = function() {
      return new SwitchFirstObservable(this);
    };
    observableProto.flatMapFirst = observableProto.exhaustMap = function(selector, resultSelector, thisArg) {
      return new FlatMapObservable(this, selector, resultSelector, thisArg).switchFirst();
    };
    observableProto.flatMapWithMaxConcurrent = observableProto.flatMapMaxConcurrent = function(limit, selector, resultSelector, thisArg) {
      return new FlatMapObservable(this, selector, resultSelector, thisArg).merge(limit);
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.joinpatterns.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        AnonymousObservable = Rx.AnonymousObservable,
        observableThrow = Observable.throwError,
        observerCreate = Rx.Observer.create,
        SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
        CompositeDisposable = Rx.CompositeDisposable,
        AbstractObserver = Rx.internals.AbstractObserver,
        noop = Rx.helpers.noop,
        inherits = Rx.internals.inherits,
        isFunction = Rx.helpers.isFunction;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    var Map = root.Map || (function() {
      function Map() {
        this.size = 0;
        this._values = [];
        this._keys = [];
      }
      Map.prototype['delete'] = function(key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
      };
      Map.prototype.get = function(key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
      };
      Map.prototype.set = function(key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          this._keys.push(key);
          this._values.push(value);
          this.size++;
        } else {
          this._values[i] = value;
        }
        return this;
      };
      Map.prototype.forEach = function(cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
          cb.call(thisArg, this._values[i], this._keys[i]);
        }
      };
      return Map;
    }());
    function Pattern(patterns) {
      this.patterns = patterns;
    }
    Pattern.prototype.and = function(other) {
      return new Pattern(this.patterns.concat(other));
    };
    Pattern.prototype.thenDo = function(selector) {
      return new Plan(this, selector);
    };
    function Plan(expression, selector) {
      this.expression = expression;
      this.selector = selector;
    }
    function handleOnError(o) {
      return function(e) {
        o.onError(e);
      };
    }
    function handleOnNext(self, observer) {
      return function onNext() {
        var result = tryCatch(self.selector).apply(self, arguments);
        if (result === errorObj) {
          return observer.onError(result.e);
        }
        observer.onNext(result);
      };
    }
    Plan.prototype.activate = function(externalSubscriptions, observer, deactivate) {
      var joinObservers = [],
          errHandler = handleOnError(observer);
      for (var i = 0,
          len = this.expression.patterns.length; i < len; i++) {
        joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], errHandler));
      }
      var activePlan = new ActivePlan(joinObservers, handleOnNext(this, observer), function() {
        for (var j = 0,
            jlen = joinObservers.length; j < jlen; j++) {
          joinObservers[j].removeActivePlan(activePlan);
        }
        deactivate(activePlan);
      });
      for (i = 0, len = joinObservers.length; i < len; i++) {
        joinObservers[i].addActivePlan(activePlan);
      }
      return activePlan;
    };
    function planCreateObserver(externalSubscriptions, observable, onError) {
      var entry = externalSubscriptions.get(observable);
      if (!entry) {
        var observer = new JoinObserver(observable, onError);
        externalSubscriptions.set(observable, observer);
        return observer;
      }
      return entry;
    }
    function ActivePlan(joinObserverArray, onNext, onCompleted) {
      this.joinObserverArray = joinObserverArray;
      this.onNext = onNext;
      this.onCompleted = onCompleted;
      this.joinObservers = new Map();
      for (var i = 0,
          len = this.joinObserverArray.length; i < len; i++) {
        var joinObserver = this.joinObserverArray[i];
        this.joinObservers.set(joinObserver, joinObserver);
      }
    }
    ActivePlan.prototype.dequeue = function() {
      this.joinObservers.forEach(function(v) {
        v.queue.shift();
      });
    };
    ActivePlan.prototype.match = function() {
      var i,
          len,
          hasValues = true;
      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
        if (this.joinObserverArray[i].queue.length === 0) {
          hasValues = false;
          break;
        }
      }
      if (hasValues) {
        var firstValues = [],
            isCompleted = false;
        for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
          firstValues.push(this.joinObserverArray[i].queue[0]);
          this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
        }
        if (isCompleted) {
          this.onCompleted();
        } else {
          this.dequeue();
          var values = [];
          for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
            values.push(firstValues[i].value);
          }
          this.onNext.apply(this, values);
        }
      }
    };
    var JoinObserver = (function(__super__) {
      inherits(JoinObserver, __super__);
      function JoinObserver(source, onError) {
        __super__.call(this);
        this.source = source;
        this.onError = onError;
        this.queue = [];
        this.activePlans = [];
        this.subscription = new SingleAssignmentDisposable();
        this.isDisposed = false;
      }
      var JoinObserverPrototype = JoinObserver.prototype;
      JoinObserverPrototype.next = function(notification) {
        if (!this.isDisposed) {
          if (notification.kind === 'E') {
            return this.onError(notification.error);
          }
          this.queue.push(notification);
          var activePlans = this.activePlans.slice(0);
          for (var i = 0,
              len = activePlans.length; i < len; i++) {
            activePlans[i].match();
          }
        }
      };
      JoinObserverPrototype.error = noop;
      JoinObserverPrototype.completed = noop;
      JoinObserverPrototype.addActivePlan = function(activePlan) {
        this.activePlans.push(activePlan);
      };
      JoinObserverPrototype.subscribe = function() {
        this.subscription.setDisposable(this.source.materialize().subscribe(this));
      };
      JoinObserverPrototype.removeActivePlan = function(activePlan) {
        this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
        this.activePlans.length === 0 && this.dispose();
      };
      JoinObserverPrototype.dispose = function() {
        __super__.prototype.dispose.call(this);
        if (!this.isDisposed) {
          this.isDisposed = true;
          this.subscription.dispose();
        }
      };
      return JoinObserver;
    }(AbstractObserver));
    observableProto.and = function(right) {
      return new Pattern([this, right]);
    };
    observableProto.thenDo = function(selector) {
      return new Pattern([this]).thenDo(selector);
    };
    Observable.when = function() {
      var len = arguments.length,
          plans;
      if (Array.isArray(arguments[0])) {
        plans = arguments[0];
      } else {
        plans = new Array(len);
        for (var i = 0; i < len; i++) {
          plans[i] = arguments[i];
        }
      }
      return new AnonymousObservable(function(o) {
        var activePlans = [],
            externalSubscriptions = new Map();
        var outObserver = observerCreate(function(x) {
          o.onNext(x);
        }, function(err) {
          externalSubscriptions.forEach(function(v) {
            v.onError(err);
          });
          o.onError(err);
        }, function(x) {
          o.onCompleted();
        });
        try {
          for (var i = 0,
              len = plans.length; i < len; i++) {
            activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function(activePlan) {
              var idx = activePlans.indexOf(activePlan);
              activePlans.splice(idx, 1);
              activePlans.length === 0 && o.onCompleted();
            }));
          }
        } catch (e) {
          return observableThrow(e).subscribe(o);
        }
        var group = new CompositeDisposable();
        externalSubscriptions.forEach(function(joinObserver) {
          joinObserver.subscribe();
          group.add(joinObserver);
        });
        return group;
      });
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.sorting.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableProto = Observable.prototype,
        AnonymousObservable = Rx.AnonymousObservable,
        observableNever = Observable.never,
        isEqual = Rx.internals.isEqual,
        defaultSubComparer = Rx.helpers.defaultSubComparer;
    observableProto.jortSort = function() {
      return this.jortSortUntil(observableNever());
    };
    observableProto.jortSortUntil = function(other) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var arr = [];
        return source.takeUntil(other).subscribe(arr.push.bind(arr), observer.onError.bind(observer), function() {
          var sorted = arr.slice(0).sort(defaultSubComparer);
          observer.onNext(isEqual(arr, sorted));
          observer.onCompleted();
        });
      }, source);
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.virtualtime.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Scheduler = Rx.Scheduler,
        ScheduledItem = Rx.internals.ScheduledItem,
        SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive,
        PriorityQueue = Rx.internals.PriorityQueue,
        inherits = Rx.internals.inherits,
        defaultSubComparer = Rx.helpers.defaultSubComparer,
        notImplemented = Rx.helpers.notImplemented;
    var VirtualTimeScheduler = Rx.VirtualTimeScheduler = (function(__super__) {
      inherits(VirtualTimeScheduler, __super__);
      function VirtualTimeScheduler(initialClock, comparer) {
        this.clock = initialClock;
        this.comparer = comparer;
        this.isEnabled = false;
        this.queue = new PriorityQueue(1024);
        __super__.call(this);
      }
      var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;
      VirtualTimeSchedulerPrototype.now = function() {
        return this.toAbsoluteTime(this.clock);
      };
      VirtualTimeSchedulerPrototype.schedule = function(state, action) {
        return this.scheduleAbsolute(state, this.clock, action);
      };
      VirtualTimeSchedulerPrototype.scheduleFuture = function(state, dueTime, action) {
        var dt = dueTime instanceof Date ? this.toRelativeTime(dueTime - this.now()) : this.toRelativeTime(dueTime);
        return this.scheduleRelative(state, dt, action);
      };
      VirtualTimeSchedulerPrototype.add = notImplemented;
      VirtualTimeSchedulerPrototype.toAbsoluteTime = notImplemented;
      VirtualTimeSchedulerPrototype.toRelativeTime = notImplemented;
      VirtualTimeSchedulerPrototype.schedulePeriodic = function(state, period, action) {
        var s = new SchedulePeriodicRecursive(this, state, period, action);
        return s.start();
      };
      VirtualTimeSchedulerPrototype.scheduleRelative = function(state, dueTime, action) {
        var runAt = this.add(this.clock, dueTime);
        return this.scheduleAbsolute(state, runAt, action);
      };
      VirtualTimeSchedulerPrototype.start = function() {
        if (!this.isEnabled) {
          this.isEnabled = true;
          do {
            var next = this.getNext();
            if (next !== null) {
              this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
              next.invoke();
            } else {
              this.isEnabled = false;
            }
          } while (this.isEnabled);
        }
      };
      VirtualTimeSchedulerPrototype.stop = function() {
        this.isEnabled = false;
      };
      VirtualTimeSchedulerPrototype.advanceTo = function(time) {
        var dueToClock = this.comparer(this.clock, time);
        if (this.comparer(this.clock, time) > 0) {
          throw new ArgumentOutOfRangeError();
        }
        if (dueToClock === 0) {
          return;
        }
        if (!this.isEnabled) {
          this.isEnabled = true;
          do {
            var next = this.getNext();
            if (next !== null && this.comparer(next.dueTime, time) <= 0) {
              this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
              next.invoke();
            } else {
              this.isEnabled = false;
            }
          } while (this.isEnabled);
          this.clock = time;
        }
      };
      VirtualTimeSchedulerPrototype.advanceBy = function(time) {
        var dt = this.add(this.clock, time),
            dueToClock = this.comparer(this.clock, dt);
        if (dueToClock > 0) {
          throw new ArgumentOutOfRangeError();
        }
        if (dueToClock === 0) {
          return;
        }
        this.advanceTo(dt);
      };
      VirtualTimeSchedulerPrototype.sleep = function(time) {
        var dt = this.add(this.clock, time);
        if (this.comparer(this.clock, dt) >= 0) {
          throw new ArgumentOutOfRangeError();
        }
        this.clock = dt;
      };
      VirtualTimeSchedulerPrototype.getNext = function() {
        while (this.queue.length > 0) {
          var next = this.queue.peek();
          if (next.isCancelled()) {
            this.queue.dequeue();
          } else {
            return next;
          }
        }
        return null;
      };
      VirtualTimeSchedulerPrototype.scheduleAbsolute = function(state, dueTime, action) {
        var self = this;
        function run(scheduler, state1) {
          self.queue.remove(si);
          return action(scheduler, state1);
        }
        var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
        this.queue.enqueue(si);
        return si.disposable;
      };
      return VirtualTimeScheduler;
    }(Scheduler));
    Rx.HistoricalScheduler = (function(__super__) {
      inherits(HistoricalScheduler, __super__);
      function HistoricalScheduler(initialClock, comparer) {
        var clock = initialClock == null ? 0 : initialClock;
        var cmp = comparer || defaultSubComparer;
        __super__.call(this, clock, cmp);
      }
      var HistoricalSchedulerProto = HistoricalScheduler.prototype;
      HistoricalSchedulerProto.add = function(absolute, relative) {
        return absolute + relative;
      };
      HistoricalSchedulerProto.toAbsoluteTime = function(absolute) {
        return new Date(absolute).getTime();
      };
      HistoricalSchedulerProto.toRelativeTime = function(timeSpan) {
        return timeSpan;
      };
      return HistoricalScheduler;
    }(Rx.VirtualTimeScheduler));
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.testing.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx.virtualtime', 'exports'], function(Rx, exports) {
        root.Rx = factory(root, exports, Rx);
        return root.Rx;
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observer = Rx.Observer,
        Observable = Rx.Observable,
        Notification = Rx.Notification,
        VirtualTimeScheduler = Rx.VirtualTimeScheduler,
        Disposable = Rx.Disposable,
        disposableEmpty = Disposable.empty,
        disposableCreate = Disposable.create,
        CompositeDisposable = Rx.CompositeDisposable,
        inherits = Rx.internals.inherits,
        defaultComparer = Rx.internals.isEqual;
    function OnNextPredicate(predicate) {
      this.predicate = predicate;
    }
    OnNextPredicate.prototype.equals = function(other) {
      if (other === this) {
        return true;
      }
      if (other == null) {
        return false;
      }
      if (other.kind !== 'N') {
        return false;
      }
      return this.predicate(other.value);
    };
    function OnErrorPredicate(predicate) {
      this.predicate = predicate;
    }
    OnErrorPredicate.prototype.equals = function(other) {
      if (other === this) {
        return true;
      }
      if (other == null) {
        return false;
      }
      if (other.kind !== 'E') {
        return false;
      }
      return this.predicate(other.error);
    };
    var ReactiveTest = Rx.ReactiveTest = {
      created: 100,
      subscribed: 200,
      disposed: 1000,
      onNext: function(ticks, value) {
        return typeof value === 'function' ? new Recorded(ticks, new OnNextPredicate(value)) : new Recorded(ticks, Notification.createOnNext(value));
      },
      onError: function(ticks, error) {
        return typeof error === 'function' ? new Recorded(ticks, new OnErrorPredicate(error)) : new Recorded(ticks, Notification.createOnError(error));
      },
      onCompleted: function(ticks) {
        return new Recorded(ticks, Notification.createOnCompleted());
      },
      subscribe: function(start, end) {
        return new Subscription(start, end);
      }
    };
    var Recorded = Rx.Recorded = function(time, value, comparer) {
      this.time = time;
      this.value = value;
      this.comparer = comparer || defaultComparer;
    };
    Recorded.prototype.equals = function(other) {
      return this.time === other.time && this.comparer(this.value, other.value);
    };
    Recorded.prototype.toString = function() {
      return this.value.toString() + '@' + this.time;
    };
    var Subscription = Rx.Subscription = function(start, end) {
      this.subscribe = start;
      this.unsubscribe = end || Number.MAX_VALUE;
    };
    Subscription.prototype.equals = function(other) {
      return this.subscribe === other.subscribe && this.unsubscribe === other.unsubscribe;
    };
    Subscription.prototype.toString = function() {
      return '(' + this.subscribe + ', ' + (this.unsubscribe === Number.MAX_VALUE ? 'Infinite' : this.unsubscribe) + ')';
    };
    var MockDisposable = Rx.MockDisposable = function(scheduler) {
      this.scheduler = scheduler;
      this.disposes = [];
      this.disposes.push(this.scheduler.clock);
    };
    MockDisposable.prototype.dispose = function() {
      this.disposes.push(this.scheduler.clock);
    };
    var MockObserver = (function(__super__) {
      inherits(MockObserver, __super__);
      function MockObserver(scheduler) {
        __super__.call(this);
        this.scheduler = scheduler;
        this.messages = [];
      }
      var MockObserverPrototype = MockObserver.prototype;
      MockObserverPrototype.onNext = function(value) {
        this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnNext(value)));
      };
      MockObserverPrototype.onError = function(e) {
        this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnError(e)));
      };
      MockObserverPrototype.onCompleted = function() {
        this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnCompleted()));
      };
      return MockObserver;
    })(Observer);
    function MockPromise(scheduler, messages) {
      var self = this;
      this.scheduler = scheduler;
      this.messages = messages;
      this.subscriptions = [];
      this.observers = [];
      for (var i = 0,
          len = this.messages.length; i < len; i++) {
        var message = this.messages[i],
            notification = message.value;
        (function(innerNotification) {
          scheduler.scheduleAbsolute(null, message.time, function() {
            var obs = self.observers.slice(0);
            for (var j = 0,
                jLen = obs.length; j < jLen; j++) {
              innerNotification.accept(obs[j]);
            }
            return disposableEmpty;
          });
        })(notification);
      }
    }
    MockPromise.prototype.then = function(onResolved, onRejected) {
      var self = this;
      this.subscriptions.push(new Subscription(this.scheduler.clock));
      var index = this.subscriptions.length - 1;
      var newPromise;
      var observer = Rx.Observer.create(function(x) {
        var retValue = onResolved(x);
        if (retValue && typeof retValue.then === 'function') {
          newPromise = retValue;
        } else {
          var ticks = self.scheduler.clock;
          newPromise = new MockPromise(self.scheduler, [Rx.ReactiveTest.onNext(ticks, undefined), Rx.ReactiveTest.onCompleted(ticks)]);
        }
        var idx = self.observers.indexOf(observer);
        self.observers.splice(idx, 1);
        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
      }, function(err) {
        onRejected(err);
        var idx = self.observers.indexOf(observer);
        self.observers.splice(idx, 1);
        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
      });
      this.observers.push(observer);
      return newPromise || new MockPromise(this.scheduler, this.messages);
    };
    var HotObservable = (function(__super__) {
      inherits(HotObservable, __super__);
      function HotObservable(scheduler, messages) {
        __super__.call(this);
        var message,
            notification,
            observable = this;
        this.scheduler = scheduler;
        this.messages = messages;
        this.subscriptions = [];
        this.observers = [];
        for (var i = 0,
            len = this.messages.length; i < len; i++) {
          message = this.messages[i];
          notification = message.value;
          (function(innerNotification) {
            scheduler.scheduleAbsolute(null, message.time, function() {
              var obs = observable.observers.slice(0);
              for (var j = 0,
                  jLen = obs.length; j < jLen; j++) {
                innerNotification.accept(obs[j]);
              }
              return disposableEmpty;
            });
          })(notification);
        }
      }
      HotObservable.prototype._subscribe = function(o) {
        var observable = this;
        this.observers.push(o);
        this.subscriptions.push(new Subscription(this.scheduler.clock));
        var index = this.subscriptions.length - 1;
        return disposableCreate(function() {
          var idx = observable.observers.indexOf(o);
          observable.observers.splice(idx, 1);
          observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
        });
      };
      return HotObservable;
    })(Observable);
    var ColdObservable = (function(__super__) {
      inherits(ColdObservable, __super__);
      function ColdObservable(scheduler, messages) {
        __super__.call(this);
        this.scheduler = scheduler;
        this.messages = messages;
        this.subscriptions = [];
      }
      ColdObservable.prototype._subscribe = function(o) {
        var message,
            notification,
            observable = this;
        this.subscriptions.push(new Subscription(this.scheduler.clock));
        var index = this.subscriptions.length - 1;
        var d = new CompositeDisposable();
        for (var i = 0,
            len = this.messages.length; i < len; i++) {
          message = this.messages[i];
          notification = message.value;
          (function(innerNotification) {
            d.add(observable.scheduler.scheduleRelative(null, message.time, function() {
              innerNotification.accept(o);
              return disposableEmpty;
            }));
          })(notification);
        }
        return disposableCreate(function() {
          observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
          d.dispose();
        });
      };
      return ColdObservable;
    })(Observable);
    Rx.TestScheduler = (function(__super__) {
      inherits(TestScheduler, __super__);
      function baseComparer(x, y) {
        return x > y ? 1 : (x < y ? -1 : 0);
      }
      function TestScheduler() {
        __super__.call(this, 0, baseComparer);
      }
      TestScheduler.prototype.scheduleAbsolute = function(state, dueTime, action) {
        dueTime <= this.clock && (dueTime = this.clock + 1);
        return __super__.prototype.scheduleAbsolute.call(this, state, dueTime, action);
      };
      TestScheduler.prototype.add = function(absolute, relative) {
        return absolute + relative;
      };
      TestScheduler.prototype.toAbsoluteTime = function(absolute) {
        return new Date(absolute).getTime();
      };
      TestScheduler.prototype.toRelativeTime = function(timeSpan) {
        return timeSpan;
      };
      TestScheduler.prototype.startScheduler = function(createFn, settings) {
        settings || (settings = {});
        settings.created == null && (settings.created = ReactiveTest.created);
        settings.subscribed == null && (settings.subscribed = ReactiveTest.subscribed);
        settings.disposed == null && (settings.disposed = ReactiveTest.disposed);
        var observer = this.createObserver(),
            source,
            subscription;
        this.scheduleAbsolute(null, settings.created, function() {
          source = createFn();
          return disposableEmpty;
        });
        this.scheduleAbsolute(null, settings.subscribed, function() {
          subscription = source.subscribe(observer);
          return disposableEmpty;
        });
        this.scheduleAbsolute(null, settings.disposed, function() {
          subscription.dispose();
          return disposableEmpty;
        });
        this.start();
        return observer;
      };
      TestScheduler.prototype.createHotObservable = function() {
        var len = arguments.length,
            args;
        if (Array.isArray(arguments[0])) {
          args = arguments[0];
        } else {
          args = new Array(len);
          for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
        }
        return new HotObservable(this, args);
      };
      TestScheduler.prototype.createColdObservable = function() {
        var len = arguments.length,
            args;
        if (Array.isArray(arguments[0])) {
          args = arguments[0];
        } else {
          args = new Array(len);
          for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
        }
        return new ColdObservable(this, args);
      };
      TestScheduler.prototype.createResolvedPromise = function(ticks, value) {
        return new MockPromise(this, [Rx.ReactiveTest.onNext(ticks, value), Rx.ReactiveTest.onCompleted(ticks)]);
      };
      TestScheduler.prototype.createRejectedPromise = function(ticks, reason) {
        return new MockPromise(this, [Rx.ReactiveTest.onError(ticks, reason)]);
      };
      TestScheduler.prototype.createObserver = function() {
        return new MockObserver(this);
      };
      return TestScheduler;
    })(VirtualTimeScheduler);
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:process@0.11.6/browser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var process = module.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  (function() {
    try {
      cachedSetTimeout = setTimeout;
    } catch (e) {
      cachedSetTimeout = function() {
        throw new Error('setTimeout is not defined');
      };
    }
    try {
      cachedClearTimeout = clearTimeout;
    } catch (e) {
      cachedClearTimeout = function() {
        throw new Error('clearTimeout is not defined');
      };
    }
  }());
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout.call(null, timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      cachedSetTimeout.call(null, drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

System.registerDynamic("npm:process@0.11.6.js", ["npm:process@0.11.6/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:process@0.11.6/browser.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["npm:process@0.11.6.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.6.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index.js');
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(process) {
    ;
    (function(undefined) {
      var objectTypes = {
        'function': true,
        'object': true
      };
      function checkGlobal(value) {
        return (value && value.Object === Object) ? value : null;
      }
      var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
      var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
      var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
      var freeSelf = checkGlobal(objectTypes[typeof self] && self);
      var freeWindow = checkGlobal(objectTypes[typeof window] && window);
      var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
      var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
      var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
      var Rx = {
        internals: {},
        config: {Promise: root.Promise},
        helpers: {}
      };
      var noop = Rx.helpers.noop = function() {},
          identity = Rx.helpers.identity = function(x) {
            return x;
          },
          defaultNow = Rx.helpers.defaultNow = Date.now,
          defaultComparer = Rx.helpers.defaultComparer = function(x, y) {
            return isEqual(x, y);
          },
          defaultSubComparer = Rx.helpers.defaultSubComparer = function(x, y) {
            return x > y ? 1 : (x < y ? -1 : 0);
          },
          defaultKeySerializer = Rx.helpers.defaultKeySerializer = function(x) {
            return x.toString();
          },
          defaultError = Rx.helpers.defaultError = function(err) {
            throw err;
          },
          isPromise = Rx.helpers.isPromise = function(p) {
            return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function';
          },
          isFunction = Rx.helpers.isFunction = (function() {
            var isFn = function(value) {
              return typeof value == 'function' || false;
            };
            if (isFn(/x/)) {
              isFn = function(value) {
                return typeof value == 'function' && toString.call(value) == '[object Function]';
              };
            }
            return isFn;
          }());
      function cloneArray(arr) {
        for (var a = [],
            i = 0,
            len = arr.length; i < len; i++) {
          a.push(arr[i]);
        }
        return a;
      }
      var errorObj = {e: {}};
      function tryCatcherGen(tryCatchTarget) {
        return function tryCatcher() {
          try {
            return tryCatchTarget.apply(this, arguments);
          } catch (e) {
            errorObj.e = e;
            return errorObj;
          }
        };
      }
      var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
        if (!isFunction(fn)) {
          throw new TypeError('fn must be a function');
        }
        return tryCatcherGen(fn);
      };
      function thrower(e) {
        throw e;
      }
      Rx.config.longStackSupport = false;
      var hasStacks = false,
          stacks = tryCatch(function() {
            throw new Error();
          })();
      hasStacks = !!stacks.e && !!stacks.e.stack;
      var rStartingLine = captureLine(),
          rFileName;
      var STACK_JUMP_SEPARATOR = 'From previous event:';
      function makeStackTraceLong(error, observable) {
        if (hasStacks && observable.stack && typeof error === 'object' && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
          var stacks = [];
          for (var o = observable; !!o; o = o.source) {
            if (o.stack) {
              stacks.unshift(o.stack);
            }
          }
          stacks.unshift(error.stack);
          var concatedStacks = stacks.join('\n' + STACK_JUMP_SEPARATOR + '\n');
          error.stack = filterStackString(concatedStacks);
        }
      }
      function filterStackString(stackString) {
        var lines = stackString.split('\n'),
            desiredLines = [];
        for (var i = 0,
            len = lines.length; i < len; i++) {
          var line = lines[i];
          if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
          }
        }
        return desiredLines.join('\n');
      }
      function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
          return false;
        }
        var fileName = fileNameAndLineNumber[0],
            lineNumber = fileNameAndLineNumber[1];
        return fileName === rFileName && lineNumber >= rStartingLine && lineNumber <= rEndingLine;
      }
      function isNodeFrame(stackLine) {
        return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
      }
      function captureLine() {
        if (!hasStacks) {
          return;
        }
        try {
          throw new Error();
        } catch (e) {
          var lines = e.stack.split('\n');
          var firstLine = lines[0].indexOf('@') > 0 ? lines[1] : lines[2];
          var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
          if (!fileNameAndLineNumber) {
            return;
          }
          rFileName = fileNameAndLineNumber[0];
          return fileNameAndLineNumber[1];
        }
      }
      function getFileNameAndLineNumber(stackLine) {
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
        }
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
          return [attempt2[1], Number(attempt2[2])];
        }
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          return [attempt3[1], Number(attempt3[2])];
        }
      }
      var EmptyError = Rx.EmptyError = function() {
        this.message = 'Sequence contains no elements.';
        Error.call(this);
      };
      EmptyError.prototype = Object.create(Error.prototype);
      EmptyError.prototype.name = 'EmptyError';
      var ObjectDisposedError = Rx.ObjectDisposedError = function() {
        this.message = 'Object has been disposed';
        Error.call(this);
      };
      ObjectDisposedError.prototype = Object.create(Error.prototype);
      ObjectDisposedError.prototype.name = 'ObjectDisposedError';
      var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function() {
        this.message = 'Argument out of range';
        Error.call(this);
      };
      ArgumentOutOfRangeError.prototype = Object.create(Error.prototype);
      ArgumentOutOfRangeError.prototype.name = 'ArgumentOutOfRangeError';
      var NotSupportedError = Rx.NotSupportedError = function(message) {
        this.message = message || 'This operation is not supported';
        Error.call(this);
      };
      NotSupportedError.prototype = Object.create(Error.prototype);
      NotSupportedError.prototype.name = 'NotSupportedError';
      var NotImplementedError = Rx.NotImplementedError = function(message) {
        this.message = message || 'This operation is not implemented';
        Error.call(this);
      };
      NotImplementedError.prototype = Object.create(Error.prototype);
      NotImplementedError.prototype.name = 'NotImplementedError';
      var notImplemented = Rx.helpers.notImplemented = function() {
        throw new NotImplementedError();
      };
      var notSupported = Rx.helpers.notSupported = function() {
        throw new NotSupportedError();
      };
      var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) || '_es6shim_iterator_';
      if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
        $iterator$ = '@@iterator';
      }
      var doneEnumerator = Rx.doneEnumerator = {
        done: true,
        value: undefined
      };
      var isIterable = Rx.helpers.isIterable = function(o) {
        return o && o[$iterator$] !== undefined;
      };
      var isArrayLike = Rx.helpers.isArrayLike = function(o) {
        return o && o.length !== undefined;
      };
      Rx.helpers.iterator = $iterator$;
      var bindCallback = Rx.internals.bindCallback = function(func, thisArg, argCount) {
        if (typeof thisArg === 'undefined') {
          return func;
        }
        switch (argCount) {
          case 0:
            return function() {
              return func.call(thisArg);
            };
          case 1:
            return function(arg) {
              return func.call(thisArg, arg);
            };
          case 2:
            return function(value, index) {
              return func.call(thisArg, value, index);
            };
          case 3:
            return function(value, index, collection) {
              return func.call(thisArg, value, index, collection);
            };
        }
        return function() {
          return func.apply(thisArg, arguments);
        };
      };
      var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
          dontEnumsLength = dontEnums.length;
      var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          objectTag = '[object Object]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          weakMapTag = '[object WeakMap]';
      var arrayBufferTag = '[object ArrayBuffer]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var objectProto = Object.prototype,
          hasOwnProperty = objectProto.hasOwnProperty,
          objToString = objectProto.toString,
          MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
      var keys = Object.keys || (function() {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function(obj) {
          if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }
          var result = [],
              prop,
              i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }());
      function equalObjects(object, other, equalFunc, isLoose, stackA, stackB) {
        var objProps = keys(object),
            objLength = objProps.length,
            othProps = keys(other),
            othLength = othProps.length;
        if (objLength !== othLength && !isLoose) {
          return false;
        }
        var index = objLength,
            key;
        while (index--) {
          key = objProps[index];
          if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var skipCtor = isLoose;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key],
              othValue = other[key],
              result;
          if (!(result === undefined ? equalFunc(objValue, othValue, isLoose, stackA, stackB) : result)) {
            return false;
          }
          skipCtor || (skipCtor = key === 'constructor');
        }
        if (!skipCtor) {
          var objCtor = object.constructor,
              othCtor = other.constructor;
          if (objCtor !== othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor === 'function' && objCtor instanceof objCtor && typeof othCtor === 'function' && othCtor instanceof othCtor)) {
            return false;
          }
        }
        return true;
      }
      function equalByTag(object, other, tag) {
        switch (tag) {
          case boolTag:
          case dateTag:
            return +object === +other;
          case errorTag:
            return object.name === other.name && object.message === other.message;
          case numberTag:
            return (object !== +object) ? other !== +other : object === +other;
          case regexpTag:
          case stringTag:
            return object === (other + '');
        }
        return false;
      }
      var isObject = Rx.internals.isObject = function(value) {
        var type = typeof value;
        return !!value && (type === 'object' || type === 'function');
      };
      function isObjectLike(value) {
        return !!value && typeof value === 'object';
      }
      function isLength(value) {
        return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
      }
      var isHostObject = (function() {
        try {
          Object({'toString': 0} + '');
        } catch (e) {
          return function() {
            return false;
          };
        }
        return function(value) {
          return typeof value.toString !== 'function' && typeof(value + '') === 'string';
        };
      }());
      function isTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
      }
      var isArray = Array.isArray || function(value) {
        return isObjectLike(value) && isLength(value.length) && objToString.call(value) === arrayTag;
      };
      function arraySome(array, predicate) {
        var index = -1,
            length = array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function equalArrays(array, other, equalFunc, isLoose, stackA, stackB) {
        var index = -1,
            arrLength = array.length,
            othLength = other.length;
        if (arrLength !== othLength && !(isLoose && othLength > arrLength)) {
          return false;
        }
        while (++index < arrLength) {
          var arrValue = array[index],
              othValue = other[index],
              result;
          if (result !== undefined) {
            if (result) {
              continue;
            }
            return false;
          }
          if (isLoose) {
            if (!arraySome(other, function(othValue) {
              return arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB);
            })) {
              return false;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB))) {
            return false;
          }
        }
        return true;
      }
      function baseIsEqualDeep(object, other, equalFunc, isLoose, stackA, stackB) {
        var objIsArr = isArray(object),
            othIsArr = isArray(other),
            objTag = arrayTag,
            othTag = arrayTag;
        if (!objIsArr) {
          objTag = objToString.call(object);
          if (objTag === argsTag) {
            objTag = objectTag;
          } else if (objTag !== objectTag) {
            objIsArr = isTypedArray(object);
          }
        }
        if (!othIsArr) {
          othTag = objToString.call(other);
          if (othTag === argsTag) {
            othTag = objectTag;
          }
        }
        var objIsObj = objTag === objectTag && !isHostObject(object),
            othIsObj = othTag === objectTag && !isHostObject(other),
            isSameTag = objTag === othTag;
        if (isSameTag && !(objIsArr || objIsObj)) {
          return equalByTag(object, other, objTag);
        }
        if (!isLoose) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
              othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
          if (objIsWrapped || othIsWrapped) {
            return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, isLoose, stackA, stackB);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stackA || (stackA = []);
        stackB || (stackB = []);
        var length = stackA.length;
        while (length--) {
          if (stackA[length] === object) {
            return stackB[length] === other;
          }
        }
        stackA.push(object);
        stackB.push(other);
        var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, isLoose, stackA, stackB);
        stackA.pop();
        stackB.pop();
        return result;
      }
      function baseIsEqual(value, other, isLoose, stackA, stackB) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, baseIsEqual, isLoose, stackA, stackB);
      }
      var isEqual = Rx.internals.isEqual = function(value, other) {
        return baseIsEqual(value, other);
      };
      var hasProp = {}.hasOwnProperty,
          slice = Array.prototype.slice;
      var inherits = Rx.internals.inherits = function(child, parent) {
        function __() {
          this.constructor = child;
        }
        __.prototype = parent.prototype;
        child.prototype = new __();
      };
      var addProperties = Rx.internals.addProperties = function(obj) {
        for (var sources = [],
            i = 1,
            len = arguments.length; i < len; i++) {
          sources.push(arguments[i]);
        }
        for (var idx = 0,
            ln = sources.length; idx < ln; idx++) {
          var source = sources[idx];
          for (var prop in source) {
            obj[prop] = source[prop];
          }
        }
      };
      var addRef = Rx.internals.addRef = function(xs, r) {
        return new AnonymousObservable(function(observer) {
          return new BinaryDisposable(r.getDisposable(), xs.subscribe(observer));
        });
      };
      function arrayInitialize(count, factory) {
        var a = new Array(count);
        for (var i = 0; i < count; i++) {
          a[i] = factory();
        }
        return a;
      }
      var CompositeDisposable = Rx.CompositeDisposable = function() {
        var args = [],
            i,
            len;
        if (Array.isArray(arguments[0])) {
          args = arguments[0];
        } else {
          len = arguments.length;
          args = new Array(len);
          for (i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
        }
        this.disposables = args;
        this.isDisposed = false;
        this.length = args.length;
      };
      var CompositeDisposablePrototype = CompositeDisposable.prototype;
      CompositeDisposablePrototype.add = function(item) {
        if (this.isDisposed) {
          item.dispose();
        } else {
          this.disposables.push(item);
          this.length++;
        }
      };
      CompositeDisposablePrototype.remove = function(item) {
        var shouldDispose = false;
        if (!this.isDisposed) {
          var idx = this.disposables.indexOf(item);
          if (idx !== -1) {
            shouldDispose = true;
            this.disposables.splice(idx, 1);
            this.length--;
            item.dispose();
          }
        }
        return shouldDispose;
      };
      CompositeDisposablePrototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var len = this.disposables.length,
              currentDisposables = new Array(len);
          for (var i = 0; i < len; i++) {
            currentDisposables[i] = this.disposables[i];
          }
          this.disposables = [];
          this.length = 0;
          for (i = 0; i < len; i++) {
            currentDisposables[i].dispose();
          }
        }
      };
      var Disposable = Rx.Disposable = function(action) {
        this.isDisposed = false;
        this.action = action || noop;
      };
      Disposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.action();
          this.isDisposed = true;
        }
      };
      var disposableCreate = Disposable.create = function(action) {
        return new Disposable(action);
      };
      var disposableEmpty = Disposable.empty = {dispose: noop};
      var isDisposable = Disposable.isDisposable = function(d) {
        return d && isFunction(d.dispose);
      };
      var checkDisposed = Disposable.checkDisposed = function(disposable) {
        if (disposable.isDisposed) {
          throw new ObjectDisposedError();
        }
      };
      var disposableFixup = Disposable._fixup = function(result) {
        return isDisposable(result) ? result : disposableEmpty;
      };
      var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function() {
        this.isDisposed = false;
        this.current = null;
      };
      SingleAssignmentDisposable.prototype.getDisposable = function() {
        return this.current;
      };
      SingleAssignmentDisposable.prototype.setDisposable = function(value) {
        if (this.current) {
          throw new Error('Disposable has already been assigned');
        }
        var shouldDispose = this.isDisposed;
        !shouldDispose && (this.current = value);
        shouldDispose && value && value.dispose();
      };
      SingleAssignmentDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var old = this.current;
          this.current = null;
          old && old.dispose();
        }
      };
      var SerialDisposable = Rx.SerialDisposable = function() {
        this.isDisposed = false;
        this.current = null;
      };
      SerialDisposable.prototype.getDisposable = function() {
        return this.current;
      };
      SerialDisposable.prototype.setDisposable = function(value) {
        var shouldDispose = this.isDisposed;
        if (!shouldDispose) {
          var old = this.current;
          this.current = value;
        }
        old && old.dispose();
        shouldDispose && value && value.dispose();
      };
      SerialDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var old = this.current;
          this.current = null;
        }
        old && old.dispose();
      };
      var BinaryDisposable = Rx.BinaryDisposable = function(first, second) {
        this._first = first;
        this._second = second;
        this.isDisposed = false;
      };
      BinaryDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var old1 = this._first;
          this._first = null;
          old1 && old1.dispose();
          var old2 = this._second;
          this._second = null;
          old2 && old2.dispose();
        }
      };
      var NAryDisposable = Rx.NAryDisposable = function(disposables) {
        this._disposables = disposables;
        this.isDisposed = false;
      };
      NAryDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          for (var i = 0,
              len = this._disposables.length; i < len; i++) {
            this._disposables[i].dispose();
          }
          this._disposables.length = 0;
        }
      };
      var RefCountDisposable = Rx.RefCountDisposable = (function() {
        function InnerDisposable(disposable) {
          this.disposable = disposable;
          this.disposable.count++;
          this.isInnerDisposed = false;
        }
        InnerDisposable.prototype.dispose = function() {
          if (!this.disposable.isDisposed && !this.isInnerDisposed) {
            this.isInnerDisposed = true;
            this.disposable.count--;
            if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
              this.disposable.isDisposed = true;
              this.disposable.underlyingDisposable.dispose();
            }
          }
        };
        function RefCountDisposable(disposable) {
          this.underlyingDisposable = disposable;
          this.isDisposed = false;
          this.isPrimaryDisposed = false;
          this.count = 0;
        }
        RefCountDisposable.prototype.dispose = function() {
          if (!this.isDisposed && !this.isPrimaryDisposed) {
            this.isPrimaryDisposed = true;
            if (this.count === 0) {
              this.isDisposed = true;
              this.underlyingDisposable.dispose();
            }
          }
        };
        RefCountDisposable.prototype.getDisposable = function() {
          return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
        };
        return RefCountDisposable;
      })();
      function ScheduledDisposable(scheduler, disposable) {
        this.scheduler = scheduler;
        this.disposable = disposable;
        this.isDisposed = false;
      }
      function scheduleItem(s, self) {
        if (!self.isDisposed) {
          self.isDisposed = true;
          self.disposable.dispose();
        }
      }
      ScheduledDisposable.prototype.dispose = function() {
        this.scheduler.schedule(this, scheduleItem);
      };
      var ScheduledItem = Rx.internals.ScheduledItem = function(scheduler, state, action, dueTime, comparer) {
        this.scheduler = scheduler;
        this.state = state;
        this.action = action;
        this.dueTime = dueTime;
        this.comparer = comparer || defaultSubComparer;
        this.disposable = new SingleAssignmentDisposable();
      };
      ScheduledItem.prototype.invoke = function() {
        this.disposable.setDisposable(this.invokeCore());
      };
      ScheduledItem.prototype.compareTo = function(other) {
        return this.comparer(this.dueTime, other.dueTime);
      };
      ScheduledItem.prototype.isCancelled = function() {
        return this.disposable.isDisposed;
      };
      ScheduledItem.prototype.invokeCore = function() {
        return disposableFixup(this.action(this.scheduler, this.state));
      };
      var Scheduler = Rx.Scheduler = (function() {
        function Scheduler() {}
        Scheduler.isScheduler = function(s) {
          return s instanceof Scheduler;
        };
        var schedulerProto = Scheduler.prototype;
        schedulerProto.schedule = function(state, action) {
          throw new NotImplementedError();
        };
        schedulerProto.scheduleFuture = function(state, dueTime, action) {
          var dt = dueTime;
          dt instanceof Date && (dt = dt - this.now());
          dt = Scheduler.normalize(dt);
          if (dt === 0) {
            return this.schedule(state, action);
          }
          return this._scheduleFuture(state, dt, action);
        };
        schedulerProto._scheduleFuture = function(state, dueTime, action) {
          throw new NotImplementedError();
        };
        Scheduler.now = defaultNow;
        Scheduler.prototype.now = defaultNow;
        Scheduler.normalize = function(timeSpan) {
          timeSpan < 0 && (timeSpan = 0);
          return timeSpan;
        };
        return Scheduler;
      }());
      var normalizeTime = Scheduler.normalize,
          isScheduler = Scheduler.isScheduler;
      (function(schedulerProto) {
        function invokeRecImmediate(scheduler, pair) {
          var state = pair[0],
              action = pair[1],
              group = new CompositeDisposable();
          action(state, innerAction);
          return group;
          function innerAction(state2) {
            var isAdded = false,
                isDone = false;
            var d = scheduler.schedule(state2, scheduleWork);
            if (!isDone) {
              group.add(d);
              isAdded = true;
            }
            function scheduleWork(_, state3) {
              if (isAdded) {
                group.remove(d);
              } else {
                isDone = true;
              }
              action(state3, innerAction);
              return disposableEmpty;
            }
          }
        }
        function invokeRecDate(scheduler, pair) {
          var state = pair[0],
              action = pair[1],
              group = new CompositeDisposable();
          action(state, innerAction);
          return group;
          function innerAction(state2, dueTime1) {
            var isAdded = false,
                isDone = false;
            var d = scheduler.scheduleFuture(state2, dueTime1, scheduleWork);
            if (!isDone) {
              group.add(d);
              isAdded = true;
            }
            function scheduleWork(_, state3) {
              if (isAdded) {
                group.remove(d);
              } else {
                isDone = true;
              }
              action(state3, innerAction);
              return disposableEmpty;
            }
          }
        }
        schedulerProto.scheduleRecursive = function(state, action) {
          return this.schedule([state, action], invokeRecImmediate);
        };
        schedulerProto.scheduleRecursiveFuture = function(state, dueTime, action) {
          return this.scheduleFuture([state, action], dueTime, invokeRecDate);
        };
      }(Scheduler.prototype));
      (function(schedulerProto) {
        schedulerProto.schedulePeriodic = function(state, period, action) {
          if (typeof root.setInterval === 'undefined') {
            throw new NotSupportedError();
          }
          period = normalizeTime(period);
          var s = state,
              id = root.setInterval(function() {
                s = action(s);
              }, period);
          return disposableCreate(function() {
            root.clearInterval(id);
          });
        };
      }(Scheduler.prototype));
      (function(schedulerProto) {
        schedulerProto.catchError = schedulerProto['catch'] = function(handler) {
          return new CatchScheduler(this, handler);
        };
      }(Scheduler.prototype));
      var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function() {
        function createTick(self) {
          return function tick(command, recurse) {
            recurse(0, self._period);
            var state = tryCatch(self._action)(self._state);
            if (state === errorObj) {
              self._cancel.dispose();
              thrower(state.e);
            }
            self._state = state;
          };
        }
        function SchedulePeriodicRecursive(scheduler, state, period, action) {
          this._scheduler = scheduler;
          this._state = state;
          this._period = period;
          this._action = action;
        }
        SchedulePeriodicRecursive.prototype.start = function() {
          var d = new SingleAssignmentDisposable();
          this._cancel = d;
          d.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, createTick(this)));
          return d;
        };
        return SchedulePeriodicRecursive;
      }());
      var ImmediateScheduler = (function(__super__) {
        inherits(ImmediateScheduler, __super__);
        function ImmediateScheduler() {
          __super__.call(this);
        }
        ImmediateScheduler.prototype.schedule = function(state, action) {
          return disposableFixup(action(this, state));
        };
        return ImmediateScheduler;
      }(Scheduler));
      var immediateScheduler = Scheduler.immediate = new ImmediateScheduler();
      var CurrentThreadScheduler = (function(__super__) {
        var queue;
        function runTrampoline() {
          while (queue.length > 0) {
            var item = queue.dequeue();
            !item.isCancelled() && item.invoke();
          }
        }
        inherits(CurrentThreadScheduler, __super__);
        function CurrentThreadScheduler() {
          __super__.call(this);
        }
        CurrentThreadScheduler.prototype.schedule = function(state, action) {
          var si = new ScheduledItem(this, state, action, this.now());
          if (!queue) {
            queue = new PriorityQueue(4);
            queue.enqueue(si);
            var result = tryCatch(runTrampoline)();
            queue = null;
            if (result === errorObj) {
              thrower(result.e);
            }
          } else {
            queue.enqueue(si);
          }
          return si.disposable;
        };
        CurrentThreadScheduler.prototype.scheduleRequired = function() {
          return !queue;
        };
        return CurrentThreadScheduler;
      }(Scheduler));
      var currentThreadScheduler = Scheduler.currentThread = new CurrentThreadScheduler();
      var scheduleMethod,
          clearMethod;
      var localTimer = (function() {
        var localSetTimeout,
            localClearTimeout = noop;
        if (!!root.setTimeout) {
          localSetTimeout = root.setTimeout;
          localClearTimeout = root.clearTimeout;
        } else if (!!root.WScript) {
          localSetTimeout = function(fn, time) {
            root.WScript.Sleep(time);
            fn();
          };
        } else {
          throw new NotSupportedError();
        }
        return {
          setTimeout: localSetTimeout,
          clearTimeout: localClearTimeout
        };
      }());
      var localSetTimeout = localTimer.setTimeout,
          localClearTimeout = localTimer.clearTimeout;
      (function() {
        var nextHandle = 1,
            tasksByHandle = {},
            currentlyRunning = false;
        clearMethod = function(handle) {
          delete tasksByHandle[handle];
        };
        function runTask(handle) {
          if (currentlyRunning) {
            localSetTimeout(function() {
              runTask(handle);
            }, 0);
          } else {
            var task = tasksByHandle[handle];
            if (task) {
              currentlyRunning = true;
              var result = tryCatch(task)();
              clearMethod(handle);
              currentlyRunning = false;
              if (result === errorObj) {
                thrower(result.e);
              }
            }
          }
        }
        var reNative = new RegExp('^' + String(toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');
        var setImmediate = typeof(setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' && !reNative.test(setImmediate) && setImmediate;
        function postMessageSupported() {
          if (!root.postMessage || root.importScripts) {
            return false;
          }
          var isAsync = false,
              oldHandler = root.onmessage;
          root.onmessage = function() {
            isAsync = true;
          };
          root.postMessage('', '*');
          root.onmessage = oldHandler;
          return isAsync;
        }
        if (isFunction(setImmediate)) {
          scheduleMethod = function(action) {
            var id = nextHandle++;
            tasksByHandle[id] = action;
            setImmediate(function() {
              runTask(id);
            });
            return id;
          };
        } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
          scheduleMethod = function(action) {
            var id = nextHandle++;
            tasksByHandle[id] = action;
            process.nextTick(function() {
              runTask(id);
            });
            return id;
          };
        } else if (postMessageSupported()) {
          var MSG_PREFIX = 'ms.rx.schedule' + Math.random();
          var onGlobalPostMessage = function(event) {
            if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
              runTask(event.data.substring(MSG_PREFIX.length));
            }
          };
          root.addEventListener('message', onGlobalPostMessage, false);
          scheduleMethod = function(action) {
            var id = nextHandle++;
            tasksByHandle[id] = action;
            root.postMessage(MSG_PREFIX + id, '*');
            return id;
          };
        } else if (!!root.MessageChannel) {
          var channel = new root.MessageChannel();
          channel.port1.onmessage = function(e) {
            runTask(e.data);
          };
          scheduleMethod = function(action) {
            var id = nextHandle++;
            tasksByHandle[id] = action;
            channel.port2.postMessage(id);
            return id;
          };
        } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {
          scheduleMethod = function(action) {
            var scriptElement = root.document.createElement('script');
            var id = nextHandle++;
            tasksByHandle[id] = action;
            scriptElement.onreadystatechange = function() {
              runTask(id);
              scriptElement.onreadystatechange = null;
              scriptElement.parentNode.removeChild(scriptElement);
              scriptElement = null;
            };
            root.document.documentElement.appendChild(scriptElement);
            return id;
          };
        } else {
          scheduleMethod = function(action) {
            var id = nextHandle++;
            tasksByHandle[id] = action;
            localSetTimeout(function() {
              runTask(id);
            }, 0);
            return id;
          };
        }
      }());
      var DefaultScheduler = (function(__super__) {
        inherits(DefaultScheduler, __super__);
        function DefaultScheduler() {
          __super__.call(this);
        }
        function scheduleAction(disposable, action, scheduler, state) {
          return function schedule() {
            disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
          };
        }
        function ClearDisposable(id) {
          this._id = id;
          this.isDisposed = false;
        }
        ClearDisposable.prototype.dispose = function() {
          if (!this.isDisposed) {
            this.isDisposed = true;
            clearMethod(this._id);
          }
        };
        function LocalClearDisposable(id) {
          this._id = id;
          this.isDisposed = false;
        }
        LocalClearDisposable.prototype.dispose = function() {
          if (!this.isDisposed) {
            this.isDisposed = true;
            localClearTimeout(this._id);
          }
        };
        DefaultScheduler.prototype.schedule = function(state, action) {
          var disposable = new SingleAssignmentDisposable(),
              id = scheduleMethod(scheduleAction(disposable, action, this, state));
          return new BinaryDisposable(disposable, new ClearDisposable(id));
        };
        DefaultScheduler.prototype._scheduleFuture = function(state, dueTime, action) {
          if (dueTime === 0) {
            return this.schedule(state, action);
          }
          var disposable = new SingleAssignmentDisposable(),
              id = localSetTimeout(scheduleAction(disposable, action, this, state), dueTime);
          return new BinaryDisposable(disposable, new LocalClearDisposable(id));
        };
        function scheduleLongRunning(state, action, disposable) {
          return function() {
            action(state, disposable);
          };
        }
        DefaultScheduler.prototype.scheduleLongRunning = function(state, action) {
          var disposable = disposableCreate(noop);
          scheduleMethod(scheduleLongRunning(state, action, disposable));
          return disposable;
        };
        return DefaultScheduler;
      }(Scheduler));
      var defaultScheduler = Scheduler['default'] = Scheduler.async = new DefaultScheduler();
      var CatchScheduler = (function(__super__) {
        inherits(CatchScheduler, __super__);
        function CatchScheduler(scheduler, handler) {
          this._scheduler = scheduler;
          this._handler = handler;
          this._recursiveOriginal = null;
          this._recursiveWrapper = null;
          __super__.call(this);
        }
        CatchScheduler.prototype.schedule = function(state, action) {
          return this._scheduler.schedule(state, this._wrap(action));
        };
        CatchScheduler.prototype._scheduleFuture = function(state, dueTime, action) {
          return this._scheduler.schedule(state, dueTime, this._wrap(action));
        };
        CatchScheduler.prototype.now = function() {
          return this._scheduler.now();
        };
        CatchScheduler.prototype._clone = function(scheduler) {
          return new CatchScheduler(scheduler, this._handler);
        };
        CatchScheduler.prototype._wrap = function(action) {
          var parent = this;
          return function(self, state) {
            var res = tryCatch(action)(parent._getRecursiveWrapper(self), state);
            if (res === errorObj) {
              if (!parent._handler(res.e)) {
                thrower(res.e);
              }
              return disposableEmpty;
            }
            return disposableFixup(res);
          };
        };
        CatchScheduler.prototype._getRecursiveWrapper = function(scheduler) {
          if (this._recursiveOriginal !== scheduler) {
            this._recursiveOriginal = scheduler;
            var wrapper = this._clone(scheduler);
            wrapper._recursiveOriginal = scheduler;
            wrapper._recursiveWrapper = wrapper;
            this._recursiveWrapper = wrapper;
          }
          return this._recursiveWrapper;
        };
        CatchScheduler.prototype.schedulePeriodic = function(state, period, action) {
          var self = this,
              failed = false,
              d = new SingleAssignmentDisposable();
          d.setDisposable(this._scheduler.schedulePeriodic(state, period, function(state1) {
            if (failed) {
              return null;
            }
            var res = tryCatch(action)(state1);
            if (res === errorObj) {
              failed = true;
              if (!self._handler(res.e)) {
                thrower(res.e);
              }
              d.dispose();
              return null;
            }
            return res;
          }));
          return d;
        };
        return CatchScheduler;
      }(Scheduler));
      function IndexedItem(id, value) {
        this.id = id;
        this.value = value;
      }
      IndexedItem.prototype.compareTo = function(other) {
        var c = this.value.compareTo(other.value);
        c === 0 && (c = this.id - other.id);
        return c;
      };
      var PriorityQueue = Rx.internals.PriorityQueue = function(capacity) {
        this.items = new Array(capacity);
        this.length = 0;
      };
      var priorityProto = PriorityQueue.prototype;
      priorityProto.isHigherPriority = function(left, right) {
        return this.items[left].compareTo(this.items[right]) < 0;
      };
      priorityProto.percolate = function(index) {
        if (index >= this.length || index < 0) {
          return;
        }
        var parent = index - 1 >> 1;
        if (parent < 0 || parent === index) {
          return;
        }
        if (this.isHigherPriority(index, parent)) {
          var temp = this.items[index];
          this.items[index] = this.items[parent];
          this.items[parent] = temp;
          this.percolate(parent);
        }
      };
      priorityProto.heapify = function(index) {
        +index || (index = 0);
        if (index >= this.length || index < 0) {
          return;
        }
        var left = 2 * index + 1,
            right = 2 * index + 2,
            first = index;
        if (left < this.length && this.isHigherPriority(left, first)) {
          first = left;
        }
        if (right < this.length && this.isHigherPriority(right, first)) {
          first = right;
        }
        if (first !== index) {
          var temp = this.items[index];
          this.items[index] = this.items[first];
          this.items[first] = temp;
          this.heapify(first);
        }
      };
      priorityProto.peek = function() {
        return this.items[0].value;
      };
      priorityProto.removeAt = function(index) {
        this.items[index] = this.items[--this.length];
        this.items[this.length] = undefined;
        this.heapify();
      };
      priorityProto.dequeue = function() {
        var result = this.peek();
        this.removeAt(0);
        return result;
      };
      priorityProto.enqueue = function(item) {
        var index = this.length++;
        this.items[index] = new IndexedItem(PriorityQueue.count++, item);
        this.percolate(index);
      };
      priorityProto.remove = function(item) {
        for (var i = 0; i < this.length; i++) {
          if (this.items[i].value === item) {
            this.removeAt(i);
            return true;
          }
        }
        return false;
      };
      PriorityQueue.count = 0;
      var Notification = Rx.Notification = (function() {
        function Notification() {}
        Notification.prototype._accept = function(onNext, onError, onCompleted) {
          throw new NotImplementedError();
        };
        Notification.prototype._acceptObserver = function(onNext, onError, onCompleted) {
          throw new NotImplementedError();
        };
        Notification.prototype.accept = function(observerOrOnNext, onError, onCompleted) {
          return observerOrOnNext && typeof observerOrOnNext === 'object' ? this._acceptObserver(observerOrOnNext) : this._accept(observerOrOnNext, onError, onCompleted);
        };
        Notification.prototype.toObservable = function(scheduler) {
          var self = this;
          isScheduler(scheduler) || (scheduler = immediateScheduler);
          return new AnonymousObservable(function(o) {
            return scheduler.schedule(self, function(_, notification) {
              notification._acceptObserver(o);
              notification.kind === 'N' && o.onCompleted();
            });
          });
        };
        return Notification;
      })();
      var OnNextNotification = (function(__super__) {
        inherits(OnNextNotification, __super__);
        function OnNextNotification(value) {
          this.value = value;
          this.kind = 'N';
        }
        OnNextNotification.prototype._accept = function(onNext) {
          return onNext(this.value);
        };
        OnNextNotification.prototype._acceptObserver = function(o) {
          return o.onNext(this.value);
        };
        OnNextNotification.prototype.toString = function() {
          return 'OnNext(' + this.value + ')';
        };
        return OnNextNotification;
      }(Notification));
      var OnErrorNotification = (function(__super__) {
        inherits(OnErrorNotification, __super__);
        function OnErrorNotification(error) {
          this.error = error;
          this.kind = 'E';
        }
        OnErrorNotification.prototype._accept = function(onNext, onError) {
          return onError(this.error);
        };
        OnErrorNotification.prototype._acceptObserver = function(o) {
          return o.onError(this.error);
        };
        OnErrorNotification.prototype.toString = function() {
          return 'OnError(' + this.error + ')';
        };
        return OnErrorNotification;
      }(Notification));
      var OnCompletedNotification = (function(__super__) {
        inherits(OnCompletedNotification, __super__);
        function OnCompletedNotification() {
          this.kind = 'C';
        }
        OnCompletedNotification.prototype._accept = function(onNext, onError, onCompleted) {
          return onCompleted();
        };
        OnCompletedNotification.prototype._acceptObserver = function(o) {
          return o.onCompleted();
        };
        OnCompletedNotification.prototype.toString = function() {
          return 'OnCompleted()';
        };
        return OnCompletedNotification;
      }(Notification));
      var notificationCreateOnNext = Notification.createOnNext = function(value) {
        return new OnNextNotification(value);
      };
      var notificationCreateOnError = Notification.createOnError = function(error) {
        return new OnErrorNotification(error);
      };
      var notificationCreateOnCompleted = Notification.createOnCompleted = function() {
        return new OnCompletedNotification();
      };
      var Observer = Rx.Observer = function() {};
      Observer.prototype.toNotifier = function() {
        var observer = this;
        return function(n) {
          return n.accept(observer);
        };
      };
      Observer.prototype.asObserver = function() {
        var self = this;
        return new AnonymousObserver(function(x) {
          self.onNext(x);
        }, function(err) {
          self.onError(err);
        }, function() {
          self.onCompleted();
        });
      };
      Observer.prototype.checked = function() {
        return new CheckedObserver(this);
      };
      var observerCreate = Observer.create = function(onNext, onError, onCompleted) {
        onNext || (onNext = noop);
        onError || (onError = defaultError);
        onCompleted || (onCompleted = noop);
        return new AnonymousObserver(onNext, onError, onCompleted);
      };
      Observer.fromNotifier = function(handler, thisArg) {
        var cb = bindCallback(handler, thisArg, 1);
        return new AnonymousObserver(function(x) {
          return cb(notificationCreateOnNext(x));
        }, function(e) {
          return cb(notificationCreateOnError(e));
        }, function() {
          return cb(notificationCreateOnCompleted());
        });
      };
      Observer.prototype.notifyOn = function(scheduler) {
        return new ObserveOnObserver(scheduler, this);
      };
      Observer.prototype.makeSafe = function(disposable) {
        return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
      };
      var AbstractObserver = Rx.internals.AbstractObserver = (function(__super__) {
        inherits(AbstractObserver, __super__);
        function AbstractObserver() {
          this.isStopped = false;
        }
        AbstractObserver.prototype.next = notImplemented;
        AbstractObserver.prototype.error = notImplemented;
        AbstractObserver.prototype.completed = notImplemented;
        AbstractObserver.prototype.onNext = function(value) {
          !this.isStopped && this.next(value);
        };
        AbstractObserver.prototype.onError = function(error) {
          if (!this.isStopped) {
            this.isStopped = true;
            this.error(error);
          }
        };
        AbstractObserver.prototype.onCompleted = function() {
          if (!this.isStopped) {
            this.isStopped = true;
            this.completed();
          }
        };
        AbstractObserver.prototype.dispose = function() {
          this.isStopped = true;
        };
        AbstractObserver.prototype.fail = function(e) {
          if (!this.isStopped) {
            this.isStopped = true;
            this.error(e);
            return true;
          }
          return false;
        };
        return AbstractObserver;
      }(Observer));
      var AnonymousObserver = Rx.AnonymousObserver = (function(__super__) {
        inherits(AnonymousObserver, __super__);
        function AnonymousObserver(onNext, onError, onCompleted) {
          __super__.call(this);
          this._onNext = onNext;
          this._onError = onError;
          this._onCompleted = onCompleted;
        }
        AnonymousObserver.prototype.next = function(value) {
          this._onNext(value);
        };
        AnonymousObserver.prototype.error = function(error) {
          this._onError(error);
        };
        AnonymousObserver.prototype.completed = function() {
          this._onCompleted();
        };
        return AnonymousObserver;
      }(AbstractObserver));
      var CheckedObserver = (function(__super__) {
        inherits(CheckedObserver, __super__);
        function CheckedObserver(observer) {
          __super__.call(this);
          this._observer = observer;
          this._state = 0;
        }
        var CheckedObserverPrototype = CheckedObserver.prototype;
        CheckedObserverPrototype.onNext = function(value) {
          this.checkAccess();
          var res = tryCatch(this._observer.onNext).call(this._observer, value);
          this._state = 0;
          res === errorObj && thrower(res.e);
        };
        CheckedObserverPrototype.onError = function(err) {
          this.checkAccess();
          var res = tryCatch(this._observer.onError).call(this._observer, err);
          this._state = 2;
          res === errorObj && thrower(res.e);
        };
        CheckedObserverPrototype.onCompleted = function() {
          this.checkAccess();
          var res = tryCatch(this._observer.onCompleted).call(this._observer);
          this._state = 2;
          res === errorObj && thrower(res.e);
        };
        CheckedObserverPrototype.checkAccess = function() {
          if (this._state === 1) {
            throw new Error('Re-entrancy detected');
          }
          if (this._state === 2) {
            throw new Error('Observer completed');
          }
          if (this._state === 0) {
            this._state = 1;
          }
        };
        return CheckedObserver;
      }(Observer));
      var ScheduledObserver = Rx.internals.ScheduledObserver = (function(__super__) {
        inherits(ScheduledObserver, __super__);
        function ScheduledObserver(scheduler, observer) {
          __super__.call(this);
          this.scheduler = scheduler;
          this.observer = observer;
          this.isAcquired = false;
          this.hasFaulted = false;
          this.queue = [];
          this.disposable = new SerialDisposable();
        }
        function enqueueNext(observer, x) {
          return function() {
            observer.onNext(x);
          };
        }
        function enqueueError(observer, e) {
          return function() {
            observer.onError(e);
          };
        }
        function enqueueCompleted(observer) {
          return function() {
            observer.onCompleted();
          };
        }
        ScheduledObserver.prototype.next = function(x) {
          this.queue.push(enqueueNext(this.observer, x));
        };
        ScheduledObserver.prototype.error = function(e) {
          this.queue.push(enqueueError(this.observer, e));
        };
        ScheduledObserver.prototype.completed = function() {
          this.queue.push(enqueueCompleted(this.observer));
        };
        function scheduleMethod(state, recurse) {
          var work;
          if (state.queue.length > 0) {
            work = state.queue.shift();
          } else {
            state.isAcquired = false;
            return;
          }
          var res = tryCatch(work)();
          if (res === errorObj) {
            state.queue = [];
            state.hasFaulted = true;
            return thrower(res.e);
          }
          recurse(state);
        }
        ScheduledObserver.prototype.ensureActive = function() {
          var isOwner = false;
          if (!this.hasFaulted && this.queue.length > 0) {
            isOwner = !this.isAcquired;
            this.isAcquired = true;
          }
          isOwner && this.disposable.setDisposable(this.scheduler.scheduleRecursive(this, scheduleMethod));
        };
        ScheduledObserver.prototype.dispose = function() {
          __super__.prototype.dispose.call(this);
          this.disposable.dispose();
        };
        return ScheduledObserver;
      }(AbstractObserver));
      var ObserveOnObserver = (function(__super__) {
        inherits(ObserveOnObserver, __super__);
        function ObserveOnObserver(scheduler, observer, cancel) {
          __super__.call(this, scheduler, observer);
          this._cancel = cancel;
        }
        ObserveOnObserver.prototype.next = function(value) {
          __super__.prototype.next.call(this, value);
          this.ensureActive();
        };
        ObserveOnObserver.prototype.error = function(e) {
          __super__.prototype.error.call(this, e);
          this.ensureActive();
        };
        ObserveOnObserver.prototype.completed = function() {
          __super__.prototype.completed.call(this);
          this.ensureActive();
        };
        ObserveOnObserver.prototype.dispose = function() {
          __super__.prototype.dispose.call(this);
          this._cancel && this._cancel.dispose();
          this._cancel = null;
        };
        return ObserveOnObserver;
      })(ScheduledObserver);
      var observableProto;
      var Observable = Rx.Observable = (function() {
        function makeSubscribe(self, subscribe) {
          return function(o) {
            var oldOnError = o.onError;
            o.onError = function(e) {
              makeStackTraceLong(e, self);
              oldOnError.call(o, e);
            };
            return subscribe.call(self, o);
          };
        }
        function Observable() {
          if (Rx.config.longStackSupport && hasStacks) {
            var oldSubscribe = this._subscribe;
            var e = tryCatch(thrower)(new Error()).e;
            this.stack = e.stack.substring(e.stack.indexOf('\n') + 1);
            this._subscribe = makeSubscribe(this, oldSubscribe);
          }
        }
        observableProto = Observable.prototype;
        Observable.isObservable = function(o) {
          return o && isFunction(o.subscribe);
        };
        observableProto.subscribe = observableProto.forEach = function(oOrOnNext, onError, onCompleted) {
          return this._subscribe(typeof oOrOnNext === 'object' ? oOrOnNext : observerCreate(oOrOnNext, onError, onCompleted));
        };
        observableProto.subscribeOnNext = function(onNext, thisArg) {
          return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) {
            onNext.call(thisArg, x);
          } : onNext));
        };
        observableProto.subscribeOnError = function(onError, thisArg) {
          return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) {
            onError.call(thisArg, e);
          } : onError));
        };
        observableProto.subscribeOnCompleted = function(onCompleted, thisArg) {
          return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() {
            onCompleted.call(thisArg);
          } : onCompleted));
        };
        return Observable;
      })();
      var ObservableBase = Rx.ObservableBase = (function(__super__) {
        inherits(ObservableBase, __super__);
        function fixSubscriber(subscriber) {
          return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
        }
        function setDisposable(s, state) {
          var ado = state[0],
              self = state[1];
          var sub = tryCatch(self.subscribeCore).call(self, ado);
          if (sub === errorObj && !ado.fail(errorObj.e)) {
            thrower(errorObj.e);
          }
          ado.setDisposable(fixSubscriber(sub));
        }
        function ObservableBase() {
          __super__.call(this);
        }
        ObservableBase.prototype._subscribe = function(o) {
          var ado = new AutoDetachObserver(o),
              state = [ado, this];
          if (currentThreadScheduler.scheduleRequired()) {
            currentThreadScheduler.schedule(state, setDisposable);
          } else {
            setDisposable(null, state);
          }
          return ado;
        };
        ObservableBase.prototype.subscribeCore = notImplemented;
        return ObservableBase;
      }(Observable));
      var FlatMapObservable = Rx.FlatMapObservable = (function(__super__) {
        inherits(FlatMapObservable, __super__);
        function FlatMapObservable(source, selector, resultSelector, thisArg) {
          this.resultSelector = isFunction(resultSelector) ? resultSelector : null;
          this.selector = bindCallback(isFunction(selector) ? selector : function() {
            return selector;
          }, thisArg, 3);
          this.source = source;
          __super__.call(this);
        }
        FlatMapObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o, this.selector, this.resultSelector, this));
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(observer, selector, resultSelector, source) {
          this.i = 0;
          this.selector = selector;
          this.resultSelector = resultSelector;
          this.source = source;
          this.o = observer;
          AbstractObserver.call(this);
        }
        InnerObserver.prototype._wrapResult = function(result, x, i) {
          return this.resultSelector ? result.map(function(y, i2) {
            return this.resultSelector(x, y, i, i2);
          }, this) : result;
        };
        InnerObserver.prototype.next = function(x) {
          var i = this.i++;
          var result = tryCatch(this.selector)(x, i, this.source);
          if (result === errorObj) {
            return this.o.onError(result.e);
          }
          isPromise(result) && (result = observableFromPromise(result));
          (isArrayLike(result) || isIterable(result)) && (result = Observable.from(result));
          this.o.onNext(this._wrapResult(result, x, i));
        };
        InnerObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.o.onCompleted();
        };
        return FlatMapObservable;
      }(ObservableBase));
      var Enumerable = Rx.internals.Enumerable = function() {};
      function IsDisposedDisposable(state) {
        this._s = state;
        this.isDisposed = false;
      }
      IsDisposedDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          this._s.isDisposed = true;
        }
      };
      var ConcatEnumerableObservable = (function(__super__) {
        inherits(ConcatEnumerableObservable, __super__);
        function ConcatEnumerableObservable(sources) {
          this.sources = sources;
          __super__.call(this);
        }
        function scheduleMethod(state, recurse) {
          if (state.isDisposed) {
            return;
          }
          var currentItem = tryCatch(state.e.next).call(state.e);
          if (currentItem === errorObj) {
            return state.o.onError(currentItem.e);
          }
          if (currentItem.done) {
            return state.o.onCompleted();
          }
          var currentValue = currentItem.value;
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var d = new SingleAssignmentDisposable();
          state.subscription.setDisposable(d);
          d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
        }
        ConcatEnumerableObservable.prototype.subscribeCore = function(o) {
          var subscription = new SerialDisposable();
          var state = {
            isDisposed: false,
            o: o,
            subscription: subscription,
            e: this.sources[$iterator$]()
          };
          var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
          return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
        };
        function InnerObserver(state, recurse) {
          this._state = state;
          this._recurse = recurse;
          AbstractObserver.call(this);
        }
        inherits(InnerObserver, AbstractObserver);
        InnerObserver.prototype.next = function(x) {
          this._state.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this._state.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this._recurse(this._state);
        };
        return ConcatEnumerableObservable;
      }(ObservableBase));
      Enumerable.prototype.concat = function() {
        return new ConcatEnumerableObservable(this);
      };
      var CatchErrorObservable = (function(__super__) {
        function CatchErrorObservable(sources) {
          this.sources = sources;
          __super__.call(this);
        }
        inherits(CatchErrorObservable, __super__);
        function scheduleMethod(state, recurse) {
          if (state.isDisposed) {
            return;
          }
          var currentItem = tryCatch(state.e.next).call(state.e);
          if (currentItem === errorObj) {
            return state.o.onError(currentItem.e);
          }
          if (currentItem.done) {
            return state.lastError !== null ? state.o.onError(state.lastError) : state.o.onCompleted();
          }
          var currentValue = currentItem.value;
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var d = new SingleAssignmentDisposable();
          state.subscription.setDisposable(d);
          d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
        }
        CatchErrorObservable.prototype.subscribeCore = function(o) {
          var subscription = new SerialDisposable();
          var state = {
            isDisposed: false,
            e: this.sources[$iterator$](),
            subscription: subscription,
            lastError: null,
            o: o
          };
          var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
          return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
        };
        function InnerObserver(state, recurse) {
          this._state = state;
          this._recurse = recurse;
          AbstractObserver.call(this);
        }
        inherits(InnerObserver, AbstractObserver);
        InnerObserver.prototype.next = function(x) {
          this._state.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this._state.lastError = e;
          this._recurse(this._state);
        };
        InnerObserver.prototype.completed = function() {
          this._state.o.onCompleted();
        };
        return CatchErrorObservable;
      }(ObservableBase));
      Enumerable.prototype.catchError = function() {
        return new CatchErrorObservable(this);
      };
      var RepeatEnumerable = (function(__super__) {
        inherits(RepeatEnumerable, __super__);
        function RepeatEnumerable(v, c) {
          this.v = v;
          this.c = c == null ? -1 : c;
        }
        RepeatEnumerable.prototype[$iterator$] = function() {
          return new RepeatEnumerator(this);
        };
        function RepeatEnumerator(p) {
          this.v = p.v;
          this.l = p.c;
        }
        RepeatEnumerator.prototype.next = function() {
          if (this.l === 0) {
            return doneEnumerator;
          }
          if (this.l > 0) {
            this.l--;
          }
          return {
            done: false,
            value: this.v
          };
        };
        return RepeatEnumerable;
      }(Enumerable));
      var enumerableRepeat = Enumerable.repeat = function(value, repeatCount) {
        return new RepeatEnumerable(value, repeatCount);
      };
      var OfEnumerable = (function(__super__) {
        inherits(OfEnumerable, __super__);
        function OfEnumerable(s, fn, thisArg) {
          this.s = s;
          this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
        }
        OfEnumerable.prototype[$iterator$] = function() {
          return new OfEnumerator(this);
        };
        function OfEnumerator(p) {
          this.i = -1;
          this.s = p.s;
          this.l = this.s.length;
          this.fn = p.fn;
        }
        OfEnumerator.prototype.next = function() {
          return ++this.i < this.l ? {
            done: false,
            value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s)
          } : doneEnumerator;
        };
        return OfEnumerable;
      }(Enumerable));
      var enumerableOf = Enumerable.of = function(source, selector, thisArg) {
        return new OfEnumerable(source, selector, thisArg);
      };
      var ObserveOnObservable = (function(__super__) {
        inherits(ObserveOnObservable, __super__);
        function ObserveOnObservable(source, s) {
          this.source = source;
          this._s = s;
          __super__.call(this);
        }
        ObserveOnObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new ObserveOnObserver(this._s, o));
        };
        return ObserveOnObservable;
      }(ObservableBase));
      observableProto.observeOn = function(scheduler) {
        return new ObserveOnObservable(this, scheduler);
      };
      var SubscribeOnObservable = (function(__super__) {
        inherits(SubscribeOnObservable, __super__);
        function SubscribeOnObservable(source, s) {
          this.source = source;
          this._s = s;
          __super__.call(this);
        }
        function scheduleMethod(scheduler, state) {
          var source = state[0],
              d = state[1],
              o = state[2];
          d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(o)));
        }
        SubscribeOnObservable.prototype.subscribeCore = function(o) {
          var m = new SingleAssignmentDisposable(),
              d = new SerialDisposable();
          d.setDisposable(m);
          m.setDisposable(this._s.schedule([this.source, d, o], scheduleMethod));
          return d;
        };
        return SubscribeOnObservable;
      }(ObservableBase));
      observableProto.subscribeOn = function(scheduler) {
        return new SubscribeOnObservable(this, scheduler);
      };
      var FromPromiseObservable = (function(__super__) {
        inherits(FromPromiseObservable, __super__);
        function FromPromiseObservable(p, s) {
          this._p = p;
          this._s = s;
          __super__.call(this);
        }
        function scheduleNext(s, state) {
          var o = state[0],
              data = state[1];
          o.onNext(data);
          o.onCompleted();
        }
        function scheduleError(s, state) {
          var o = state[0],
              err = state[1];
          o.onError(err);
        }
        FromPromiseObservable.prototype.subscribeCore = function(o) {
          var sad = new SingleAssignmentDisposable(),
              self = this,
              p = this._p;
          if (isFunction(p)) {
            p = tryCatch(p)();
            if (p === errorObj) {
              o.onError(p.e);
              return sad;
            }
          }
          p.then(function(data) {
            sad.setDisposable(self._s.schedule([o, data], scheduleNext));
          }, function(err) {
            sad.setDisposable(self._s.schedule([o, err], scheduleError));
          });
          return sad;
        };
        return FromPromiseObservable;
      }(ObservableBase));
      var observableFromPromise = Observable.fromPromise = function(promise, scheduler) {
        scheduler || (scheduler = defaultScheduler);
        return new FromPromiseObservable(promise, scheduler);
      };
      observableProto.toPromise = function(promiseCtor) {
        promiseCtor || (promiseCtor = Rx.config.Promise);
        if (!promiseCtor) {
          throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise');
        }
        var source = this;
        return new promiseCtor(function(resolve, reject) {
          var value;
          source.subscribe(function(v) {
            value = v;
          }, reject, function() {
            resolve(value);
          });
        });
      };
      var ToArrayObservable = (function(__super__) {
        inherits(ToArrayObservable, __super__);
        function ToArrayObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        ToArrayObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o));
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(o) {
          this.o = o;
          this.a = [];
          AbstractObserver.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          this.a.push(x);
        };
        InnerObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.o.onNext(this.a);
          this.o.onCompleted();
        };
        return ToArrayObservable;
      }(ObservableBase));
      observableProto.toArray = function() {
        return new ToArrayObservable(this);
      };
      Observable.create = function(subscribe, parent) {
        return new AnonymousObservable(subscribe, parent);
      };
      var Defer = (function(__super__) {
        inherits(Defer, __super__);
        function Defer(factory) {
          this._f = factory;
          __super__.call(this);
        }
        Defer.prototype.subscribeCore = function(o) {
          var result = tryCatch(this._f)();
          if (result === errorObj) {
            return observableThrow(result.e).subscribe(o);
          }
          isPromise(result) && (result = observableFromPromise(result));
          return result.subscribe(o);
        };
        return Defer;
      }(ObservableBase));
      var observableDefer = Observable.defer = function(observableFactory) {
        return new Defer(observableFactory);
      };
      var EmptyObservable = (function(__super__) {
        inherits(EmptyObservable, __super__);
        function EmptyObservable(scheduler) {
          this.scheduler = scheduler;
          __super__.call(this);
        }
        EmptyObservable.prototype.subscribeCore = function(observer) {
          var sink = new EmptySink(observer, this.scheduler);
          return sink.run();
        };
        function EmptySink(observer, scheduler) {
          this.observer = observer;
          this.scheduler = scheduler;
        }
        function scheduleItem(s, state) {
          state.onCompleted();
          return disposableEmpty;
        }
        EmptySink.prototype.run = function() {
          var state = this.observer;
          return this.scheduler === immediateScheduler ? scheduleItem(null, state) : this.scheduler.schedule(state, scheduleItem);
        };
        return EmptyObservable;
      }(ObservableBase));
      var EMPTY_OBSERVABLE = new EmptyObservable(immediateScheduler);
      var observableEmpty = Observable.empty = function(scheduler) {
        isScheduler(scheduler) || (scheduler = immediateScheduler);
        return scheduler === immediateScheduler ? EMPTY_OBSERVABLE : new EmptyObservable(scheduler);
      };
      var FromObservable = (function(__super__) {
        inherits(FromObservable, __super__);
        function FromObservable(iterable, fn, scheduler) {
          this._iterable = iterable;
          this._fn = fn;
          this._scheduler = scheduler;
          __super__.call(this);
        }
        function createScheduleMethod(o, it, fn) {
          return function loopRecursive(i, recurse) {
            var next = tryCatch(it.next).call(it);
            if (next === errorObj) {
              return o.onError(next.e);
            }
            if (next.done) {
              return o.onCompleted();
            }
            var result = next.value;
            if (isFunction(fn)) {
              result = tryCatch(fn)(result, i);
              if (result === errorObj) {
                return o.onError(result.e);
              }
            }
            o.onNext(result);
            recurse(i + 1);
          };
        }
        FromObservable.prototype.subscribeCore = function(o) {
          var list = Object(this._iterable),
              it = getIterable(list);
          return this._scheduler.scheduleRecursive(0, createScheduleMethod(o, it, this._fn));
        };
        return FromObservable;
      }(ObservableBase));
      var maxSafeInteger = Math.pow(2, 53) - 1;
      function StringIterable(s) {
        this._s = s;
      }
      StringIterable.prototype[$iterator$] = function() {
        return new StringIterator(this._s);
      };
      function StringIterator(s) {
        this._s = s;
        this._l = s.length;
        this._i = 0;
      }
      StringIterator.prototype[$iterator$] = function() {
        return this;
      };
      StringIterator.prototype.next = function() {
        return this._i < this._l ? {
          done: false,
          value: this._s.charAt(this._i++)
        } : doneEnumerator;
      };
      function ArrayIterable(a) {
        this._a = a;
      }
      ArrayIterable.prototype[$iterator$] = function() {
        return new ArrayIterator(this._a);
      };
      function ArrayIterator(a) {
        this._a = a;
        this._l = toLength(a);
        this._i = 0;
      }
      ArrayIterator.prototype[$iterator$] = function() {
        return this;
      };
      ArrayIterator.prototype.next = function() {
        return this._i < this._l ? {
          done: false,
          value: this._a[this._i++]
        } : doneEnumerator;
      };
      function numberIsFinite(value) {
        return typeof value === 'number' && root.isFinite(value);
      }
      function isNan(n) {
        return n !== n;
      }
      function getIterable(o) {
        var i = o[$iterator$],
            it;
        if (!i && typeof o === 'string') {
          it = new StringIterable(o);
          return it[$iterator$]();
        }
        if (!i && o.length !== undefined) {
          it = new ArrayIterable(o);
          return it[$iterator$]();
        }
        if (!i) {
          throw new TypeError('Object is not iterable');
        }
        return o[$iterator$]();
      }
      function sign(value) {
        var number = +value;
        if (number === 0) {
          return number;
        }
        if (isNaN(number)) {
          return number;
        }
        return number < 0 ? -1 : 1;
      }
      function toLength(o) {
        var len = +o.length;
        if (isNaN(len)) {
          return 0;
        }
        if (len === 0 || !numberIsFinite(len)) {
          return len;
        }
        len = sign(len) * Math.floor(Math.abs(len));
        if (len <= 0) {
          return 0;
        }
        if (len > maxSafeInteger) {
          return maxSafeInteger;
        }
        return len;
      }
      var observableFrom = Observable.from = function(iterable, mapFn, thisArg, scheduler) {
        if (iterable == null) {
          throw new Error('iterable cannot be null.');
        }
        if (mapFn && !isFunction(mapFn)) {
          throw new Error('mapFn when provided must be a function');
        }
        if (mapFn) {
          var mapper = bindCallback(mapFn, thisArg, 2);
        }
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new FromObservable(iterable, mapper, scheduler);
      };
      var FromArrayObservable = (function(__super__) {
        inherits(FromArrayObservable, __super__);
        function FromArrayObservable(args, scheduler) {
          this._args = args;
          this._scheduler = scheduler;
          __super__.call(this);
        }
        function scheduleMethod(o, args) {
          var len = args.length;
          return function loopRecursive(i, recurse) {
            if (i < len) {
              o.onNext(args[i]);
              recurse(i + 1);
            } else {
              o.onCompleted();
            }
          };
        }
        FromArrayObservable.prototype.subscribeCore = function(o) {
          return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._args));
        };
        return FromArrayObservable;
      }(ObservableBase));
      var observableFromArray = Observable.fromArray = function(array, scheduler) {
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new FromArrayObservable(array, scheduler);
      };
      var GenerateObservable = (function(__super__) {
        inherits(GenerateObservable, __super__);
        function GenerateObservable(state, cndFn, itrFn, resFn, s) {
          this._initialState = state;
          this._cndFn = cndFn;
          this._itrFn = itrFn;
          this._resFn = resFn;
          this._s = s;
          __super__.call(this);
        }
        function scheduleRecursive(state, recurse) {
          if (state.first) {
            state.first = false;
          } else {
            state.newState = tryCatch(state.self._itrFn)(state.newState);
            if (state.newState === errorObj) {
              return state.o.onError(state.newState.e);
            }
          }
          var hasResult = tryCatch(state.self._cndFn)(state.newState);
          if (hasResult === errorObj) {
            return state.o.onError(hasResult.e);
          }
          if (hasResult) {
            var result = tryCatch(state.self._resFn)(state.newState);
            if (result === errorObj) {
              return state.o.onError(result.e);
            }
            state.o.onNext(result);
            recurse(state);
          } else {
            state.o.onCompleted();
          }
        }
        GenerateObservable.prototype.subscribeCore = function(o) {
          var state = {
            o: o,
            self: this,
            first: true,
            newState: this._initialState
          };
          return this._s.scheduleRecursive(state, scheduleRecursive);
        };
        return GenerateObservable;
      }(ObservableBase));
      Observable.generate = function(initialState, condition, iterate, resultSelector, scheduler) {
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new GenerateObservable(initialState, condition, iterate, resultSelector, scheduler);
      };
      var NeverObservable = (function(__super__) {
        inherits(NeverObservable, __super__);
        function NeverObservable() {
          __super__.call(this);
        }
        NeverObservable.prototype.subscribeCore = function(observer) {
          return disposableEmpty;
        };
        return NeverObservable;
      }(ObservableBase));
      var NEVER_OBSERVABLE = new NeverObservable();
      var observableNever = Observable.never = function() {
        return NEVER_OBSERVABLE;
      };
      function observableOf(scheduler, array) {
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new FromArrayObservable(array, scheduler);
      }
      Observable.of = function() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return new FromArrayObservable(args, currentThreadScheduler);
      };
      Observable.ofWithScheduler = function(scheduler) {
        var len = arguments.length,
            args = new Array(len - 1);
        for (var i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        return new FromArrayObservable(args, scheduler);
      };
      var PairsObservable = (function(__super__) {
        inherits(PairsObservable, __super__);
        function PairsObservable(o, scheduler) {
          this._o = o;
          this._keys = Object.keys(o);
          this._scheduler = scheduler;
          __super__.call(this);
        }
        function scheduleMethod(o, obj, keys) {
          return function loopRecursive(i, recurse) {
            if (i < keys.length) {
              var key = keys[i];
              o.onNext([key, obj[key]]);
              recurse(i + 1);
            } else {
              o.onCompleted();
            }
          };
        }
        PairsObservable.prototype.subscribeCore = function(o) {
          return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._o, this._keys));
        };
        return PairsObservable;
      }(ObservableBase));
      Observable.pairs = function(obj, scheduler) {
        scheduler || (scheduler = currentThreadScheduler);
        return new PairsObservable(obj, scheduler);
      };
      var RangeObservable = (function(__super__) {
        inherits(RangeObservable, __super__);
        function RangeObservable(start, count, scheduler) {
          this.start = start;
          this.rangeCount = count;
          this.scheduler = scheduler;
          __super__.call(this);
        }
        function loopRecursive(start, count, o) {
          return function loop(i, recurse) {
            if (i < count) {
              o.onNext(start + i);
              recurse(i + 1);
            } else {
              o.onCompleted();
            }
          };
        }
        RangeObservable.prototype.subscribeCore = function(o) {
          return this.scheduler.scheduleRecursive(0, loopRecursive(this.start, this.rangeCount, o));
        };
        return RangeObservable;
      }(ObservableBase));
      Observable.range = function(start, count, scheduler) {
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new RangeObservable(start, count, scheduler);
      };
      var RepeatObservable = (function(__super__) {
        inherits(RepeatObservable, __super__);
        function RepeatObservable(value, repeatCount, scheduler) {
          this.value = value;
          this.repeatCount = repeatCount == null ? -1 : repeatCount;
          this.scheduler = scheduler;
          __super__.call(this);
        }
        RepeatObservable.prototype.subscribeCore = function(observer) {
          var sink = new RepeatSink(observer, this);
          return sink.run();
        };
        return RepeatObservable;
      }(ObservableBase));
      function RepeatSink(observer, parent) {
        this.observer = observer;
        this.parent = parent;
      }
      RepeatSink.prototype.run = function() {
        var observer = this.observer,
            value = this.parent.value;
        function loopRecursive(i, recurse) {
          if (i === -1 || i > 0) {
            observer.onNext(value);
            i > 0 && i--;
          }
          if (i === 0) {
            return observer.onCompleted();
          }
          recurse(i);
        }
        return this.parent.scheduler.scheduleRecursive(this.parent.repeatCount, loopRecursive);
      };
      Observable.repeat = function(value, repeatCount, scheduler) {
        isScheduler(scheduler) || (scheduler = currentThreadScheduler);
        return new RepeatObservable(value, repeatCount, scheduler);
      };
      var JustObservable = (function(__super__) {
        inherits(JustObservable, __super__);
        function JustObservable(value, scheduler) {
          this._value = value;
          this._scheduler = scheduler;
          __super__.call(this);
        }
        JustObservable.prototype.subscribeCore = function(o) {
          var state = [this._value, o];
          return this._scheduler === immediateScheduler ? scheduleItem(null, state) : this._scheduler.schedule(state, scheduleItem);
        };
        function scheduleItem(s, state) {
          var value = state[0],
              observer = state[1];
          observer.onNext(value);
          observer.onCompleted();
          return disposableEmpty;
        }
        return JustObservable;
      }(ObservableBase));
      var observableReturn = Observable['return'] = Observable.just = function(value, scheduler) {
        isScheduler(scheduler) || (scheduler = immediateScheduler);
        return new JustObservable(value, scheduler);
      };
      var ThrowObservable = (function(__super__) {
        inherits(ThrowObservable, __super__);
        function ThrowObservable(error, scheduler) {
          this._error = error;
          this._scheduler = scheduler;
          __super__.call(this);
        }
        ThrowObservable.prototype.subscribeCore = function(o) {
          var state = [this._error, o];
          return this._scheduler === immediateScheduler ? scheduleItem(null, state) : this._scheduler.schedule(state, scheduleItem);
        };
        function scheduleItem(s, state) {
          var e = state[0],
              o = state[1];
          o.onError(e);
          return disposableEmpty;
        }
        return ThrowObservable;
      }(ObservableBase));
      var observableThrow = Observable['throw'] = function(error, scheduler) {
        isScheduler(scheduler) || (scheduler = immediateScheduler);
        return new ThrowObservable(error, scheduler);
      };
      var UsingObservable = (function(__super__) {
        inherits(UsingObservable, __super__);
        function UsingObservable(resFn, obsFn) {
          this._resFn = resFn;
          this._obsFn = obsFn;
          __super__.call(this);
        }
        UsingObservable.prototype.subscribeCore = function(o) {
          var disposable = disposableEmpty;
          var resource = tryCatch(this._resFn)();
          if (resource === errorObj) {
            return new BinaryDisposable(observableThrow(resource.e).subscribe(o), disposable);
          }
          resource && (disposable = resource);
          var source = tryCatch(this._obsFn)(resource);
          if (source === errorObj) {
            return new BinaryDisposable(observableThrow(source.e).subscribe(o), disposable);
          }
          return new BinaryDisposable(source.subscribe(o), disposable);
        };
        return UsingObservable;
      }(ObservableBase));
      Observable.using = function(resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
      };
      observableProto.amb = function(rightSource) {
        var leftSource = this;
        return new AnonymousObservable(function(observer) {
          var choice,
              leftChoice = 'L',
              rightChoice = 'R',
              leftSubscription = new SingleAssignmentDisposable(),
              rightSubscription = new SingleAssignmentDisposable();
          isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));
          function choiceL() {
            if (!choice) {
              choice = leftChoice;
              rightSubscription.dispose();
            }
          }
          function choiceR() {
            if (!choice) {
              choice = rightChoice;
              leftSubscription.dispose();
            }
          }
          var leftSubscribe = observerCreate(function(left) {
            choiceL();
            choice === leftChoice && observer.onNext(left);
          }, function(e) {
            choiceL();
            choice === leftChoice && observer.onError(e);
          }, function() {
            choiceL();
            choice === leftChoice && observer.onCompleted();
          });
          var rightSubscribe = observerCreate(function(right) {
            choiceR();
            choice === rightChoice && observer.onNext(right);
          }, function(e) {
            choiceR();
            choice === rightChoice && observer.onError(e);
          }, function() {
            choiceR();
            choice === rightChoice && observer.onCompleted();
          });
          leftSubscription.setDisposable(leftSource.subscribe(leftSubscribe));
          rightSubscription.setDisposable(rightSource.subscribe(rightSubscribe));
          return new BinaryDisposable(leftSubscription, rightSubscription);
        });
      };
      function amb(p, c) {
        return p.amb(c);
      }
      Observable.amb = function() {
        var acc = observableNever(),
            items;
        if (Array.isArray(arguments[0])) {
          items = arguments[0];
        } else {
          var len = arguments.length;
          items = new Array(items);
          for (var i = 0; i < len; i++) {
            items[i] = arguments[i];
          }
        }
        for (var i = 0,
            len = items.length; i < len; i++) {
          acc = amb(acc, items[i]);
        }
        return acc;
      };
      var CatchObservable = (function(__super__) {
        inherits(CatchObservable, __super__);
        function CatchObservable(source, fn) {
          this.source = source;
          this._fn = fn;
          __super__.call(this);
        }
        CatchObservable.prototype.subscribeCore = function(o) {
          var d1 = new SingleAssignmentDisposable(),
              subscription = new SerialDisposable();
          subscription.setDisposable(d1);
          d1.setDisposable(this.source.subscribe(new CatchObserver(o, subscription, this._fn)));
          return subscription;
        };
        return CatchObservable;
      }(ObservableBase));
      var CatchObserver = (function(__super__) {
        inherits(CatchObserver, __super__);
        function CatchObserver(o, s, fn) {
          this._o = o;
          this._s = s;
          this._fn = fn;
          __super__.call(this);
        }
        CatchObserver.prototype.next = function(x) {
          this._o.onNext(x);
        };
        CatchObserver.prototype.completed = function() {
          return this._o.onCompleted();
        };
        CatchObserver.prototype.error = function(e) {
          var result = tryCatch(this._fn)(e);
          if (result === errorObj) {
            return this._o.onError(result.e);
          }
          isPromise(result) && (result = observableFromPromise(result));
          var d = new SingleAssignmentDisposable();
          this._s.setDisposable(d);
          d.setDisposable(result.subscribe(this._o));
        };
        return CatchObserver;
      }(AbstractObserver));
      observableProto['catch'] = function(handlerOrSecond) {
        return isFunction(handlerOrSecond) ? new CatchObservable(this, handlerOrSecond) : observableCatch([this, handlerOrSecond]);
      };
      var observableCatch = Observable['catch'] = function() {
        var items;
        if (Array.isArray(arguments[0])) {
          items = arguments[0];
        } else {
          var len = arguments.length;
          items = new Array(len);
          for (var i = 0; i < len; i++) {
            items[i] = arguments[i];
          }
        }
        return enumerableOf(items).catchError();
      };
      observableProto.combineLatest = function() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        if (Array.isArray(args[0])) {
          args[0].unshift(this);
        } else {
          args.unshift(this);
        }
        return combineLatest.apply(this, args);
      };
      function falseFactory() {
        return false;
      }
      function argumentsToArray() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return args;
      }
      var CombineLatestObservable = (function(__super__) {
        inherits(CombineLatestObservable, __super__);
        function CombineLatestObservable(params, cb) {
          this._params = params;
          this._cb = cb;
          __super__.call(this);
        }
        CombineLatestObservable.prototype.subscribeCore = function(observer) {
          var len = this._params.length,
              subscriptions = new Array(len);
          var state = {
            hasValue: arrayInitialize(len, falseFactory),
            hasValueAll: false,
            isDone: arrayInitialize(len, falseFactory),
            values: new Array(len)
          };
          for (var i = 0; i < len; i++) {
            var source = this._params[i],
                sad = new SingleAssignmentDisposable();
            subscriptions[i] = sad;
            isPromise(source) && (source = observableFromPromise(source));
            sad.setDisposable(source.subscribe(new CombineLatestObserver(observer, i, this._cb, state)));
          }
          return new NAryDisposable(subscriptions);
        };
        return CombineLatestObservable;
      }(ObservableBase));
      var CombineLatestObserver = (function(__super__) {
        inherits(CombineLatestObserver, __super__);
        function CombineLatestObserver(o, i, cb, state) {
          this._o = o;
          this._i = i;
          this._cb = cb;
          this._state = state;
          __super__.call(this);
        }
        function notTheSame(i) {
          return function(x, j) {
            return j !== i;
          };
        }
        CombineLatestObserver.prototype.next = function(x) {
          this._state.values[this._i] = x;
          this._state.hasValue[this._i] = true;
          if (this._state.hasValueAll || (this._state.hasValueAll = this._state.hasValue.every(identity))) {
            var res = tryCatch(this._cb).apply(null, this._state.values);
            if (res === errorObj) {
              return this._o.onError(res.e);
            }
            this._o.onNext(res);
          } else if (this._state.isDone.filter(notTheSame(this._i)).every(identity)) {
            this._o.onCompleted();
          }
        };
        CombineLatestObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        CombineLatestObserver.prototype.completed = function() {
          this._state.isDone[this._i] = true;
          this._state.isDone.every(identity) && this._o.onCompleted();
        };
        return CombineLatestObserver;
      }(AbstractObserver));
      var combineLatest = Observable.combineLatest = function() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
        Array.isArray(args[0]) && (args = args[0]);
        return new CombineLatestObservable(args, resultSelector);
      };
      observableProto.concat = function() {
        for (var args = [],
            i = 0,
            len = arguments.length; i < len; i++) {
          args.push(arguments[i]);
        }
        args.unshift(this);
        return observableConcat.apply(null, args);
      };
      var ConcatObserver = (function(__super__) {
        inherits(ConcatObserver, __super__);
        function ConcatObserver(s, fn) {
          this._s = s;
          this._fn = fn;
          __super__.call(this);
        }
        ConcatObserver.prototype.next = function(x) {
          this._s.o.onNext(x);
        };
        ConcatObserver.prototype.error = function(e) {
          this._s.o.onError(e);
        };
        ConcatObserver.prototype.completed = function() {
          this._s.i++;
          this._fn(this._s);
        };
        return ConcatObserver;
      }(AbstractObserver));
      var ConcatObservable = (function(__super__) {
        inherits(ConcatObservable, __super__);
        function ConcatObservable(sources) {
          this._sources = sources;
          __super__.call(this);
        }
        function scheduleRecursive(state, recurse) {
          if (state.disposable.isDisposed) {
            return;
          }
          if (state.i === state.sources.length) {
            return state.o.onCompleted();
          }
          var currentValue = state.sources[state.i];
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var d = new SingleAssignmentDisposable();
          state.subscription.setDisposable(d);
          d.setDisposable(currentValue.subscribe(new ConcatObserver(state, recurse)));
        }
        ConcatObservable.prototype.subscribeCore = function(o) {
          var subscription = new SerialDisposable();
          var disposable = disposableCreate(noop);
          var state = {
            o: o,
            i: 0,
            subscription: subscription,
            disposable: disposable,
            sources: this._sources
          };
          var cancelable = immediateScheduler.scheduleRecursive(state, scheduleRecursive);
          return new NAryDisposable([subscription, disposable, cancelable]);
        };
        return ConcatObservable;
      }(ObservableBase));
      var observableConcat = Observable.concat = function() {
        var args;
        if (Array.isArray(arguments[0])) {
          args = arguments[0];
        } else {
          args = new Array(arguments.length);
          for (var i = 0,
              len = arguments.length; i < len; i++) {
            args[i] = arguments[i];
          }
        }
        return new ConcatObservable(args);
      };
      observableProto.concatAll = function() {
        return this.merge(1);
      };
      var MergeObservable = (function(__super__) {
        inherits(MergeObservable, __super__);
        function MergeObservable(source, maxConcurrent) {
          this.source = source;
          this.maxConcurrent = maxConcurrent;
          __super__.call(this);
        }
        MergeObservable.prototype.subscribeCore = function(observer) {
          var g = new CompositeDisposable();
          g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
          return g;
        };
        return MergeObservable;
      }(ObservableBase));
      var MergeObserver = (function(__super__) {
        function MergeObserver(o, max, g) {
          this.o = o;
          this.max = max;
          this.g = g;
          this.done = false;
          this.q = [];
          this.activeCount = 0;
          __super__.call(this);
        }
        inherits(MergeObserver, __super__);
        MergeObserver.prototype.handleSubscribe = function(xs) {
          var sad = new SingleAssignmentDisposable();
          this.g.add(sad);
          isPromise(xs) && (xs = observableFromPromise(xs));
          sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
        };
        MergeObserver.prototype.next = function(innerSource) {
          if (this.activeCount < this.max) {
            this.activeCount++;
            this.handleSubscribe(innerSource);
          } else {
            this.q.push(innerSource);
          }
        };
        MergeObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        MergeObserver.prototype.completed = function() {
          this.done = true;
          this.activeCount === 0 && this.o.onCompleted();
        };
        function InnerObserver(parent, sad) {
          this.parent = parent;
          this.sad = sad;
          __super__.call(this);
        }
        inherits(InnerObserver, __super__);
        InnerObserver.prototype.next = function(x) {
          this.parent.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this.parent.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.parent.g.remove(this.sad);
          if (this.parent.q.length > 0) {
            this.parent.handleSubscribe(this.parent.q.shift());
          } else {
            this.parent.activeCount--;
            this.parent.done && this.parent.activeCount === 0 && this.parent.o.onCompleted();
          }
        };
        return MergeObserver;
      }(AbstractObserver));
      observableProto.merge = function(maxConcurrentOrOther) {
        return typeof maxConcurrentOrOther !== 'number' ? observableMerge(this, maxConcurrentOrOther) : new MergeObservable(this, maxConcurrentOrOther);
      };
      var observableMerge = Observable.merge = function() {
        var scheduler,
            sources = [],
            i,
            len = arguments.length;
        if (!arguments[0]) {
          scheduler = immediateScheduler;
          for (i = 1; i < len; i++) {
            sources.push(arguments[i]);
          }
        } else if (isScheduler(arguments[0])) {
          scheduler = arguments[0];
          for (i = 1; i < len; i++) {
            sources.push(arguments[i]);
          }
        } else {
          scheduler = immediateScheduler;
          for (i = 0; i < len; i++) {
            sources.push(arguments[i]);
          }
        }
        if (Array.isArray(sources[0])) {
          sources = sources[0];
        }
        return observableOf(scheduler, sources).mergeAll();
      };
      var CompositeError = Rx.CompositeError = function(errors) {
        this.innerErrors = errors;
        this.message = 'This contains multiple errors. Check the innerErrors';
        Error.call(this);
      };
      CompositeError.prototype = Object.create(Error.prototype);
      CompositeError.prototype.name = 'CompositeError';
      var MergeDelayErrorObservable = (function(__super__) {
        inherits(MergeDelayErrorObservable, __super__);
        function MergeDelayErrorObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        MergeDelayErrorObservable.prototype.subscribeCore = function(o) {
          var group = new CompositeDisposable(),
              m = new SingleAssignmentDisposable(),
              state = {
                isStopped: false,
                errors: [],
                o: o
              };
          group.add(m);
          m.setDisposable(this.source.subscribe(new MergeDelayErrorObserver(group, state)));
          return group;
        };
        return MergeDelayErrorObservable;
      }(ObservableBase));
      var MergeDelayErrorObserver = (function(__super__) {
        inherits(MergeDelayErrorObserver, __super__);
        function MergeDelayErrorObserver(group, state) {
          this._group = group;
          this._state = state;
          __super__.call(this);
        }
        function setCompletion(o, errors) {
          if (errors.length === 0) {
            o.onCompleted();
          } else if (errors.length === 1) {
            o.onError(errors[0]);
          } else {
            o.onError(new CompositeError(errors));
          }
        }
        MergeDelayErrorObserver.prototype.next = function(x) {
          var inner = new SingleAssignmentDisposable();
          this._group.add(inner);
          isPromise(x) && (x = observableFromPromise(x));
          inner.setDisposable(x.subscribe(new InnerObserver(inner, this._group, this._state)));
        };
        MergeDelayErrorObserver.prototype.error = function(e) {
          this._state.errors.push(e);
          this._state.isStopped = true;
          this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
        };
        MergeDelayErrorObserver.prototype.completed = function() {
          this._state.isStopped = true;
          this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
        };
        inherits(InnerObserver, __super__);
        function InnerObserver(inner, group, state) {
          this._inner = inner;
          this._group = group;
          this._state = state;
          __super__.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          this._state.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this._state.errors.push(e);
          this._group.remove(this._inner);
          this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
        };
        InnerObserver.prototype.completed = function() {
          this._group.remove(this._inner);
          this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
        };
        return MergeDelayErrorObserver;
      }(AbstractObserver));
      Observable.mergeDelayError = function() {
        var args;
        if (Array.isArray(arguments[0])) {
          args = arguments[0];
        } else {
          var len = arguments.length;
          args = new Array(len);
          for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
          }
        }
        var source = observableOf(null, args);
        return new MergeDelayErrorObservable(source);
      };
      var MergeAllObservable = (function(__super__) {
        inherits(MergeAllObservable, __super__);
        function MergeAllObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        MergeAllObservable.prototype.subscribeCore = function(o) {
          var g = new CompositeDisposable(),
              m = new SingleAssignmentDisposable();
          g.add(m);
          m.setDisposable(this.source.subscribe(new MergeAllObserver(o, g)));
          return g;
        };
        return MergeAllObservable;
      }(ObservableBase));
      var MergeAllObserver = (function(__super__) {
        function MergeAllObserver(o, g) {
          this.o = o;
          this.g = g;
          this.done = false;
          __super__.call(this);
        }
        inherits(MergeAllObserver, __super__);
        MergeAllObserver.prototype.next = function(innerSource) {
          var sad = new SingleAssignmentDisposable();
          this.g.add(sad);
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
          sad.setDisposable(innerSource.subscribe(new InnerObserver(this, sad)));
        };
        MergeAllObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        MergeAllObserver.prototype.completed = function() {
          this.done = true;
          this.g.length === 1 && this.o.onCompleted();
        };
        function InnerObserver(parent, sad) {
          this.parent = parent;
          this.sad = sad;
          __super__.call(this);
        }
        inherits(InnerObserver, __super__);
        InnerObserver.prototype.next = function(x) {
          this.parent.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this.parent.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.parent.g.remove(this.sad);
          this.parent.done && this.parent.g.length === 1 && this.parent.o.onCompleted();
        };
        return MergeAllObserver;
      }(AbstractObserver));
      observableProto.mergeAll = function() {
        return new MergeAllObservable(this);
      };
      observableProto.onErrorResumeNext = function(second) {
        if (!second) {
          throw new Error('Second observable is required');
        }
        return onErrorResumeNext([this, second]);
      };
      var OnErrorResumeNextObservable = (function(__super__) {
        inherits(OnErrorResumeNextObservable, __super__);
        function OnErrorResumeNextObservable(sources) {
          this.sources = sources;
          __super__.call(this);
        }
        function scheduleMethod(state, recurse) {
          if (state.pos < state.sources.length) {
            var current = state.sources[state.pos++];
            isPromise(current) && (current = observableFromPromise(current));
            var d = new SingleAssignmentDisposable();
            state.subscription.setDisposable(d);
            d.setDisposable(current.subscribe(new OnErrorResumeNextObserver(state, recurse)));
          } else {
            state.o.onCompleted();
          }
        }
        OnErrorResumeNextObservable.prototype.subscribeCore = function(o) {
          var subscription = new SerialDisposable(),
              state = {
                pos: 0,
                subscription: subscription,
                o: o,
                sources: this.sources
              },
              cancellable = immediateScheduler.scheduleRecursive(state, scheduleMethod);
          return new BinaryDisposable(subscription, cancellable);
        };
        return OnErrorResumeNextObservable;
      }(ObservableBase));
      var OnErrorResumeNextObserver = (function(__super__) {
        inherits(OnErrorResumeNextObserver, __super__);
        function OnErrorResumeNextObserver(state, recurse) {
          this._state = state;
          this._recurse = recurse;
          __super__.call(this);
        }
        OnErrorResumeNextObserver.prototype.next = function(x) {
          this._state.o.onNext(x);
        };
        OnErrorResumeNextObserver.prototype.error = function() {
          this._recurse(this._state);
        };
        OnErrorResumeNextObserver.prototype.completed = function() {
          this._recurse(this._state);
        };
        return OnErrorResumeNextObserver;
      }(AbstractObserver));
      var onErrorResumeNext = Observable.onErrorResumeNext = function() {
        var sources = [];
        if (Array.isArray(arguments[0])) {
          sources = arguments[0];
        } else {
          var len = arguments.length;
          sources = new Array(len);
          for (var i = 0; i < len; i++) {
            sources[i] = arguments[i];
          }
        }
        return new OnErrorResumeNextObservable(sources);
      };
      var SkipUntilObservable = (function(__super__) {
        inherits(SkipUntilObservable, __super__);
        function SkipUntilObservable(source, other) {
          this._s = source;
          this._o = isPromise(other) ? observableFromPromise(other) : other;
          this._open = false;
          __super__.call(this);
        }
        SkipUntilObservable.prototype.subscribeCore = function(o) {
          var leftSubscription = new SingleAssignmentDisposable();
          leftSubscription.setDisposable(this._s.subscribe(new SkipUntilSourceObserver(o, this)));
          isPromise(this._o) && (this._o = observableFromPromise(this._o));
          var rightSubscription = new SingleAssignmentDisposable();
          rightSubscription.setDisposable(this._o.subscribe(new SkipUntilOtherObserver(o, this, rightSubscription)));
          return new BinaryDisposable(leftSubscription, rightSubscription);
        };
        return SkipUntilObservable;
      }(ObservableBase));
      var SkipUntilSourceObserver = (function(__super__) {
        inherits(SkipUntilSourceObserver, __super__);
        function SkipUntilSourceObserver(o, p) {
          this._o = o;
          this._p = p;
          __super__.call(this);
        }
        SkipUntilSourceObserver.prototype.next = function(x) {
          this._p._open && this._o.onNext(x);
        };
        SkipUntilSourceObserver.prototype.error = function(err) {
          this._o.onError(err);
        };
        SkipUntilSourceObserver.prototype.onCompleted = function() {
          this._p._open && this._o.onCompleted();
        };
        return SkipUntilSourceObserver;
      }(AbstractObserver));
      var SkipUntilOtherObserver = (function(__super__) {
        inherits(SkipUntilOtherObserver, __super__);
        function SkipUntilOtherObserver(o, p, r) {
          this._o = o;
          this._p = p;
          this._r = r;
          __super__.call(this);
        }
        SkipUntilOtherObserver.prototype.next = function() {
          this._p._open = true;
          this._r.dispose();
        };
        SkipUntilOtherObserver.prototype.error = function(err) {
          this._o.onError(err);
        };
        SkipUntilOtherObserver.prototype.onCompleted = function() {
          this._r.dispose();
        };
        return SkipUntilOtherObserver;
      }(AbstractObserver));
      observableProto.skipUntil = function(other) {
        return new SkipUntilObservable(this, other);
      };
      var SwitchObservable = (function(__super__) {
        inherits(SwitchObservable, __super__);
        function SwitchObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        SwitchObservable.prototype.subscribeCore = function(o) {
          var inner = new SerialDisposable(),
              s = this.source.subscribe(new SwitchObserver(o, inner));
          return new BinaryDisposable(s, inner);
        };
        inherits(SwitchObserver, AbstractObserver);
        function SwitchObserver(o, inner) {
          this.o = o;
          this.inner = inner;
          this.stopped = false;
          this.latest = 0;
          this.hasLatest = false;
          AbstractObserver.call(this);
        }
        SwitchObserver.prototype.next = function(innerSource) {
          var d = new SingleAssignmentDisposable(),
              id = ++this.latest;
          this.hasLatest = true;
          this.inner.setDisposable(d);
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
          d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
        };
        SwitchObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        SwitchObserver.prototype.completed = function() {
          this.stopped = true;
          !this.hasLatest && this.o.onCompleted();
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(parent, id) {
          this.parent = parent;
          this.id = id;
          AbstractObserver.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          this.parent.latest === this.id && this.parent.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this.parent.latest === this.id && this.parent.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          if (this.parent.latest === this.id) {
            this.parent.hasLatest = false;
            this.parent.stopped && this.parent.o.onCompleted();
          }
        };
        return SwitchObservable;
      }(ObservableBase));
      observableProto['switch'] = observableProto.switchLatest = function() {
        return new SwitchObservable(this);
      };
      var TakeUntilObservable = (function(__super__) {
        inherits(TakeUntilObservable, __super__);
        function TakeUntilObservable(source, other) {
          this.source = source;
          this.other = isPromise(other) ? observableFromPromise(other) : other;
          __super__.call(this);
        }
        TakeUntilObservable.prototype.subscribeCore = function(o) {
          return new BinaryDisposable(this.source.subscribe(o), this.other.subscribe(new TakeUntilObserver(o)));
        };
        return TakeUntilObservable;
      }(ObservableBase));
      var TakeUntilObserver = (function(__super__) {
        inherits(TakeUntilObserver, __super__);
        function TakeUntilObserver(o) {
          this._o = o;
          __super__.call(this);
        }
        TakeUntilObserver.prototype.next = function() {
          this._o.onCompleted();
        };
        TakeUntilObserver.prototype.error = function(err) {
          this._o.onError(err);
        };
        TakeUntilObserver.prototype.onCompleted = noop;
        return TakeUntilObserver;
      }(AbstractObserver));
      observableProto.takeUntil = function(other) {
        return new TakeUntilObservable(this, other);
      };
      function falseFactory() {
        return false;
      }
      function argumentsToArray() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return args;
      }
      var WithLatestFromObservable = (function(__super__) {
        inherits(WithLatestFromObservable, __super__);
        function WithLatestFromObservable(source, sources, resultSelector) {
          this._s = source;
          this._ss = sources;
          this._cb = resultSelector;
          __super__.call(this);
        }
        WithLatestFromObservable.prototype.subscribeCore = function(o) {
          var len = this._ss.length;
          var state = {
            hasValue: arrayInitialize(len, falseFactory),
            hasValueAll: false,
            values: new Array(len)
          };
          var n = this._ss.length,
              subscriptions = new Array(n + 1);
          for (var i = 0; i < n; i++) {
            var other = this._ss[i],
                sad = new SingleAssignmentDisposable();
            isPromise(other) && (other = observableFromPromise(other));
            sad.setDisposable(other.subscribe(new WithLatestFromOtherObserver(o, i, state)));
            subscriptions[i] = sad;
          }
          var outerSad = new SingleAssignmentDisposable();
          outerSad.setDisposable(this._s.subscribe(new WithLatestFromSourceObserver(o, this._cb, state)));
          subscriptions[n] = outerSad;
          return new NAryDisposable(subscriptions);
        };
        return WithLatestFromObservable;
      }(ObservableBase));
      var WithLatestFromOtherObserver = (function(__super__) {
        inherits(WithLatestFromOtherObserver, __super__);
        function WithLatestFromOtherObserver(o, i, state) {
          this._o = o;
          this._i = i;
          this._state = state;
          __super__.call(this);
        }
        WithLatestFromOtherObserver.prototype.next = function(x) {
          this._state.values[this._i] = x;
          this._state.hasValue[this._i] = true;
          this._state.hasValueAll = this._state.hasValue.every(identity);
        };
        WithLatestFromOtherObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        WithLatestFromOtherObserver.prototype.completed = noop;
        return WithLatestFromOtherObserver;
      }(AbstractObserver));
      var WithLatestFromSourceObserver = (function(__super__) {
        inherits(WithLatestFromSourceObserver, __super__);
        function WithLatestFromSourceObserver(o, cb, state) {
          this._o = o;
          this._cb = cb;
          this._state = state;
          __super__.call(this);
        }
        WithLatestFromSourceObserver.prototype.next = function(x) {
          var allValues = [x].concat(this._state.values);
          if (!this._state.hasValueAll) {
            return;
          }
          var res = tryCatch(this._cb).apply(null, allValues);
          if (res === errorObj) {
            return this._o.onError(res.e);
          }
          this._o.onNext(res);
        };
        WithLatestFromSourceObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        WithLatestFromSourceObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return WithLatestFromSourceObserver;
      }(AbstractObserver));
      observableProto.withLatestFrom = function() {
        if (arguments.length === 0) {
          throw new Error('invalid arguments');
        }
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
        Array.isArray(args[0]) && (args = args[0]);
        return new WithLatestFromObservable(this, args, resultSelector);
      };
      function falseFactory() {
        return false;
      }
      function emptyArrayFactory() {
        return [];
      }
      var ZipObservable = (function(__super__) {
        inherits(ZipObservable, __super__);
        function ZipObservable(sources, resultSelector) {
          this._s = sources;
          this._cb = resultSelector;
          __super__.call(this);
        }
        ZipObservable.prototype.subscribeCore = function(observer) {
          var n = this._s.length,
              subscriptions = new Array(n),
              done = arrayInitialize(n, falseFactory),
              q = arrayInitialize(n, emptyArrayFactory);
          for (var i = 0; i < n; i++) {
            var source = this._s[i],
                sad = new SingleAssignmentDisposable();
            subscriptions[i] = sad;
            isPromise(source) && (source = observableFromPromise(source));
            sad.setDisposable(source.subscribe(new ZipObserver(observer, i, this, q, done)));
          }
          return new NAryDisposable(subscriptions);
        };
        return ZipObservable;
      }(ObservableBase));
      var ZipObserver = (function(__super__) {
        inherits(ZipObserver, __super__);
        function ZipObserver(o, i, p, q, d) {
          this._o = o;
          this._i = i;
          this._p = p;
          this._q = q;
          this._d = d;
          __super__.call(this);
        }
        function notEmpty(x) {
          return x.length > 0;
        }
        function shiftEach(x) {
          return x.shift();
        }
        function notTheSame(i) {
          return function(x, j) {
            return j !== i;
          };
        }
        ZipObserver.prototype.next = function(x) {
          this._q[this._i].push(x);
          if (this._q.every(notEmpty)) {
            var queuedValues = this._q.map(shiftEach);
            var res = tryCatch(this._p._cb).apply(null, queuedValues);
            if (res === errorObj) {
              return this._o.onError(res.e);
            }
            this._o.onNext(res);
          } else if (this._d.filter(notTheSame(this._i)).every(identity)) {
            this._o.onCompleted();
          }
        };
        ZipObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        ZipObserver.prototype.completed = function() {
          this._d[this._i] = true;
          this._d.every(identity) && this._o.onCompleted();
        };
        return ZipObserver;
      }(AbstractObserver));
      observableProto.zip = function() {
        if (arguments.length === 0) {
          throw new Error('invalid arguments');
        }
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
        Array.isArray(args[0]) && (args = args[0]);
        var parent = this;
        args.unshift(parent);
        return new ZipObservable(args, resultSelector);
      };
      Observable.zip = function() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        if (Array.isArray(args[0])) {
          args = isFunction(args[1]) ? args[0].concat(args[1]) : args[0];
        }
        var first = args.shift();
        return first.zip.apply(first, args);
      };
      function falseFactory() {
        return false;
      }
      function emptyArrayFactory() {
        return [];
      }
      function argumentsToArray() {
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return args;
      }
      var ZipIterableObservable = (function(__super__) {
        inherits(ZipIterableObservable, __super__);
        function ZipIterableObservable(sources, cb) {
          this.sources = sources;
          this._cb = cb;
          __super__.call(this);
        }
        ZipIterableObservable.prototype.subscribeCore = function(o) {
          var sources = this.sources,
              len = sources.length,
              subscriptions = new Array(len);
          var state = {
            q: arrayInitialize(len, emptyArrayFactory),
            done: arrayInitialize(len, falseFactory),
            cb: this._cb,
            o: o
          };
          for (var i = 0; i < len; i++) {
            (function(i) {
              var source = sources[i],
                  sad = new SingleAssignmentDisposable();
              (isArrayLike(source) || isIterable(source)) && (source = observableFrom(source));
              subscriptions[i] = sad;
              sad.setDisposable(source.subscribe(new ZipIterableObserver(state, i)));
            }(i));
          }
          return new NAryDisposable(subscriptions);
        };
        return ZipIterableObservable;
      }(ObservableBase));
      var ZipIterableObserver = (function(__super__) {
        inherits(ZipIterableObserver, __super__);
        function ZipIterableObserver(s, i) {
          this._s = s;
          this._i = i;
          __super__.call(this);
        }
        function notEmpty(x) {
          return x.length > 0;
        }
        function shiftEach(x) {
          return x.shift();
        }
        function notTheSame(i) {
          return function(x, j) {
            return j !== i;
          };
        }
        ZipIterableObserver.prototype.next = function(x) {
          this._s.q[this._i].push(x);
          if (this._s.q.every(notEmpty)) {
            var queuedValues = this._s.q.map(shiftEach),
                res = tryCatch(this._s.cb).apply(null, queuedValues);
            if (res === errorObj) {
              return this._s.o.onError(res.e);
            }
            this._s.o.onNext(res);
          } else if (this._s.done.filter(notTheSame(this._i)).every(identity)) {
            this._s.o.onCompleted();
          }
        };
        ZipIterableObserver.prototype.error = function(e) {
          this._s.o.onError(e);
        };
        ZipIterableObserver.prototype.completed = function() {
          this._s.done[this._i] = true;
          this._s.done.every(identity) && this._s.o.onCompleted();
        };
        return ZipIterableObserver;
      }(AbstractObserver));
      observableProto.zipIterable = function() {
        if (arguments.length === 0) {
          throw new Error('invalid arguments');
        }
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
        var parent = this;
        args.unshift(parent);
        return new ZipIterableObservable(args, resultSelector);
      };
      function asObservable(source) {
        return function subscribe(o) {
          return source.subscribe(o);
        };
      }
      observableProto.asObservable = function() {
        return new AnonymousObservable(asObservable(this), this);
      };
      function toArray(x) {
        return x.toArray();
      }
      function notEmpty(x) {
        return x.length > 0;
      }
      observableProto.bufferWithCount = observableProto.bufferCount = function(count, skip) {
        typeof skip !== 'number' && (skip = count);
        return this.windowWithCount(count, skip).flatMap(toArray).filter(notEmpty);
      };
      var DematerializeObservable = (function(__super__) {
        inherits(DematerializeObservable, __super__);
        function DematerializeObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        DematerializeObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new DematerializeObserver(o));
        };
        return DematerializeObservable;
      }(ObservableBase));
      var DematerializeObserver = (function(__super__) {
        inherits(DematerializeObserver, __super__);
        function DematerializeObserver(o) {
          this._o = o;
          __super__.call(this);
        }
        DematerializeObserver.prototype.next = function(x) {
          x.accept(this._o);
        };
        DematerializeObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        DematerializeObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return DematerializeObserver;
      }(AbstractObserver));
      observableProto.dematerialize = function() {
        return new DematerializeObservable(this);
      };
      var DistinctUntilChangedObservable = (function(__super__) {
        inherits(DistinctUntilChangedObservable, __super__);
        function DistinctUntilChangedObservable(source, keyFn, comparer) {
          this.source = source;
          this.keyFn = keyFn;
          this.comparer = comparer;
          __super__.call(this);
        }
        DistinctUntilChangedObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new DistinctUntilChangedObserver(o, this.keyFn, this.comparer));
        };
        return DistinctUntilChangedObservable;
      }(ObservableBase));
      var DistinctUntilChangedObserver = (function(__super__) {
        inherits(DistinctUntilChangedObserver, __super__);
        function DistinctUntilChangedObserver(o, keyFn, comparer) {
          this.o = o;
          this.keyFn = keyFn;
          this.comparer = comparer;
          this.hasCurrentKey = false;
          this.currentKey = null;
          __super__.call(this);
        }
        DistinctUntilChangedObserver.prototype.next = function(x) {
          var key = x,
              comparerEquals;
          if (isFunction(this.keyFn)) {
            key = tryCatch(this.keyFn)(x);
            if (key === errorObj) {
              return this.o.onError(key.e);
            }
          }
          if (this.hasCurrentKey) {
            comparerEquals = tryCatch(this.comparer)(this.currentKey, key);
            if (comparerEquals === errorObj) {
              return this.o.onError(comparerEquals.e);
            }
          }
          if (!this.hasCurrentKey || !comparerEquals) {
            this.hasCurrentKey = true;
            this.currentKey = key;
            this.o.onNext(x);
          }
        };
        DistinctUntilChangedObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        DistinctUntilChangedObserver.prototype.completed = function() {
          this.o.onCompleted();
        };
        return DistinctUntilChangedObserver;
      }(AbstractObserver));
      observableProto.distinctUntilChanged = function(keyFn, comparer) {
        comparer || (comparer = defaultComparer);
        return new DistinctUntilChangedObservable(this, keyFn, comparer);
      };
      var TapObservable = (function(__super__) {
        inherits(TapObservable, __super__);
        function TapObservable(source, observerOrOnNext, onError, onCompleted) {
          this.source = source;
          this._oN = observerOrOnNext;
          this._oE = onError;
          this._oC = onCompleted;
          __super__.call(this);
        }
        TapObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o, this));
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(o, p) {
          this.o = o;
          this.t = !p._oN || isFunction(p._oN) ? observerCreate(p._oN || noop, p._oE || noop, p._oC || noop) : p._oN;
          this.isStopped = false;
          AbstractObserver.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          var res = tryCatch(this.t.onNext).call(this.t, x);
          if (res === errorObj) {
            this.o.onError(res.e);
          }
          this.o.onNext(x);
        };
        InnerObserver.prototype.error = function(err) {
          var res = tryCatch(this.t.onError).call(this.t, err);
          if (res === errorObj) {
            return this.o.onError(res.e);
          }
          this.o.onError(err);
        };
        InnerObserver.prototype.completed = function() {
          var res = tryCatch(this.t.onCompleted).call(this.t);
          if (res === errorObj) {
            return this.o.onError(res.e);
          }
          this.o.onCompleted();
        };
        return TapObservable;
      }(ObservableBase));
      observableProto['do'] = observableProto.tap = observableProto.doAction = function(observerOrOnNext, onError, onCompleted) {
        return new TapObservable(this, observerOrOnNext, onError, onCompleted);
      };
      observableProto.doOnNext = observableProto.tapOnNext = function(onNext, thisArg) {
        return this.tap(typeof thisArg !== 'undefined' ? function(x) {
          onNext.call(thisArg, x);
        } : onNext);
      };
      observableProto.doOnError = observableProto.tapOnError = function(onError, thisArg) {
        return this.tap(noop, typeof thisArg !== 'undefined' ? function(e) {
          onError.call(thisArg, e);
        } : onError);
      };
      observableProto.doOnCompleted = observableProto.tapOnCompleted = function(onCompleted, thisArg) {
        return this.tap(noop, null, typeof thisArg !== 'undefined' ? function() {
          onCompleted.call(thisArg);
        } : onCompleted);
      };
      var FinallyObservable = (function(__super__) {
        inherits(FinallyObservable, __super__);
        function FinallyObservable(source, fn, thisArg) {
          this.source = source;
          this._fn = bindCallback(fn, thisArg, 0);
          __super__.call(this);
        }
        FinallyObservable.prototype.subscribeCore = function(o) {
          var d = tryCatch(this.source.subscribe).call(this.source, o);
          if (d === errorObj) {
            this._fn();
            thrower(d.e);
          }
          return new FinallyDisposable(d, this._fn);
        };
        function FinallyDisposable(s, fn) {
          this.isDisposed = false;
          this._s = s;
          this._fn = fn;
        }
        FinallyDisposable.prototype.dispose = function() {
          if (!this.isDisposed) {
            var res = tryCatch(this._s.dispose).call(this._s);
            this._fn();
            res === errorObj && thrower(res.e);
          }
        };
        return FinallyObservable;
      }(ObservableBase));
      observableProto['finally'] = function(action, thisArg) {
        return new FinallyObservable(this, action, thisArg);
      };
      var IgnoreElementsObservable = (function(__super__) {
        inherits(IgnoreElementsObservable, __super__);
        function IgnoreElementsObservable(source) {
          this.source = source;
          __super__.call(this);
        }
        IgnoreElementsObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o));
        };
        function InnerObserver(o) {
          this.o = o;
          this.isStopped = false;
        }
        InnerObserver.prototype.onNext = noop;
        InnerObserver.prototype.onError = function(err) {
          if (!this.isStopped) {
            this.isStopped = true;
            this.o.onError(err);
          }
        };
        InnerObserver.prototype.onCompleted = function() {
          if (!this.isStopped) {
            this.isStopped = true;
            this.o.onCompleted();
          }
        };
        InnerObserver.prototype.dispose = function() {
          this.isStopped = true;
        };
        InnerObserver.prototype.fail = function(e) {
          if (!this.isStopped) {
            this.isStopped = true;
            this.observer.onError(e);
            return true;
          }
          return false;
        };
        return IgnoreElementsObservable;
      }(ObservableBase));
      observableProto.ignoreElements = function() {
        return new IgnoreElementsObservable(this);
      };
      var MaterializeObservable = (function(__super__) {
        inherits(MaterializeObservable, __super__);
        function MaterializeObservable(source, fn) {
          this.source = source;
          __super__.call(this);
        }
        MaterializeObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new MaterializeObserver(o));
        };
        return MaterializeObservable;
      }(ObservableBase));
      var MaterializeObserver = (function(__super__) {
        inherits(MaterializeObserver, __super__);
        function MaterializeObserver(o) {
          this._o = o;
          __super__.call(this);
        }
        MaterializeObserver.prototype.next = function(x) {
          this._o.onNext(notificationCreateOnNext(x));
        };
        MaterializeObserver.prototype.error = function(e) {
          this._o.onNext(notificationCreateOnError(e));
          this._o.onCompleted();
        };
        MaterializeObserver.prototype.completed = function() {
          this._o.onNext(notificationCreateOnCompleted());
          this._o.onCompleted();
        };
        return MaterializeObserver;
      }(AbstractObserver));
      observableProto.materialize = function() {
        return new MaterializeObservable(this);
      };
      observableProto.repeat = function(repeatCount) {
        return enumerableRepeat(this, repeatCount).concat();
      };
      observableProto.retry = function(retryCount) {
        return enumerableRepeat(this, retryCount).catchError();
      };
      function repeat(value) {
        return {'@@iterator': function() {
            return {next: function() {
                return {
                  done: false,
                  value: value
                };
              }};
          }};
      }
      var RetryWhenObservable = (function(__super__) {
        function createDisposable(state) {
          return {
            isDisposed: false,
            dispose: function() {
              if (!this.isDisposed) {
                this.isDisposed = true;
                state.isDisposed = true;
              }
            }
          };
        }
        function RetryWhenObservable(source, notifier) {
          this.source = source;
          this._notifier = notifier;
          __super__.call(this);
        }
        inherits(RetryWhenObservable, __super__);
        RetryWhenObservable.prototype.subscribeCore = function(o) {
          var exceptions = new Subject(),
              notifier = new Subject(),
              handled = this._notifier(exceptions),
              notificationDisposable = handled.subscribe(notifier);
          var e = this.source['@@iterator']();
          var state = {isDisposed: false},
              lastError,
              subscription = new SerialDisposable();
          var cancelable = currentThreadScheduler.scheduleRecursive(null, function(_, recurse) {
            if (state.isDisposed) {
              return;
            }
            var currentItem = e.next();
            if (currentItem.done) {
              if (lastError) {
                o.onError(lastError);
              } else {
                o.onCompleted();
              }
              return;
            }
            var currentValue = currentItem.value;
            isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
            var outer = new SingleAssignmentDisposable();
            var inner = new SingleAssignmentDisposable();
            subscription.setDisposable(new BinaryDisposable(inner, outer));
            outer.setDisposable(currentValue.subscribe(function(x) {
              o.onNext(x);
            }, function(exn) {
              inner.setDisposable(notifier.subscribe(recurse, function(ex) {
                o.onError(ex);
              }, function() {
                o.onCompleted();
              }));
              exceptions.onNext(exn);
              outer.dispose();
            }, function() {
              o.onCompleted();
            }));
          });
          return new NAryDisposable([notificationDisposable, subscription, cancelable, createDisposable(state)]);
        };
        return RetryWhenObservable;
      }(ObservableBase));
      observableProto.retryWhen = function(notifier) {
        return new RetryWhenObservable(repeat(this), notifier);
      };
      function repeat(value) {
        return {'@@iterator': function() {
            return {next: function() {
                return {
                  done: false,
                  value: value
                };
              }};
          }};
      }
      var RepeatWhenObservable = (function(__super__) {
        function createDisposable(state) {
          return {
            isDisposed: false,
            dispose: function() {
              if (!this.isDisposed) {
                this.isDisposed = true;
                state.isDisposed = true;
              }
            }
          };
        }
        function RepeatWhenObservable(source, notifier) {
          this.source = source;
          this._notifier = notifier;
          __super__.call(this);
        }
        inherits(RepeatWhenObservable, __super__);
        RepeatWhenObservable.prototype.subscribeCore = function(o) {
          var completions = new Subject(),
              notifier = new Subject(),
              handled = this._notifier(completions),
              notificationDisposable = handled.subscribe(notifier);
          var e = this.source['@@iterator']();
          var state = {isDisposed: false},
              lastError,
              subscription = new SerialDisposable();
          var cancelable = currentThreadScheduler.scheduleRecursive(null, function(_, recurse) {
            if (state.isDisposed) {
              return;
            }
            var currentItem = e.next();
            if (currentItem.done) {
              if (lastError) {
                o.onError(lastError);
              } else {
                o.onCompleted();
              }
              return;
            }
            var currentValue = currentItem.value;
            isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
            var outer = new SingleAssignmentDisposable();
            var inner = new SingleAssignmentDisposable();
            subscription.setDisposable(new BinaryDisposable(inner, outer));
            outer.setDisposable(currentValue.subscribe(function(x) {
              o.onNext(x);
            }, function(exn) {
              o.onError(exn);
            }, function() {
              inner.setDisposable(notifier.subscribe(recurse, function(ex) {
                o.onError(ex);
              }, function() {
                o.onCompleted();
              }));
              completions.onNext(null);
              outer.dispose();
            }));
          });
          return new NAryDisposable([notificationDisposable, subscription, cancelable, createDisposable(state)]);
        };
        return RepeatWhenObservable;
      }(ObservableBase));
      observableProto.repeatWhen = function(notifier) {
        return new RepeatWhenObservable(repeat(this), notifier);
      };
      var ScanObservable = (function(__super__) {
        inherits(ScanObservable, __super__);
        function ScanObservable(source, accumulator, hasSeed, seed) {
          this.source = source;
          this.accumulator = accumulator;
          this.hasSeed = hasSeed;
          this.seed = seed;
          __super__.call(this);
        }
        ScanObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new ScanObserver(o, this));
        };
        return ScanObservable;
      }(ObservableBase));
      var ScanObserver = (function(__super__) {
        inherits(ScanObserver, __super__);
        function ScanObserver(o, parent) {
          this._o = o;
          this._p = parent;
          this._fn = parent.accumulator;
          this._hs = parent.hasSeed;
          this._s = parent.seed;
          this._ha = false;
          this._a = null;
          this._hv = false;
          this._i = 0;
          __super__.call(this);
        }
        ScanObserver.prototype.next = function(x) {
          !this._hv && (this._hv = true);
          if (this._ha) {
            this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
          } else {
            this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
            this._ha = true;
          }
          if (this._a === errorObj) {
            return this._o.onError(this._a.e);
          }
          this._o.onNext(this._a);
          this._i++;
        };
        ScanObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        ScanObserver.prototype.completed = function() {
          !this._hv && this._hs && this._o.onNext(this._s);
          this._o.onCompleted();
        };
        return ScanObserver;
      }(AbstractObserver));
      observableProto.scan = function() {
        var hasSeed = false,
            seed,
            accumulator = arguments[0];
        if (arguments.length === 2) {
          hasSeed = true;
          seed = arguments[1];
        }
        return new ScanObservable(this, accumulator, hasSeed, seed);
      };
      var SkipLastObservable = (function(__super__) {
        inherits(SkipLastObservable, __super__);
        function SkipLastObservable(source, c) {
          this.source = source;
          this._c = c;
          __super__.call(this);
        }
        SkipLastObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new SkipLastObserver(o, this._c));
        };
        return SkipLastObservable;
      }(ObservableBase));
      var SkipLastObserver = (function(__super__) {
        inherits(SkipLastObserver, __super__);
        function SkipLastObserver(o, c) {
          this._o = o;
          this._c = c;
          this._q = [];
          __super__.call(this);
        }
        SkipLastObserver.prototype.next = function(x) {
          this._q.push(x);
          this._q.length > this._c && this._o.onNext(this._q.shift());
        };
        SkipLastObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        SkipLastObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return SkipLastObserver;
      }(AbstractObserver));
      observableProto.skipLast = function(count) {
        if (count < 0) {
          throw new ArgumentOutOfRangeError();
        }
        return new SkipLastObservable(this, count);
      };
      observableProto.startWith = function() {
        var values,
            scheduler,
            start = 0;
        if (!!arguments.length && isScheduler(arguments[0])) {
          scheduler = arguments[0];
          start = 1;
        } else {
          scheduler = immediateScheduler;
        }
        for (var args = [],
            i = start,
            len = arguments.length; i < len; i++) {
          args.push(arguments[i]);
        }
        return observableConcat.apply(null, [observableFromArray(args, scheduler), this]);
      };
      var TakeLastObserver = (function(__super__) {
        inherits(TakeLastObserver, __super__);
        function TakeLastObserver(o, c) {
          this._o = o;
          this._c = c;
          this._q = [];
          __super__.call(this);
        }
        TakeLastObserver.prototype.next = function(x) {
          this._q.push(x);
          this._q.length > this._c && this._q.shift();
        };
        TakeLastObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        TakeLastObserver.prototype.completed = function() {
          while (this._q.length > 0) {
            this._o.onNext(this._q.shift());
          }
          this._o.onCompleted();
        };
        return TakeLastObserver;
      }(AbstractObserver));
      observableProto.takeLast = function(count) {
        if (count < 0) {
          throw new ArgumentOutOfRangeError();
        }
        var source = this;
        return new AnonymousObservable(function(o) {
          return source.subscribe(new TakeLastObserver(o, count));
        }, source);
      };
      var TakeLastBufferObserver = (function(__super__) {
        inherits(TakeLastBufferObserver, __super__);
        function TakeLastBufferObserver(o, c) {
          this._o = o;
          this._c = c;
          this._q = [];
          __super__.call(this);
        }
        TakeLastBufferObserver.prototype.next = function(x) {
          this._q.push(x);
          this._q.length > this._c && this._q.shift();
        };
        TakeLastBufferObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        TakeLastBufferObserver.prototype.completed = function() {
          this._o.onNext(this._q);
          this._o.onCompleted();
        };
        return TakeLastBufferObserver;
      }(AbstractObserver));
      observableProto.takeLastBuffer = function(count) {
        if (count < 0) {
          throw new ArgumentOutOfRangeError();
        }
        var source = this;
        return new AnonymousObservable(function(o) {
          return source.subscribe(new TakeLastBufferObserver(o, count));
        }, source);
      };
      observableProto.windowWithCount = observableProto.windowCount = function(count, skip) {
        var source = this;
        +count || (count = 0);
        Math.abs(count) === Infinity && (count = 0);
        if (count <= 0) {
          throw new ArgumentOutOfRangeError();
        }
        skip == null && (skip = count);
        +skip || (skip = 0);
        Math.abs(skip) === Infinity && (skip = 0);
        if (skip <= 0) {
          throw new ArgumentOutOfRangeError();
        }
        return new AnonymousObservable(function(observer) {
          var m = new SingleAssignmentDisposable(),
              refCountDisposable = new RefCountDisposable(m),
              n = 0,
              q = [];
          function createWindow() {
            var s = new Subject();
            q.push(s);
            observer.onNext(addRef(s, refCountDisposable));
          }
          createWindow();
          m.setDisposable(source.subscribe(function(x) {
            for (var i = 0,
                len = q.length; i < len; i++) {
              q[i].onNext(x);
            }
            var c = n - count + 1;
            c >= 0 && c % skip === 0 && q.shift().onCompleted();
            ++n % skip === 0 && createWindow();
          }, function(e) {
            while (q.length > 0) {
              q.shift().onError(e);
            }
            observer.onError(e);
          }, function() {
            while (q.length > 0) {
              q.shift().onCompleted();
            }
            observer.onCompleted();
          }));
          return refCountDisposable;
        }, source);
      };
      observableProto.flatMapConcat = observableProto.concatMap = function(selector, resultSelector, thisArg) {
        return new FlatMapObservable(this, selector, resultSelector, thisArg).merge(1);
      };
      observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
        var source = this,
            onNextFunc = bindCallback(onNext, thisArg, 2),
            onErrorFunc = bindCallback(onError, thisArg, 1),
            onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
        return new AnonymousObservable(function(observer) {
          var index = 0;
          return source.subscribe(function(x) {
            var result;
            try {
              result = onNextFunc(x, index++);
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
          }, function(err) {
            var result;
            try {
              result = onErrorFunc(err);
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
            observer.onCompleted();
          }, function() {
            var result;
            try {
              result = onCompletedFunc();
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
            observer.onCompleted();
          });
        }, this).concatAll();
      };
      var DefaultIfEmptyObserver = (function(__super__) {
        inherits(DefaultIfEmptyObserver, __super__);
        function DefaultIfEmptyObserver(o, d) {
          this._o = o;
          this._d = d;
          this._f = false;
          __super__.call(this);
        }
        DefaultIfEmptyObserver.prototype.next = function(x) {
          this._f = true;
          this._o.onNext(x);
        };
        DefaultIfEmptyObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        DefaultIfEmptyObserver.prototype.completed = function() {
          !this._f && this._o.onNext(this._d);
          this._o.onCompleted();
        };
        return DefaultIfEmptyObserver;
      }(AbstractObserver));
      observableProto.defaultIfEmpty = function(defaultValue) {
        var source = this;
        defaultValue === undefined && (defaultValue = null);
        return new AnonymousObservable(function(o) {
          return source.subscribe(new DefaultIfEmptyObserver(o, defaultValue));
        }, source);
      };
      function arrayIndexOfComparer(array, item, comparer) {
        for (var i = 0,
            len = array.length; i < len; i++) {
          if (comparer(array[i], item)) {
            return i;
          }
        }
        return -1;
      }
      function HashSet(comparer) {
        this.comparer = comparer;
        this.set = [];
      }
      HashSet.prototype.push = function(value) {
        var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
        retValue && this.set.push(value);
        return retValue;
      };
      var DistinctObservable = (function(__super__) {
        inherits(DistinctObservable, __super__);
        function DistinctObservable(source, keyFn, cmpFn) {
          this.source = source;
          this._keyFn = keyFn;
          this._cmpFn = cmpFn;
          __super__.call(this);
        }
        DistinctObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new DistinctObserver(o, this._keyFn, this._cmpFn));
        };
        return DistinctObservable;
      }(ObservableBase));
      var DistinctObserver = (function(__super__) {
        inherits(DistinctObserver, __super__);
        function DistinctObserver(o, keyFn, cmpFn) {
          this._o = o;
          this._keyFn = keyFn;
          this._h = new HashSet(cmpFn);
          __super__.call(this);
        }
        DistinctObserver.prototype.next = function(x) {
          var key = x;
          if (isFunction(this._keyFn)) {
            key = tryCatch(this._keyFn)(x);
            if (key === errorObj) {
              return this._o.onError(key.e);
            }
          }
          this._h.push(key) && this._o.onNext(x);
        };
        DistinctObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        DistinctObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return DistinctObserver;
      }(AbstractObserver));
      observableProto.distinct = function(keySelector, comparer) {
        comparer || (comparer = defaultComparer);
        return new DistinctObservable(this, keySelector, comparer);
      };
      var MapObservable = (function(__super__) {
        inherits(MapObservable, __super__);
        function MapObservable(source, selector, thisArg) {
          this.source = source;
          this.selector = bindCallback(selector, thisArg, 3);
          __super__.call(this);
        }
        function innerMap(selector, self) {
          return function(x, i, o) {
            return selector.call(this, self.selector(x, i, o), i, o);
          };
        }
        MapObservable.prototype.internalMap = function(selector, thisArg) {
          return new MapObservable(this.source, innerMap(selector, this), thisArg);
        };
        MapObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o, this.selector, this));
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(o, selector, source) {
          this.o = o;
          this.selector = selector;
          this.source = source;
          this.i = 0;
          AbstractObserver.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          var result = tryCatch(this.selector)(x, this.i++, this.source);
          if (result === errorObj) {
            return this.o.onError(result.e);
          }
          this.o.onNext(result);
        };
        InnerObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.o.onCompleted();
        };
        return MapObservable;
      }(ObservableBase));
      observableProto.map = observableProto.select = function(selector, thisArg) {
        var selectorFn = typeof selector === 'function' ? selector : function() {
          return selector;
        };
        return this instanceof MapObservable ? this.internalMap(selectorFn, thisArg) : new MapObservable(this, selectorFn, thisArg);
      };
      function plucker(args, len) {
        return function mapper(x) {
          var currentProp = x;
          for (var i = 0; i < len; i++) {
            var p = currentProp[args[i]];
            if (typeof p !== 'undefined') {
              currentProp = p;
            } else {
              return undefined;
            }
          }
          return currentProp;
        };
      }
      observableProto.pluck = function() {
        var len = arguments.length,
            args = new Array(len);
        if (len === 0) {
          throw new Error('List of properties cannot be empty.');
        }
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return this.map(plucker(args, len));
      };
      observableProto.flatMapObserver = observableProto.selectManyObserver = function(onNext, onError, onCompleted, thisArg) {
        var source = this;
        return new AnonymousObservable(function(observer) {
          var index = 0;
          return source.subscribe(function(x) {
            var result;
            try {
              result = onNext.call(thisArg, x, index++);
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
          }, function(err) {
            var result;
            try {
              result = onError.call(thisArg, err);
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
            observer.onCompleted();
          }, function() {
            var result;
            try {
              result = onCompleted.call(thisArg);
            } catch (e) {
              observer.onError(e);
              return;
            }
            isPromise(result) && (result = observableFromPromise(result));
            observer.onNext(result);
            observer.onCompleted();
          });
        }, source).mergeAll();
      };
      observableProto.flatMap = observableProto.selectMany = observableProto.mergeMap = function(selector, resultSelector, thisArg) {
        return new FlatMapObservable(this, selector, resultSelector, thisArg).mergeAll();
      };
      observableProto.flatMapLatest = observableProto.switchMap = function(selector, resultSelector, thisArg) {
        return new FlatMapObservable(this, selector, resultSelector, thisArg).switchLatest();
      };
      var SkipObservable = (function(__super__) {
        inherits(SkipObservable, __super__);
        function SkipObservable(source, count) {
          this.source = source;
          this._count = count;
          __super__.call(this);
        }
        SkipObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new SkipObserver(o, this._count));
        };
        function SkipObserver(o, c) {
          this._o = o;
          this._r = c;
          AbstractObserver.call(this);
        }
        inherits(SkipObserver, AbstractObserver);
        SkipObserver.prototype.next = function(x) {
          if (this._r <= 0) {
            this._o.onNext(x);
          } else {
            this._r--;
          }
        };
        SkipObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        SkipObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return SkipObservable;
      }(ObservableBase));
      observableProto.skip = function(count) {
        if (count < 0) {
          throw new ArgumentOutOfRangeError();
        }
        return new SkipObservable(this, count);
      };
      var SkipWhileObservable = (function(__super__) {
        inherits(SkipWhileObservable, __super__);
        function SkipWhileObservable(source, fn) {
          this.source = source;
          this._fn = fn;
          __super__.call(this);
        }
        SkipWhileObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new SkipWhileObserver(o, this));
        };
        return SkipWhileObservable;
      }(ObservableBase));
      var SkipWhileObserver = (function(__super__) {
        inherits(SkipWhileObserver, __super__);
        function SkipWhileObserver(o, p) {
          this._o = o;
          this._p = p;
          this._i = 0;
          this._r = false;
          __super__.call(this);
        }
        SkipWhileObserver.prototype.next = function(x) {
          if (!this._r) {
            var res = tryCatch(this._p._fn)(x, this._i++, this._p);
            if (res === errorObj) {
              return this._o.onError(res.e);
            }
            this._r = !res;
          }
          this._r && this._o.onNext(x);
        };
        SkipWhileObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        SkipWhileObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return SkipWhileObserver;
      }(AbstractObserver));
      observableProto.skipWhile = function(predicate, thisArg) {
        var fn = bindCallback(predicate, thisArg, 3);
        return new SkipWhileObservable(this, fn);
      };
      var TakeObservable = (function(__super__) {
        inherits(TakeObservable, __super__);
        function TakeObservable(source, count) {
          this.source = source;
          this._count = count;
          __super__.call(this);
        }
        TakeObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new TakeObserver(o, this._count));
        };
        function TakeObserver(o, c) {
          this._o = o;
          this._c = c;
          this._r = c;
          AbstractObserver.call(this);
        }
        inherits(TakeObserver, AbstractObserver);
        TakeObserver.prototype.next = function(x) {
          if (this._r-- > 0) {
            this._o.onNext(x);
            this._r <= 0 && this._o.onCompleted();
          }
        };
        TakeObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        TakeObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return TakeObservable;
      }(ObservableBase));
      observableProto.take = function(count, scheduler) {
        if (count < 0) {
          throw new ArgumentOutOfRangeError();
        }
        if (count === 0) {
          return observableEmpty(scheduler);
        }
        return new TakeObservable(this, count);
      };
      var TakeWhileObservable = (function(__super__) {
        inherits(TakeWhileObservable, __super__);
        function TakeWhileObservable(source, fn) {
          this.source = source;
          this._fn = fn;
          __super__.call(this);
        }
        TakeWhileObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new TakeWhileObserver(o, this));
        };
        return TakeWhileObservable;
      }(ObservableBase));
      var TakeWhileObserver = (function(__super__) {
        inherits(TakeWhileObserver, __super__);
        function TakeWhileObserver(o, p) {
          this._o = o;
          this._p = p;
          this._i = 0;
          this._r = true;
          __super__.call(this);
        }
        TakeWhileObserver.prototype.next = function(x) {
          if (this._r) {
            this._r = tryCatch(this._p._fn)(x, this._i++, this._p);
            if (this._r === errorObj) {
              return this._o.onError(this._r.e);
            }
          }
          if (this._r) {
            this._o.onNext(x);
          } else {
            this._o.onCompleted();
          }
        };
        TakeWhileObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        TakeWhileObserver.prototype.completed = function() {
          this._o.onCompleted();
        };
        return TakeWhileObserver;
      }(AbstractObserver));
      observableProto.takeWhile = function(predicate, thisArg) {
        var fn = bindCallback(predicate, thisArg, 3);
        return new TakeWhileObservable(this, fn);
      };
      var FilterObservable = (function(__super__) {
        inherits(FilterObservable, __super__);
        function FilterObservable(source, predicate, thisArg) {
          this.source = source;
          this.predicate = bindCallback(predicate, thisArg, 3);
          __super__.call(this);
        }
        FilterObservable.prototype.subscribeCore = function(o) {
          return this.source.subscribe(new InnerObserver(o, this.predicate, this));
        };
        function innerPredicate(predicate, self) {
          return function(x, i, o) {
            return self.predicate(x, i, o) && predicate.call(this, x, i, o);
          };
        }
        FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
          return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
        };
        inherits(InnerObserver, AbstractObserver);
        function InnerObserver(o, predicate, source) {
          this.o = o;
          this.predicate = predicate;
          this.source = source;
          this.i = 0;
          AbstractObserver.call(this);
        }
        InnerObserver.prototype.next = function(x) {
          var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
          if (shouldYield === errorObj) {
            return this.o.onError(shouldYield.e);
          }
          shouldYield && this.o.onNext(x);
        };
        InnerObserver.prototype.error = function(e) {
          this.o.onError(e);
        };
        InnerObserver.prototype.completed = function() {
          this.o.onCompleted();
        };
        return FilterObservable;
      }(ObservableBase));
      observableProto.filter = observableProto.where = function(predicate, thisArg) {
        return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) : new FilterObservable(this, predicate, thisArg);
      };
      var TransduceObserver = (function(__super__) {
        inherits(TransduceObserver, __super__);
        function TransduceObserver(o, xform) {
          this._o = o;
          this._xform = xform;
          __super__.call(this);
        }
        TransduceObserver.prototype.next = function(x) {
          var res = tryCatch(this._xform['@@transducer/step']).call(this._xform, this._o, x);
          if (res === errorObj) {
            this._o.onError(res.e);
          }
        };
        TransduceObserver.prototype.error = function(e) {
          this._o.onError(e);
        };
        TransduceObserver.prototype.completed = function() {
          this._xform['@@transducer/result'](this._o);
        };
        return TransduceObserver;
      }(AbstractObserver));
      function transformForObserver(o) {
        return {
          '@@transducer/init': function() {
            return o;
          },
          '@@transducer/step': function(obs, input) {
            return obs.onNext(input);
          },
          '@@transducer/result': function(obs) {
            return obs.onCompleted();
          }
        };
      }
      observableProto.transduce = function(transducer) {
        var source = this;
        return new AnonymousObservable(function(o) {
          var xform = transducer(transformForObserver(o));
          return source.subscribe(new TransduceObserver(o, xform));
        }, source);
      };
      var AnonymousObservable = Rx.AnonymousObservable = (function(__super__) {
        inherits(AnonymousObservable, __super__);
        function fixSubscriber(subscriber) {
          return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
        }
        function setDisposable(s, state) {
          var ado = state[0],
              self = state[1];
          var sub = tryCatch(self.__subscribe).call(self, ado);
          if (sub === errorObj && !ado.fail(errorObj.e)) {
            thrower(errorObj.e);
          }
          ado.setDisposable(fixSubscriber(sub));
        }
        function AnonymousObservable(subscribe, parent) {
          this.source = parent;
          this.__subscribe = subscribe;
          __super__.call(this);
        }
        AnonymousObservable.prototype._subscribe = function(o) {
          var ado = new AutoDetachObserver(o),
              state = [ado, this];
          if (currentThreadScheduler.scheduleRequired()) {
            currentThreadScheduler.schedule(state, setDisposable);
          } else {
            setDisposable(null, state);
          }
          return ado;
        };
        return AnonymousObservable;
      }(Observable));
      var AutoDetachObserver = (function(__super__) {
        inherits(AutoDetachObserver, __super__);
        function AutoDetachObserver(observer) {
          __super__.call(this);
          this.observer = observer;
          this.m = new SingleAssignmentDisposable();
        }
        var AutoDetachObserverPrototype = AutoDetachObserver.prototype;
        AutoDetachObserverPrototype.next = function(value) {
          var result = tryCatch(this.observer.onNext).call(this.observer, value);
          if (result === errorObj) {
            this.dispose();
            thrower(result.e);
          }
        };
        AutoDetachObserverPrototype.error = function(err) {
          var result = tryCatch(this.observer.onError).call(this.observer, err);
          this.dispose();
          result === errorObj && thrower(result.e);
        };
        AutoDetachObserverPrototype.completed = function() {
          var result = tryCatch(this.observer.onCompleted).call(this.observer);
          this.dispose();
          result === errorObj && thrower(result.e);
        };
        AutoDetachObserverPrototype.setDisposable = function(value) {
          this.m.setDisposable(value);
        };
        AutoDetachObserverPrototype.getDisposable = function() {
          return this.m.getDisposable();
        };
        AutoDetachObserverPrototype.dispose = function() {
          __super__.prototype.dispose.call(this);
          this.m.dispose();
        };
        return AutoDetachObserver;
      }(AbstractObserver));
      var InnerSubscription = function(s, o) {
        this._s = s;
        this._o = o;
      };
      InnerSubscription.prototype.dispose = function() {
        if (!this._s.isDisposed && this._o !== null) {
          var idx = this._s.observers.indexOf(this._o);
          this._s.observers.splice(idx, 1);
          this._o = null;
        }
      };
      var Subject = Rx.Subject = (function(__super__) {
        inherits(Subject, __super__);
        function Subject() {
          __super__.call(this);
          this.isDisposed = false;
          this.isStopped = false;
          this.observers = [];
          this.hasError = false;
        }
        addProperties(Subject.prototype, Observer.prototype, {
          _subscribe: function(o) {
            checkDisposed(this);
            if (!this.isStopped) {
              this.observers.push(o);
              return new InnerSubscription(this, o);
            }
            if (this.hasError) {
              o.onError(this.error);
              return disposableEmpty;
            }
            o.onCompleted();
            return disposableEmpty;
          },
          hasObservers: function() {
            checkDisposed(this);
            return this.observers.length > 0;
          },
          onCompleted: function() {
            checkDisposed(this);
            if (!this.isStopped) {
              this.isStopped = true;
              for (var i = 0,
                  os = cloneArray(this.observers),
                  len = os.length; i < len; i++) {
                os[i].onCompleted();
              }
              this.observers.length = 0;
            }
          },
          onError: function(error) {
            checkDisposed(this);
            if (!this.isStopped) {
              this.isStopped = true;
              this.error = error;
              this.hasError = true;
              for (var i = 0,
                  os = cloneArray(this.observers),
                  len = os.length; i < len; i++) {
                os[i].onError(error);
              }
              this.observers.length = 0;
            }
          },
          onNext: function(value) {
            checkDisposed(this);
            if (!this.isStopped) {
              for (var i = 0,
                  os = cloneArray(this.observers),
                  len = os.length; i < len; i++) {
                os[i].onNext(value);
              }
            }
          },
          dispose: function() {
            this.isDisposed = true;
            this.observers = null;
          }
        });
        Subject.create = function(observer, observable) {
          return new AnonymousSubject(observer, observable);
        };
        return Subject;
      }(Observable));
      var AsyncSubject = Rx.AsyncSubject = (function(__super__) {
        inherits(AsyncSubject, __super__);
        function AsyncSubject() {
          __super__.call(this);
          this.isDisposed = false;
          this.isStopped = false;
          this.hasValue = false;
          this.observers = [];
          this.hasError = false;
        }
        addProperties(AsyncSubject.prototype, Observer.prototype, {
          _subscribe: function(o) {
            checkDisposed(this);
            if (!this.isStopped) {
              this.observers.push(o);
              return new InnerSubscription(this, o);
            }
            if (this.hasError) {
              o.onError(this.error);
            } else if (this.hasValue) {
              o.onNext(this.value);
              o.onCompleted();
            } else {
              o.onCompleted();
            }
            return disposableEmpty;
          },
          hasObservers: function() {
            checkDisposed(this);
            return this.observers.length > 0;
          },
          onCompleted: function() {
            var i,
                len;
            checkDisposed(this);
            if (!this.isStopped) {
              this.isStopped = true;
              var os = cloneArray(this.observers),
                  len = os.length;
              if (this.hasValue) {
                for (i = 0; i < len; i++) {
                  var o = os[i];
                  o.onNext(this.value);
                  o.onCompleted();
                }
              } else {
                for (i = 0; i < len; i++) {
                  os[i].onCompleted();
                }
              }
              this.observers.length = 0;
            }
          },
          onError: function(error) {
            checkDisposed(this);
            if (!this.isStopped) {
              this.isStopped = true;
              this.hasError = true;
              this.error = error;
              for (var i = 0,
                  os = cloneArray(this.observers),
                  len = os.length; i < len; i++) {
                os[i].onError(error);
              }
              this.observers.length = 0;
            }
          },
          onNext: function(value) {
            checkDisposed(this);
            if (this.isStopped) {
              return;
            }
            this.value = value;
            this.hasValue = true;
          },
          dispose: function() {
            this.isDisposed = true;
            this.observers = null;
            this.error = null;
            this.value = null;
          }
        });
        return AsyncSubject;
      }(Observable));
      var AnonymousSubject = Rx.AnonymousSubject = (function(__super__) {
        inherits(AnonymousSubject, __super__);
        function AnonymousSubject(observer, observable) {
          this.observer = observer;
          this.observable = observable;
          __super__.call(this);
        }
        addProperties(AnonymousSubject.prototype, Observer.prototype, {
          _subscribe: function(o) {
            return this.observable.subscribe(o);
          },
          onCompleted: function() {
            this.observer.onCompleted();
          },
          onError: function(error) {
            this.observer.onError(error);
          },
          onNext: function(value) {
            this.observer.onNext(value);
          }
        });
        return AnonymousSubject;
      }(Observable));
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root.Rx = Rx;
        define(function() {
          return Rx;
        });
      } else if (freeExports && freeModule) {
        if (moduleExports) {
          (freeModule.exports = Rx).Rx = Rx;
        } else {
          freeExports.Rx = Rx;
        }
      } else {
        root.Rx = Rx;
      }
      var rEndingLine = captureLine();
    }.call(this));
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/dist/rx.time.js", ["npm:rx@4.1.0/dist/rx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx'], function(Rx, exports) {
        return factory(root, exports, Rx);
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, $__require('npm:rx@4.1.0/dist/rx.js'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var inherits = Rx.internals.inherits,
        AbstractObserver = Rx.internals.AbstractObserver,
        Observable = Rx.Observable,
        observableProto = Observable.prototype,
        AnonymousObservable = Rx.AnonymousObservable,
        ObservableBase = Rx.ObservableBase,
        observableDefer = Observable.defer,
        observableEmpty = Observable.empty,
        observableNever = Observable.never,
        observableThrow = Observable['throw'],
        observableFromArray = Observable.fromArray,
        defaultScheduler = Rx.Scheduler['default'],
        SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
        SerialDisposable = Rx.SerialDisposable,
        CompositeDisposable = Rx.CompositeDisposable,
        BinaryDisposable = Rx.BinaryDisposable,
        RefCountDisposable = Rx.RefCountDisposable,
        Subject = Rx.Subject,
        addRef = Rx.internals.addRef,
        normalizeTime = Rx.Scheduler.normalize,
        helpers = Rx.helpers,
        isPromise = helpers.isPromise,
        isFunction = helpers.isFunction,
        isScheduler = Rx.Scheduler.isScheduler,
        observableFromPromise = Observable.fromPromise;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    var TimerObservable = (function(__super__) {
      inherits(TimerObservable, __super__);
      function TimerObservable(dt, s) {
        this._dt = dt;
        this._s = s;
        __super__.call(this);
      }
      TimerObservable.prototype.subscribeCore = function(o) {
        return this._s.scheduleFuture(o, this._dt, scheduleMethod);
      };
      function scheduleMethod(s, o) {
        o.onNext(0);
        o.onCompleted();
      }
      return TimerObservable;
    }(ObservableBase));
    function _observableTimer(dueTime, scheduler) {
      return new TimerObservable(dueTime, scheduler);
    }
    function observableTimerDateAndPeriod(dueTime, period, scheduler) {
      return new AnonymousObservable(function(observer) {
        var d = dueTime,
            p = normalizeTime(period);
        return scheduler.scheduleRecursiveFuture(0, d, function(count, self) {
          if (p > 0) {
            var now = scheduler.now();
            d = new Date(d.getTime() + p);
            d.getTime() <= now && (d = new Date(now + p));
          }
          observer.onNext(count);
          self(count + 1, new Date(d));
        });
      });
    }
    function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
      return dueTime === period ? new AnonymousObservable(function(observer) {
        return scheduler.schedulePeriodic(0, period, function(count) {
          observer.onNext(count);
          return count + 1;
        });
      }) : observableDefer(function() {
        return observableTimerDateAndPeriod(new Date(scheduler.now() + dueTime), period, scheduler);
      });
    }
    var observableinterval = Observable.interval = function(period, scheduler) {
      return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : defaultScheduler);
    };
    var observableTimer = Observable.timer = function(dueTime, periodOrScheduler, scheduler) {
      var period;
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      if (periodOrScheduler != null && typeof periodOrScheduler === 'number') {
        period = periodOrScheduler;
      } else if (isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
      }
      if ((dueTime instanceof Date || typeof dueTime === 'number') && period === undefined) {
        return _observableTimer(dueTime, scheduler);
      }
      if (dueTime instanceof Date && period !== undefined) {
        return observableTimerDateAndPeriod(dueTime, periodOrScheduler, scheduler);
      }
      return observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
    };
    function observableDelayRelative(source, dueTime, scheduler) {
      return new AnonymousObservable(function(o) {
        var active = false,
            cancelable = new SerialDisposable(),
            exception = null,
            q = [],
            running = false,
            subscription;
        subscription = source.materialize().timestamp(scheduler).subscribe(function(notification) {
          var d,
              shouldRun;
          if (notification.value.kind === 'E') {
            q = [];
            q.push(notification);
            exception = notification.value.error;
            shouldRun = !running;
          } else {
            q.push({
              value: notification.value,
              timestamp: notification.timestamp + dueTime
            });
            shouldRun = !active;
            active = true;
          }
          if (shouldRun) {
            if (exception !== null) {
              o.onError(exception);
            } else {
              d = new SingleAssignmentDisposable();
              cancelable.setDisposable(d);
              d.setDisposable(scheduler.scheduleRecursiveFuture(null, dueTime, function(_, self) {
                var e,
                    recurseDueTime,
                    result,
                    shouldRecurse;
                if (exception !== null) {
                  return;
                }
                running = true;
                do {
                  result = null;
                  if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
                    result = q.shift().value;
                  }
                  if (result !== null) {
                    result.accept(o);
                  }
                } while (result !== null);
                shouldRecurse = false;
                recurseDueTime = 0;
                if (q.length > 0) {
                  shouldRecurse = true;
                  recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
                } else {
                  active = false;
                }
                e = exception;
                running = false;
                if (e !== null) {
                  o.onError(e);
                } else if (shouldRecurse) {
                  self(null, recurseDueTime);
                }
              }));
            }
          }
        });
        return new BinaryDisposable(subscription, cancelable);
      }, source);
    }
    function observableDelayAbsolute(source, dueTime, scheduler) {
      return observableDefer(function() {
        return observableDelayRelative(source, dueTime - scheduler.now(), scheduler);
      });
    }
    function delayWithSelector(source, subscriptionDelay, delayDurationSelector) {
      var subDelay,
          selector;
      if (isFunction(subscriptionDelay)) {
        selector = subscriptionDelay;
      } else {
        subDelay = subscriptionDelay;
        selector = delayDurationSelector;
      }
      return new AnonymousObservable(function(o) {
        var delays = new CompositeDisposable(),
            atEnd = false,
            subscription = new SerialDisposable();
        function start() {
          subscription.setDisposable(source.subscribe(function(x) {
            var delay = tryCatch(selector)(x);
            if (delay === errorObj) {
              return o.onError(delay.e);
            }
            var d = new SingleAssignmentDisposable();
            delays.add(d);
            d.setDisposable(delay.subscribe(function() {
              o.onNext(x);
              delays.remove(d);
              done();
            }, function(e) {
              o.onError(e);
            }, function() {
              o.onNext(x);
              delays.remove(d);
              done();
            }));
          }, function(e) {
            o.onError(e);
          }, function() {
            atEnd = true;
            subscription.dispose();
            done();
          }));
        }
        function done() {
          atEnd && delays.length === 0 && o.onCompleted();
        }
        if (!subDelay) {
          start();
        } else {
          subscription.setDisposable(subDelay.subscribe(start, function(e) {
            o.onError(e);
          }, start));
        }
        return new BinaryDisposable(subscription, delays);
      }, source);
    }
    observableProto.delay = function() {
      var firstArg = arguments[0];
      if (typeof firstArg === 'number' || firstArg instanceof Date) {
        var dueTime = firstArg,
            scheduler = arguments[1];
        isScheduler(scheduler) || (scheduler = defaultScheduler);
        return dueTime instanceof Date ? observableDelayAbsolute(this, dueTime, scheduler) : observableDelayRelative(this, dueTime, scheduler);
      } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
        return delayWithSelector(this, firstArg, arguments[1]);
      } else {
        throw new Error('Invalid arguments');
      }
    };
    var DebounceObservable = (function(__super__) {
      inherits(DebounceObservable, __super__);
      function DebounceObservable(source, dt, s) {
        isScheduler(s) || (s = defaultScheduler);
        this.source = source;
        this._dt = dt;
        this._s = s;
        __super__.call(this);
      }
      DebounceObservable.prototype.subscribeCore = function(o) {
        var cancelable = new SerialDisposable();
        return new BinaryDisposable(this.source.subscribe(new DebounceObserver(o, this._dt, this._s, cancelable)), cancelable);
      };
      return DebounceObservable;
    }(ObservableBase));
    var DebounceObserver = (function(__super__) {
      inherits(DebounceObserver, __super__);
      function DebounceObserver(observer, dueTime, scheduler, cancelable) {
        this._o = observer;
        this._d = dueTime;
        this._scheduler = scheduler;
        this._c = cancelable;
        this._v = null;
        this._hv = false;
        this._id = 0;
        __super__.call(this);
      }
      function scheduleFuture(s, state) {
        state.self._hv && state.self._id === state.currentId && state.self._o.onNext(state.x);
        state.self._hv = false;
      }
      DebounceObserver.prototype.next = function(x) {
        this._hv = true;
        this._v = x;
        var currentId = ++this._id,
            d = new SingleAssignmentDisposable();
        this._c.setDisposable(d);
        d.setDisposable(this._scheduler.scheduleFuture(this, this._d, function(_, self) {
          self._hv && self._id === currentId && self._o.onNext(x);
          self._hv = false;
        }));
      };
      DebounceObserver.prototype.error = function(e) {
        this._c.dispose();
        this._o.onError(e);
        this._hv = false;
        this._id++;
      };
      DebounceObserver.prototype.completed = function() {
        this._c.dispose();
        this._hv && this._o.onNext(this._v);
        this._o.onCompleted();
        this._hv = false;
        this._id++;
      };
      return DebounceObserver;
    }(AbstractObserver));
    function debounceWithSelector(source, durationSelector) {
      return new AnonymousObservable(function(o) {
        var value,
            hasValue = false,
            cancelable = new SerialDisposable(),
            id = 0;
        var subscription = source.subscribe(function(x) {
          var throttle = tryCatch(durationSelector)(x);
          if (throttle === errorObj) {
            return o.onError(throttle.e);
          }
          isPromise(throttle) && (throttle = observableFromPromise(throttle));
          hasValue = true;
          value = x;
          id++;
          var currentid = id,
              d = new SingleAssignmentDisposable();
          cancelable.setDisposable(d);
          d.setDisposable(throttle.subscribe(function() {
            hasValue && id === currentid && o.onNext(value);
            hasValue = false;
            d.dispose();
          }, function(e) {
            o.onError(e);
          }, function() {
            hasValue && id === currentid && o.onNext(value);
            hasValue = false;
            d.dispose();
          }));
        }, function(e) {
          cancelable.dispose();
          o.onError(e);
          hasValue = false;
          id++;
        }, function() {
          cancelable.dispose();
          hasValue && o.onNext(value);
          o.onCompleted();
          hasValue = false;
          id++;
        });
        return new BinaryDisposable(subscription, cancelable);
      }, source);
    }
    observableProto.debounce = function() {
      if (isFunction(arguments[0])) {
        return debounceWithSelector(this, arguments[0]);
      } else if (typeof arguments[0] === 'number') {
        return new DebounceObservable(this, arguments[0], arguments[1]);
      } else {
        throw new Error('Invalid arguments');
      }
    };
    observableProto.windowWithTime = observableProto.windowTime = function(timeSpan, timeShiftOrScheduler, scheduler) {
      var source = this,
          timeShift;
      timeShiftOrScheduler == null && (timeShift = timeSpan);
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      if (typeof timeShiftOrScheduler === 'number') {
        timeShift = timeShiftOrScheduler;
      } else if (isScheduler(timeShiftOrScheduler)) {
        timeShift = timeSpan;
        scheduler = timeShiftOrScheduler;
      }
      return new AnonymousObservable(function(observer) {
        var groupDisposable,
            nextShift = timeShift,
            nextSpan = timeSpan,
            q = [],
            refCountDisposable,
            timerD = new SerialDisposable(),
            totalTime = 0;
        groupDisposable = new CompositeDisposable(timerD), refCountDisposable = new RefCountDisposable(groupDisposable);
        function createTimer() {
          var m = new SingleAssignmentDisposable(),
              isSpan = false,
              isShift = false;
          timerD.setDisposable(m);
          if (nextSpan === nextShift) {
            isSpan = true;
            isShift = true;
          } else if (nextSpan < nextShift) {
            isSpan = true;
          } else {
            isShift = true;
          }
          var newTotalTime = isSpan ? nextSpan : nextShift,
              ts = newTotalTime - totalTime;
          totalTime = newTotalTime;
          if (isSpan) {
            nextSpan += timeShift;
          }
          if (isShift) {
            nextShift += timeShift;
          }
          m.setDisposable(scheduler.scheduleFuture(null, ts, function() {
            if (isShift) {
              var s = new Subject();
              q.push(s);
              observer.onNext(addRef(s, refCountDisposable));
            }
            isSpan && q.shift().onCompleted();
            createTimer();
          }));
        }
        ;
        q.push(new Subject());
        observer.onNext(addRef(q[0], refCountDisposable));
        createTimer();
        groupDisposable.add(source.subscribe(function(x) {
          for (var i = 0,
              len = q.length; i < len; i++) {
            q[i].onNext(x);
          }
        }, function(e) {
          for (var i = 0,
              len = q.length; i < len; i++) {
            q[i].onError(e);
          }
          observer.onError(e);
        }, function() {
          for (var i = 0,
              len = q.length; i < len; i++) {
            q[i].onCompleted();
          }
          observer.onCompleted();
        }));
        return refCountDisposable;
      }, source);
    };
    observableProto.windowWithTimeOrCount = observableProto.windowTimeOrCount = function(timeSpan, count, scheduler) {
      var source = this;
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new AnonymousObservable(function(observer) {
        var timerD = new SerialDisposable(),
            groupDisposable = new CompositeDisposable(timerD),
            refCountDisposable = new RefCountDisposable(groupDisposable),
            n = 0,
            windowId = 0,
            s = new Subject();
        function createTimer(id) {
          var m = new SingleAssignmentDisposable();
          timerD.setDisposable(m);
          m.setDisposable(scheduler.scheduleFuture(null, timeSpan, function() {
            if (id !== windowId) {
              return;
            }
            n = 0;
            var newId = ++windowId;
            s.onCompleted();
            s = new Subject();
            observer.onNext(addRef(s, refCountDisposable));
            createTimer(newId);
          }));
        }
        observer.onNext(addRef(s, refCountDisposable));
        createTimer(0);
        groupDisposable.add(source.subscribe(function(x) {
          var newId = 0,
              newWindow = false;
          s.onNext(x);
          if (++n === count) {
            newWindow = true;
            n = 0;
            newId = ++windowId;
            s.onCompleted();
            s = new Subject();
            observer.onNext(addRef(s, refCountDisposable));
          }
          newWindow && createTimer(newId);
        }, function(e) {
          s.onError(e);
          observer.onError(e);
        }, function() {
          s.onCompleted();
          observer.onCompleted();
        }));
        return refCountDisposable;
      }, source);
    };
    function toArray(x) {
      return x.toArray();
    }
    observableProto.bufferWithTime = observableProto.bufferTime = function(timeSpan, timeShiftOrScheduler, scheduler) {
      return this.windowWithTime(timeSpan, timeShiftOrScheduler, scheduler).flatMap(toArray);
    };
    function toArray(x) {
      return x.toArray();
    }
    observableProto.bufferWithTimeOrCount = observableProto.bufferTimeOrCount = function(timeSpan, count, scheduler) {
      return this.windowWithTimeOrCount(timeSpan, count, scheduler).flatMap(toArray);
    };
    var TimeIntervalObservable = (function(__super__) {
      inherits(TimeIntervalObservable, __super__);
      function TimeIntervalObservable(source, s) {
        this.source = source;
        this._s = s;
        __super__.call(this);
      }
      TimeIntervalObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new TimeIntervalObserver(o, this._s));
      };
      return TimeIntervalObservable;
    }(ObservableBase));
    var TimeIntervalObserver = (function(__super__) {
      inherits(TimeIntervalObserver, __super__);
      function TimeIntervalObserver(o, s) {
        this._o = o;
        this._s = s;
        this._l = s.now();
        __super__.call(this);
      }
      TimeIntervalObserver.prototype.next = function(x) {
        var now = this._s.now(),
            span = now - this._l;
        this._l = now;
        this._o.onNext({
          value: x,
          interval: span
        });
      };
      TimeIntervalObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      TimeIntervalObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return TimeIntervalObserver;
    }(AbstractObserver));
    observableProto.timeInterval = function(scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new TimeIntervalObservable(this, scheduler);
    };
    var TimestampObservable = (function(__super__) {
      inherits(TimestampObservable, __super__);
      function TimestampObservable(source, s) {
        this.source = source;
        this._s = s;
        __super__.call(this);
      }
      TimestampObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new TimestampObserver(o, this._s));
      };
      return TimestampObservable;
    }(ObservableBase));
    var TimestampObserver = (function(__super__) {
      inherits(TimestampObserver, __super__);
      function TimestampObserver(o, s) {
        this._o = o;
        this._s = s;
        __super__.call(this);
      }
      TimestampObserver.prototype.next = function(x) {
        this._o.onNext({
          value: x,
          timestamp: this._s.now()
        });
      };
      TimestampObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      TimestampObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return TimestampObserver;
    }(AbstractObserver));
    observableProto.timestamp = function(scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new TimestampObservable(this, scheduler);
    };
    var SampleObservable = (function(__super__) {
      inherits(SampleObservable, __super__);
      function SampleObservable(source, sampler) {
        this.source = source;
        this._sampler = sampler;
        __super__.call(this);
      }
      SampleObservable.prototype.subscribeCore = function(o) {
        var state = {
          o: o,
          atEnd: false,
          value: null,
          hasValue: false,
          sourceSubscription: new SingleAssignmentDisposable()
        };
        state.sourceSubscription.setDisposable(this.source.subscribe(new SampleSourceObserver(state)));
        return new BinaryDisposable(state.sourceSubscription, this._sampler.subscribe(new SamplerObserver(state)));
      };
      return SampleObservable;
    }(ObservableBase));
    var SamplerObserver = (function(__super__) {
      inherits(SamplerObserver, __super__);
      function SamplerObserver(s) {
        this._s = s;
        __super__.call(this);
      }
      SamplerObserver.prototype._handleMessage = function() {
        if (this._s.hasValue) {
          this._s.hasValue = false;
          this._s.o.onNext(this._s.value);
        }
        this._s.atEnd && this._s.o.onCompleted();
      };
      SamplerObserver.prototype.next = function() {
        this._handleMessage();
      };
      SamplerObserver.prototype.error = function(e) {
        this._s.onError(e);
      };
      SamplerObserver.prototype.completed = function() {
        this._handleMessage();
      };
      return SamplerObserver;
    }(AbstractObserver));
    var SampleSourceObserver = (function(__super__) {
      inherits(SampleSourceObserver, __super__);
      function SampleSourceObserver(s) {
        this._s = s;
        __super__.call(this);
      }
      SampleSourceObserver.prototype.next = function(x) {
        this._s.hasValue = true;
        this._s.value = x;
      };
      SampleSourceObserver.prototype.error = function(e) {
        this._s.o.onError(e);
      };
      SampleSourceObserver.prototype.completed = function() {
        this._s.atEnd = true;
        this._s.sourceSubscription.dispose();
      };
      return SampleSourceObserver;
    }(AbstractObserver));
    observableProto.sample = function(intervalOrSampler, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return typeof intervalOrSampler === 'number' ? new SampleObservable(this, observableinterval(intervalOrSampler, scheduler)) : new SampleObservable(this, intervalOrSampler);
    };
    var TimeoutError = Rx.TimeoutError = function(message) {
      this.message = message || 'Timeout has occurred';
      this.name = 'TimeoutError';
      Error.call(this);
    };
    TimeoutError.prototype = Object.create(Error.prototype);
    function timeoutWithSelector(source, firstTimeout, timeoutDurationSelector, other) {
      if (isFunction(firstTimeout)) {
        other = timeoutDurationSelector;
        timeoutDurationSelector = firstTimeout;
        firstTimeout = observableNever();
      }
      Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
      return new AnonymousObservable(function(o) {
        var subscription = new SerialDisposable(),
            timer = new SerialDisposable(),
            original = new SingleAssignmentDisposable();
        subscription.setDisposable(original);
        var id = 0,
            switched = false;
        function setTimer(timeout) {
          var myId = id,
              d = new SingleAssignmentDisposable();
          function timerWins() {
            switched = (myId === id);
            return switched;
          }
          timer.setDisposable(d);
          d.setDisposable(timeout.subscribe(function() {
            timerWins() && subscription.setDisposable(other.subscribe(o));
            d.dispose();
          }, function(e) {
            timerWins() && o.onError(e);
          }, function() {
            timerWins() && subscription.setDisposable(other.subscribe(o));
          }));
        }
        ;
        setTimer(firstTimeout);
        function oWins() {
          var res = !switched;
          if (res) {
            id++;
          }
          return res;
        }
        original.setDisposable(source.subscribe(function(x) {
          if (oWins()) {
            o.onNext(x);
            var timeout = tryCatch(timeoutDurationSelector)(x);
            if (timeout === errorObj) {
              return o.onError(timeout.e);
            }
            setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
          }
        }, function(e) {
          oWins() && o.onError(e);
        }, function() {
          oWins() && o.onCompleted();
        }));
        return new BinaryDisposable(subscription, timer);
      }, source);
    }
    function timeout(source, dueTime, other, scheduler) {
      if (isScheduler(other)) {
        scheduler = other;
        other = observableThrow(new TimeoutError());
      }
      if (other instanceof Error) {
        other = observableThrow(other);
      }
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
      return new AnonymousObservable(function(o) {
        var id = 0,
            original = new SingleAssignmentDisposable(),
            subscription = new SerialDisposable(),
            switched = false,
            timer = new SerialDisposable();
        subscription.setDisposable(original);
        function createTimer() {
          var myId = id;
          timer.setDisposable(scheduler.scheduleFuture(null, dueTime, function() {
            switched = id === myId;
            if (switched) {
              isPromise(other) && (other = observableFromPromise(other));
              subscription.setDisposable(other.subscribe(o));
            }
          }));
        }
        createTimer();
        original.setDisposable(source.subscribe(function(x) {
          if (!switched) {
            id++;
            o.onNext(x);
            createTimer();
          }
        }, function(e) {
          if (!switched) {
            id++;
            o.onError(e);
          }
        }, function() {
          if (!switched) {
            id++;
            o.onCompleted();
          }
        }));
        return new BinaryDisposable(subscription, timer);
      }, source);
    }
    observableProto.timeout = function() {
      var firstArg = arguments[0];
      if (firstArg instanceof Date || typeof firstArg === 'number') {
        return timeout(this, firstArg, arguments[1], arguments[2]);
      } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
        return timeoutWithSelector(this, firstArg, arguments[1], arguments[2]);
      } else {
        throw new Error('Invalid arguments');
      }
    };
    var GenerateAbsoluteObservable = (function(__super__) {
      inherits(GenerateAbsoluteObservable, __super__);
      function GenerateAbsoluteObservable(state, cndFn, itrFn, resFn, timeFn, s) {
        this._state = state;
        this._cndFn = cndFn;
        this._itrFn = itrFn;
        this._resFn = resFn;
        this._timeFn = timeFn;
        this._s = s;
        __super__.call(this);
      }
      function scheduleRecursive(state, recurse) {
        state.hasResult && state.o.onNext(state.result);
        if (state.first) {
          state.first = false;
        } else {
          state.newState = tryCatch(state.self._itrFn)(state.newState);
          if (state.newState === errorObj) {
            return state.o.onError(state.newState.e);
          }
        }
        state.hasResult = tryCatch(state.self._cndFn)(state.newState);
        if (state.hasResult === errorObj) {
          return state.o.onError(state.hasResult.e);
        }
        if (state.hasResult) {
          state.result = tryCatch(state.self._resFn)(state.newState);
          if (state.result === errorObj) {
            return state.o.onError(state.result.e);
          }
          var time = tryCatch(state.self._timeFn)(state.newState);
          if (time === errorObj) {
            return state.o.onError(time.e);
          }
          recurse(state, time);
        } else {
          state.o.onCompleted();
        }
      }
      GenerateAbsoluteObservable.prototype.subscribeCore = function(o) {
        var state = {
          o: o,
          self: this,
          newState: this._state,
          first: true,
          hasResult: false
        };
        return this._s.scheduleRecursiveFuture(state, new Date(this._s.now()), scheduleRecursive);
      };
      return GenerateAbsoluteObservable;
    }(ObservableBase));
    Observable.generateWithAbsoluteTime = function(initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new GenerateAbsoluteObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
    };
    var GenerateRelativeObservable = (function(__super__) {
      inherits(GenerateRelativeObservable, __super__);
      function GenerateRelativeObservable(state, cndFn, itrFn, resFn, timeFn, s) {
        this._state = state;
        this._cndFn = cndFn;
        this._itrFn = itrFn;
        this._resFn = resFn;
        this._timeFn = timeFn;
        this._s = s;
        __super__.call(this);
      }
      function scheduleRecursive(state, recurse) {
        state.hasResult && state.o.onNext(state.result);
        if (state.first) {
          state.first = false;
        } else {
          state.newState = tryCatch(state.self._itrFn)(state.newState);
          if (state.newState === errorObj) {
            return state.o.onError(state.newState.e);
          }
        }
        state.hasResult = tryCatch(state.self._cndFn)(state.newState);
        if (state.hasResult === errorObj) {
          return state.o.onError(state.hasResult.e);
        }
        if (state.hasResult) {
          state.result = tryCatch(state.self._resFn)(state.newState);
          if (state.result === errorObj) {
            return state.o.onError(state.result.e);
          }
          var time = tryCatch(state.self._timeFn)(state.newState);
          if (time === errorObj) {
            return state.o.onError(time.e);
          }
          recurse(state, time);
        } else {
          state.o.onCompleted();
        }
      }
      GenerateRelativeObservable.prototype.subscribeCore = function(o) {
        var state = {
          o: o,
          self: this,
          newState: this._state,
          first: true,
          hasResult: false
        };
        return this._s.scheduleRecursiveFuture(state, 0, scheduleRecursive);
      };
      return GenerateRelativeObservable;
    }(ObservableBase));
    Observable.generateWithRelativeTime = function(initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new GenerateRelativeObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
    };
    var DelaySubscription = (function(__super__) {
      inherits(DelaySubscription, __super__);
      function DelaySubscription(source, dt, s) {
        this.source = source;
        this._dt = dt;
        this._s = s;
        __super__.call(this);
      }
      DelaySubscription.prototype.subscribeCore = function(o) {
        var d = new SerialDisposable();
        d.setDisposable(this._s.scheduleFuture([this.source, o, d], this._dt, scheduleMethod));
        return d;
      };
      function scheduleMethod(s, state) {
        var source = state[0],
            o = state[1],
            d = state[2];
        d.setDisposable(source.subscribe(o));
      }
      return DelaySubscription;
    }(ObservableBase));
    observableProto.delaySubscription = function(dueTime, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new DelaySubscription(this, dueTime, scheduler);
    };
    var SkipLastWithTimeObservable = (function(__super__) {
      inherits(SkipLastWithTimeObservable, __super__);
      function SkipLastWithTimeObservable(source, d, s) {
        this.source = source;
        this._d = d;
        this._s = s;
        __super__.call(this);
      }
      SkipLastWithTimeObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new SkipLastWithTimeObserver(o, this));
      };
      return SkipLastWithTimeObservable;
    }(ObservableBase));
    var SkipLastWithTimeObserver = (function(__super__) {
      inherits(SkipLastWithTimeObserver, __super__);
      function SkipLastWithTimeObserver(o, p) {
        this._o = o;
        this._s = p._s;
        this._d = p._d;
        this._q = [];
        __super__.call(this);
      }
      SkipLastWithTimeObserver.prototype.next = function(x) {
        var now = this._s.now();
        this._q.push({
          interval: now,
          value: x
        });
        while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
          this._o.onNext(this._q.shift().value);
        }
      };
      SkipLastWithTimeObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SkipLastWithTimeObserver.prototype.completed = function() {
        var now = this._s.now();
        while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
          this._o.onNext(this._q.shift().value);
        }
        this._o.onCompleted();
      };
      return SkipLastWithTimeObserver;
    }(AbstractObserver));
    observableProto.skipLastWithTime = function(duration, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new SkipLastWithTimeObservable(this, duration, scheduler);
    };
    var TakeLastWithTimeObservable = (function(__super__) {
      inherits(TakeLastWithTimeObservable, __super__);
      function TakeLastWithTimeObservable(source, d, s) {
        this.source = source;
        this._d = d;
        this._s = s;
        __super__.call(this);
      }
      TakeLastWithTimeObservable.prototype.subscribeCore = function(o) {
        return this.source.subscribe(new TakeLastWithTimeObserver(o, this._d, this._s));
      };
      return TakeLastWithTimeObservable;
    }(ObservableBase));
    var TakeLastWithTimeObserver = (function(__super__) {
      inherits(TakeLastWithTimeObserver, __super__);
      function TakeLastWithTimeObserver(o, d, s) {
        this._o = o;
        this._d = d;
        this._s = s;
        this._q = [];
        __super__.call(this);
      }
      TakeLastWithTimeObserver.prototype.next = function(x) {
        var now = this._s.now();
        this._q.push({
          interval: now,
          value: x
        });
        while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
          this._q.shift();
        }
      };
      TakeLastWithTimeObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      TakeLastWithTimeObserver.prototype.completed = function() {
        var now = this._s.now();
        while (this._q.length > 0) {
          var next = this._q.shift();
          if (now - next.interval <= this._d) {
            this._o.onNext(next.value);
          }
        }
        this._o.onCompleted();
      };
      return TakeLastWithTimeObserver;
    }(AbstractObserver));
    observableProto.takeLastWithTime = function(duration, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new TakeLastWithTimeObservable(this, duration, scheduler);
    };
    observableProto.takeLastBufferWithTime = function(duration, scheduler) {
      var source = this;
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new AnonymousObservable(function(o) {
        var q = [];
        return source.subscribe(function(x) {
          var now = scheduler.now();
          q.push({
            interval: now,
            value: x
          });
          while (q.length > 0 && now - q[0].interval >= duration) {
            q.shift();
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          var now = scheduler.now(),
              res = [];
          while (q.length > 0) {
            var next = q.shift();
            now - next.interval <= duration && res.push(next.value);
          }
          o.onNext(res);
          o.onCompleted();
        });
      }, source);
    };
    var TakeWithTimeObservable = (function(__super__) {
      inherits(TakeWithTimeObservable, __super__);
      function TakeWithTimeObservable(source, d, s) {
        this.source = source;
        this._d = d;
        this._s = s;
        __super__.call(this);
      }
      function scheduleMethod(s, o) {
        o.onCompleted();
      }
      TakeWithTimeObservable.prototype.subscribeCore = function(o) {
        return new BinaryDisposable(this._s.scheduleFuture(o, this._d, scheduleMethod), this.source.subscribe(o));
      };
      return TakeWithTimeObservable;
    }(ObservableBase));
    observableProto.takeWithTime = function(duration, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new TakeWithTimeObservable(this, duration, scheduler);
    };
    var SkipWithTimeObservable = (function(__super__) {
      inherits(SkipWithTimeObservable, __super__);
      function SkipWithTimeObservable(source, d, s) {
        this.source = source;
        this._d = d;
        this._s = s;
        this._open = false;
        __super__.call(this);
      }
      function scheduleMethod(s, self) {
        self._open = true;
      }
      SkipWithTimeObservable.prototype.subscribeCore = function(o) {
        return new BinaryDisposable(this._s.scheduleFuture(this, this._d, scheduleMethod), this.source.subscribe(new SkipWithTimeObserver(o, this)));
      };
      return SkipWithTimeObservable;
    }(ObservableBase));
    var SkipWithTimeObserver = (function(__super__) {
      inherits(SkipWithTimeObserver, __super__);
      function SkipWithTimeObserver(o, p) {
        this._o = o;
        this._p = p;
        __super__.call(this);
      }
      SkipWithTimeObserver.prototype.next = function(x) {
        this._p._open && this._o.onNext(x);
      };
      SkipWithTimeObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SkipWithTimeObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return SkipWithTimeObserver;
    }(AbstractObserver));
    observableProto.skipWithTime = function(duration, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new SkipWithTimeObservable(this, duration, scheduler);
    };
    var SkipUntilWithTimeObservable = (function(__super__) {
      inherits(SkipUntilWithTimeObservable, __super__);
      function SkipUntilWithTimeObservable(source, startTime, scheduler) {
        this.source = source;
        this._st = startTime;
        this._s = scheduler;
        __super__.call(this);
      }
      function scheduleMethod(s, state) {
        state._open = true;
      }
      SkipUntilWithTimeObservable.prototype.subscribeCore = function(o) {
        this._open = false;
        return new BinaryDisposable(this._s.scheduleFuture(this, this._st, scheduleMethod), this.source.subscribe(new SkipUntilWithTimeObserver(o, this)));
      };
      return SkipUntilWithTimeObservable;
    }(ObservableBase));
    var SkipUntilWithTimeObserver = (function(__super__) {
      inherits(SkipUntilWithTimeObserver, __super__);
      function SkipUntilWithTimeObserver(o, p) {
        this._o = o;
        this._p = p;
        __super__.call(this);
      }
      SkipUntilWithTimeObserver.prototype.next = function(x) {
        this._p._open && this._o.onNext(x);
      };
      SkipUntilWithTimeObserver.prototype.error = function(e) {
        this._o.onError(e);
      };
      SkipUntilWithTimeObserver.prototype.completed = function() {
        this._o.onCompleted();
      };
      return SkipUntilWithTimeObserver;
    }(AbstractObserver));
    observableProto.skipUntilWithTime = function(startTime, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return new SkipUntilWithTimeObservable(this, startTime, scheduler);
    };
    observableProto.takeUntilWithTime = function(endTime, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      var source = this;
      return new AnonymousObservable(function(o) {
        return new BinaryDisposable(scheduler.scheduleFuture(o, endTime, function(_, o) {
          o.onCompleted();
        }), source.subscribe(o));
      }, source);
    };
    observableProto.throttle = function(windowDuration, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      var duration = +windowDuration || 0;
      if (duration <= 0) {
        throw new RangeError('windowDuration cannot be less or equal zero.');
      }
      var source = this;
      return new AnonymousObservable(function(o) {
        var lastOnNext = 0;
        return source.subscribe(function(x) {
          var now = scheduler.now();
          if (lastOnNext === 0 || now - lastOnNext >= duration) {
            lastOnNext = now;
            o.onNext(x);
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    return Rx;
  }));
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0/index.js", ["npm:rx@4.1.0/dist/rx.js", "npm:rx@4.1.0/dist/rx.aggregates.js", "npm:rx@4.1.0/dist/rx.async.js", "npm:rx@4.1.0/dist/rx.backpressure.js", "npm:rx@4.1.0/dist/rx.binding.js", "npm:rx@4.1.0/dist/rx.coincidence.js", "npm:rx@4.1.0/dist/rx.experimental.js", "npm:rx@4.1.0/dist/rx.joinpatterns.js", "npm:rx@4.1.0/dist/rx.sorting.js", "npm:rx@4.1.0/dist/rx.virtualtime.js", "npm:rx@4.1.0/dist/rx.testing.js", "npm:rx@4.1.0/dist/rx.time.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Rx = $__require('npm:rx@4.1.0/dist/rx.js');
  $__require('npm:rx@4.1.0/dist/rx.aggregates.js');
  $__require('npm:rx@4.1.0/dist/rx.async.js');
  $__require('npm:rx@4.1.0/dist/rx.backpressure.js');
  $__require('npm:rx@4.1.0/dist/rx.binding.js');
  $__require('npm:rx@4.1.0/dist/rx.coincidence.js');
  $__require('npm:rx@4.1.0/dist/rx.experimental.js');
  $__require('npm:rx@4.1.0/dist/rx.joinpatterns.js');
  $__require('npm:rx@4.1.0/dist/rx.sorting.js');
  $__require('npm:rx@4.1.0/dist/rx.virtualtime.js');
  $__require('npm:rx@4.1.0/dist/rx.testing.js');
  $__require('npm:rx@4.1.0/dist/rx.time.js');
  module.exports = Rx;
  return module.exports;
});

System.registerDynamic("npm:rx@4.1.0.js", ["npm:rx@4.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:rx@4.1.0/index.js');
  return module.exports;
});

System.registerDynamic("github:CreateJS/EaselJS@0.8.2/lib/easeljs-0.8.2.combined.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    this.createjs = this.createjs || {};
    createjs.extend = function(subclass, superclass) {
      "use strict";
      function o() {
        this.constructor = subclass;
      }
      o.prototype = superclass.prototype;
      return (subclass.prototype = new o());
    };
    this.createjs = this.createjs || {};
    createjs.promote = function(subclass, prefix) {
      "use strict";
      var subP = subclass.prototype,
          supP = (Object.getPrototypeOf && Object.getPrototypeOf(subP)) || subP.__proto__;
      if (supP) {
        subP[(prefix += "_") + "constructor"] = supP.constructor;
        for (var n in supP) {
          if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) {
            subP[prefix + n] = supP[n];
          }
        }
      }
      return subclass;
    };
    this.createjs = this.createjs || {};
    createjs.indexOf = function(array, searchElement) {
      "use strict";
      for (var i = 0,
          l = array.length; i < l; i++) {
        if (searchElement === array[i]) {
          return i;
        }
      }
      return -1;
    };
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Event(type, bubbles, cancelable) {
        this.type = type;
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.bubbles = !!bubbles;
        this.cancelable = !!cancelable;
        this.timeStamp = (new Date()).getTime();
        this.defaultPrevented = false;
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.removed = false;
      }
      var p = Event.prototype;
      p.preventDefault = function() {
        this.defaultPrevented = this.cancelable && true;
      };
      p.stopPropagation = function() {
        this.propagationStopped = true;
      };
      p.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = true;
      };
      p.remove = function() {
        this.removed = true;
      };
      p.clone = function() {
        return new Event(this.type, this.bubbles, this.cancelable);
      };
      p.set = function(props) {
        for (var n in props) {
          this[n] = props[n];
        }
        return this;
      };
      p.toString = function() {
        return "[Event (type=" + this.type + ")]";
      };
      createjs.Event = Event;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function EventDispatcher() {
        this._listeners = null;
        this._captureListeners = null;
      }
      var p = EventDispatcher.prototype;
      EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.on = p.on;
        target.removeEventListener = target.off = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
        target._dispatchEvent = p._dispatchEvent;
        target.willTrigger = p.willTrigger;
      };
      p.addEventListener = function(type, listener, useCapture) {
        var listeners;
        if (useCapture) {
          listeners = this._captureListeners = this._captureListeners || {};
        } else {
          listeners = this._listeners = this._listeners || {};
        }
        var arr = listeners[type];
        if (arr) {
          this.removeEventListener(type, listener, useCapture);
        }
        arr = listeners[type];
        if (!arr) {
          listeners[type] = [listener];
        } else {
          arr.push(listener);
        }
        return listener;
      };
      p.on = function(type, listener, scope, once, data, useCapture) {
        if (listener.handleEvent) {
          scope = scope || listener;
          listener = listener.handleEvent;
        }
        scope = scope || this;
        return this.addEventListener(type, function(evt) {
          listener.call(scope, evt, data);
          once && evt.remove();
        }, useCapture);
      };
      p.removeEventListener = function(type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (!listeners) {
          return;
        }
        var arr = listeners[type];
        if (!arr) {
          return;
        }
        for (var i = 0,
            l = arr.length; i < l; i++) {
          if (arr[i] == listener) {
            if (l == 1) {
              delete(listeners[type]);
            } else {
              arr.splice(i, 1);
            }
            break;
          }
        }
      };
      p.off = p.removeEventListener;
      p.removeAllEventListeners = function(type) {
        if (!type) {
          this._listeners = this._captureListeners = null;
        } else {
          if (this._listeners) {
            delete(this._listeners[type]);
          }
          if (this._captureListeners) {
            delete(this._captureListeners[type]);
          }
        }
      };
      p.dispatchEvent = function(eventObj, bubbles, cancelable) {
        if (typeof eventObj == "string") {
          var listeners = this._listeners;
          if (!bubbles && (!listeners || !listeners[eventObj])) {
            return true;
          }
          eventObj = new createjs.Event(eventObj, bubbles, cancelable);
        } else if (eventObj.target && eventObj.clone) {
          eventObj = eventObj.clone();
        }
        try {
          eventObj.target = this;
        } catch (e) {}
        if (!eventObj.bubbles || !this.parent) {
          this._dispatchEvent(eventObj, 2);
        } else {
          var top = this,
              list = [top];
          while (top.parent) {
            list.push(top = top.parent);
          }
          var i,
              l = list.length;
          for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) {
            list[i]._dispatchEvent(eventObj, 1 + (i == 0));
          }
          for (i = 1; i < l && !eventObj.propagationStopped; i++) {
            list[i]._dispatchEvent(eventObj, 3);
          }
        }
        return !eventObj.defaultPrevented;
      };
      p.hasEventListener = function(type) {
        var listeners = this._listeners,
            captureListeners = this._captureListeners;
        return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
      };
      p.willTrigger = function(type) {
        var o = this;
        while (o) {
          if (o.hasEventListener(type)) {
            return true;
          }
          o = o.parent;
        }
        return false;
      };
      p.toString = function() {
        return "[EventDispatcher]";
      };
      p._dispatchEvent = function(eventObj, eventPhase) {
        var l,
            listeners = (eventPhase == 1) ? this._captureListeners : this._listeners;
        if (eventObj && listeners) {
          var arr = listeners[eventObj.type];
          if (!arr || !(l = arr.length)) {
            return;
          }
          try {
            eventObj.currentTarget = this;
          } catch (e) {}
          try {
            eventObj.eventPhase = eventPhase;
          } catch (e) {}
          eventObj.removed = false;
          arr = arr.slice();
          for (var i = 0; i < l && !eventObj.immediatePropagationStopped; i++) {
            var o = arr[i];
            if (o.handleEvent) {
              o.handleEvent(eventObj);
            } else {
              o(eventObj);
            }
            if (eventObj.removed) {
              this.off(eventObj.type, o, eventPhase == 1);
              eventObj.removed = false;
            }
          }
        }
      };
      createjs.EventDispatcher = EventDispatcher;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Ticker() {
        throw "Ticker cannot be instantiated.";
      }
      Ticker.RAF_SYNCHED = "synched";
      Ticker.RAF = "raf";
      Ticker.TIMEOUT = "timeout";
      Ticker.useRAF = false;
      Ticker.timingMode = null;
      Ticker.maxDelta = 0;
      Ticker.paused = false;
      Ticker.removeEventListener = null;
      Ticker.removeAllEventListeners = null;
      Ticker.dispatchEvent = null;
      Ticker.hasEventListener = null;
      Ticker._listeners = null;
      createjs.EventDispatcher.initialize(Ticker);
      Ticker._addEventListener = Ticker.addEventListener;
      Ticker.addEventListener = function() {
        !Ticker._inited && Ticker.init();
        return Ticker._addEventListener.apply(Ticker, arguments);
      };
      Ticker._inited = false;
      Ticker._startTime = 0;
      Ticker._pausedTime = 0;
      Ticker._ticks = 0;
      Ticker._pausedTicks = 0;
      Ticker._interval = 50;
      Ticker._lastTime = 0;
      Ticker._times = null;
      Ticker._tickTimes = null;
      Ticker._timerId = null;
      Ticker._raf = true;
      Ticker.setInterval = function(interval) {
        Ticker._interval = interval;
        if (!Ticker._inited) {
          return;
        }
        Ticker._setupTick();
      };
      Ticker.getInterval = function() {
        return Ticker._interval;
      };
      Ticker.setFPS = function(value) {
        Ticker.setInterval(1000 / value);
      };
      Ticker.getFPS = function() {
        return 1000 / Ticker._interval;
      };
      try {
        Object.defineProperties(Ticker, {
          interval: {
            get: Ticker.getInterval,
            set: Ticker.setInterval
          },
          framerate: {
            get: Ticker.getFPS,
            set: Ticker.setFPS
          }
        });
      } catch (e) {
        console.log(e);
      }
      Ticker.init = function() {
        if (Ticker._inited) {
          return;
        }
        Ticker._inited = true;
        Ticker._times = [];
        Ticker._tickTimes = [];
        Ticker._startTime = Ticker._getTime();
        Ticker._times.push(Ticker._lastTime = 0);
        Ticker.interval = Ticker._interval;
      };
      Ticker.reset = function() {
        if (Ticker._raf) {
          var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
          f && f(Ticker._timerId);
        } else {
          clearTimeout(Ticker._timerId);
        }
        Ticker.removeAllEventListeners("tick");
        Ticker._timerId = Ticker._times = Ticker._tickTimes = null;
        Ticker._startTime = Ticker._lastTime = Ticker._ticks = 0;
        Ticker._inited = false;
      };
      Ticker.getMeasuredTickTime = function(ticks) {
        var ttl = 0,
            times = Ticker._tickTimes;
        if (!times || times.length < 1) {
          return -1;
        }
        ticks = Math.min(times.length, ticks || (Ticker.getFPS() | 0));
        for (var i = 0; i < ticks; i++) {
          ttl += times[i];
        }
        return ttl / ticks;
      };
      Ticker.getMeasuredFPS = function(ticks) {
        var times = Ticker._times;
        if (!times || times.length < 2) {
          return -1;
        }
        ticks = Math.min(times.length - 1, ticks || (Ticker.getFPS() | 0));
        return 1000 / ((times[0] - times[ticks]) / ticks);
      };
      Ticker.setPaused = function(value) {
        Ticker.paused = value;
      };
      Ticker.getPaused = function() {
        return Ticker.paused;
      };
      Ticker.getTime = function(runTime) {
        return Ticker._startTime ? Ticker._getTime() - (runTime ? Ticker._pausedTime : 0) : -1;
      };
      Ticker.getEventTime = function(runTime) {
        return Ticker._startTime ? (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0) : -1;
      };
      Ticker.getTicks = function(pauseable) {
        return Ticker._ticks - (pauseable ? Ticker._pausedTicks : 0);
      };
      Ticker._handleSynch = function() {
        Ticker._timerId = null;
        Ticker._setupTick();
        if (Ticker._getTime() - Ticker._lastTime >= (Ticker._interval - 1) * 0.97) {
          Ticker._tick();
        }
      };
      Ticker._handleRAF = function() {
        Ticker._timerId = null;
        Ticker._setupTick();
        Ticker._tick();
      };
      Ticker._handleTimeout = function() {
        Ticker._timerId = null;
        Ticker._setupTick();
        Ticker._tick();
      };
      Ticker._setupTick = function() {
        if (Ticker._timerId != null) {
          return;
        }
        var mode = Ticker.timingMode || (Ticker.useRAF && Ticker.RAF_SYNCHED);
        if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
          var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
          if (f) {
            Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
            Ticker._raf = true;
            return;
          }
        }
        Ticker._raf = false;
        Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
      };
      Ticker._tick = function() {
        var paused = Ticker.paused;
        var time = Ticker._getTime();
        var elapsedTime = time - Ticker._lastTime;
        Ticker._lastTime = time;
        Ticker._ticks++;
        if (paused) {
          Ticker._pausedTicks++;
          Ticker._pausedTime += elapsedTime;
        }
        if (Ticker.hasEventListener("tick")) {
          var event = new createjs.Event("tick");
          var maxDelta = Ticker.maxDelta;
          event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
          event.paused = paused;
          event.time = time;
          event.runTime = time - Ticker._pausedTime;
          Ticker.dispatchEvent(event);
        }
        Ticker._tickTimes.unshift(Ticker._getTime() - time);
        while (Ticker._tickTimes.length > 100) {
          Ticker._tickTimes.pop();
        }
        Ticker._times.unshift(time);
        while (Ticker._times.length > 100) {
          Ticker._times.pop();
        }
      };
      var now = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
      Ticker._getTime = function() {
        return ((now && now.call(performance)) || (new Date().getTime())) - Ticker._startTime;
      };
      createjs.Ticker = Ticker;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function UID() {
        throw "UID cannot be instantiated";
      }
      UID._nextID = 0;
      UID.get = function() {
        return UID._nextID++;
      };
      createjs.UID = UID;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function MouseEvent(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY, relatedTarget) {
        this.Event_constructor(type, bubbles, cancelable);
        this.stageX = stageX;
        this.stageY = stageY;
        this.rawX = (rawX == null) ? stageX : rawX;
        this.rawY = (rawY == null) ? stageY : rawY;
        this.nativeEvent = nativeEvent;
        this.pointerID = pointerID;
        this.primary = !!primary;
        this.relatedTarget = relatedTarget;
      }
      var p = createjs.extend(MouseEvent, createjs.Event);
      p._get_localX = function() {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
      };
      p._get_localY = function() {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
      };
      p._get_isTouch = function() {
        return this.pointerID !== -1;
      };
      try {
        Object.defineProperties(p, {
          localX: {get: p._get_localX},
          localY: {get: p._get_localY},
          isTouch: {get: p._get_isTouch}
        });
      } catch (e) {}
      p.clone = function() {
        return new MouseEvent(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
      };
      p.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]";
      };
      createjs.MouseEvent = createjs.promote(MouseEvent, "Event");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Matrix2D(a, b, c, d, tx, ty) {
        this.setValues(a, b, c, d, tx, ty);
      }
      var p = Matrix2D.prototype;
      Matrix2D.DEG_TO_RAD = Math.PI / 180;
      Matrix2D.identity = null;
      p.setValues = function(a, b, c, d, tx, ty) {
        this.a = (a == null) ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = (d == null) ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
        return this;
      };
      p.append = function(a, b, c, d, tx, ty) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        if (a != 1 || b != 0 || c != 0 || d != 1) {
          this.a = a1 * a + c1 * b;
          this.b = b1 * a + d1 * b;
          this.c = a1 * c + c1 * d;
          this.d = b1 * c + d1 * d;
        }
        this.tx = a1 * tx + c1 * ty + this.tx;
        this.ty = b1 * tx + d1 * ty + this.ty;
        return this;
      };
      p.prepend = function(a, b, c, d, tx, ty) {
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = a * a1 + c * this.b;
        this.b = b * a1 + d * this.b;
        this.c = a * c1 + c * this.d;
        this.d = b * c1 + d * this.d;
        this.tx = a * tx1 + c * this.ty + tx;
        this.ty = b * tx1 + d * this.ty + ty;
        return this;
      };
      p.appendMatrix = function(matrix) {
        return this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
      };
      p.prependMatrix = function(matrix) {
        return this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
      };
      p.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        if (rotation % 360) {
          var r = rotation * Matrix2D.DEG_TO_RAD;
          var cos = Math.cos(r);
          var sin = Math.sin(r);
        } else {
          cos = 1;
          sin = 0;
        }
        if (skewX || skewY) {
          skewX *= Matrix2D.DEG_TO_RAD;
          skewY *= Matrix2D.DEG_TO_RAD;
          this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
          this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        } else {
          this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
        if (regX || regY) {
          this.tx -= regX * this.a + regY * this.c;
          this.ty -= regX * this.b + regY * this.d;
        }
        return this;
      };
      p.prependTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        if (rotation % 360) {
          var r = rotation * Matrix2D.DEG_TO_RAD;
          var cos = Math.cos(r);
          var sin = Math.sin(r);
        } else {
          cos = 1;
          sin = 0;
        }
        if (regX || regY) {
          this.tx -= regX;
          this.ty -= regY;
        }
        if (skewX || skewY) {
          skewX *= Matrix2D.DEG_TO_RAD;
          skewY *= Matrix2D.DEG_TO_RAD;
          this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
          this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
        } else {
          this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
        return this;
      };
      p.rotate = function(angle) {
        angle = angle * Matrix2D.DEG_TO_RAD;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a;
        var b1 = this.b;
        this.a = a1 * cos + this.c * sin;
        this.b = b1 * cos + this.d * sin;
        this.c = -a1 * sin + this.c * cos;
        this.d = -b1 * sin + this.d * cos;
        return this;
      };
      p.skew = function(skewX, skewY) {
        skewX = skewX * Matrix2D.DEG_TO_RAD;
        skewY = skewY * Matrix2D.DEG_TO_RAD;
        this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
        return this;
      };
      p.scale = function(x, y) {
        this.a *= x;
        this.b *= x;
        this.c *= y;
        this.d *= y;
        return this;
      };
      p.translate = function(x, y) {
        this.tx += this.a * x + this.c * y;
        this.ty += this.b * x + this.d * y;
        return this;
      };
      p.identity = function() {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
      };
      p.invert = function() {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        var tx1 = this.tx;
        var n = a1 * d1 - b1 * c1;
        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = (c1 * this.ty - d1 * tx1) / n;
        this.ty = -(a1 * this.ty - b1 * tx1) / n;
        return this;
      };
      p.isIdentity = function() {
        return this.tx === 0 && this.ty === 0 && this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1;
      };
      p.equals = function(matrix) {
        return this.tx === matrix.tx && this.ty === matrix.ty && this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d;
      };
      p.transformPoint = function(x, y, pt) {
        pt = pt || {};
        pt.x = x * this.a + y * this.c + this.tx;
        pt.y = x * this.b + y * this.d + this.ty;
        return pt;
      };
      p.decompose = function(target) {
        if (target == null) {
          target = {};
        }
        target.x = this.tx;
        target.y = this.ty;
        target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var skewX = Math.atan2(-this.c, this.d);
        var skewY = Math.atan2(this.b, this.a);
        var delta = Math.abs(1 - skewX / skewY);
        if (delta < 0.00001) {
          target.rotation = skewY / Matrix2D.DEG_TO_RAD;
          if (this.a < 0 && this.d >= 0) {
            target.rotation += (target.rotation <= 0) ? 180 : -180;
          }
          target.skewX = target.skewY = 0;
        } else {
          target.skewX = skewX / Matrix2D.DEG_TO_RAD;
          target.skewY = skewY / Matrix2D.DEG_TO_RAD;
        }
        return target;
      };
      p.copy = function(matrix) {
        return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
      };
      p.clone = function() {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
      };
      p.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]";
      };
      Matrix2D.identity = new Matrix2D();
      createjs.Matrix2D = Matrix2D;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function DisplayProps(visible, alpha, shadow, compositeOperation, matrix) {
        this.setValues(visible, alpha, shadow, compositeOperation, matrix);
      }
      var p = DisplayProps.prototype;
      p.setValues = function(visible, alpha, shadow, compositeOperation, matrix) {
        this.visible = visible == null ? true : !!visible;
        this.alpha = alpha == null ? 1 : alpha;
        this.shadow = shadow;
        this.compositeOperation = compositeOperation;
        this.matrix = matrix || (this.matrix && this.matrix.identity()) || new createjs.Matrix2D();
        return this;
      };
      p.append = function(visible, alpha, shadow, compositeOperation, matrix) {
        this.alpha *= alpha;
        this.shadow = shadow || this.shadow;
        this.compositeOperation = compositeOperation || this.compositeOperation;
        this.visible = this.visible && visible;
        matrix && this.matrix.appendMatrix(matrix);
        return this;
      };
      p.prepend = function(visible, alpha, shadow, compositeOperation, matrix) {
        this.alpha *= alpha;
        this.shadow = this.shadow || shadow;
        this.compositeOperation = this.compositeOperation || compositeOperation;
        this.visible = this.visible && visible;
        matrix && this.matrix.prependMatrix(matrix);
        return this;
      };
      p.identity = function() {
        this.visible = true;
        this.alpha = 1;
        this.shadow = this.compositeOperation = null;
        this.matrix.identity();
        return this;
      };
      p.clone = function() {
        return new DisplayProps(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone());
      };
      createjs.DisplayProps = DisplayProps;
    })();
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Point(x, y) {
        this.setValues(x, y);
      }
      var p = Point.prototype;
      p.setValues = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
      };
      p.copy = function(point) {
        this.x = point.x;
        this.y = point.y;
        return this;
      };
      p.clone = function() {
        return new Point(this.x, this.y);
      };
      p.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
      };
      createjs.Point = Point;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Rectangle(x, y, width, height) {
        this.setValues(x, y, width, height);
      }
      var p = Rectangle.prototype;
      p.setValues = function(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        return this;
      };
      p.extend = function(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        if (x + width > this.x + this.width) {
          this.width = x + width - this.x;
        }
        if (y + height > this.y + this.height) {
          this.height = y + height - this.y;
        }
        if (x < this.x) {
          this.width += this.x - x;
          this.x = x;
        }
        if (y < this.y) {
          this.height += this.y - y;
          this.y = y;
        }
        return this;
      };
      p.pad = function(top, left, bottom, right) {
        this.x -= left;
        this.y -= top;
        this.width += left + right;
        this.height += top + bottom;
        return this;
      };
      p.copy = function(rectangle) {
        return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      };
      p.contains = function(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        return (x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height);
      };
      p.union = function(rect) {
        return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
      };
      p.intersection = function(rect) {
        var x1 = rect.x,
            y1 = rect.y,
            x2 = x1 + rect.width,
            y2 = y1 + rect.height;
        if (this.x > x1) {
          x1 = this.x;
        }
        if (this.y > y1) {
          y1 = this.y;
        }
        if (this.x + this.width < x2) {
          x2 = this.x + this.width;
        }
        if (this.y + this.height < y2) {
          y2 = this.y + this.height;
        }
        return (x2 <= x1 || y2 <= y1) ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
      };
      p.intersects = function(rect) {
        return (rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height);
      };
      p.isEmpty = function() {
        return this.width <= 0 || this.height <= 0;
      };
      p.clone = function() {
        return new Rectangle(this.x, this.y, this.width, this.height);
      };
      p.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
      };
      createjs.Rectangle = Rectangle;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function ButtonHelper(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
        if (!target.addEventListener) {
          return;
        }
        this.target = target;
        this.overLabel = overLabel == null ? "over" : overLabel;
        this.outLabel = outLabel == null ? "out" : outLabel;
        this.downLabel = downLabel == null ? "down" : downLabel;
        this.play = play;
        this._isPressed = false;
        this._isOver = false;
        this._enabled = false;
        target.mouseChildren = false;
        this.enabled = true;
        this.handleEvent({});
        if (hitArea) {
          if (hitLabel) {
            hitArea.actionsEnabled = false;
            hitArea.gotoAndStop && hitArea.gotoAndStop(hitLabel);
          }
          target.hitArea = hitArea;
        }
      }
      var p = ButtonHelper.prototype;
      p.setEnabled = function(value) {
        if (value == this._enabled) {
          return;
        }
        var o = this.target;
        this._enabled = value;
        if (value) {
          o.cursor = "pointer";
          o.addEventListener("rollover", this);
          o.addEventListener("rollout", this);
          o.addEventListener("mousedown", this);
          o.addEventListener("pressup", this);
          if (o._reset) {
            o.__reset = o._reset;
            o._reset = this._reset;
          }
        } else {
          o.cursor = null;
          o.removeEventListener("rollover", this);
          o.removeEventListener("rollout", this);
          o.removeEventListener("mousedown", this);
          o.removeEventListener("pressup", this);
          if (o.__reset) {
            o._reset = o.__reset;
            delete(o.__reset);
          }
        }
      };
      p.getEnabled = function() {
        return this._enabled;
      };
      try {
        Object.defineProperties(p, {enabled: {
            get: p.getEnabled,
            set: p.setEnabled
          }});
      } catch (e) {}
      p.toString = function() {
        return "[ButtonHelper]";
      };
      p.handleEvent = function(evt) {
        var label,
            t = this.target,
            type = evt.type;
        if (type == "mousedown") {
          this._isPressed = true;
          label = this.downLabel;
        } else if (type == "pressup") {
          this._isPressed = false;
          label = this._isOver ? this.overLabel : this.outLabel;
        } else if (type == "rollover") {
          this._isOver = true;
          label = this._isPressed ? this.downLabel : this.overLabel;
        } else {
          this._isOver = false;
          label = this._isPressed ? this.overLabel : this.outLabel;
        }
        if (this.play) {
          t.gotoAndPlay && t.gotoAndPlay(label);
        } else {
          t.gotoAndStop && t.gotoAndStop(label);
        }
      };
      p._reset = function() {
        var p = this.paused;
        this.__reset();
        this.paused = p;
      };
      createjs.ButtonHelper = ButtonHelper;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Shadow(color, offsetX, offsetY, blur) {
        this.color = color || "black";
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        this.blur = blur || 0;
      }
      var p = Shadow.prototype;
      Shadow.identity = new Shadow("transparent", 0, 0, 0);
      p.toString = function() {
        return "[Shadow]";
      };
      p.clone = function() {
        return new Shadow(this.color, this.offsetX, this.offsetY, this.blur);
      };
      createjs.Shadow = Shadow;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function SpriteSheet(data) {
        this.EventDispatcher_constructor();
        this.complete = true;
        this.framerate = 0;
        this._animations = null;
        this._frames = null;
        this._images = null;
        this._data = null;
        this._loadCount = 0;
        this._frameHeight = 0;
        this._frameWidth = 0;
        this._numFrames = 0;
        this._regX = 0;
        this._regY = 0;
        this._spacing = 0;
        this._margin = 0;
        this._parseData(data);
      }
      var p = createjs.extend(SpriteSheet, createjs.EventDispatcher);
      p.getAnimations = function() {
        return this._animations.slice();
      };
      try {
        Object.defineProperties(p, {animations: {get: p.getAnimations}});
      } catch (e) {}
      p.getNumFrames = function(animation) {
        if (animation == null) {
          return this._frames ? this._frames.length : this._numFrames || 0;
        } else {
          var data = this._data[animation];
          if (data == null) {
            return 0;
          } else {
            return data.frames.length;
          }
        }
      };
      p.getAnimation = function(name) {
        return this._data[name];
      };
      p.getFrame = function(frameIndex) {
        var frame;
        if (this._frames && (frame = this._frames[frameIndex])) {
          return frame;
        }
        return null;
      };
      p.getFrameBounds = function(frameIndex, rectangle) {
        var frame = this.getFrame(frameIndex);
        return frame ? (rectangle || new createjs.Rectangle()).setValues(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height) : null;
      };
      p.toString = function() {
        return "[SpriteSheet]";
      };
      p.clone = function() {
        throw ("SpriteSheet cannot be cloned.");
      };
      p._parseData = function(data) {
        var i,
            l,
            o,
            a;
        if (data == null) {
          return;
        }
        this.framerate = data.framerate || 0;
        if (data.images && (l = data.images.length) > 0) {
          a = this._images = [];
          for (i = 0; i < l; i++) {
            var img = data.images[i];
            if (typeof img == "string") {
              var src = img;
              img = document.createElement("img");
              img.src = src;
            }
            a.push(img);
            if (!img.getContext && !img.naturalWidth) {
              this._loadCount++;
              this.complete = false;
              (function(o, src) {
                img.onload = function() {
                  o._handleImageLoad(src);
                };
              })(this, src);
              (function(o, src) {
                img.onerror = function() {
                  o._handleImageError(src);
                };
              })(this, src);
            }
          }
        }
        if (data.frames == null) {} else if (Array.isArray(data.frames)) {
          this._frames = [];
          a = data.frames;
          for (i = 0, l = a.length; i < l; i++) {
            var arr = a[i];
            this._frames.push({
              image: this._images[arr[4] ? arr[4] : 0],
              rect: new createjs.Rectangle(arr[0], arr[1], arr[2], arr[3]),
              regX: arr[5] || 0,
              regY: arr[6] || 0
            });
          }
        } else {
          o = data.frames;
          this._frameWidth = o.width;
          this._frameHeight = o.height;
          this._regX = o.regX || 0;
          this._regY = o.regY || 0;
          this._spacing = o.spacing || 0;
          this._margin = o.margin || 0;
          this._numFrames = o.count;
          if (this._loadCount == 0) {
            this._calculateFrames();
          }
        }
        this._animations = [];
        if ((o = data.animations) != null) {
          this._data = {};
          var name;
          for (name in o) {
            var anim = {name: name};
            var obj = o[name];
            if (typeof obj == "number") {
              a = anim.frames = [obj];
            } else if (Array.isArray(obj)) {
              if (obj.length == 1) {
                anim.frames = [obj[0]];
              } else {
                anim.speed = obj[3];
                anim.next = obj[2];
                a = anim.frames = [];
                for (i = obj[0]; i <= obj[1]; i++) {
                  a.push(i);
                }
              }
            } else {
              anim.speed = obj.speed;
              anim.next = obj.next;
              var frames = obj.frames;
              a = anim.frames = (typeof frames == "number") ? [frames] : frames.slice(0);
            }
            if (anim.next === true || anim.next === undefined) {
              anim.next = name;
            }
            if (anim.next === false || (a.length < 2 && anim.next == name)) {
              anim.next = null;
            }
            if (!anim.speed) {
              anim.speed = 1;
            }
            this._animations.push(name);
            this._data[name] = anim;
          }
        }
      };
      p._handleImageLoad = function(src) {
        if (--this._loadCount == 0) {
          this._calculateFrames();
          this.complete = true;
          this.dispatchEvent("complete");
        }
      };
      p._handleImageError = function(src) {
        var errorEvent = new createjs.Event("error");
        errorEvent.src = src;
        this.dispatchEvent(errorEvent);
        if (--this._loadCount == 0) {
          this.dispatchEvent("complete");
        }
      };
      p._calculateFrames = function() {
        if (this._frames || this._frameWidth == 0) {
          return;
        }
        this._frames = [];
        var maxFrames = this._numFrames || 100000;
        var frameCount = 0,
            frameWidth = this._frameWidth,
            frameHeight = this._frameHeight;
        var spacing = this._spacing,
            margin = this._margin;
        imgLoop: for (var i = 0,
            imgs = this._images; i < imgs.length; i++) {
          var img = imgs[i],
              imgW = img.width,
              imgH = img.height;
          var y = margin;
          while (y <= imgH - margin - frameHeight) {
            var x = margin;
            while (x <= imgW - margin - frameWidth) {
              if (frameCount >= maxFrames) {
                break imgLoop;
              }
              frameCount++;
              this._frames.push({
                image: img,
                rect: new createjs.Rectangle(x, y, frameWidth, frameHeight),
                regX: this._regX,
                regY: this._regY
              });
              x += frameWidth + spacing;
            }
            y += frameHeight + spacing;
          }
        }
        this._numFrames = frameCount;
      };
      createjs.SpriteSheet = createjs.promote(SpriteSheet, "EventDispatcher");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Graphics() {
        this.command = null;
        this._stroke = null;
        this._strokeStyle = null;
        this._oldStrokeStyle = null;
        this._strokeDash = null;
        this._oldStrokeDash = null;
        this._strokeIgnoreScale = false;
        this._fill = null;
        this._instructions = [];
        this._commitIndex = 0;
        this._activeInstructions = [];
        this._dirty = false;
        this._storeIndex = 0;
        this.clear();
      }
      var p = Graphics.prototype;
      var G = Graphics;
      Graphics.getRGB = function(r, g, b, alpha) {
        if (r != null && b == null) {
          alpha = g;
          b = r & 0xFF;
          g = r >> 8 & 0xFF;
          r = r >> 16 & 0xFF;
        }
        if (alpha == null) {
          return "rgb(" + r + "," + g + "," + b + ")";
        } else {
          return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
        }
      };
      Graphics.getHSL = function(hue, saturation, lightness, alpha) {
        if (alpha == null) {
          return "hsl(" + (hue % 360) + "," + saturation + "%," + lightness + "%)";
        } else {
          return "hsla(" + (hue % 360) + "," + saturation + "%," + lightness + "%," + alpha + ")";
        }
      };
      Graphics.BASE_64 = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9,
        "K": 10,
        "L": 11,
        "M": 12,
        "N": 13,
        "O": 14,
        "P": 15,
        "Q": 16,
        "R": 17,
        "S": 18,
        "T": 19,
        "U": 20,
        "V": 21,
        "W": 22,
        "X": 23,
        "Y": 24,
        "Z": 25,
        "a": 26,
        "b": 27,
        "c": 28,
        "d": 29,
        "e": 30,
        "f": 31,
        "g": 32,
        "h": 33,
        "i": 34,
        "j": 35,
        "k": 36,
        "l": 37,
        "m": 38,
        "n": 39,
        "o": 40,
        "p": 41,
        "q": 42,
        "r": 43,
        "s": 44,
        "t": 45,
        "u": 46,
        "v": 47,
        "w": 48,
        "x": 49,
        "y": 50,
        "z": 51,
        "0": 52,
        "1": 53,
        "2": 54,
        "3": 55,
        "4": 56,
        "5": 57,
        "6": 58,
        "7": 59,
        "8": 60,
        "9": 61,
        "+": 62,
        "/": 63
      };
      Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];
      Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
      var canvas = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
      if (canvas.getContext) {
        Graphics._ctx = canvas.getContext("2d");
        canvas.width = canvas.height = 1;
      }
      p.getInstructions = function() {
        this._updateInstructions();
        return this._instructions;
      };
      try {
        Object.defineProperties(p, {instructions: {get: p.getInstructions}});
      } catch (e) {}
      p.isEmpty = function() {
        return !(this._instructions.length || this._activeInstructions.length);
      };
      p.draw = function(ctx, data) {
        this._updateInstructions();
        var instr = this._instructions;
        for (var i = this._storeIndex,
            l = instr.length; i < l; i++) {
          instr[i].exec(ctx, data);
        }
      };
      p.drawAsPath = function(ctx) {
        this._updateInstructions();
        var instr,
            instrs = this._instructions;
        for (var i = this._storeIndex,
            l = instrs.length; i < l; i++) {
          if ((instr = instrs[i]).path !== false) {
            instr.exec(ctx);
          }
        }
      };
      p.moveTo = function(x, y) {
        return this.append(new G.MoveTo(x, y), true);
      };
      p.lineTo = function(x, y) {
        return this.append(new G.LineTo(x, y));
      };
      p.arcTo = function(x1, y1, x2, y2, radius) {
        return this.append(new G.ArcTo(x1, y1, x2, y2, radius));
      };
      p.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
        return this.append(new G.Arc(x, y, radius, startAngle, endAngle, anticlockwise));
      };
      p.quadraticCurveTo = function(cpx, cpy, x, y) {
        return this.append(new G.QuadraticCurveTo(cpx, cpy, x, y));
      };
      p.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
        return this.append(new G.BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
      };
      p.rect = function(x, y, w, h) {
        return this.append(new G.Rect(x, y, w, h));
      };
      p.closePath = function() {
        return this._activeInstructions.length ? this.append(new G.ClosePath()) : this;
      };
      p.clear = function() {
        this._instructions.length = this._activeInstructions.length = this._commitIndex = 0;
        this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null;
        this._dirty = this._strokeIgnoreScale = false;
        return this;
      };
      p.beginFill = function(color) {
        return this._setFill(color ? new G.Fill(color) : null);
      };
      p.beginLinearGradientFill = function(colors, ratios, x0, y0, x1, y1) {
        return this._setFill(new G.Fill().linearGradient(colors, ratios, x0, y0, x1, y1));
      };
      p.beginRadialGradientFill = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
        return this._setFill(new G.Fill().radialGradient(colors, ratios, x0, y0, r0, x1, y1, r1));
      };
      p.beginBitmapFill = function(image, repetition, matrix) {
        return this._setFill(new G.Fill(null, matrix).bitmap(image, repetition));
      };
      p.endFill = function() {
        return this.beginFill();
      };
      p.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
        this._updateInstructions(true);
        this._strokeStyle = this.command = new G.StrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);
        if (this._stroke) {
          this._stroke.ignoreScale = ignoreScale;
        }
        this._strokeIgnoreScale = ignoreScale;
        return this;
      };
      p.setStrokeDash = function(segments, offset) {
        this._updateInstructions(true);
        this._strokeDash = this.command = new G.StrokeDash(segments, offset);
        return this;
      };
      p.beginStroke = function(color) {
        return this._setStroke(color ? new G.Stroke(color) : null);
      };
      p.beginLinearGradientStroke = function(colors, ratios, x0, y0, x1, y1) {
        return this._setStroke(new G.Stroke().linearGradient(colors, ratios, x0, y0, x1, y1));
      };
      p.beginRadialGradientStroke = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
        return this._setStroke(new G.Stroke().radialGradient(colors, ratios, x0, y0, r0, x1, y1, r1));
      };
      p.beginBitmapStroke = function(image, repetition) {
        return this._setStroke(new G.Stroke().bitmap(image, repetition));
      };
      p.endStroke = function() {
        return this.beginStroke();
      };
      p.curveTo = p.quadraticCurveTo;
      p.drawRect = p.rect;
      p.drawRoundRect = function(x, y, w, h, radius) {
        return this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius);
      };
      p.drawRoundRectComplex = function(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
        return this.append(new G.RoundRect(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL));
      };
      p.drawCircle = function(x, y, radius) {
        return this.append(new G.Circle(x, y, radius));
      };
      p.drawEllipse = function(x, y, w, h) {
        return this.append(new G.Ellipse(x, y, w, h));
      };
      p.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
        return this.append(new G.PolyStar(x, y, radius, sides, pointSize, angle));
      };
      p.append = function(command, clean) {
        this._activeInstructions.push(command);
        this.command = command;
        if (!clean) {
          this._dirty = true;
        }
        return this;
      };
      p.decodePath = function(str) {
        var instructions = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath];
        var paramCount = [2, 2, 4, 6, 0];
        var i = 0,
            l = str.length;
        var params = [];
        var x = 0,
            y = 0;
        var base64 = Graphics.BASE_64;
        while (i < l) {
          var c = str.charAt(i);
          var n = base64[c];
          var fi = n >> 3;
          var f = instructions[fi];
          if (!f || (n & 3)) {
            throw ("bad path data (@" + i + "): " + c);
          }
          var pl = paramCount[fi];
          if (!fi) {
            x = y = 0;
          }
          params.length = 0;
          i++;
          var charCount = (n >> 2 & 1) + 2;
          for (var p = 0; p < pl; p++) {
            var num = base64[str.charAt(i)];
            var sign = (num >> 5) ? -1 : 1;
            num = ((num & 31) << 6) | (base64[str.charAt(i + 1)]);
            if (charCount == 3) {
              num = (num << 6) | (base64[str.charAt(i + 2)]);
            }
            num = sign * num / 10;
            if (p % 2) {
              x = (num += x);
            } else {
              y = (num += y);
            }
            params[p] = num;
            i += charCount;
          }
          f.apply(this, params);
        }
        return this;
      };
      p.store = function() {
        this._updateInstructions(true);
        this._storeIndex = this._instructions.length;
        return this;
      };
      p.unstore = function() {
        this._storeIndex = 0;
        return this;
      };
      p.clone = function() {
        var o = new Graphics();
        o.command = this.command;
        o._stroke = this._stroke;
        o._strokeStyle = this._strokeStyle;
        o._strokeDash = this._strokeDash;
        o._strokeIgnoreScale = this._strokeIgnoreScale;
        o._fill = this._fill;
        o._instructions = this._instructions.slice();
        o._commitIndex = this._commitIndex;
        o._activeInstructions = this._activeInstructions.slice();
        o._dirty = this._dirty;
        o._storeIndex = this._storeIndex;
        return o;
      };
      p.toString = function() {
        return "[Graphics]";
      };
      p.mt = p.moveTo;
      p.lt = p.lineTo;
      p.at = p.arcTo;
      p.bt = p.bezierCurveTo;
      p.qt = p.quadraticCurveTo;
      p.a = p.arc;
      p.r = p.rect;
      p.cp = p.closePath;
      p.c = p.clear;
      p.f = p.beginFill;
      p.lf = p.beginLinearGradientFill;
      p.rf = p.beginRadialGradientFill;
      p.bf = p.beginBitmapFill;
      p.ef = p.endFill;
      p.ss = p.setStrokeStyle;
      p.sd = p.setStrokeDash;
      p.s = p.beginStroke;
      p.ls = p.beginLinearGradientStroke;
      p.rs = p.beginRadialGradientStroke;
      p.bs = p.beginBitmapStroke;
      p.es = p.endStroke;
      p.dr = p.drawRect;
      p.rr = p.drawRoundRect;
      p.rc = p.drawRoundRectComplex;
      p.dc = p.drawCircle;
      p.de = p.drawEllipse;
      p.dp = p.drawPolyStar;
      p.p = p.decodePath;
      p._updateInstructions = function(commit) {
        var instr = this._instructions,
            active = this._activeInstructions,
            commitIndex = this._commitIndex;
        if (this._dirty && active.length) {
          instr.length = commitIndex;
          instr.push(Graphics.beginCmd);
          var l = active.length,
              ll = instr.length;
          instr.length = ll + l;
          for (var i = 0; i < l; i++) {
            instr[i + ll] = active[i];
          }
          if (this._fill) {
            instr.push(this._fill);
          }
          if (this._stroke) {
            if (this._strokeDash !== this._oldStrokeDash) {
              this._oldStrokeDash = this._strokeDash;
              instr.push(this._strokeDash);
            }
            if (this._strokeStyle !== this._oldStrokeStyle) {
              this._oldStrokeStyle = this._strokeStyle;
              instr.push(this._strokeStyle);
            }
            instr.push(this._stroke);
          }
          this._dirty = false;
        }
        if (commit) {
          active.length = 0;
          this._commitIndex = instr.length;
        }
      };
      p._setFill = function(fill) {
        this._updateInstructions(true);
        this.command = this._fill = fill;
        return this;
      };
      p._setStroke = function(stroke) {
        this._updateInstructions(true);
        if (this.command = this._stroke = stroke) {
          stroke.ignoreScale = this._strokeIgnoreScale;
        }
        return this;
      };
      (G.LineTo = function(x, y) {
        this.x = x;
        this.y = y;
      }).prototype.exec = function(ctx) {
        ctx.lineTo(this.x, this.y);
      };
      (G.MoveTo = function(x, y) {
        this.x = x;
        this.y = y;
      }).prototype.exec = function(ctx) {
        ctx.moveTo(this.x, this.y);
      };
      (G.ArcTo = function(x1, y1, x2, y2, radius) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.radius = radius;
      }).prototype.exec = function(ctx) {
        ctx.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
      };
      (G.Arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = !!anticlockwise;
      }).prototype.exec = function(ctx) {
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
      };
      (G.QuadraticCurveTo = function(cpx, cpy, x, y) {
        this.cpx = cpx;
        this.cpy = cpy;
        this.x = x;
        this.y = y;
      }).prototype.exec = function(ctx) {
        ctx.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
      };
      (G.BezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.x = x;
        this.y = y;
      }).prototype.exec = function(ctx) {
        ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y);
      };
      (G.Rect = function(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
      }).prototype.exec = function(ctx) {
        ctx.rect(this.x, this.y, this.w, this.h);
      };
      (G.ClosePath = function() {}).prototype.exec = function(ctx) {
        ctx.closePath();
      };
      (G.BeginPath = function() {}).prototype.exec = function(ctx) {
        ctx.beginPath();
      };
      p = (G.Fill = function(style, matrix) {
        this.style = style;
        this.matrix = matrix;
      }).prototype;
      p.exec = function(ctx) {
        if (!this.style) {
          return;
        }
        ctx.fillStyle = this.style;
        var mtx = this.matrix;
        if (mtx) {
          ctx.save();
          ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        }
        ctx.fill();
        if (mtx) {
          ctx.restore();
        }
      };
      p.linearGradient = function(colors, ratios, x0, y0, x1, y1) {
        var o = this.style = Graphics._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0,
            l = colors.length; i < l; i++) {
          o.addColorStop(ratios[i], colors[i]);
        }
        o.props = {
          colors: colors,
          ratios: ratios,
          x0: x0,
          y0: y0,
          x1: x1,
          y1: y1,
          type: "linear"
        };
        return this;
      };
      p.radialGradient = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
        var o = this.style = Graphics._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0,
            l = colors.length; i < l; i++) {
          o.addColorStop(ratios[i], colors[i]);
        }
        o.props = {
          colors: colors,
          ratios: ratios,
          x0: x0,
          y0: y0,
          r0: r0,
          x1: x1,
          y1: y1,
          r1: r1,
          type: "radial"
        };
        return this;
      };
      p.bitmap = function(image, repetition) {
        if (image.naturalWidth || image.getContext || image.readyState >= 2) {
          var o = this.style = Graphics._ctx.createPattern(image, repetition || "");
          o.props = {
            image: image,
            repetition: repetition,
            type: "bitmap"
          };
        }
        return this;
      };
      p.path = false;
      p = (G.Stroke = function(style, ignoreScale) {
        this.style = style;
        this.ignoreScale = ignoreScale;
      }).prototype;
      p.exec = function(ctx) {
        if (!this.style) {
          return;
        }
        ctx.strokeStyle = this.style;
        if (this.ignoreScale) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.stroke();
        if (this.ignoreScale) {
          ctx.restore();
        }
      };
      p.linearGradient = G.Fill.prototype.linearGradient;
      p.radialGradient = G.Fill.prototype.radialGradient;
      p.bitmap = G.Fill.prototype.bitmap;
      p.path = false;
      p = (G.StrokeStyle = function(width, caps, joints, miterLimit, ignoreScale) {
        this.width = width;
        this.caps = caps;
        this.joints = joints;
        this.miterLimit = miterLimit;
        this.ignoreScale = ignoreScale;
      }).prototype;
      p.exec = function(ctx) {
        ctx.lineWidth = (this.width == null ? "1" : this.width);
        ctx.lineCap = (this.caps == null ? "butt" : (isNaN(this.caps) ? this.caps : Graphics.STROKE_CAPS_MAP[this.caps]));
        ctx.lineJoin = (this.joints == null ? "miter" : (isNaN(this.joints) ? this.joints : Graphics.STROKE_JOINTS_MAP[this.joints]));
        ctx.miterLimit = (this.miterLimit == null ? "10" : this.miterLimit);
        ctx.ignoreScale = (this.ignoreScale == null ? false : this.ignoreScale);
      };
      p.path = false;
      (G.StrokeDash = function(segments, offset) {
        this.segments = segments;
        this.offset = offset || 0;
      }).prototype.exec = function(ctx) {
        if (ctx.setLineDash) {
          ctx.setLineDash(this.segments || G.StrokeDash.EMPTY_SEGMENTS);
          ctx.lineDashOffset = this.offset || 0;
        }
      };
      G.StrokeDash.EMPTY_SEGMENTS = [];
      (G.RoundRect = function(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.radiusTL = radiusTL;
        this.radiusTR = radiusTR;
        this.radiusBR = radiusBR;
        this.radiusBL = radiusBL;
      }).prototype.exec = function(ctx) {
        var max = (w < h ? w : h) / 2;
        var mTL = 0,
            mTR = 0,
            mBR = 0,
            mBL = 0;
        var x = this.x,
            y = this.y,
            w = this.w,
            h = this.h;
        var rTL = this.radiusTL,
            rTR = this.radiusTR,
            rBR = this.radiusBR,
            rBL = this.radiusBL;
        if (rTL < 0) {
          rTL *= (mTL = -1);
        }
        if (rTL > max) {
          rTL = max;
        }
        if (rTR < 0) {
          rTR *= (mTR = -1);
        }
        if (rTR > max) {
          rTR = max;
        }
        if (rBR < 0) {
          rBR *= (mBR = -1);
        }
        if (rBR > max) {
          rBR = max;
        }
        if (rBL < 0) {
          rBL *= (mBL = -1);
        }
        if (rBL > max) {
          rBL = max;
        }
        ctx.moveTo(x + w - rTR, y);
        ctx.arcTo(x + w + rTR * mTR, y - rTR * mTR, x + w, y + rTR, rTR);
        ctx.lineTo(x + w, y + h - rBR);
        ctx.arcTo(x + w + rBR * mBR, y + h + rBR * mBR, x + w - rBR, y + h, rBR);
        ctx.lineTo(x + rBL, y + h);
        ctx.arcTo(x - rBL * mBL, y + h + rBL * mBL, x, y + h - rBL, rBL);
        ctx.lineTo(x, y + rTL);
        ctx.arcTo(x - rTL * mTL, y - rTL * mTL, x + rTL, y, rTL);
        ctx.closePath();
      };
      (G.Circle = function(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
      }).prototype.exec = function(ctx) {
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      };
      (G.Ellipse = function(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
      }).prototype.exec = function(ctx) {
        var x = this.x,
            y = this.y;
        var w = this.w,
            h = this.h;
        var k = 0.5522848;
        var ox = (w / 2) * k;
        var oy = (h / 2) * k;
        var xe = x + w;
        var ye = y + h;
        var xm = x + w / 2;
        var ym = y + h / 2;
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      };
      (G.PolyStar = function(x, y, radius, sides, pointSize, angle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.pointSize = pointSize;
        this.angle = angle;
      }).prototype.exec = function(ctx) {
        var x = this.x,
            y = this.y;
        var radius = this.radius;
        var angle = (this.angle || 0) / 180 * Math.PI;
        var sides = this.sides;
        var ps = 1 - (this.pointSize || 0);
        var a = Math.PI / sides;
        ctx.moveTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
        for (var i = 0; i < sides; i++) {
          angle += a;
          if (ps != 1) {
            ctx.lineTo(x + Math.cos(angle) * radius * ps, y + Math.sin(angle) * radius * ps);
          }
          angle += a;
          ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
        }
        ctx.closePath();
      };
      Graphics.beginCmd = new G.BeginPath();
      createjs.Graphics = Graphics;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function DisplayObject() {
        this.EventDispatcher_constructor();
        this.alpha = 1;
        this.cacheCanvas = null;
        this.cacheID = 0;
        this.id = createjs.UID.get();
        this.mouseEnabled = true;
        this.tickEnabled = true;
        this.name = null;
        this.parent = null;
        this.regX = 0;
        this.regY = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.skewX = 0;
        this.skewY = 0;
        this.shadow = null;
        this.visible = true;
        this.x = 0;
        this.y = 0;
        this.transformMatrix = null;
        this.compositeOperation = null;
        this.snapToPixel = true;
        this.filters = null;
        this.mask = null;
        this.hitArea = null;
        this.cursor = null;
        this._cacheOffsetX = 0;
        this._cacheOffsetY = 0;
        this._filterOffsetX = 0;
        this._filterOffsetY = 0;
        this._cacheScale = 1;
        this._cacheDataURLID = 0;
        this._cacheDataURL = null;
        this._props = new createjs.DisplayProps();
        this._rectangle = new createjs.Rectangle();
        this._bounds = null;
      }
      var p = createjs.extend(DisplayObject, createjs.EventDispatcher);
      DisplayObject._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"];
      DisplayObject.suppressCrossDomainErrors = false;
      DisplayObject._snapToPixelEnabled = false;
      var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
      if (canvas.getContext) {
        DisplayObject._hitTestCanvas = canvas;
        DisplayObject._hitTestContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1;
      }
      DisplayObject._nextCacheID = 1;
      p.getStage = function() {
        var o = this,
            _Stage = createjs["Stage"];
        while (o.parent) {
          o = o.parent;
        }
        if (o instanceof _Stage) {
          return o;
        }
        return null;
      };
      try {
        Object.defineProperties(p, {stage: {get: p.getStage}});
      } catch (e) {}
      p.isVisible = function() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
      };
      p.draw = function(ctx, ignoreCache) {
        var cacheCanvas = this.cacheCanvas;
        if (ignoreCache || !cacheCanvas) {
          return false;
        }
        var scale = this._cacheScale;
        ctx.drawImage(cacheCanvas, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, cacheCanvas.width / scale, cacheCanvas.height / scale);
        return true;
      };
      p.updateContext = function(ctx) {
        var o = this,
            mask = o.mask,
            mtx = o._props.matrix;
        if (mask && mask.graphics && !mask.graphics.isEmpty()) {
          mask.getMatrix(mtx);
          ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
          mask.graphics.drawAsPath(ctx);
          ctx.clip();
          mtx.invert();
          ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        }
        this.getMatrix(mtx);
        var tx = mtx.tx,
            ty = mtx.ty;
        if (DisplayObject._snapToPixelEnabled && o.snapToPixel) {
          tx = tx + (tx < 0 ? -0.5 : 0.5) | 0;
          ty = ty + (ty < 0 ? -0.5 : 0.5) | 0;
        }
        ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, tx, ty);
        ctx.globalAlpha *= o.alpha;
        if (o.compositeOperation) {
          ctx.globalCompositeOperation = o.compositeOperation;
        }
        if (o.shadow) {
          this._applyShadow(ctx, o.shadow);
        }
      };
      p.cache = function(x, y, width, height, scale) {
        scale = scale || 1;
        if (!this.cacheCanvas) {
          this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        }
        this._cacheWidth = width;
        this._cacheHeight = height;
        this._cacheOffsetX = x;
        this._cacheOffsetY = y;
        this._cacheScale = scale;
        this.updateCache();
      };
      p.updateCache = function(compositeOperation) {
        var cacheCanvas = this.cacheCanvas;
        if (!cacheCanvas) {
          throw "cache() must be called before updateCache()";
        }
        var scale = this._cacheScale,
            offX = this._cacheOffsetX * scale,
            offY = this._cacheOffsetY * scale;
        var w = this._cacheWidth,
            h = this._cacheHeight,
            ctx = cacheCanvas.getContext("2d");
        var fBounds = this._getFilterBounds();
        offX += (this._filterOffsetX = fBounds.x);
        offY += (this._filterOffsetY = fBounds.y);
        w = Math.ceil(w * scale) + fBounds.width;
        h = Math.ceil(h * scale) + fBounds.height;
        if (w != cacheCanvas.width || h != cacheCanvas.height) {
          cacheCanvas.width = w;
          cacheCanvas.height = h;
        } else if (!compositeOperation) {
          ctx.clearRect(0, 0, w + 1, h + 1);
        }
        ctx.save();
        ctx.globalCompositeOperation = compositeOperation;
        ctx.setTransform(scale, 0, 0, scale, -offX, -offY);
        this.draw(ctx, true);
        this._applyFilters();
        ctx.restore();
        this.cacheID = DisplayObject._nextCacheID++;
      };
      p.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null;
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0;
        this._cacheScale = 1;
      };
      p.getCacheDataURL = function() {
        if (!this.cacheCanvas) {
          return null;
        }
        if (this.cacheID != this._cacheDataURLID) {
          this._cacheDataURL = this.cacheCanvas.toDataURL();
        }
        return this._cacheDataURL;
      };
      p.localToGlobal = function(x, y, pt) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(x, y, pt || new createjs.Point());
      };
      p.globalToLocal = function(x, y, pt) {
        return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(x, y, pt || new createjs.Point());
      };
      p.localToLocal = function(x, y, target, pt) {
        pt = this.localToGlobal(x, y, pt);
        return target.globalToLocal(pt.x, pt.y, pt);
      };
      p.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = scaleX == null ? 1 : scaleX;
        this.scaleY = scaleY == null ? 1 : scaleY;
        this.rotation = rotation || 0;
        this.skewX = skewX || 0;
        this.skewY = skewY || 0;
        this.regX = regX || 0;
        this.regY = regY || 0;
        return this;
      };
      p.getMatrix = function(matrix) {
        var o = this,
            mtx = matrix && matrix.identity() || new createjs.Matrix2D();
        return o.transformMatrix ? mtx.copy(o.transformMatrix) : mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
      };
      p.getConcatenatedMatrix = function(matrix) {
        var o = this,
            mtx = this.getMatrix(matrix);
        while (o = o.parent) {
          mtx.prependMatrix(o.getMatrix(o._props.matrix));
        }
        return mtx;
      };
      p.getConcatenatedDisplayProps = function(props) {
        props = props ? props.identity() : new createjs.DisplayProps();
        var o = this,
            mtx = o.getMatrix(props.matrix);
        do {
          props.prepend(o.visible, o.alpha, o.shadow, o.compositeOperation);
          if (o != this) {
            mtx.prependMatrix(o.getMatrix(o._props.matrix));
          }
        } while (o = o.parent);
        return props;
      };
      p.hitTest = function(x, y) {
        var ctx = DisplayObject._hitTestContext;
        ctx.setTransform(1, 0, 0, 1, -x, -y);
        this.draw(ctx);
        var hit = this._testHit(ctx);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 2, 2);
        return hit;
      };
      p.set = function(props) {
        for (var n in props) {
          this[n] = props[n];
        }
        return this;
      };
      p.getBounds = function() {
        if (this._bounds) {
          return this._rectangle.copy(this._bounds);
        }
        var cacheCanvas = this.cacheCanvas;
        if (cacheCanvas) {
          var scale = this._cacheScale;
          return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, cacheCanvas.width / scale, cacheCanvas.height / scale);
        }
        return null;
      };
      p.getTransformedBounds = function() {
        return this._getBounds();
      };
      p.setBounds = function(x, y, width, height) {
        if (x == null) {
          this._bounds = x;
        }
        this._bounds = (this._bounds || new createjs.Rectangle()).setValues(x, y, width, height);
      };
      p.clone = function() {
        return this._cloneProps(new DisplayObject());
      };
      p.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]";
      };
      p._cloneProps = function(o) {
        o.alpha = this.alpha;
        o.mouseEnabled = this.mouseEnabled;
        o.tickEnabled = this.tickEnabled;
        o.name = this.name;
        o.regX = this.regX;
        o.regY = this.regY;
        o.rotation = this.rotation;
        o.scaleX = this.scaleX;
        o.scaleY = this.scaleY;
        o.shadow = this.shadow;
        o.skewX = this.skewX;
        o.skewY = this.skewY;
        o.visible = this.visible;
        o.x = this.x;
        o.y = this.y;
        o.compositeOperation = this.compositeOperation;
        o.snapToPixel = this.snapToPixel;
        o.filters = this.filters == null ? null : this.filters.slice(0);
        o.mask = this.mask;
        o.hitArea = this.hitArea;
        o.cursor = this.cursor;
        o._bounds = this._bounds;
        return o;
      };
      p._applyShadow = function(ctx, shadow) {
        shadow = shadow || Shadow.identity;
        ctx.shadowColor = shadow.color;
        ctx.shadowOffsetX = shadow.offsetX;
        ctx.shadowOffsetY = shadow.offsetY;
        ctx.shadowBlur = shadow.blur;
      };
      p._tick = function(evtObj) {
        var ls = this._listeners;
        if (ls && ls["tick"]) {
          evtObj.target = null;
          evtObj.propagationStopped = evtObj.immediatePropagationStopped = false;
          this.dispatchEvent(evtObj);
        }
      };
      p._testHit = function(ctx) {
        try {
          var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1;
        } catch (e) {
          if (!DisplayObject.suppressCrossDomainErrors) {
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
          }
        }
        return hit;
      };
      p._applyFilters = function() {
        if (!this.filters || this.filters.length == 0 || !this.cacheCanvas) {
          return;
        }
        var l = this.filters.length;
        var ctx = this.cacheCanvas.getContext("2d");
        var w = this.cacheCanvas.width;
        var h = this.cacheCanvas.height;
        for (var i = 0; i < l; i++) {
          this.filters[i].applyFilter(ctx, 0, 0, w, h);
        }
      };
      p._getFilterBounds = function(rect) {
        var l,
            filters = this.filters,
            bounds = this._rectangle.setValues(0, 0, 0, 0);
        if (!filters || !(l = filters.length)) {
          return bounds;
        }
        for (var i = 0; i < l; i++) {
          var f = this.filters[i];
          f.getBounds && f.getBounds(bounds);
        }
        return bounds;
      };
      p._getBounds = function(matrix, ignoreTransform) {
        return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
      };
      p._transformBounds = function(bounds, matrix, ignoreTransform) {
        if (!bounds) {
          return bounds;
        }
        var x = bounds.x,
            y = bounds.y,
            width = bounds.width,
            height = bounds.height,
            mtx = this._props.matrix;
        mtx = ignoreTransform ? mtx.identity() : this.getMatrix(mtx);
        if (x || y) {
          mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
        }
        if (matrix) {
          mtx.prependMatrix(matrix);
        }
        var x_a = width * mtx.a,
            x_b = width * mtx.b;
        var y_c = height * mtx.c,
            y_d = height * mtx.d;
        var tx = mtx.tx,
            ty = mtx.ty;
        var minX = tx,
            maxX = tx,
            minY = ty,
            maxY = ty;
        if ((x = x_a + tx) < minX) {
          minX = x;
        } else if (x > maxX) {
          maxX = x;
        }
        if ((x = x_a + y_c + tx) < minX) {
          minX = x;
        } else if (x > maxX) {
          maxX = x;
        }
        if ((x = y_c + tx) < minX) {
          minX = x;
        } else if (x > maxX) {
          maxX = x;
        }
        if ((y = x_b + ty) < minY) {
          minY = y;
        } else if (y > maxY) {
          maxY = y;
        }
        if ((y = x_b + y_d + ty) < minY) {
          minY = y;
        } else if (y > maxY) {
          maxY = y;
        }
        if ((y = y_d + ty) < minY) {
          minY = y;
        } else if (y > maxY) {
          maxY = y;
        }
        return bounds.setValues(minX, minY, maxX - minX, maxY - minY);
      };
      p._hasMouseEventListener = function() {
        var evts = DisplayObject._MOUSE_EVENTS;
        for (var i = 0,
            l = evts.length; i < l; i++) {
          if (this.hasEventListener(evts[i])) {
            return true;
          }
        }
        return !!this.cursor;
      };
      createjs.DisplayObject = createjs.promote(DisplayObject, "EventDispatcher");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Container() {
        this.DisplayObject_constructor();
        this.children = [];
        this.mouseChildren = true;
        this.tickChildren = true;
      }
      var p = createjs.extend(Container, createjs.DisplayObject);
      p.getNumChildren = function() {
        return this.children.length;
      };
      try {
        Object.defineProperties(p, {numChildren: {get: p.getNumChildren}});
      } catch (e) {}
      p.initialize = Container;
      p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.children.length;
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return true;
        }
        var list = this.children.slice();
        for (var i = 0,
            l = list.length; i < l; i++) {
          var child = list[i];
          if (!child.isVisible()) {
            continue;
          }
          ctx.save();
          child.updateContext(ctx);
          child.draw(ctx);
          ctx.restore();
        }
        return true;
      };
      p.addChild = function(child) {
        if (child == null) {
          return child;
        }
        var l = arguments.length;
        if (l > 1) {
          for (var i = 0; i < l; i++) {
            this.addChild(arguments[i]);
          }
          return arguments[l - 1];
        }
        if (child.parent) {
          child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.push(child);
        child.dispatchEvent("added");
        return child;
      };
      p.addChildAt = function(child, index) {
        var l = arguments.length;
        var indx = arguments[l - 1];
        if (indx < 0 || indx > this.children.length) {
          return arguments[l - 2];
        }
        if (l > 2) {
          for (var i = 0; i < l - 1; i++) {
            this.addChildAt(arguments[i], indx + i);
          }
          return arguments[l - 2];
        }
        if (child.parent) {
          child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.splice(index, 0, child);
        child.dispatchEvent("added");
        return child;
      };
      p.removeChild = function(child) {
        var l = arguments.length;
        if (l > 1) {
          var good = true;
          for (var i = 0; i < l; i++) {
            good = good && this.removeChild(arguments[i]);
          }
          return good;
        }
        return this.removeChildAt(createjs.indexOf(this.children, child));
      };
      p.removeChildAt = function(index) {
        var l = arguments.length;
        if (l > 1) {
          var a = [];
          for (var i = 0; i < l; i++) {
            a[i] = arguments[i];
          }
          a.sort(function(a, b) {
            return b - a;
          });
          var good = true;
          for (var i = 0; i < l; i++) {
            good = good && this.removeChildAt(a[i]);
          }
          return good;
        }
        if (index < 0 || index > this.children.length - 1) {
          return false;
        }
        var child = this.children[index];
        if (child) {
          child.parent = null;
        }
        this.children.splice(index, 1);
        child.dispatchEvent("removed");
        return true;
      };
      p.removeAllChildren = function() {
        var kids = this.children;
        while (kids.length) {
          this.removeChildAt(0);
        }
      };
      p.getChildAt = function(index) {
        return this.children[index];
      };
      p.getChildByName = function(name) {
        var kids = this.children;
        for (var i = 0,
            l = kids.length; i < l; i++) {
          if (kids[i].name == name) {
            return kids[i];
          }
        }
        return null;
      };
      p.sortChildren = function(sortFunction) {
        this.children.sort(sortFunction);
      };
      p.getChildIndex = function(child) {
        return createjs.indexOf(this.children, child);
      };
      p.swapChildrenAt = function(index1, index2) {
        var kids = this.children;
        var o1 = kids[index1];
        var o2 = kids[index2];
        if (!o1 || !o2) {
          return;
        }
        kids[index1] = o2;
        kids[index2] = o1;
      };
      p.swapChildren = function(child1, child2) {
        var kids = this.children;
        var index1,
            index2;
        for (var i = 0,
            l = kids.length; i < l; i++) {
          if (kids[i] == child1) {
            index1 = i;
          }
          if (kids[i] == child2) {
            index2 = i;
          }
          if (index1 != null && index2 != null) {
            break;
          }
        }
        if (i == l) {
          return;
        }
        kids[index1] = child2;
        kids[index2] = child1;
      };
      p.setChildIndex = function(child, index) {
        var kids = this.children,
            l = kids.length;
        if (child.parent != this || index < 0 || index >= l) {
          return;
        }
        for (var i = 0; i < l; i++) {
          if (kids[i] == child) {
            break;
          }
        }
        if (i == l || i == index) {
          return;
        }
        kids.splice(i, 1);
        kids.splice(index, 0, child);
      };
      p.contains = function(child) {
        while (child) {
          if (child == this) {
            return true;
          }
          child = child.parent;
        }
        return false;
      };
      p.hitTest = function(x, y) {
        return (this.getObjectUnderPoint(x, y) != null);
      };
      p.getObjectsUnderPoint = function(x, y, mode) {
        var arr = [];
        var pt = this.localToGlobal(x, y);
        this._getObjectsUnderPoint(pt.x, pt.y, arr, mode > 0, mode == 1);
        return arr;
      };
      p.getObjectUnderPoint = function(x, y, mode) {
        var pt = this.localToGlobal(x, y);
        return this._getObjectsUnderPoint(pt.x, pt.y, null, mode > 0, mode == 1);
      };
      p.getBounds = function() {
        return this._getBounds(null, true);
      };
      p.getTransformedBounds = function() {
        return this._getBounds();
      };
      p.clone = function(recursive) {
        var o = this._cloneProps(new Container());
        if (recursive) {
          this._cloneChildren(o);
        }
        return o;
      };
      p.toString = function() {
        return "[Container (name=" + this.name + ")]";
      };
      p._tick = function(evtObj) {
        if (this.tickChildren) {
          for (var i = this.children.length - 1; i >= 0; i--) {
            var child = this.children[i];
            if (child.tickEnabled && child._tick) {
              child._tick(evtObj);
            }
          }
        }
        this.DisplayObject__tick(evtObj);
      };
      p._cloneChildren = function(o) {
        if (o.children.length) {
          o.removeAllChildren();
        }
        var arr = o.children;
        for (var i = 0,
            l = this.children.length; i < l; i++) {
          var clone = this.children[i].clone(true);
          clone.parent = o;
          arr.push(clone);
        }
      };
      p._getObjectsUnderPoint = function(x, y, arr, mouse, activeListener, currentDepth) {
        currentDepth = currentDepth || 0;
        if (!currentDepth && !this._testMask(this, x, y)) {
          return null;
        }
        var mtx,
            ctx = createjs.DisplayObject._hitTestContext;
        activeListener = activeListener || (mouse && this._hasMouseEventListener());
        var children = this.children,
            l = children.length;
        for (var i = l - 1; i >= 0; i--) {
          var child = children[i];
          var hitArea = child.hitArea;
          if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) {
            continue;
          }
          if (!hitArea && !this._testMask(child, x, y)) {
            continue;
          }
          if (!hitArea && child instanceof Container) {
            var result = child._getObjectsUnderPoint(x, y, arr, mouse, activeListener, currentDepth + 1);
            if (!arr && result) {
              return (mouse && !this.mouseChildren) ? this : result;
            }
          } else {
            if (mouse && !activeListener && !child._hasMouseEventListener()) {
              continue;
            }
            var props = child.getConcatenatedDisplayProps(child._props);
            mtx = props.matrix;
            if (hitArea) {
              mtx.appendMatrix(hitArea.getMatrix(hitArea._props.matrix));
              props.alpha = hitArea.alpha;
            }
            ctx.globalAlpha = props.alpha;
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);
            (hitArea || child).draw(ctx);
            if (!this._testHit(ctx)) {
              continue;
            }
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, 2, 2);
            if (arr) {
              arr.push(child);
            } else {
              return (mouse && !this.mouseChildren) ? this : child;
            }
          }
        }
        return null;
      };
      p._testMask = function(target, x, y) {
        var mask = target.mask;
        if (!mask || !mask.graphics || mask.graphics.isEmpty()) {
          return true;
        }
        var mtx = this._props.matrix,
            parent = target.parent;
        mtx = parent ? parent.getConcatenatedMatrix(mtx) : mtx.identity();
        mtx = mask.getMatrix(mask._props.matrix).prependMatrix(mtx);
        var ctx = createjs.DisplayObject._hitTestContext;
        ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);
        mask.graphics.drawAsPath(ctx);
        ctx.fillStyle = "#000";
        ctx.fill();
        if (!this._testHit(ctx)) {
          return false;
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 2, 2);
        return true;
      };
      p._getBounds = function(matrix, ignoreTransform) {
        var bounds = this.DisplayObject_getBounds();
        if (bounds) {
          return this._transformBounds(bounds, matrix, ignoreTransform);
        }
        var mtx = this._props.matrix;
        mtx = ignoreTransform ? mtx.identity() : this.getMatrix(mtx);
        if (matrix) {
          mtx.prependMatrix(matrix);
        }
        var l = this.children.length,
            rect = null;
        for (var i = 0; i < l; i++) {
          var child = this.children[i];
          if (!child.visible || !(bounds = child._getBounds(mtx))) {
            continue;
          }
          if (rect) {
            rect.extend(bounds.x, bounds.y, bounds.width, bounds.height);
          } else {
            rect = bounds.clone();
          }
        }
        return rect;
      };
      createjs.Container = createjs.promote(Container, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Stage(canvas) {
        this.Container_constructor();
        this.autoClear = true;
        this.canvas = (typeof canvas == "string") ? document.getElementById(canvas) : canvas;
        this.mouseX = 0;
        this.mouseY = 0;
        this.drawRect = null;
        this.snapToPixelEnabled = false;
        this.mouseInBounds = false;
        this.tickOnUpdate = true;
        this.mouseMoveOutside = false;
        this.preventSelection = true;
        this._pointerData = {};
        this._pointerCount = 0;
        this._primaryPointerID = null;
        this._mouseOverIntervalID = null;
        this._nextStage = null;
        this._prevStage = null;
        this.enableDOMEvents(true);
      }
      var p = createjs.extend(Stage, createjs.Container);
      p._get_nextStage = function() {
        return this._nextStage;
      };
      p._set_nextStage = function(value) {
        if (this._nextStage) {
          this._nextStage._prevStage = null;
        }
        if (value) {
          value._prevStage = this;
        }
        this._nextStage = value;
      };
      try {
        Object.defineProperties(p, {nextStage: {
            get: p._get_nextStage,
            set: p._set_nextStage
          }});
      } catch (e) {}
      p.update = function(props) {
        if (!this.canvas) {
          return;
        }
        if (this.tickOnUpdate) {
          this.tick(props);
        }
        if (this.dispatchEvent("drawstart", false, true) === false) {
          return;
        }
        createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
        var r = this.drawRect,
            ctx = this.canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.autoClear) {
          if (r) {
            ctx.clearRect(r.x, r.y, r.width, r.height);
          } else {
            ctx.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
          }
        }
        ctx.save();
        if (this.drawRect) {
          ctx.beginPath();
          ctx.rect(r.x, r.y, r.width, r.height);
          ctx.clip();
        }
        this.updateContext(ctx);
        this.draw(ctx, false);
        ctx.restore();
        this.dispatchEvent("drawend");
      };
      p.tick = function(props) {
        if (!this.tickEnabled || this.dispatchEvent("tickstart", false, true) === false) {
          return;
        }
        var evtObj = new createjs.Event("tick");
        if (props) {
          for (var n in props) {
            if (props.hasOwnProperty(n)) {
              evtObj[n] = props[n];
            }
          }
        }
        this._tick(evtObj);
        this.dispatchEvent("tickend");
      };
      p.handleEvent = function(evt) {
        if (evt.type == "tick") {
          this.update(evt);
        }
      };
      p.clear = function() {
        if (!this.canvas) {
          return;
        }
        var ctx = this.canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
      };
      p.toDataURL = function(backgroundColor, mimeType) {
        var data,
            ctx = this.canvas.getContext('2d'),
            w = this.canvas.width,
            h = this.canvas.height;
        if (backgroundColor) {
          data = ctx.getImageData(0, 0, w, h);
          var compositeOperation = ctx.globalCompositeOperation;
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, w, h);
        }
        var dataURL = this.canvas.toDataURL(mimeType || "image/png");
        if (backgroundColor) {
          ctx.putImageData(data, 0, 0);
          ctx.globalCompositeOperation = compositeOperation;
        }
        return dataURL;
      };
      p.enableMouseOver = function(frequency) {
        if (this._mouseOverIntervalID) {
          clearInterval(this._mouseOverIntervalID);
          this._mouseOverIntervalID = null;
          if (frequency == 0) {
            this._testMouseOver(true);
          }
        }
        if (frequency == null) {
          frequency = 20;
        } else if (frequency <= 0) {
          return;
        }
        var o = this;
        this._mouseOverIntervalID = setInterval(function() {
          o._testMouseOver();
        }, 1000 / Math.min(50, frequency));
      };
      p.enableDOMEvents = function(enable) {
        if (enable == null) {
          enable = true;
        }
        var n,
            o,
            ls = this._eventListeners;
        if (!enable && ls) {
          for (n in ls) {
            o = ls[n];
            o.t.removeEventListener(n, o.f, false);
          }
          this._eventListeners = null;
        } else if (enable && !ls && this.canvas) {
          var t = window.addEventListener ? window : document;
          var _this = this;
          ls = this._eventListeners = {};
          ls["mouseup"] = {
            t: t,
            f: function(e) {
              _this._handleMouseUp(e);
            }
          };
          ls["mousemove"] = {
            t: t,
            f: function(e) {
              _this._handleMouseMove(e);
            }
          };
          ls["dblclick"] = {
            t: this.canvas,
            f: function(e) {
              _this._handleDoubleClick(e);
            }
          };
          ls["mousedown"] = {
            t: this.canvas,
            f: function(e) {
              _this._handleMouseDown(e);
            }
          };
          for (n in ls) {
            o = ls[n];
            o.t.addEventListener(n, o.f, false);
          }
        }
      };
      p.clone = function() {
        throw ("Stage cannot be cloned.");
      };
      p.toString = function() {
        return "[Stage (name=" + this.name + ")]";
      };
      p._getElementRect = function(e) {
        var bounds;
        try {
          bounds = e.getBoundingClientRect();
        } catch (err) {
          bounds = {
            top: e.offsetTop,
            left: e.offsetLeft,
            width: e.offsetWidth,
            height: e.offsetHeight
          };
        }
        var offX = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0);
        var offY = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0);
        var styles = window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle;
        var padL = parseInt(styles.paddingLeft) + parseInt(styles.borderLeftWidth);
        var padT = parseInt(styles.paddingTop) + parseInt(styles.borderTopWidth);
        var padR = parseInt(styles.paddingRight) + parseInt(styles.borderRightWidth);
        var padB = parseInt(styles.paddingBottom) + parseInt(styles.borderBottomWidth);
        return {
          left: bounds.left + offX + padL,
          right: bounds.right + offX - padR,
          top: bounds.top + offY + padT,
          bottom: bounds.bottom + offY - padB
        };
      };
      p._getPointerData = function(id) {
        var data = this._pointerData[id];
        if (!data) {
          data = this._pointerData[id] = {
            x: 0,
            y: 0
          };
        }
        return data;
      };
      p._handleMouseMove = function(e) {
        if (!e) {
          e = window.event;
        }
        this._handlePointerMove(-1, e, e.pageX, e.pageY);
      };
      p._handlePointerMove = function(id, e, pageX, pageY, owner) {
        if (this._prevStage && owner === undefined) {
          return;
        }
        if (!this.canvas) {
          return;
        }
        var nextStage = this._nextStage,
            o = this._getPointerData(id);
        var inBounds = o.inBounds;
        this._updatePointerPosition(id, e, pageX, pageY);
        if (inBounds || o.inBounds || this.mouseMoveOutside) {
          if (id === -1 && o.inBounds == !inBounds) {
            this._dispatchMouseEvent(this, (inBounds ? "mouseleave" : "mouseenter"), false, id, o, e);
          }
          this._dispatchMouseEvent(this, "stagemousemove", false, id, o, e);
          this._dispatchMouseEvent(o.target, "pressmove", true, id, o, e);
        }
        nextStage && nextStage._handlePointerMove(id, e, pageX, pageY, null);
      };
      p._updatePointerPosition = function(id, e, pageX, pageY) {
        var rect = this._getElementRect(this.canvas);
        pageX -= rect.left;
        pageY -= rect.top;
        var w = this.canvas.width;
        var h = this.canvas.height;
        pageX /= (rect.right - rect.left) / w;
        pageY /= (rect.bottom - rect.top) / h;
        var o = this._getPointerData(id);
        if (o.inBounds = (pageX >= 0 && pageY >= 0 && pageX <= w - 1 && pageY <= h - 1)) {
          o.x = pageX;
          o.y = pageY;
        } else if (this.mouseMoveOutside) {
          o.x = pageX < 0 ? 0 : (pageX > w - 1 ? w - 1 : pageX);
          o.y = pageY < 0 ? 0 : (pageY > h - 1 ? h - 1 : pageY);
        }
        o.posEvtObj = e;
        o.rawX = pageX;
        o.rawY = pageY;
        if (id === this._primaryPointerID || id === -1) {
          this.mouseX = o.x;
          this.mouseY = o.y;
          this.mouseInBounds = o.inBounds;
        }
      };
      p._handleMouseUp = function(e) {
        this._handlePointerUp(-1, e, false);
      };
      p._handlePointerUp = function(id, e, clear, owner) {
        var nextStage = this._nextStage,
            o = this._getPointerData(id);
        if (this._prevStage && owner === undefined) {
          return;
        }
        var target = null,
            oTarget = o.target;
        if (!owner && (oTarget || nextStage)) {
          target = this._getObjectsUnderPoint(o.x, o.y, null, true);
        }
        if (o.down) {
          this._dispatchMouseEvent(this, "stagemouseup", false, id, o, e, target);
          o.down = false;
        }
        if (target == oTarget) {
          this._dispatchMouseEvent(oTarget, "click", true, id, o, e);
        }
        this._dispatchMouseEvent(oTarget, "pressup", true, id, o, e);
        if (clear) {
          if (id == this._primaryPointerID) {
            this._primaryPointerID = null;
          }
          delete(this._pointerData[id]);
        } else {
          o.target = null;
        }
        nextStage && nextStage._handlePointerUp(id, e, clear, owner || target && this);
      };
      p._handleMouseDown = function(e) {
        this._handlePointerDown(-1, e, e.pageX, e.pageY);
      };
      p._handlePointerDown = function(id, e, pageX, pageY, owner) {
        if (this.preventSelection) {
          e.preventDefault();
        }
        if (this._primaryPointerID == null || id === -1) {
          this._primaryPointerID = id;
        }
        if (pageY != null) {
          this._updatePointerPosition(id, e, pageX, pageY);
        }
        var target = null,
            nextStage = this._nextStage,
            o = this._getPointerData(id);
        if (!owner) {
          target = o.target = this._getObjectsUnderPoint(o.x, o.y, null, true);
        }
        if (o.inBounds) {
          this._dispatchMouseEvent(this, "stagemousedown", false, id, o, e, target);
          o.down = true;
        }
        this._dispatchMouseEvent(target, "mousedown", true, id, o, e);
        nextStage && nextStage._handlePointerDown(id, e, pageX, pageY, owner || target && this);
      };
      p._testMouseOver = function(clear, owner, eventTarget) {
        if (this._prevStage && owner === undefined) {
          return;
        }
        var nextStage = this._nextStage;
        if (!this._mouseOverIntervalID) {
          nextStage && nextStage._testMouseOver(clear, owner, eventTarget);
          return;
        }
        var o = this._getPointerData(-1);
        if (!o || (!clear && this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
          return;
        }
        var e = o.posEvtObj;
        var isEventTarget = eventTarget || e && (e.target == this.canvas);
        var target = null,
            common = -1,
            cursor = "",
            t,
            i,
            l;
        if (!owner && (clear || this.mouseInBounds && isEventTarget)) {
          target = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true);
          this._mouseOverX = this.mouseX;
          this._mouseOverY = this.mouseY;
        }
        var oldList = this._mouseOverTarget || [];
        var oldTarget = oldList[oldList.length - 1];
        var list = this._mouseOverTarget = [];
        t = target;
        while (t) {
          list.unshift(t);
          if (!cursor) {
            cursor = t.cursor;
          }
          t = t.parent;
        }
        this.canvas.style.cursor = cursor;
        if (!owner && eventTarget) {
          eventTarget.canvas.style.cursor = cursor;
        }
        for (i = 0, l = list.length; i < l; i++) {
          if (list[i] != oldList[i]) {
            break;
          }
          common = i;
        }
        if (oldTarget != target) {
          this._dispatchMouseEvent(oldTarget, "mouseout", true, -1, o, e, target);
        }
        for (i = oldList.length - 1; i > common; i--) {
          this._dispatchMouseEvent(oldList[i], "rollout", false, -1, o, e, target);
        }
        for (i = list.length - 1; i > common; i--) {
          this._dispatchMouseEvent(list[i], "rollover", false, -1, o, e, oldTarget);
        }
        if (oldTarget != target) {
          this._dispatchMouseEvent(target, "mouseover", true, -1, o, e, oldTarget);
        }
        nextStage && nextStage._testMouseOver(clear, owner || target && this, eventTarget || isEventTarget && this);
      };
      p._handleDoubleClick = function(e, owner) {
        var target = null,
            nextStage = this._nextStage,
            o = this._getPointerData(-1);
        if (!owner) {
          target = this._getObjectsUnderPoint(o.x, o.y, null, true);
          this._dispatchMouseEvent(target, "dblclick", true, -1, o, e);
        }
        nextStage && nextStage._handleDoubleClick(e, owner || target && this);
      };
      p._dispatchMouseEvent = function(target, type, bubbles, pointerId, o, nativeEvent, relatedTarget) {
        if (!target || (!bubbles && !target.hasEventListener(type))) {
          return;
        }
        var evt = new createjs.MouseEvent(type, bubbles, false, o.x, o.y, nativeEvent, pointerId, pointerId === this._primaryPointerID || pointerId === -1, o.rawX, o.rawY, relatedTarget);
        target.dispatchEvent(evt);
      };
      createjs.Stage = createjs.promote(Stage, "Container");
    }());
    this.createjs = this.createjs || {};
    (function() {
      function Bitmap(imageOrUri) {
        this.DisplayObject_constructor();
        if (typeof imageOrUri == "string") {
          this.image = document.createElement("img");
          this.image.src = imageOrUri;
        } else {
          this.image = imageOrUri;
        }
        this.sourceRect = null;
      }
      var p = createjs.extend(Bitmap, createjs.DisplayObject);
      p.initialize = Bitmap;
      p.isVisible = function() {
        var image = this.image;
        var hasContent = this.cacheCanvas || (image && (image.naturalWidth || image.getContext || image.readyState >= 2));
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache) || !this.image) {
          return true;
        }
        var img = this.image,
            rect = this.sourceRect;
        if (rect) {
          var x1 = rect.x,
              y1 = rect.y,
              x2 = x1 + rect.width,
              y2 = y1 + rect.height,
              x = 0,
              y = 0,
              w = img.width,
              h = img.height;
          if (x1 < 0) {
            x -= x1;
            x1 = 0;
          }
          if (x2 > w) {
            x2 = w;
          }
          if (y1 < 0) {
            y -= y1;
            y1 = 0;
          }
          if (y2 > h) {
            y2 = h;
          }
          ctx.drawImage(img, x1, y1, x2 - x1, y2 - y1, x, y, x2 - x1, y2 - y1);
        } else {
          ctx.drawImage(img, 0, 0);
        }
        return true;
      };
      p.getBounds = function() {
        var rect = this.DisplayObject_getBounds();
        if (rect) {
          return rect;
        }
        var image = this.image,
            o = this.sourceRect || image;
        var hasContent = (image && (image.naturalWidth || image.getContext || image.readyState >= 2));
        return hasContent ? this._rectangle.setValues(0, 0, o.width, o.height) : null;
      };
      p.clone = function() {
        var o = new Bitmap(this.image);
        if (this.sourceRect) {
          o.sourceRect = this.sourceRect.clone();
        }
        this._cloneProps(o);
        return o;
      };
      p.toString = function() {
        return "[Bitmap (name=" + this.name + ")]";
      };
      createjs.Bitmap = createjs.promote(Bitmap, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Sprite(spriteSheet, frameOrAnimation) {
        this.DisplayObject_constructor();
        this.currentFrame = 0;
        this.currentAnimation = null;
        this.paused = true;
        this.spriteSheet = spriteSheet;
        this.currentAnimationFrame = 0;
        this.framerate = 0;
        this._animation = null;
        this._currentFrame = null;
        this._skipAdvance = false;
        if (frameOrAnimation != null) {
          this.gotoAndPlay(frameOrAnimation);
        }
      }
      var p = createjs.extend(Sprite, createjs.DisplayObject);
      p.initialize = Sprite;
      p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return true;
        }
        this._normalizeFrame();
        var o = this.spriteSheet.getFrame(this._currentFrame | 0);
        if (!o) {
          return false;
        }
        var rect = o.rect;
        if (rect.width && rect.height) {
          ctx.drawImage(o.image, rect.x, rect.y, rect.width, rect.height, -o.regX, -o.regY, rect.width, rect.height);
        }
        return true;
      };
      p.play = function() {
        this.paused = false;
      };
      p.stop = function() {
        this.paused = true;
      };
      p.gotoAndPlay = function(frameOrAnimation) {
        this.paused = false;
        this._skipAdvance = true;
        this._goto(frameOrAnimation);
      };
      p.gotoAndStop = function(frameOrAnimation) {
        this.paused = true;
        this._goto(frameOrAnimation);
      };
      p.advance = function(time) {
        var fps = this.framerate || this.spriteSheet.framerate;
        var t = (fps && time != null) ? time / (1000 / fps) : 1;
        this._normalizeFrame(t);
      };
      p.getBounds = function() {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle);
      };
      p.clone = function() {
        return this._cloneProps(new Sprite(this.spriteSheet));
      };
      p.toString = function() {
        return "[Sprite (name=" + this.name + ")]";
      };
      p._cloneProps = function(o) {
        this.DisplayObject__cloneProps(o);
        o.currentFrame = this.currentFrame;
        o.currentAnimation = this.currentAnimation;
        o.paused = this.paused;
        o.currentAnimationFrame = this.currentAnimationFrame;
        o.framerate = this.framerate;
        o._animation = this._animation;
        o._currentFrame = this._currentFrame;
        o._skipAdvance = this._skipAdvance;
        return o;
      };
      p._tick = function(evtObj) {
        if (!this.paused) {
          if (!this._skipAdvance) {
            this.advance(evtObj && evtObj.delta);
          }
          this._skipAdvance = false;
        }
        this.DisplayObject__tick(evtObj);
      };
      p._normalizeFrame = function(frameDelta) {
        frameDelta = frameDelta || 0;
        var animation = this._animation;
        var paused = this.paused;
        var frame = this._currentFrame;
        var l;
        if (animation) {
          var speed = animation.speed || 1;
          var animFrame = this.currentAnimationFrame;
          l = animation.frames.length;
          if (animFrame + frameDelta * speed >= l) {
            var next = animation.next;
            if (this._dispatchAnimationEnd(animation, frame, paused, next, l - 1)) {
              return;
            } else if (next) {
              return this._goto(next, frameDelta - (l - animFrame) / speed);
            } else {
              this.paused = true;
              animFrame = animation.frames.length - 1;
            }
          } else {
            animFrame += frameDelta * speed;
          }
          this.currentAnimationFrame = animFrame;
          this._currentFrame = animation.frames[animFrame | 0];
        } else {
          frame = (this._currentFrame += frameDelta);
          l = this.spriteSheet.getNumFrames();
          if (frame >= l && l > 0) {
            if (!this._dispatchAnimationEnd(animation, frame, paused, l - 1)) {
              if ((this._currentFrame -= l) >= l) {
                return this._normalizeFrame();
              }
            }
          }
        }
        frame = this._currentFrame | 0;
        if (this.currentFrame != frame) {
          this.currentFrame = frame;
          this.dispatchEvent("change");
        }
      };
      p._dispatchAnimationEnd = function(animation, frame, paused, next, end) {
        var name = animation ? animation.name : null;
        if (this.hasEventListener("animationend")) {
          var evt = new createjs.Event("animationend");
          evt.name = name;
          evt.next = next;
          this.dispatchEvent(evt);
        }
        var changed = (this._animation != animation || this._currentFrame != frame);
        if (!changed && !paused && this.paused) {
          this.currentAnimationFrame = end;
          changed = true;
        }
        return changed;
      };
      p._goto = function(frameOrAnimation, frame) {
        this.currentAnimationFrame = 0;
        if (isNaN(frameOrAnimation)) {
          var data = this.spriteSheet.getAnimation(frameOrAnimation);
          if (data) {
            this._animation = data;
            this.currentAnimation = frameOrAnimation;
            this._normalizeFrame(frame);
          }
        } else {
          this.currentAnimation = this._animation = null;
          this._currentFrame = frameOrAnimation;
          this._normalizeFrame();
        }
      };
      createjs.Sprite = createjs.promote(Sprite, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Shape(graphics) {
        this.DisplayObject_constructor();
        this.graphics = graphics ? graphics : new createjs.Graphics();
      }
      var p = createjs.extend(Shape, createjs.DisplayObject);
      p.isVisible = function() {
        var hasContent = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return true;
        }
        this.graphics.draw(ctx, this);
        return true;
      };
      p.clone = function(recursive) {
        var g = (recursive && this.graphics) ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new Shape(g));
      };
      p.toString = function() {
        return "[Shape (name=" + this.name + ")]";
      };
      createjs.Shape = createjs.promote(Shape, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Text(text, font, color) {
        this.DisplayObject_constructor();
        this.text = text;
        this.font = font;
        this.color = color;
        this.textAlign = "left";
        this.textBaseline = "top";
        this.maxWidth = null;
        this.outline = 0;
        this.lineHeight = 0;
        this.lineWidth = null;
      }
      var p = createjs.extend(Text, createjs.DisplayObject);
      var canvas = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
      if (canvas.getContext) {
        Text._workingContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1;
      }
      Text.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -0.5,
        end: -1,
        right: -1
      };
      Text.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1
      };
      p.isVisible = function() {
        var hasContent = this.cacheCanvas || (this.text != null && this.text !== "");
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return true;
        }
        var col = this.color || "#000";
        if (this.outline) {
          ctx.strokeStyle = col;
          ctx.lineWidth = this.outline * 1;
        } else {
          ctx.fillStyle = col;
        }
        this._drawText(this._prepContext(ctx));
        return true;
      };
      p.getMeasuredWidth = function() {
        return this._getMeasuredWidth(this.text);
      };
      p.getMeasuredLineHeight = function() {
        return this._getMeasuredWidth("M") * 1.2;
      };
      p.getMeasuredHeight = function() {
        return this._drawText(null, {}).height;
      };
      p.getBounds = function() {
        var rect = this.DisplayObject_getBounds();
        if (rect) {
          return rect;
        }
        if (this.text == null || this.text === "") {
          return null;
        }
        var o = this._drawText(null, {});
        var w = (this.maxWidth && this.maxWidth < o.width) ? this.maxWidth : o.width;
        var x = w * Text.H_OFFSETS[this.textAlign || "left"];
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        var y = lineHeight * Text.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(x, y, w, o.height);
      };
      p.getMetrics = function() {
        var o = {lines: []};
        o.lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        o.vOffset = o.lineHeight * Text.V_OFFSETS[this.textBaseline || "top"];
        return this._drawText(null, o, o.lines);
      };
      p.clone = function() {
        return this._cloneProps(new Text(this.text, this.font, this.color));
      };
      p.toString = function() {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]";
      };
      p._cloneProps = function(o) {
        this.DisplayObject__cloneProps(o);
        o.textAlign = this.textAlign;
        o.textBaseline = this.textBaseline;
        o.maxWidth = this.maxWidth;
        o.outline = this.outline;
        o.lineHeight = this.lineHeight;
        o.lineWidth = this.lineWidth;
        return o;
      };
      p._prepContext = function(ctx) {
        ctx.font = this.font || "10px sans-serif";
        ctx.textAlign = this.textAlign || "left";
        ctx.textBaseline = this.textBaseline || "top";
        return ctx;
      };
      p._drawText = function(ctx, o, lines) {
        var paint = !!ctx;
        if (!paint) {
          ctx = Text._workingContext;
          ctx.save();
          this._prepContext(ctx);
        }
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        var maxW = 0,
            count = 0;
        var hardLines = String(this.text).split(/(?:\r\n|\r|\n)/);
        for (var i = 0,
            l = hardLines.length; i < l; i++) {
          var str = hardLines[i];
          var w = null;
          if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
            var words = str.split(/(\s)/);
            str = words[0];
            w = ctx.measureText(str).width;
            for (var j = 1,
                jl = words.length; j < jl; j += 2) {
              var wordW = ctx.measureText(words[j] + words[j + 1]).width;
              if (w + wordW > this.lineWidth) {
                if (paint) {
                  this._drawTextLine(ctx, str, count * lineHeight);
                }
                if (lines) {
                  lines.push(str);
                }
                if (w > maxW) {
                  maxW = w;
                }
                str = words[j + 1];
                w = ctx.measureText(str).width;
                count++;
              } else {
                str += words[j] + words[j + 1];
                w += wordW;
              }
            }
          }
          if (paint) {
            this._drawTextLine(ctx, str, count * lineHeight);
          }
          if (lines) {
            lines.push(str);
          }
          if (o && w == null) {
            w = ctx.measureText(str).width;
          }
          if (w > maxW) {
            maxW = w;
          }
          count++;
        }
        if (o) {
          o.width = maxW;
          o.height = count * lineHeight;
        }
        if (!paint) {
          ctx.restore();
        }
        return o;
      };
      p._drawTextLine = function(ctx, text, y) {
        if (this.outline) {
          ctx.strokeText(text, 0, y, this.maxWidth || 0xFFFF);
        } else {
          ctx.fillText(text, 0, y, this.maxWidth || 0xFFFF);
        }
      };
      p._getMeasuredWidth = function(text) {
        var ctx = Text._workingContext;
        ctx.save();
        var w = this._prepContext(ctx).measureText(text).width;
        ctx.restore();
        return w;
      };
      createjs.Text = createjs.promote(Text, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function BitmapText(text, spriteSheet) {
        this.Container_constructor();
        this.text = text || "";
        this.spriteSheet = spriteSheet;
        this.lineHeight = 0;
        this.letterSpacing = 0;
        this.spaceWidth = 0;
        this._oldProps = {
          text: 0,
          spriteSheet: 0,
          lineHeight: 0,
          letterSpacing: 0,
          spaceWidth: 0
        };
      }
      var p = createjs.extend(BitmapText, createjs.Container);
      BitmapText.maxPoolSize = 100;
      BitmapText._spritePool = [];
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return;
        }
        this._updateText();
        this.Container_draw(ctx, ignoreCache);
      };
      p.getBounds = function() {
        this._updateText();
        return this.Container_getBounds();
      };
      p.isVisible = function() {
        var hasContent = this.cacheCanvas || (this.spriteSheet && this.spriteSheet.complete && this.text);
        return !!(this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0 && hasContent);
      };
      p.clone = function() {
        return this._cloneProps(new BitmapText(this.text, this.spriteSheet));
      };
      p.addChild = p.addChildAt = p.removeChild = p.removeChildAt = p.removeAllChildren = function() {};
      p._cloneProps = function(o) {
        this.Container__cloneProps(o);
        o.lineHeight = this.lineHeight;
        o.letterSpacing = this.letterSpacing;
        o.spaceWidth = this.spaceWidth;
        return o;
      };
      p._getFrameIndex = function(character, spriteSheet) {
        var c,
            o = spriteSheet.getAnimation(character);
        if (!o) {
          (character != (c = character.toUpperCase())) || (character != (c = character.toLowerCase())) || (c = null);
          if (c) {
            o = spriteSheet.getAnimation(c);
          }
        }
        return o && o.frames[0];
      };
      p._getFrame = function(character, spriteSheet) {
        var index = this._getFrameIndex(character, spriteSheet);
        return index == null ? index : spriteSheet.getFrame(index);
      };
      p._getLineHeight = function(ss) {
        var frame = this._getFrame("1", ss) || this._getFrame("T", ss) || this._getFrame("L", ss) || ss.getFrame(0);
        return frame ? frame.rect.height : 1;
      };
      p._getSpaceWidth = function(ss) {
        var frame = this._getFrame("1", ss) || this._getFrame("l", ss) || this._getFrame("e", ss) || this._getFrame("a", ss) || ss.getFrame(0);
        return frame ? frame.rect.width : 1;
      };
      p._updateText = function() {
        var x = 0,
            y = 0,
            o = this._oldProps,
            change = false,
            spaceW = this.spaceWidth,
            lineH = this.lineHeight,
            ss = this.spriteSheet;
        var pool = BitmapText._spritePool,
            kids = this.children,
            childIndex = 0,
            numKids = kids.length,
            sprite;
        for (var n in o) {
          if (o[n] != this[n]) {
            o[n] = this[n];
            change = true;
          }
        }
        if (!change) {
          return;
        }
        var hasSpace = !!this._getFrame(" ", ss);
        if (!hasSpace && !spaceW) {
          spaceW = this._getSpaceWidth(ss);
        }
        if (!lineH) {
          lineH = this._getLineHeight(ss);
        }
        for (var i = 0,
            l = this.text.length; i < l; i++) {
          var character = this.text.charAt(i);
          if (character == " " && !hasSpace) {
            x += spaceW;
            continue;
          } else if (character == "\n" || character == "\r") {
            if (character == "\r" && this.text.charAt(i + 1) == "\n") {
              i++;
            }
            x = 0;
            y += lineH;
            continue;
          }
          var index = this._getFrameIndex(character, ss);
          if (index == null) {
            continue;
          }
          if (childIndex < numKids) {
            sprite = kids[childIndex];
          } else {
            kids.push(sprite = pool.length ? pool.pop() : new createjs.Sprite());
            sprite.parent = this;
            numKids++;
          }
          sprite.spriteSheet = ss;
          sprite.gotoAndStop(index);
          sprite.x = x;
          sprite.y = y;
          childIndex++;
          x += sprite.getBounds().width + this.letterSpacing;
        }
        while (numKids > childIndex) {
          pool.push(sprite = kids.pop());
          sprite.parent = null;
          numKids--;
        }
        if (pool.length > BitmapText.maxPoolSize) {
          pool.length = BitmapText.maxPoolSize;
        }
      };
      createjs.BitmapText = createjs.promote(BitmapText, "Container");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function MovieClip(mode, startPosition, loop, labels) {
        this.Container_constructor();
        !MovieClip.inited && MovieClip.init();
        this.mode = mode || MovieClip.INDEPENDENT;
        this.startPosition = startPosition || 0;
        this.loop = loop;
        this.currentFrame = 0;
        this.timeline = new createjs.Timeline(null, labels, {
          paused: true,
          position: startPosition,
          useTicks: true
        });
        this.paused = false;
        this.actionsEnabled = true;
        this.autoReset = true;
        this.frameBounds = this.frameBounds || null;
        this.framerate = null;
        this._synchOffset = 0;
        this._prevPos = -1;
        this._prevPosition = 0;
        this._t = 0;
        this._managed = {};
      }
      var p = createjs.extend(MovieClip, createjs.Container);
      MovieClip.INDEPENDENT = "independent";
      MovieClip.SINGLE_FRAME = "single";
      MovieClip.SYNCHED = "synched";
      MovieClip.inited = false;
      MovieClip.init = function() {
        if (MovieClip.inited) {
          return;
        }
        MovieClipPlugin.install();
        MovieClip.inited = true;
      };
      p.getLabels = function() {
        return this.timeline.getLabels();
      };
      p.getCurrentLabel = function() {
        this._updateTimeline();
        return this.timeline.getCurrentLabel();
      };
      p.getDuration = function() {
        return this.timeline.duration;
      };
      try {
        Object.defineProperties(p, {
          labels: {get: p.getLabels},
          currentLabel: {get: p.getCurrentLabel},
          totalFrames: {get: p.getDuration},
          duration: {get: p.getDuration}
        });
      } catch (e) {}
      p.initialize = MovieClip;
      p.isVisible = function() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
      };
      p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) {
          return true;
        }
        this._updateTimeline();
        this.Container_draw(ctx, ignoreCache);
        return true;
      };
      p.play = function() {
        this.paused = false;
      };
      p.stop = function() {
        this.paused = true;
      };
      p.gotoAndPlay = function(positionOrLabel) {
        this.paused = false;
        this._goto(positionOrLabel);
      };
      p.gotoAndStop = function(positionOrLabel) {
        this.paused = true;
        this._goto(positionOrLabel);
      };
      p.advance = function(time) {
        var independent = MovieClip.INDEPENDENT;
        if (this.mode != independent) {
          return;
        }
        var o = this,
            fps = o.framerate;
        while ((o = o.parent) && fps == null) {
          if (o.mode == independent) {
            fps = o._framerate;
          }
        }
        this._framerate = fps;
        var t = (fps != null && fps != -1 && time != null) ? time / (1000 / fps) + this._t : 1;
        var frames = t | 0;
        this._t = t - frames;
        while (!this.paused && frames--) {
          this._prevPosition = (this._prevPos < 0) ? 0 : this._prevPosition + 1;
          this._updateTimeline();
        }
      };
      p.clone = function() {
        throw ("MovieClip cannot be cloned.");
      };
      p.toString = function() {
        return "[MovieClip (name=" + this.name + ")]";
      };
      p._tick = function(evtObj) {
        this.advance(evtObj && evtObj.delta);
        this.Container__tick(evtObj);
      };
      p._goto = function(positionOrLabel) {
        var pos = this.timeline.resolve(positionOrLabel);
        if (pos == null) {
          return;
        }
        if (this._prevPos == -1) {
          this._prevPos = NaN;
        }
        this._prevPosition = pos;
        this._t = 0;
        this._updateTimeline();
      };
      p._reset = function() {
        this._prevPos = -1;
        this._t = this.currentFrame = 0;
        this.paused = false;
      };
      p._updateTimeline = function() {
        var tl = this.timeline;
        var synched = this.mode != MovieClip.INDEPENDENT;
        tl.loop = (this.loop == null) ? true : this.loop;
        var pos = synched ? this.startPosition + (this.mode == MovieClip.SINGLE_FRAME ? 0 : this._synchOffset) : (this._prevPos < 0 ? 0 : this._prevPosition);
        var mode = synched || !this.actionsEnabled ? createjs.Tween.NONE : null;
        this.currentFrame = tl._calcPosition(pos);
        tl.setPosition(pos, mode);
        this._prevPosition = tl._prevPosition;
        if (this._prevPos == tl._prevPos) {
          return;
        }
        this.currentFrame = this._prevPos = tl._prevPos;
        for (var n in this._managed) {
          this._managed[n] = 1;
        }
        var tweens = tl._tweens;
        for (var i = 0,
            l = tweens.length; i < l; i++) {
          var tween = tweens[i];
          var target = tween._target;
          if (target == this || tween.passive) {
            continue;
          }
          var offset = tween._stepPosition;
          if (target instanceof createjs.DisplayObject) {
            this._addManagedChild(target, offset);
          } else {
            this._setState(target.state, offset);
          }
        }
        var kids = this.children;
        for (i = kids.length - 1; i >= 0; i--) {
          var id = kids[i].id;
          if (this._managed[id] == 1) {
            this.removeChildAt(i);
            delete(this._managed[id]);
          }
        }
      };
      p._setState = function(state, offset) {
        if (!state) {
          return;
        }
        for (var i = state.length - 1; i >= 0; i--) {
          var o = state[i];
          var target = o.t;
          var props = o.p;
          for (var n in props) {
            target[n] = props[n];
          }
          this._addManagedChild(target, offset);
        }
      };
      p._addManagedChild = function(child, offset) {
        if (child._off) {
          return;
        }
        this.addChildAt(child, 0);
        if (child instanceof MovieClip) {
          child._synchOffset = offset;
          if (child.mode == MovieClip.INDEPENDENT && child.autoReset && !this._managed[child.id]) {
            child._reset();
          }
        }
        this._managed[child.id] = 2;
      };
      p._getBounds = function(matrix, ignoreTransform) {
        var bounds = this.DisplayObject_getBounds();
        if (!bounds) {
          this._updateTimeline();
          if (this.frameBounds) {
            bounds = this._rectangle.copy(this.frameBounds[this.currentFrame]);
          }
        }
        if (bounds) {
          return this._transformBounds(bounds, matrix, ignoreTransform);
        }
        return this.Container__getBounds(matrix, ignoreTransform);
      };
      createjs.MovieClip = createjs.promote(MovieClip, "Container");
      function MovieClipPlugin() {
        throw ("MovieClipPlugin cannot be instantiated.");
      }
      MovieClipPlugin.priority = 100;
      MovieClipPlugin.install = function() {
        createjs.Tween.installPlugin(MovieClipPlugin, ["startPosition"]);
      };
      MovieClipPlugin.init = function(tween, prop, value) {
        return value;
      };
      MovieClipPlugin.step = function() {};
      MovieClipPlugin.tween = function(tween, prop, value, startValues, endValues, ratio, wait, end) {
        if (!(tween.target instanceof MovieClip)) {
          return value;
        }
        return (ratio == 1 ? endValues[prop] : startValues[prop]);
      };
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function SpriteSheetUtils() {
        throw "SpriteSheetUtils cannot be instantiated";
      }
      var canvas = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
      if (canvas.getContext) {
        SpriteSheetUtils._workingCanvas = canvas;
        SpriteSheetUtils._workingContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1;
      }
      SpriteSheetUtils.addFlippedFrames = function(spriteSheet, horizontal, vertical, both) {
        if (!horizontal && !vertical && !both) {
          return;
        }
        var count = 0;
        if (horizontal) {
          SpriteSheetUtils._flip(spriteSheet, ++count, true, false);
        }
        if (vertical) {
          SpriteSheetUtils._flip(spriteSheet, ++count, false, true);
        }
        if (both) {
          SpriteSheetUtils._flip(spriteSheet, ++count, true, true);
        }
      };
      SpriteSheetUtils.extractFrame = function(spriteSheet, frameOrAnimation) {
        if (isNaN(frameOrAnimation)) {
          frameOrAnimation = spriteSheet.getAnimation(frameOrAnimation).frames[0];
        }
        var data = spriteSheet.getFrame(frameOrAnimation);
        if (!data) {
          return null;
        }
        var r = data.rect;
        var canvas = SpriteSheetUtils._workingCanvas;
        canvas.width = r.width;
        canvas.height = r.height;
        SpriteSheetUtils._workingContext.drawImage(data.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        return img;
      };
      SpriteSheetUtils.mergeAlpha = function(rgbImage, alphaImage, canvas) {
        if (!canvas) {
          canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        }
        canvas.width = Math.max(alphaImage.width, rgbImage.width);
        canvas.height = Math.max(alphaImage.height, rgbImage.height);
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.drawImage(rgbImage, 0, 0);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(alphaImage, 0, 0);
        ctx.restore();
        return canvas;
      };
      SpriteSheetUtils._flip = function(spriteSheet, count, h, v) {
        var imgs = spriteSheet._images;
        var canvas = SpriteSheetUtils._workingCanvas;
        var ctx = SpriteSheetUtils._workingContext;
        var il = imgs.length / count;
        for (var i = 0; i < il; i++) {
          var src = imgs[i];
          src.__tmp = i;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
          canvas.width = src.width;
          canvas.height = src.height;
          ctx.setTransform(h ? -1 : 1, 0, 0, v ? -1 : 1, h ? src.width : 0, v ? src.height : 0);
          ctx.drawImage(src, 0, 0);
          var img = document.createElement("img");
          img.src = canvas.toDataURL("image/png");
          img.width = src.width;
          img.height = src.height;
          imgs.push(img);
        }
        var frames = spriteSheet._frames;
        var fl = frames.length / count;
        for (i = 0; i < fl; i++) {
          src = frames[i];
          var rect = src.rect.clone();
          img = imgs[src.image.__tmp + il * count];
          var frame = {
            image: img,
            rect: rect,
            regX: src.regX,
            regY: src.regY
          };
          if (h) {
            rect.x = img.width - rect.x - rect.width;
            frame.regX = rect.width - src.regX;
          }
          if (v) {
            rect.y = img.height - rect.y - rect.height;
            frame.regY = rect.height - src.regY;
          }
          frames.push(frame);
        }
        var sfx = "_" + (h ? "h" : "") + (v ? "v" : "");
        var names = spriteSheet._animations;
        var data = spriteSheet._data;
        var al = names.length / count;
        for (i = 0; i < al; i++) {
          var name = names[i];
          src = data[name];
          var anim = {
            name: name + sfx,
            speed: src.speed,
            next: src.next,
            frames: []
          };
          if (src.next) {
            anim.next += sfx;
          }
          frames = src.frames;
          for (var j = 0,
              l = frames.length; j < l; j++) {
            anim.frames.push(frames[j] + fl * count);
          }
          data[anim.name] = anim;
          names.push(anim.name);
        }
      };
      createjs.SpriteSheetUtils = SpriteSheetUtils;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function SpriteSheetBuilder(framerate) {
        this.EventDispatcher_constructor();
        this.maxWidth = 2048;
        this.maxHeight = 2048;
        this.spriteSheet = null;
        this.scale = 1;
        this.padding = 1;
        this.timeSlice = 0.3;
        this.progress = -1;
        this.framerate = framerate || 0;
        this._frames = [];
        this._animations = {};
        this._data = null;
        this._nextFrameIndex = 0;
        this._index = 0;
        this._timerID = null;
        this._scale = 1;
      }
      var p = createjs.extend(SpriteSheetBuilder, createjs.EventDispatcher);
      SpriteSheetBuilder.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
      SpriteSheetBuilder.ERR_RUNNING = "a build is already running";
      p.addFrame = function(source, sourceRect, scale, setupFunction, setupData) {
        if (this._data) {
          throw SpriteSheetBuilder.ERR_RUNNING;
        }
        var rect = sourceRect || source.bounds || source.nominalBounds;
        if (!rect && source.getBounds) {
          rect = source.getBounds();
        }
        if (!rect) {
          return null;
        }
        scale = scale || 1;
        return this._frames.push({
          source: source,
          sourceRect: rect,
          scale: scale,
          funct: setupFunction,
          data: setupData,
          index: this._frames.length,
          height: rect.height * scale
        }) - 1;
      };
      p.addAnimation = function(name, frames, next, speed) {
        if (this._data) {
          throw SpriteSheetBuilder.ERR_RUNNING;
        }
        this._animations[name] = {
          frames: frames,
          next: next,
          speed: speed
        };
      };
      p.addMovieClip = function(source, sourceRect, scale, setupFunction, setupData, labelFunction) {
        if (this._data) {
          throw SpriteSheetBuilder.ERR_RUNNING;
        }
        var rects = source.frameBounds;
        var rect = sourceRect || source.bounds || source.nominalBounds;
        if (!rect && source.getBounds) {
          rect = source.getBounds();
        }
        if (!rect && !rects) {
          return;
        }
        var i,
            l,
            baseFrameIndex = this._frames.length;
        var duration = source.timeline.duration;
        for (i = 0; i < duration; i++) {
          var r = (rects && rects[i]) ? rects[i] : rect;
          this.addFrame(source, r, scale, this._setupMovieClipFrame, {
            i: i,
            f: setupFunction,
            d: setupData
          });
        }
        var labels = source.timeline._labels;
        var lbls = [];
        for (var n in labels) {
          lbls.push({
            index: labels[n],
            label: n
          });
        }
        if (lbls.length) {
          lbls.sort(function(a, b) {
            return a.index - b.index;
          });
          for (i = 0, l = lbls.length; i < l; i++) {
            var label = lbls[i].label;
            var start = baseFrameIndex + lbls[i].index;
            var end = baseFrameIndex + ((i == l - 1) ? duration : lbls[i + 1].index);
            var frames = [];
            for (var j = start; j < end; j++) {
              frames.push(j);
            }
            if (labelFunction) {
              label = labelFunction(label, source, start, end);
              if (!label) {
                continue;
              }
            }
            this.addAnimation(label, frames, true);
          }
        }
      };
      p.build = function() {
        if (this._data) {
          throw SpriteSheetBuilder.ERR_RUNNING;
        }
        this._startBuild();
        while (this._drawNext()) {}
        this._endBuild();
        return this.spriteSheet;
      };
      p.buildAsync = function(timeSlice) {
        if (this._data) {
          throw SpriteSheetBuilder.ERR_RUNNING;
        }
        this.timeSlice = timeSlice;
        this._startBuild();
        var _this = this;
        this._timerID = setTimeout(function() {
          _this._run();
        }, 50 - Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)) * 50);
      };
      p.stopAsync = function() {
        clearTimeout(this._timerID);
        this._data = null;
      };
      p.clone = function() {
        throw ("SpriteSheetBuilder cannot be cloned.");
      };
      p.toString = function() {
        return "[SpriteSheetBuilder]";
      };
      p._startBuild = function() {
        var pad = this.padding || 0;
        this.progress = 0;
        this.spriteSheet = null;
        this._index = 0;
        this._scale = this.scale;
        var dataFrames = [];
        this._data = {
          images: [],
          frames: dataFrames,
          framerate: this.framerate,
          animations: this._animations
        };
        var frames = this._frames.slice();
        frames.sort(function(a, b) {
          return (a.height <= b.height) ? -1 : 1;
        });
        if (frames[frames.length - 1].height + pad * 2 > this.maxHeight) {
          throw SpriteSheetBuilder.ERR_DIMENSIONS;
        }
        var y = 0,
            x = 0;
        var img = 0;
        while (frames.length) {
          var o = this._fillRow(frames, y, img, dataFrames, pad);
          if (o.w > x) {
            x = o.w;
          }
          y += o.h;
          if (!o.h || !frames.length) {
            var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
            canvas.width = this._getSize(x, this.maxWidth);
            canvas.height = this._getSize(y, this.maxHeight);
            this._data.images[img] = canvas;
            if (!o.h) {
              x = y = 0;
              img++;
            }
          }
        }
      };
      p._setupMovieClipFrame = function(source, data) {
        var ae = source.actionsEnabled;
        source.actionsEnabled = false;
        source.gotoAndStop(data.i);
        source.actionsEnabled = ae;
        data.f && data.f(source, data.d, data.i);
      };
      p._getSize = function(size, max) {
        var pow = 4;
        while (Math.pow(2, ++pow) < size) {}
        return Math.min(max, Math.pow(2, pow));
      };
      p._fillRow = function(frames, y, img, dataFrames, pad) {
        var w = this.maxWidth;
        var maxH = this.maxHeight;
        y += pad;
        var h = maxH - y;
        var x = pad;
        var height = 0;
        for (var i = frames.length - 1; i >= 0; i--) {
          var frame = frames[i];
          var sc = this._scale * frame.scale;
          var rect = frame.sourceRect;
          var source = frame.source;
          var rx = Math.floor(sc * rect.x - pad);
          var ry = Math.floor(sc * rect.y - pad);
          var rh = Math.ceil(sc * rect.height + pad * 2);
          var rw = Math.ceil(sc * rect.width + pad * 2);
          if (rw > w) {
            throw SpriteSheetBuilder.ERR_DIMENSIONS;
          }
          if (rh > h || x + rw > w) {
            continue;
          }
          frame.img = img;
          frame.rect = new createjs.Rectangle(x, y, rw, rh);
          height = height || rh;
          frames.splice(i, 1);
          dataFrames[frame.index] = [x, y, rw, rh, img, Math.round(-rx + sc * source.regX - pad), Math.round(-ry + sc * source.regY - pad)];
          x += rw;
        }
        return {
          w: x,
          h: height
        };
      };
      p._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data);
        this._data = null;
        this.progress = 1;
        this.dispatchEvent("complete");
      };
      p._run = function() {
        var ts = Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)) * 50;
        var t = (new Date()).getTime() + ts;
        var complete = false;
        while (t > (new Date()).getTime()) {
          if (!this._drawNext()) {
            complete = true;
            break;
          }
        }
        if (complete) {
          this._endBuild();
        } else {
          var _this = this;
          this._timerID = setTimeout(function() {
            _this._run();
          }, 50 - ts);
        }
        var p = this.progress = this._index / this._frames.length;
        if (this.hasEventListener("progress")) {
          var evt = new createjs.Event("progress");
          evt.progress = p;
          this.dispatchEvent(evt);
        }
      };
      p._drawNext = function() {
        var frame = this._frames[this._index];
        var sc = frame.scale * this._scale;
        var rect = frame.rect;
        var sourceRect = frame.sourceRect;
        var canvas = this._data.images[frame.img];
        var ctx = canvas.getContext("2d");
        frame.funct && frame.funct(frame.source, frame.data);
        ctx.save();
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.clip();
        ctx.translate(Math.ceil(rect.x - sourceRect.x * sc), Math.ceil(rect.y - sourceRect.y * sc));
        ctx.scale(sc, sc);
        frame.source.draw(ctx);
        ctx.restore();
        return (++this._index) < this._frames.length;
      };
      createjs.SpriteSheetBuilder = createjs.promote(SpriteSheetBuilder, "EventDispatcher");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function DOMElement(htmlElement) {
        this.DisplayObject_constructor();
        if (typeof(htmlElement) == "string") {
          htmlElement = document.getElementById(htmlElement);
        }
        this.mouseEnabled = false;
        var style = htmlElement.style;
        style.position = "absolute";
        style.transformOrigin = style.WebkitTransformOrigin = style.msTransformOrigin = style.MozTransformOrigin = style.OTransformOrigin = "0% 0%";
        this.htmlElement = htmlElement;
        this._oldProps = null;
      }
      var p = createjs.extend(DOMElement, createjs.DisplayObject);
      p.isVisible = function() {
        return this.htmlElement != null;
      };
      p.draw = function(ctx, ignoreCache) {
        return true;
      };
      p.cache = function() {};
      p.uncache = function() {};
      p.updateCache = function() {};
      p.hitTest = function() {};
      p.localToGlobal = function() {};
      p.globalToLocal = function() {};
      p.localToLocal = function() {};
      p.clone = function() {
        throw ("DOMElement cannot be cloned.");
      };
      p.toString = function() {
        return "[DOMElement (name=" + this.name + ")]";
      };
      p._tick = function(evtObj) {
        var stage = this.getStage();
        stage && stage.on("drawend", this._handleDrawEnd, this, true);
        this.DisplayObject__tick(evtObj);
      };
      p._handleDrawEnd = function(evt) {
        var o = this.htmlElement;
        if (!o) {
          return;
        }
        var style = o.style;
        var props = this.getConcatenatedDisplayProps(this._props),
            mtx = props.matrix;
        var visibility = props.visible ? "visible" : "hidden";
        if (visibility != style.visibility) {
          style.visibility = visibility;
        }
        if (!props.visible) {
          return;
        }
        var oldProps = this._oldProps,
            oldMtx = oldProps && oldProps.matrix;
        var n = 10000;
        if (!oldMtx || !oldMtx.equals(mtx)) {
          var str = "matrix(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + "," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + "," + (mtx.tx + 0.5 | 0);
          style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str + "," + (mtx.ty + 0.5 | 0) + ")";
          style.MozTransform = str + "px," + (mtx.ty + 0.5 | 0) + "px)";
          if (!oldProps) {
            oldProps = this._oldProps = new createjs.DisplayProps(true, NaN);
          }
          oldProps.matrix.copy(mtx);
        }
        if (oldProps.alpha != props.alpha) {
          style.opacity = "" + (props.alpha * n | 0) / n;
          oldProps.alpha = props.alpha;
        }
      };
      createjs.DOMElement = createjs.promote(DOMElement, "DisplayObject");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Filter() {}
      var p = Filter.prototype;
      p.getBounds = function(rect) {
        return rect;
      };
      p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        targetCtx = targetCtx || ctx;
        if (targetX == null) {
          targetX = x;
        }
        if (targetY == null) {
          targetY = y;
        }
        try {
          var imageData = ctx.getImageData(x, y, width, height);
        } catch (e) {
          return false;
        }
        if (this._applyFilter(imageData)) {
          targetCtx.putImageData(imageData, targetX, targetY);
          return true;
        }
        return false;
      };
      p.toString = function() {
        return "[Filter]";
      };
      p.clone = function() {
        return new Filter();
      };
      p._applyFilter = function(imageData) {
        return true;
      };
      createjs.Filter = Filter;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function BlurFilter(blurX, blurY, quality) {
        if (isNaN(blurX) || blurX < 0)
          blurX = 0;
        if (isNaN(blurY) || blurY < 0)
          blurY = 0;
        if (isNaN(quality) || quality < 1)
          quality = 1;
        this.blurX = blurX | 0;
        this.blurY = blurY | 0;
        this.quality = quality | 0;
      }
      var p = createjs.extend(BlurFilter, createjs.Filter);
      BlurFilter.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];
      BlurFilter.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];
      p.getBounds = function(rect) {
        var x = this.blurX | 0,
            y = this.blurY | 0;
        if (x <= 0 && y <= 0) {
          return rect;
        }
        var q = Math.pow(this.quality, 0.2);
        return (rect || new createjs.Rectangle()).pad(x * q + 1, y * q + 1, x * q + 1, y * q + 1);
      };
      p.clone = function() {
        return new BlurFilter(this.blurX, this.blurY, this.quality);
      };
      p.toString = function() {
        return "[BlurFilter]";
      };
      p._applyFilter = function(imageData) {
        var radiusX = this.blurX >> 1;
        if (isNaN(radiusX) || radiusX < 0)
          return false;
        var radiusY = this.blurY >> 1;
        if (isNaN(radiusY) || radiusY < 0)
          return false;
        if (radiusX == 0 && radiusY == 0)
          return false;
        var iterations = this.quality;
        if (isNaN(iterations) || iterations < 1)
          iterations = 1;
        iterations |= 0;
        if (iterations > 3)
          iterations = 3;
        if (iterations < 1)
          iterations = 1;
        var px = imageData.data;
        var x = 0,
            y = 0,
            i = 0,
            p = 0,
            yp = 0,
            yi = 0,
            yw = 0,
            r = 0,
            g = 0,
            b = 0,
            a = 0,
            pr = 0,
            pg = 0,
            pb = 0,
            pa = 0;
        var divx = (radiusX + radiusX + 1) | 0;
        var divy = (radiusY + radiusY + 1) | 0;
        var w = imageData.width | 0;
        var h = imageData.height | 0;
        var w1 = (w - 1) | 0;
        var h1 = (h - 1) | 0;
        var rxp1 = (radiusX + 1) | 0;
        var ryp1 = (radiusY + 1) | 0;
        var ssx = {
          r: 0,
          b: 0,
          g: 0,
          a: 0
        };
        var sx = ssx;
        for (i = 1; i < divx; i++) {
          sx = sx.n = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
          };
        }
        sx.n = ssx;
        var ssy = {
          r: 0,
          b: 0,
          g: 0,
          a: 0
        };
        var sy = ssy;
        for (i = 1; i < divy; i++) {
          sy = sy.n = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
          };
        }
        sy.n = ssy;
        var si = null;
        var mtx = BlurFilter.MUL_TABLE[radiusX] | 0;
        var stx = BlurFilter.SHG_TABLE[radiusX] | 0;
        var mty = BlurFilter.MUL_TABLE[radiusY] | 0;
        var sty = BlurFilter.SHG_TABLE[radiusY] | 0;
        while (iterations-- > 0) {
          yw = yi = 0;
          var ms = mtx;
          var ss = stx;
          for (y = h; --y > -1; ) {
            r = rxp1 * (pr = px[(yi) | 0]);
            g = rxp1 * (pg = px[(yi + 1) | 0]);
            b = rxp1 * (pb = px[(yi + 2) | 0]);
            a = rxp1 * (pa = px[(yi + 3) | 0]);
            sx = ssx;
            for (i = rxp1; --i > -1; ) {
              sx.r = pr;
              sx.g = pg;
              sx.b = pb;
              sx.a = pa;
              sx = sx.n;
            }
            for (i = 1; i < rxp1; i++) {
              p = (yi + ((w1 < i ? w1 : i) << 2)) | 0;
              r += (sx.r = px[p]);
              g += (sx.g = px[p + 1]);
              b += (sx.b = px[p + 2]);
              a += (sx.a = px[p + 3]);
              sx = sx.n;
            }
            si = ssx;
            for (x = 0; x < w; x++) {
              px[yi++] = (r * ms) >>> ss;
              px[yi++] = (g * ms) >>> ss;
              px[yi++] = (b * ms) >>> ss;
              px[yi++] = (a * ms) >>> ss;
              p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);
              r -= si.r - (si.r = px[p]);
              g -= si.g - (si.g = px[p + 1]);
              b -= si.b - (si.b = px[p + 2]);
              a -= si.a - (si.a = px[p + 3]);
              si = si.n;
            }
            yw += w;
          }
          ms = mty;
          ss = sty;
          for (x = 0; x < w; x++) {
            yi = (x << 2) | 0;
            r = (ryp1 * (pr = px[yi])) | 0;
            g = (ryp1 * (pg = px[(yi + 1) | 0])) | 0;
            b = (ryp1 * (pb = px[(yi + 2) | 0])) | 0;
            a = (ryp1 * (pa = px[(yi + 3) | 0])) | 0;
            sy = ssy;
            for (i = 0; i < ryp1; i++) {
              sy.r = pr;
              sy.g = pg;
              sy.b = pb;
              sy.a = pa;
              sy = sy.n;
            }
            yp = w;
            for (i = 1; i <= radiusY; i++) {
              yi = (yp + x) << 2;
              r += (sy.r = px[yi]);
              g += (sy.g = px[yi + 1]);
              b += (sy.b = px[yi + 2]);
              a += (sy.a = px[yi + 3]);
              sy = sy.n;
              if (i < h1) {
                yp += w;
              }
            }
            yi = x;
            si = ssy;
            if (iterations > 0) {
              for (y = 0; y < h; y++) {
                p = yi << 2;
                px[p + 3] = pa = (a * ms) >>> ss;
                if (pa > 0) {
                  px[p] = ((r * ms) >>> ss);
                  px[p + 1] = ((g * ms) >>> ss);
                  px[p + 2] = ((b * ms) >>> ss);
                } else {
                  px[p] = px[p + 1] = px[p + 2] = 0;
                }
                p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;
                r -= si.r - (si.r = px[p]);
                g -= si.g - (si.g = px[p + 1]);
                b -= si.b - (si.b = px[p + 2]);
                a -= si.a - (si.a = px[p + 3]);
                si = si.n;
                yi += w;
              }
            } else {
              for (y = 0; y < h; y++) {
                p = yi << 2;
                px[p + 3] = pa = (a * ms) >>> ss;
                if (pa > 0) {
                  pa = 255 / pa;
                  px[p] = ((r * ms) >>> ss) * pa;
                  px[p + 1] = ((g * ms) >>> ss) * pa;
                  px[p + 2] = ((b * ms) >>> ss) * pa;
                } else {
                  px[p] = px[p + 1] = px[p + 2] = 0;
                }
                p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;
                r -= si.r - (si.r = px[p]);
                g -= si.g - (si.g = px[p + 1]);
                b -= si.b - (si.b = px[p + 2]);
                a -= si.a - (si.a = px[p + 3]);
                si = si.n;
                yi += w;
              }
            }
          }
        }
        return true;
      };
      createjs.BlurFilter = createjs.promote(BlurFilter, "Filter");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function AlphaMapFilter(alphaMap) {
        this.alphaMap = alphaMap;
        this._alphaMap = null;
        this._mapData = null;
      }
      var p = createjs.extend(AlphaMapFilter, createjs.Filter);
      p.clone = function() {
        var o = new AlphaMapFilter(this.alphaMap);
        o._alphaMap = this._alphaMap;
        o._mapData = this._mapData;
        return o;
      };
      p.toString = function() {
        return "[AlphaMapFilter]";
      };
      p._applyFilter = function(imageData) {
        if (!this.alphaMap) {
          return true;
        }
        if (!this._prepAlphaMap()) {
          return false;
        }
        var data = imageData.data;
        var map = this._mapData;
        for (var i = 0,
            l = data.length; i < l; i += 4) {
          data[i + 3] = map[i] || 0;
        }
        return true;
      };
      p._prepAlphaMap = function() {
        if (!this.alphaMap) {
          return false;
        }
        if (this.alphaMap == this._alphaMap && this._mapData) {
          return true;
        }
        this._mapData = null;
        var map = this._alphaMap = this.alphaMap;
        var canvas = map;
        var ctx;
        if (map instanceof HTMLCanvasElement) {
          ctx = canvas.getContext("2d");
        } else {
          canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
          canvas.width = map.width;
          canvas.height = map.height;
          ctx = canvas.getContext("2d");
          ctx.drawImage(map, 0, 0);
        }
        try {
          var imgData = ctx.getImageData(0, 0, map.width, map.height);
        } catch (e) {
          return false;
        }
        this._mapData = imgData.data;
        return true;
      };
      createjs.AlphaMapFilter = createjs.promote(AlphaMapFilter, "Filter");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function AlphaMaskFilter(mask) {
        this.mask = mask;
      }
      var p = createjs.extend(AlphaMaskFilter, createjs.Filter);
      p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        if (!this.mask) {
          return true;
        }
        targetCtx = targetCtx || ctx;
        if (targetX == null) {
          targetX = x;
        }
        if (targetY == null) {
          targetY = y;
        }
        targetCtx.save();
        if (ctx != targetCtx) {
          return false;
        }
        targetCtx.globalCompositeOperation = "destination-in";
        targetCtx.drawImage(this.mask, targetX, targetY);
        targetCtx.restore();
        return true;
      };
      p.clone = function() {
        return new AlphaMaskFilter(this.mask);
      };
      p.toString = function() {
        return "[AlphaMaskFilter]";
      };
      createjs.AlphaMaskFilter = createjs.promote(AlphaMaskFilter, "Filter");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function ColorFilter(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
        this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
        this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
        this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
        this.redOffset = redOffset || 0;
        this.greenOffset = greenOffset || 0;
        this.blueOffset = blueOffset || 0;
        this.alphaOffset = alphaOffset || 0;
      }
      var p = createjs.extend(ColorFilter, createjs.Filter);
      p.toString = function() {
        return "[ColorFilter]";
      };
      p.clone = function() {
        return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
      };
      p._applyFilter = function(imageData) {
        var data = imageData.data;
        var l = data.length;
        for (var i = 0; i < l; i += 4) {
          data[i] = data[i] * this.redMultiplier + this.redOffset;
          data[i + 1] = data[i + 1] * this.greenMultiplier + this.greenOffset;
          data[i + 2] = data[i + 2] * this.blueMultiplier + this.blueOffset;
          data[i + 3] = data[i + 3] * this.alphaMultiplier + this.alphaOffset;
        }
        return true;
      };
      createjs.ColorFilter = createjs.promote(ColorFilter, "Filter");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function ColorMatrix(brightness, contrast, saturation, hue) {
        this.setColor(brightness, contrast, saturation, hue);
      }
      var p = ColorMatrix.prototype;
      ColorMatrix.DELTA_INDEX = [0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54, 1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25, 2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0, 7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8, 10.0];
      ColorMatrix.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
      ColorMatrix.LENGTH = ColorMatrix.IDENTITY_MATRIX.length;
      p.setColor = function(brightness, contrast, saturation, hue) {
        return this.reset().adjustColor(brightness, contrast, saturation, hue);
      };
      p.reset = function() {
        return this.copy(ColorMatrix.IDENTITY_MATRIX);
      };
      p.adjustColor = function(brightness, contrast, saturation, hue) {
        this.adjustHue(hue);
        this.adjustContrast(contrast);
        this.adjustBrightness(brightness);
        return this.adjustSaturation(saturation);
      };
      p.adjustBrightness = function(value) {
        if (value == 0 || isNaN(value)) {
          return this;
        }
        value = this._cleanValue(value, 255);
        this._multiplyMatrix([1, 0, 0, 0, value, 0, 1, 0, 0, value, 0, 0, 1, 0, value, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this;
      };
      p.adjustContrast = function(value) {
        if (value == 0 || isNaN(value)) {
          return this;
        }
        value = this._cleanValue(value, 100);
        var x;
        if (value < 0) {
          x = 127 + value / 100 * 127;
        } else {
          x = value % 1;
          if (x == 0) {
            x = ColorMatrix.DELTA_INDEX[value];
          } else {
            x = ColorMatrix.DELTA_INDEX[(value << 0)] * (1 - x) + ColorMatrix.DELTA_INDEX[(value << 0) + 1] * x;
          }
          x = x * 127 + 127;
        }
        this._multiplyMatrix([x / 127, 0, 0, 0, 0.5 * (127 - x), 0, x / 127, 0, 0, 0.5 * (127 - x), 0, 0, x / 127, 0, 0.5 * (127 - x), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this;
      };
      p.adjustSaturation = function(value) {
        if (value == 0 || isNaN(value)) {
          return this;
        }
        value = this._cleanValue(value, 100);
        var x = 1 + ((value > 0) ? 3 * value / 100 : value / 100);
        var lumR = 0.3086;
        var lumG = 0.6094;
        var lumB = 0.0820;
        this._multiplyMatrix([lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this;
      };
      p.adjustHue = function(value) {
        if (value == 0 || isNaN(value)) {
          return this;
        }
        value = this._cleanValue(value, 180) / 180 * Math.PI;
        var cosVal = Math.cos(value);
        var sinVal = Math.sin(value);
        var lumR = 0.213;
        var lumG = 0.715;
        var lumB = 0.072;
        this._multiplyMatrix([lumR + cosVal * (1 - lumR) + sinVal * (-lumR), lumG + cosVal * (-lumG) + sinVal * (-lumG), lumB + cosVal * (-lumB) + sinVal * (1 - lumB), 0, 0, lumR + cosVal * (-lumR) + sinVal * (0.143), lumG + cosVal * (1 - lumG) + sinVal * (0.140), lumB + cosVal * (-lumB) + sinVal * (-0.283), 0, 0, lumR + cosVal * (-lumR) + sinVal * (-(1 - lumR)), lumG + cosVal * (-lumG) + sinVal * (lumG), lumB + cosVal * (1 - lumB) + sinVal * (lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this;
      };
      p.concat = function(matrix) {
        matrix = this._fixMatrix(matrix);
        if (matrix.length != ColorMatrix.LENGTH) {
          return this;
        }
        this._multiplyMatrix(matrix);
        return this;
      };
      p.clone = function() {
        return (new ColorMatrix()).copy(this);
      };
      p.toArray = function() {
        var arr = [];
        for (var i = 0,
            l = ColorMatrix.LENGTH; i < l; i++) {
          arr[i] = this[i];
        }
        return arr;
      };
      p.copy = function(matrix) {
        var l = ColorMatrix.LENGTH;
        for (var i = 0; i < l; i++) {
          this[i] = matrix[i];
        }
        return this;
      };
      p.toString = function() {
        return "[ColorMatrix]";
      };
      p._multiplyMatrix = function(matrix) {
        var i,
            j,
            k,
            col = [];
        for (i = 0; i < 5; i++) {
          for (j = 0; j < 5; j++) {
            col[j] = this[j + i * 5];
          }
          for (j = 0; j < 5; j++) {
            var val = 0;
            for (k = 0; k < 5; k++) {
              val += matrix[j + k * 5] * col[k];
            }
            this[j + i * 5] = val;
          }
        }
      };
      p._cleanValue = function(value, limit) {
        return Math.min(limit, Math.max(-limit, value));
      };
      p._fixMatrix = function(matrix) {
        if (matrix instanceof ColorMatrix) {
          matrix = matrix.toArray();
        }
        if (matrix.length < ColorMatrix.LENGTH) {
          matrix = matrix.slice(0, matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(matrix.length, ColorMatrix.LENGTH));
        } else if (matrix.length > ColorMatrix.LENGTH) {
          matrix = matrix.slice(0, ColorMatrix.LENGTH);
        }
        return matrix;
      };
      createjs.ColorMatrix = ColorMatrix;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function ColorMatrixFilter(matrix) {
        this.matrix = matrix;
      }
      var p = createjs.extend(ColorMatrixFilter, createjs.Filter);
      p.toString = function() {
        return "[ColorMatrixFilter]";
      };
      p.clone = function() {
        return new ColorMatrixFilter(this.matrix);
      };
      p._applyFilter = function(imageData) {
        var data = imageData.data;
        var l = data.length;
        var r,
            g,
            b,
            a;
        var mtx = this.matrix;
        var m0 = mtx[0],
            m1 = mtx[1],
            m2 = mtx[2],
            m3 = mtx[3],
            m4 = mtx[4];
        var m5 = mtx[5],
            m6 = mtx[6],
            m7 = mtx[7],
            m8 = mtx[8],
            m9 = mtx[9];
        var m10 = mtx[10],
            m11 = mtx[11],
            m12 = mtx[12],
            m13 = mtx[13],
            m14 = mtx[14];
        var m15 = mtx[15],
            m16 = mtx[16],
            m17 = mtx[17],
            m18 = mtx[18],
            m19 = mtx[19];
        for (var i = 0; i < l; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          a = data[i + 3];
          data[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
          data[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
          data[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
          data[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19;
        }
        return true;
      };
      createjs.ColorMatrixFilter = createjs.promote(ColorMatrixFilter, "Filter");
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      function Touch() {
        throw "Touch cannot be instantiated";
      }
      Touch.isSupported = function() {
        return !!(('ontouchstart' in window) || (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0));
      };
      Touch.enable = function(stage, singleTouch, allowDefault) {
        if (!stage || !stage.canvas || !Touch.isSupported()) {
          return false;
        }
        if (stage.__touch) {
          return true;
        }
        stage.__touch = {
          pointers: {},
          multitouch: !singleTouch,
          preventDefault: !allowDefault,
          count: 0
        };
        if ('ontouchstart' in window) {
          Touch._IOS_enable(stage);
        } else if (window.navigator['msPointerEnabled'] || window.navigator["pointerEnabled"]) {
          Touch._IE_enable(stage);
        }
        return true;
      };
      Touch.disable = function(stage) {
        if (!stage) {
          return;
        }
        if ('ontouchstart' in window) {
          Touch._IOS_disable(stage);
        } else if (window.navigator['msPointerEnabled'] || window.navigator["pointerEnabled"]) {
          Touch._IE_disable(stage);
        }
        delete stage.__touch;
      };
      Touch._IOS_enable = function(stage) {
        var canvas = stage.canvas;
        var f = stage.__touch.f = function(e) {
          Touch._IOS_handleEvent(stage, e);
        };
        canvas.addEventListener("touchstart", f, false);
        canvas.addEventListener("touchmove", f, false);
        canvas.addEventListener("touchend", f, false);
        canvas.addEventListener("touchcancel", f, false);
      };
      Touch._IOS_disable = function(stage) {
        var canvas = stage.canvas;
        if (!canvas) {
          return;
        }
        var f = stage.__touch.f;
        canvas.removeEventListener("touchstart", f, false);
        canvas.removeEventListener("touchmove", f, false);
        canvas.removeEventListener("touchend", f, false);
        canvas.removeEventListener("touchcancel", f, false);
      };
      Touch._IOS_handleEvent = function(stage, e) {
        if (!stage) {
          return;
        }
        if (stage.__touch.preventDefault) {
          e.preventDefault && e.preventDefault();
        }
        var touches = e.changedTouches;
        var type = e.type;
        for (var i = 0,
            l = touches.length; i < l; i++) {
          var touch = touches[i];
          var id = touch.identifier;
          if (touch.target != stage.canvas) {
            continue;
          }
          if (type == "touchstart") {
            this._handleStart(stage, id, e, touch.pageX, touch.pageY);
          } else if (type == "touchmove") {
            this._handleMove(stage, id, e, touch.pageX, touch.pageY);
          } else if (type == "touchend" || type == "touchcancel") {
            this._handleEnd(stage, id, e);
          }
        }
      };
      Touch._IE_enable = function(stage) {
        var canvas = stage.canvas;
        var f = stage.__touch.f = function(e) {
          Touch._IE_handleEvent(stage, e);
        };
        if (window.navigator["pointerEnabled"] === undefined) {
          canvas.addEventListener("MSPointerDown", f, false);
          window.addEventListener("MSPointerMove", f, false);
          window.addEventListener("MSPointerUp", f, false);
          window.addEventListener("MSPointerCancel", f, false);
          if (stage.__touch.preventDefault) {
            canvas.style.msTouchAction = "none";
          }
        } else {
          canvas.addEventListener("pointerdown", f, false);
          window.addEventListener("pointermove", f, false);
          window.addEventListener("pointerup", f, false);
          window.addEventListener("pointercancel", f, false);
          if (stage.__touch.preventDefault) {
            canvas.style.touchAction = "none";
          }
        }
        stage.__touch.activeIDs = {};
      };
      Touch._IE_disable = function(stage) {
        var f = stage.__touch.f;
        if (window.navigator["pointerEnabled"] === undefined) {
          window.removeEventListener("MSPointerMove", f, false);
          window.removeEventListener("MSPointerUp", f, false);
          window.removeEventListener("MSPointerCancel", f, false);
          if (stage.canvas) {
            stage.canvas.removeEventListener("MSPointerDown", f, false);
          }
        } else {
          window.removeEventListener("pointermove", f, false);
          window.removeEventListener("pointerup", f, false);
          window.removeEventListener("pointercancel", f, false);
          if (stage.canvas) {
            stage.canvas.removeEventListener("pointerdown", f, false);
          }
        }
      };
      Touch._IE_handleEvent = function(stage, e) {
        if (!stage) {
          return;
        }
        if (stage.__touch.preventDefault) {
          e.preventDefault && e.preventDefault();
        }
        var type = e.type;
        var id = e.pointerId;
        var ids = stage.__touch.activeIDs;
        if (type == "MSPointerDown" || type == "pointerdown") {
          if (e.srcElement != stage.canvas) {
            return;
          }
          ids[id] = true;
          this._handleStart(stage, id, e, e.pageX, e.pageY);
        } else if (ids[id]) {
          if (type == "MSPointerMove" || type == "pointermove") {
            this._handleMove(stage, id, e, e.pageX, e.pageY);
          } else if (type == "MSPointerUp" || type == "MSPointerCancel" || type == "pointerup" || type == "pointercancel") {
            delete(ids[id]);
            this._handleEnd(stage, id, e);
          }
        }
      };
      Touch._handleStart = function(stage, id, e, x, y) {
        var props = stage.__touch;
        if (!props.multitouch && props.count) {
          return;
        }
        var ids = props.pointers;
        if (ids[id]) {
          return;
        }
        ids[id] = true;
        props.count++;
        stage._handlePointerDown(id, e, x, y);
      };
      Touch._handleMove = function(stage, id, e, x, y) {
        if (!stage.__touch.pointers[id]) {
          return;
        }
        stage._handlePointerMove(id, e, x, y);
      };
      Touch._handleEnd = function(stage, id, e) {
        var props = stage.__touch;
        var ids = props.pointers;
        if (!ids[id]) {
          return;
        }
        props.count--;
        stage._handlePointerUp(id, e, true);
        delete(ids[id]);
      };
      createjs.Touch = Touch;
    }());
    this.createjs = this.createjs || {};
    (function() {
      "use strict";
      var s = createjs.EaselJS = createjs.EaselJS || {};
      s.version = "0.8.2";
      s.buildDate = "Thu, 26 Nov 2015 20:44:34 GMT";
    })();
  })();
  return _retrieveGlobal();
});

System.registerDynamic("github:CreateJS/EaselJS@0.8.2.js", ["github:CreateJS/EaselJS@0.8.2/lib/easeljs-0.8.2.combined.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:CreateJS/EaselJS@0.8.2/lib/easeljs-0.8.2.combined.js');
  return module.exports;
});

System.register("src/stage.ts", ["github:CreateJS/EaselJS@0.8.2.js"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1;
  var stage,
      shape;
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }],
    execute: function() {
      stage = new easel_1.default.Stage('canvas');
      shape = new easel_1.default.Shape();
      shape.graphics.beginFill('green').drawRect(0, 0, 1000, 500);
      stage.addChild(shape);
      exports_1("default", stage);
    }
  };
});

System.register("src/ticker.ts", ["npm:rx@4.1.0.js", "src/stage.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var rx_1,
      stage_1;
  return {
    setters: [function(rx_1_1) {
      rx_1 = rx_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }],
    execute: function() {
      exports_1("default", rx_1.Observable.interval(17).timeInterval().tap(function() {
        stage_1.default.update();
      }));
    }
  };
});

System.register("src/bullet.ts", ["github:CreateJS/EaselJS@0.8.2.js", "npm:rx@4.1.0.js", "src/stage.ts", "src/ticker.ts", "src/utils.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      rx_1,
      stage_1,
      ticker_1,
      utils_1;
  var bullet$,
      bulletMove$;
  function bulletFactory(tower, enemy) {
    var bullet = new easel_1.default.Shape();
    var positionX = tower.x,
        positionY = tower.y;
    var destinationX = enemy.x,
        destinationY = enemy.y;
    bullet.graphics.beginFill('black').drawCircle(0, 0, 10);
    bullet.x = positionX;
    bullet.y = positionY;
    bullet.destinationX = destinationX;
    bullet.destinationY = destinationY;
    bullet.speed = 10;
    bullet.actions = {
      die: new rx_1.default.Subject(),
      move: new rx_1.default.Subject()
    };
    bullet.die = function() {
      stage_1.default.removeChild(bullet);
      bullet.subscribcion.completed();
      bullet.moveSubscription.completed();
      bullet.actions.move.onCompleted();
      bullet.actions.die.onCompleted();
    };
    bullet.subscribcion = ticker_1.default.subscribe(function() {
      var newDirections = utils_1.getMove(bullet, {
        x: destinationX,
        y: destinationY
      }, bullet.speed);
      bullet.x = newDirections.x;
      bullet.y = newDirections.y;
      bullet.actions.move.onNext(bullet);
      bulletMove$.onNext(bullet);
    });
    bullet.moveSubscription = bullet.actions.move.subscribe(function(movedBullet) {
      if (utils_1.getDistance(movedBullet.x, movedBullet.y, movedBullet.destinationX, movedBullet.destinationY) < movedBullet.speed * 1.43) {
        stage_1.default.removeChild(movedBullet);
        movedBullet.actions.move.onCompleted();
        movedBullet.actions.die.onCompleted();
        movedBullet.moveSubscription.dispose();
        enemy.die();
      }
    });
    bullet$.onNext(bullet);
    stage_1.default.addChild(bullet);
    return bullet;
  }
  exports_1("bulletFactory", bulletFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(rx_1_1) {
      rx_1 = rx_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      exports_1("bullet$", bullet$ = new rx_1.default.Subject());
      exports_1("bulletMove$", bulletMove$ = new rx_1.default.Subject());
    }
  };
});

System.register("src/utils.ts", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var getDistance,
      getDirection;
  function getMove(position, destination, speed) {
    var directionX = getDirection(position.x, destination.x, speed);
    var directionY = getDirection(position.y, destination.y, speed);
    var newX = position.x + directionX * speed;
    var newY = destination.y + directionY * speed;
    return {
      x: newX,
      y: newY
    };
  }
  exports_1("getMove", getMove);
  function isInDistance(tower, enemy) {
    return getDistance(tower.x, tower.y, enemy.x, enemy.y) <= tower.range;
  }
  exports_1("isInDistance", isInDistance);
  return {
    setters: [],
    execute: function() {
      exports_1("getDistance", getDistance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      });
      getDirection = function(position, destination, speed) {
        if (Math.abs(position - destination) < speed * 1.43) {
          return 0;
        }
        return destination > position ? 1 : -1;
      };
    }
  };
});

System.register("src/engine.ts", ["src/enemy/index.ts", "src/tower.ts", "src/bullet.ts", "src/utils.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var index_1,
      tower_1,
      bullet_1,
      utils_1;
  var towers,
      enemies,
      bullets;
  return {
    setters: [function(index_1_1) {
      index_1 = index_1_1;
    }, function(tower_1_1) {
      tower_1 = tower_1_1;
    }, function(bullet_1_1) {
      bullet_1 = bullet_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      towers = [];
      enemies = [];
      bullets = [];
      bullet_1.bullet$.subscribe(function(bullet) {
        bullets.push(bullet);
      });
      index_1.enemy$.subscribe(function(enemy) {
        enemies.push(enemy);
      });
      bullet_1.bullet$.subscribe(function(bullet) {
        bullets.push(bullet);
      });
      tower_1.tower$.subscribe(function(tower) {
        towers.push(tower);
      });
      index_1.enemiesMove$.subscribe(function(enemy) {
        var towerInRange = towers.filter(function(tower) {
          return utils_1.isInDistance(tower, enemy);
        }).filter(function(tower) {
          return tower.reloadBulltetTime === 0;
        });
        towerInRange.forEach(function(tower) {
          tower.fireToEnemy(enemy);
        });
      });
      tower_1.towerFireToEnemy$.subscribe(function(_a) {
        var tower = _a.tower,
            enemy = _a.enemy;
        bullet_1.bulletFactory(tower, enemy);
      });
    }
  };
});

System.registerDynamic("npm:typescript@2.0.0/lib/lib.es6.d.ts!github:frankwallis/plugin-typescript@5.0.8/plugin.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  return module.exports;
});

System.register("src/main.ts", ["npm:rx@4.1.0.js", "src/stage.ts", "src/enemy/index.ts", "src/tower.ts", "src/path.ts", "src/engine.ts"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var rx_1,
      stage_1,
      index_1,
      tower_1,
      path_1;
  return {
    setters: [function(rx_1_1) {
      rx_1 = rx_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(index_1_1) {
      index_1 = index_1_1;
    }, function(tower_1_1) {
      tower_1 = tower_1_1;
    }, function(path_1_1) {
      path_1 = path_1_1;
    }, function(_1) {}],
    execute: function() {
      stage_1.default.addChild(path_1.default);
      stage_1.default.update();
      index_1.enemyFactory();
      tower_1.towerFactory(450, 300);
      rx_1.default.Observable.interval(333).timeInterval().subscribe(function() {
        index_1.enemyFactory(stage_1.default);
      });
    }
  };
});

//# sourceMappingURL=build.js.map