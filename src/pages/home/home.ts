import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController, Platform } from 'ionic-angular'

//providers
import { HistorialService } from '../../providers/historial'


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	constructor(private barcodeScanner: BarcodeScanner,
		private toastCtrl: ToastController,
		private platform: Platform,
		private _historialService: HistorialService) {
	}

	scan() {
		if (!this.platform.is('cordova')) {
			console.log('no es un disposito :(');
			return;
		}
		console.log("Realizando scan..");
		this.barcodeScanner.scan().then((barcodeData) => {
			console.log("Datos del scan");
			if (barcodeData.cancelled == false && barcodeData.text != null) {
				this._historialService.add_history(barcodeData.text);
			}
		}, (err) => {
			console.log("Error del scan", err);
			this.show_error("Error: " + err);
		});
	}

	show_error(message: string, ) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2500
		});
		toast.present();
	}

}
