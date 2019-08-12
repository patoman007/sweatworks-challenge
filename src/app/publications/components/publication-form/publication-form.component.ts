import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import {
  PublicationFormDialogDataInterface,
  PublicationFormManager,
  PublicationFormMode
} from './publication-form.manager';

import { PublicationsService } from '../../services/publications.service';
import { AuthorsService } from '../../../shared/authors/authors.service';

import { AuthorModel } from '../../../shared/authors/authors.manager';

import {
  AuthorsResponseInterface
} from '../../../shared/authors/authors-response.manager';

import {
  PublicationInterface,
  PublicationModel
} from '../../../shared/publications/publications.manager';

import {
  NewPublicationResponseInterface
} from '../../../shared/publications/publications-response.manager';


@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit, OnDestroy {

  model = PublicationFormManager.Data;

  get requestingLabel(): string {
    return this.formData.mode === PublicationFormMode.Creation
      ? this.model.labels.information.creating
      : this.model.labels.information.updating;
  }

  get isFormValid(): boolean {
    return this.model.form.title.control.valid
      && this.model.form.body.control.valid
      && this.model.form.authorId.control.valid
      && this.model.form.datetime.control.valid;
  }

  constructor(private publicationsService: PublicationsService,
              private authorsService: AuthorsService,
              private dialog: MatDialogRef<PublicationFormComponent>,
              @Inject(MAT_DIALOG_DATA)
              public formData: PublicationFormDialogDataInterface) { }

  ngOnInit() {
    this.initForm();
    this.fillAuthorOptions();
  }

  ngOnDestroy() {
    PublicationFormManager.ResetForm();
    this.model.informationMessage = null;
  }

  private initForm() {
    this.bindActions(this.formData.mode);
    this.updateHeader(this.formData.mode);
    this.fillInputs(this.formData.publication, this.formData.mode);
  }

  private updateHeader(mode: PublicationFormMode) {
    this.model.sectionHeader.title = mode === PublicationFormMode.Creation
      ? this.model.labels.header.create
      : this.model.labels.header.update;
  }

  private fillInputs(publication: PublicationModel, mode: PublicationFormMode) {
    if (mode === PublicationFormMode.Creation) { return; }

    this.model.form.id.control.setValue(publication.id);
    this.model.form.title.control.setValue(publication.title);
    this.model.form.body.control.setValue(publication.body);
    this.model.form.authorId.control.setValue(publication.authorId);
    this.model.form.datetime.control.setValue(new Date(publication.datetime));
  }

  private bindActions(mode: PublicationFormMode) {
    this.model.actions.buttons.confirm.label =
      mode === PublicationFormMode.Creation
        ? this.model.labels.actions.create
        : this.model.labels.actions.update;

    this.model.actions.buttons.cancel.onClick = this.closeDialog.bind(this);
    this.model.actions.buttons.confirm.onClick = this.confirmHandler.bind(this);
  }

  private closeDialog() {
    this.dialog.close();
  }

  private fillAuthorOptions() {
    this.authorsService.getAuthors()
      .subscribe(response => this.handleAuthorsResponse(response));
  }

  private handleAuthorsResponse(authorsResponse: AuthorsResponseInterface) {
    if (!authorsResponse.succeed) { return; }

    const authors = authorsResponse.data.map(author => new AuthorModel(author));
    PublicationFormManager.UpdateFormInputAuthors(authors);
  }

  private confirmHandler() {
    if (!this.isFormValid) {
      this.model.informationIsAnError = true;
      this.model.informationMessage = this.model.labels.errors.invalidForm;
      return;
    }

    const publication = PublicationFormManager.PublicationFromForm();
    this.model.informationMessage = null;
    if (this.formData.mode === PublicationFormMode.Creation) {
      this.newPublication(publication);
    } else {
      this.updatePublication(publication);
    }
  }

  private newPublication(publication: PublicationInterface) {
    const mode = this.formData.mode;
    this.model.requesting = true;
    this.publicationsService.createPublication(publication)
      .subscribe(res => this.handlePublicationResponse(mode, res));
  }

  private updatePublication(publication: PublicationInterface) {
    const mode = this.formData.mode;
    this.model.requesting = true;
    this.publicationsService.updatePublication(publication)
      .subscribe(res => this.handlePublicationResponse(mode, res));
  }

  private handlePublicationResponse(mode: PublicationFormMode,
                                    response: NewPublicationResponseInterface) {
    if (!response.succeed) {
      this.operationFailed(mode, response.errorMessages[0]);
    }

    this.model.informationIsAnError = false;
    this.model.informationMessage = mode === PublicationFormMode.Creation
      ? this.model.labels.information.created
      : this.model.labels.information.updated;
    PublicationFormManager.ResetForm();
    this.model.requesting = false;
  }

  operationFailed(mode: PublicationFormMode, errorMessage: string) {
    let errorLabel = mode === PublicationFormMode.Creation
      ? this.model.labels.errors.create
      : this.model.labels.errors.update;
    errorLabel += errorMessage;

    this.model.informationIsAnError = true;
    this.model.informationMessage = errorLabel;
    this.model.requesting = false;
    return;
  }

}
