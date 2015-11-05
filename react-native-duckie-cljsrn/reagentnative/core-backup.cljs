(ns reagentnative.core
  (:require [reagent.core :as r :refer [atom]]
            [reagent.impl.component :as ru]))

(set! js/React (js/require "react-native"))

(def text (r/adapt-react-class (.-Text js/React)))
(def view (r/adapt-react-class (.-View js/React)))
(def image (r/adapt-react-class (.-Image js/React)))
(def touchable-highlight (r/adapt-react-class (.-TouchableHighlight js/React)))
(def navigator (r/adapt-react-class (.-NavigatorIOS js/React)))
(def scroll (r/adapt-react-class (.-ScrollView js/React)))
(def input (r/adapt-react-class (.-TextInput js/React)))
(def switch (r/adapt-react-class (.-SwitchIOS js/React)))
(def list-view (r/adapt-react-class (.-ListView js/React)))
(def slider (r/adapt-react-class (.-SliderIOS js/React)))
; (def tabs (r/adapt-react-class (.-TabBarIOS js/React)))
; (def tabs-item (r/adapt-react-class (.-TabBarIOS.Item js/React)))

; var CalendarManager = require('react-native').NativeModules.CalendarManager;
; CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');

; (def scan-manager (r/adapt-react-class (.-ScanManager (.-NativeModules js/React))))
(def scan-manager (.-ScanManager (.-NativeModules js/React)))

; var { NativeAppEventEmitter } = require('react-native');
; (def emitter (r/adapt-react-class (.-NativeAppEventEmitter js/React)))

; var subscription = NativeAppEventEmitter.addListener(
;   'EventReminder',
;   (reminder) => console.log(reminder.name)
; );
; (def subscription (.-addListener emitter "event1" )) ; (fn [params] "" )))




(defn alert[title content]
  (.alert (.-AlertIOS js/React) title content))

(defn create-style[s]
  (let [s1 (reduce #(assoc %1 (%2 0) (ru/camelify-map-keys (%2 1))) {} s)]
    (js->clj (.create (.-StyleSheet js/React) (clj->js s1)))))

(enable-console-print!)

(def styles (create-style
  {:fullscreen {:position "absolute"
          :top 0
          :left 0
          :bottom 0
          :right 0}
   :blue {:color "#00f"}
   :top-view {
     :top (+ 64 0)
     :padding (+ 10 0)
     :background-color "#ffffc0"
    ;  :border-width 1
    ;  :border-color "red"
   }
   :viewbg {:padding 20
            :background-color "#ffffc0"
            :top (+ 64 10)
          }
   :input {:height 35
           :border-color "gray"
           :border-width 1
           :padding-left 10
           :border-radius 5
           :margin 10}}))

(def global-state (r/atom 0))
(def scan-data (r/atom {:a "1"}))


(declare page-comp)

(def ds (React.ListView.DataSource. #js{:rowHasChanged (fn [a b] false)}))

(defn list-view-source [v]
  (let [res #js[]]
    (doseq [item v]
      (.push res (r/atom item)))
    (r/atom (js->clj res))))

(def rows (list-view-source (clj->js (range 7))))

(def current-tab (r/atom "tab1"))

; (def duck-ground {:uri "http://54.65.130.67/gazou/duck_ground.png"})
(def duck-ground {:uri "http://54.65.130.67/gazou/alarm.png"})
(def duck-excited {:uri "http://54.65.130.67/gazou/duck_excited.gif"})

(def duck-uri (r/atom duck-ground))

(defn page[{nav :navigator}]
    ; [tabs
    ;  [tabs-item {:title "tab1" :on-press #(reset! current-tab "tab1")
    ;   :selected (= "tab1" @current-tab)}
      ; [scroll {:always-bounce-vertical true
      ;          :bounces true
      ;          :style (styles "fullscreen")}
       [view {:style [(styles "top-view") {:flexDirection "column"}]}

        [text @global-state]
        [text {:style {:color "red" :padding 10}}
          (str "debug= " @scan-data)]

        [text {:style (styles "blue")} "Hello, World~"]
        [input {:style (styles "input")
                :value (str @global-state)
                :on-change-text #(reset! global-state %)}]
        [slider {:style {:width 200}
                :value @global-state
                 :on-value-change #(reset! global-state %)}]
        [view {:style
                  ; [
                    {:border-width 1 :border-color "red"
                     :background-color "#eef"
                      }
                      ; ]
                }
            [text {:style {:align-self "center" :padding 10} }
             "러버덕"]

            [image {:source
              ; {:uri
              @duck-uri
              ; }
              :resize-mode "contain"
            :style {:border-width 1 :border-color "red"
              ; :width 200
              :height 240
              :width 240
              :align-self "center"
              }
            }]

          ]
        ; [image {:source {:uri "https://assets-cdn.github.com/images/modules/microsoft_callout/corner.png"}
        ;         :style {:width 306 :height 104}}]
        ; [list-view {:dataSource (.cloneWithRows ds (clj->js @rows))
        ;             :render-row (fn[row]
        ;                           (js/React.createElement row-comp #js{:row row}))
        ;             :style {:left 0 :right 0 :height 250 :border-width 1 :border-color "#000"}}]

        ; [switch {:on-value-change #(.push nav #js{:title "new" :component page-comp})}]
        ; [text {:on-press #(swap! (get @rows 99) inc)} "click update list"]
        ; [text {:on-press #(swap! rows conj (r/atom 100))} "click add list"]

        ]
      ; ]  ; scroll
        ; ]
    ;  [tabs-item {:title "tab2" :selected (= "tab2" @current-tab) :on-press #(reset! current-tab "tab2")}
    ;   [text {:style {:top 100}} "tab2"]]
    ;  [tabs-item {:title "tab3" :selected (= "tab3" @current-tab) :on-press #(reset! current-tab "tab3")}
    ;   [text {:style {:top 100}} "tab3"]
      ; ]
      ; ]
      )

(def page-comp (r/reactify-component page))
; (def row-comp (r/reactify-component (fn[props]
;                                       (let [row (props :row)]
;                                         (print props)
;                                         [touchable-highlight {:style {:border-top-width 1 :border-color "#000"} :on-press #(alert "list" (str @row))}
;                                          [text @row]]))))


(print (str "debug=" scan-manager))

(.hello scan-manager)


(defn root []
  [navigator {:initial-route {:title "Demo" :component page-comp}
    :style (styles "fullscreen")}])

(.registerRunnable (.-AppRegistry js/React) "BeaconScan"
                   (fn [params]
                     (r/render [root] (.-rootTag params))))

; (.registerComponent (.-AppRegistry js/React) "AwesomeProject"
;                   (fn [params]
;                     ; (r/render [root] (.-rootTag params))
;                     (r/render [root] {} )
;                     ))

; var subscription = NativeAppEventEmitter.addListener(
;   'EventReminder',
;   (reminder) => console.log(reminder.name)
; );
; (def subscription (.-addListener emitter "event1" )) ; (fn [params] "" )))
(def emitter (.-NativeAppEventEmitter js/React))
(def subscription
  (.addListener emitter "event1"
    (fn [params]
      (do (println params)
        ; (println (str (js->clj params {:keywordize-keys true})))
        ; (println (str (js->clj params {:keywordize-keys false})))
        (reset! scan-data (js->clj params))
        )
      )))





;
