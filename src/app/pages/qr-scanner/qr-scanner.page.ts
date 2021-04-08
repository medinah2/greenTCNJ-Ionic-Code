import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
//implements OnInit {

  // ngOnInit() {
  // }

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  usrID: any;

  constructor(private barcodeScanner: BarcodeScanner, public http: HttpClient,  private storage: Storage) {
    this.scanBarcode();
    storage.get('userID').then((val) => {
      this.usrID = val;
    });

  }

  scanBarcode() {

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: false,
      torchOn: false,
      prompt: 'Place a QR code inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE',
      orientation: 'portrait',
    };

    
    this.barcodeScanner.scan(options).then((barcodeData) => {
      
      console.log('Barcode data', barcodeData);

      this.scannedData = barcodeData;
      
      var obj = {func: "add_participant", eventID: 1, userID: this.usrID, attendance: 1};
    
      this.http.post("https://recycle.hpc.tcnj.edu/php/participants-handler.php", JSON.stringify(obj)).subscribe(data => {
          
        var result = data as any[];
      
      });

    }).catch(err => {
      console.log('Error occured: ' + err);
    });
  }
  

}
