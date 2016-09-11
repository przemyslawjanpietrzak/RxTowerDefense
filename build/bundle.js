!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.register("2", ["3", "4"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      mapPoint_1;
  var line;
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(mapPoint_1_1) {
      mapPoint_1 = mapPoint_1_1;
    }],
    execute: function() {
      line = new easel_1.default.Shape();
      line.graphics.beginStroke("black");
      line.graphics.moveTo(0, 0);
      mapPoint_1.default.forEach(function(_a) {
        var x = _a.x,
            y = _a.y;
        line.graphics.lineTo(x, y);
      });
      exports_1("default", line);
    }
  };
});

$__System.register("6", ["7", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1,
      settings_1;
  var money,
      drivers;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }],
    execute: function() {
      money = settings_1.moneyOnBegin;
      drivers = {changeWalletState$: function(_a) {
          var newTower$ = _a.newTower$,
              bulletHitEnemy$ = _a.bulletHitEnemy$;
          return Rx_1.Observable.merge(bulletHitEnemy$.map(function() {
            return money += settings_1.enemy.price;
          }), newTower$.map(function() {
            return money -= settings_1.tower.cost;
          }));
        }};
      exports_1("default", drivers);
    }
  };
});

$__System.register("9", ["a", "6"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var sinks_1,
      drivers_1;
  function runWallet(sinks) {
    Object.keys(drivers_1.default).forEach(function(key) {
      var source = drivers_1.default[key](sinks);
      source.subscribe(function(value) {
        sinks_1.changeWalletState$.next(value);
      });
    });
  }
  exports_1("runWallet", runWallet);
  return {
    setters: [function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }, function(drivers_1_1) {
      drivers_1 = drivers_1_1;
    }],
    execute: function() {}
  };
});

$__System.register("b", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function() {
      exports_1("default", {});
    }
  };
});

$__System.register("c", ["8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var settings_1;
  return {
    setters: [function(settings_1_1) {
      settings_1 = settings_1_1;
    }],
    execute: function() {
      exports_1("default", {
        changeWalletState$: function(_a) {
          var changeWalletState$ = _a.changeWalletState$;
          changeWalletState$.subscribe(function(money) {
            document.getElementById('money-count').innerHTML = money;
          });
        },
        enemyPassAllPaths$: function(_a) {
          var enemyPassAllPaths$ = _a.enemyPassAllPaths$;
          enemyPassAllPaths$.subscribe(function() {
            var livesCount = parseInt(document.getElementById('lives-count').textContent);
            if (livesCount <= 1) {
              window.alert(settings_1.dieMessage);
              window.location.reload();
            } else {
              document.getElementById('lives-count').innerHTML = livesCount - 1;
            }
          });
        }
      });
    }
  };
});

$__System.register("d", ["8", "b", "c"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var settings_1,
      drivers_1,
      effects_1;
  function runMenu(sinks) {
    Object.keys(drivers_1.default).forEach(function(key) {
      drivers_1.default[key](sinks);
    });
    Object.keys(effects_1.default).forEach(function(key) {
      effects_1.default[key](sinks);
    });
  }
  exports_1("runMenu", runMenu);
  return {
    setters: [function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(drivers_1_1) {
      drivers_1 = drivers_1_1;
    }, function(effects_1_1) {
      effects_1 = effects_1_1;
    }],
    execute: function() {
      document.getElementById('money-count').innerHTML = String(settings_1.moneyOnBegin);
      document.getElementById('lives-count').innerHTML = String(settings_1.livesOnBegin);
    }
  };
});

$__System.register("e", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function() {
      exports_1("default", {
        tickPerStep: 500,
        parts: {
          '0': {tickPerEnemy: 330},
          '1': {tickPerEnemy: 250},
          '2': {tickPerEnemy: 200},
          '3': {tickPerEnemy: 150},
          '4': {tickPerEnemy: 150},
          '5': {tickPerEnemy: 120},
          '6': {tickPerEnemy: 90},
          '7': {tickPerEnemy: 60},
          '8': {tickPerEnemy: 33},
          '9': {tickPerEnemy: 17}
        }
      });
    }
  };
});

$__System.register("f", ["3", "10", "11", "12", "13", "8", "14", "15"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      stage_1,
      sinks_1,
      ticker_1,
      utils_1,
      settings_1,
      area_1,
      sinks_2;
  function towerFactory(x, y) {
    var reloadBulletTime = 100;
    var tower = new easel_1.default.Shape();
    tower.graphics.beginFill(settings_1.tower.color).drawCircle(0, 0, settings_1.tower.size);
    tower.x = x;
    tower.y = y;
    tower.range = settings_1.tower.range;
    tower.reloadBulletTime = 0;
    tower.enemiesInRange = [];
    tower.areaVisible = false;
    tower.area = area_1.getArea(tower);
    tower.onClickHandler = area_1.toogleAreaFactory(tower);
    tower.addEventListener('click', tower.onClickHandler);
    tower.fireToEnemy = function towerFireToEnemy(enemy) {
      sinks_2.towerFireToEnemy$.next({
        tower: tower,
        enemy: enemy
      });
      tower.reloadBulletTime = reloadBulletTime;
    };
    tower.die = function() {
      stage_1.default.removeChild(tower);
      tower.enemySubscription.unsubscribe();
      "";
      tower.stageClickSubscription.unsubscribe();
      tower.tickerSubscription.unsubscribe();
      tower.removeEventListener('click');
    };
    tower.tickerSubscription = ticker_1.default.subscribe(function() {
      if (tower.reloadBulletTime > 0) {
        tower.reloadBulletTime--;
      }
    });
    tower.enemySubscription = sinks_1.enemyMove$.filter(function() {
      return tower.reloadBulletTime === 0;
    }).subscribe(function(enemy) {
      if (utils_1.isInDistance(tower, enemy)) {
        tower.enemiesInRange.push(enemy);
      }
      var firstEnemy = tower.enemiesInRange[0];
      if (firstEnemy) {
        tower.fireToEnemy(firstEnemy);
      }
      tower.enemiesInRange = [];
    });
    tower.stageClickSubscription = stage_1.stageClick$.filter(function(event) {
      return utils_1.getDistance(event.stageX, event.stageY, tower.x, tower.y) > settings_1.tower.size;
    }).subscribe(function() {
      area_1.hideTowerArea(tower);
    });
    stage_1.default.addChild(tower);
    return tower;
  }
  exports_1("towerFactory", towerFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(area_1_1) {
      area_1 = area_1_1;
    }, function(sinks_2_1) {
      sinks_2 = sinks_2_1;
    }],
    execute: function() {}
  };
});

$__System.register("14", ["3", "10", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      stage_1,
      settings_1;
  function getArea(tower) {
    var area = new easel_1.default.Shape();
    area.graphics.beginFill(settings_1.tower.areaColor).drawCircle(tower.x, tower.y, tower.range);
    return area;
  }
  exports_1("getArea", getArea);
  function toogleAreaFactory(tower) {
    return function(event) {
      var areaWasVisible = tower.areaVisible;
      if (areaWasVisible) {
        stage_1.default.removeChild(tower.area);
      } else {
        stage_1.default.addChild(tower.area);
      }
      tower.areaVisible = !areaWasVisible;
    };
  }
  exports_1("toogleAreaFactory", toogleAreaFactory);
  function hideTowerArea(tower) {
    tower.areaVisible = false;
    stage_1.default.removeChild(tower.area);
  }
  exports_1("hideTowerArea", hideTowerArea);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }],
    execute: function() {}
  };
});

$__System.register("16", ["3", "10", "8", "14"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      stage_1,
      settings_1,
      area_1;
  var showTowerShape,
      hideTowerShape;
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(area_1_1) {
      area_1 = area_1_1;
    }],
    execute: function() {
      exports_1("showTowerShape", showTowerShape = function(x, y) {
        var towerShape = new easel_1.default.Shape();
        towerShape.graphics.beginFill(settings_1.tower.color).drawCircle(0, 0, settings_1.tower.size);
        towerShape.x = x;
        towerShape.y = y;
        towerShape.range = settings_1.tower.range;
        towerShape.areaVisible = true;
        towerShape.area = area_1.getArea(towerShape);
        stage_1.default.addChild(towerShape);
        stage_1.default.addChild(towerShape.area);
        return towerShape;
      });
      exports_1("hideTowerShape", hideTowerShape = function(towerShape) {
        stage_1.default.removeChild(towerShape);
        stage_1.default.removeChild(towerShape.area);
      });
    }
  };
});

$__System.register("17", ["8", "f", "16"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var settings_1,
      towers_1,
      shape_1;
  var towerPropose,
      showTowerPropose,
      money;
  return {
    setters: [function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(towers_1_1) {
      towers_1 = towers_1_1;
    }, function(shape_1_1) {
      shape_1 = shape_1_1;
    }],
    execute: function() {
      towerPropose = null;
      showTowerPropose = false;
      money = settings_1.moneyOnBegin;
      exports_1("default", {
        addTowerButtonClick$: function(_a) {
          var addTowerButtonClick$ = _a.addTowerButtonClick$;
          addTowerButtonClick$.filter(function() {
            return money >= settings_1.tower.cost;
          }).subscribe(function(event) {
            showTowerPropose = true;
          });
        },
        stageClick$: function(_a) {
          var stageClick$ = _a.stageClick$;
          stageClick$.filter(function() {
            return showTowerPropose;
          }).subscribe(function(event) {
            if (towerPropose) {
              shape_1.hideTowerShape(towerPropose);
            }
            towerPropose = shape_1.showTowerShape(event.stageX, event.stageY);
            showTowerPropose = true;
          });
        },
        cancelTowerButtonClick$: function(_a) {
          var cancelTowerButtonClick$ = _a.cancelTowerButtonClick$;
          cancelTowerButtonClick$.filter(function() {
            return towerPropose;
          }).subscribe(function(event) {
            showTowerPropose = false;
            if (towerPropose) {
              shape_1.hideTowerShape(towerPropose);
              towerPropose = null;
            }
          });
        },
        newTower$: function(_a) {
          var newTower$ = _a.newTower$;
          newTower$.subscribe(function(event) {
            shape_1.hideTowerShape(towerPropose);
            towers_1.towerFactory(towerPropose.x, towerPropose.y);
            showTowerPropose = false;
          });
        },
        confirmTowerButtonClick$: function(_a) {
          var confirmTowerButtonClick$ = _a.confirmTowerButtonClick$,
              newTower$ = _a.newTower$;
          confirmTowerButtonClick$.filter(function() {
            return towerPropose && showTowerPropose;
          }).subscribe(function(value) {
            newTower$.next(value);
          });
        },
        changeWalletState$: function(_a) {
          var changeWalletState$ = _a.changeWalletState$;
          changeWalletState$.subscribe(function(newMoney) {
            money = newMoney;
          });
        }
      });
    }
  };
});

$__System.register("18", ["17"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var effects_1;
  function runTower(sinks) {
    Object.keys(effects_1.default).forEach(function(key) {
      effects_1.default[key](sinks);
    });
  }
  exports_1("runTower", runTower);
  return {
    setters: [function(effects_1_1) {
      effects_1 = effects_1_1;
    }],
    execute: function() {}
  };
});

$__System.register("19", ["13", "1a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var utils_1,
      sinks_1;
  return {
    setters: [function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }],
    execute: function() {
      sinks_1.bulletHitEnemy$.map(utils_1.prop('enemy')).subscribe(function(enemy) {
        enemy.die();
      });
    }
  };
});

$__System.register("1b", ["13"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var utils_1;
  var drivers;
  return {
    setters: [function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      drivers = {bulletHitEnemy$: function(_a) {
          var bulletMove$ = _a.bulletMove$;
          return bulletMove$.filter(function(bullet) {
            return utils_1.getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed;
          });
        }};
      exports_1("default", drivers);
    }
  };
});

$__System.register("1c", ["3", "10", "12", "13", "8", "1a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      stage_1,
      ticker_1,
      utils_1,
      settings_1,
      sinks_1;
  var die;
  function bulletFactory(tower, enemy) {
    var bullet = new easel_1.default.Shape();
    var positionX = tower.x,
        positionY = tower.y;
    var destinationX = enemy.x,
        destinationY = enemy.y;
    bullet.graphics.beginFill(settings_1.bullet.color).drawCircle(0, 0, settings_1.bullet.size);
    bullet.x = positionX;
    bullet.y = positionY;
    bullet.destinationX = destinationX;
    bullet.destinationY = destinationY;
    bullet.speed = settings_1.bullet.speed;
    bullet.enemy = enemy;
    bullet.die = function() {
      return die(bullet);
    };
    bullet.subscription = ticker_1.default.subscribe(function() {
      var newDirections = utils_1.getMove(bullet, {
        x: destinationX,
        y: destinationY
      }, bullet.speed);
      bullet.x = newDirections.x;
      bullet.y = newDirections.y;
      sinks_1.bulletMove$.next(bullet);
    });
    stage_1.default.addChild(bullet);
    return bullet;
  }
  exports_1("bulletFactory", bulletFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }],
    execute: function() {
      die = function(bullet) {
        stage_1.default.removeChild(bullet);
        bullet.subscription.unsubscribe();
      };
    }
  };
});

$__System.register("1d", ["1c"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var bullet_1;
  var bulletToDie;
  return {
    setters: [function(bullet_1_1) {
      bullet_1 = bullet_1_1;
    }],
    execute: function() {
      bulletToDie = null;
      exports_1("default", {
        towerFireToEnemy$: function(_a) {
          var towerFireToEnemy$ = _a.towerFireToEnemy$;
          towerFireToEnemy$.subscribe(function(_a) {
            var tower = _a.tower,
                enemy = _a.enemy;
            bullet_1.bulletFactory(tower, enemy);
          });
        },
        bulletHitEnemy$: function(_a) {
          var bulletHitEnemy$ = _a.bulletHitEnemy$;
          bulletHitEnemy$.subscribe(function(bullet) {
            bulletToDie = bullet;
          });
        },
        ticker$: function(_a) {
          var ticker$ = _a.ticker$;
          ticker$.filter(function() {
            return bulletToDie;
          }).subscribe(function() {
            bulletToDie.die();
            bulletToDie = null;
          });
        }
      });
    }
  };
});

$__System.register("1e", ["1b", "1d", "1a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var drivers_1,
      effects_1,
      sinks_1;
  var proxies;
  function runBullet(sinks) {
    Object.keys(drivers_1.default).forEach(function(key) {
      var source = drivers_1.default[key](sinks);
      source.subscribe(function(value) {
        proxies[key].next(value);
      });
    });
    Object.keys(effects_1.default).forEach(function(key) {
      effects_1.default[key](sinks);
    });
  }
  exports_1("runBullet", runBullet);
  return {
    setters: [function(drivers_1_1) {
      drivers_1 = drivers_1_1;
    }, function(effects_1_1) {
      effects_1 = effects_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }],
    execute: function() {
      proxies = {
        bulletHitEnemy$: sinks_1.bulletHitEnemy$,
        bulletMove$: sinks_1.bulletMove$
      };
    }
  };
});

$__System.register("a", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1;
  var changeWalletState$;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }],
    execute: function() {
      exports_1("changeWalletState$", changeWalletState$ = new Rx_1.Subject());
    }
  };
});

$__System.register("15", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1;
  var newTower$,
      towerFireToEnemy$;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }],
    execute: function() {
      exports_1("newTower$", newTower$ = new Rx_1.Subject());
      exports_1("towerFireToEnemy$", towerFireToEnemy$ = new Rx_1.Subject());
    }
  };
});

$__System.register("1a", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1;
  var bulletHitEnemy$,
      bulletMove$;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }],
    execute: function() {
      exports_1("bulletHitEnemy$", bulletHitEnemy$ = new Rx_1.Subject());
      exports_1("bulletMove$", bulletMove$ = new Rx_1.Subject());
    }
  };
});

$__System.registerDynamic("1f", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
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

$__System.registerDynamic("3", ["1f"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('1f');
  return module.exports;
});

$__System.register("10", ["3", "7", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      Rx_1,
      settings_1;
  var stage,
      shape,
      stageClick$;
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }],
    execute: function() {
      stage = new easel_1.default.Stage("canvas");
      shape = new easel_1.default.Shape();
      shape.graphics.beginFill(settings_1.stage.color).drawRect(0, 0, 700, 500);
      stage.addChild(shape);
      exports_1("default", stage);
      exports_1("stageClick$", stageClick$ = Rx_1.Observable.fromEvent(stage, 'click'));
    }
  };
});

$__System.register("20", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1;
  var addTowerButtonClick$,
      cancelTowerButtonClick$,
      confirmTowerButtonClick$,
      playPauseButtonClick$;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }],
    execute: function() {
      exports_1("addTowerButtonClick$", addTowerButtonClick$ = Rx_1.Observable.fromEvent(document.getElementById('add-tower'), 'click'));
      exports_1("cancelTowerButtonClick$", cancelTowerButtonClick$ = Rx_1.Observable.fromEvent(document.getElementById('cancel'), 'click'));
      exports_1("confirmTowerButtonClick$", confirmTowerButtonClick$ = Rx_1.Observable.fromEvent(document.getElementById('confirm'), 'click'));
      exports_1("playPauseButtonClick$", playPauseButtonClick$ = Rx_1.Observable.fromEvent(document.getElementById('play-pause'), 'click'));
    }
  };
});

$__System.register("12", ["7", "20"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1,
      sinks_1;
  var isPlay;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }],
    execute: function() {
      isPlay = true;
      sinks_1.playPauseButtonClick$.subscribe(function() {
        isPlay = !isPlay;
      });
      exports_1("default", Rx_1.Observable.interval(17).timeInterval().filter(function() {
        return isPlay;
      }));
    }
  };
});

$__System.register("4", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var steps;
  return {
    setters: [],
    execute: function() {
      steps = [{
        x: 100,
        y: 100
      }, {
        x: 100,
        y: 250
      }, {
        x: 250,
        y: 250
      }, {
        x: 500,
        y: 500
      }, {
        x: 750,
        y: 500
      }];
      exports_1("default", steps);
    }
  };
});

$__System.registerDynamic("21", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports = module.exports = Victor;
  function Victor(x, y) {
    if (!(this instanceof Victor)) {
      return new Victor(x, y);
    }
    this.x = x || 0;
    this.y = y || 0;
  }
  ;
  Victor.fromArray = function(arr) {
    return new Victor(arr[0] || 0, arr[1] || 0);
  };
  Victor.fromObject = function(obj) {
    return new Victor(obj.x || 0, obj.y || 0);
  };
  Victor.prototype.addX = function(vec) {
    this.x += vec.x;
    return this;
  };
  Victor.prototype.addY = function(vec) {
    this.y += vec.y;
    return this;
  };
  Victor.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  };
  Victor.prototype.addScalar = function(scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
  };
  Victor.prototype.addScalarX = function(scalar) {
    this.x += scalar;
    return this;
  };
  Victor.prototype.addScalarY = function(scalar) {
    this.y += scalar;
    return this;
  };
  Victor.prototype.subtractX = function(vec) {
    this.x -= vec.x;
    return this;
  };
  Victor.prototype.subtractY = function(vec) {
    this.y -= vec.y;
    return this;
  };
  Victor.prototype.subtract = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  };
  Victor.prototype.subtractScalar = function(scalar) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  };
  Victor.prototype.subtractScalarX = function(scalar) {
    this.x -= scalar;
    return this;
  };
  Victor.prototype.subtractScalarY = function(scalar) {
    this.y -= scalar;
    return this;
  };
  Victor.prototype.divideX = function(vector) {
    this.x /= vector.x;
    return this;
  };
  Victor.prototype.divideY = function(vector) {
    this.y /= vector.y;
    return this;
  };
  Victor.prototype.divide = function(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  };
  Victor.prototype.divideScalar = function(scalar) {
    if (scalar !== 0) {
      this.x /= scalar;
      this.y /= scalar;
    } else {
      this.x = 0;
      this.y = 0;
    }
    return this;
  };
  Victor.prototype.divideScalarX = function(scalar) {
    if (scalar !== 0) {
      this.x /= scalar;
    } else {
      this.x = 0;
    }
    return this;
  };
  Victor.prototype.divideScalarY = function(scalar) {
    if (scalar !== 0) {
      this.y /= scalar;
    } else {
      this.y = 0;
    }
    return this;
  };
  Victor.prototype.invertX = function() {
    this.x *= -1;
    return this;
  };
  Victor.prototype.invertY = function() {
    this.y *= -1;
    return this;
  };
  Victor.prototype.invert = function() {
    this.invertX();
    this.invertY();
    return this;
  };
  Victor.prototype.multiplyX = function(vector) {
    this.x *= vector.x;
    return this;
  };
  Victor.prototype.multiplyY = function(vector) {
    this.y *= vector.y;
    return this;
  };
  Victor.prototype.multiply = function(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  };
  Victor.prototype.multiplyScalar = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  };
  Victor.prototype.multiplyScalarX = function(scalar) {
    this.x *= scalar;
    return this;
  };
  Victor.prototype.multiplyScalarY = function(scalar) {
    this.y *= scalar;
    return this;
  };
  Victor.prototype.normalize = function() {
    var length = this.length();
    if (length === 0) {
      this.x = 1;
      this.y = 0;
    } else {
      this.divide(Victor(length, length));
    }
    return this;
  };
  Victor.prototype.norm = Victor.prototype.normalize;
  Victor.prototype.limit = function(max, factor) {
    if (Math.abs(this.x) > max) {
      this.x *= factor;
    }
    if (Math.abs(this.y) > max) {
      this.y *= factor;
    }
    return this;
  };
  Victor.prototype.randomize = function(topLeft, bottomRight) {
    this.randomizeX(topLeft, bottomRight);
    this.randomizeY(topLeft, bottomRight);
    return this;
  };
  Victor.prototype.randomizeX = function(topLeft, bottomRight) {
    var min = Math.min(topLeft.x, bottomRight.x);
    var max = Math.max(topLeft.x, bottomRight.x);
    this.x = random(min, max);
    return this;
  };
  Victor.prototype.randomizeY = function(topLeft, bottomRight) {
    var min = Math.min(topLeft.y, bottomRight.y);
    var max = Math.max(topLeft.y, bottomRight.y);
    this.y = random(min, max);
    return this;
  };
  Victor.prototype.randomizeAny = function(topLeft, bottomRight) {
    if (!!Math.round(Math.random())) {
      this.randomizeX(topLeft, bottomRight);
    } else {
      this.randomizeY(topLeft, bottomRight);
    }
    return this;
  };
  Victor.prototype.unfloat = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  Victor.prototype.toFixed = function(precision) {
    if (typeof precision === 'undefined') {
      precision = 8;
    }
    this.x = this.x.toFixed(precision);
    this.y = this.y.toFixed(precision);
    return this;
  };
  Victor.prototype.mixX = function(vec, amount) {
    if (typeof amount === 'undefined') {
      amount = 0.5;
    }
    this.x = (1 - amount) * this.x + amount * vec.x;
    return this;
  };
  Victor.prototype.mixY = function(vec, amount) {
    if (typeof amount === 'undefined') {
      amount = 0.5;
    }
    this.y = (1 - amount) * this.y + amount * vec.y;
    return this;
  };
  Victor.prototype.mix = function(vec, amount) {
    this.mixX(vec, amount);
    this.mixY(vec, amount);
    return this;
  };
  Victor.prototype.clone = function() {
    return new Victor(this.x, this.y);
  };
  Victor.prototype.copyX = function(vec) {
    this.x = vec.x;
    return this;
  };
  Victor.prototype.copyY = function(vec) {
    this.y = vec.y;
    return this;
  };
  Victor.prototype.copy = function(vec) {
    this.copyX(vec);
    this.copyY(vec);
    return this;
  };
  Victor.prototype.zero = function() {
    this.x = this.y = 0;
    return this;
  };
  Victor.prototype.dot = function(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
  };
  Victor.prototype.cross = function(vec2) {
    return (this.x * vec2.y) - (this.y * vec2.x);
  };
  Victor.prototype.projectOnto = function(vec2) {
    var coeff = ((this.x * vec2.x) + (this.y * vec2.y)) / ((vec2.x * vec2.x) + (vec2.y * vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
  };
  Victor.prototype.horizontalAngle = function() {
    return Math.atan2(this.y, this.x);
  };
  Victor.prototype.horizontalAngleDeg = function() {
    return radian2degrees(this.horizontalAngle());
  };
  Victor.prototype.verticalAngle = function() {
    return Math.atan2(this.x, this.y);
  };
  Victor.prototype.verticalAngleDeg = function() {
    return radian2degrees(this.verticalAngle());
  };
  Victor.prototype.angle = Victor.prototype.horizontalAngle;
  Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
  Victor.prototype.direction = Victor.prototype.horizontalAngle;
  Victor.prototype.rotate = function(angle) {
    var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
    var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
    this.x = nx;
    this.y = ny;
    return this;
  };
  Victor.prototype.rotateDeg = function(angle) {
    angle = degrees2radian(angle);
    return this.rotate(angle);
  };
  Victor.prototype.rotateTo = function(rotation) {
    return this.rotate(rotation - this.angle());
  };
  Victor.prototype.rotateToDeg = function(rotation) {
    rotation = degrees2radian(rotation);
    return this.rotateTo(rotation);
  };
  Victor.prototype.rotateBy = function(rotation) {
    var angle = this.angle() + rotation;
    return this.rotate(angle);
  };
  Victor.prototype.rotateByDeg = function(rotation) {
    rotation = degrees2radian(rotation);
    return this.rotateBy(rotation);
  };
  Victor.prototype.distanceX = function(vec) {
    return this.x - vec.x;
  };
  Victor.prototype.absDistanceX = function(vec) {
    return Math.abs(this.distanceX(vec));
  };
  Victor.prototype.distanceY = function(vec) {
    return this.y - vec.y;
  };
  Victor.prototype.absDistanceY = function(vec) {
    return Math.abs(this.distanceY(vec));
  };
  Victor.prototype.distance = function(vec) {
    return Math.sqrt(this.distanceSq(vec));
  };
  Victor.prototype.distanceSq = function(vec) {
    var dx = this.distanceX(vec),
        dy = this.distanceY(vec);
    return dx * dx + dy * dy;
  };
  Victor.prototype.length = function() {
    return Math.sqrt(this.lengthSq());
  };
  Victor.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
  };
  Victor.prototype.magnitude = Victor.prototype.length;
  Victor.prototype.isZero = function() {
    return this.x === 0 && this.y === 0;
  };
  Victor.prototype.isEqualTo = function(vec2) {
    return this.x === vec2.x && this.y === vec2.y;
  };
  Victor.prototype.toString = function() {
    return 'x:' + this.x + ', y:' + this.y;
  };
  Victor.prototype.toArray = function() {
    return [this.x, this.y];
  };
  Victor.prototype.toObject = function() {
    return {
      x: this.x,
      y: this.y
    };
  };
  var degrees = 180 / Math.PI;
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function radian2degrees(rad) {
    return rad * degrees;
  }
  function degrees2radian(deg) {
    return deg / degrees;
  }
  return module.exports;
});

$__System.registerDynamic("22", ["21"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('21');
  return module.exports;
});

$__System.register("13", ["22"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var victor_1;
  var getDistance,
      prop;
  function getMove(position, destination, speed) {
    var vector = new victor_1.default(destination.x - position.x, destination.y - position.y);
    var angle = vector.angle();
    var newX = position.x + speed * Math.cos(angle);
    var newY = position.y + speed * Math.sin(angle);
    return {
      x: newX,
      y: newY
    };
  }
  exports_1("getMove", getMove);
  function isInDistance(tower, destination) {
    return getDistance(tower.x, tower.y, destination.x, destination.y) <= tower.range;
  }
  exports_1("isInDistance", isInDistance);
  function getTickerPerEnemy(counter, scenario) {
    var currentPart = String(Math.floor(counter / scenario.tickPerStep));
    return scenario.parts[currentPart].tickPerEnemy;
  }
  exports_1("getTickerPerEnemy", getTickerPerEnemy);
  return {
    setters: [function(victor_1_1) {
      victor_1 = victor_1_1;
    }],
    execute: function() {
      exports_1("getDistance", getDistance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      });
      exports_1("prop", prop = function(key) {
        return function(obj) {
          return obj[key];
        };
      });
    }
  };
});

$__System.register("8", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var tower,
      stage,
      enemy,
      bullet,
      moneyOnBegin,
      livesOnBegin,
      dieMessage;
  return {
    setters: [],
    execute: function() {
      exports_1("tower", tower = {
        color: 'rgba(13,71,161 ,1)',
        range: 50,
        reloadBulletTime: 400,
        size: 5,
        areaColor: 'rgba(13,71,161 ,0.1)',
        cost: 500
      });
      exports_1("stage", stage = {color: 'rgb(187, 187, 187)'});
      exports_1("enemy", enemy = {
        size: 5,
        color: 'rgba(244,67,54 ,1)',
        speed: 2,
        price: 45
      });
      exports_1("bullet", bullet = {
        color: 'rgba(33,33,33 ,1)',
        speed: 10,
        size: 5
      });
      exports_1("moneyOnBegin", moneyOnBegin = 500);
      exports_1("livesOnBegin", livesOnBegin = 5);
      exports_1("dieMessage", dieMessage = 'You died!');
    }
  };
});

$__System.register("23", ["3", "10", "12", "4", "13", "8", "11"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var easel_1,
      stage_1,
      ticker_1,
      mapPoint_1,
      utils_1,
      settings_1,
      sinks_1;
  var die,
      enemyMove;
  function enemyFactory() {
    var enemy = new easel_1.default.Shape();
    enemy.graphics.beginFill(settings_1.enemy.color).drawCircle(0, 0, settings_1.enemy.size);
    enemy.step = 0;
    enemy.speed = settings_1.enemy.speed;
    enemy.die = function() {
      die(enemy);
    };
    enemy.subscription = ticker_1.default.subscribe(function() {
      enemyMove(enemy);
    });
    stage_1.default.addChild(enemy);
    return enemy;
  }
  exports_1("enemyFactory", enemyFactory);
  return {
    setters: [function(easel_1_1) {
      easel_1 = easel_1_1;
    }, function(stage_1_1) {
      stage_1 = stage_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(mapPoint_1_1) {
      mapPoint_1 = mapPoint_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(settings_1_1) {
      settings_1 = settings_1_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }],
    execute: function() {
      die = function(enemy) {
        stage_1.default.removeChild(enemy);
        enemy.subscription.unsubscribe();
      };
      enemyMove = function(enemy) {
        var nextStep = mapPoint_1.default[enemy.step];
        if (!nextStep) {
          sinks_1.enemyPassAllPaths$.next();
          enemy.die();
        } else {
          var newDirections = utils_1.getMove(enemy, nextStep, enemy.speed);
          enemy.x = newDirections.x;
          enemy.y = newDirections.y;
          if (utils_1.getDistance(enemy.x, enemy.y, nextStep.x, nextStep.y) < enemy.speed) {
            enemy.step++;
          }
          sinks_1.enemyMove$.next(enemy);
        }
      };
    }
  };
});

$__System.registerDynamic("24", ["25", "26", "27", "28"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var AsyncSubject_1 = $__require('28');
  var BoundCallbackObservable = (function(_super) {
    __extends(BoundCallbackObservable, _super);
    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
      _super.call(this);
      this.callbackFunc = callbackFunc;
      this.selector = selector;
      this.args = args;
      this.scheduler = scheduler;
    }
    BoundCallbackObservable.create = function(func, selector, scheduler) {
      if (selector === void 0) {
        selector = undefined;
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        return new BoundCallbackObservable(func, selector, args, scheduler);
      };
    };
    BoundCallbackObservable.prototype._subscribe = function(subscriber) {
      var callbackFunc = this.callbackFunc;
      var args = this.args;
      var scheduler = this.scheduler;
      var subject = this.subject;
      if (!scheduler) {
        if (!subject) {
          subject = this.subject = new AsyncSubject_1.AsyncSubject();
          var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector,
                subject = source.subject;
            if (selector) {
              var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
              if (result_1 === errorObject_1.errorObject) {
                subject.error(errorObject_1.errorObject.e);
              } else {
                subject.next(result_1);
                subject.complete();
              }
            } else {
              subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
              subject.complete();
            }
          };
          handler.source = this;
          var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
          if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
          }
        }
        return subject.subscribe(subscriber);
      } else {
        return scheduler.schedule(BoundCallbackObservable.dispatch, 0, {
          source: this,
          subscriber: subscriber
        });
      }
    };
    BoundCallbackObservable.dispatch = function(state) {
      var self = this;
      var source = state.source,
          subscriber = state.subscriber;
      var callbackFunc = source.callbackFunc,
          args = source.args,
          scheduler = source.scheduler;
      var subject = source.subject;
      if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i - 0] = arguments[_i];
          }
          var source = handlerFn.source;
          var selector = source.selector,
              subject = source.subject;
          if (selector) {
            var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
            if (result_2 === errorObject_1.errorObject) {
              self.add(scheduler.schedule(dispatchError, 0, {
                err: errorObject_1.errorObject.e,
                subject: subject
              }));
            } else {
              self.add(scheduler.schedule(dispatchNext, 0, {
                value: result_2,
                subject: subject
              }));
            }
          } else {
            var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
            self.add(scheduler.schedule(dispatchNext, 0, {
              value: value,
              subject: subject
            }));
          }
        };
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
          subject.error(errorObject_1.errorObject.e);
        }
      }
      self.add(subject.subscribe(subscriber));
    };
    return BoundCallbackObservable;
  }(Observable_1.Observable));
  exports.BoundCallbackObservable = BoundCallbackObservable;
  function dispatchNext(arg) {
    var value = arg.value,
        subject = arg.subject;
    subject.next(value);
    subject.complete();
  }
  function dispatchError(arg) {
    var err = arg.err,
        subject = arg.subject;
    subject.error(err);
  }
  return module.exports;
});

$__System.registerDynamic("29", ["24"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BoundCallbackObservable_1 = $__require('24');
  exports.bindCallback = BoundCallbackObservable_1.BoundCallbackObservable.create;
  return module.exports;
});

$__System.registerDynamic("2a", ["25", "29"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bindCallback_1 = $__require('29');
  Observable_1.Observable.bindCallback = bindCallback_1.bindCallback;
  return module.exports;
});

