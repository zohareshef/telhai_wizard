import { Submission } from '../models/submission.js';
import { Wizard } from '../models/wizard.js';

export class WizardService {
	constructor(auth) {
		this.auth = auth;
	}

	get isAdmin() {
		return this.auth.role == 'admin';
	}

	get isCreator(){
		return this.auth.role == 'creator';
	}

	get canEdit() {
		return this.isCreator || this.isAdmin;
	}



	async getWizards() {
		const query = {};
		if (!this.isAdmin) {
			query.author = this.auth._id;
		}
		return await Wizard.find(query).sort({created:'desc'}).populate('author');
	}

	async getWizard(id) {

		if (!this.canEdit && await Submission.exists({ user: this.auth._id, wizard: id })) {
			return null;
		}

		return await Wizard.findOne({ _id: id });
	}

	async createWizard(wizard) {
		const entity = {
			author: this.auth._id,
			...wizard
		};
		try {
			return await Wizard.create(entity);
		} catch (error) {
			return null;
		}

	}

	async editWizard(id, { title, pages }) {
		const query = { _id: id };
		if (!this.canEdit) {
			query.author = this.auth._id;
		}
		try {
			return await Wizard.findOneAndUpdate(
				{ id, author: this.auth._id },
				{ title, pages, updated: Date.now() },
				{ new: true }
			);
		} catch (err) {
			return null;
		}
	}

	async deleteWizard(id) {
		const query = { _id: id };
		if (!this.canEdit) {
			query.author = this.auth._id;
		}
		const wizard = await Wizard.findOne(query);
		wizard?.remove();
		return wizard;
	}

	async submitWizard(id, snapshot) {
		if (!await Wizard.exists({ _id: id }) || await Submission.exists({ user: this.auth._id, wizard: id })) {
			return null;
		}

		try {
			const submission = await Submission.create({
				wizard: id,
				user: this.auth._id,
				snapshot: snapshot
			});

			return submission;
		} catch (error) {
			return null;
		}
	}

	async getWizardSubmissions(id = null) {
		const query = {};
		if (id) {
			query.wizard = id;
		}
		if (!this.isAdmin) {
			query.user = this.auth._id;
		}
		return await Submission.find(query, ['-snapshot'])
			.sort({created:'desc'})
			.populate('user', ['firstname', 'lastname'])
			.populate('wizard', ['title']);
	}

	async getSubmissionById(id) {
		return await Submission.findById(id).populate('user')
			.populate('wizard');
	}
}