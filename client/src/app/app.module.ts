import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './layout/layout.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from './material.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CheckboxBuilderComponent } from './control-builder/checkbox-builder/checkbox-builder.component';
import { ControlBuilderComponent } from './control-builder/control-builder.component';
import { LabelBuilderComponent } from './control-builder/label-builder/label-builder.component';
import { ParagraphBuilderComponent } from './control-builder/paragraph-builder/paragraph-builder.component';
import { TextBuilderComponent } from './control-builder/text-builder/text-builder.component';
import { WizardListComponent } from './my-wizards/wizard-list.component';
import { NewWizardComponent } from './new-wizard/new-wizard.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AuthInterceptor } from './utils/interceptors/auth.interceptor';
import { RegexValidatorDirective } from './utils/validators/regex-validator.directive';

import { SecuredControlComponent } from './controls/secured-control/secured-control.component';
import { TextControlComponent } from './controls/text-control/text-control.component';

import { ImageBuilderComponent } from './control-builder/image-builder/image-builder.component';
import { RadioBuilderComponent } from './control-builder/radio-builder/radio-builder.component';
import { SecuredBuilderComponent } from './control-builder/secured-builder/secured-builder.component';
import { SelectBuilderComponent } from './control-builder/select-builder/select-builder.component';
import { WizardCardComponent } from './wizard-card/wizard-card.component';
import { WizardFormComponent } from './wizard-form/wizard-form.component';

import { CheckboxControlComponent } from './controls/checkbox-control/checkbox-control.component';
import { ImageControlComponent } from './controls/image-control/image-control.component';
import { LabelControlComponent } from './controls/label-control/label-control.component';
import { ParagraphControlComponent } from './controls/paragraph-control/paragraph-control.component';
import { RadioControlComponent } from './controls/radio-control/radio-control.component';
import { SelectControlComponent } from './controls/select-control/select-control.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SubmissionCardComponent } from './submission-card/submission-card.component';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { SubmissionViewComponent } from './submission-view/submission-view.component';
import { SubmitWizardComponent } from './submit-wizard/submit-wizard.component';
import { WizardBuilderComponent } from './wizard-builder/wizard-builder.component';
import { WizardEditComponent } from './wizard-edit/wizard-edit.component';
import { WizardViewComponent } from './wizard-view/wizard-view.component';
import { DeleteWizardDialogComponent } from './delete-wizard-dialog/delete-wizard-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		LoginDialogComponent,
		NewWizardComponent,
		ControlBuilderComponent,
		CheckboxBuilderComponent,
		ImageBuilderComponent,
		LabelBuilderComponent,
		ParagraphBuilderComponent,
		RadioBuilderComponent,
		SecuredBuilderComponent,
		SelectBuilderComponent,
		TextBuilderComponent,
		RegexValidatorDirective,
		WizardListComponent,
		EllipsisPipe,
		DateAgoPipe,
		WizardCardComponent,
		WizardFormComponent,
		TextControlComponent,
		SecuredControlComponent,
		CheckboxControlComponent,
		RadioControlComponent,
		SelectControlComponent,
		ImageControlComponent,
		SubmissionListComponent,
		SubmissionCardComponent,
		SubmissionViewComponent,
		WizardViewComponent,
		LabelControlComponent,
		ParagraphControlComponent,
		SubmitWizardComponent,
		LoginPageComponent,
		HomeComponent,
		WizardEditComponent,
		WizardBuilderComponent,
  DeleteWizardDialogComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
