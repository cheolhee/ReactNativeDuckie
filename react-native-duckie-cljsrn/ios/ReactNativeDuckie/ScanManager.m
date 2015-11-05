#import "ScanManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

/**
 BLE 하드웨어 스캐닝 및 데이터 파싱.
 NOTICE: BLE신호처리 코드는 현재 공개불가함을 양해 바랍니다. (2015-11-6)
 타이머와 랜덤 함수로 대신하였습니다.
 
 */
@interface ScanManager () <CBPeripheralDelegate, CBCentralManagerDelegate>

-(void)ble_scan_start;
-(void)ble_scan_stop;

@end


@implementation ScanManager
RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

CBUUID *CBUUID_DEVICE_INFO;


RCT_EXPORT_METHOD(start_scan) {
  RCTLog(@"Pretending to start scan %@",@"");
  
  [self ble_scan_start];
  
}
RCT_EXPORT_METHOD(stop_scan) {
  RCTLog(@"Pretending to stop scan %@",@"");
  [self ble_scan_stop];
}


RCT_EXPORT_METHOD(prepareCBManager) {
  NSLog(@"%s", __PRETTY_FUNCTION__);
  
  self.cbcMgr = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
  
  CBUUID_DEVICE_INFO =  [CBUUID UUIDWithString:@"0x180A"];
  
}


- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  RCTLog(@"state=%ld", central.state);
  
}


-(void)ble_scan_start {

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1), dispatch_get_main_queue(), ^{
    if (nil == self.myTimer ) {
      data_count = 0;
      self.myTimer = [NSTimer scheduledTimerWithTimeInterval:.5
              target:self selector:@selector(work:) userInfo:nil repeats:YES];
      [self.myTimer fire];
    }
  });
  
}
-(void)ble_scan_stop {
  [self.cbcMgr stopScan];
  [self.myTimer invalidate];
  self.myTimer = nil;
}

-(void)work:(NSTimer*)timer0 {
  
  int x = arc4random_uniform(64)-32;
  int y = arc4random_uniform(64)-32;
  int z = arc4random_uniform(64)-32;
  int dx = arc4random_uniform(64)-32;
  int dy = arc4random_uniform(64)-32;
  int dz = arc4random_uniform(64)-32;
  
  float sh = (float)drand48() * 5;
  int t = arc4random_uniform(10)+20;
  
  NSDictionary *body = @{  @"x" :@(x)
                           ,@"y" :@(y)
                           ,@"z" :@(z)
                           ,@"dx":@(dx)
                           ,@"dy":@(dy)
                           ,@"dz":@(dz)
                           ,@"sh":@(sh)
                           ,@"t" :@(t)
                           ,@"b" :@(100)};
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"scan_data" body:body];
  
}



/**
 
 
 */
int data_count = 0;

//- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary<NSString *, id> *)advertisementData RSSI:(NSNumber *)RSSI {
//  
//  if ([RSSI intValue] >= 0) {
//    return;
//  }
//  
//  NSLog(@"%@ %@ %@", peripheral, advertisementData, RSSI);
//
//  /*
//   TODO: 여기에 BLE 비콘의 시그널을 파싱, 해석하여 특정한 값이면 이벤트를 전송한다.
//   */
//
////  [self.bridge.eventDispatcher sendAppEventWithName:@"scan_data" body:body];
//  
//}


@end