$__System.registerDynamic("2b", ["25", "26", "27", "28"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var AsyncSubject_1 = $__require('28');
  var BoundNodeCallbackObservable = (function(_super) {
    __extends(BoundNodeCallbackObservable, _super);
    function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
      _super.call(this);
      this.callbackFunc = callbackFunc;
      this.selector = selector;
      this.args = args;
      this.scheduler = scheduler;
    }
    BoundNodeCallbackObservable.create = function(func, selector, scheduler) {
      if (selector === void 0) {
        selector = undefined;
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        return new BoundNodeCallbackObservable(func, selector, args, scheduler);
      };
    };
    BoundNodeCallbackObservable.prototype._subscribe = function(subscriber) {
      var callbackFunc = this.callbackFunc;
      var args = this.args;
      var scheduler = this.scheduler;
      var subject = this.subject;
      if (!scheduler) {
        if (!subject) {
          subject = this.subject = new AsyncSubject_1.AsyncSubject();
          var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector,
                subject = source.subject;
            var err = innerArgs.shift();
            if (err) {
              subject.error(err);
            } else if (selector) {
              var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
              if (result_1 === errorObject_1.errorObject) {
                subject.error(errorObject_1.errorObject.e);
              } else {
                subject.next(result_1);
                subject.complete();
              }
            } else {
              subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
              subject.complete();
            }
          };
          handler.source = this;
          var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
          if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
          }
        }
        return subject.subscribe(subscriber);
      } else {
        return scheduler.schedule(dispatch, 0, {
          source: this,
          subscriber: subscriber
        });
      }
    };
    return BoundNodeCallbackObservable;
  }(Observable_1.Observable));
  exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
  function dispatch(state) {
    var self = this;
    var source = state.source,
        subscriber = state.subscriber;
    var _a = source,
        callbackFunc = _a.callbackFunc,
        args = _a.args,
        scheduler = _a.scheduler;
    var subject = source.subject;
    if (!subject) {
      subject = source.subject = new AsyncSubject_1.AsyncSubject();
      var handler = function handlerFn() {
        var innerArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          innerArgs[_i - 0] = arguments[_i];
        }
        var source = handlerFn.source;
        var selector = source.selector,
            subject = source.subject;
        var err = innerArgs.shift();
        if (err) {
          subject.error(err);
        } else if (selector) {
          var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
          if (result_2 === errorObject_1.errorObject) {
            self.add(scheduler.schedule(dispatchError, 0, {
              err: errorObject_1.errorObject.e,
              subject: subject
            }));
          } else {
            self.add(scheduler.schedule(dispatchNext, 0, {
              value: result_2,
              subject: subject
            }));
          }
        } else {
          var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
          self.add(scheduler.schedule(dispatchNext, 0, {
            value: value,
            subject: subject
          }));
        }
      };
      handler.source = source;
      var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
      if (result === errorObject_1.errorObject) {
        subject.error(errorObject_1.errorObject.e);
      }
    }
    self.add(subject.subscribe(subscriber));
  }
  function dispatchNext(arg) {
    var value = arg.value,
        subject = arg.subject;
    subject.next(value);
    subject.complete();
  }
  function dispatchError(arg) {
    var err = arg.err,
        subject = arg.subject;
    subject.error(err);
  }
  return module.exports;
});

$__System.registerDynamic("2c", ["2b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BoundNodeCallbackObservable_1 = $__require('2b');
  exports.bindNodeCallback = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;
  return module.exports;
});

$__System.registerDynamic("2d", ["25", "2c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bindNodeCallback_1 = $__require('2c');
  Observable_1.Observable.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
  return module.exports;
});

$__System.registerDynamic("2e", ["2f", "30", "31", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isScheduler_1 = $__require('2f');
  var isArray_1 = $__require('30');
  var ArrayObservable_1 = $__require('31');
  var combineLatest_1 = $__require('32');
  function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
      scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
      project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  return module.exports;
});

$__System.registerDynamic("33", ["25", "2e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var combineLatest_1 = $__require('2e');
  Observable_1.Observable.combineLatest = combineLatest_1.combineLatest;
  return module.exports;
});

$__System.registerDynamic("34", ["35"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var concat_1 = $__require('35');
  exports.concat = concat_1.concatStatic;
  return module.exports;
});

$__System.registerDynamic("36", ["25", "34"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var concat_1 = $__require('34');
  Observable_1.Observable.concat = concat_1.concat;
  return module.exports;
});

$__System.registerDynamic("37", ["25", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  var DeferObservable = (function(_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
      _super.call(this);
      this.observableFactory = observableFactory;
    }
    DeferObservable.create = function(observableFactory) {
      return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function(subscriber) {
      return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
  }(Observable_1.Observable));
  exports.DeferObservable = DeferObservable;
  var DeferSubscriber = (function(_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
      _super.call(this, destination);
      this.factory = factory;
      this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function() {
      try {
        this._callFactory();
      } catch (err) {
        this._error(err);
      }
    };
    DeferSubscriber.prototype._callFactory = function() {
      var result = this.factory();
      if (result) {
        this.add(subscribeToResult_1.subscribeToResult(this, result));
      }
    };
    return DeferSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("3a", ["37"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DeferObservable_1 = $__require('37');
  exports.defer = DeferObservable_1.DeferObservable.create;
  return module.exports;
});

$__System.registerDynamic("3b", ["25", "3a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var defer_1 = $__require('3a');
  Observable_1.Observable.defer = defer_1.defer;
  return module.exports;
});

$__System.registerDynamic("3c", ["3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EmptyObservable_1 = $__require('3d');
  exports.empty = EmptyObservable_1.EmptyObservable.create;
  return module.exports;
});

$__System.registerDynamic("3e", ["25", "3c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var empty_1 = $__require('3c');
  Observable_1.Observable.empty = empty_1.empty;
  return module.exports;
});

$__System.registerDynamic("3f", ["25", "3d", "30", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var EmptyObservable_1 = $__require('3d');
  var isArray_1 = $__require('30');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  var ForkJoinObservable = (function(_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
      _super.call(this);
      this.sources = sources;
      this.resultSelector = resultSelector;
    }
    ForkJoinObservable.create = function() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i - 0] = arguments[_i];
      }
      if (sources === null || arguments.length === 0) {
        return new EmptyObservable_1.EmptyObservable();
      }
      var resultSelector = null;
      if (typeof sources[sources.length - 1] === 'function') {
        resultSelector = sources.pop();
      }
      if (sources.length === 1 && isArray_1.isArray(sources[0])) {
        sources = sources[0];
      }
      if (sources.length === 0) {
        return new EmptyObservable_1.EmptyObservable();
      }
      return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function(subscriber) {
      return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
  }(Observable_1.Observable));
  exports.ForkJoinObservable = ForkJoinObservable;
  var ForkJoinSubscriber = (function(_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
      _super.call(this, destination);
      this.sources = sources;
      this.resultSelector = resultSelector;
      this.completed = 0;
      this.haveValues = 0;
      var len = sources.length;
      this.total = len;
      this.values = new Array(len);
      for (var i = 0; i < len; i++) {
        var source = sources[i];
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
        if (innerSubscription) {
          innerSubscription.outerIndex = i;
          this.add(innerSubscription);
        }
      }
    }
    ForkJoinSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.values[outerIndex] = innerValue;
      if (!innerSub._hasValue) {
        innerSub._hasValue = true;
        this.haveValues++;
      }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function(innerSub) {
      var destination = this.destination;
      var _a = this,
          haveValues = _a.haveValues,
          resultSelector = _a.resultSelector,
          values = _a.values;
      var len = values.length;
      if (!innerSub._hasValue) {
        destination.complete();
        return;
      }
      this.completed++;
      if (this.completed !== len) {
        return;
      }
      if (haveValues === len) {
        var value = resultSelector ? resultSelector.apply(this, values) : values;
        destination.next(value);
      }
      destination.complete();
    };
    return ForkJoinSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("40", ["3f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ForkJoinObservable_1 = $__require('3f');
  exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
  return module.exports;
});

$__System.registerDynamic("41", ["25", "40"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var forkJoin_1 = $__require('40');
  Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
  return module.exports;
});

$__System.registerDynamic("42", ["43"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FromObservable_1 = $__require('43');
  exports.from = FromObservable_1.FromObservable.create;
  return module.exports;
});

$__System.registerDynamic("44", ["25", "42"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var from_1 = $__require('42');
  Observable_1.Observable.from = from_1.from;
  return module.exports;
});

$__System.registerDynamic("45", ["25", "26", "46", "27", "47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var tryCatch_1 = $__require('26');
  var isFunction_1 = $__require('46');
  var errorObject_1 = $__require('27');
  var Subscription_1 = $__require('47');
  function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
  }
  function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
  }
  function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
  }
  function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
  }
  function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
  }
  var FromEventObservable = (function(_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
      _super.call(this);
      this.sourceObj = sourceObj;
      this.eventName = eventName;
      this.selector = selector;
      this.options = options;
    }
    FromEventObservable.create = function(target, eventName, options, selector) {
      if (isFunction_1.isFunction(options)) {
        selector = options;
        options = undefined;
      }
      return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function(sourceObj, eventName, handler, subscriber, options) {
      var unsubscribe;
      if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
        for (var i = 0,
            len = sourceObj.length; i < len; i++) {
          FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
      } else if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function() {
          return source_1.removeEventListener(eventName, handler);
        };
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function() {
          return source_2.off(eventName, handler);
        };
      } else if (isNodeStyleEventEmmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function() {
          return source_3.removeListener(eventName, handler);
        };
      }
      subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function(subscriber) {
      var sourceObj = this.sourceObj;
      var eventName = this.eventName;
      var options = this.options;
      var selector = this.selector;
      var handler = selector ? function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
        if (result === errorObject_1.errorObject) {
          subscriber.error(errorObject_1.errorObject.e);
        } else {
          subscriber.next(result);
        }
      } : function(e) {
        return subscriber.next(e);
      };
      FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
  }(Observable_1.Observable));
  exports.FromEventObservable = FromEventObservable;
  return module.exports;
});

$__System.registerDynamic("48", ["45"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FromEventObservable_1 = $__require('45');
  exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
  return module.exports;
});

$__System.registerDynamic("49", ["25", "48"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var fromEvent_1 = $__require('48');
  Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
  return module.exports;
});

$__System.registerDynamic("4a", ["25", "47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var Subscription_1 = $__require('47');
  var FromEventPatternObservable = (function(_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
      _super.call(this);
      this.addHandler = addHandler;
      this.removeHandler = removeHandler;
      this.selector = selector;
    }
    FromEventPatternObservable.create = function(addHandler, removeHandler, selector) {
      return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function(subscriber) {
      var _this = this;
      var removeHandler = this.removeHandler;
      var handler = !!this.selector ? function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        _this._callSelector(subscriber, args);
      } : function(e) {
        subscriber.next(e);
      };
      this._callAddHandler(handler, subscriber);
      subscriber.add(new Subscription_1.Subscription(function() {
        removeHandler(handler);
      }));
    };
    FromEventPatternObservable.prototype._callSelector = function(subscriber, args) {
      try {
        var result = this.selector.apply(this, args);
        subscriber.next(result);
      } catch (e) {
        subscriber.error(e);
      }
    };
    FromEventPatternObservable.prototype._callAddHandler = function(handler, errorSubscriber) {
      try {
        this.addHandler(handler);
      } catch (e) {
        errorSubscriber.error(e);
      }
    };
    return FromEventPatternObservable;
  }(Observable_1.Observable));
  exports.FromEventPatternObservable = FromEventPatternObservable;
  return module.exports;
});

$__System.registerDynamic("4b", ["4a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FromEventPatternObservable_1 = $__require('4a');
  exports.fromEventPattern = FromEventPatternObservable_1.FromEventPatternObservable.create;
  return module.exports;
});

$__System.registerDynamic("4c", ["25", "4b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var fromEventPattern_1 = $__require('4b');
  Observable_1.Observable.fromEventPattern = fromEventPattern_1.fromEventPattern;
  return module.exports;
});

$__System.registerDynamic("4d", ["4e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PromiseObservable_1 = $__require('4e');
  exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
  return module.exports;
});

$__System.registerDynamic("4f", ["25", "4d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var fromPromise_1 = $__require('4d');
  Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
  return module.exports;
});

$__System.registerDynamic("50", ["25", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var isScheduler_1 = $__require('2f');
  var selfSelector = function(value) {
    return value;
  };
  var GenerateObservable = (function(_super) {
    __extends(GenerateObservable, _super);
    function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
      _super.call(this);
      this.initialState = initialState;
      this.condition = condition;
      this.iterate = iterate;
      this.resultSelector = resultSelector;
      this.scheduler = scheduler;
    }
    GenerateObservable.create = function(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
      if (arguments.length == 1) {
        return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
      }
      if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
        return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
      }
      return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
    };
    GenerateObservable.prototype._subscribe = function(subscriber) {
      var state = this.initialState;
      if (this.scheduler) {
        return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
          subscriber: subscriber,
          iterate: this.iterate,
          condition: this.condition,
          resultSelector: this.resultSelector,
          state: state
        });
      }
      var _a = this,
          condition = _a.condition,
          resultSelector = _a.resultSelector,
          iterate = _a.iterate;
      do {
        if (condition) {
          var conditionResult = void 0;
          try {
            conditionResult = condition(state);
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (!conditionResult) {
            subscriber.complete();
            break;
          }
        }
        var value = void 0;
        try {
          value = resultSelector(state);
        } catch (err) {
          subscriber.error(err);
          return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
          break;
        }
        try {
          state = iterate(state);
        } catch (err) {
          subscriber.error(err);
          return;
        }
      } while (true);
    };
    GenerateObservable.dispatch = function(state) {
      var subscriber = state.subscriber,
          condition = state.condition;
      if (subscriber.closed) {
        return;
      }
      if (state.needIterate) {
        try {
          state.state = state.iterate(state.state);
        } catch (err) {
          subscriber.error(err);
          return;
        }
      } else {
        state.needIterate = true;
      }
      if (condition) {
        var conditionResult = void 0;
        try {
          conditionResult = condition(state.state);
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (!conditionResult) {
          subscriber.complete();
          return;
        }
        if (subscriber.closed) {
          return;
        }
      }
      var value;
      try {
        value = state.resultSelector(state.state);
      } catch (err) {
        subscriber.error(err);
        return;
      }
      if (subscriber.closed) {
        return;
      }
      subscriber.next(value);
      if (subscriber.closed) {
        return;
      }
      return this.schedule(state);
    };
    return GenerateObservable;
  }(Observable_1.Observable));
  exports.GenerateObservable = GenerateObservable;
  return module.exports;
});

$__System.registerDynamic("51", ["25", "50"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var GenerateObservable_1 = $__require('50');
  Observable_1.Observable.generate = GenerateObservable_1.GenerateObservable.create;
  return module.exports;
});

$__System.registerDynamic("52", ["25", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  var IfObservable = (function(_super) {
    __extends(IfObservable, _super);
    function IfObservable(condition, thenSource, elseSource) {
      _super.call(this);
      this.condition = condition;
      this.thenSource = thenSource;
      this.elseSource = elseSource;
    }
    IfObservable.create = function(condition, thenSource, elseSource) {
      return new IfObservable(condition, thenSource, elseSource);
    };
    IfObservable.prototype._subscribe = function(subscriber) {
      var _a = this,
          condition = _a.condition,
          thenSource = _a.thenSource,
          elseSource = _a.elseSource;
      return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    };
    return IfObservable;
  }(Observable_1.Observable));
  exports.IfObservable = IfObservable;
  var IfSubscriber = (function(_super) {
    __extends(IfSubscriber, _super);
    function IfSubscriber(destination, condition, thenSource, elseSource) {
      _super.call(this, destination);
      this.condition = condition;
      this.thenSource = thenSource;
      this.elseSource = elseSource;
      this.tryIf();
    }
    IfSubscriber.prototype.tryIf = function() {
      var _a = this,
          condition = _a.condition,
          thenSource = _a.thenSource,
          elseSource = _a.elseSource;
      var result;
      try {
        result = condition();
        var source = result ? thenSource : elseSource;
        if (source) {
          this.add(subscribeToResult_1.subscribeToResult(this, source));
        } else {
          this._complete();
        }
      } catch (err) {
        this._error(err);
      }
    };
    return IfSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("53", ["52"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var IfObservable_1 = $__require('52');
  exports._if = IfObservable_1.IfObservable.create;
  return module.exports;
});

$__System.registerDynamic("54", ["25", "53"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var if_1 = $__require('53');
  Observable_1.Observable.if = if_1._if;
  return module.exports;
});

$__System.registerDynamic("55", ["56", "25", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isNumeric_1 = $__require('56');
  var Observable_1 = $__require('25');
  var async_1 = $__require('57');
  var IntervalObservable = (function(_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      _super.call(this);
      this.period = period;
      this.scheduler = scheduler;
      if (!isNumeric_1.isNumeric(period) || period < 0) {
        this.period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== 'function') {
        this.scheduler = async_1.async;
      }
    }
    IntervalObservable.create = function(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function(state) {
      var index = state.index,
          subscriber = state.subscriber,
          period = state.period;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      }
      state.index += 1;
      this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var period = this.period;
      var scheduler = this.scheduler;
      subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
        index: index,
        subscriber: subscriber,
        period: period
      }));
    };
    return IntervalObservable;
  }(Observable_1.Observable));
  exports.IntervalObservable = IntervalObservable;
  return module.exports;
});

$__System.registerDynamic("58", ["55"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var IntervalObservable_1 = $__require('55');
  exports.interval = IntervalObservable_1.IntervalObservable.create;
  return module.exports;
});

$__System.registerDynamic("59", ["25", "58"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var interval_1 = $__require('58');
  Observable_1.Observable.interval = interval_1.interval;
  return module.exports;
});

$__System.registerDynamic("5a", ["5b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var merge_1 = $__require('5b');
  exports.merge = merge_1.mergeStatic;
  return module.exports;
});

$__System.registerDynamic("5c", ["25", "5a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var merge_1 = $__require('5a');
  Observable_1.Observable.merge = merge_1.merge;
  return module.exports;
});

$__System.registerDynamic("5d", ["25", "5e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var race_1 = $__require('5e');
  Observable_1.Observable.race = race_1.raceStatic;
  return module.exports;
});

$__System.registerDynamic("5f", ["25", "60"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var noop_1 = $__require('60');
  var NeverObservable = (function(_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
      _super.call(this);
    }
    NeverObservable.create = function() {
      return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function(subscriber) {
      noop_1.noop();
    };
    return NeverObservable;
  }(Observable_1.Observable));
  exports.NeverObservable = NeverObservable;
  return module.exports;
});

$__System.registerDynamic("61", ["5f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var NeverObservable_1 = $__require('5f');
  exports.never = NeverObservable_1.NeverObservable.create;
  return module.exports;
});

$__System.registerDynamic("62", ["25", "61"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var never_1 = $__require('61');
  Observable_1.Observable.never = never_1.never;
  return module.exports;
});

$__System.registerDynamic("63", ["31"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ArrayObservable_1 = $__require('31');
  exports.of = ArrayObservable_1.ArrayObservable.of;
  return module.exports;
});

$__System.registerDynamic("64", ["25", "63"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var of_1 = $__require('63');
  Observable_1.Observable.of = of_1.of;
  return module.exports;
});

$__System.registerDynamic("65", ["25", "66"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var onErrorResumeNext_1 = $__require('66');
  Observable_1.Observable.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNextStatic;
  return module.exports;
});

$__System.registerDynamic("67", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  function dispatch(state) {
    var obj = state.obj,
        keys = state.keys,
        length = state.length,
        index = state.index,
        subscriber = state.subscriber;
    if (index === length) {
      subscriber.complete();
      return;
    }
    var key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
  }
  var PairsObservable = (function(_super) {
    __extends(PairsObservable, _super);
    function PairsObservable(obj, scheduler) {
      _super.call(this);
      this.obj = obj;
      this.scheduler = scheduler;
      this.keys = Object.keys(obj);
    }
    PairsObservable.create = function(obj, scheduler) {
      return new PairsObservable(obj, scheduler);
    };
    PairsObservable.prototype._subscribe = function(subscriber) {
      var _a = this,
          keys = _a.keys,
          scheduler = _a.scheduler;
      var length = keys.length;
      if (scheduler) {
        return scheduler.schedule(dispatch, 0, {
          obj: this.obj,
          keys: keys,
          length: length,
          index: 0,
          subscriber: subscriber
        });
      } else {
        for (var idx = 0; idx < length; idx++) {
          var key = keys[idx];
          subscriber.next([key, this.obj[key]]);
        }
        subscriber.complete();
      }
    };
    return PairsObservable;
  }(Observable_1.Observable));
  exports.PairsObservable = PairsObservable;
  return module.exports;
});

$__System.registerDynamic("68", ["67"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PairsObservable_1 = $__require('67');
  exports.pairs = PairsObservable_1.PairsObservable.create;
  return module.exports;
});

$__System.registerDynamic("69", ["25", "68"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var pairs_1 = $__require('68');
  Observable_1.Observable.pairs = pairs_1.pairs;
  return module.exports;
});

$__System.registerDynamic("6a", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var RangeObservable = (function(_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, count, scheduler) {
      _super.call(this);
      this.start = start;
      this._count = count;
      this.scheduler = scheduler;
    }
    RangeObservable.create = function(start, count, scheduler) {
      if (start === void 0) {
        start = 0;
      }
      if (count === void 0) {
        count = 0;
      }
      return new RangeObservable(start, count, scheduler);
    };
    RangeObservable.dispatch = function(state) {
      var start = state.start,
          index = state.index,
          count = state.count,
          subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(start);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      state.start = start + 1;
      this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var start = this.start;
      var count = this._count;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(RangeObservable.dispatch, 0, {
          index: index,
          count: count,
          start: start,
          subscriber: subscriber
        });
      } else {
        do {
          if (index++ >= count) {
            subscriber.complete();
            break;
          }
          subscriber.next(start++);
          if (subscriber.closed) {
            break;
          }
        } while (true);
      }
    };
    return RangeObservable;
  }(Observable_1.Observable));
  exports.RangeObservable = RangeObservable;
  return module.exports;
});

$__System.registerDynamic("6b", ["6a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var RangeObservable_1 = $__require('6a');
  exports.range = RangeObservable_1.RangeObservable.create;
  return module.exports;
});

$__System.registerDynamic("6c", ["25", "6b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var range_1 = $__require('6b');
  Observable_1.Observable.range = range_1.range;
  return module.exports;
});

$__System.registerDynamic("6d", ["25", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  var UsingObservable = (function(_super) {
    __extends(UsingObservable, _super);
    function UsingObservable(resourceFactory, observableFactory) {
      _super.call(this);
      this.resourceFactory = resourceFactory;
      this.observableFactory = observableFactory;
    }
    UsingObservable.create = function(resourceFactory, observableFactory) {
      return new UsingObservable(resourceFactory, observableFactory);
    };
    UsingObservable.prototype._subscribe = function(subscriber) {
      var _a = this,
          resourceFactory = _a.resourceFactory,
          observableFactory = _a.observableFactory;
      var resource;
      try {
        resource = resourceFactory();
        return new UsingSubscriber(subscriber, resource, observableFactory);
      } catch (err) {
        subscriber.error(err);
      }
    };
    return UsingObservable;
  }(Observable_1.Observable));
  exports.UsingObservable = UsingObservable;
  var UsingSubscriber = (function(_super) {
    __extends(UsingSubscriber, _super);
    function UsingSubscriber(destination, resource, observableFactory) {
      _super.call(this, destination);
      this.resource = resource;
      this.observableFactory = observableFactory;
      destination.add(resource);
      this.tryUse();
    }
    UsingSubscriber.prototype.tryUse = function() {
      try {
        var source = this.observableFactory.call(this, this.resource);
        if (source) {
          this.add(subscribeToResult_1.subscribeToResult(this, source));
        }
      } catch (err) {
        this._error(err);
      }
    };
    return UsingSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("6e", ["6d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var UsingObservable_1 = $__require('6d');
  exports.using = UsingObservable_1.UsingObservable.create;
  return module.exports;
});

$__System.registerDynamic("6f", ["25", "6e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var using_1 = $__require('6e');
  Observable_1.Observable.using = using_1.using;
  return module.exports;
});

$__System.registerDynamic("70", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var ErrorObservable = (function(_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
      _super.call(this);
      this.error = error;
      this.scheduler = scheduler;
    }
    ErrorObservable.create = function(error, scheduler) {
      return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function(arg) {
      var error = arg.error,
          subscriber = arg.subscriber;
      subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function(subscriber) {
      var error = this.error;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ErrorObservable.dispatch, 0, {
          error: error,
          subscriber: subscriber
        });
      } else {
        subscriber.error(error);
      }
    };
    return ErrorObservable;
  }(Observable_1.Observable));
  exports.ErrorObservable = ErrorObservable;
  return module.exports;
});

$__System.registerDynamic("71", ["70"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ErrorObservable_1 = $__require('70');
  exports._throw = ErrorObservable_1.ErrorObservable.create;
  return module.exports;
});

$__System.registerDynamic("72", ["25", "71"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var throw_1 = $__require('71');
  Observable_1.Observable.throw = throw_1._throw;
  return module.exports;
});

$__System.registerDynamic("73", ["56", "25", "57", "2f", "74"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isNumeric_1 = $__require('56');
  var Observable_1 = $__require('25');
  var async_1 = $__require('57');
  var isScheduler_1 = $__require('2f');
  var isDate_1 = $__require('74');
  var TimerObservable = (function(_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      _super.call(this);
      this.period = -1;
      this.dueTime = 0;
      if (isNumeric_1.isNumeric(period)) {
        this.period = Number(period) < 1 && 1 || Number(period);
      } else if (isScheduler_1.isScheduler(period)) {
        scheduler = period;
      }
      if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
      }
      this.scheduler = scheduler;
      this.dueTime = isDate_1.isDate(dueTime) ? (+dueTime - this.scheduler.now()) : dueTime;
    }
    TimerObservable.create = function(initialDelay, period, scheduler) {
      if (initialDelay === void 0) {
        initialDelay = 0;
      }
      return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function(state) {
      var index = state.index,
          period = state.period,
          subscriber = state.subscriber;
      var action = this;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      } else if (period === -1) {
        return subscriber.complete();
      }
      state.index = index + 1;
      action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          period = _a.period,
          dueTime = _a.dueTime,
          scheduler = _a.scheduler;
      return scheduler.schedule(TimerObservable.dispatch, dueTime, {
        index: index,
        period: period,
        subscriber: subscriber
      });
    };
    return TimerObservable;
  }(Observable_1.Observable));
  exports.TimerObservable = TimerObservable;
  return module.exports;
});

$__System.registerDynamic("75", ["73"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TimerObservable_1 = $__require('73');
  exports.timer = TimerObservable_1.TimerObservable.create;
  return module.exports;
});

$__System.registerDynamic("76", ["25", "75"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var timer_1 = $__require('75');
  Observable_1.Observable.timer = timer_1.timer;
  return module.exports;
});

$__System.registerDynamic("77", ["78"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var zip_1 = $__require('78');
  exports.zip = zip_1.zipStatic;
  return module.exports;
});

$__System.registerDynamic("79", ["25", "77"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var zip_1 = $__require('77');
  Observable_1.Observable.zip = zip_1.zip;
  return module.exports;
});

$__System.registerDynamic("7a", ["7b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AjaxObservable_1 = $__require('7b');
  exports.ajax = AjaxObservable_1.AjaxObservable.create;
  return module.exports;
});

$__System.registerDynamic("7c", ["25", "7a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var ajax_1 = $__require('7a');
  Observable_1.Observable.ajax = ajax_1.ajax;
  return module.exports;
});

$__System.registerDynamic("7d", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var Object = root_1.root.Object;
  if (typeof Object.assign != 'function') {
    (function() {
      Object.assign = function assignPolyfill(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          sources[_i - 1] = arguments[_i];
        }
        if (target === undefined || target === null) {
          throw new TypeError('cannot convert undefined or null to object');
        }
        var output = Object(target);
        var len = sources.length;
        for (var index = 0; index < len; index++) {
          var source = sources[index];
          if (source !== undefined && source !== null) {
            for (var key in source) {
              if (source.hasOwnProperty(key)) {
                output[key] = source[key];
              }
            }
          }
        }
        return output;
      };
    })();
  }
  exports.assign = Object.assign;
  return module.exports;
});

$__System.registerDynamic("7f", ["80", "81", "25", "47", "7e", "82", "26", "27", "7d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var Subscriber_1 = $__require('81');
  var Observable_1 = $__require('25');
  var Subscription_1 = $__require('47');
  var root_1 = $__require('7e');
  var ReplaySubject_1 = $__require('82');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var assign_1 = $__require('7d');
  var WebSocketSubject = (function(_super) {
    __extends(WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
      if (urlConfigOrSource instanceof Observable_1.Observable) {
        _super.call(this, destination, urlConfigOrSource);
      } else {
        _super.call(this);
        this.WebSocketCtor = root_1.root.WebSocket;
        this._output = new Subject_1.Subject();
        if (typeof urlConfigOrSource === 'string') {
          this.url = urlConfigOrSource;
        } else {
          assign_1.assign(this, urlConfigOrSource);
        }
        if (!this.WebSocketCtor) {
          throw new Error('no WebSocket constructor can be found');
        }
        this.destination = new ReplaySubject_1.ReplaySubject();
      }
    }
    WebSocketSubject.prototype.resultSelector = function(e) {
      return JSON.parse(e.data);
    };
    WebSocketSubject.create = function(urlConfigOrSource) {
      return new WebSocketSubject(urlConfigOrSource);
    };
    WebSocketSubject.prototype.lift = function(operator) {
      var sock = new WebSocketSubject(this, this.destination);
      sock.operator = operator;
      return sock;
    };
    WebSocketSubject.prototype.multiplex = function(subMsg, unsubMsg, messageFilter) {
      var self = this;
      return new Observable_1.Observable(function(observer) {
        var result = tryCatch_1.tryCatch(subMsg)();
        if (result === errorObject_1.errorObject) {
          observer.error(errorObject_1.errorObject.e);
        } else {
          self.next(result);
        }
        var subscription = self.subscribe(function(x) {
          var result = tryCatch_1.tryCatch(messageFilter)(x);
          if (result === errorObject_1.errorObject) {
            observer.error(errorObject_1.errorObject.e);
          } else if (result) {
            observer.next(x);
          }
        }, function(err) {
          return observer.error(err);
        }, function() {
          return observer.complete();
        });
        return function() {
          var result = tryCatch_1.tryCatch(unsubMsg)();
          if (result === errorObject_1.errorObject) {
            observer.error(errorObject_1.errorObject.e);
          } else {
            self.next(result);
          }
          subscription.unsubscribe();
        };
      });
    };
    WebSocketSubject.prototype._connectSocket = function() {
      var _this = this;
      var WebSocketCtor = this.WebSocketCtor;
      var observer = this._output;
      var socket = null;
      try {
        socket = this.protocol ? new WebSocketCtor(this.url, this.protocol) : new WebSocketCtor(this.url);
        this.socket = socket;
      } catch (e) {
        observer.error(e);
        return;
      }
      var subscription = new Subscription_1.Subscription(function() {
        _this.socket = null;
        if (socket && socket.readyState === 1) {
          socket.close();
        }
      });
      socket.onopen = function(e) {
        var openObserver = _this.openObserver;
        if (openObserver) {
          openObserver.next(e);
        }
        var queue = _this.destination;
        _this.destination = Subscriber_1.Subscriber.create(function(x) {
          return socket.readyState === 1 && socket.send(x);
        }, function(e) {
          var closingObserver = _this.closingObserver;
          if (closingObserver) {
            closingObserver.next(undefined);
          }
          if (e && e.code) {
            socket.close(e.code, e.reason);
          } else {
            observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' + 'and an optional reason: { code: number, reason: string }'));
          }
          _this.destination = new ReplaySubject_1.ReplaySubject();
          _this.socket = null;
        }, function() {
          var closingObserver = _this.closingObserver;
          if (closingObserver) {
            closingObserver.next(undefined);
          }
          socket.close();
          _this.destination = new ReplaySubject_1.ReplaySubject();
          _this.socket = null;
        });
        if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
          subscription.add(queue.subscribe(_this.destination));
        }
      };
      socket.onerror = function(e) {
        return observer.error(e);
      };
      socket.onclose = function(e) {
        var closeObserver = _this.closeObserver;
        if (closeObserver) {
          closeObserver.next(e);
        }
        if (e.wasClean) {
          observer.complete();
        } else {
          observer.error(e);
        }
      };
      socket.onmessage = function(e) {
        var result = tryCatch_1.tryCatch(_this.resultSelector)(e);
        if (result === errorObject_1.errorObject) {
          observer.error(errorObject_1.errorObject.e);
        } else {
          observer.next(result);
        }
      };
    };
    WebSocketSubject.prototype._subscribe = function(subscriber) {
      var _this = this;
      var source = this.source;
      if (source) {
        return source.subscribe(subscriber);
      }
      if (!this.socket) {
        this._connectSocket();
      }
      var subscription = new Subscription_1.Subscription();
      subscription.add(this._output.subscribe(subscriber));
      subscription.add(function() {
        var socket = _this.socket;
        if (_this._output.observers.length === 0 && socket && socket.readyState === 1) {
          socket.close();
          _this.socket = null;
        }
      });
      return subscription;
    };
    WebSocketSubject.prototype.unsubscribe = function() {
      var _a = this,
          source = _a.source,
          socket = _a.socket;
      if (socket && socket.readyState === 1) {
        socket.close();
        this.socket = null;
      }
      _super.prototype.unsubscribe.call(this);
      if (!source) {
        this.destination = new ReplaySubject_1.ReplaySubject();
      }
    };
    return WebSocketSubject;
  }(Subject_1.AnonymousSubject));
  exports.WebSocketSubject = WebSocketSubject;
  return module.exports;
});

$__System.registerDynamic("83", ["7f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var WebSocketSubject_1 = $__require('7f');
  exports.webSocket = WebSocketSubject_1.WebSocketSubject.create;
  return module.exports;
});

$__System.registerDynamic("84", ["25", "83"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var webSocket_1 = $__require('83');
  Observable_1.Observable.webSocket = webSocket_1.webSocket;
  return module.exports;
});

