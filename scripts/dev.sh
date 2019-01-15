#!/usr/bin/env sh
devMain='./mainprocess/main.js'
proMain='./dist/mainprocess/main.js'
sed -i "" "s|${proMain}|${devMain}|" ./package.json
npm run dev:api
npm run dev:web
echo '渲染启动完成,请启动主进程'