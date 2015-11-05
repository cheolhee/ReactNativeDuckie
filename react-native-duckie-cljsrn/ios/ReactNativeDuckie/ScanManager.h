

#import <UIKit/UIKit.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "RCTBridgeModule.h"
#import "RCTLog.h"

@interface ScanManager : NSObject <RCTBridgeModule>
//: UIViewController



@property (nonatomic, strong) CBCentralManager *cbcMgr;

//-(void)start_scan;
//-(void)stop_scan;
//-(void)prepareCBManager;


@property NSTimer *myTimer;

@end
