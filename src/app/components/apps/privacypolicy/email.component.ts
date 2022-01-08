import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../shared/data/email/email';
import { Email } from '../../../shared/model/email.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-email',
	templateUrl: './email.component.html',
	styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

	public compose: boolean = true;
	public allEmails: Email[] = Mail.Emails;
	public selectEmail: any;
	public selectedEmails: any[] = [];
	public editorValue: string;
	public type: any;
	public ClassicEditor = ClassicEditor;

	constructor() { }

	ngOnInit() { }

	getUserEmail(type) {
		let emails = [];
		return this.allEmails.filter(email => {

			if (type == 'allmail') {
				return emails.push(email)
			}
			else if (type == 'favourite') {
				if (email.favourite) {
					return emails.push(email)
				}
			}
			else if (email.type === type) {
				return emails.push(email)
			}
		})
	}

	selectedUserEmail(email) {
		this.selectEmail = email
		this.compose = false
	}

	selectedmail($event, email) {
		var index = this.selectedEmails.indexOf(email);
		if ($event.target.checked === true && index === -1) {
			// val not found, pushing onto array
			this.selectedEmails.push(email)
		} else {
			// val is found, removing from array
			this.selectedEmails.splice(index, 1);
		}
	}

	moveEmails(val) {
		if (!val) return;
		this.selectedEmails.filter((email) => {
			return email.type = val;
		})
	}

	addFavourite(email) {
		email.favourite = !email.favourite
	}

}
