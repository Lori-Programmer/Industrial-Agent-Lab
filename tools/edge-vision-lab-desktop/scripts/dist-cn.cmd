@echo off
set "ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/"
set "npm_config_electron_mirror=https://npmmirror.com/mirrors/electron/"
set "ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/"
set "CSC_IDENTITY_AUTO_DISCOVERY=false"
scripts\node-run.cmd ./node_modules/typescript/bin/tsc --noEmit && scripts\node-run.cmd ./node_modules/vite/bin/vite.js build && scripts\node-run.cmd ./node_modules/typescript/bin/tsc -p tsconfig.electron.json && scripts\node-run.cmd ./node_modules/electron-builder/cli.js --win --config electron-builder.yml
