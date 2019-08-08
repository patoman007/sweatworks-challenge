import { FormInputInterface } from '../../../shared/form/form-input/form-input.interface';
import { FormInputManager } from '../../../shared/form/form-input/form-input.manager';
import {
  SectionHeaderInterface,
  SectionHeaderManager
} from '../../../shared/ui/section-header/section-header.manager';
import { CancelConfirmInterface } from '../../../shared/ui/cancel-confirm/cancel-confirm.interface';
import { CancelConfirmManager } from '../../../shared/ui/cancel-confirm/cancel-confirm.manager';

export interface PublicationFormDataPublicationLabelsInterface {
  title: string;
  body: string;
  author: string;
  date: string;
}

export interface PublicationFormDataActionLabelsInterface {
  create: string;
  update: string;
  cancel: string;
}

export interface PublicationFormDataErrorLabelsInterface {
  invalidForm: string;
  create: string;
  update: string;
}

export interface PublicationFormDataLabelsInterface {
  title: string;
  publication: PublicationFormDataPublicationLabelsInterface;
  actions: PublicationFormDataActionLabelsInterface;
  errors: PublicationFormDataErrorLabelsInterface;
}

export interface PublicationFormDataFormInterface {
  title: FormInputInterface;
  body: FormInputInterface;
  author: FormInputInterface;
}

export interface PublicationFormDataInterface {
  labels: PublicationFormDataLabelsInterface;
  sectionHeader: SectionHeaderInterface;
  form: PublicationFormDataFormInterface;
  publicationForm: FormInputInterface[];
  actions: CancelConfirmInterface;
}

export class PublicationFormManager {

  private static Labels: PublicationFormDataLabelsInterface = {
    title: 'New Publication',
    publication: {
      title: 'Title',
      body: 'Body',
      author: 'Author',
      date: 'Created'
    },
    actions: {
      create: 'Save',
      update: 'Update',
      cancel: 'Cancel'
    },
    errors: {
      invalidForm: 'You should complete all the required fields',
      create: 'Usps! An error has occurred when trying to create the publication 😔',
      update: 'Usps! An error has occurred when trying to update the publication 😔'
    }
  };

  private static Header: SectionHeaderInterface = SectionHeaderManager
    .SectionHeader(PublicationFormManager.Labels.title);

  private static FormInputTitle: FormInputInterface = FormInputManager
    .From('input', 'title',
      FormInputManager.RequiredControl(), PublicationFormManager.Labels.publication.title);

  private static FormInputBody: FormInputInterface = FormInputManager
    .From('input', 'body',
      FormInputManager.RequiredControl(), PublicationFormManager.Labels.publication.body);

  private static FormInputs: PublicationFormDataFormInterface = {
    title: PublicationFormManager.FormInputTitle,
    body: PublicationFormManager.FormInputBody,
    author: null
  };

  private static FormActions = CancelConfirmManager.From(() => {}, () => {},
    PublicationFormManager.Labels.actions.create, PublicationFormManager.Labels.actions.cancel);

  static Data: PublicationFormDataInterface = {
    labels: PublicationFormManager.Labels,
    sectionHeader: PublicationFormManager.Header,
    form: PublicationFormManager.FormInputs,
    publicationForm: PublicationFormManager.PublicationForm(PublicationFormManager.FormInputs),
    actions: PublicationFormManager.FormActions
  };

  private static PublicationForm(inputs: PublicationFormDataFormInterface): FormInputInterface[] {
    return Object.keys(inputs)
      .map(key => inputs[key]);
  }

}
