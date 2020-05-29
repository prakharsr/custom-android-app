import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { ToastController, Platform } from '@ionic/angular'
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { networkinfo } from 'src/app/interfaces/networkinfo';
import { Wifi } from 'src/app/interfaces/Wifi';
declare var WifiWizard2: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  netInfo = new networkinfo();
  wifi = new Wifi();
  scans=Array<networkinfo>();
  wifiArray=Array<Wifi>();
  wificapabilities=[];
  refreshIntervalId: any;  
  password : string;

  constructor(public toastController: ToastController, 
    private flashlight: Flashlight, 
    private hotspot: Hotspot,
    private platform: Platform) 
  {}

  async connectToWifi(ssid: string, pass: string) {
    pass=this.password;
    this.hotspot.connectToWifi(ssid, pass).then(s=> {this.presentToast("Connected to "+ssid) ,console.log(s)}).catch(e => {this.presentToast(e) ,console.log(e)});
  }

  async presentToast(m : string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  toggleFlashlight() {

    if(!this.flashlight.available) {
      this.presentToast("Flashlight not available on your device");
    }
    this.flashlight.toggle();
  }
  
  helper(success) {
    this.wifiArray=Array<Wifi>();
    for(let index=0; index<success.length; index++) {
      this.wifi = new Wifi();
      this.wificapabilities=[];
      this.netInfo=success[index];
      this.wifi.ssid=this.netInfo.SSID;
      let x="";
      x=this.netInfo.capabilities;
      let regex: RegExp = /[^[\]]+(?=\])/g;
      this.wificapabilities.push(x.match(regex));
      // console.log(JSON.stringify(this.wificapabilities));
      if(this.wificapabilities.length === 1) this.wifi.encryp=this.wificapabilities[0];
      if(this.wificapabilities.length === 2) this.wifi.auth=this.wificapabilities[0];
      if(this.wificapabilities.length === 2) this.wifi.encryp=this.wificapabilities[1];
      this.wifiArray.push(this.wifi);
    }
  }

  startIntervalScanning() {
      this.platform.ready().then(() => {
        this.refreshIntervalId=setInterval( () => this.scanWifi(), 1000);
      });
  }

  stopIntervalScanning() {
    clearInterval(this.refreshIntervalId);
  }


  scanWifi() {
    WifiWizard2.scan().then( success => 
      {this.helper(success),console.log(success)}).catch(error => 
        console.log(error));
  }

  ngOnInit() {
  }

}
