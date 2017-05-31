import { Injectable } from '@angular/core';

import { ScanData } from '../models/scans_data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { MapaPage } from '../pages/index.pages';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Injectable()
export class HistorialService {

	private _historial: ScanData[] = [];

	constructor(private iab: InAppBrowser,
		private modalCtrl: ModalController,
		private contacts: Contacts,
		private platform: Platform,
		private toastCtrl: ToastController) {

	}

	load_history() {
		return this._historial;
	}

	add_history(texto: string) {
		let data = new ScanData(texto);
		this._historial.unshift(data);
		this.open_scan(0);
		console.log(this._historial);
	}

	open_scan(index: number = 0) {
		let scanData = this._historial[index];
		switch (scanData.tipo) {
			case "http":
				this.iab.create(scanData.info, "_system");
				break;
			case "mapa":
				this.modalCtrl.create(MapaPage, { coords: scanData.info }).present();
				break;
			case "contacto":
				this.add_contact(scanData.info);
				break;
			case 'email':
				let message = this.parse_email(scanData.info);
				this.iab.create(message, "_system");
				break;
			default:
				console.log('Tipo no soportado');
				break;
		}

	}

	private parse_email(text: string): string {
		let htmlLink = text;
		htmlLink = htmlLink.replace("MATMSG:TO:", "mailto:");
		htmlLink = htmlLink.replace(";SUB:", "?subject");
		htmlLink = htmlLink.replace(";BODY:", "&body=");
		htmlLink = htmlLink.replace(";;", "");
		htmlLink = htmlLink.replace(/ /g, "%20");
		return htmlLink;
	}

	private add_contact(texto: string) {
		let campos: any = this.parse_vcard(texto);
		console.log(campos);
		let nombre = campos.fn;
		let tel = campos.tel[0].value[0];
		if (!this.platform.is('cordova')) {
			console.log("Estoy en la compu");
			return;
		}
		let contact: Contact = this.contacts.create();
		contact.name = new ContactName(null, nombre);
		contact.phoneNumbers = [new ContactField('mobile', tel)];
		contact.save().then(
			() => this.show_message("Contacto " + nombre + " creado")),
			(error: any) => console.error('Error saving contact.', error)
	}

	private show_message(texto: string) {
		this.toastCtrl.create({
			message: texto,
			duration: 2500
		}).present();

	}

	private parse_vcard(input: string) {

		var Re1 = /^(version|fn|title|org):(.+)$/i;
		var Re2 = /^([^:;]+);([^:]+):(.+)$/;
		var ReKey = /item\d{1,2}\./;
		var fields = {};

		input.split(/\r\n|\r|\n/).forEach(function (line) {
			var results, key;

			if (Re1.test(line)) {
				results = line.match(Re1);
				key = results[1].toLowerCase();
				fields[key] = results[2];
			} else if (Re2.test(line)) {
				results = line.match(Re2);
				key = results[1].replace(ReKey, '').toLowerCase();

				var meta = {};
				results[2].split(';')
					.map(function (p, i) {
						var match = p.match(/([a-z]+)=(.*)/i);
						if (match) {
							return [match[1], match[2]];
						} else {
							return ["TYPE" + (i === 0 ? "" : i), p];
						}
					})
					.forEach(function (p) {
						meta[p[0]] = p[1];
					});

				if (!fields[key]) fields[key] = [];

				fields[key].push({
					meta: meta,
					value: results[3].split(';')
				})
			}
		});

		return fields;
	};

}
