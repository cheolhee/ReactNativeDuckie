
# React Native Duckie : iOS App Development with React Native and ClojureScript

Lisp을 좋아하는 사람들의 그룹(한국 리스퍼),  제 4회 리습 세미나 발표 자료입니다.
###  발표자
한철희 Cheolhee Han

### 왜 이것을 만들었나
1. ClojureScript로 iOS **네이티브** 앱 개발이 가능함을 보여주고 싶었습니다.
2. ReactJS + ClojureScript 조합은 OM, reagent 등을 이용하면 되지만,  ClojureScript를 이용한 React **Native** 앱 개발 사례는 없어서, 만들어 보게 되었습니다.
3. WebView가 아닌 네이티브 화면을 띄웁니다.

`chendesheng`의 [ReagentNativeDemo](https://github.com/chendesheng/ReagentNativeDemo ) 를 이용하여 core.cljs를 수정하였습니다.

### 설치
1. clone this repository
2. `cd ReactNativeDuckike/react-native-duckie`
3. `npm install`
4. `cd reagentnative`
5. `lein cljsbuild auto`
6. run the Xcode project in 'ios' Folder

### 시연

 - 러버덕이 흔들리면 앱의 러버덕도 흔들립니다
 - 러버덕을 목욕물에 띄워 두면 온도를 감지, 빨간 러버덕으로 변합니다
 - 온도센서와 가속도센서가 내장된 Rubber Duck이 송신하는 BLE신호를 App에서 수신하여 반응
 - core.cljs , index.ios.js 를 어떤 식으로 작성되었는지 확인

### 기타

- HW관련 코드는 삭제된 소스를 공개함을 양해 바랍니다.
- 문의는 Google Groups https://groups.google.com/forum/#!forum/lisp-korea 에 하시면 되겠습니다.
