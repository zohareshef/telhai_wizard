import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { WizardListComponent } from './my-wizards/wizard-list.component';
import { NewWizardComponent } from './new-wizard/new-wizard.component';
import { SubmissionViewComponent } from './submission-view/submission-view.component';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { SubmitWizardComponent } from './submit-wizard/submit-wizard.component';
import { WizardEditComponent } from './wizard-edit/wizard-edit.component';

const routes: Routes = [
	{
		path: 'new',
		component: NewWizardComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['admin', 'creator'] },
	},
	{
		path: 'edit/:wizardId',
		component: WizardEditComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['admin', 'creator'] },
	},
	{
		path: 'my-wizards',
		component: WizardListComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['admin', 'creator'] },
	},
	{
		path: 'wizards/:wizardId',
		component: SubmitWizardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'wizards/:wizardId/submissions',
		component: SubmissionListComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['admin'] },
	},
	{
		path: 'submissions/:submissionId',
		component: SubmissionViewComponent,
		canActivate: [AuthGuard],
		data: { roles: ['admin'] },
	},
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{ path: '**', component: HomeComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
