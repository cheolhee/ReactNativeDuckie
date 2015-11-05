// Compiled by ClojureScript 1.7.122 {}
goog.provide('reagentnative.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('reagent.impl.component');
React = require("react-native");
reagentnative.core.text = reagent.core.adapt_react_class.call(null,React.Text);
reagentnative.core.view = reagent.core.adapt_react_class.call(null,React.View);
reagentnative.core.image = reagent.core.adapt_react_class.call(null,React.Image);
reagentnative.core.navigator = reagent.core.adapt_react_class.call(null,React.NavigatorIOS);
reagentnative.core.button = reagent.core.adapt_react_class.call(null,require("react-native-button"));
cljs.core.enable_console_print_BANG_.call(null);
reagentnative.core.create_style = (function reagentnative$core$create_style(s){
var s1 = cljs.core.reduce.call(null,(function (p1__6929_SHARP_,p2__6930_SHARP_){
return cljs.core.assoc.call(null,p1__6929_SHARP_,p2__6930_SHARP_.call(null,(0)),reagent.impl.component.camelify_map_keys.call(null,p2__6930_SHARP_.call(null,(1))));
}),cljs.core.PersistentArrayMap.EMPTY,s);
return cljs.core.js__GT_clj.call(null,React.StyleSheet.create(cljs.core.clj__GT_js.call(null,s1)));
});
reagentnative.core.styles = reagentnative.core.create_style.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"duck","duck",-542480189),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),(200),new cljs.core.Keyword(null,"height","height",1025178622),(200),new cljs.core.Keyword(null,"align-self","align-self",1475936794),"center"], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"margin","margin",-995903681),(5),new cljs.core.Keyword(null,"padding","padding",1660304693),(10),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#fff",new cljs.core.Keyword(null,"border-color","border-color",-2059162761),"#aaa",new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(8),new cljs.core.Keyword(null,"border-width","border-width",-1512605390),(1)], null),new cljs.core.Keyword(null,"bath","bath",-780871207),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"text-align","text-align",1786091845),"center",new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(22),new cljs.core.Keyword(null,"margin","margin",-995903681),(1),new cljs.core.Keyword(null,"padding","padding",1660304693),(2)], null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"text-align","text-align",1786091845),"center",new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(16),new cljs.core.Keyword(null,"margin","margin",-995903681),(1),new cljs.core.Keyword(null,"padding","padding",1660304693),(2)], null),new cljs.core.Keyword(null,"fullscreen","fullscreen",-4371054),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"top","top",-1856271961),(0),new cljs.core.Keyword(null,"left","left",-399115937),(0),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),(0),new cljs.core.Keyword(null,"right","right",-452581833),(0)], null),new cljs.core.Keyword(null,"top-view","top-view",-1952554663),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"top","top",-1856271961),((64) + (0)),new cljs.core.Keyword(null,"padding","padding",1660304693),((5) + (0))], null)], null));
reagentnative.core.scan_data = reagent.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
reagentnative.core.duck_uri = reagent.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
reagentnative.core.set_duck_image_BANG_ = (function reagentnative$core$set_duck_image_BANG_(sh,t){
var sh_s = (((sh > 2.0))?"e3.gif":"g.png"
);
var t_s = (((t >= (25)))?"2":"0"
);
var uri = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"uri","uri",-774711847),[cljs.core.str("http://54.65.130.67/gazou/d"),cljs.core.str(t_s),cljs.core.str(sh_s)].join('')], null);
if(cljs.core.not_EQ_.call(null,cljs.core.deref.call(null,reagentnative.core.duck_uri),uri)){
return cljs.core.reset_BANG_.call(null,reagentnative.core.duck_uri,uri);
} else {
return null;
}
});
reagentnative.core.duck_standing = (function reagentnative$core$duck_standing(){
return reagentnative.core.set_duck_image_BANG_.call(null,(0),(16));
});
reagentnative.core.duck_standing.call(null);
reagentnative.core.scan_manager = React.NativeModules.ScanManager;
reagentnative.core.emitter = React.NativeAppEventEmitter;
reagentnative.core.subscription = reagentnative.core.emitter.addListener("scan_data",(function (params){
cljs.core.reset_BANG_.call(null,reagentnative.core.scan_data,cljs.core.js__GT_clj.call(null,params));

var d = cljs.core.deref.call(null,reagentnative.core.scan_data);
return reagentnative.core.set_duck_image_BANG_.call(null,d.call(null,"sh"),d.call(null,"t"));
}));
reagentnative.core.start_scan = (function reagentnative$core$start_scan(){
return reagentnative.core.scan_manager.start_scan();
});
reagentnative.core.stop_scan = (function reagentnative$core$stop_scan(){
reagentnative.core.scan_manager.stop_scan();

return reagentnative.core.set_duck_image_BANG_.call(null,(0),(16));
});
reagentnative.core.main_view = reagent.core.reactify_component.call(null,(function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.styles.call(null,"top-view")], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"align-self","align-self",1475936794),"center",new cljs.core.Keyword(null,"padding","padding",1660304693),(0)], null)], null),"reagent native + clojurescript"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.image,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"source","source",-433931539),cljs.core.deref.call(null,reagentnative.core.duck_uri),new cljs.core.Keyword(null,"resize-mode","resize-mode",-962168418),"cover",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),(240),new cljs.core.Keyword(null,"width","width",-384071477),(320),new cljs.core.Keyword(null,"align-self","align-self",1475936794),"center"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"bath")], null),(function (){var d = cljs.core.deref.call(null,reagentnative.core.scan_data);
return [cljs.core.str("\uD83D\uDEC0:"),cljs.core.str(d.call(null,"t")),cljs.core.str("\u2103")].join('');
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"data")], null),(function (){var d = cljs.core.deref.call(null,reagentnative.core.scan_data);
return [cljs.core.str("x="),cljs.core.str(d.call(null,"x")),cljs.core.str(" y="),cljs.core.str(d.call(null,"y")),cljs.core.str(" z="),cljs.core.str(d.call(null,"z")),cljs.core.str("\ndx="),cljs.core.str(d.call(null,"dx")),cljs.core.str(" dy="),cljs.core.str(d.call(null,"dy")),cljs.core.str(" dz="),cljs.core.str(d.call(null,"dz"))].join('');
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"data")], null),(function (){var d = cljs.core.deref.call(null,reagentnative.core.scan_data);
return [cljs.core.str("\uD83D\uDC83="),cljs.core.str(d.call(null,"sh"))].join('');
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"buttons"),new cljs.core.Keyword(null,"on-press","on-press",-1763585856),reagentnative.core.start_scan], null),"Begin Scan"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"buttons"),new cljs.core.Keyword(null,"on-press","on-press",-1763585856),reagentnative.core.stop_scan], null),"Stop Scan"], null)], null);
}));
reagentnative.core.root = (function reagentnative$core$root(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.navigator,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"initial-route","initial-route",-622635808),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"React Native Duckie",new cljs.core.Keyword(null,"component","component",1555936782),reagentnative.core.main_view], null),new cljs.core.Keyword(null,"style","style",-496642736),reagentnative.core.styles.call(null,"fullscreen")], null)], null);
});
React.AppRegistry.registerRunnable("ReactNativeDuckie",(function (params){
cljs.core.println.call(null,params.rootTag);

return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagentnative.core.root], null),(1));
}));
cljs.core.print.call(null,"Anyway, end of program.");
