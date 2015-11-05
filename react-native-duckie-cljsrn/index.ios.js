/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
//var { NativeAppEventEmitter } = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  View,
  Text,
  StyleSheet,
  Image,
  NativeAppEventEmitter,
//  ScanManager,
} = React;

var ScanManager = require('react-native').NativeModules.ScanManager;

var duck_excited_img = {uri:'http://54.65.130.67/gazou/duck_excited.gif'};
var duck_ground_img = {uri:'http://54.65.130.67/gazou/duck_ground.png'};


var MainView = React.createClass({

  getInitialState:function() {
    return {scan_data:{}
    , "duck_image": duck_ground_img
  };

  },

  componentDidMount: function() {
    var subscription = NativeAppEventEmitter.addListener(
      'scan_data',
      (scan_data) => {
        this.setState({"scan_data":scan_data});
        if (scan_data.sh > 7) {
          this.setState({"duck_image":duck_excited_img});
        } else {
          this.setState({"duck_image":duck_ground_img});
        }
//        this.state = {scan_data:data};
        // console.log(scan_data);
      }
    );
  },
  componentWillUnmount: function() {
    NativeAppEventEmitter.removeAllListeners('scan_data');
  },

  _start_scan(event) {
    console.log('start');
    ScanManager.start_scan();
//    this.setState({"duck_image":duck_excited_img});

  },
  _stop_scan(event) {
    console.log('stop');
    ScanManager.stop_scan();
    this.setState({"duck_image":duck_ground_img});

  },

  render: function() {
    return (
      <View style={styles.container}>

      <Button style={styles.buttons} onPress={this._start_scan}>
      Start Scan
      </Button>
      <Button style={styles.buttons} onPress={this._stop_scan}>
      Stop Scan
      </Button>


      <Image
             style={styles.duck}
             source={this.state.duck_image}
           />

      <Text style={styles.data}>
      x={this.state.scan_data.x} dx={this.state.scan_data.dx}
      </Text>
      <Text style={styles.data}>
      y={this.state.scan_data.y} dy={this.state.scan_data.dy}
      </Text>
      <Text style={styles.data}>
      z={this.state.scan_data.z} dz={this.state.scan_data.dz}
      </Text>
      <Text style={styles.data}>
      💃= {this.state.scan_data.sh}
      </Text>
      <Text style={styles.data}>
      온도={this.state.scan_data.t} , 배터리={this.state.scan_data.b}%
      </Text>


      </View>

    );
  },


});

var ReactNativeDuckie = React.createClass({

  render: function() {
    return (
      <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: '리액트 네이티브 러버덕',
        component: MainView,
      }}
      />
    );
  }
});

var styles = StyleSheet.create({
 duck:{
   width:200, height:200,
   alignSelf:'center',
 },
  buttons: {
    margin:10,
    padding:10,
    backgroundColor:'#fff',
    borderColor: '#696969',
borderRadius: 8,
borderWidth: 1,
  },
  container: {
    flex: 1,
//    top: 0,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    //alignItems: 'center',
  },

  data: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor:'#8f8',
    margin: 1,
    padding:2,
  },
});

AppRegistry.registerComponent('ReactNativeDuckie', () => ReactNativeDuckie);
ScanManager.prepareCBManager();

/*
var subscription = NativeAppEventEmitter.addListener(
  'scan_data',
  (data) => {
    MainView.state = {scan_data:data};
    console.log(data);
  }
);
*/
