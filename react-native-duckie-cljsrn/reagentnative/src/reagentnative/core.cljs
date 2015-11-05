(ns reagentnative.core
  (:require [reagent.core :as r :refer [atom]]
            [reagent.impl.component :as ru]
            ))
(set! js/React (js/require "react-native"))
(def text (r/adapt-react-class (.-Text js/React)))
(def view (r/adapt-react-class (.-View js/React)))
(def image (r/adapt-react-class (.-Image js/React)))
(def navigator (r/adapt-react-class (.-NavigatorIOS js/React)))
;
; javascript와는 선언방법이 약간 다르다. 아래처럼 콤포넌트명을 쓰면 인식이 안된다.
; (def button (r/adapt-react-class (-.Button (js/require "react-native-button"))))
(def button (r/adapt-react-class (js/require "react-native-button")))
(enable-console-print!)

(defn create-style[s]
  (let [s1 (reduce #(assoc %1 (%2 0) (ru/camelify-map-keys (%2 1))) {} s)]
    (js->clj (.create (.-StyleSheet js/React) (clj->js s1)))))

(def styles
  (create-style
  {
    :duck {
      :width 200 :height 200
      :align-self "center"
    }
    :buttons {
      :margin 5
      :padding 10
      :background-color "#fff"
      :border-color "#aaa"
      :border-radius 8
      :border-width 1
    }
    :bath {
      :text-align "center"
      :font-size 22 :margin 1 :padding 2
    }
    :data {
      :text-align "center"
      :font-size 16
      :margin 1
      :padding 2
    }
    :fullscreen {:position "absolute" :top 0 :left 0 :bottom 0 :right 0}
   :top-view {
     :top (+ 64 0) :padding (+ 5 0)
   }
    }
    )
    )

(def scan-data (r/atom {}))
(def duck-uri  (r/atom {}))

; 러버덕 이미지 처리
(defn set-duck-image! [sh t]
  (let [
    sh-s (cond
        (> sh 2.0) "e3.gif" :else "g.png")
    t-s (cond (>= t 25) "2" :else "0")
    uri {:uri (str "http://54.65.130.67/gazou/d" t-s sh-s)}
    ]
    (if (not= @duck-uri uri)
      (reset! duck-uri uri) nil)
  ))

(defn duck-standing [] (set-duck-image! 0 16))
(duck-standing)

(def scan-manager (.-ScanManager (.-NativeModules js/React)))
(.prepareCBManager scan-manager)

; (print (str "debug=" scan-manager))

(def emitter (.-NativeAppEventEmitter js/React))
(def subscription
  (.addListener emitter "scan_data"
    (fn [params]
      (do
        (reset! scan-data (js->clj params))
        (let [d @scan-data ]
          (set-duck-image! (d "sh") (d "t")))
       ))))

(defn start-scan []
  (do
    (.start_scan scan-manager)))
(defn stop-scan []
  (do
    (.stop_scan scan-manager)
    (set-duck-image! 0 16)))

; r/reactify-component가 React.createClass 를 호훌한다.
(def  main-view (r/reactify-component
  (fn []
  [view  {:style [(styles "top-view")]}

    [text {:style {:align-self "center" :padding 0 } }
      "reagent native + clojurescript"]

    [image {:source @duck-uri
      :resize-mode "cover" ; contain | stretch
      :style {
       :height 240
       :width 320 :align-self "center"
      }
    }]
    [text {:style (styles "bath")}
      (let [d @scan-data]
        (str
           "🛀:" (d "t") "℃"
             ))
        ]

    [text {:style (styles "data")}
      (let [d @scan-data]
        (str
            "x=" (d "x")
           " y=" (d "y")
           " z=" (d "z")
          "\ndx=" (d "dx")
           " dy=" (d "dy")
           " dz=" (d "dz")
             ))
        ]
    [text {:style (styles "data")}
      (let [d @scan-data]
        (str
           "💃=" (d "sh")
             ))
        ]

    [button {:style (styles "buttons")
      :on-press start-scan
      } "Begin Scan"]
    [button {:style (styles "buttons")
      :on-press stop-scan
      } "Stop Scan"]

    ] ; main-view

    )
  ))

; ROOT 화면
(defn root []
  [navigator {:initial-route {:title "React Native Duckie" :component main-view}
    :style (styles "fullscreen")}])

(.registerRunnable (.-AppRegistry js/React) "ReactNativeDuckie"
                   (fn [params]
                     (do
                      (println (.-rootTag params))
                    ;  (r/render [root] (.-rootTag params))
                     (r/render [root] 1)
                     )
                     ))

(print "launched.")


;
