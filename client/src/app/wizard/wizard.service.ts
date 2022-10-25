import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, from } from 'rxjs';
import {
	AnsweredWizard,
	Submission,
	Wizard,
	WizardDraft,
} from './wizard.types';

@Injectable({
	providedIn: 'root',
})
export class WizardService {
	constructor(private http: HttpClient) {}

	createWizard(wizard: WizardDraft) {
		return this.http.post<Wizard>('/api/wizards', wizard);
	}
	updateWizard(wizard: Wizard) {
		return this.http.put<Wizard>(`/api/wizards/${wizard._id}`, wizard);
	}
	deleteWizard(id: string) {
		return this.http.delete(`/api/wizards/${id}`);
	}
	getMyWizards() {
		return this.http.get<Wizard[]>('/api/wizards');
	}

	getWizardById(id: string) {
		return this.http.get<Wizard>(`/api/wizards/${id}`);
	}

	submit(wizardId: string, snapshot: AnsweredWizard) {
		return this.http.post<Submission>(
			`/api/wizards/${wizardId}/submissions`,
			snapshot
		);
	}
	getSubmissions(wizardId: string) {
		return this.http.get<Submission[]>(`/api/wizards/${wizardId}/submissions`);
	}
	getSubmissionById(submissionId: string) {
		return this.http.get<Submission>(`api/submissions/${submissionId}`);
	}
}
