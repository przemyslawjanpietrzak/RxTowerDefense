mkdir -p  build build/fonts
cp -p index-build.html build/
mv build/index-build.html build/index.html
jspm build src/main.ts build/bundle.js --inject
cp ./jspm_packages/github/kristopolous/BOOTSTRA.386@master/v2.3.1/bootstrap/css/bootstrap.css ./build
cp ./jspm_packages/github/kristopolous/BOOTSTRA.386@master/v2.3.1/bootstrap/css/fonts/Fixedsys500c.woff ./build/fonts
