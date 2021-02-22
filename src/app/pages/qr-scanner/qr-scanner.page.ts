import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  ngOnInit() {
  }

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;

  constructor(private barcodeScanner: BarcodeScanner, public http: HttpClient) {
    this.scanBarcode();
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

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      
      var obj = {func: "add_participant", eventID: 1, userID: 1, attendance: 1};
    
      this.http.post("http://recycle.hpc.tcnj.edu/php/participants-handler.php", JSON.stringify(obj)).subscribe(data => {
          
        var result = data as any[];
      
      });

    }).catch(err => {
      console.log('Error', err);
    });
  }
  

}
