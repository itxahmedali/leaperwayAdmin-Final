import { HttpService } from './../../../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  termsTxt:any;

	constructor(
		private http: HttpService
	) { }

	ngOnInit() { 
		this.privacyGet()
	}

	privacyGet(){
		this.http.get('admin/terms',true).then((res:any)=>{
			this.termsTxt = res.paragraph
		}).catch((err)=>{
			console.log(err)
		})
	}

	save(){
		let data = {
			heading:'Privacy',
			paragraph:this.termsTxt
		}
		this.http.post('admin/terms_update',data,true).then((res:any)=>{
			this.privacyGet()
		}).catch((err)=>{
			console.log(err)
		})
	}

    
}
