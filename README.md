[![Build Status](https://travis-ci.org/przemyslawjanpietrzak/RxTowerDefense.svg?branch=develop)](https://travis-ci.org/przemyslawjanpietrzak/RxTowerDefense)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# RX Tower Defense

Tower defense engine game written in [TypeScript](https://github.com/Microsoft/TypeScript) with [rx.js5](https://github.com/ReactiveX/rxjs), and pattern from [Cycle.js](https://github.com/cyclejs/cyclejs).

![alt tag](https://przemyslawjanpietrzak.github.io/rxTD-screenshot.jpg)

## Production:

[develop](https://s3.eu-central-1.amazonaws.com/rxtd-develop/index.html)

[stable](https://s3.eu-central-1.amazonaws.com/rxtd-master/index.html)

## Run:

#### Install packages:
```
npm install
```

#### Build bundle
```
npm run build
```

#### Run linter
```
npm run lint
```

#### Run unit tests
```
npm tests
```

#### Run:
```
google-chrome dist/index.html
```

#### Deploy on AWS S3
```
npm run deploy:master
npm run deploy:develop
npm run deploy:pull-request
```