$__System.registerDynamic("85", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
  }
  exports.buffer = buffer;
  var BufferOperator = (function() {
    function BufferOperator(closingNotifier) {
      this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
  }());
  var BufferSubscriber = (function(_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
      _super.call(this, destination);
      this.buffer = [];
      this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
    }
    BufferSubscriber.prototype._next = function(value) {
      this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var buffer = this.buffer;
      this.buffer = [];
      this.destination.next(buffer);
    };
    return BufferSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("86", ["25", "85"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var buffer_1 = $__require('85');
  Observable_1.Observable.prototype.buffer = buffer_1.buffer;
  return module.exports;
});

$__System.registerDynamic("87", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
  }
  exports.bufferCount = bufferCount;
  var BufferCountOperator = (function() {
    function BufferCountOperator(bufferSize, startBufferEvery) {
      this.bufferSize = bufferSize;
      this.startBufferEvery = startBufferEvery;
    }
    BufferCountOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
  }());
  var BufferCountSubscriber = (function(_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
      _super.call(this, destination);
      this.bufferSize = bufferSize;
      this.startBufferEvery = startBufferEvery;
      this.buffers = [[]];
      this.count = 0;
    }
    BufferCountSubscriber.prototype._next = function(value) {
      var count = (this.count += 1);
      var destination = this.destination;
      var bufferSize = this.bufferSize;
      var startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
      var buffers = this.buffers;
      var len = buffers.length;
      var remove = -1;
      if (count % startBufferEvery === 0) {
        buffers.push([]);
      }
      for (var i = 0; i < len; i++) {
        var buffer = buffers[i];
        buffer.push(value);
        if (buffer.length === bufferSize) {
          remove = i;
          destination.next(buffer);
        }
      }
      if (remove !== -1) {
        buffers.splice(remove, 1);
      }
    };
    BufferCountSubscriber.prototype._complete = function() {
      var destination = this.destination;
      var buffers = this.buffers;
      while (buffers.length > 0) {
        var buffer = buffers.shift();
        if (buffer.length > 0) {
          destination.next(buffer);
        }
      }
      _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("88", ["25", "87"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bufferCount_1 = $__require('87');
  Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
  return module.exports;
});

$__System.registerDynamic("89", ["57", "81", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('57');
  var Subscriber_1 = $__require('81');
  var isScheduler_1 = $__require('2f');
  function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = async_1.async;
    if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
      scheduler = arguments[arguments.length - 1];
      length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
      bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
      maxBufferSize = arguments[2];
    }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
  }
  exports.bufferTime = bufferTime;
  var BufferTimeOperator = (function() {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
      this.bufferTimeSpan = bufferTimeSpan;
      this.bufferCreationInterval = bufferCreationInterval;
      this.maxBufferSize = maxBufferSize;
      this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
    };
    return BufferTimeOperator;
  }());
  var Context = (function() {
    function Context() {
      this.buffer = [];
    }
    return Context;
  }());
  var BufferTimeSubscriber = (function(_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
      _super.call(this, destination);
      this.bufferTimeSpan = bufferTimeSpan;
      this.bufferCreationInterval = bufferCreationInterval;
      this.maxBufferSize = maxBufferSize;
      this.scheduler = scheduler;
      this.contexts = [];
      var context = this.openContext();
      this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
      if (this.timespanOnly) {
        var timeSpanOnlyState = {
          subscriber: this,
          context: context,
          bufferTimeSpan: bufferTimeSpan
        };
        this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
      } else {
        var closeState = {
          subscriber: this,
          context: context
        };
        var creationState = {
          bufferTimeSpan: bufferTimeSpan,
          bufferCreationInterval: bufferCreationInterval,
          subscriber: this,
          scheduler: scheduler
        };
        this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
        this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
      }
    }
    BufferTimeSubscriber.prototype._next = function(value) {
      var contexts = this.contexts;
      var len = contexts.length;
      var filledBufferContext;
      for (var i = 0; i < len; i++) {
        var context = contexts[i];
        var buffer = context.buffer;
        buffer.push(value);
        if (buffer.length == this.maxBufferSize) {
          filledBufferContext = context;
        }
      }
      if (filledBufferContext) {
        this.onBufferFull(filledBufferContext);
      }
    };
    BufferTimeSubscriber.prototype._error = function(err) {
      this.contexts.length = 0;
      _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function() {
      var _a = this,
          contexts = _a.contexts,
          destination = _a.destination;
      while (contexts.length > 0) {
        var context = contexts.shift();
        destination.next(context.buffer);
      }
      _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function() {
      this.contexts = null;
    };
    BufferTimeSubscriber.prototype.onBufferFull = function(context) {
      this.closeContext(context);
      var closeAction = context.closeAction;
      closeAction.unsubscribe();
      this.remove(closeAction);
      if (this.timespanOnly) {
        context = this.openContext();
        var bufferTimeSpan = this.bufferTimeSpan;
        var timeSpanOnlyState = {
          subscriber: this,
          context: context,
          bufferTimeSpan: bufferTimeSpan
        };
        this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
      }
    };
    BufferTimeSubscriber.prototype.openContext = function() {
      var context = new Context();
      this.contexts.push(context);
      return context;
    };
    BufferTimeSubscriber.prototype.closeContext = function(context) {
      this.destination.next(context.buffer);
      var contexts = this.contexts;
      var spliceIndex = contexts ? contexts.indexOf(context) : -1;
      if (spliceIndex >= 0) {
        contexts.splice(contexts.indexOf(context), 1);
      }
    };
    return BufferTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevContext = state.context;
    if (prevContext) {
      subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
      state.context = subscriber.openContext();
      state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
  }
  function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval,
        bufferTimeSpan = state.bufferTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler;
    var context = subscriber.openContext();
    var action = this;
    if (!subscriber.closed) {
      subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
        subscriber: subscriber,
        context: context
      }));
      action.schedule(state, bufferCreationInterval);
    }
  }
  function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber,
        context = arg.context;
    subscriber.closeContext(context);
  }
  return module.exports;
});

$__System.registerDynamic("8a", ["25", "89"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bufferTime_1 = $__require('89');
  Observable_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
  return module.exports;
});

