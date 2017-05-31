export class ScanData{
	info:string;
	tipo:string;


	constructor(tipo:string){
		this.tipo = "no definido";
		this.info = tipo;
		if(tipo.startsWith('http')){
			this.tipo =  'http';
		}else if(tipo.startsWith('geo')){
			this.tipo = 'mapa';
		}else if(tipo.startsWith('BEGIN:VCARD')){
			this.tipo = 'contacto';    
		}else if(tipo.startsWith('MATMSG')){
			this.tipo = 'email';
		}
	}
}