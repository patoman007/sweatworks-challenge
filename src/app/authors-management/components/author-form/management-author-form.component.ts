import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import {
  AuthorFormDialogDataInterface,
  ManagementAuthorFormManager,
  ManagementAuthorFormMode
} from './management-author-form.manager';

import {
  PublicationFormManager
} from '../../../publications/components/publication-form/publication-form.manager';

import {
  AuthorInterface,
  AuthorModel
} from '../../../shared/authors/authors.manager';

import {
  AuthorsManagementService
} from '../../services/authors-management.service';

import {
  NewAuthorResponseInterface
} from '../../../shared/authors/authors-response.manager';


@Component({
  selector: 'app-management-author-form',
  templateUrl: './management-author-form.component.html',
  styleUrls: ['./management-author-form.component.scss']
})
export class ManagementAuthorFormComponent implements OnInit, OnDestroy {

  model = ManagementAuthorFormManager.Data;

  get requestingLabel(): string {
    return this.formData.mode === ManagementAuthorFormMode.Creation
      ? this.model.labels.information.creating
      : this.model.labels.information.updating;
  }

  get isFormValid(): boolean {
    return this.model.form.firstName.control.valid
      && this.model.form.lastName.control.valid
      && this.model.form.email.control.valid
      && this.model.form.dateOfBirth.control.valid;
  }

  constructor(private managementAuthorService: AuthorsManagementService,
              private dialog: MatDialogRef<ManagementAuthorFormComponent>,
              @Inject(MAT_DIALOG_DATA)
              public formData: AuthorFormDialogDataInterface) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    ManagementAuthorFormManager.ResetForm();
    this.model.informationMessage = null;
  }

  private initForm() {
    this.bindActions(this.formData.mode);
    this.updateHeader(this.formData.mode);
    this.fillInputs(this.formData.author, this.formData.mode);
  }

  private bindActions(mode: ManagementAuthorFormMode) {
    this.model.actions.buttons.confirm.label =
      mode === ManagementAuthorFormMode.Creation
        ? this.model.labels.actions.create
        : this.model.labels.actions.update;

    this.model.actions.buttons.cancel.onClick = this.closeDialog.bind(this);
    this.model.actions.buttons.confirm.onClick = this.confirmHandler.bind(this);
  }

  private updateHeader(mode: ManagementAuthorFormMode) {
    this.model.sectionHeader.title = mode === ManagementAuthorFormMode.Creation
      ? this.model.labels.header.create
      : this.model.labels.header.update;
  }

  private fillInputs(author: AuthorModel, mode: ManagementAuthorFormMode) {
    if (mode === ManagementAuthorFormMode.Creation) { return; }

    this.model.form.id.control.setValue(author.id);
    this.model.form.firstName.control.setValue(author.firstName);
    this.model.form.lastName.control.setValue(author.lastName);
    this.model.form.email.control.setValue(author.email);
    this.model.form.dateOfBirth.control.setValue(new Date(author.dof));
  }

  private closeDialog() {
    this.dialog.close();
  }

  private confirmHandler() {
    if (!this.isFormValid) {
      this.model.informationIsAnError = true;
      this.model.informationMessage = this.model.labels.errors.invalidForm;
      return;
    }

    const author = ManagementAuthorFormManager.AuthorFromForm();
    this.model.informationMessage = null;
    if (this.formData.mode === ManagementAuthorFormMode.Creation) {
      this.newAuthor(author);
    } else {
      this.updateAuthor(author);
    }
  }

  private newAuthor(author: AuthorInterface) {
    const mode = this.formData.mode;
    this.model.requesting = true;
    this.managementAuthorService.createAuthor(author)
      .subscribe(res => this.handleAuthorResponse(mode, res),
    error => this.operationFailed(mode, error.message));
  }

  private updateAuthor(author: AuthorInterface) {
    const mode = this.formData.mode;
    this.model.requesting = true;
    this.managementAuthorService.updateAuthor(author)
      .subscribe(res => this.handleAuthorResponse(mode, res),
          error => this.operationFailed(mode, error.message));
  }

  private handleAuthorResponse(mode: ManagementAuthorFormMode,
                               response: NewAuthorResponseInterface) {
    if (!response.succeed) {
      this.operationFailed(mode, response.errorMessages[0]);
    }

    this.model.informationIsAnError = false;
    this.model.informationMessage = mode === ManagementAuthorFormMode.Creation
      ? this.model.labels.information.created
      : this.model.labels.information.updated;
    PublicationFormManager.ResetForm();
    this.model.requesting = false;
  }

  operationFailed(mode: ManagementAuthorFormMode, errorMessage: string) {
    let errorLabel = mode === ManagementAuthorFormMode.Creation
      ? this.model.labels.errors.create
      : this.model.labels.errors.update;
    errorLabel += errorMessage;

    this.model.informationIsAnError = true;
    this.model.informationMessage = errorLabel;
    this.model.requesting = false;
    return;
  }

}