$__System.registerDynamic("8b", ["47", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('47');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
  }
  exports.bufferToggle = bufferToggle;
  var BufferToggleOperator = (function() {
    function BufferToggleOperator(openings, closingSelector) {
      this.openings = openings;
      this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
  }());
  var BufferToggleSubscriber = (function(_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
      _super.call(this, destination);
      this.openings = openings;
      this.closingSelector = closingSelector;
      this.contexts = [];
      this.add(subscribeToResult_1.subscribeToResult(this, openings));
    }
    BufferToggleSubscriber.prototype._next = function(value) {
      var contexts = this.contexts;
      var len = contexts.length;
      for (var i = 0; i < len; i++) {
        contexts[i].buffer.push(value);
      }
    };
    BufferToggleSubscriber.prototype._error = function(err) {
      var contexts = this.contexts;
      while (contexts.length > 0) {
        var context = contexts.shift();
        context.subscription.unsubscribe();
        context.buffer = null;
        context.subscription = null;
      }
      this.contexts = null;
      _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function() {
      var contexts = this.contexts;
      while (contexts.length > 0) {
        var context = contexts.shift();
        this.destination.next(context.buffer);
        context.subscription.unsubscribe();
        context.buffer = null;
        context.subscription = null;
      }
      this.contexts = null;
      _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function(innerSub) {
      this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function(value) {
      try {
        var closingSelector = this.closingSelector;
        var closingNotifier = closingSelector.call(this, value);
        if (closingNotifier) {
          this.trySubscribe(closingNotifier);
        }
      } catch (err) {
        this._error(err);
      }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function(context) {
      var contexts = this.contexts;
      if (contexts && context) {
        var buffer = context.buffer,
            subscription = context.subscription;
        this.destination.next(buffer);
        contexts.splice(contexts.indexOf(context), 1);
        this.remove(subscription);
        subscription.unsubscribe();
      }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function(closingNotifier) {
      var contexts = this.contexts;
      var buffer = [];
      var subscription = new Subscription_1.Subscription();
      var context = {
        buffer: buffer,
        subscription: subscription
      };
      contexts.push(context);
      var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
      if (!innerSubscription || innerSubscription.closed) {
        this.closeBuffer(context);
      } else {
        innerSubscription.context = context;
        this.add(innerSubscription);
        subscription.add(innerSubscription);
      }
    };
    return BufferToggleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("8c", ["25", "8b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bufferToggle_1 = $__require('8b');
  Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
  return module.exports;
});

$__System.registerDynamic("8d", ["47", "26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('47');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
  }
  exports.bufferWhen = bufferWhen;
  var BufferWhenOperator = (function() {
    function BufferWhenOperator(closingSelector) {
      this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
  }());
  var BufferWhenSubscriber = (function(_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
      _super.call(this, destination);
      this.closingSelector = closingSelector;
      this.subscribing = false;
      this.openBuffer();
    }
    BufferWhenSubscriber.prototype._next = function(value) {
      this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function() {
      var buffer = this.buffer;
      if (buffer) {
        this.destination.next(buffer);
      }
      _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function() {
      this.buffer = null;
      this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function() {
      if (this.subscribing) {
        this.complete();
      } else {
        this.openBuffer();
      }
    };
    BufferWhenSubscriber.prototype.openBuffer = function() {
      var closingSubscription = this.closingSubscription;
      if (closingSubscription) {
        this.remove(closingSubscription);
        closingSubscription.unsubscribe();
      }
      var buffer = this.buffer;
      if (this.buffer) {
        this.destination.next(buffer);
      }
      this.buffer = [];
      var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
      if (closingNotifier === errorObject_1.errorObject) {
        this.error(errorObject_1.errorObject.e);
      } else {
        closingSubscription = new Subscription_1.Subscription();
        this.closingSubscription = closingSubscription;
        this.add(closingSubscription);
        this.subscribing = true;
        closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
        this.subscribing = false;
      }
    };
    return BufferWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("8e", ["25", "8d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var bufferWhen_1 = $__require('8d');
  Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
  return module.exports;
});

$__System.registerDynamic("8f", ["25", "82"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var ReplaySubject_1 = $__require('82');
  function cache(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }
    var subject;
    var source = this;
    var refs = 0;
    var outerSub;
    var getSubject = function() {
      subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
      return subject;
    };
    return new Observable_1.Observable(function(observer) {
      if (!subject) {
        subject = getSubject();
        outerSub = source.subscribe(function(value) {
          return subject.next(value);
        }, function(err) {
          var s = subject;
          subject = null;
          s.error(err);
        }, function() {
          return subject.complete();
        });
      }
      refs++;
      if (!subject) {
        subject = getSubject();
      }
      var innerSub = subject.subscribe(observer);
      return function() {
        refs--;
        if (innerSub) {
          innerSub.unsubscribe();
        }
        if (refs === 0) {
          outerSub.unsubscribe();
        }
      };
    });
  }
  exports.cache = cache;
  return module.exports;
});

$__System.registerDynamic("90", ["25", "8f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var cache_1 = $__require('8f');
  Observable_1.Observable.prototype.cache = cache_1.cache;
  return module.exports;
});

$__System.registerDynamic("91", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function _catch(selector) {
    var operator = new CatchOperator(selector);
    var caught = this.lift(operator);
    return (operator.caught = caught);
  }
  exports._catch = _catch;
  var CatchOperator = (function() {
    function CatchOperator(selector) {
      this.selector = selector;
    }
    CatchOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
  }());
  var CatchSubscriber = (function(_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
      _super.call(this, destination);
      this.selector = selector;
      this.caught = caught;
    }
    CatchSubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var result = void 0;
        try {
          result = this.selector(err, this.caught);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.unsubscribe();
        this.destination.remove(this);
        subscribeToResult_1.subscribeToResult(this, result);
      }
    };
    return CatchSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("92", ["25", "91"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var catch_1 = $__require('91');
  Observable_1.Observable.prototype.catch = catch_1._catch;
  Observable_1.Observable.prototype._catch = catch_1._catch;
  return module.exports;
});

$__System.registerDynamic("93", ["32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var combineLatest_1 = $__require('32');
  function combineAll(project) {
    return this.lift(new combineLatest_1.CombineLatestOperator(project));
  }
  exports.combineAll = combineAll;
  return module.exports;
});

$__System.registerDynamic("94", ["25", "93"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var combineAll_1 = $__require('93');
  Observable_1.Observable.prototype.combineAll = combineAll_1.combineAll;
  return module.exports;
});

$__System.registerDynamic("32", ["31", "30", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArrayObservable_1 = $__require('31');
  var isArray_1 = $__require('30');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  var none = {};
  function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
      project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  var CombineLatestOperator = (function() {
    function CombineLatestOperator(project) {
      this.project = project;
    }
    CombineLatestOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
  }());
  exports.CombineLatestOperator = CombineLatestOperator;
  var CombineLatestSubscriber = (function(_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
      _super.call(this, destination);
      this.project = project;
      this.active = 0;
      this.values = [];
      this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function(observable) {
      this.values.push(none);
      this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function() {
      var observables = this.observables;
      var len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        this.active = len;
        this.toRespond = len;
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
      }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
      if ((this.active -= 1) === 0) {
        this.destination.complete();
      }
    };
    CombineLatestSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var values = this.values;
      var oldVal = values[outerIndex];
      var toRespond = !this.toRespond ? 0 : oldVal === none ? --this.toRespond : this.toRespond;
      values[outerIndex] = innerValue;
      if (toRespond === 0) {
        if (this.project) {
          this._tryProject(values);
        } else {
          this.destination.next(values.slice());
        }
      }
    };
    CombineLatestSubscriber.prototype._tryProject = function(values) {
      var result;
      try {
        result = this.project.apply(this, values);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return CombineLatestSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.CombineLatestSubscriber = CombineLatestSubscriber;
  return module.exports;
});

$__System.registerDynamic("95", ["25", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var combineLatest_1 = $__require('32');
  Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
  return module.exports;
});

$__System.registerDynamic("96", ["25", "35"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var concat_1 = $__require('35');
  Observable_1.Observable.prototype.concat = concat_1.concat;
  return module.exports;
});

$__System.registerDynamic("97", ["98"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var mergeAll_1 = $__require('98');
  function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
  }
  exports.concatAll = concatAll;
  return module.exports;
});

$__System.registerDynamic("99", ["25", "97"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var concatAll_1 = $__require('97');
  Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
  return module.exports;
});

$__System.registerDynamic("9a", ["9b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var mergeMap_1 = $__require('9b');
  function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
  }
  exports.concatMap = concatMap;
  return module.exports;
});

$__System.registerDynamic("9c", ["25", "9a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var concatMap_1 = $__require('9a');
  Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
  return module.exports;
});

$__System.registerDynamic("9d", ["9e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var mergeMapTo_1 = $__require('9e');
  function concatMapTo(innerObservable, resultSelector) {
    return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
  }
  exports.concatMapTo = concatMapTo;
  return module.exports;
});

$__System.registerDynamic("9f", ["25", "9d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var concatMapTo_1 = $__require('9d');
  Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
  return module.exports;
});

$__System.registerDynamic("a0", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
  }
  exports.count = count;
  var CountOperator = (function() {
    function CountOperator(predicate, source) {
      this.predicate = predicate;
      this.source = source;
    }
    CountOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
  }());
  var CountSubscriber = (function(_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.count = 0;
      this.index = 0;
    }
    CountSubscriber.prototype._next = function(value) {
      if (this.predicate) {
        this._tryPredicate(value);
      } else {
        this.count++;
      }
    };
    CountSubscriber.prototype._tryPredicate = function(value) {
      var result;
      try {
        result = this.predicate(value, this.index++, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.count++;
      }
    };
    CountSubscriber.prototype._complete = function() {
      this.destination.next(this.count);
      this.destination.complete();
    };
    return CountSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a1", ["25", "a0"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var count_1 = $__require('a0');
  Observable_1.Observable.prototype.count = count_1.count;
  return module.exports;
});

$__System.registerDynamic("a2", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function dematerialize() {
    return this.lift(new DeMaterializeOperator());
  }
  exports.dematerialize = dematerialize;
  var DeMaterializeOperator = (function() {
    function DeMaterializeOperator() {}
    DeMaterializeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
  }());
  var DeMaterializeSubscriber = (function(_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
      _super.call(this, destination);
    }
    DeMaterializeSubscriber.prototype._next = function(value) {
      value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a3", ["25", "a2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var dematerialize_1 = $__require('a2');
  Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
  return module.exports;
});

$__System.registerDynamic("a4", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
  }
  exports.debounce = debounce;
  var DebounceOperator = (function() {
    function DebounceOperator(durationSelector) {
      this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
  }());
  var DebounceSubscriber = (function(_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
      _super.call(this, destination);
      this.durationSelector = durationSelector;
      this.hasValue = false;
      this.durationSubscription = null;
    }
    DebounceSubscriber.prototype._next = function(value) {
      try {
        var result = this.durationSelector.call(this, value);
        if (result) {
          this._tryNext(value, result);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    DebounceSubscriber.prototype._complete = function() {
      this.emitValue();
      this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function(value, duration) {
      var subscription = this.durationSubscription;
      this.value = value;
      this.hasValue = true;
      if (subscription) {
        subscription.unsubscribe();
        this.remove(subscription);
      }
      subscription = subscribeToResult_1.subscribeToResult(this, duration);
      if (!subscription.closed) {
        this.add(this.durationSubscription = subscription);
      }
    };
    DebounceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function() {
      this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function() {
      if (this.hasValue) {
        var value = this.value;
        var subscription = this.durationSubscription;
        if (subscription) {
          this.durationSubscription = null;
          subscription.unsubscribe();
          this.remove(subscription);
        }
        this.value = null;
        this.hasValue = false;
        _super.prototype._next.call(this, value);
      }
    };
    return DebounceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("a5", ["25", "a4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var debounce_1 = $__require('a4');
  Observable_1.Observable.prototype.debounce = debounce_1.debounce;
  return module.exports;
});

$__System.registerDynamic("a6", ["81", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var async_1 = $__require('57');
  function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
  }
  exports.debounceTime = debounceTime;
  var DebounceTimeOperator = (function() {
    function DebounceTimeOperator(dueTime, scheduler) {
      this.dueTime = dueTime;
      this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
  }());
  var DebounceTimeSubscriber = (function(_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
      _super.call(this, destination);
      this.dueTime = dueTime;
      this.scheduler = scheduler;
      this.debouncedSubscription = null;
      this.lastValue = null;
      this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function(value) {
      this.clearDebounce();
      this.lastValue = value;
      this.hasValue = true;
      this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function() {
      this.debouncedNext();
      this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function() {
      this.clearDebounce();
      if (this.hasValue) {
        this.destination.next(this.lastValue);
        this.lastValue = null;
        this.hasValue = false;
      }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function() {
      var debouncedSubscription = this.debouncedSubscription;
      if (debouncedSubscription !== null) {
        this.remove(debouncedSubscription);
        debouncedSubscription.unsubscribe();
        this.debouncedSubscription = null;
      }
    };
    return DebounceTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(subscriber) {
    subscriber.debouncedNext();
  }
  return module.exports;
});

$__System.registerDynamic("a7", ["25", "a6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var debounceTime_1 = $__require('a6');
  Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
  return module.exports;
});

$__System.registerDynamic("a8", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
  }
  exports.defaultIfEmpty = defaultIfEmpty;
  var DefaultIfEmptyOperator = (function() {
    function DefaultIfEmptyOperator(defaultValue) {
      this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
  }());
  var DefaultIfEmptySubscriber = (function(_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
      _super.call(this, destination);
      this.defaultValue = defaultValue;
      this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function(value) {
      this.isEmpty = false;
      this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function() {
      if (this.isEmpty) {
        this.destination.next(this.defaultValue);
      }
      this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a9", ["25", "a8"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var defaultIfEmpty_1 = $__require('a8');
  Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
  return module.exports;
});

$__System.registerDynamic("aa", ["57", "74", "81", "ab"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('57');
  var isDate_1 = $__require('74');
  var Subscriber_1 = $__require('81');
  var Notification_1 = $__require('ab');
  function delay(delay, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
  }
  exports.delay = delay;
  var DelayOperator = (function() {
    function DelayOperator(delay, scheduler) {
      this.delay = delay;
      this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
  }());
  var DelaySubscriber = (function(_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
      _super.call(this, destination);
      this.delay = delay;
      this.scheduler = scheduler;
      this.queue = [];
      this.active = false;
      this.errored = false;
    }
    DelaySubscriber.dispatch = function(state) {
      var source = state.source;
      var queue = source.queue;
      var scheduler = state.scheduler;
      var destination = state.destination;
      while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
        queue.shift().notification.observe(destination);
      }
      if (queue.length > 0) {
        var delay_1 = Math.max(0, queue[0].time - scheduler.now());
        this.schedule(state, delay_1);
      } else {
        source.active = false;
      }
    };
    DelaySubscriber.prototype._schedule = function(scheduler) {
      this.active = true;
      this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
        source: this,
        destination: this.destination,
        scheduler: scheduler
      }));
    };
    DelaySubscriber.prototype.scheduleNotification = function(notification) {
      if (this.errored === true) {
        return;
      }
      var scheduler = this.scheduler;
      var message = new DelayMessage(scheduler.now() + this.delay, notification);
      this.queue.push(message);
      if (this.active === false) {
        this._schedule(scheduler);
      }
    };
    DelaySubscriber.prototype._next = function(value) {
      this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function(err) {
      this.errored = true;
      this.queue = [];
      this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function() {
      this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
  }(Subscriber_1.Subscriber));
  var DelayMessage = (function() {
    function DelayMessage(time, notification) {
      this.time = time;
      this.notification = notification;
    }
    return DelayMessage;
  }());
  return module.exports;
});

$__System.registerDynamic("ac", ["25", "aa"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var delay_1 = $__require('aa');
  Observable_1.Observable.prototype.delay = delay_1.delay;
  return module.exports;
});

$__System.registerDynamic("ad", ["81", "25", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Observable_1 = $__require('25');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
      return new SubscriptionDelayObservable(this, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
  }
  exports.delayWhen = delayWhen;
  var DelayWhenOperator = (function() {
    function DelayWhenOperator(delayDurationSelector) {
      this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
  }());
  var DelayWhenSubscriber = (function(_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
      _super.call(this, destination);
      this.delayDurationSelector = delayDurationSelector;
      this.completed = false;
      this.delayNotifierSubscriptions = [];
      this.values = [];
    }
    DelayWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(outerValue);
      this.removeSubscription(innerSub);
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function(error, innerSub) {
      this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function(innerSub) {
      var value = this.removeSubscription(innerSub);
      if (value) {
        this.destination.next(value);
      }
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function(value) {
      try {
        var delayNotifier = this.delayDurationSelector(value);
        if (delayNotifier) {
          this.tryDelay(delayNotifier, value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    DelayWhenSubscriber.prototype._complete = function() {
      this.completed = true;
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function(subscription) {
      subscription.unsubscribe();
      var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
      var value = null;
      if (subscriptionIdx !== -1) {
        value = this.values[subscriptionIdx];
        this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        this.values.splice(subscriptionIdx, 1);
      }
      return value;
    };
    DelayWhenSubscriber.prototype.tryDelay = function(delayNotifier, value) {
      var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
      this.add(notifierSubscription);
      this.delayNotifierSubscriptions.push(notifierSubscription);
      this.values.push(value);
    };
    DelayWhenSubscriber.prototype.tryComplete = function() {
      if (this.completed && this.delayNotifierSubscriptions.length === 0) {
        this.destination.complete();
      }
    };
    return DelayWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  var SubscriptionDelayObservable = (function(_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
      _super.call(this);
      this.source = source;
      this.subscriptionDelay = subscriptionDelay;
    }
    SubscriptionDelayObservable.prototype._subscribe = function(subscriber) {
      this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
  }(Observable_1.Observable));
  var SubscriptionDelaySubscriber = (function(_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
      _super.call(this);
      this.parent = parent;
      this.source = source;
      this.sourceSubscribed = false;
    }
    SubscriptionDelaySubscriber.prototype._next = function(unused) {
      this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function(err) {
      this.unsubscribe();
      this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function() {
      this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function() {
      if (!this.sourceSubscribed) {
        this.sourceSubscribed = true;
        this.unsubscribe();
        this.source.subscribe(this.parent);
      }
    };
    return SubscriptionDelaySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("ae", ["25", "ad"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var delayWhen_1 = $__require('ad');
  Observable_1.Observable.prototype.delayWhen = delayWhen_1.delayWhen;
  return module.exports;
});

$__System.registerDynamic("af", ["25", "b0"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var distinct_1 = $__require('b0');
  Observable_1.Observable.prototype.distinct = distinct_1.distinct;
  return module.exports;
});

$__System.registerDynamic("b0", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function distinct(compare, flushes) {
    return this.lift(new DistinctOperator(compare, flushes));
  }
  exports.distinct = distinct;
  var DistinctOperator = (function() {
    function DistinctOperator(compare, flushes) {
      this.compare = compare;
      this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DistinctSubscriber(subscriber, this.compare, this.flushes));
    };
    return DistinctOperator;
  }());
  var DistinctSubscriber = (function(_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, compare, flushes) {
      _super.call(this, destination);
      this.values = [];
      if (typeof compare === 'function') {
        this.compare = compare;
      }
      if (flushes) {
        this.add(subscribeToResult_1.subscribeToResult(this, flushes));
      }
    }
    DistinctSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.values.length = 0;
    };
    DistinctSubscriber.prototype.notifyError = function(error, innerSub) {
      this._error(error);
    };
    DistinctSubscriber.prototype._next = function(value) {
      var found = false;
      var values = this.values;
      var len = values.length;
      try {
        for (var i = 0; i < len; i++) {
          if (this.compare(values[i], value)) {
            found = true;
            return;
          }
        }
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.values.push(value);
      this.destination.next(value);
    };
    DistinctSubscriber.prototype.compare = function(x, y) {
      return x === y;
    };
    return DistinctSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.DistinctSubscriber = DistinctSubscriber;
  return module.exports;
});

$__System.registerDynamic("b1", ["b0"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var distinct_1 = $__require('b0');
  function distinctKey(key, compare, flushes) {
    return distinct_1.distinct.call(this, function(x, y) {
      if (compare) {
        return compare(x[key], y[key]);
      }
      return x[key] === y[key];
    }, flushes);
  }
  exports.distinctKey = distinctKey;
  return module.exports;
});

$__System.registerDynamic("b2", ["25", "b1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var distinctKey_1 = $__require('b1');
  Observable_1.Observable.prototype.distinctKey = distinctKey_1.distinctKey;
  return module.exports;
});

$__System.registerDynamic("b3", ["25", "b4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var distinctUntilChanged_1 = $__require('b4');
  Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
  return module.exports;
});

$__System.registerDynamic("b4", ["81", "26", "27"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
  }
  exports.distinctUntilChanged = distinctUntilChanged;
  var DistinctUntilChangedOperator = (function() {
    function DistinctUntilChangedOperator(compare, keySelector) {
      this.compare = compare;
      this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
  }());
  var DistinctUntilChangedSubscriber = (function(_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
      _super.call(this, destination);
      this.keySelector = keySelector;
      this.hasKey = false;
      if (typeof compare === 'function') {
        this.compare = compare;
      }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function(x, y) {
      return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function(value) {
      var keySelector = this.keySelector;
      var key = value;
      if (keySelector) {
        key = tryCatch_1.tryCatch(this.keySelector)(value);
        if (key === errorObject_1.errorObject) {
          return this.destination.error(errorObject_1.errorObject.e);
        }
      }
      var result = false;
      if (this.hasKey) {
        result = tryCatch_1.tryCatch(this.compare)(this.key, key);
        if (result === errorObject_1.errorObject) {
          return this.destination.error(errorObject_1.errorObject.e);
        }
      } else {
        this.hasKey = true;
      }
      if (Boolean(result) === false) {
        this.key = key;
        this.destination.next(value);
      }
    };
    return DistinctUntilChangedSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("b5", ["b4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var distinctUntilChanged_1 = $__require('b4');
  function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged.call(this, function(x, y) {
      if (compare) {
        return compare(x[key], y[key]);
      }
      return x[key] === y[key];
    });
  }
  exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
  return module.exports;
});

$__System.registerDynamic("b6", ["25", "b5"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var distinctUntilKeyChanged_1 = $__require('b5');
  Observable_1.Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
  return module.exports;
});

$__System.registerDynamic("b7", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
  }
  exports._do = _do;
  var DoOperator = (function() {
    function DoOperator(nextOrObserver, error, complete) {
      this.nextOrObserver = nextOrObserver;
      this.error = error;
      this.complete = complete;
    }
    DoOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
  }());
  var DoSubscriber = (function(_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
      _super.call(this, destination);
      var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
      safeSubscriber.syncErrorThrowable = true;
      this.add(safeSubscriber);
      this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function(value) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.next(value);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.next(value);
      }
    };
    DoSubscriber.prototype._error = function(err) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.error(err);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.error(err);
      }
    };
    DoSubscriber.prototype._complete = function() {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.complete();
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.complete();
      }
    };
    return DoSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("b8", ["25", "b7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var do_1 = $__require('b7');
  Observable_1.Observable.prototype.do = do_1._do;
  Observable_1.Observable.prototype._do = do_1._do;
  return module.exports;
});

$__System.registerDynamic("b9", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function exhaust() {
    return this.lift(new SwitchFirstOperator());
  }
  exports.exhaust = exhaust;
  var SwitchFirstOperator = (function() {
    function SwitchFirstOperator() {}
    SwitchFirstOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SwitchFirstSubscriber(subscriber));
    };
    return SwitchFirstOperator;
  }());
  var SwitchFirstSubscriber = (function(_super) {
    __extends(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
      _super.call(this, destination);
      this.hasCompleted = false;
      this.hasSubscription = false;
    }
    SwitchFirstSubscriber.prototype._next = function(value) {
      if (!this.hasSubscription) {
        this.hasSubscription = true;
        this.add(subscribeToResult_1.subscribeToResult(this, value));
      }
    };
    SwitchFirstSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (!this.hasSubscription) {
        this.destination.complete();
      }
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function(innerSub) {
      this.remove(innerSub);
      this.hasSubscription = false;
      if (this.hasCompleted) {
        this.destination.complete();
      }
    };
    return SwitchFirstSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("ba", ["25", "b9"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var exhaust_1 = $__require('b9');
  Observable_1.Observable.prototype.exhaust = exhaust_1.exhaust;
  return module.exports;
});

$__System.registerDynamic("bb", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
  }
  exports.exhaustMap = exhaustMap;
  var SwitchFirstMapOperator = (function() {
    function SwitchFirstMapOperator(project, resultSelector) {
      this.project = project;
      this.resultSelector = resultSelector;
    }
    SwitchFirstMapOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchFirstMapOperator;
  }());
  var SwitchFirstMapSubscriber = (function(_super) {
    __extends(SwitchFirstMapSubscriber, _super);
    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.hasSubscription = false;
      this.hasCompleted = false;
      this.index = 0;
    }
    SwitchFirstMapSubscriber.prototype._next = function(value) {
      if (!this.hasSubscription) {
        this.tryNext(value);
      }
    };
    SwitchFirstMapSubscriber.prototype.tryNext = function(value) {
      var index = this.index++;
      var destination = this.destination;
      try {
        var result = this.project(value, index);
        this.hasSubscription = true;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
      } catch (err) {
        destination.error(err);
      }
    };
    SwitchFirstMapSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (!this.hasSubscription) {
        this.destination.complete();
      }
    };
    SwitchFirstMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      if (resultSelector) {
        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        destination.next(innerValue);
      }
    };
    SwitchFirstMapSubscriber.prototype.trySelectResult = function(outerValue, innerValue, outerIndex, innerIndex) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      try {
        var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        destination.next(result);
      } catch (err) {
        destination.error(err);
      }
    };
    SwitchFirstMapSubscriber.prototype.notifyError = function(err) {
      this.destination.error(err);
    };
    SwitchFirstMapSubscriber.prototype.notifyComplete = function(innerSub) {
      this.remove(innerSub);
      this.hasSubscription = false;
      if (this.hasCompleted) {
        this.destination.complete();
      }
    };
    return SwitchFirstMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("bc", ["25", "bb"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var exhaustMap_1 = $__require('bb');
  Observable_1.Observable.prototype.exhaustMap = exhaustMap_1.exhaustMap;
  return module.exports;
});

$__System.registerDynamic("bd", ["26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (scheduler === void 0) {
      scheduler = undefined;
    }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
  }
  exports.expand = expand;
  var ExpandOperator = (function() {
    function ExpandOperator(project, concurrent, scheduler) {
      this.project = project;
      this.concurrent = concurrent;
      this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
  }());
  exports.ExpandOperator = ExpandOperator;
  var ExpandSubscriber = (function(_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
      _super.call(this, destination);
      this.project = project;
      this.concurrent = concurrent;
      this.scheduler = scheduler;
      this.index = 0;
      this.active = 0;
      this.hasCompleted = false;
      if (concurrent < Number.POSITIVE_INFINITY) {
        this.buffer = [];
      }
    }
    ExpandSubscriber.dispatch = function(arg) {
      var subscriber = arg.subscriber,
          result = arg.result,
          value = arg.value,
          index = arg.index;
      subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function(value) {
      var destination = this.destination;
      if (destination.closed) {
        this._complete();
        return;
      }
      var index = this.index++;
      if (this.active < this.concurrent) {
        destination.next(value);
        var result = tryCatch_1.tryCatch(this.project)(value, index);
        if (result === errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else if (!this.scheduler) {
          this.subscribeToProjection(result, value, index);
        } else {
          var state = {
            subscriber: this,
            result: result,
            value: value,
            index: index
          };
          this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
        }
      } else {
        this.buffer.push(value);
      }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function(result, value, index) {
      this.active++;
      this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.hasCompleted && this.active === 0) {
        this.destination.complete();
      }
    };
    ExpandSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer && buffer.length > 0) {
        this._next(buffer.shift());
      }
      if (this.hasCompleted && this.active === 0) {
        this.destination.complete();
      }
    };
    return ExpandSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.ExpandSubscriber = ExpandSubscriber;
  return module.exports;
});

$__System.registerDynamic("be", ["25", "bd"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var expand_1 = $__require('bd');
  Observable_1.Observable.prototype.expand = expand_1.expand;
  return module.exports;
});

$__System.registerDynamic("bf", ["81", "c0"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var ArgumentOutOfRangeError_1 = $__require('c0');
  function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
  }
  exports.elementAt = elementAt;
  var ElementAtOperator = (function() {
    function ElementAtOperator(index, defaultValue) {
      this.index = index;
      this.defaultValue = defaultValue;
      if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
      }
    }
    ElementAtOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
    };
    return ElementAtOperator;
  }());
  var ElementAtSubscriber = (function(_super) {
    __extends(ElementAtSubscriber, _super);
    function ElementAtSubscriber(destination, index, defaultValue) {
      _super.call(this, destination);
      this.index = index;
      this.defaultValue = defaultValue;
    }
    ElementAtSubscriber.prototype._next = function(x) {
      if (this.index-- === 0) {
        this.destination.next(x);
        this.destination.complete();
      }
    };
    ElementAtSubscriber.prototype._complete = function() {
      var destination = this.destination;
      if (this.index >= 0) {
        if (typeof this.defaultValue !== 'undefined') {
          destination.next(this.defaultValue);
        } else {
          destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
        }
      }
      destination.complete();
    };
    return ElementAtSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("c1", ["25", "bf"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var elementAt_1 = $__require('bf');
  Observable_1.Observable.prototype.elementAt = elementAt_1.elementAt;
  return module.exports;
});

$__System.registerDynamic("c2", ["25", "c3"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var filter_1 = $__require('c3');
  Observable_1.Observable.prototype.filter = filter_1.filter;
  return module.exports;
});

$__System.registerDynamic("c4", ["81", "47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Subscription_1 = $__require('47');
  function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
  }
  exports._finally = _finally;
  var FinallyOperator = (function() {
    function FinallyOperator(callback) {
      this.callback = callback;
    }
    FinallyOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
  }());
  var FinallySubscriber = (function(_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
      _super.call(this, destination);
      this.add(new Subscription_1.Subscription(callback));
    }
    return FinallySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("c5", ["25", "c4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var finally_1 = $__require('c4');
  Observable_1.Observable.prototype.finally = finally_1._finally;
  Observable_1.Observable.prototype._finally = finally_1._finally;
  return module.exports;
});

$__System.registerDynamic("c6", ["25", "c7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var find_1 = $__require('c7');
  Observable_1.Observable.prototype.find = find_1.find;
  return module.exports;
});

$__System.registerDynamic("c7", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate is not a function');
    }
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
  }
  exports.find = find;
  var FindValueOperator = (function() {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
      this.predicate = predicate;
      this.source = source;
      this.yieldIndex = yieldIndex;
      this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function(observer, source) {
      return source._subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
  }());
  exports.FindValueOperator = FindValueOperator;
  var FindValueSubscriber = (function(_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.yieldIndex = yieldIndex;
      this.thisArg = thisArg;
      this.index = 0;
    }
    FindValueSubscriber.prototype.notifyComplete = function(value) {
      var destination = this.destination;
      destination.next(value);
      destination.complete();
    };
    FindValueSubscriber.prototype._next = function(value) {
      var _a = this,
          predicate = _a.predicate,
          thisArg = _a.thisArg;
      var index = this.index++;
      try {
        var result = predicate.call(thisArg || this, value, index, this.source);
        if (result) {
          this.notifyComplete(this.yieldIndex ? index : value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    FindValueSubscriber.prototype._complete = function() {
      this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
  }(Subscriber_1.Subscriber));
  exports.FindValueSubscriber = FindValueSubscriber;
  return module.exports;
});

$__System.registerDynamic("c8", ["c7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var find_1 = $__require('c7');
  function findIndex(predicate, thisArg) {
    return this.lift(new find_1.FindValueOperator(predicate, this, true, thisArg));
  }
  exports.findIndex = findIndex;
  return module.exports;
});

$__System.registerDynamic("c9", ["25", "c8"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var findIndex_1 = $__require('c8');
  Observable_1.Observable.prototype.findIndex = findIndex_1.findIndex;
  return module.exports;
});

$__System.registerDynamic("ca", ["81", "cb"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var EmptyError_1 = $__require('cb');
  function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
  }
  exports.first = first;
  var FirstOperator = (function() {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
    }
    FirstOperator.prototype.call = function(observer, source) {
      return source._subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
  }());
  var FirstSubscriber = (function(_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
      this.index = 0;
      this.hasCompleted = false;
    }
    FirstSubscriber.prototype._next = function(value) {
      var index = this.index++;
      if (this.predicate) {
        this._tryPredicate(value, index);
      } else {
        this._emit(value, index);
      }
    };
    FirstSubscriber.prototype._tryPredicate = function(value, index) {
      var result;
      try {
        result = this.predicate(value, index, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this._emit(value, index);
      }
    };
    FirstSubscriber.prototype._emit = function(value, index) {
      if (this.resultSelector) {
        this._tryResultSelector(value, index);
        return;
      }
      this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function(value, index) {
      var result;
      try {
        result = this.resultSelector(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function(value) {
      var destination = this.destination;
      destination.next(value);
      destination.complete();
      this.hasCompleted = true;
    };
    FirstSubscriber.prototype._complete = function() {
      var destination = this.destination;
      if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
        destination.next(this.defaultValue);
        destination.complete();
      } else if (!this.hasCompleted) {
        destination.error(new EmptyError_1.EmptyError);
      }
    };
    return FirstSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("cc", ["25", "ca"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var first_1 = $__require('ca');
  Observable_1.Observable.prototype.first = first_1.first;
  return module.exports;
});

$__System.registerDynamic("cd", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MapPolyfill = (function() {
    function MapPolyfill() {
      this.size = 0;
      this._values = [];
      this._keys = [];
    }
    MapPolyfill.prototype.get = function(key) {
      var i = this._keys.indexOf(key);
      return i === -1 ? undefined : this._values[i];
    };
    MapPolyfill.prototype.set = function(key, value) {
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
    MapPolyfill.prototype.delete = function(key) {
      var i = this._keys.indexOf(key);
      if (i === -1) {
        return false;
      }
      this._values.splice(i, 1);
      this._keys.splice(i, 1);
      this.size--;
      return true;
    };
    MapPolyfill.prototype.clear = function() {
      this._keys.length = 0;
      this._values.length = 0;
      this.size = 0;
    };
    MapPolyfill.prototype.forEach = function(cb, thisArg) {
      for (var i = 0; i < this.size; i++) {
        cb.call(thisArg, this._values[i], this._keys[i]);
      }
    };
    return MapPolyfill;
  }());
  exports.MapPolyfill = MapPolyfill;
  return module.exports;
});

$__System.registerDynamic("ce", ["7e", "cd"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var MapPolyfill_1 = $__require('cd');
  exports.Map = root_1.root.Map || (function() {
    return MapPolyfill_1.MapPolyfill;
  })();
  return module.exports;
});

$__System.registerDynamic("cf", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FastMap = (function() {
    function FastMap() {
      this.values = {};
    }
    FastMap.prototype.delete = function(key) {
      this.values[key] = null;
      return true;
    };
    FastMap.prototype.set = function(key, value) {
      this.values[key] = value;
      return this;
    };
    FastMap.prototype.get = function(key) {
      return this.values[key];
    };
    FastMap.prototype.forEach = function(cb, thisArg) {
      var values = this.values;
      for (var key in values) {
        if (values.hasOwnProperty(key) && values[key] !== null) {
          cb.call(thisArg, values[key], key);
        }
      }
    };
    FastMap.prototype.clear = function() {
      this.values = {};
    };
    return FastMap;
  }());
  exports.FastMap = FastMap;
  return module.exports;
});

$__System.registerDynamic("d0", ["81", "47", "25", "80", "ce", "cf"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Subscription_1 = $__require('47');
  var Observable_1 = $__require('25');
  var Subject_1 = $__require('80');
  var Map_1 = $__require('ce');
  var FastMap_1 = $__require('cf');
  function groupBy(keySelector, elementSelector, durationSelector) {
    return this.lift(new GroupByOperator(this, keySelector, elementSelector, durationSelector));
  }
  exports.groupBy = groupBy;
  var GroupByOperator = (function() {
    function GroupByOperator(source, keySelector, elementSelector, durationSelector) {
      this.source = source;
      this.keySelector = keySelector;
      this.elementSelector = elementSelector;
      this.durationSelector = durationSelector;
    }
    GroupByOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector));
    };
    return GroupByOperator;
  }());
  var GroupBySubscriber = (function(_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector) {
      _super.call(this, destination);
      this.keySelector = keySelector;
      this.elementSelector = elementSelector;
      this.durationSelector = durationSelector;
      this.groups = null;
      this.attemptedToUnsubscribe = false;
      this.count = 0;
    }
    GroupBySubscriber.prototype._next = function(value) {
      var key;
      try {
        key = this.keySelector(value);
      } catch (err) {
        this.error(err);
        return;
      }
      this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function(value, key) {
      var groups = this.groups;
      if (!groups) {
        groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
      }
      var group = groups.get(key);
      var element;
      if (this.elementSelector) {
        try {
          element = this.elementSelector(value);
        } catch (err) {
          this.error(err);
        }
      } else {
        element = value;
      }
      if (!group) {
        groups.set(key, group = new Subject_1.Subject());
        var groupedObservable = new GroupedObservable(key, group, this);
        this.destination.next(groupedObservable);
        if (this.durationSelector) {
          var duration = void 0;
          try {
            duration = this.durationSelector(new GroupedObservable(key, group));
          } catch (err) {
            this.error(err);
            return;
          }
          this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
        }
      }
      if (!group.closed) {
        group.next(element);
      }
    };
    GroupBySubscriber.prototype._error = function(err) {
      var groups = this.groups;
      if (groups) {
        groups.forEach(function(group, key) {
          group.error(err);
        });
        groups.clear();
      }
      this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function() {
      var groups = this.groups;
      if (groups) {
        groups.forEach(function(group, key) {
          group.complete();
        });
        groups.clear();
      }
      this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function(key) {
      this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function() {
      if (!this.closed && !this.attemptedToUnsubscribe) {
        this.attemptedToUnsubscribe = true;
        if (this.count === 0) {
          _super.prototype.unsubscribe.call(this);
        }
      }
    };
    return GroupBySubscriber;
  }(Subscriber_1.Subscriber));
  var GroupDurationSubscriber = (function(_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
      _super.call(this);
      this.key = key;
      this.group = group;
      this.parent = parent;
    }
    GroupDurationSubscriber.prototype._next = function(value) {
      this._complete();
    };
    GroupDurationSubscriber.prototype._error = function(err) {
      var group = this.group;
      if (!group.closed) {
        group.error(err);
      }
      this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype._complete = function() {
      var group = this.group;
      if (!group.closed) {
        group.complete();
      }
      this.parent.removeGroup(this.key);
    };
    return GroupDurationSubscriber;
  }(Subscriber_1.Subscriber));
  var GroupedObservable = (function(_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
      _super.call(this);
      this.key = key;
      this.groupSubject = groupSubject;
      this.refCountSubscription = refCountSubscription;
    }
    GroupedObservable.prototype._subscribe = function(subscriber) {
      var subscription = new Subscription_1.Subscription();
      var _a = this,
          refCountSubscription = _a.refCountSubscription,
          groupSubject = _a.groupSubject;
      if (refCountSubscription && !refCountSubscription.closed) {
        subscription.add(new InnerRefCountSubscription(refCountSubscription));
      }
      subscription.add(groupSubject.subscribe(subscriber));
      return subscription;
    };
    return GroupedObservable;
  }(Observable_1.Observable));
  exports.GroupedObservable = GroupedObservable;
  var InnerRefCountSubscription = (function(_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
      _super.call(this);
      this.parent = parent;
      parent.count++;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function() {
      var parent = this.parent;
      if (!parent.closed && !this.closed) {
        _super.prototype.unsubscribe.call(this);
        parent.count -= 1;
        if (parent.count === 0 && parent.attemptedToUnsubscribe) {
          parent.unsubscribe();
        }
      }
    };
    return InnerRefCountSubscription;
  }(Subscription_1.Subscription));
  return module.exports;
});

$__System.registerDynamic("d1", ["25", "d0"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var groupBy_1 = $__require('d0');
  Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
  return module.exports;
});

$__System.registerDynamic("60", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function noop() {}
  exports.noop = noop;
  return module.exports;
});

$__System.registerDynamic("d2", ["81", "60"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var noop_1 = $__require('60');
  function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
  }
  exports.ignoreElements = ignoreElements;
  ;
  var IgnoreElementsOperator = (function() {
    function IgnoreElementsOperator() {}
    IgnoreElementsOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
  }());
  var IgnoreElementsSubscriber = (function(_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
      _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function(unused) {
      noop_1.noop();
    };
    return IgnoreElementsSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("d3", ["25", "d2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var ignoreElements_1 = $__require('d2');
  Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
  return module.exports;
});

$__System.registerDynamic("d4", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function isEmpty() {
    return this.lift(new IsEmptyOperator());
  }
  exports.isEmpty = isEmpty;
  var IsEmptyOperator = (function() {
    function IsEmptyOperator() {}
    IsEmptyOperator.prototype.call = function(observer, source) {
      return source._subscribe(new IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
  }());
  var IsEmptySubscriber = (function(_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
      _super.call(this, destination);
    }
    IsEmptySubscriber.prototype.notifyComplete = function(isEmpty) {
      var destination = this.destination;
      destination.next(isEmpty);
      destination.complete();
    };
    IsEmptySubscriber.prototype._next = function(value) {
      this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function() {
      this.notifyComplete(true);
    };
    return IsEmptySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("d5", ["25", "d4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var isEmpty_1 = $__require('d4');
  Observable_1.Observable.prototype.isEmpty = isEmpty_1.isEmpty;
  return module.exports;
});

$__System.registerDynamic("d6", ["26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
  }
  exports.audit = audit;
  var AuditOperator = (function() {
    function AuditOperator(durationSelector) {
      this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
  }());
  var AuditSubscriber = (function(_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
      _super.call(this, destination);
      this.durationSelector = durationSelector;
      this.hasValue = false;
    }
    AuditSubscriber.prototype._next = function(value) {
      this.value = value;
      this.hasValue = true;
      if (!this.throttled) {
        var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
        if (duration === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
        }
      }
    };
    AuditSubscriber.prototype.clearThrottle = function() {
      var _a = this,
          value = _a.value,
          hasValue = _a.hasValue,
          throttled = _a.throttled;
      if (throttled) {
        this.remove(throttled);
        this.throttled = null;
        throttled.unsubscribe();
      }
      if (hasValue) {
        this.value = null;
        this.hasValue = false;
        this.destination.next(value);
      }
    };
    AuditSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
      this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function() {
      this.clearThrottle();
    };
    return AuditSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("d7", ["25", "d6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var audit_1 = $__require('d6');
  Observable_1.Observable.prototype.audit = audit_1.audit;
  return module.exports;
});

$__System.registerDynamic("d8", ["57", "81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('57');
  var Subscriber_1 = $__require('81');
  function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new AuditTimeOperator(duration, scheduler));
  }
  exports.auditTime = auditTime;
  var AuditTimeOperator = (function() {
    function AuditTimeOperator(duration, scheduler) {
      this.duration = duration;
      this.scheduler = scheduler;
    }
    AuditTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
    };
    return AuditTimeOperator;
  }());
  var AuditTimeSubscriber = (function(_super) {
    __extends(AuditTimeSubscriber, _super);
    function AuditTimeSubscriber(destination, duration, scheduler) {
      _super.call(this, destination);
      this.duration = duration;
      this.scheduler = scheduler;
      this.hasValue = false;
    }
    AuditTimeSubscriber.prototype._next = function(value) {
      this.value = value;
      this.hasValue = true;
      if (!this.throttled) {
        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
      }
    };
    AuditTimeSubscriber.prototype.clearThrottle = function() {
      var _a = this,
          value = _a.value,
          hasValue = _a.hasValue,
          throttled = _a.throttled;
      if (throttled) {
        this.remove(throttled);
        this.throttled = null;
        throttled.unsubscribe();
      }
      if (hasValue) {
        this.value = null;
        this.hasValue = false;
        this.destination.next(value);
      }
    };
    return AuditTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(subscriber) {
    subscriber.clearThrottle();
  }
  return module.exports;
});

$__System.registerDynamic("d9", ["25", "d8"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var auditTime_1 = $__require('d8');
  Observable_1.Observable.prototype.auditTime = auditTime_1.auditTime;
  return module.exports;
});

$__System.registerDynamic("da", ["81", "cb"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var EmptyError_1 = $__require('cb');
  function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
  }
  exports.last = last;
  var LastOperator = (function() {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
    }
    LastOperator.prototype.call = function(observer, source) {
      return source._subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return LastOperator;
  }());
  var LastSubscriber = (function(_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
      this.hasValue = false;
      this.index = 0;
      if (typeof defaultValue !== 'undefined') {
        this.lastValue = defaultValue;
        this.hasValue = true;
      }
    }
    LastSubscriber.prototype._next = function(value) {
      var index = this.index++;
      if (this.predicate) {
        this._tryPredicate(value, index);
      } else {
        if (this.resultSelector) {
          this._tryResultSelector(value, index);
          return;
        }
        this.lastValue = value;
        this.hasValue = true;
      }
    };
    LastSubscriber.prototype._tryPredicate = function(value, index) {
      var result;
      try {
        result = this.predicate(value, index, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        if (this.resultSelector) {
          this._tryResultSelector(value, index);
          return;
        }
        this.lastValue = value;
        this.hasValue = true;
      }
    };
    LastSubscriber.prototype._tryResultSelector = function(value, index) {
      var result;
      try {
        result = this.resultSelector(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.lastValue = result;
      this.hasValue = true;
    };
    LastSubscriber.prototype._complete = function() {
      var destination = this.destination;
      if (this.hasValue) {
        destination.next(this.lastValue);
        destination.complete();
      } else {
        destination.error(new EmptyError_1.EmptyError);
      }
    };
    return LastSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("db", ["25", "da"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var last_1 = $__require('da');
  Observable_1.Observable.prototype.last = last_1.last;
  return module.exports;
});

$__System.registerDynamic("dc", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function letProto(func) {
    return func(this);
  }
  exports.letProto = letProto;
  return module.exports;
});

$__System.registerDynamic("dd", ["25", "dc"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var let_1 = $__require('dc');
  Observable_1.Observable.prototype.let = let_1.letProto;
  Observable_1.Observable.prototype.letBind = let_1.letProto;
  return module.exports;
});

$__System.registerDynamic("de", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
  }
  exports.every = every;
  var EveryOperator = (function() {
    function EveryOperator(predicate, thisArg, source) {
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.source = source;
    }
    EveryOperator.prototype.call = function(observer, source) {
      return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
  }());
  var EverySubscriber = (function(_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.source = source;
      this.index = 0;
      this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function(everyValueMatch) {
      this.destination.next(everyValueMatch);
      this.destination.complete();
    };
    EverySubscriber.prototype._next = function(value) {
      var result = false;
      try {
        result = this.predicate.call(this.thisArg, value, this.index++, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (!result) {
        this.notifyComplete(false);
      }
    };
    EverySubscriber.prototype._complete = function() {
      this.notifyComplete(true);
    };
    return EverySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("df", ["25", "de"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var every_1 = $__require('de');
  Observable_1.Observable.prototype.every = every_1.every;
  return module.exports;
});

$__System.registerDynamic("e0", ["25", "e1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var map_1 = $__require('e1');
  Observable_1.Observable.prototype.map = map_1.map;
  return module.exports;
});

$__System.registerDynamic("e2", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function mapTo(value) {
    return this.lift(new MapToOperator(value));
  }
  exports.mapTo = mapTo;
  var MapToOperator = (function() {
    function MapToOperator(value) {
      this.value = value;
    }
    MapToOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
  }());
  var MapToSubscriber = (function(_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
      _super.call(this, destination);
      this.value = value;
    }
    MapToSubscriber.prototype._next = function(x) {
      this.destination.next(this.value);
    };
    return MapToSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("e3", ["25", "e2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var mapTo_1 = $__require('e2');
  Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
  return module.exports;
});

$__System.registerDynamic("e4", ["81", "ab"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Notification_1 = $__require('ab');
  function materialize() {
    return this.lift(new MaterializeOperator());
  }
  exports.materialize = materialize;
  var MaterializeOperator = (function() {
    function MaterializeOperator() {}
    MaterializeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
  }());
  var MaterializeSubscriber = (function(_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
      _super.call(this, destination);
    }
    MaterializeSubscriber.prototype._next = function(value) {
      this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function(err) {
      var destination = this.destination;
      destination.next(Notification_1.Notification.createError(err));
      destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function() {
      var destination = this.destination;
      destination.next(Notification_1.Notification.createComplete());
      destination.complete();
    };
    return MaterializeSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("e5", ["25", "e4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var materialize_1 = $__require('e4');
  Observable_1.Observable.prototype.materialize = materialize_1.materialize;
  return module.exports;
});

$__System.registerDynamic("e6", ["e7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var reduce_1 = $__require('e7');
  function max(comparer) {
    var max = (typeof comparer === 'function') ? function(x, y) {
      return comparer(x, y) > 0 ? x : y;
    } : function(x, y) {
      return x > y ? x : y;
    };
    return this.lift(new reduce_1.ReduceOperator(max));
  }
  exports.max = max;
  return module.exports;
});

$__System.registerDynamic("e8", ["25", "e6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var max_1 = $__require('e6');
  Observable_1.Observable.prototype.max = max_1.max;
  return module.exports;
});

$__System.registerDynamic("5b", ["31", "98", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ArrayObservable_1 = $__require('31');
  var mergeAll_1 = $__require('98');
  var isScheduler_1 = $__require('2f');
  function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return mergeStatic.apply(this, observables);
  }
  exports.merge = merge;
  function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
      scheduler = observables.pop();
      if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
        concurrent = observables.pop();
      }
    } else if (typeof last === 'number') {
      concurrent = observables.pop();
    }
    if (observables.length === 1) {
      return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
  }
  exports.mergeStatic = mergeStatic;
  return module.exports;
});

$__System.registerDynamic("e9", ["25", "5b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var merge_1 = $__require('5b');
  Observable_1.Observable.prototype.merge = merge_1.merge;
  return module.exports;
});

$__System.registerDynamic("ea", ["25", "98"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var mergeAll_1 = $__require('98');
  Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
  return module.exports;
});

$__System.registerDynamic("9b", ["38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
  }
  exports.mergeMap = mergeMap;
  var MergeMapOperator = (function() {
    function MergeMapOperator(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function(observer, source) {
      return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
  }());
  exports.MergeMapOperator = MergeMapOperator;
  var MergeMapSubscriber = (function(_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function(value) {
      if (this.active < this.concurrent) {
        this._tryNext(value);
      } else {
        this.buffer.push(value);
      }
    };
    MergeMapSubscriber.prototype._tryNext = function(value) {
      var result;
      var index = this.index++;
      try {
        result = this.project(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.active++;
      this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (this.resultSelector) {
        this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        this.destination.next(innerValue);
      }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
      var result;
      try {
        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeMapSubscriber = MergeMapSubscriber;
  return module.exports;
});

$__System.registerDynamic("eb", ["25", "9b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var mergeMap_1 = $__require('9b');
  Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
  Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
  return module.exports;
});

$__System.registerDynamic("9e", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
  }
  exports.mergeMapTo = mergeMapTo;
  var MergeMapToOperator = (function() {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      this.ish = ish;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function(observer, source) {
      return source._subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    };
    return MergeMapToOperator;
  }());
  exports.MergeMapToOperator = MergeMapToOperator;
  var MergeMapToSubscriber = (function(_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      _super.call(this, destination);
      this.ish = ish;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeMapToSubscriber.prototype._next = function(value) {
      if (this.active < this.concurrent) {
        var resultSelector = this.resultSelector;
        var index = this.index++;
        var ish = this.ish;
        var destination = this.destination;
        this.active++;
        this._innerSub(ish, destination, resultSelector, value, index);
      } else {
        this.buffer.push(value);
      }
    };
    MergeMapToSubscriber.prototype._innerSub = function(ish, destination, resultSelector, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      if (resultSelector) {
        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        destination.next(innerValue);
      }
    };
    MergeMapToSubscriber.prototype.trySelectResult = function(outerValue, innerValue, outerIndex, innerIndex) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      var result;
      try {
        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        destination.error(err);
        return;
      }
      destination.next(result);
    };
    MergeMapToSubscriber.prototype.notifyError = function(err) {
      this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeMapToSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeMapToSubscriber = MergeMapToSubscriber;
  return module.exports;
});

$__System.registerDynamic("ec", ["25", "9e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var mergeMapTo_1 = $__require('9e');
  Observable_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
  Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
  return module.exports;
});

$__System.registerDynamic("ed", ["26", "27", "38", "39"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var subscribeToResult_1 = $__require('38');
  var OuterSubscriber_1 = $__require('39');
  function mergeScan(project, seed, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return this.lift(new MergeScanOperator(project, seed, concurrent));
  }
  exports.mergeScan = mergeScan;
  var MergeScanOperator = (function() {
    function MergeScanOperator(project, seed, concurrent) {
      this.project = project;
      this.seed = seed;
      this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new MergeScanSubscriber(subscriber, this.project, this.seed, this.concurrent));
    };
    return MergeScanOperator;
  }());
  exports.MergeScanOperator = MergeScanOperator;
  var MergeScanSubscriber = (function(_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, project, acc, concurrent) {
      _super.call(this, destination);
      this.project = project;
      this.acc = acc;
      this.concurrent = concurrent;
      this.hasValue = false;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeScanSubscriber.prototype._next = function(value) {
      if (this.active < this.concurrent) {
        var index = this.index++;
        var ish = tryCatch_1.tryCatch(this.project)(this.acc, value);
        var destination = this.destination;
        if (ish === errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else {
          this.active++;
          this._innerSub(ish, value, index);
        }
      } else {
        this.buffer.push(value);
      }
    };
    MergeScanSubscriber.prototype._innerSub = function(ish, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeScanSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        if (this.hasValue === false) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      }
    };
    MergeScanSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var destination = this.destination;
      this.acc = innerValue;
      this.hasValue = true;
      destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        if (this.hasValue === false) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      }
    };
    return MergeScanSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeScanSubscriber = MergeScanSubscriber;
  return module.exports;
});

$__System.registerDynamic("ee", ["25", "ed"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var mergeScan_1 = $__require('ed');
  Observable_1.Observable.prototype.mergeScan = mergeScan_1.mergeScan;
  return module.exports;
});

$__System.registerDynamic("ef", ["e7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var reduce_1 = $__require('e7');
  function min(comparer) {
    var min = (typeof comparer === 'function') ? function(x, y) {
      return comparer(x, y) < 0 ? x : y;
    } : function(x, y) {
      return x < y ? x : y;
    };
    return this.lift(new reduce_1.ReduceOperator(min));
  }
  exports.min = min;
  return module.exports;
});

$__System.registerDynamic("f0", ["25", "ef"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var min_1 = $__require('ef');
  Observable_1.Observable.prototype.min = min_1.min;
  return module.exports;
});

$__System.registerDynamic("f1", ["25", "f2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var multicast_1 = $__require('f2');
  Observable_1.Observable.prototype.multicast = multicast_1.multicast;
  return module.exports;
});

$__System.registerDynamic("f3", ["25", "f4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var observeOn_1 = $__require('f4');
  Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
  return module.exports;
});

$__System.registerDynamic("4e", ["7e", "25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('7e');
  var Observable_1 = $__require('25');
  var PromiseObservable = (function(_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
      _super.call(this);
      this.promise = promise;
      this.scheduler = scheduler;
    }
    PromiseObservable.create = function(promise, scheduler) {
      return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function(subscriber) {
      var _this = this;
      var promise = this.promise;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        if (this._isScalar) {
          if (!subscriber.closed) {
            subscriber.next(this.value);
            subscriber.complete();
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function(err) {
            if (!subscriber.closed) {
              subscriber.error(err);
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      } else {
        if (this._isScalar) {
          if (!subscriber.closed) {
            return scheduler.schedule(dispatchNext, 0, {
              value: this.value,
              subscriber: subscriber
            });
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.closed) {
              subscriber.add(scheduler.schedule(dispatchNext, 0, {
                value: value,
                subscriber: subscriber
              }));
            }
          }, function(err) {
            if (!subscriber.closed) {
              subscriber.add(scheduler.schedule(dispatchError, 0, {
                err: err,
                subscriber: subscriber
              }));
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      }
    };
    return PromiseObservable;
  }(Observable_1.Observable));
  exports.PromiseObservable = PromiseObservable;
  function dispatchNext(arg) {
    var value = arg.value,
        subscriber = arg.subscriber;
    if (!subscriber.closed) {
      subscriber.next(value);
      subscriber.complete();
    }
  }
  function dispatchError(arg) {
    var err = arg.err,
        subscriber = arg.subscriber;
    if (!subscriber.closed) {
      subscriber.error(err);
    }
  }
  return module.exports;
});

$__System.registerDynamic("f5", ["7e", "25", "f6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('7e');
  var Observable_1 = $__require('25');
  var iterator_1 = $__require('f6');
  var IteratorObservable = (function(_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
      _super.call(this);
      this.scheduler = scheduler;
      if (iterator == null) {
        throw new Error('iterator cannot be null.');
      }
      this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function(iterator, scheduler) {
      return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function(state) {
      var index = state.index,
          hasError = state.hasError,
          iterator = state.iterator,
          subscriber = state.subscriber;
      if (hasError) {
        subscriber.error(state.error);
        return;
      }
      var result = iterator.next();
      if (result.done) {
        subscriber.complete();
        return;
      }
      subscriber.next(result.value);
      state.index = index + 1;
      if (subscriber.closed) {
        return;
      }
      this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          iterator = _a.iterator,
          scheduler = _a.scheduler;
      if (scheduler) {
        return scheduler.schedule(IteratorObservable.dispatch, 0, {
          index: index,
          iterator: iterator,
          subscriber: subscriber
        });
      } else {
        do {
          var result = iterator.next();
          if (result.done) {
            subscriber.complete();
            break;
          } else {
            subscriber.next(result.value);
          }
          if (subscriber.closed) {
            break;
          }
        } while (true);
      }
    };
    return IteratorObservable;
  }(Observable_1.Observable));
  exports.IteratorObservable = IteratorObservable;
  var StringIterator = (function() {
    function StringIterator(str, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = str.length;
      }
      this.str = str;
      this.idx = idx;
      this.len = len;
    }
    StringIterator.prototype[iterator_1.$$iterator] = function() {
      return (this);
    };
    StringIterator.prototype.next = function() {
      return this.idx < this.len ? {
        done: false,
        value: this.str.charAt(this.idx++)
      } : {
        done: true,
        value: undefined
      };
    };
    return StringIterator;
  }());
  var ArrayIterator = (function() {
    function ArrayIterator(arr, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = toLength(arr);
      }
      this.arr = arr;
      this.idx = idx;
      this.len = len;
    }
    ArrayIterator.prototype[iterator_1.$$iterator] = function() {
      return this;
    };
    ArrayIterator.prototype.next = function() {
      return this.idx < this.len ? {
        done: false,
        value: this.arr[this.idx++]
      } : {
        done: true,
        value: undefined
      };
    };
    return ArrayIterator;
  }());
  function getIterator(obj) {
    var i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
      return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
      return new ArrayIterator(obj);
    }
    if (!i) {
      throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
  }
  var maxSafeInteger = Math.pow(2, 53) - 1;
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
  function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
  }
  function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
      return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
      return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
  }
  return module.exports;
});

$__System.registerDynamic("f7", ["25", "f8", "3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var ScalarObservable_1 = $__require('f8');
  var EmptyObservable_1 = $__require('3d');
  var ArrayLikeObservable = (function(_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
      _super.call(this);
      this.arrayLike = arrayLike;
      this.scheduler = scheduler;
      if (!scheduler && arrayLike.length === 1) {
        this._isScalar = true;
        this.value = arrayLike[0];
      }
    }
    ArrayLikeObservable.create = function(arrayLike, scheduler) {
      var length = arrayLike.length;
      if (length === 0) {
        return new EmptyObservable_1.EmptyObservable();
      } else if (length === 1) {
        return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
      } else {
        return new ArrayLikeObservable(arrayLike, scheduler);
      }
    };
    ArrayLikeObservable.dispatch = function(state) {
      var arrayLike = state.arrayLike,
          index = state.index,
          length = state.length,
          subscriber = state.subscriber;
      if (subscriber.closed) {
        return;
      }
      if (index >= length) {
        subscriber.complete();
        return;
      }
      subscriber.next(arrayLike[index]);
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          arrayLike = _a.arrayLike,
          scheduler = _a.scheduler;
      var length = arrayLike.length;
      if (scheduler) {
        return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
          arrayLike: arrayLike,
          index: index,
          length: length,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < length && !subscriber.closed; i++) {
          subscriber.next(arrayLike[i]);
        }
        subscriber.complete();
      }
    };
    return ArrayLikeObservable;
  }(Observable_1.Observable));
  exports.ArrayLikeObservable = ArrayLikeObservable;
  return module.exports;
});

$__System.registerDynamic("43", ["30", "f9", "4e", "f5", "31", "f7", "f6", "25", "f4", "fa"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('30');
  var isPromise_1 = $__require('f9');
  var PromiseObservable_1 = $__require('4e');
  var IteratorObservable_1 = $__require('f5');
  var ArrayObservable_1 = $__require('31');
  var ArrayLikeObservable_1 = $__require('f7');
  var iterator_1 = $__require('f6');
  var Observable_1 = $__require('25');
  var observeOn_1 = $__require('f4');
  var observable_1 = $__require('fa');
  var isArrayLike = (function(x) {
    return x && typeof x.length === 'number';
  });
  var FromObservable = (function(_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
      _super.call(this, null);
      this.ish = ish;
      this.scheduler = scheduler;
    }
    FromObservable.create = function(ish, scheduler) {
      if (ish != null) {
        if (typeof ish[observable_1.$$observable] === 'function') {
          if (ish instanceof Observable_1.Observable && !scheduler) {
            return ish;
          }
          return new FromObservable(ish, scheduler);
        } else if (isArray_1.isArray(ish)) {
          return new ArrayObservable_1.ArrayObservable(ish, scheduler);
        } else if (isPromise_1.isPromise(ish)) {
          return new PromiseObservable_1.PromiseObservable(ish, scheduler);
        } else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
          return new IteratorObservable_1.IteratorObservable(ish, scheduler);
        } else if (isArrayLike(ish)) {
          return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
        }
      }
      throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function(subscriber) {
      var ish = this.ish;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        return ish[observable_1.$$observable]().subscribe(subscriber);
      } else {
        return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
      }
    };
    return FromObservable;
  }(Observable_1.Observable));
  exports.FromObservable = FromObservable;
  return module.exports;
});

$__System.registerDynamic("66", ["43", "30", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var FromObservable_1 = $__require('43');
  var isArray_1 = $__require('30');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function onErrorResumeNext() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nextSources[_i - 0] = arguments[_i];
    }
    if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
      nextSources = nextSources[0];
    }
    return this.lift(new OnErrorResumeNextOperator(nextSources));
  }
  exports.onErrorResumeNext = onErrorResumeNext;
  function onErrorResumeNextStatic() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nextSources[_i - 0] = arguments[_i];
    }
    var source = null;
    if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
      nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return new FromObservable_1.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
  }
  exports.onErrorResumeNextStatic = onErrorResumeNextStatic;
  var OnErrorResumeNextOperator = (function() {
    function OnErrorResumeNextOperator(nextSources) {
      this.nextSources = nextSources;
    }
    OnErrorResumeNextOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
    };
    return OnErrorResumeNextOperator;
  }());
  var OnErrorResumeNextSubscriber = (function(_super) {
    __extends(OnErrorResumeNextSubscriber, _super);
    function OnErrorResumeNextSubscriber(destination, nextSources) {
      _super.call(this, destination);
      this.destination = destination;
      this.nextSources = nextSources;
    }
    OnErrorResumeNextSubscriber.prototype.notifyError = function(error, innerSub) {
      this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.notifyComplete = function(innerSub) {
      this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._error = function(err) {
      this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._complete = function() {
      this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function() {
      var next = this.nextSources.shift();
      if (next) {
        this.add(subscribeToResult_1.subscribeToResult(this, next));
      } else {
        this.destination.complete();
      }
    };
    return OnErrorResumeNextSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("fb", ["25", "66"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var onErrorResumeNext_1 = $__require('66');
  Observable_1.Observable.prototype.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
  return module.exports;
});

$__System.registerDynamic("fc", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function pairwise() {
    return this.lift(new PairwiseOperator());
  }
  exports.pairwise = pairwise;
  var PairwiseOperator = (function() {
    function PairwiseOperator() {}
    PairwiseOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
  }());
  var PairwiseSubscriber = (function(_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
      _super.call(this, destination);
      this.hasPrev = false;
    }
    PairwiseSubscriber.prototype._next = function(value) {
      if (this.hasPrev) {
        this.destination.next([this.prev, value]);
      } else {
        this.hasPrev = true;
      }
      this.prev = value;
    };
    return PairwiseSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("fd", ["25", "fc"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var pairwise_1 = $__require('fc');
  Observable_1.Observable.prototype.pairwise = pairwise_1.pairwise;
  return module.exports;
});

$__System.registerDynamic("fe", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function not(pred, thisArg) {
    function notPred() {
      return !(notPred.pred.apply(notPred.thisArg, arguments));
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
  }
  exports.not = not;
  return module.exports;
});

$__System.registerDynamic("c3", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
  }
  exports.filter = filter;
  var FilterOperator = (function() {
    function FilterOperator(predicate, thisArg) {
      this.predicate = predicate;
      this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
  }());
  var FilterSubscriber = (function(_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.count = 0;
      this.predicate = predicate;
    }
    FilterSubscriber.prototype._next = function(value) {
      var result;
      try {
        result = this.predicate.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.destination.next(value);
      }
    };
    return FilterSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("ff", ["fe", "c3"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var not_1 = $__require('fe');
  var filter_1 = $__require('c3');
  function partition(predicate, thisArg) {
    return [filter_1.filter.call(this, predicate), filter_1.filter.call(this, not_1.not(predicate, thisArg))];
  }
  exports.partition = partition;
  return module.exports;
});

$__System.registerDynamic("100", ["25", "ff"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var partition_1 = $__require('ff');
  Observable_1.Observable.prototype.partition = partition_1.partition;
  return module.exports;
});

$__System.registerDynamic("101", ["e1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var map_1 = $__require('e1');
  function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
      throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
  }
  exports.pluck = pluck;
  function plucker(props, length) {
    var mapper = function(x) {
      var currentProp = x;
      for (var i = 0; i < length; i++) {
        var p = currentProp[props[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    };
    return mapper;
  }
  return module.exports;
});

$__System.registerDynamic("102", ["25", "101"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var pluck_1 = $__require('101');
  Observable_1.Observable.prototype.pluck = pluck_1.pluck;
  return module.exports;
});

$__System.registerDynamic("103", ["80", "f2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Subject_1 = $__require('80');
  var multicast_1 = $__require('f2');
  function publish(selector) {
    return selector ? multicast_1.multicast.call(this, function() {
      return new Subject_1.Subject();
    }, selector) : multicast_1.multicast.call(this, new Subject_1.Subject());
  }
  exports.publish = publish;
  return module.exports;
});

$__System.registerDynamic("104", ["25", "103"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var publish_1 = $__require('103');
  Observable_1.Observable.prototype.publish = publish_1.publish;
  return module.exports;
});

$__System.registerDynamic("105", ["106", "f2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BehaviorSubject_1 = $__require('106');
  var multicast_1 = $__require('f2');
  function publishBehavior(value) {
    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
  }
  exports.publishBehavior = publishBehavior;
  return module.exports;
});

$__System.registerDynamic("107", ["25", "105"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var publishBehavior_1 = $__require('105');
  Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
  return module.exports;
});

$__System.registerDynamic("108", ["82", "f2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReplaySubject_1 = $__require('82');
  var multicast_1 = $__require('f2');
  function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
  }
  exports.publishReplay = publishReplay;
  return module.exports;
});

$__System.registerDynamic("109", ["25", "108"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var publishReplay_1 = $__require('108');
  Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
  return module.exports;
});

$__System.registerDynamic("10a", ["28", "f2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AsyncSubject_1 = $__require('28');
  var multicast_1 = $__require('f2');
  function publishLast() {
    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
  }
  exports.publishLast = publishLast;
  return module.exports;
});

$__System.registerDynamic("10b", ["25", "10a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var publishLast_1 = $__require('10a');
  Observable_1.Observable.prototype.publishLast = publishLast_1.publishLast;
  return module.exports;
});

$__System.registerDynamic("5e", ["30", "31", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('30');
  var ArrayObservable_1 = $__require('31');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    observables.unshift(this);
    return raceStatic.apply(this, observables);
  }
  exports.race = race;
  function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1) {
      if (isArray_1.isArray(observables[0])) {
        observables = observables[0];
      } else {
        return observables[0];
      }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
  }
  exports.raceStatic = raceStatic;
  var RaceOperator = (function() {
    function RaceOperator() {}
    RaceOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
  }());
  exports.RaceOperator = RaceOperator;
  var RaceSubscriber = (function(_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
      _super.call(this, destination);
      this.hasFirst = false;
      this.observables = [];
      this.subscriptions = [];
    }
    RaceSubscriber.prototype._next = function(observable) {
      this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function() {
      var observables = this.observables;
      var len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
          if (this.subscriptions) {
            this.subscriptions.push(subscription);
            this.add(subscription);
          }
        }
        this.observables = null;
      }
    };
    RaceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (!this.hasFirst) {
        this.hasFirst = true;
        for (var i = 0; i < this.subscriptions.length; i++) {
          if (i !== outerIndex) {
            var subscription = this.subscriptions[i];
            subscription.unsubscribe();
            this.remove(subscription);
          }
        }
        this.subscriptions = null;
      }
      this.destination.next(innerValue);
    };
    return RaceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.RaceSubscriber = RaceSubscriber;
  return module.exports;
});

$__System.registerDynamic("10c", ["25", "5e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var race_1 = $__require('5e');
  Observable_1.Observable.prototype.race = race_1.race;
  return module.exports;
});

$__System.registerDynamic("e7", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function reduce(accumulator, seed) {
    return this.lift(new ReduceOperator(accumulator, seed));
  }
  exports.reduce = reduce;
  var ReduceOperator = (function() {
    function ReduceOperator(accumulator, seed) {
      this.accumulator = accumulator;
      this.seed = seed;
    }
    ReduceOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed));
    };
    return ReduceOperator;
  }());
  exports.ReduceOperator = ReduceOperator;
  var ReduceSubscriber = (function(_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, accumulator, seed) {
      _super.call(this, destination);
      this.accumulator = accumulator;
      this.hasValue = false;
      this.acc = seed;
      this.accumulator = accumulator;
      this.hasSeed = typeof seed !== 'undefined';
    }
    ReduceSubscriber.prototype._next = function(value) {
      if (this.hasValue || (this.hasValue = this.hasSeed)) {
        this._tryReduce(value);
      } else {
        this.acc = value;
        this.hasValue = true;
      }
    };
    ReduceSubscriber.prototype._tryReduce = function(value) {
      var result;
      try {
        result = this.accumulator(this.acc, value);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function() {
      if (this.hasValue || this.hasSeed) {
        this.destination.next(this.acc);
      }
      this.destination.complete();
    };
    return ReduceSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ReduceSubscriber = ReduceSubscriber;
  return module.exports;
});

$__System.registerDynamic("10d", ["25", "e7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var reduce_1 = $__require('e7');
  Observable_1.Observable.prototype.reduce = reduce_1.reduce;
  return module.exports;
});

$__System.registerDynamic("10e", ["81", "3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var EmptyObservable_1 = $__require('3d');
  function repeat(count) {
    if (count === void 0) {
      count = -1;
    }
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else if (count < 0) {
      return this.lift(new RepeatOperator(-1, this));
    } else {
      return this.lift(new RepeatOperator(count - 1, this));
    }
  }
  exports.repeat = repeat;
  var RepeatOperator = (function() {
    function RepeatOperator(count, source) {
      this.count = count;
      this.source = source;
    }
    RepeatOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
  }());
  var RepeatSubscriber = (function(_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
      _super.call(this, destination);
      this.count = count;
      this.source = source;
    }
    RepeatSubscriber.prototype.complete = function() {
      if (!this.isStopped) {
        var _a = this,
            source = _a.source,
            count = _a.count;
        if (count === 0) {
          return _super.prototype.complete.call(this);
        } else if (count > -1) {
          this.count = count - 1;
        }
        this.unsubscribe();
        this.isStopped = false;
        this.closed = false;
        source.subscribe(this);
      }
    };
    return RepeatSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("10f", ["25", "10e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var repeat_1 = $__require('10e');
  Observable_1.Observable.prototype.repeat = repeat_1.repeat;
  return module.exports;
});

$__System.registerDynamic("110", ["80", "26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier, this));
  }
  exports.repeatWhen = repeatWhen;
  var RepeatWhenOperator = (function() {
    function RepeatWhenOperator(notifier, source) {
      this.notifier = notifier;
      this.source = source;
    }
    RepeatWhenOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RepeatWhenOperator;
  }());
  var RepeatWhenSubscriber = (function(_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
      _super.call(this, destination);
      this.notifier = notifier;
      this.source = source;
    }
    RepeatWhenSubscriber.prototype.complete = function() {
      if (!this.isStopped) {
        var notifications = this.notifications;
        var retries = this.retries;
        var retriesSubscription = this.retriesSubscription;
        if (!retries) {
          notifications = new Subject_1.Subject();
          retries = tryCatch_1.tryCatch(this.notifier)(notifications);
          if (retries === errorObject_1.errorObject) {
            return _super.prototype.complete.call(this);
          }
          retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
        } else {
          this.notifications = null;
          this.retriesSubscription = null;
        }
        this.unsubscribe();
        this.closed = false;
        this.notifications = notifications;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        notifications.next();
      }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function() {
      var _a = this,
          notifications = _a.notifications,
          retriesSubscription = _a.retriesSubscription;
      if (notifications) {
        notifications.unsubscribe();
        this.notifications = null;
      }
      if (retriesSubscription) {
        retriesSubscription.unsubscribe();
        this.retriesSubscription = null;
      }
      this.retries = null;
    };
    RepeatWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          notifications = _a.notifications,
          retries = _a.retries,
          retriesSubscription = _a.retriesSubscription;
      this.notifications = null;
      this.retries = null;
      this.retriesSubscription = null;
      this.unsubscribe();
      this.isStopped = false;
      this.closed = false;
      this.notifications = notifications;
      this.retries = retries;
      this.retriesSubscription = retriesSubscription;
      this.source.subscribe(this);
    };
    return RepeatWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("111", ["25", "110"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var repeatWhen_1 = $__require('110');
  Observable_1.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;
  return module.exports;
});

$__System.registerDynamic("112", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function retry(count) {
    if (count === void 0) {
      count = -1;
    }
    return this.lift(new RetryOperator(count, this));
  }
  exports.retry = retry;
  var RetryOperator = (function() {
    function RetryOperator(count, source) {
      this.count = count;
      this.source = source;
    }
    RetryOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
  }());
  var RetrySubscriber = (function(_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
      _super.call(this, destination);
      this.count = count;
      this.source = source;
    }
    RetrySubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var _a = this,
            source = _a.source,
            count = _a.count;
        if (count === 0) {
          return _super.prototype.error.call(this, err);
        } else if (count > -1) {
          this.count = count - 1;
        }
        this.unsubscribe();
        this.isStopped = false;
        this.closed = false;
        source.subscribe(this);
      }
    };
    return RetrySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("113", ["25", "112"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var retry_1 = $__require('112');
  Observable_1.Observable.prototype.retry = retry_1.retry;
  return module.exports;
});

$__System.registerDynamic("114", ["80", "26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
  }
  exports.retryWhen = retryWhen;
  var RetryWhenOperator = (function() {
    function RetryWhenOperator(notifier, source) {
      this.notifier = notifier;
      this.source = source;
    }
    RetryWhenOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
  }());
  var RetryWhenSubscriber = (function(_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
      _super.call(this, destination);
      this.notifier = notifier;
      this.source = source;
    }
    RetryWhenSubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var errors = this.errors;
        var retries = this.retries;
        var retriesSubscription = this.retriesSubscription;
        if (!retries) {
          errors = new Subject_1.Subject();
          retries = tryCatch_1.tryCatch(this.notifier)(errors);
          if (retries === errorObject_1.errorObject) {
            return _super.prototype.error.call(this, errorObject_1.errorObject.e);
          }
          retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
        } else {
          this.errors = null;
          this.retriesSubscription = null;
        }
        this.unsubscribe();
        this.closed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        errors.next(err);
      }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function() {
      var _a = this,
          errors = _a.errors,
          retriesSubscription = _a.retriesSubscription;
      if (errors) {
        errors.unsubscribe();
        this.errors = null;
      }
      if (retriesSubscription) {
        retriesSubscription.unsubscribe();
        this.retriesSubscription = null;
      }
      this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          errors = _a.errors,
          retries = _a.retries,
          retriesSubscription = _a.retriesSubscription;
      this.errors = null;
      this.retries = null;
      this.retriesSubscription = null;
      this.unsubscribe();
      this.isStopped = false;
      this.closed = false;
      this.errors = errors;
      this.retries = retries;
      this.retriesSubscription = retriesSubscription;
      this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("115", ["25", "114"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var retryWhen_1 = $__require('114');
  Observable_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
  return module.exports;
});

$__System.registerDynamic("116", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
  }
  exports.sample = sample;
  var SampleOperator = (function() {
    function SampleOperator(notifier) {
      this.notifier = notifier;
    }
    SampleOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SampleSubscriber(subscriber, this.notifier));
    };
    return SampleOperator;
  }());
  var SampleSubscriber = (function(_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber(destination, notifier) {
      _super.call(this, destination);
      this.hasValue = false;
      this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    SampleSubscriber.prototype._next = function(value) {
      this.value = value;
      this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function() {
      this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function() {
      if (this.hasValue) {
        this.hasValue = false;
        this.destination.next(this.value);
      }
    };
    return SampleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("117", ["25", "116"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var sample_1 = $__require('116');
  Observable_1.Observable.prototype.sample = sample_1.sample;
  return module.exports;
});

$__System.registerDynamic("118", ["81", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var async_1 = $__require('57');
  function sampleTime(period, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new SampleTimeOperator(period, scheduler));
  }
  exports.sampleTime = sampleTime;
  var SampleTimeOperator = (function() {
    function SampleTimeOperator(period, scheduler) {
      this.period = period;
      this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
  }());
  var SampleTimeSubscriber = (function(_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
      _super.call(this, destination);
      this.period = period;
      this.scheduler = scheduler;
      this.hasValue = false;
      this.add(scheduler.schedule(dispatchNotification, period, {
        subscriber: this,
        period: period
      }));
    }
    SampleTimeSubscriber.prototype._next = function(value) {
      this.lastValue = value;
      this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function() {
      if (this.hasValue) {
        this.hasValue = false;
        this.destination.next(this.lastValue);
      }
    };
    return SampleTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNotification(state) {
    var subscriber = state.subscriber,
        period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
  }
  return module.exports;
});

$__System.registerDynamic("119", ["25", "118"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var sampleTime_1 = $__require('118');
  Observable_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
  return module.exports;
});

$__System.registerDynamic("11a", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function scan(accumulator, seed) {
    return this.lift(new ScanOperator(accumulator, seed));
  }
  exports.scan = scan;
  var ScanOperator = (function() {
    function ScanOperator(accumulator, seed) {
      this.accumulator = accumulator;
      this.seed = seed;
    }
    ScanOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
    };
    return ScanOperator;
  }());
  var ScanSubscriber = (function(_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, seed) {
      _super.call(this, destination);
      this.accumulator = accumulator;
      this.index = 0;
      this.accumulatorSet = false;
      this.seed = seed;
      this.accumulatorSet = typeof seed !== 'undefined';
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
      get: function() {
        return this._seed;
      },
      set: function(value) {
        this.accumulatorSet = true;
        this._seed = value;
      },
      enumerable: true,
      configurable: true
    });
    ScanSubscriber.prototype._next = function(value) {
      if (!this.accumulatorSet) {
        this.seed = value;
        this.destination.next(value);
      } else {
        return this._tryNext(value);
      }
    };
    ScanSubscriber.prototype._tryNext = function(value) {
      var index = this.index++;
      var result;
      try {
        result = this.accumulator(this.seed, value, index);
      } catch (err) {
        this.destination.error(err);
      }
      this.seed = result;
      this.destination.next(result);
    };
    return ScanSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("11b", ["25", "11a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var scan_1 = $__require('11a');
  Observable_1.Observable.prototype.scan = scan_1.scan;
  return module.exports;
});

$__System.registerDynamic("11c", ["81", "26", "27"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  function sequenceEqual(compareTo, comparor) {
    return this.lift(new SequenceEqualOperator(compareTo, comparor));
  }
  exports.sequenceEqual = sequenceEqual;
  var SequenceEqualOperator = (function() {
    function SequenceEqualOperator(compareTo, comparor) {
      this.compareTo = compareTo;
      this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
  }());
  exports.SequenceEqualOperator = SequenceEqualOperator;
  var SequenceEqualSubscriber = (function(_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
      _super.call(this, destination);
      this.compareTo = compareTo;
      this.comparor = comparor;
      this._a = [];
      this._b = [];
      this._oneComplete = false;
      this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
    }
    SequenceEqualSubscriber.prototype._next = function(value) {
      if (this._oneComplete && this._b.length === 0) {
        this.emit(false);
      } else {
        this._a.push(value);
        this.checkValues();
      }
    };
    SequenceEqualSubscriber.prototype._complete = function() {
      if (this._oneComplete) {
        this.emit(this._a.length === 0 && this._b.length === 0);
      } else {
        this._oneComplete = true;
      }
    };
    SequenceEqualSubscriber.prototype.checkValues = function() {
      var _c = this,
          _a = _c._a,
          _b = _c._b,
          comparor = _c.comparor;
      while (_a.length > 0 && _b.length > 0) {
        var a = _a.shift();
        var b = _b.shift();
        var areEqual = false;
        if (comparor) {
          areEqual = tryCatch_1.tryCatch(comparor)(a, b);
          if (areEqual === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          }
        } else {
          areEqual = a === b;
        }
        if (!areEqual) {
          this.emit(false);
        }
      }
    };
    SequenceEqualSubscriber.prototype.emit = function(value) {
      var destination = this.destination;
      destination.next(value);
      destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function(value) {
      if (this._oneComplete && this._a.length === 0) {
        this.emit(false);
      } else {
        this._b.push(value);
        this.checkValues();
      }
    };
    return SequenceEqualSubscriber;
  }(Subscriber_1.Subscriber));
  exports.SequenceEqualSubscriber = SequenceEqualSubscriber;
  var SequenceEqualCompareToSubscriber = (function(_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
      _super.call(this, destination);
      this.parent = parent;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function(value) {
      this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function(err) {
      this.parent.error(err);
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function() {
      this.parent._complete();
    };
    return SequenceEqualCompareToSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("11d", ["25", "11c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var sequenceEqual_1 = $__require('11c');
  Observable_1.Observable.prototype.sequenceEqual = sequenceEqual_1.sequenceEqual;
  return module.exports;
});

$__System.registerDynamic("f2", ["11e", "11f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MulticastObservable_1 = $__require('11e');
  var ConnectableObservable_1 = $__require('11f');
  function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
      subjectFactory = subjectOrSubjectFactory;
    } else {
      subjectFactory = function subjectFactory() {
        return subjectOrSubjectFactory;
      };
    }
    return !selector ? new ConnectableObservable_1.ConnectableObservable(this, subjectFactory) : new MulticastObservable_1.MulticastObservable(this, subjectFactory, selector);
  }
  exports.multicast = multicast;
  return module.exports;
});

$__System.registerDynamic("120", ["f2", "80"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var multicast_1 = $__require('f2');
  var Subject_1 = $__require('80');
  function shareSubjectFactory() {
    return new Subject_1.Subject();
  }
  function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
  }
  exports.share = share;
  ;
  return module.exports;
});

$__System.registerDynamic("121", ["25", "120"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var share_1 = $__require('120');
  Observable_1.Observable.prototype.share = share_1.share;
  return module.exports;
});

$__System.registerDynamic("122", ["81", "cb"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var EmptyError_1 = $__require('cb');
  function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
  }
  exports.single = single;
  var SingleOperator = (function() {
    function SingleOperator(predicate, source) {
      this.predicate = predicate;
      this.source = source;
    }
    SingleOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
  }());
  var SingleSubscriber = (function(_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.seenValue = false;
      this.index = 0;
    }
    SingleSubscriber.prototype.applySingleValue = function(value) {
      if (this.seenValue) {
        this.destination.error('Sequence contains more than one element');
      } else {
        this.seenValue = true;
        this.singleValue = value;
      }
    };
    SingleSubscriber.prototype._next = function(value) {
      var predicate = this.predicate;
      this.index++;
      if (predicate) {
        this.tryNext(value);
      } else {
        this.applySingleValue(value);
      }
    };
    SingleSubscriber.prototype.tryNext = function(value) {
      try {
        var result = this.predicate(value, this.index, this.source);
        if (result) {
          this.applySingleValue(value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    SingleSubscriber.prototype._complete = function() {
      var destination = this.destination;
      if (this.index > 0) {
        destination.next(this.seenValue ? this.singleValue : undefined);
        destination.complete();
      } else {
        destination.error(new EmptyError_1.EmptyError);
      }
    };
    return SingleSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("123", ["25", "122"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var single_1 = $__require('122');
  Observable_1.Observable.prototype.single = single_1.single;
  return module.exports;
});

$__System.registerDynamic("124", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function skip(total) {
    return this.lift(new SkipOperator(total));
  }
  exports.skip = skip;
  var SkipOperator = (function() {
    function SkipOperator(total) {
      this.total = total;
    }
    SkipOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
  }());
  var SkipSubscriber = (function(_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
      _super.call(this, destination);
      this.total = total;
      this.count = 0;
    }
    SkipSubscriber.prototype._next = function(x) {
      if (++this.count > this.total) {
        this.destination.next(x);
      }
    };
    return SkipSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("125", ["25", "124"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var skip_1 = $__require('124');
  Observable_1.Observable.prototype.skip = skip_1.skip;
  return module.exports;
});

$__System.registerDynamic("126", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
  }
  exports.skipUntil = skipUntil;
  var SkipUntilOperator = (function() {
    function SkipUntilOperator(notifier) {
      this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
    };
    return SkipUntilOperator;
  }());
  var SkipUntilSubscriber = (function(_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
      _super.call(this, destination);
      this.hasValue = false;
      this.isInnerStopped = false;
      this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    SkipUntilSubscriber.prototype._next = function(value) {
      if (this.hasValue) {
        _super.prototype._next.call(this, value);
      }
    };
    SkipUntilSubscriber.prototype._complete = function() {
      if (this.isInnerStopped) {
        _super.prototype._complete.call(this);
      } else {
        this.unsubscribe();
      }
    };
    SkipUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.hasValue = true;
    };
    SkipUntilSubscriber.prototype.notifyComplete = function() {
      this.isInnerStopped = true;
      if (this.isStopped) {
        _super.prototype._complete.call(this);
      }
    };
    return SkipUntilSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("127", ["25", "126"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var skipUntil_1 = $__require('126');
  Observable_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
  return module.exports;
});

$__System.registerDynamic("128", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
  }
  exports.skipWhile = skipWhile;
  var SkipWhileOperator = (function() {
    function SkipWhileOperator(predicate) {
      this.predicate = predicate;
    }
    SkipWhileOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    };
    return SkipWhileOperator;
  }());
  var SkipWhileSubscriber = (function(_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.skipping = true;
      this.index = 0;
    }
    SkipWhileSubscriber.prototype._next = function(value) {
      var destination = this.destination;
      if (this.skipping) {
        this.tryCallPredicate(value);
      }
      if (!this.skipping) {
        destination.next(value);
      }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function(value) {
      try {
        var result = this.predicate(value, this.index++);
        this.skipping = Boolean(result);
      } catch (err) {
        this.destination.error(err);
      }
    };
    return SkipWhileSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("129", ["25", "128"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var skipWhile_1 = $__require('128');
  Observable_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
  return module.exports;
});

$__System.registerDynamic("98", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return this.lift(new MergeAllOperator(concurrent));
  }
  exports.mergeAll = mergeAll;
  var MergeAllOperator = (function() {
    function MergeAllOperator(concurrent) {
      this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function(observer, source) {
      return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
  }());
  exports.MergeAllOperator = MergeAllOperator;
  var MergeAllSubscriber = (function(_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
      _super.call(this, destination);
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function(observable) {
      if (this.active < this.concurrent) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, observable));
      } else {
        this.buffer.push(observable);
      }
    };
    MergeAllSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeAllSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeAllSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeAllSubscriber = MergeAllSubscriber;
  return module.exports;
});

$__System.registerDynamic("35", ["2f", "31", "98"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isScheduler_1 = $__require('2f');
  var ArrayObservable_1 = $__require('31');
  var mergeAll_1 = $__require('98');
  function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return concatStatic.apply(void 0, [this].concat(observables));
  }
  exports.concat = concat;
  function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
      scheduler = args.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
  }
  exports.concatStatic = concatStatic;
  return module.exports;
});

$__System.registerDynamic("12a", ["31", "f8", "3d", "35", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ArrayObservable_1 = $__require('31');
  var ScalarObservable_1 = $__require('f8');
  var EmptyObservable_1 = $__require('3d');
  var concat_1 = $__require('35');
  var isScheduler_1 = $__require('2f');
  function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i - 0] = arguments[_i];
    }
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
      array.pop();
    } else {
      scheduler = null;
    }
    var len = array.length;
    if (len === 1) {
      return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
    } else if (len > 1) {
      return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
    } else {
      return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
    }
  }
  exports.startWith = startWith;
  return module.exports;
});

$__System.registerDynamic("12b", ["25", "12a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var startWith_1 = $__require('12a');
  Observable_1.Observable.prototype.startWith = startWith_1.startWith;
  return module.exports;
});

$__System.registerDynamic("56", ["30"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray_1 = $__require('30');
  function isNumeric(val) {
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
  }
  exports.isNumeric = isNumeric;
  ;
  return module.exports;
});

$__System.registerDynamic("12c", ["25", "12d", "56"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var asap_1 = $__require('12d');
  var isNumeric_1 = $__require('56');
  var SubscribeOnObservable = (function(_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
      if (delayTime === void 0) {
        delayTime = 0;
      }
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      _super.call(this);
      this.source = source;
      this.delayTime = delayTime;
      this.scheduler = scheduler;
      if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
        this.delayTime = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== 'function') {
        this.scheduler = asap_1.asap;
      }
    }
    SubscribeOnObservable.create = function(source, delay, scheduler) {
      if (delay === void 0) {
        delay = 0;
      }
      if (scheduler === void 0) {
        scheduler = asap_1.asap;
      }
      return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function(arg) {
      var source = arg.source,
          subscriber = arg.subscriber;
      return source.subscribe(subscriber);
    };
    SubscribeOnObservable.prototype._subscribe = function(subscriber) {
      var delay = this.delayTime;
      var source = this.source;
      var scheduler = this.scheduler;
      return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
        source: source,
        subscriber: subscriber
      });
    };
    return SubscribeOnObservable;
  }(Observable_1.Observable));
  exports.SubscribeOnObservable = SubscribeOnObservable;
  return module.exports;
});

$__System.registerDynamic("12e", ["12c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SubscribeOnObservable_1 = $__require('12c');
  function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
  }
  exports.subscribeOn = subscribeOn;
  return module.exports;
});

$__System.registerDynamic("12f", ["25", "12e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var subscribeOn_1 = $__require('12e');
  Observable_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
  return module.exports;
});

$__System.registerDynamic("130", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function _switch() {
    return this.lift(new SwitchOperator());
  }
  exports._switch = _switch;
  var SwitchOperator = (function() {
    function SwitchOperator() {}
    SwitchOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SwitchSubscriber(subscriber));
    };
    return SwitchOperator;
  }());
  var SwitchSubscriber = (function(_super) {
    __extends(SwitchSubscriber, _super);
    function SwitchSubscriber(destination) {
      _super.call(this, destination);
      this.active = 0;
      this.hasCompleted = false;
    }
    SwitchSubscriber.prototype._next = function(value) {
      this.unsubscribeInner();
      this.active++;
      this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
    };
    SwitchSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0) {
        this.destination.complete();
      }
    };
    SwitchSubscriber.prototype.unsubscribeInner = function() {
      this.active = this.active > 0 ? this.active - 1 : 0;
      var innerSubscription = this.innerSubscription;
      if (innerSubscription) {
        innerSubscription.unsubscribe();
        this.remove(innerSubscription);
      }
    };
    SwitchSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };
    SwitchSubscriber.prototype.notifyError = function(err) {
      this.destination.error(err);
    };
    SwitchSubscriber.prototype.notifyComplete = function() {
      this.unsubscribeInner();
      if (this.hasCompleted && this.active === 0) {
        this.destination.complete();
      }
    };
    return SwitchSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("131", ["25", "130"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var switch_1 = $__require('130');
  Observable_1.Observable.prototype.switch = switch_1._switch;
  Observable_1.Observable.prototype._switch = switch_1._switch;
  return module.exports;
});

$__System.registerDynamic("132", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
  }
  exports.switchMap = switchMap;
  var SwitchMapOperator = (function() {
    function SwitchMapOperator(project, resultSelector) {
      this.project = project;
      this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
  }());
  var SwitchMapSubscriber = (function(_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function(value) {
      var result;
      var index = this.index++;
      try {
        result = this.project(value, index);
      } catch (error) {
        this.destination.error(error);
        return;
      }
      this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function(result, value, index) {
      var innerSubscription = this.innerSubscription;
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function() {
      var innerSubscription = this.innerSubscription;
      if (!innerSubscription || innerSubscription.closed) {
        _super.prototype._complete.call(this);
      }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function() {
      this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function(innerSub) {
      this.remove(innerSub);
      this.innerSubscription = null;
      if (this.isStopped) {
        _super.prototype._complete.call(this);
      }
    };
    SwitchMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (this.resultSelector) {
        this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        this.destination.next(innerValue);
      }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
      var result;
      try {
        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return SwitchMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("133", ["25", "132"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var switchMap_1 = $__require('132');
  Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
  return module.exports;
});

$__System.registerDynamic("134", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function switchMapTo(innerObservable, resultSelector) {
    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
  }
  exports.switchMapTo = switchMapTo;
  var SwitchMapToOperator = (function() {
    function SwitchMapToOperator(observable, resultSelector) {
      this.observable = observable;
      this.resultSelector = resultSelector;
    }
    SwitchMapToOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
    };
    return SwitchMapToOperator;
  }());
  var SwitchMapToSubscriber = (function(_super) {
    __extends(SwitchMapToSubscriber, _super);
    function SwitchMapToSubscriber(destination, inner, resultSelector) {
      _super.call(this, destination);
      this.inner = inner;
      this.resultSelector = resultSelector;
      this.index = 0;
    }
    SwitchMapToSubscriber.prototype._next = function(value) {
      var innerSubscription = this.innerSubscription;
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
    };
    SwitchMapToSubscriber.prototype._complete = function() {
      var innerSubscription = this.innerSubscription;
      if (!innerSubscription || innerSubscription.closed) {
        _super.prototype._complete.call(this);
      }
    };
    SwitchMapToSubscriber.prototype._unsubscribe = function() {
      this.innerSubscription = null;
    };
    SwitchMapToSubscriber.prototype.notifyComplete = function(innerSub) {
      this.remove(innerSub);
      this.innerSubscription = null;
      if (this.isStopped) {
        _super.prototype._complete.call(this);
      }
    };
    SwitchMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      if (resultSelector) {
        this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        destination.next(innerValue);
      }
    };
    SwitchMapToSubscriber.prototype.tryResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      var result;
      try {
        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        destination.error(err);
        return;
      }
      destination.next(result);
    };
    return SwitchMapToSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("135", ["25", "134"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var switchMapTo_1 = $__require('134');
  Observable_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
  return module.exports;
});

$__System.registerDynamic("136", ["81", "c0", "3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var ArgumentOutOfRangeError_1 = $__require('c0');
  var EmptyObservable_1 = $__require('3d');
  function take(count) {
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else {
      return this.lift(new TakeOperator(count));
    }
  }
  exports.take = take;
  var TakeOperator = (function() {
    function TakeOperator(total) {
      this.total = total;
      if (this.total < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
      }
    }
    TakeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
  }());
  var TakeSubscriber = (function(_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
      _super.call(this, destination);
      this.total = total;
      this.count = 0;
    }
    TakeSubscriber.prototype._next = function(value) {
      var total = this.total;
      if (++this.count <= total) {
        this.destination.next(value);
        if (this.count === total) {
          this.destination.complete();
          this.unsubscribe();
        }
      }
    };
    return TakeSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("137", ["25", "136"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var take_1 = $__require('136');
  Observable_1.Observable.prototype.take = take_1.take;
  return module.exports;
});

$__System.registerDynamic("138", ["81", "c0", "3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var ArgumentOutOfRangeError_1 = $__require('c0');
  var EmptyObservable_1 = $__require('3d');
  function takeLast(count) {
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else {
      return this.lift(new TakeLastOperator(count));
    }
  }
  exports.takeLast = takeLast;
  var TakeLastOperator = (function() {
    function TakeLastOperator(total) {
      this.total = total;
      if (this.total < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
      }
    }
    TakeLastOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
  }());
  var TakeLastSubscriber = (function(_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
      _super.call(this, destination);
      this.total = total;
      this.ring = new Array();
      this.count = 0;
    }
    TakeLastSubscriber.prototype._next = function(value) {
      var ring = this.ring;
      var total = this.total;
      var count = this.count++;
      if (ring.length < total) {
        ring.push(value);
      } else {
        var index = count % total;
        ring[index] = value;
      }
    };
    TakeLastSubscriber.prototype._complete = function() {
      var destination = this.destination;
      var count = this.count;
      if (count > 0) {
        var total = this.count >= this.total ? this.total : this.count;
        var ring = this.ring;
        for (var i = 0; i < total; i++) {
          var idx = (count++) % total;
          destination.next(ring[idx]);
        }
      }
      destination.complete();
    };
    return TakeLastSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("139", ["25", "138"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var takeLast_1 = $__require('138');
  Observable_1.Observable.prototype.takeLast = takeLast_1.takeLast;
  return module.exports;
});

$__System.registerDynamic("13a", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
  }
  exports.takeUntil = takeUntil;
  var TakeUntilOperator = (function() {
    function TakeUntilOperator(notifier) {
      this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
  }());
  var TakeUntilSubscriber = (function(_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
      _super.call(this, destination);
      this.notifier = notifier;
      this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function() {};
    return TakeUntilSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("13b", ["25", "13a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var takeUntil_1 = $__require('13a');
  Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
  return module.exports;
});

$__System.registerDynamic("13c", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
  }
  exports.takeWhile = takeWhile;
  var TakeWhileOperator = (function() {
    function TakeWhileOperator(predicate) {
      this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
  }());
  var TakeWhileSubscriber = (function(_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.index = 0;
    }
    TakeWhileSubscriber.prototype._next = function(value) {
      var destination = this.destination;
      var result;
      try {
        result = this.predicate(value, this.index++);
      } catch (err) {
        destination.error(err);
        return;
      }
      this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function(value, predicateResult) {
      var destination = this.destination;
      if (Boolean(predicateResult)) {
        destination.next(value);
      } else {
        destination.complete();
      }
    };
    return TakeWhileSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("13d", ["25", "13c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var takeWhile_1 = $__require('13c');
  Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
  return module.exports;
});

$__System.registerDynamic("13e", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
  }
  exports.throttle = throttle;
  var ThrottleOperator = (function() {
    function ThrottleOperator(durationSelector) {
      this.durationSelector = durationSelector;
    }
    ThrottleOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    };
    return ThrottleOperator;
  }());
  var ThrottleSubscriber = (function(_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector) {
      _super.call(this, destination);
      this.destination = destination;
      this.durationSelector = durationSelector;
    }
    ThrottleSubscriber.prototype._next = function(value) {
      if (!this.throttled) {
        this.tryDurationSelector(value);
      }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function(value) {
      var duration = null;
      try {
        duration = this.durationSelector(value);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.emitAndThrottle(value, duration);
    };
    ThrottleSubscriber.prototype.emitAndThrottle = function(value, duration) {
      this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
      this.destination.next(value);
    };
    ThrottleSubscriber.prototype._unsubscribe = function() {
      var throttled = this.throttled;
      if (throttled) {
        this.remove(throttled);
        this.throttled = null;
        throttled.unsubscribe();
      }
    };
    ThrottleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function() {
      this._unsubscribe();
    };
    return ThrottleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("13f", ["25", "13e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var throttle_1 = $__require('13e');
  Observable_1.Observable.prototype.throttle = throttle_1.throttle;
  return module.exports;
});

$__System.registerDynamic("140", ["81", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var async_1 = $__require('57');
  function throttleTime(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new ThrottleTimeOperator(duration, scheduler));
  }
  exports.throttleTime = throttleTime;
  var ThrottleTimeOperator = (function() {
    function ThrottleTimeOperator(duration, scheduler) {
      this.duration = duration;
      this.scheduler = scheduler;
    }
    ThrottleTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
    };
    return ThrottleTimeOperator;
  }());
  var ThrottleTimeSubscriber = (function(_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler) {
      _super.call(this, destination);
      this.duration = duration;
      this.scheduler = scheduler;
    }
    ThrottleTimeSubscriber.prototype._next = function(value) {
      if (!this.throttled) {
        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, {subscriber: this}));
        this.destination.next(value);
      }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function() {
      var throttled = this.throttled;
      if (throttled) {
        throttled.unsubscribe();
        this.remove(throttled);
        this.throttled = null;
      }
    };
    return ThrottleTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
  }
  return module.exports;
});

$__System.registerDynamic("141", ["25", "140"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var throttleTime_1 = $__require('140');
  Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
  return module.exports;
});

$__System.registerDynamic("142", ["25", "143"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var timeInterval_1 = $__require('143');
  Observable_1.Observable.prototype.timeInterval = timeInterval_1.timeInterval;
  return module.exports;
});

$__System.registerDynamic("144", ["57", "74", "81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('57');
  var isDate_1 = $__require('74');
  var Subscriber_1 = $__require('81');
  function timeout(due, errorToSend, scheduler) {
    if (errorToSend === void 0) {
      errorToSend = null;
    }
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
  }
  exports.timeout = timeout;
  var TimeoutOperator = (function() {
    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
      this.waitFor = waitFor;
      this.absoluteTimeout = absoluteTimeout;
      this.errorToSend = errorToSend;
      this.scheduler = scheduler;
    }
    TimeoutOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler));
    };
    return TimeoutOperator;
  }());
  var TimeoutSubscriber = (function(_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
      _super.call(this, destination);
      this.absoluteTimeout = absoluteTimeout;
      this.waitFor = waitFor;
      this.errorToSend = errorToSend;
      this.scheduler = scheduler;
      this.index = 0;
      this._previousIndex = 0;
      this._hasCompleted = false;
      this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
      get: function() {
        return this._previousIndex;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
      get: function() {
        return this._hasCompleted;
      },
      enumerable: true,
      configurable: true
    });
    TimeoutSubscriber.dispatchTimeout = function(state) {
      var source = state.subscriber;
      var currentIndex = state.index;
      if (!source.hasCompleted && source.previousIndex === currentIndex) {
        source.notifyTimeout();
      }
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function() {
      var currentIndex = this.index;
      this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, {
        subscriber: this,
        index: currentIndex
      });
      this.index++;
      this._previousIndex = currentIndex;
    };
    TimeoutSubscriber.prototype._next = function(value) {
      this.destination.next(value);
      if (!this.absoluteTimeout) {
        this.scheduleTimeout();
      }
    };
    TimeoutSubscriber.prototype._error = function(err) {
      this.destination.error(err);
      this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype._complete = function() {
      this.destination.complete();
      this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype.notifyTimeout = function() {
      this.error(this.errorToSend || new Error('timeout'));
    };
    return TimeoutSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("145", ["25", "144"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var timeout_1 = $__require('144');
  Observable_1.Observable.prototype.timeout = timeout_1.timeout;
  return module.exports;
});

$__System.registerDynamic("74", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isDate(value) {
    return value instanceof Date && !isNaN(+value);
  }
  exports.isDate = isDate;
  return module.exports;
});

$__System.registerDynamic("146", ["57", "74", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('57');
  var isDate_1 = $__require('74');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
  }
  exports.timeoutWith = timeoutWith;
  var TimeoutWithOperator = (function() {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
      this.waitFor = waitFor;
      this.absoluteTimeout = absoluteTimeout;
      this.withObservable = withObservable;
      this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
  }());
  var TimeoutWithSubscriber = (function(_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
      _super.call(this);
      this.destination = destination;
      this.absoluteTimeout = absoluteTimeout;
      this.waitFor = waitFor;
      this.withObservable = withObservable;
      this.scheduler = scheduler;
      this.timeoutSubscription = undefined;
      this.index = 0;
      this._previousIndex = 0;
      this._hasCompleted = false;
      destination.add(this);
      this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
      get: function() {
        return this._previousIndex;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
      get: function() {
        return this._hasCompleted;
      },
      enumerable: true,
      configurable: true
    });
    TimeoutWithSubscriber.dispatchTimeout = function(state) {
      var source = state.subscriber;
      var currentIndex = state.index;
      if (!source.hasCompleted && source.previousIndex === currentIndex) {
        source.handleTimeout();
      }
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function() {
      var currentIndex = this.index;
      var timeoutState = {
        subscriber: this,
        index: currentIndex
      };
      this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
      this.index++;
      this._previousIndex = currentIndex;
    };
    TimeoutWithSubscriber.prototype._next = function(value) {
      this.destination.next(value);
      if (!this.absoluteTimeout) {
        this.scheduleTimeout();
      }
    };
    TimeoutWithSubscriber.prototype._error = function(err) {
      this.destination.error(err);
      this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype._complete = function() {
      this.destination.complete();
      this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype.handleTimeout = function() {
      if (!this.closed) {
        var withObservable = this.withObservable;
        this.unsubscribe();
        this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
      }
    };
    return TimeoutWithSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("147", ["25", "146"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var timeoutWith_1 = $__require('146');
  Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
  return module.exports;
});

$__System.registerDynamic("148", ["25", "149"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var timestamp_1 = $__require('149');
  Observable_1.Observable.prototype.timestamp = timestamp_1.timestamp;
  return module.exports;
});

$__System.registerDynamic("14a", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function toArray() {
    return this.lift(new ToArrayOperator());
  }
  exports.toArray = toArray;
  var ToArrayOperator = (function() {
    function ToArrayOperator() {}
    ToArrayOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ToArraySubscriber(subscriber));
    };
    return ToArrayOperator;
  }());
  var ToArraySubscriber = (function(_super) {
    __extends(ToArraySubscriber, _super);
    function ToArraySubscriber(destination) {
      _super.call(this, destination);
      this.array = [];
    }
    ToArraySubscriber.prototype._next = function(x) {
      this.array.push(x);
    };
    ToArraySubscriber.prototype._complete = function() {
      this.destination.next(this.array);
      this.destination.complete();
    };
    return ToArraySubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("14b", ["25", "14a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var toArray_1 = $__require('14a');
  Observable_1.Observable.prototype.toArray = toArray_1.toArray;
  return module.exports;
});

$__System.registerDynamic("14c", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }
    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  }
  exports.toPromise = toPromise;
  return module.exports;
});

$__System.registerDynamic("14d", ["25", "14c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var toPromise_1 = $__require('14c');
  Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
  return module.exports;
});

$__System.registerDynamic("14e", ["80", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
  }
  exports.window = window;
  var WindowOperator = (function() {
    function WindowOperator(windowBoundaries) {
      this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function(subscriber, source) {
      var windowSubscriber = new WindowSubscriber(subscriber);
      var sourceSubscription = source._subscribe(windowSubscriber);
      if (!sourceSubscription.closed) {
        windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
      }
      return sourceSubscription;
    };
    return WindowOperator;
  }());
  var WindowSubscriber = (function(_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
      _super.call(this, destination);
      this.window = new Subject_1.Subject();
      destination.next(this.window);
    }
    WindowSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function(error, innerSub) {
      this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function(innerSub) {
      this._complete();
    };
    WindowSubscriber.prototype._next = function(value) {
      this.window.next(value);
    };
    WindowSubscriber.prototype._error = function(err) {
      this.window.error(err);
      this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function() {
      this.window.complete();
      this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function() {
      this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function() {
      var prevWindow = this.window;
      if (prevWindow) {
        prevWindow.complete();
      }
      var destination = this.destination;
      var newWindow = this.window = new Subject_1.Subject();
      destination.next(newWindow);
    };
    return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("14f", ["25", "14e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var window_1 = $__require('14e');
  Observable_1.Observable.prototype.window = window_1.window;
  return module.exports;
});

$__System.registerDynamic("150", ["81", "80"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Subject_1 = $__require('80');
  function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) {
      startWindowEvery = 0;
    }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
  }
  exports.windowCount = windowCount;
  var WindowCountOperator = (function() {
    function WindowCountOperator(windowSize, startWindowEvery) {
      this.windowSize = windowSize;
      this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
  }());
  var WindowCountSubscriber = (function(_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
      _super.call(this, destination);
      this.destination = destination;
      this.windowSize = windowSize;
      this.startWindowEvery = startWindowEvery;
      this.windows = [new Subject_1.Subject()];
      this.count = 0;
      destination.next(this.windows[0]);
    }
    WindowCountSubscriber.prototype._next = function(value) {
      var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
      var destination = this.destination;
      var windowSize = this.windowSize;
      var windows = this.windows;
      var len = windows.length;
      for (var i = 0; i < len && !this.closed; i++) {
        windows[i].next(value);
      }
      var c = this.count - windowSize + 1;
      if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
        windows.shift().complete();
      }
      if (++this.count % startWindowEvery === 0 && !this.closed) {
        var window_1 = new Subject_1.Subject();
        windows.push(window_1);
        destination.next(window_1);
      }
    };
    WindowCountSubscriber.prototype._error = function(err) {
      var windows = this.windows;
      if (windows) {
        while (windows.length > 0 && !this.closed) {
          windows.shift().error(err);
        }
      }
      this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function() {
      var windows = this.windows;
      if (windows) {
        while (windows.length > 0 && !this.closed) {
          windows.shift().complete();
        }
      }
      this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function() {
      this.count = 0;
      this.windows = null;
    };
    return WindowCountSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("151", ["25", "150"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var windowCount_1 = $__require('150');
  Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
  return module.exports;
});

$__System.registerDynamic("152", ["80", "57", "81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var async_1 = $__require('57');
  var Subscriber_1 = $__require('81');
  function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
    if (windowCreationInterval === void 0) {
      windowCreationInterval = null;
    }
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
  }
  exports.windowTime = windowTime;
  var WindowTimeOperator = (function() {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
      this.windowTimeSpan = windowTimeSpan;
      this.windowCreationInterval = windowCreationInterval;
      this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
    };
    return WindowTimeOperator;
  }());
  var WindowTimeSubscriber = (function(_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
      _super.call(this, destination);
      this.destination = destination;
      this.windowTimeSpan = windowTimeSpan;
      this.windowCreationInterval = windowCreationInterval;
      this.scheduler = scheduler;
      this.windows = [];
      if (windowCreationInterval !== null && windowCreationInterval >= 0) {
        var window_1 = this.openWindow();
        var closeState = {
          subscriber: this,
          window: window_1,
          context: null
        };
        var creationState = {
          windowTimeSpan: windowTimeSpan,
          windowCreationInterval: windowCreationInterval,
          subscriber: this,
          scheduler: scheduler
        };
        this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
        this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
      } else {
        var window_2 = this.openWindow();
        var timeSpanOnlyState = {
          subscriber: this,
          window: window_2,
          windowTimeSpan: windowTimeSpan
        };
        this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
      }
    }
    WindowTimeSubscriber.prototype._next = function(value) {
      var windows = this.windows;
      var len = windows.length;
      for (var i = 0; i < len; i++) {
        var window_3 = windows[i];
        if (!window_3.closed) {
          window_3.next(value);
        }
      }
    };
    WindowTimeSubscriber.prototype._error = function(err) {
      var windows = this.windows;
      while (windows.length > 0) {
        windows.shift().error(err);
      }
      this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function() {
      var windows = this.windows;
      while (windows.length > 0) {
        var window_4 = windows.shift();
        if (!window_4.closed) {
          window_4.complete();
        }
      }
      this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function() {
      var window = new Subject_1.Subject();
      this.windows.push(window);
      var destination = this.destination;
      destination.next(window);
      return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function(window) {
      window.complete();
      var windows = this.windows;
      windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber,
        windowTimeSpan = state.windowTimeSpan,
        window = state.window;
    if (window) {
      window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
  }
  function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler,
        windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = {
      action: action,
      subscription: null
    };
    var timeSpanState = {
      subscriber: subscriber,
      window: window,
      context: context
    };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
  }
  function dispatchWindowClose(arg) {
    var subscriber = arg.subscriber,
        window = arg.window,
        context = arg.context;
    if (context && context.action && context.subscription) {
      context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
  }
  return module.exports;
});

$__System.registerDynamic("153", ["25", "152"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var windowTime_1 = $__require('152');
  Observable_1.Observable.prototype.windowTime = windowTime_1.windowTime;
  return module.exports;
});

$__System.registerDynamic("154", ["80", "47", "26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var Subscription_1 = $__require('47');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
  }
  exports.windowToggle = windowToggle;
  var WindowToggleOperator = (function() {
    function WindowToggleOperator(openings, closingSelector) {
      this.openings = openings;
      this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
  }());
  var WindowToggleSubscriber = (function(_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
      _super.call(this, destination);
      this.openings = openings;
      this.closingSelector = closingSelector;
      this.contexts = [];
      this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
    }
    WindowToggleSubscriber.prototype._next = function(value) {
      var contexts = this.contexts;
      if (contexts) {
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
          contexts[i].window.next(value);
        }
      }
    };
    WindowToggleSubscriber.prototype._error = function(err) {
      var contexts = this.contexts;
      this.contexts = null;
      if (contexts) {
        var len = contexts.length;
        var index = -1;
        while (++index < len) {
          var context = contexts[index];
          context.window.error(err);
          context.subscription.unsubscribe();
        }
      }
      _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function() {
      var contexts = this.contexts;
      this.contexts = null;
      if (contexts) {
        var len = contexts.length;
        var index = -1;
        while (++index < len) {
          var context = contexts[index];
          context.window.complete();
          context.subscription.unsubscribe();
        }
      }
      _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function() {
      var contexts = this.contexts;
      this.contexts = null;
      if (contexts) {
        var len = contexts.length;
        var index = -1;
        while (++index < len) {
          var context = contexts[index];
          context.window.unsubscribe();
          context.subscription.unsubscribe();
        }
      }
    };
    WindowToggleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (outerValue === this.openings) {
        var closingSelector = this.closingSelector;
        var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
        if (closingNotifier === errorObject_1.errorObject) {
          return this.error(errorObject_1.errorObject.e);
        } else {
          var window_1 = new Subject_1.Subject();
          var subscription = new Subscription_1.Subscription();
          var context = {
            window: window_1,
            subscription: subscription
          };
          this.contexts.push(context);
          var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
          if (innerSubscription.closed) {
            this.closeWindow(this.contexts.length - 1);
          } else {
            innerSubscription.context = context;
            subscription.add(innerSubscription);
          }
          this.destination.next(window_1);
        }
      } else {
        this.closeWindow(this.contexts.indexOf(outerValue));
      }
    };
    WindowToggleSubscriber.prototype.notifyError = function(err) {
      this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function(inner) {
      if (inner !== this.openSubscription) {
        this.closeWindow(this.contexts.indexOf(inner.context));
      }
    };
    WindowToggleSubscriber.prototype.closeWindow = function(index) {
      if (index === -1) {
        return;
      }
      var contexts = this.contexts;
      var context = contexts[index];
      var window = context.window,
          subscription = context.subscription;
      contexts.splice(index, 1);
      window.complete();
      subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("155", ["25", "154"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var windowToggle_1 = $__require('154');
  Observable_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
  return module.exports;
});

$__System.registerDynamic("156", ["80", "26", "27", "39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
  }
  exports.windowWhen = windowWhen;
  var WindowOperator = (function() {
    function WindowOperator(closingSelector) {
      this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
  }());
  var WindowSubscriber = (function(_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
      _super.call(this, destination);
      this.destination = destination;
      this.closingSelector = closingSelector;
      this.openWindow();
    }
    WindowSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function(error, innerSub) {
      this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function(innerSub) {
      this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function(value) {
      this.window.next(value);
    };
    WindowSubscriber.prototype._error = function(err) {
      this.window.error(err);
      this.destination.error(err);
      this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function() {
      this.window.complete();
      this.destination.complete();
      this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function() {
      if (this.closingNotification) {
        this.closingNotification.unsubscribe();
      }
    };
    WindowSubscriber.prototype.openWindow = function(innerSub) {
      if (innerSub === void 0) {
        innerSub = null;
      }
      if (innerSub) {
        this.remove(innerSub);
        innerSub.unsubscribe();
      }
      var prevWindow = this.window;
      if (prevWindow) {
        prevWindow.complete();
      }
      var window = this.window = new Subject_1.Subject();
      this.destination.next(window);
      var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
      if (closingNotifier === errorObject_1.errorObject) {
        var err = errorObject_1.errorObject.e;
        this.destination.error(err);
        this.window.error(err);
      } else {
        this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
      }
    };
    return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("157", ["25", "156"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var windowWhen_1 = $__require('156');
  Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
  return module.exports;
});

$__System.registerDynamic("158", ["39", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
      project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
  }
  exports.withLatestFrom = withLatestFrom;
  var WithLatestFromOperator = (function() {
    function WithLatestFromOperator(observables, project) {
      this.observables = observables;
      this.project = project;
    }
    WithLatestFromOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
  }());
  var WithLatestFromSubscriber = (function(_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
      _super.call(this, destination);
      this.observables = observables;
      this.project = project;
      this.toRespond = [];
      var len = observables.length;
      this.values = new Array(len);
      for (var i = 0; i < len; i++) {
        this.toRespond.push(i);
      }
      for (var i = 0; i < len; i++) {
        var observable = observables[i];
        this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
      }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.values[outerIndex] = innerValue;
      var toRespond = this.toRespond;
      if (toRespond.length > 0) {
        var found = toRespond.indexOf(outerIndex);
        if (found !== -1) {
          toRespond.splice(found, 1);
        }
      }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function() {};
    WithLatestFromSubscriber.prototype._next = function(value) {
      if (this.toRespond.length === 0) {
        var args = [value].concat(this.values);
        if (this.project) {
          this._tryProject(args);
        } else {
          this.destination.next(args);
        }
      }
    };
    WithLatestFromSubscriber.prototype._tryProject = function(args) {
      var result;
      try {
        result = this.project.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return WithLatestFromSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("159", ["25", "158"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var withLatestFrom_1 = $__require('158');
  Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
  return module.exports;
});

$__System.registerDynamic("15a", ["25", "78"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var zip_1 = $__require('78');
  Observable_1.Observable.prototype.zip = zip_1.zipProto;
  return module.exports;
});

$__System.registerDynamic("f8", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var ScalarObservable = (function(_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
      _super.call(this);
      this.value = value;
      this.scheduler = scheduler;
      this._isScalar = true;
      if (scheduler) {
        this._isScalar = false;
      }
    }
    ScalarObservable.create = function(value, scheduler) {
      return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function(state) {
      var done = state.done,
          value = state.value,
          subscriber = state.subscriber;
      if (done) {
        subscriber.complete();
        return;
      }
      subscriber.next(value);
      if (subscriber.closed) {
        return;
      }
      state.done = true;
      this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function(subscriber) {
      var value = this.value;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ScalarObservable.dispatch, 0, {
          done: false,
          value: value,
          subscriber: subscriber
        });
      } else {
        subscriber.next(value);
        if (!subscriber.closed) {
          subscriber.complete();
        }
      }
    };
    return ScalarObservable;
  }(Observable_1.Observable));
  exports.ScalarObservable = ScalarObservable;
  return module.exports;
});

$__System.registerDynamic("3d", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var EmptyObservable = (function(_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
      _super.call(this);
      this.scheduler = scheduler;
    }
    EmptyObservable.create = function(scheduler) {
      return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function(arg) {
      var subscriber = arg.subscriber;
      subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function(subscriber) {
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(EmptyObservable.dispatch, 0, {subscriber: subscriber});
      } else {
        subscriber.complete();
      }
    };
    return EmptyObservable;
  }(Observable_1.Observable));
  exports.EmptyObservable = EmptyObservable;
  return module.exports;
});

$__System.registerDynamic("2f", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isScheduler(value) {
    return value && typeof value.schedule === 'function';
  }
  exports.isScheduler = isScheduler;
  return module.exports;
});

$__System.registerDynamic("31", ["25", "f8", "3d", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var ScalarObservable_1 = $__require('f8');
  var EmptyObservable_1 = $__require('3d');
  var isScheduler_1 = $__require('2f');
  var ArrayObservable = (function(_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
      _super.call(this);
      this.array = array;
      this.scheduler = scheduler;
      if (!scheduler && array.length === 1) {
        this._isScalar = true;
        this.value = array[0];
      }
    }
    ArrayObservable.create = function(array, scheduler) {
      return new ArrayObservable(array, scheduler);
    };
    ArrayObservable.of = function() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len > 1) {
        return new ArrayObservable(array, scheduler);
      } else if (len === 1) {
        return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
      } else {
        return new EmptyObservable_1.EmptyObservable(scheduler);
      }
    };
    ArrayObservable.dispatch = function(state) {
      var array = state.array,
          index = state.index,
          count = state.count,
          subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(array[index]);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var array = this.array;
      var count = array.length;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ArrayObservable.dispatch, 0, {
          array: array,
          index: index,
          count: count,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < count && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      }
    };
    return ArrayObservable;
  }(Observable_1.Observable));
  exports.ArrayObservable = ArrayObservable;
  return module.exports;
});

$__System.registerDynamic("39", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var OuterSubscriber = (function(_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
      _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function(error, innerSub) {
      this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function(innerSub) {
      this.destination.complete();
    };
    return OuterSubscriber;
  }(Subscriber_1.Subscriber));
  exports.OuterSubscriber = OuterSubscriber;
  return module.exports;
});

$__System.registerDynamic("f9", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }
  exports.isPromise = isPromise;
  return module.exports;
});

$__System.registerDynamic("15b", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var InnerSubscriber = (function(_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
      _super.call(this);
      this.parent = parent;
      this.outerValue = outerValue;
      this.outerIndex = outerIndex;
      this.index = 0;
    }
    InnerSubscriber.prototype._next = function(value) {
      this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function(error) {
      this.parent.notifyError(error, this);
      this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function() {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    };
    return InnerSubscriber;
  }(Subscriber_1.Subscriber));
  exports.InnerSubscriber = InnerSubscriber;
  return module.exports;
});

$__System.registerDynamic("38", ["7e", "30", "f9", "25", "f6", "15b", "fa"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var isArray_1 = $__require('30');
  var isPromise_1 = $__require('f9');
  var Observable_1 = $__require('25');
  var iterator_1 = $__require('f6');
  var InnerSubscriber_1 = $__require('15b');
  var observable_1 = $__require('fa');
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
      return null;
    }
    if (result instanceof Observable_1.Observable) {
      if (result._isScalar) {
        destination.next(result.value);
        destination.complete();
        return null;
      } else {
        return result.subscribe(destination);
      }
    }
    if (isArray_1.isArray(result)) {
      for (var i = 0,
          len = result.length; i < len && !destination.closed; i++) {
        destination.next(result[i]);
      }
      if (!destination.closed) {
        destination.complete();
      }
    } else if (isPromise_1.isPromise(result)) {
      result.then(function(value) {
        if (!destination.closed) {
          destination.next(value);
          destination.complete();
        }
      }, function(err) {
        return destination.error(err);
      }).then(null, function(err) {
        root_1.root.setTimeout(function() {
          throw err;
        });
      });
      return destination;
    } else if (typeof result[iterator_1.$$iterator] === 'function') {
      var iterator = result[iterator_1.$$iterator]();
      do {
        var item = iterator.next();
        if (item.done) {
          destination.complete();
          break;
        }
        destination.next(item.value);
        if (destination.closed) {
          break;
        }
      } while (true);
    } else if (typeof result[observable_1.$$observable] === 'function') {
      var obs = result[observable_1.$$observable]();
      if (typeof obs.subscribe !== 'function') {
        destination.error(new Error('invalid observable'));
      } else {
        return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
      }
    } else {
      destination.error(new TypeError('unknown type returned'));
    }
    return null;
  }
  exports.subscribeToResult = subscribeToResult;
  return module.exports;
});

$__System.registerDynamic("78", ["31", "30", "81", "39", "38", "f6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArrayObservable_1 = $__require('31');
  var isArray_1 = $__require('30');
  var Subscriber_1 = $__require('81');
  var OuterSubscriber_1 = $__require('39');
  var subscribeToResult_1 = $__require('38');
  var iterator_1 = $__require('f6');
  function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return zipStatic.apply(this, observables);
  }
  exports.zipProto = zipProto;
  function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
      observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
  }
  exports.zipStatic = zipStatic;
  var ZipOperator = (function() {
    function ZipOperator(project) {
      this.project = project;
    }
    ZipOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
  }());
  exports.ZipOperator = ZipOperator;
  var ZipSubscriber = (function(_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
      if (values === void 0) {
        values = Object.create(null);
      }
      _super.call(this, destination);
      this.index = 0;
      this.iterators = [];
      this.active = 0;
      this.project = (typeof project === 'function') ? project : null;
      this.values = values;
    }
    ZipSubscriber.prototype._next = function(value) {
      var iterators = this.iterators;
      var index = this.index++;
      if (isArray_1.isArray(value)) {
        iterators.push(new StaticArrayIterator(value));
      } else if (typeof value[iterator_1.$$iterator] === 'function') {
        iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
      } else {
        iterators.push(new ZipBufferIterator(this.destination, this, value, index));
      }
    };
    ZipSubscriber.prototype._complete = function() {
      var iterators = this.iterators;
      var len = iterators.length;
      this.active = len;
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        if (iterator.stillUnsubscribed) {
          this.add(iterator.subscribe(iterator, i));
        } else {
          this.active--;
        }
      }
    };
    ZipSubscriber.prototype.notifyInactive = function() {
      this.active--;
      if (this.active === 0) {
        this.destination.complete();
      }
    };
    ZipSubscriber.prototype.checkIterators = function() {
      var iterators = this.iterators;
      var len = iterators.length;
      var destination = this.destination;
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
          return;
        }
      }
      var shouldComplete = false;
      var args = [];
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        var result = iterator.next();
        if (iterator.hasCompleted()) {
          shouldComplete = true;
        }
        if (result.done) {
          destination.complete();
          return;
        }
        args.push(result.value);
      }
      if (this.project) {
        this._tryProject(args);
      } else {
        destination.next(args);
      }
      if (shouldComplete) {
        destination.complete();
      }
    };
    ZipSubscriber.prototype._tryProject = function(args) {
      var result;
      try {
        result = this.project.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return ZipSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ZipSubscriber = ZipSubscriber;
  var StaticIterator = (function() {
    function StaticIterator(iterator) {
      this.iterator = iterator;
      this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function() {
      return true;
    };
    StaticIterator.prototype.next = function() {
      var result = this.nextResult;
      this.nextResult = this.iterator.next();
      return result;
    };
    StaticIterator.prototype.hasCompleted = function() {
      var nextResult = this.nextResult;
      return nextResult && nextResult.done;
    };
    return StaticIterator;
  }());
  var StaticArrayIterator = (function() {
    function StaticArrayIterator(array) {
      this.array = array;
      this.index = 0;
      this.length = 0;
      this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.$$iterator] = function() {
      return this;
    };
    StaticArrayIterator.prototype.next = function(value) {
      var i = this.index++;
      var array = this.array;
      return i < this.length ? {
        value: array[i],
        done: false
      } : {
        value: null,
        done: true
      };
    };
    StaticArrayIterator.prototype.hasValue = function() {
      return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function() {
      return this.array.length === this.index;
    };
    return StaticArrayIterator;
  }());
  var ZipBufferIterator = (function(_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable, index) {
      _super.call(this, destination);
      this.parent = parent;
      this.observable = observable;
      this.index = index;
      this.stillUnsubscribed = true;
      this.buffer = [];
      this.isComplete = false;
    }
    ZipBufferIterator.prototype[iterator_1.$$iterator] = function() {
      return this;
    };
    ZipBufferIterator.prototype.next = function() {
      var buffer = this.buffer;
      if (buffer.length === 0 && this.isComplete) {
        return {
          value: null,
          done: true
        };
      } else {
        return {
          value: buffer.shift(),
          done: false
        };
      }
    };
    ZipBufferIterator.prototype.hasValue = function() {
      return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function() {
      return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function() {
      if (this.buffer.length > 0) {
        this.isComplete = true;
        this.parent.notifyInactive();
      } else {
        this.destination.complete();
      }
    };
    ZipBufferIterator.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.buffer.push(innerValue);
      this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function(value, index) {
      return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("15c", ["78"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var zip_1 = $__require('78');
  function zipAll(project) {
    return this.lift(new zip_1.ZipOperator(project));
  }
  exports.zipAll = zipAll;
  return module.exports;
});

$__System.registerDynamic("15d", ["25", "15c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var zipAll_1 = $__require('15c');
  Observable_1.Observable.prototype.zipAll = zipAll_1.zipAll;
  return module.exports;
});

$__System.registerDynamic("28", ["80", "47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var Subscription_1 = $__require('47');
  var AsyncSubject = (function(_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
      _super.apply(this, arguments);
      this.value = null;
      this.hasNext = false;
      this.hasCompleted = false;
    }
    AsyncSubject.prototype._subscribe = function(subscriber) {
      if (this.hasCompleted && this.hasNext) {
        subscriber.next(this.value);
        subscriber.complete();
        return Subscription_1.Subscription.EMPTY;
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription_1.Subscription.EMPTY;
      }
      return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function(value) {
      if (!this.hasCompleted) {
        this.value = value;
        this.hasNext = true;
      }
    };
    AsyncSubject.prototype.complete = function() {
      this.hasCompleted = true;
      if (this.hasNext) {
        _super.prototype.next.call(this, this.value);
      }
      _super.prototype.complete.call(this);
    };
    return AsyncSubject;
  }(Subject_1.Subject));
  exports.AsyncSubject = AsyncSubject;
  return module.exports;
});

$__System.registerDynamic("f4", ["81", "ab"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var Notification_1 = $__require('ab');
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return this.lift(new ObserveOnOperator(scheduler, delay));
  }
  exports.observeOn = observeOn;
  var ObserveOnOperator = (function() {
    function ObserveOnOperator(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
  }());
  exports.ObserveOnOperator = ObserveOnOperator;
  var ObserveOnSubscriber = (function(_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      _super.call(this, destination);
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function(arg) {
      var notification = arg.notification,
          destination = arg.destination;
      notification.observe(destination);
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
      this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function(value) {
      this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function(err) {
      this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function() {
      this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ObserveOnSubscriber = ObserveOnSubscriber;
  var ObserveOnMessage = (function() {
    function ObserveOnMessage(notification, destination) {
      this.notification = notification;
      this.destination = destination;
    }
    return ObserveOnMessage;
  }());
  exports.ObserveOnMessage = ObserveOnMessage;
  return module.exports;
});

$__System.registerDynamic("82", ["80", "15e", "f4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var queue_1 = $__require('15e');
  var observeOn_1 = $__require('f4');
  var ReplaySubject = (function(_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }
      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }
      _super.call(this);
      this.scheduler = scheduler;
      this._events = [];
      this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
      this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function(value) {
      var now = this._getNow();
      this._events.push(new ReplayEvent(now, value));
      this._trimBufferThenGetEvents();
      _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function(subscriber) {
      var _events = this._trimBufferThenGetEvents();
      var scheduler = this.scheduler;
      if (scheduler) {
        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
      }
      var len = _events.length;
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i].value);
      }
      return _super.prototype._subscribe.call(this, subscriber);
    };
    ReplaySubject.prototype._getNow = function() {
      return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function() {
      var now = this._getNow();
      var _bufferSize = this._bufferSize;
      var _windowTime = this._windowTime;
      var _events = this._events;
      var eventsCount = _events.length;
      var spliceCount = 0;
      while (spliceCount < eventsCount) {
        if ((now - _events[spliceCount].time) < _windowTime) {
          break;
        }
        spliceCount++;
      }
      if (eventsCount > _bufferSize) {
        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
      }
      if (spliceCount > 0) {
        _events.splice(0, spliceCount);
      }
      return _events;
    };
    return ReplaySubject;
  }(Subject_1.Subject));
  exports.ReplaySubject = ReplaySubject;
  var ReplayEvent = (function() {
    function ReplayEvent(time, value) {
      this.time = time;
      this.value = value;
    }
    return ReplayEvent;
  }());
  return module.exports;
});

$__System.registerDynamic("106", ["80", "15f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var ObjectUnsubscribedError_1 = $__require('15f');
  var BehaviorSubject = (function(_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
      _super.call(this);
      this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: true,
      configurable: true
    });
    BehaviorSubject.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      if (subscription && !subscription.closed) {
        subscriber.next(this._value);
      }
      return subscription;
    };
    BehaviorSubject.prototype.getValue = function() {
      if (this.hasError) {
        throw this.thrownError;
      } else if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      } else {
        return this._value;
      }
    };
    BehaviorSubject.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
  }(Subject_1.Subject));
  exports.BehaviorSubject = BehaviorSubject;
  return module.exports;
});

$__System.registerDynamic("11e", ["25", "11f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var ConnectableObservable_1 = $__require('11f');
  var MulticastObservable = (function(_super) {
    __extends(MulticastObservable, _super);
    function MulticastObservable(source, subjectFactory, selector) {
      _super.call(this);
      this.source = source;
      this.subjectFactory = subjectFactory;
      this.selector = selector;
    }
    MulticastObservable.prototype._subscribe = function(subscriber) {
      var _a = this,
          selector = _a.selector,
          source = _a.source;
      var connectable = new ConnectableObservable_1.ConnectableObservable(source, this.subjectFactory);
      var subscription = selector(connectable).subscribe(subscriber);
      subscription.add(connectable.connect());
      return subscription;
    };
    return MulticastObservable;
  }(Observable_1.Observable));
  exports.MulticastObservable = MulticastObservable;
  return module.exports;
});

$__System.registerDynamic("11f", ["80", "25", "81", "47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var Observable_1 = $__require('25');
  var Subscriber_1 = $__require('81');
  var Subscription_1 = $__require('47');
  var ConnectableObservable = (function(_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
      _super.call(this);
      this.source = source;
      this.subjectFactory = subjectFactory;
      this._refCount = 0;
    }
    ConnectableObservable.prototype._subscribe = function(subscriber) {
      return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function() {
      var subject = this._subject;
      if (!subject || subject.isStopped) {
        this._subject = this.subjectFactory();
      }
      return this._subject;
    };
    ConnectableObservable.prototype.connect = function() {
      var connection = this._connection;
      if (!connection) {
        connection = this._connection = new Subscription_1.Subscription();
        connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
        if (connection.closed) {
          this._connection = null;
          connection = Subscription_1.Subscription.EMPTY;
        } else {
          this._connection = connection;
        }
      }
      return connection;
    };
    ConnectableObservable.prototype.refCount = function() {
      return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
  }(Observable_1.Observable));
  exports.ConnectableObservable = ConnectableObservable;
  var ConnectableSubscriber = (function(_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
      _super.call(this, destination);
      this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function(err) {
      this._unsubscribe();
      _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function() {
      this._unsubscribe();
      _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function() {
      var connectable = this.connectable;
      if (connectable) {
        this.connectable = null;
        var connection = connectable._connection;
        connectable._refCount = 0;
        connectable._subject = null;
        connectable._connection = null;
        if (connection) {
          connection.unsubscribe();
        }
      }
    };
    return ConnectableSubscriber;
  }(Subject_1.SubjectSubscriber));
  var RefCountOperator = (function() {
    function RefCountOperator(connectable) {
      this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function(subscriber, source) {
      var connectable = this.connectable;
      connectable._refCount++;
      var refCounter = new RefCountSubscriber(subscriber, connectable);
      var subscription = source._subscribe(refCounter);
      if (!refCounter.closed) {
        refCounter.connection = connectable.connect();
      }
      return subscription;
    };
    return RefCountOperator;
  }());
  var RefCountSubscriber = (function(_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
      _super.call(this, destination);
      this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function() {
      var connectable = this.connectable;
      if (!connectable) {
        this.connection = null;
        return;
      }
      this.connectable = null;
      var refCount = connectable._refCount;
      if (refCount <= 0) {
        this.connection = null;
        return;
      }
      connectable._refCount = refCount - 1;
      if (refCount > 1) {
        this.connection = null;
        return;
      }
      var connection = this.connection;
      var sharedConnection = connectable._connection;
      this.connection = null;
      if (sharedConnection && (!connection || sharedConnection === connection)) {
        sharedConnection.unsubscribe();
      }
    };
    return RefCountSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("cb", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var EmptyError = (function(_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
      var err = _super.call(this, 'no elements in sequence');
      this.name = err.name = 'EmptyError';
      this.stack = err.stack;
      this.message = err.message;
    }
    return EmptyError;
  }(Error));
  exports.EmptyError = EmptyError;
  return module.exports;
});

$__System.registerDynamic("c0", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArgumentOutOfRangeError = (function(_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
      var err = _super.call(this, 'argument out of range');
      this.name = err.name = 'ArgumentOutOfRangeError';
      this.stack = err.stack;
      this.message = err.message;
    }
    return ArgumentOutOfRangeError;
  }(Error));
  exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
  return module.exports;
});

$__System.registerDynamic("143", ["81", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var async_1 = $__require('57');
  function timeInterval(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new TimeIntervalOperator(scheduler));
  }
  exports.timeInterval = timeInterval;
  var TimeInterval = (function() {
    function TimeInterval(value, interval) {
      this.value = value;
      this.interval = interval;
    }
    return TimeInterval;
  }());
  exports.TimeInterval = TimeInterval;
  ;
  var TimeIntervalOperator = (function() {
    function TimeIntervalOperator(scheduler) {
      this.scheduler = scheduler;
    }
    TimeIntervalOperator.prototype.call = function(observer, source) {
      return source._subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    };
    return TimeIntervalOperator;
  }());
  var TimeIntervalSubscriber = (function(_super) {
    __extends(TimeIntervalSubscriber, _super);
    function TimeIntervalSubscriber(destination, scheduler) {
      _super.call(this, destination);
      this.scheduler = scheduler;
      this.lastTime = 0;
      this.lastTime = scheduler.now();
    }
    TimeIntervalSubscriber.prototype._next = function(value) {
      var now = this.scheduler.now();
      var span = now - this.lastTime;
      this.lastTime = now;
      this.destination.next(new TimeInterval(value, span));
    };
    return TimeIntervalSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("149", ["81", "57"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  var async_1 = $__require('57');
  function timestamp(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new TimestampOperator(scheduler));
  }
  exports.timestamp = timestamp;
  var Timestamp = (function() {
    function Timestamp(value, timestamp) {
      this.value = value;
      this.timestamp = timestamp;
    }
    return Timestamp;
  }());
  exports.Timestamp = Timestamp;
  ;
  var TimestampOperator = (function() {
    function TimestampOperator(scheduler) {
      this.scheduler = scheduler;
    }
    TimestampOperator.prototype.call = function(observer, source) {
      return source._subscribe(new TimestampSubscriber(observer, this.scheduler));
    };
    return TimestampOperator;
  }());
  var TimestampSubscriber = (function(_super) {
    __extends(TimestampSubscriber, _super);
    function TimestampSubscriber(destination, scheduler) {
      _super.call(this, destination);
      this.scheduler = scheduler;
    }
    TimestampSubscriber.prototype._next = function(value) {
      var now = this.scheduler.now();
      this.destination.next(new Timestamp(value, now));
    };
    return TimestampSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("ab", ["25"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('25');
  var Notification = (function() {
    function Notification(kind, value, exception) {
      this.kind = kind;
      this.value = value;
      this.exception = exception;
      this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function(observer) {
      switch (this.kind) {
        case 'N':
          return observer.next && observer.next(this.value);
        case 'E':
          return observer.error && observer.error(this.exception);
        case 'C':
          return observer.complete && observer.complete();
      }
    };
    Notification.prototype.do = function(next, error, complete) {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return next && next(this.value);
        case 'E':
          return error && error(this.exception);
        case 'C':
          return complete && complete();
      }
    };
    Notification.prototype.accept = function(nextOrObserver, error, complete) {
      if (nextOrObserver && typeof nextOrObserver.next === 'function') {
        return this.observe(nextOrObserver);
      } else {
        return this.do(nextOrObserver, error, complete);
      }
    };
    Notification.prototype.toObservable = function() {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return Observable_1.Observable.of(this.value);
        case 'E':
          return Observable_1.Observable.throw(this.exception);
        case 'C':
          return Observable_1.Observable.empty();
      }
      throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function(value) {
      if (typeof value !== 'undefined') {
        return new Notification('N', value);
      }
      return this.undefinedValueNotification;
    };
    Notification.createError = function(err) {
      return new Notification('E', undefined, err);
    };
    Notification.createComplete = function() {
      return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
  }());
  exports.Notification = Notification;
  return module.exports;
});

$__System.registerDynamic("160", ["25", "47", "161", "162"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var Subscription_1 = $__require('47');
  var SubscriptionLoggable_1 = $__require('161');
  var applyMixins_1 = $__require('162');
  var ColdObservable = (function(_super) {
    __extends(ColdObservable, _super);
    function ColdObservable(messages, scheduler) {
      _super.call(this, function(subscriber) {
        var observable = this;
        var index = observable.logSubscribedFrame();
        subscriber.add(new Subscription_1.Subscription(function() {
          observable.logUnsubscribedFrame(index);
        }));
        observable.scheduleMessages(subscriber);
        return subscriber;
      });
      this.messages = messages;
      this.subscriptions = [];
      this.scheduler = scheduler;
    }
    ColdObservable.prototype.scheduleMessages = function(subscriber) {
      var messagesLength = this.messages.length;
      for (var i = 0; i < messagesLength; i++) {
        var message = this.messages[i];
        subscriber.add(this.scheduler.schedule(function(_a) {
          var message = _a.message,
              subscriber = _a.subscriber;
          message.notification.observe(subscriber);
        }, message.frame, {
          message: message,
          subscriber: subscriber
        }));
      }
    };
    return ColdObservable;
  }(Observable_1.Observable));
  exports.ColdObservable = ColdObservable;
  applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
  return module.exports;
});

$__System.registerDynamic("15f", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ObjectUnsubscribedError = (function(_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
      var err = _super.call(this, 'object unsubscribed');
      this.name = err.name = 'ObjectUnsubscribedError';
      this.stack = err.stack;
      this.message = err.message;
    }
    return ObjectUnsubscribedError;
  }(Error));
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
  return module.exports;
});

$__System.registerDynamic("163", ["47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('47');
  var SubjectSubscription = (function(_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
      _super.call(this);
      this.subject = subject;
      this.subscriber = subscriber;
      this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function() {
      if (this.closed) {
        return;
      }
      this.closed = true;
      var subject = this.subject;
      var observers = subject.observers;
      this.subject = null;
      if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
        return;
      }
      var subscriberIndex = observers.indexOf(this.subscriber);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    };
    return SubjectSubscription;
  }(Subscription_1.Subscription));
  exports.SubjectSubscription = SubjectSubscription;
  return module.exports;
});

$__System.registerDynamic("80", ["25", "81", "47", "15f", "163", "164"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var Subscriber_1 = $__require('81');
  var Subscription_1 = $__require('47');
  var ObjectUnsubscribedError_1 = $__require('15f');
  var SubjectSubscription_1 = $__require('163');
  var rxSubscriber_1 = $__require('164');
  var SubjectSubscriber = (function(_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
      _super.call(this, destination);
      this.destination = destination;
    }
    return SubjectSubscriber;
  }(Subscriber_1.Subscriber));
  exports.SubjectSubscriber = SubjectSubscriber;
  var Subject = (function(_super) {
    __extends(Subject, _super);
    function Subject() {
      _super.call(this);
      this.observers = [];
      this.closed = false;
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject.prototype.next = function(value) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      if (!this.isStopped) {
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].next(value);
        }
      }
    };
    Subject.prototype.error = function(err) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();
      for (var i = 0; i < len; i++) {
        copy[i].error(err);
      }
      this.observers.length = 0;
    };
    Subject.prototype.complete = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();
      for (var i = 0; i < len; i++) {
        copy[i].complete();
      }
      this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function() {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    };
    Subject.prototype._subscribe = function(subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription_1.Subscription.EMPTY;
      } else if (this.isStopped) {
        subscriber.complete();
        return Subscription_1.Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
      }
    };
    Subject.prototype.asObservable = function() {
      var observable = new Observable_1.Observable();
      observable.source = this;
      return observable;
    };
    Subject.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject;
  }(Observable_1.Observable));
  exports.Subject = Subject;
  var AnonymousSubject = (function(_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
      _super.call(this);
      this.destination = destination;
      this.source = source;
    }
    AnonymousSubject.prototype.next = function(value) {
      var destination = this.destination;
      if (destination && destination.next) {
        destination.next(value);
      }
    };
    AnonymousSubject.prototype.error = function(err) {
      var destination = this.destination;
      if (destination && destination.error) {
        this.destination.error(err);
      }
    };
    AnonymousSubject.prototype.complete = function() {
      var destination = this.destination;
      if (destination && destination.complete) {
        this.destination.complete();
      }
    };
    AnonymousSubject.prototype._subscribe = function(subscriber) {
      var source = this.source;
      if (source) {
        return this.source.subscribe(subscriber);
      } else {
        return Subscription_1.Subscription.EMPTY;
      }
    };
    return AnonymousSubject;
  }(Subject));
  exports.AnonymousSubject = AnonymousSubject;
  return module.exports;
});

$__System.registerDynamic("161", ["165"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SubscriptionLog_1 = $__require('165');
  var SubscriptionLoggable = (function() {
    function SubscriptionLoggable() {
      this.subscriptions = [];
    }
    SubscriptionLoggable.prototype.logSubscribedFrame = function() {
      this.subscriptions.push(new SubscriptionLog_1.SubscriptionLog(this.scheduler.now()));
      return this.subscriptions.length - 1;
    };
    SubscriptionLoggable.prototype.logUnsubscribedFrame = function(index) {
      var subscriptionLogs = this.subscriptions;
      var oldSubscriptionLog = subscriptionLogs[index];
      subscriptionLogs[index] = new SubscriptionLog_1.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    };
    return SubscriptionLoggable;
  }());
  exports.SubscriptionLoggable = SubscriptionLoggable;
  return module.exports;
});

$__System.registerDynamic("162", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function applyMixins(derivedCtor, baseCtors) {
    for (var i = 0,
        len = baseCtors.length; i < len; i++) {
      var baseCtor = baseCtors[i];
      var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
      for (var j = 0,
          len2 = propertyKeys.length; j < len2; j++) {
        var name_1 = propertyKeys[j];
        derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
      }
    }
  }
  exports.applyMixins = applyMixins;
  return module.exports;
});

$__System.registerDynamic("166", ["80", "47", "161", "162"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('80');
  var Subscription_1 = $__require('47');
  var SubscriptionLoggable_1 = $__require('161');
  var applyMixins_1 = $__require('162');
  var HotObservable = (function(_super) {
    __extends(HotObservable, _super);
    function HotObservable(messages, scheduler) {
      _super.call(this);
      this.messages = messages;
      this.subscriptions = [];
      this.scheduler = scheduler;
    }
    HotObservable.prototype._subscribe = function(subscriber) {
      var subject = this;
      var index = subject.logSubscribedFrame();
      subscriber.add(new Subscription_1.Subscription(function() {
        subject.logUnsubscribedFrame(index);
      }));
      return _super.prototype._subscribe.call(this, subscriber);
    };
    HotObservable.prototype.setup = function() {
      var subject = this;
      var messagesLength = subject.messages.length;
      for (var i = 0; i < messagesLength; i++) {
        (function() {
          var message = subject.messages[i];
          subject.scheduler.schedule(function() {
            message.notification.observe(subject);
          }, message.frame);
        })();
      }
    };
    return HotObservable;
  }(Subject_1.Subject));
  exports.HotObservable = HotObservable;
  applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
  return module.exports;
});

$__System.registerDynamic("165", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SubscriptionLog = (function() {
    function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
      if (unsubscribedFrame === void 0) {
        unsubscribedFrame = Number.POSITIVE_INFINITY;
      }
      this.subscribedFrame = subscribedFrame;
      this.unsubscribedFrame = unsubscribedFrame;
    }
    return SubscriptionLog;
  }());
  exports.SubscriptionLog = SubscriptionLog;
  return module.exports;
});

$__System.registerDynamic("167", ["25", "ab", "160", "166", "165", "168"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('25');
  var Notification_1 = $__require('ab');
  var ColdObservable_1 = $__require('160');
  var HotObservable_1 = $__require('166');
  var SubscriptionLog_1 = $__require('165');
  var VirtualTimeScheduler_1 = $__require('168');
  var defaultMaxFrame = 750;
  var TestScheduler = (function(_super) {
    __extends(TestScheduler, _super);
    function TestScheduler(assertDeepEqual) {
      _super.call(this, VirtualTimeScheduler_1.VirtualAction, defaultMaxFrame);
      this.assertDeepEqual = assertDeepEqual;
      this.hotObservables = [];
      this.coldObservables = [];
      this.flushTests = [];
    }
    TestScheduler.prototype.createTime = function(marbles) {
      var indexOf = marbles.indexOf('|');
      if (indexOf === -1) {
        throw new Error('marble diagram for time should have a completion marker "|"');
      }
      return indexOf * TestScheduler.frameTimeFactor;
    };
    TestScheduler.prototype.createColdObservable = function(marbles, values, error) {
      if (marbles.indexOf('^') !== -1) {
        throw new Error('cold observable cannot have subscription offset "^"');
      }
      if (marbles.indexOf('!') !== -1) {
        throw new Error('cold observable cannot have unsubscription marker "!"');
      }
      var messages = TestScheduler.parseMarbles(marbles, values, error);
      var cold = new ColdObservable_1.ColdObservable(messages, this);
      this.coldObservables.push(cold);
      return cold;
    };
    TestScheduler.prototype.createHotObservable = function(marbles, values, error) {
      if (marbles.indexOf('!') !== -1) {
        throw new Error('hot observable cannot have unsubscription marker "!"');
      }
      var messages = TestScheduler.parseMarbles(marbles, values, error);
      var subject = new HotObservable_1.HotObservable(messages, this);
      this.hotObservables.push(subject);
      return subject;
    };
    TestScheduler.prototype.materializeInnerObservable = function(observable, outerFrame) {
      var _this = this;
      var messages = [];
      observable.subscribe(function(value) {
        messages.push({
          frame: _this.frame - outerFrame,
          notification: Notification_1.Notification.createNext(value)
        });
      }, function(err) {
        messages.push({
          frame: _this.frame - outerFrame,
          notification: Notification_1.Notification.createError(err)
        });
      }, function() {
        messages.push({
          frame: _this.frame - outerFrame,
          notification: Notification_1.Notification.createComplete()
        });
      });
      return messages;
    };
    TestScheduler.prototype.expectObservable = function(observable, unsubscriptionMarbles) {
      var _this = this;
      if (unsubscriptionMarbles === void 0) {
        unsubscriptionMarbles = null;
      }
      var actual = [];
      var flushTest = {
        actual: actual,
        ready: false
      };
      var unsubscriptionFrame = TestScheduler.parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
      var subscription;
      this.schedule(function() {
        subscription = observable.subscribe(function(x) {
          var value = x;
          if (x instanceof Observable_1.Observable) {
            value = _this.materializeInnerObservable(value, _this.frame);
          }
          actual.push({
            frame: _this.frame,
            notification: Notification_1.Notification.createNext(value)
          });
        }, function(err) {
          actual.push({
            frame: _this.frame,
            notification: Notification_1.Notification.createError(err)
          });
        }, function() {
          actual.push({
            frame: _this.frame,
            notification: Notification_1.Notification.createComplete()
          });
        });
      }, 0);
      if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
        this.schedule(function() {
          return subscription.unsubscribe();
        }, unsubscriptionFrame);
      }
      this.flushTests.push(flushTest);
      return {toBe: function(marbles, values, errorValue) {
          flushTest.ready = true;
          flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
        }};
    };
    TestScheduler.prototype.expectSubscriptions = function(actualSubscriptionLogs) {
      var flushTest = {
        actual: actualSubscriptionLogs,
        ready: false
      };
      this.flushTests.push(flushTest);
      return {toBe: function(marbles) {
          var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
          flushTest.ready = true;
          flushTest.expected = marblesArray.map(function(marbles) {
            return TestScheduler.parseMarblesAsSubscriptions(marbles);
          });
        }};
    };
    TestScheduler.prototype.flush = function() {
      var hotObservables = this.hotObservables;
      while (hotObservables.length > 0) {
        hotObservables.shift().setup();
      }
      _super.prototype.flush.call(this);
      var readyFlushTests = this.flushTests.filter(function(test) {
        return test.ready;
      });
      while (readyFlushTests.length > 0) {
        var test = readyFlushTests.shift();
        this.assertDeepEqual(test.actual, test.expected);
      }
    };
    TestScheduler.parseMarblesAsSubscriptions = function(marbles) {
      if (typeof marbles !== 'string') {
        return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);
      }
      var len = marbles.length;
      var groupStart = -1;
      var subscriptionFrame = Number.POSITIVE_INFINITY;
      var unsubscriptionFrame = Number.POSITIVE_INFINITY;
      for (var i = 0; i < len; i++) {
        var frame = i * this.frameTimeFactor;
        var c = marbles[i];
        switch (c) {
          case '-':
          case ' ':
            break;
          case '(':
            groupStart = frame;
            break;
          case ')':
            groupStart = -1;
            break;
          case '^':
            if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
              throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
            }
            subscriptionFrame = groupStart > -1 ? groupStart : frame;
            break;
          case '!':
            if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
              throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
            }
            unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
            break;
          default:
            throw new Error('there can only be \'^\' and \'!\' markers in a ' + 'subscription marble diagram. Found instead \'' + c + '\'.');
        }
      }
      if (unsubscriptionFrame < 0) {
        return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame);
      } else {
        return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
      }
    };
    TestScheduler.parseMarbles = function(marbles, values, errorValue, materializeInnerObservables) {
      if (materializeInnerObservables === void 0) {
        materializeInnerObservables = false;
      }
      if (marbles.indexOf('!') !== -1) {
        throw new Error('conventional marble diagrams cannot have the ' + 'unsubscription marker "!"');
      }
      var len = marbles.length;
      var testMessages = [];
      var subIndex = marbles.indexOf('^');
      var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
      var getValue = typeof values !== 'object' ? function(x) {
        return x;
      } : function(x) {
        if (materializeInnerObservables && values[x] instanceof ColdObservable_1.ColdObservable) {
          return values[x].messages;
        }
        return values[x];
      };
      var groupStart = -1;
      for (var i = 0; i < len; i++) {
        var frame = i * this.frameTimeFactor + frameOffset;
        var notification = void 0;
        var c = marbles[i];
        switch (c) {
          case '-':
          case ' ':
            break;
          case '(':
            groupStart = frame;
            break;
          case ')':
            groupStart = -1;
            break;
          case '|':
            notification = Notification_1.Notification.createComplete();
            break;
          case '^':
            break;
          case '#':
            notification = Notification_1.Notification.createError(errorValue || 'error');
            break;
          default:
            notification = Notification_1.Notification.createNext(getValue(c));
            break;
        }
        if (notification) {
          testMessages.push({
            frame: groupStart > -1 ? groupStart : frame,
            notification: notification
          });
        }
      }
      return testMessages;
    };
    return TestScheduler;
  }(VirtualTimeScheduler_1.VirtualTimeScheduler));
  exports.TestScheduler = TestScheduler;
  return module.exports;
});

$__System.registerDynamic("168", ["169", "16a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncAction_1 = $__require('169');
  var AsyncScheduler_1 = $__require('16a');
  var VirtualTimeScheduler = (function(_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
      var _this = this;
      if (SchedulerAction === void 0) {
        SchedulerAction = VirtualAction;
      }
      if (maxFrames === void 0) {
        maxFrames = Number.POSITIVE_INFINITY;
      }
      _super.call(this, SchedulerAction, function() {
        return _this.frame;
      });
      this.maxFrames = maxFrames;
      this.frame = 0;
      this.index = -1;
    }
    VirtualTimeScheduler.prototype.flush = function() {
      var _a = this,
          actions = _a.actions,
          maxFrames = _a.maxFrames;
      var error,
          action;
      while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      }
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.VirtualTimeScheduler = VirtualTimeScheduler;
  var VirtualAction = (function(_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
      if (index === void 0) {
        index = scheduler.index += 1;
      }
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.index = index;
      this.index = scheduler.index = index;
    }
    VirtualAction.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return !this.id ? _super.prototype.schedule.call(this, state, delay) : this.add(new VirtualAction(this.scheduler, this.work)).schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      this.delay = scheduler.frame + delay;
      var actions = scheduler.actions;
      actions.push(this);
      actions.sort(VirtualAction.sortActions);
      return true;
    };
    VirtualAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return undefined;
    };
    VirtualAction.sortActions = function(a, b) {
      if (a.delay === b.delay) {
        if (a.index === b.index) {
          return 0;
        } else if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.delay > b.delay) {
        return 1;
      } else {
        return -1;
      }
    };
    return VirtualAction;
  }(AsyncAction_1.AsyncAction));
  exports.VirtualAction = VirtualAction;
  return module.exports;
});

$__System.registerDynamic("16b", ["81", "164"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Subscriber_1 = $__require('81');
  var rxSubscriber_1 = $__require('164');
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber_1.Subscriber) {
        return nextOrObserver;
      }
      if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
        return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
      }
    }
    if (!nextOrObserver && !error && !complete) {
      return new Subscriber_1.Subscriber();
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
  return module.exports;
});

$__System.registerDynamic("25", ["7e", "16b", "fa"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var toSubscriber_1 = $__require('16b');
  var observable_1 = $__require('fa');
  var Observable = (function() {
    function Observable(subscribe) {
      this._isScalar = false;
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable.prototype.lift = function(operator) {
      var observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    };
    Observable.prototype.subscribe = function(observerOrNext, error, complete) {
      var operator = this.operator;
      var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
      if (operator) {
        operator.call(sink, this);
      } else {
        sink.add(this._subscribe(sink));
      }
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;
        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
      return sink;
    };
    Observable.prototype.forEach = function(next, PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
          PromiseCtor = root_1.root.Rx.config.Promise;
        } else if (root_1.root.Promise) {
          PromiseCtor = root_1.root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function(resolve, reject) {
        var subscription = _this.subscribe(function(value) {
          if (subscription) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscription.unsubscribe();
            }
          } else {
            next(value);
          }
        }, reject, resolve);
      });
    };
    Observable.prototype._subscribe = function(subscriber) {
      return this.source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.$$observable] = function() {
      return this;
    };
    Observable.create = function(subscribe) {
      return new Observable(subscribe);
    };
    return Observable;
  }());
  exports.Observable = Observable;
  return module.exports;
});

$__System.registerDynamic("16c", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.empty = {
    closed: true,
    next: function(value) {},
    error: function(err) {
      throw err;
    },
    complete: function() {}
  };
  return module.exports;
});

$__System.registerDynamic("81", ["46", "47", "16c", "164"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isFunction_1 = $__require('46');
  var Subscription_1 = $__require('47');
  var Observer_1 = $__require('16c');
  var rxSubscriber_1 = $__require('164');
  var Subscriber = (function(_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
      _super.call(this);
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = Observer_1.empty;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = Observer_1.empty;
            break;
          }
          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              this.destination = destinationOrNext;
              this.destination.add(this);
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
          break;
      }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return this;
    };
    Subscriber.create = function(next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };
    Subscriber.prototype.next = function(value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };
    Subscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber.prototype.complete = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber.prototype.unsubscribe = function() {
      if (this.closed) {
        return;
      }
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber.prototype._error = function(err) {
      this.destination.error(err);
      this.unsubscribe();
    };
    Subscriber.prototype._complete = function() {
      this.destination.complete();
      this.unsubscribe();
    };
    return Subscriber;
  }(Subscription_1.Subscription));
  exports.Subscriber = Subscriber;
  var SafeSubscriber = (function(_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
      _super.call(this);
      this._parent = _parent;
      var next;
      var context = this;
      if (isFunction_1.isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        context = observerOrNext;
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (isFunction_1.isFunction(context.unsubscribe)) {
          this.add(context.unsubscribe.bind(context));
        }
        context.unsubscribe = this.unsubscribe.bind(this);
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    SafeSubscriber.prototype.next = function(value) {
      if (!this.isStopped && this._next) {
        var _parent = this._parent;
        if (!_parent.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parent, this._next, value)) {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._error) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parent.syncErrorThrowable) {
          this.unsubscribe();
          throw err;
        } else {
          _parent.syncErrorValue = err;
          _parent.syncErrorThrown = true;
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.complete = function() {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._complete) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._complete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._complete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
    };
    SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      }
      return false;
    };
    SafeSubscriber.prototype._unsubscribe = function() {
      var _parent = this._parent;
      this._context = null;
      this._parent = null;
      _parent.unsubscribe();
    };
    return SafeSubscriber;
  }(Subscriber));
  return module.exports;
});

$__System.registerDynamic("e1", ["81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('81');
  function map(project, thisArg) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
  }
  exports.map = map;
  var MapOperator = (function() {
    function MapOperator(project, thisArg) {
      this.project = project;
      this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
  }());
  exports.MapOperator = MapOperator;
  var MapSubscriber = (function(_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
      _super.call(this, destination);
      this.project = project;
      this.count = 0;
      this.thisArg = thisArg || this;
    }
    MapSubscriber.prototype._next = function(value) {
      var result;
      try {
        result = this.project.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return MapSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("7b", ["7e", "26", "27", "25", "81", "e1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('7e');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var Observable_1 = $__require('25');
  var Subscriber_1 = $__require('81');
  var map_1 = $__require('e1');
  function getCORSRequest() {
    if (root_1.root.XMLHttpRequest) {
      var xhr = new root_1.root.XMLHttpRequest();
      if ('withCredentials' in xhr) {
        xhr.withCredentials = !!this.withCredentials;
      }
      return xhr;
    } else if (!!root_1.root.XDomainRequest) {
      return new root_1.root.XDomainRequest();
    } else {
      throw new Error('CORS is not supported by your browser');
    }
  }
  function getXMLHttpRequest() {
    if (root_1.root.XMLHttpRequest) {
      return new root_1.root.XMLHttpRequest();
    } else {
      var progId = void 0;
      try {
        var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
        for (var i = 0; i < 3; i++) {
          try {
            progId = progIds[i];
            if (new root_1.root.ActiveXObject(progId)) {
              break;
            }
          } catch (e) {}
        }
        return new root_1.root.ActiveXObject(progId);
      } catch (e) {
        throw new Error('XMLHttpRequest is not supported by your browser');
      }
    }
  }
  function ajaxGet(url, headers) {
    if (headers === void 0) {
      headers = null;
    }
    return new AjaxObservable({
      method: 'GET',
      url: url,
      headers: headers
    });
  }
  exports.ajaxGet = ajaxGet;
  ;
  function ajaxPost(url, body, headers) {
    return new AjaxObservable({
      method: 'POST',
      url: url,
      body: body,
      headers: headers
    });
  }
  exports.ajaxPost = ajaxPost;
  ;
  function ajaxDelete(url, headers) {
    return new AjaxObservable({
      method: 'DELETE',
      url: url,
      headers: headers
    });
  }
  exports.ajaxDelete = ajaxDelete;
  ;
  function ajaxPut(url, body, headers) {
    return new AjaxObservable({
      method: 'PUT',
      url: url,
      body: body,
      headers: headers
    });
  }
  exports.ajaxPut = ajaxPut;
  ;
  function ajaxGetJSON(url, headers) {
    return new AjaxObservable({
      method: 'GET',
      url: url,
      responseType: 'json',
      headers: headers
    }).lift(new map_1.MapOperator(function(x, index) {
      return x.response;
    }, null));
  }
  exports.ajaxGetJSON = ajaxGetJSON;
  ;
  var AjaxObservable = (function(_super) {
    __extends(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
      _super.call(this);
      var request = {
        async: true,
        createXHR: function() {
          return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
        },
        crossDomain: false,
        withCredentials: false,
        headers: {},
        method: 'GET',
        responseType: 'json',
        timeout: 0
      };
      if (typeof urlOrRequest === 'string') {
        request.url = urlOrRequest;
      } else {
        for (var prop in urlOrRequest) {
          if (urlOrRequest.hasOwnProperty(prop)) {
            request[prop] = urlOrRequest[prop];
          }
        }
      }
      this.request = request;
    }
    AjaxObservable.prototype._subscribe = function(subscriber) {
      return new AjaxSubscriber(subscriber, this.request);
    };
    AjaxObservable.create = (function() {
      var create = function(urlOrRequest) {
        return new AjaxObservable(urlOrRequest);
      };
      create.get = ajaxGet;
      create.post = ajaxPost;
      create.delete = ajaxDelete;
      create.put = ajaxPut;
      create.getJSON = ajaxGetJSON;
      return create;
    })();
    return AjaxObservable;
  }(Observable_1.Observable));
  exports.AjaxObservable = AjaxObservable;
  var AjaxSubscriber = (function(_super) {
    __extends(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
      _super.call(this, destination);
      this.request = request;
      this.done = false;
      var headers = request.headers = request.headers || {};
      if (!request.crossDomain && !headers['X-Requested-With']) {
        headers['X-Requested-With'] = 'XMLHttpRequest';
      }
      if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      }
      request.body = this.serializeBody(request.body, request.headers['Content-Type']);
      this.send();
    }
    AjaxSubscriber.prototype.next = function(e) {
      this.done = true;
      var _a = this,
          xhr = _a.xhr,
          request = _a.request,
          destination = _a.destination;
      var response = new AjaxResponse(e, xhr, request);
      destination.next(response);
    };
    AjaxSubscriber.prototype.send = function() {
      var _a = this,
          request = _a.request,
          _b = _a.request,
          user = _b.user,
          method = _b.method,
          url = _b.url,
          async = _b.async,
          password = _b.password,
          headers = _b.headers,
          body = _b.body;
      var createXHR = request.createXHR;
      var xhr = tryCatch_1.tryCatch(createXHR).call(request);
      if (xhr === errorObject_1.errorObject) {
        this.error(errorObject_1.errorObject.e);
      } else {
        this.xhr = xhr;
        var result = void 0;
        if (user) {
          result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
        } else {
          result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
        }
        if (result === errorObject_1.errorObject) {
          this.error(errorObject_1.errorObject.e);
          return null;
        }
        xhr.timeout = request.timeout;
        xhr.responseType = request.responseType;
        this.setHeaders(xhr, headers);
        this.setupEvents(xhr, request);
        if (body) {
          xhr.send(body);
        } else {
          xhr.send();
        }
      }
      return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function(body, contentType) {
      if (!body || typeof body === 'string') {
        return body;
      } else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
        return body;
      }
      if (contentType) {
        var splitIndex = contentType.indexOf(';');
        if (splitIndex !== -1) {
          contentType = contentType.substring(0, splitIndex);
        }
      }
      switch (contentType) {
        case 'application/x-www-form-urlencoded':
          return Object.keys(body).map(function(key) {
            return (encodeURI(key) + "=" + encodeURI(body[key]));
          }).join('&');
        case 'application/json':
          return JSON.stringify(body);
        default:
          return body;
      }
    };
    AjaxSubscriber.prototype.setHeaders = function(xhr, headers) {
      for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
    };
    AjaxSubscriber.prototype.setupEvents = function(xhr, request) {
      var progressSubscriber = request.progressSubscriber;
      xhr.ontimeout = function xhrTimeout(e) {
        var _a = xhrTimeout,
            subscriber = _a.subscriber,
            progressSubscriber = _a.progressSubscriber,
            request = _a.request;
        if (progressSubscriber) {
          progressSubscriber.error(e);
        }
        subscriber.error(new AjaxTimeoutError(this, request));
      };
      xhr.ontimeout.request = request;
      xhr.ontimeout.subscriber = this;
      xhr.ontimeout.progressSubscriber = progressSubscriber;
      if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
        if (progressSubscriber) {
          xhr.onprogress = function xhrProgress(e) {
            var progressSubscriber = xhrProgress.progressSubscriber;
            progressSubscriber.next(e);
          };
          xhr.onprogress.progressSubscriber = progressSubscriber;
        }
        xhr.onerror = function xhrError(e) {
          var _a = xhrError,
              progressSubscriber = _a.progressSubscriber,
              subscriber = _a.subscriber,
              request = _a.request;
          if (progressSubscriber) {
            progressSubscriber.error(e);
          }
          subscriber.error(new AjaxError('ajax error', this, request));
        };
        xhr.onerror.request = request;
        xhr.onerror.subscriber = this;
        xhr.onerror.progressSubscriber = progressSubscriber;
      }
      xhr.onreadystatechange = function xhrReadyStateChange(e) {
        var _a = xhrReadyStateChange,
            subscriber = _a.subscriber,
            progressSubscriber = _a.progressSubscriber,
            request = _a.request;
        if (this.readyState === 4) {
          var status_1 = this.status === 1223 ? 204 : this.status;
          var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
          if (status_1 === 0) {
            status_1 = response ? 200 : 0;
          }
          if (200 <= status_1 && status_1 < 300) {
            if (progressSubscriber) {
              progressSubscriber.complete();
            }
            subscriber.next(e);
            subscriber.complete();
          } else {
            if (progressSubscriber) {
              progressSubscriber.error(e);
            }
            subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
          }
        }
      };
      xhr.onreadystatechange.subscriber = this;
      xhr.onreadystatechange.progressSubscriber = progressSubscriber;
      xhr.onreadystatechange.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function() {
      var _a = this,
          done = _a.done,
          xhr = _a.xhr;
      if (!done && xhr && xhr.readyState !== 4) {
        xhr.abort();
      }
      _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
  }(Subscriber_1.Subscriber));
  exports.AjaxSubscriber = AjaxSubscriber;
  var AjaxResponse = (function() {
    function AjaxResponse(originalEvent, xhr, request) {
      this.originalEvent = originalEvent;
      this.xhr = xhr;
      this.request = request;
      this.status = xhr.status;
      this.responseType = xhr.responseType || request.responseType;
      switch (this.responseType) {
        case 'json':
          if ('response' in xhr) {
            this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
          } else {
            this.response = JSON.parse(xhr.responseText || 'null');
          }
          break;
        case 'xml':
          this.response = xhr.responseXML;
          break;
        case 'text':
        default:
          this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
          break;
      }
    }
    return AjaxResponse;
  }());
  exports.AjaxResponse = AjaxResponse;
  var AjaxError = (function(_super) {
    __extends(AjaxError, _super);
    function AjaxError(message, xhr, request) {
      _super.call(this, message);
      this.message = message;
      this.xhr = xhr;
      this.request = request;
      this.status = xhr.status;
    }
    return AjaxError;
  }(Error));
  exports.AjaxError = AjaxError;
  var AjaxTimeoutError = (function(_super) {
    __extends(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
      _super.call(this, 'ajax timeout', xhr, request);
    }
    return AjaxTimeoutError;
  }(AjaxError));
  exports.AjaxTimeoutError = AjaxTimeoutError;
  return module.exports;
});

$__System.registerDynamic("16d", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var ImmediateDefinition = (function() {
    function ImmediateDefinition(root) {
      this.root = root;
      if (root.setImmediate && typeof root.setImmediate === 'function') {
        this.setImmediate = root.setImmediate.bind(root);
        this.clearImmediate = root.clearImmediate.bind(root);
      } else {
        this.nextHandle = 1;
        this.tasksByHandle = {};
        this.currentlyRunningATask = false;
        if (this.canUseProcessNextTick()) {
          this.setImmediate = this.createProcessNextTickSetImmediate();
        } else if (this.canUsePostMessage()) {
          this.setImmediate = this.createPostMessageSetImmediate();
        } else if (this.canUseMessageChannel()) {
          this.setImmediate = this.createMessageChannelSetImmediate();
        } else if (this.canUseReadyStateChange()) {
          this.setImmediate = this.createReadyStateChangeSetImmediate();
        } else {
          this.setImmediate = this.createSetTimeoutSetImmediate();
        }
        var ci = function clearImmediate(handle) {
          delete clearImmediate.instance.tasksByHandle[handle];
        };
        ci.instance = this;
        this.clearImmediate = ci;
      }
    }
    ImmediateDefinition.prototype.identify = function(o) {
      return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function() {
      return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function() {
      return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function() {
      var document = this.root.document;
      return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function() {
      var root = this.root;
      if (root.postMessage && !root.importScripts) {
        var postMessageIsAsynchronous_1 = true;
        var oldOnMessage = root.onmessage;
        root.onmessage = function() {
          postMessageIsAsynchronous_1 = false;
        };
        root.postMessage('', '*');
        root.onmessage = oldOnMessage;
        return postMessageIsAsynchronous_1;
      }
      return false;
    };
    ImmediateDefinition.prototype.partiallyApplied = function(handler) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var fn = function result() {
        var _a = result,
            handler = _a.handler,
            args = _a.args;
        if (typeof handler === 'function') {
          handler.apply(undefined, args);
        } else {
          (new Function('' + handler))();
        }
      };
      fn.handler = handler;
      fn.args = args;
      return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function(args) {
      this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
      return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function() {
      var fn = function setImmediate() {
        var instance = setImmediate.instance;
        var handle = instance.addFromSetImmediateArguments(arguments);
        instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
        return handle;
      };
      fn.instance = this;
      return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function() {
      var root = this.root;
      var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
      var onGlobalMessage = function globalMessageHandler(event) {
        var instance = globalMessageHandler.instance;
        if (event.source === root && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
          instance.runIfPresent(+event.data.slice(messagePrefix.length));
        }
      };
      onGlobalMessage.instance = this;
      root.addEventListener('message', onGlobalMessage, false);
      var fn = function setImmediate() {
        var _a = setImmediate,
            messagePrefix = _a.messagePrefix,
            instance = _a.instance;
        var handle = instance.addFromSetImmediateArguments(arguments);
        instance.root.postMessage(messagePrefix + handle, '*');
        return handle;
      };
      fn.instance = this;
      fn.messagePrefix = messagePrefix;
      return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function(handle) {
      if (this.currentlyRunningATask) {
        this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
      } else {
        var task = this.tasksByHandle[handle];
        if (task) {
          this.currentlyRunningATask = true;
          try {
            task();
          } finally {
            this.clearImmediate(handle);
            this.currentlyRunningATask = false;
          }
        }
      }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function() {
      var _this = this;
      var channel = new this.root.MessageChannel();
      channel.port1.onmessage = function(event) {
        var handle = event.data;
        _this.runIfPresent(handle);
      };
      var fn = function setImmediate() {
        var _a = setImmediate,
            channel = _a.channel,
            instance = _a.instance;
        var handle = instance.addFromSetImmediateArguments(arguments);
        channel.port2.postMessage(handle);
        return handle;
      };
      fn.channel = channel;
      fn.instance = this;
      return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function() {
      var fn = function setImmediate() {
        var instance = setImmediate.instance;
        var root = instance.root;
        var doc = root.document;
        var html = doc.documentElement;
        var handle = instance.addFromSetImmediateArguments(arguments);
        var script = doc.createElement('script');
        script.onreadystatechange = function() {
          instance.runIfPresent(handle);
          script.onreadystatechange = null;
          html.removeChild(script);
          script = null;
        };
        html.appendChild(script);
        return handle;
      };
      fn.instance = this;
      return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function() {
      var fn = function setImmediate() {
        var instance = setImmediate.instance;
        var handle = instance.addFromSetImmediateArguments(arguments);
        instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
        return handle;
      };
      fn.instance = this;
      return fn;
    };
    return ImmediateDefinition;
  }());
  exports.ImmediateDefinition = ImmediateDefinition;
  exports.Immediate = new ImmediateDefinition(root_1.root);
  return module.exports;
});

$__System.registerDynamic("16e", ["16d", "169"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Immediate_1 = $__require('16d');
  var AsyncAction_1 = $__require('169');
  var AsapAction = (function(_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }
      scheduler.actions.push(this);
      return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
      }
      if (scheduler.actions.length === 0) {
        Immediate_1.Immediate.clearImmediate(id);
        scheduler.scheduled = undefined;
      }
      return undefined;
    };
    return AsapAction;
  }(AsyncAction_1.AsyncAction));
  exports.AsapAction = AsapAction;
  return module.exports;
});

$__System.registerDynamic("16f", ["16a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncScheduler_1 = $__require('16a');
  var AsapScheduler = (function(_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
      _super.apply(this, arguments);
    }
    AsapScheduler.prototype.flush = function() {
      this.active = true;
      this.scheduled = undefined;
      var actions = this.actions;
      var error;
      var index = -1;
      var count = actions.length;
      var action = actions.shift();
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
      this.active = false;
      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsapScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.AsapScheduler = AsapScheduler;
  return module.exports;
});

$__System.registerDynamic("12d", ["16e", "16f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AsapAction_1 = $__require('16e');
  var AsapScheduler_1 = $__require('16f');
  exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
  return module.exports;
});

$__System.registerDynamic("57", ["169", "16a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AsyncAction_1 = $__require('169');
  var AsyncScheduler_1 = $__require('16a');
  exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
  return module.exports;
});

$__System.registerDynamic("170", ["169"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncAction_1 = $__require('169');
  var QueueAction = (function(_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    QueueAction.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay > 0) {
        return _super.prototype.schedule.call(this, state, delay);
      }
      this.delay = delay;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    };
    QueueAction.prototype.execute = function(state, delay) {
      return (delay > 0 || this.closed) ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }
      return scheduler.flush(this);
    };
    return QueueAction;
  }(AsyncAction_1.AsyncAction));
  exports.QueueAction = QueueAction;
  return module.exports;
});

$__System.registerDynamic("171", ["16a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncScheduler_1 = $__require('16a');
  var QueueScheduler = (function(_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
      _super.apply(this, arguments);
    }
    return QueueScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.QueueScheduler = QueueScheduler;
  return module.exports;
});

$__System.registerDynamic("15e", ["170", "171"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var QueueAction_1 = $__require('170');
  var QueueScheduler_1 = $__require('171');
  exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
  return module.exports;
});

$__System.registerDynamic("30", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.isArray = Array.isArray || (function(x) {
    return x && typeof x.length === 'number';
  });
  return module.exports;
});

$__System.registerDynamic("172", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isObject(x) {
    return x != null && typeof x === 'object';
  }
  exports.isObject = isObject;
  return module.exports;
});

$__System.registerDynamic("46", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isFunction(x) {
    return typeof x === 'function';
  }
  exports.isFunction = isFunction;
  return module.exports;
});

$__System.registerDynamic("26", ["27"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var errorObject_1 = $__require('27');
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObject_1.errorObject.e = e;
      return errorObject_1.errorObject;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  exports.tryCatch = tryCatch;
  ;
  return module.exports;
});

$__System.registerDynamic("27", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.errorObject = {e: {}};
  return module.exports;
});

$__System.registerDynamic("173", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var UnsubscriptionError = (function(_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
      _super.call(this);
      this.errors = errors;
      var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function(err, i) {
        return ((i + 1) + ") " + err.toString());
      }).join('\n  ') : '');
      this.name = err.name = 'UnsubscriptionError';
      this.stack = err.stack;
      this.message = err.message;
    }
    return UnsubscriptionError;
  }(Error));
  exports.UnsubscriptionError = UnsubscriptionError;
  return module.exports;
});

$__System.registerDynamic("47", ["30", "172", "46", "26", "27", "173"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray_1 = $__require('30');
  var isObject_1 = $__require('172');
  var isFunction_1 = $__require('46');
  var tryCatch_1 = $__require('26');
  var errorObject_1 = $__require('27');
  var UnsubscriptionError_1 = $__require('173');
  var Subscription = (function() {
    function Subscription(unsubscribe) {
      this.closed = false;
      if (unsubscribe) {
        this._unsubscribe = unsubscribe;
      }
    }
    Subscription.prototype.unsubscribe = function() {
      var hasErrors = false;
      var errors;
      if (this.closed) {
        return;
      }
      this.closed = true;
      var _a = this,
          _unsubscribe = _a._unsubscribe,
          _subscriptions = _a._subscriptions;
      this._subscriptions = null;
      if (isFunction_1.isFunction(_unsubscribe)) {
        var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
        if (trial === errorObject_1.errorObject) {
          hasErrors = true;
          (errors = errors || []).push(errorObject_1.errorObject.e);
        }
      }
      if (isArray_1.isArray(_subscriptions)) {
        var index = -1;
        var len = _subscriptions.length;
        while (++index < len) {
          var sub = _subscriptions[index];
          if (isObject_1.isObject(sub)) {
            var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
            if (trial === errorObject_1.errorObject) {
              hasErrors = true;
              errors = errors || [];
              var err = errorObject_1.errorObject.e;
              if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                errors = errors.concat(err.errors);
              } else {
                errors.push(err);
              }
            }
          }
        }
      }
      if (hasErrors) {
        throw new UnsubscriptionError_1.UnsubscriptionError(errors);
      }
    };
    Subscription.prototype.add = function(teardown) {
      if (!teardown || (teardown === Subscription.EMPTY)) {
        return Subscription.EMPTY;
      }
      if (teardown === this) {
        return this;
      }
      var sub = teardown;
      switch (typeof teardown) {
        case 'function':
          sub = new Subscription(teardown);
        case 'object':
          if (sub.closed || typeof sub.unsubscribe !== 'function') {
            break;
          } else if (this.closed) {
            sub.unsubscribe();
          } else {
            (this._subscriptions || (this._subscriptions = [])).push(sub);
          }
          break;
        default:
          throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
      }
      return sub;
    };
    Subscription.prototype.remove = function(subscription) {
      if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
        return;
      }
      var subscriptions = this._subscriptions;
      if (subscriptions) {
        var subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    };
    Subscription.EMPTY = (function(empty) {
      empty.closed = true;
      return empty;
    }(new Subscription()));
    return Subscription;
  }());
  exports.Subscription = Subscription;
  return module.exports;
});

$__System.registerDynamic("174", ["47"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('47');
  var Action = (function(_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
      _super.call(this);
    }
    Action.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this;
    };
    return Action;
  }(Subscription_1.Subscription));
  exports.Action = Action;
  return module.exports;
});

$__System.registerDynamic("169", ["7e", "174"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('7e');
  var Action_1 = $__require('174');
  var AsyncAction = (function(_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    AsyncAction.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      this.pending = true;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.delay = delay;
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && this.delay === delay) {
        return id;
      }
      return root_1.root.clearInterval(id) && undefined || undefined;
    };
    AsyncAction.prototype.execute = function(state, delay) {
      if (this.closed) {
        return new Error('executing a cancelled action');
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction.prototype._execute = function(state, delay) {
      var errored = false;
      var errorValue = undefined;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = !!e && e || new Error(e);
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction.prototype._unsubscribe = function() {
      var id = this.id;
      var scheduler = this.scheduler;
      var actions = scheduler.actions;
      var index = actions.indexOf(this);
      this.work = null;
      this.delay = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (index !== -1) {
        actions.splice(index, 1);
      }
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
    };
    return AsyncAction;
  }(Action_1.Action));
  exports.AsyncAction = AsyncAction;
  return module.exports;
});

$__System.registerDynamic("175", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var RequestAnimationFrameDefinition = (function() {
    function RequestAnimationFrameDefinition(root) {
      if (root.requestAnimationFrame) {
        this.cancelAnimationFrame = root.cancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.requestAnimationFrame.bind(root);
      } else if (root.mozRequestAnimationFrame) {
        this.cancelAnimationFrame = root.mozCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.mozRequestAnimationFrame.bind(root);
      } else if (root.webkitRequestAnimationFrame) {
        this.cancelAnimationFrame = root.webkitCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.webkitRequestAnimationFrame.bind(root);
      } else if (root.msRequestAnimationFrame) {
        this.cancelAnimationFrame = root.msCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.msRequestAnimationFrame.bind(root);
      } else if (root.oRequestAnimationFrame) {
        this.cancelAnimationFrame = root.oCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.oRequestAnimationFrame.bind(root);
      } else {
        this.cancelAnimationFrame = root.clearTimeout.bind(root);
        this.requestAnimationFrame = function(cb) {
          return root.setTimeout(cb, 1000 / 60);
        };
      }
    }
    return RequestAnimationFrameDefinition;
  }());
  exports.RequestAnimationFrameDefinition = RequestAnimationFrameDefinition;
  exports.AnimationFrame = new RequestAnimationFrameDefinition(root_1.root);
  return module.exports;
});

$__System.registerDynamic("176", ["169", "175"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncAction_1 = $__require('169');
  var AnimationFrame_1 = $__require('175');
  var AnimationFrameAction = (function(_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    AnimationFrameAction.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }
      scheduler.actions.push(this);
      return scheduler.scheduled || (scheduler.scheduled = AnimationFrame_1.AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
      }
      if (scheduler.actions.length === 0) {
        AnimationFrame_1.AnimationFrame.cancelAnimationFrame(id);
        scheduler.scheduled = undefined;
      }
      return undefined;
    };
    return AnimationFrameAction;
  }(AsyncAction_1.AsyncAction));
  exports.AnimationFrameAction = AnimationFrameAction;
  return module.exports;
});

$__System.registerDynamic("177", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Scheduler = (function() {
    function Scheduler(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }
    Scheduler.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function() {
      return +new Date();
    };
    return Scheduler;
  }());
  exports.Scheduler = Scheduler;
  return module.exports;
});

$__System.registerDynamic("16a", ["177"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Scheduler_1 = $__require('177');
  var AsyncScheduler = (function(_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
      _super.apply(this, arguments);
      this.actions = [];
      this.active = false;
      this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function(action) {
      var actions = this.actions;
      if (this.active) {
        actions.push(action);
        return;
      }
      var error;
      this.active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this.active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler;
  }(Scheduler_1.Scheduler));
  exports.AsyncScheduler = AsyncScheduler;
  return module.exports;
});

$__System.registerDynamic("178", ["16a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncScheduler_1 = $__require('16a');
  var AnimationFrameScheduler = (function(_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
      _super.apply(this, arguments);
    }
    AnimationFrameScheduler.prototype.flush = function() {
      this.active = true;
      this.scheduled = undefined;
      var actions = this.actions;
      var error;
      var index = -1;
      var count = actions.length;
      var action = actions.shift();
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
      this.active = false;
      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AnimationFrameScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.AnimationFrameScheduler = AnimationFrameScheduler;
  return module.exports;
});

$__System.registerDynamic("179", ["176", "178"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AnimationFrameAction_1 = $__require('176');
  var AnimationFrameScheduler_1 = $__require('178');
  exports.animationFrame = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
  return module.exports;
});

$__System.registerDynamic("164", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var Symbol = root_1.root.Symbol;
  exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
  return module.exports;
});

$__System.registerDynamic("f6", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  var Symbol = root_1.root.Symbol;
  if (typeof Symbol === 'function') {
    if (Symbol.iterator) {
      exports.$$iterator = Symbol.iterator;
    } else if (typeof Symbol.for === 'function') {
      exports.$$iterator = Symbol.for('iterator');
    }
  } else {
    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
      exports.$$iterator = '@@iterator';
    } else if (root_1.root.Map) {
      var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
          exports.$$iterator = key;
          break;
        }
      }
    } else {
      exports.$$iterator = '@@iterator';
    }
  }
  return module.exports;
});

$__System.registerDynamic("7e", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };
  exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
  }
  return module.exports;
});

$__System.registerDynamic("fa", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('7e');
  function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        $$observable = Symbol.observable;
      } else {
        $$observable = Symbol('observable');
        Symbol.observable = $$observable;
      }
    } else {
      $$observable = '@@observable';
    }
    return $$observable;
  }
  exports.getSymbolObservable = getSymbolObservable;
  exports.$$observable = getSymbolObservable(root_1.root);
  return module.exports;
});

$__System.registerDynamic("7", ["80", "25", "2a", "2d", "33", "36", "3b", "3e", "41", "44", "49", "4c", "4f", "51", "54", "59", "5c", "5d", "62", "64", "65", "69", "6c", "6f", "72", "76", "79", "7c", "84", "86", "88", "8a", "8c", "8e", "90", "92", "94", "95", "96", "99", "9c", "9f", "a1", "a3", "a5", "a7", "a9", "ac", "ae", "af", "b2", "b3", "b6", "b8", "ba", "bc", "be", "c1", "c2", "c5", "c6", "c9", "cc", "d1", "d3", "d5", "d7", "d9", "db", "dd", "df", "e0", "e3", "e5", "e8", "e9", "ea", "eb", "ec", "ee", "f0", "f1", "f3", "fb", "fd", "100", "102", "104", "107", "109", "10b", "10c", "10d", "10f", "111", "113", "115", "117", "119", "11b", "11d", "121", "123", "125", "127", "129", "12b", "12f", "131", "133", "135", "137", "139", "13b", "13d", "13f", "141", "142", "145", "147", "148", "14b", "14d", "14f", "151", "153", "155", "157", "159", "15a", "15d", "47", "81", "28", "82", "106", "11e", "11f", "ab", "cb", "c0", "15f", "173", "143", "149", "167", "168", "7b", "12d", "57", "15e", "179", "164", "f6", "fa"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Subject_1 = $__require('80');
  exports.Subject = Subject_1.Subject;
  var Observable_1 = $__require('25');
  exports.Observable = Observable_1.Observable;
  $__require('2a');
  $__require('2d');
  $__require('33');
  $__require('36');
  $__require('3b');
  $__require('3e');
  $__require('41');
  $__require('44');
  $__require('49');
  $__require('4c');
  $__require('4f');
  $__require('51');
  $__require('54');
  $__require('59');
  $__require('5c');
  $__require('5d');
  $__require('62');
  $__require('64');
  $__require('65');
  $__require('69');
  $__require('6c');
  $__require('6f');
  $__require('72');
  $__require('76');
  $__require('79');
  $__require('7c');
  $__require('84');
  $__require('86');
  $__require('88');
  $__require('8a');
  $__require('8c');
  $__require('8e');
  $__require('90');
  $__require('92');
  $__require('94');
  $__require('95');
  $__require('96');
  $__require('99');
  $__require('9c');
  $__require('9f');
  $__require('a1');
  $__require('a3');
  $__require('a5');
  $__require('a7');
  $__require('a9');
  $__require('ac');
  $__require('ae');
  $__require('af');
  $__require('b2');
  $__require('b3');
  $__require('b6');
  $__require('b8');
  $__require('ba');
  $__require('bc');
  $__require('be');
  $__require('c1');
  $__require('c2');
  $__require('c5');
  $__require('c6');
  $__require('c9');
  $__require('cc');
  $__require('d1');
  $__require('d3');
  $__require('d5');
  $__require('d7');
  $__require('d9');
  $__require('db');
  $__require('dd');
  $__require('df');
  $__require('e0');
  $__require('e3');
  $__require('e5');
  $__require('e8');
  $__require('e9');
  $__require('ea');
  $__require('eb');
  $__require('ec');
  $__require('ee');
  $__require('f0');
  $__require('f1');
  $__require('f3');
  $__require('fb');
  $__require('fd');
  $__require('100');
  $__require('102');
  $__require('104');
  $__require('107');
  $__require('109');
  $__require('10b');
  $__require('10c');
  $__require('10d');
  $__require('10f');
  $__require('111');
  $__require('113');
  $__require('115');
  $__require('117');
  $__require('119');
  $__require('11b');
  $__require('11d');
  $__require('121');
  $__require('123');
  $__require('125');
  $__require('127');
  $__require('129');
  $__require('12b');
  $__require('12f');
  $__require('131');
  $__require('133');
  $__require('135');
  $__require('137');
  $__require('139');
  $__require('13b');
  $__require('13d');
  $__require('13f');
  $__require('141');
  $__require('142');
  $__require('145');
  $__require('147');
  $__require('148');
  $__require('14b');
  $__require('14d');
  $__require('14f');
  $__require('151');
  $__require('153');
  $__require('155');
  $__require('157');
  $__require('159');
  $__require('15a');
  $__require('15d');
  var Subscription_1 = $__require('47');
  exports.Subscription = Subscription_1.Subscription;
  var Subscriber_1 = $__require('81');
  exports.Subscriber = Subscriber_1.Subscriber;
  var AsyncSubject_1 = $__require('28');
  exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
  var ReplaySubject_1 = $__require('82');
  exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
  var BehaviorSubject_1 = $__require('106');
  exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
  var MulticastObservable_1 = $__require('11e');
  exports.MulticastObservable = MulticastObservable_1.MulticastObservable;
  var ConnectableObservable_1 = $__require('11f');
  exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
  var Notification_1 = $__require('ab');
  exports.Notification = Notification_1.Notification;
  var EmptyError_1 = $__require('cb');
  exports.EmptyError = EmptyError_1.EmptyError;
  var ArgumentOutOfRangeError_1 = $__require('c0');
  exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
  var ObjectUnsubscribedError_1 = $__require('15f');
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
  var UnsubscriptionError_1 = $__require('173');
  exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
  var timeInterval_1 = $__require('143');
  exports.TimeInterval = timeInterval_1.TimeInterval;
  var timestamp_1 = $__require('149');
  exports.Timestamp = timestamp_1.Timestamp;
  var TestScheduler_1 = $__require('167');
  exports.TestScheduler = TestScheduler_1.TestScheduler;
  var VirtualTimeScheduler_1 = $__require('168');
  exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
  var AjaxObservable_1 = $__require('7b');
  exports.AjaxResponse = AjaxObservable_1.AjaxResponse;
  exports.AjaxError = AjaxObservable_1.AjaxError;
  exports.AjaxTimeoutError = AjaxObservable_1.AjaxTimeoutError;
  var asap_1 = $__require('12d');
  var async_1 = $__require('57');
  var queue_1 = $__require('15e');
  var animationFrame_1 = $__require('179');
  var rxSubscriber_1 = $__require('164');
  var iterator_1 = $__require('f6');
  var observable_1 = $__require('fa');
  var Scheduler = {
    asap: asap_1.asap,
    queue: queue_1.queue,
    animationFrame: animationFrame_1.animationFrame,
    async: async_1.async
  };
  exports.Scheduler = Scheduler;
  var Symbol = {
    rxSubscriber: rxSubscriber_1.$$rxSubscriber,
    observable: observable_1.$$observable,
    iterator: iterator_1.$$iterator
  };
  exports.Symbol = Symbol;
  return module.exports;
});

$__System.register("11", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Rx_1;
  var enemyPassAllPaths$,
      enemyMove$;
  return {
    setters: [function(Rx_1_1) {
      Rx_1 = Rx_1_1;
    }],
    execute: function() {
      exports_1("enemyPassAllPaths$", enemyPassAllPaths$ = new Rx_1.Subject());
      exports_1("enemyMove$", enemyMove$ = new Rx_1.Subject());
    }
  };
});

$__System.registerDynamic("5", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  return module.exports;
});

$__System.register("1", ["c2", "e9", "142", "10", "13", "12", "2", "9", "d", "e", "18", "19", "1e", "a", "20", "15", "1a", "23", "11"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var stage_1,
      utils_1,
      ticker_1,
      path_1,
      scenario_1,
      stage_2,
      index_1,
      sinks_1,
      index_2,
      sinks_2,
      index_3,
      sinks_3,
      index_4,
      sinks_4,
      enemy_1,
      sinks_5;
  var sinks,
      counter;
  return {
    setters: [function(_1) {}, function(_2) {}, function(_3) {}, function(stage_1_1) {
      stage_1 = stage_1_1;
      stage_2 = stage_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(ticker_1_1) {
      ticker_1 = ticker_1_1;
    }, function(path_1_1) {
      path_1 = path_1_1;
    }, function(index_1_1) {
      index_1 = index_1_1;
    }, function(index_2_1) {
      index_2 = index_2_1;
    }, function(scenario_1_1) {
      scenario_1 = scenario_1_1;
    }, function(index_3_1) {
      index_3 = index_3_1;
    }, function(_4) {}, function(index_4_1) {
      index_4 = index_4_1;
    }, function(sinks_1_1) {
      sinks_1 = sinks_1_1;
    }, function(sinks_2_1) {
      sinks_2 = sinks_2_1;
    }, function(sinks_3_1) {
      sinks_3 = sinks_3_1;
    }, function(sinks_4_1) {
      sinks_4 = sinks_4_1;
    }, function(enemy_1_1) {
      enemy_1 = enemy_1_1;
    }, function(sinks_5_1) {
      sinks_5 = sinks_5_1;
    }],
    execute: function() {
      stage_1.default.addChild(path_1.default);
      sinks = {
        ticker$: ticker_1.default,
        stageClick$: stage_2.stageClick$,
        newTower$: sinks_3.newTower$,
        towerFireToEnemy$: sinks_3.towerFireToEnemy$,
        bulletMove$: sinks_4.bulletMove$,
        bulletHitEnemy$: sinks_4.bulletHitEnemy$,
        enemyPassAllPaths$: sinks_5.enemyPassAllPaths$,
        enemyMove$: sinks_5.enemyMove$,
        changeWalletState$: sinks_1.changeWalletState$,
        addTowerButtonClick$: sinks_2.addTowerButtonClick$,
        cancelTowerButtonClick$: sinks_2.cancelTowerButtonClick$,
        confirmTowerButtonClick$: sinks_2.confirmTowerButtonClick$,
        playPauseButtonClick$: sinks_2.playPauseButtonClick$
      };
      index_1.runWallet(sinks);
      index_2.runMenu(sinks);
      index_4.runBullet(sinks);
      index_3.runTower(sinks);
      counter = 0;
      ticker_1.default.filter(function() {
        return ++counter % utils_1.getTickerPerEnemy(counter, scenario_1.default) === 0;
      }).subscribe(function() {
        enemy_1.enemyFactory();
      });
      ticker_1.default.subscribe(function() {
        stage_1.default.update();
      });
    }
  };
});

})
(function(factory) {
  factory();
});
//# sourceMappingURL=bundle.js.map