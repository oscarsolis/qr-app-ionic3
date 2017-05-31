import { Component } from '@angular/core';

//providers
import { HistorialService } from '../../providers/historial'

import { ScanData } from '../../models/scans_data.model';

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

	historial:ScanData[] = [];
	constructor(private _historialService:HistorialService) {

  	}

	ionViewDidLoad() {
    	this.historial = this._historialService.load_history();
  	}

  	abrir_scan(index:number){
		this._historialService.open_scan(index);
  	}

}
