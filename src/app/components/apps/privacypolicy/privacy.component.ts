import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../shared/data/email/email';
import { Email } from '../../../shared/model/email.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-email',
	templateUrl: './privacy.component.html',
	styleUrls: ['./privacy.component.scss']
})
export class EmailComponent implements OnInit {

	privacyTxt:any;

	constructor(
		private http: HttpService
	) { }

	ngOnInit() { 
		this.privacyGet()
	}

	privacyGet(){
		this.http.get('admin/privacy',true).then((res:any)=>{
			console.log(res)
			this.privacyTxt = res.paragraph
		}).catch((err)=>{
			console.log(err)
		})
	}

	save(){
		let data = {
			heading:'Privacy',
			paragraph:this.privacyTxt
		}
		this.http.post('admin/privacy_update',data,true).then((res:any)=>{
			this.privacyGet()
		}).catch((err)=>{
			console.log(err)
		})
	}

}
