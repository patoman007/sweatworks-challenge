import {
  AuthorInterface,
  AuthorModel,
  AuthorsManager
} from '../../../shared/authors/authors.manager';

import {
  FormInputInterface
} from '../../../shared/form/form-input/form-input.interface';

import {
  SectionHeaderInterface,
  SectionHeaderManager
} from '../../../shared/ui/section-header/section-header.manager';

import {
  CancelConfirmInterface
} from '../../../shared/ui/cancel-confirm/cancel-confirm.interface';

import {
  FormInputManager
} from '../../../shared/form/form-input/form-input.manager';

import {
  CancelConfirmManager
} from '../../../shared/ui/cancel-confirm/cancel-confirm.manager';

export enum ManagementAuthorFormMode {
  Creation,
  Edition
}

export interface AuthorFormDataHeaderLabelsInterface {
  create: string;
  update: string;
}

export interface AuthorFormDataPublicationLabelsInterface {
  firstName: string;
  lastName: string;
  email: string;
  dof: string;
}

export interface AuthorFormDataActionLabelsInterface {
  create: string;
  update: string;
  cancel: string;
}

export interface AuthorFormDataInformationLabelsInterface {
  creating: string;
  created: string;
  updating: string;
  updated: string;
}

export interface AuthorFormDataErrorLabelsInterface {
  invalidForm: string;
  invalidFirstName: string;
  invalidLastName: string;
  invalidEmail: string;
  invalidDateOfBirth: string;
  create: string;
  update: string;
}

export interface AuthorFormDataLabelsInterface {
  header: AuthorFormDataHeaderLabelsInterface;
  author: AuthorFormDataPublicationLabelsInterface;
  actions: AuthorFormDataActionLabelsInterface;
  information: AuthorFormDataInformationLabelsInterface;
  errors: AuthorFormDataErrorLabelsInterface;
}

export interface AuthorFormDataFormInterface {
  id: FormInputInterface;
  firstName: FormInputInterface;
  lastName: FormInputInterface;
  email: FormInputInterface;
  dateOfBirth: FormInputInterface;
}

export interface AuthorFormDataInterface {
  labels: AuthorFormDataLabelsInterface;
  sectionHeader: SectionHeaderInterface;
  form: AuthorFormDataFormInterface;
  authorForm: FormInputInterface[];
  actions: CancelConfirmInterface;
  requesting: boolean;
  informationIsAnError: boolean;
  informationMessage?: string;
}

export interface AuthorFormDialogDataInterface {
  mode: ManagementAuthorFormMode;
  author?: AuthorModel;
}

export class ManagementAuthorFormManager {

  private static Labels: AuthorFormDataLabelsInterface = {
    header: {
      create: 'New Author',
      update: 'Edit Author'
    },
    author: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'E-mail',
      dof: 'Date of birth'
    },
    actions: {
      create: 'Save',
      update: 'Update',
      cancel: 'Cancel',
    },
    information: {
      created: 'The author was created 😃',
      creating: 'Creating author ...',
      updated: 'The author was updated 😃',
      updating: 'Updating author ...'
    },
    errors: {
      invalidForm: 'You should complete all the required fields.',
      invalidFirstName: 'You must complete the first name field.',
      invalidLastName: 'You must complete the last name field.',
      invalidEmail: 'You must complete the email field.',
      invalidDateOfBirth: 'You must complete the date of birth field.',
      create: 'Usps! An error has occurred when trying to create the author 😔',
      update: 'Usps! An error has occurred when trying to update the author 😔'
    }
  };

  private static CreteAuthorHeader = SectionHeaderManager
    .SectionHeader(ManagementAuthorFormManager.Labels.header.create);

  private static FormInputId = FormInputManager
    .From('hidden', 'id', FormInputManager.Control(null));

  private static FormInputFirstName = FormInputManager
    .From('input', 'firstName', FormInputManager.RequiredControl(),
      ManagementAuthorFormManager.Labels.author.firstName,
      ManagementAuthorFormManager.Labels.errors.invalidFirstName);

  private static FormInputLastName = FormInputManager
    .From('input', 'lastName', FormInputManager.RequiredControl(),
      ManagementAuthorFormManager.Labels.author.lastName,
      ManagementAuthorFormManager.Labels.errors.invalidLastName);

  private static FormInputEmail = FormInputManager
    .From('input', 'email', FormInputManager.EmailRequiredControl(),
      ManagementAuthorFormManager.Labels.author.email,
      ManagementAuthorFormManager.Labels.errors.invalidEmail);

  private static FormInputDateOfBirth = FormInputManager
    .From('date', 'dof', FormInputManager.RequiredControl(),
      ManagementAuthorFormManager.Labels.author.dof,
      ManagementAuthorFormManager.Labels.errors.invalidDateOfBirth);

  private static FormInputs: AuthorFormDataFormInterface = {
    id: ManagementAuthorFormManager.FormInputId,
    firstName: ManagementAuthorFormManager.FormInputFirstName,
    lastName: ManagementAuthorFormManager.FormInputLastName,
    email: ManagementAuthorFormManager.FormInputEmail,
    dateOfBirth: ManagementAuthorFormManager.FormInputDateOfBirth
  };

  private static FormActions = CancelConfirmManager
    .From(() => {}, () => {},
      ManagementAuthorFormManager.Labels.actions.create,
      ManagementAuthorFormManager.Labels.actions.cancel);

  static Data: AuthorFormDataInterface = {
    labels: ManagementAuthorFormManager.Labels,
    sectionHeader: ManagementAuthorFormManager.CreteAuthorHeader,
    form: ManagementAuthorFormManager.FormInputs,
    authorForm: ManagementAuthorFormManager
      .AuthorForm(ManagementAuthorFormManager.FormInputs),
    actions: ManagementAuthorFormManager.FormActions,
    requesting: false,
    informationIsAnError: false
  };

  private static AuthorForm(inputs: AuthorFormDataFormInterface): FormInputInterface[] {
    return Object.keys(inputs)
      .map(key => inputs[key]);
  }

  static AuthorFromForm(): AuthorInterface {
    const id = ManagementAuthorFormManager.Data.form.id.control.value;
    const firstName = ManagementAuthorFormManager.Data.form.firstName.control.value;
    const lastName = ManagementAuthorFormManager.Data.form.lastName.control.value;
    const email = ManagementAuthorFormManager.Data.form.email.control.value;
    const dof = ManagementAuthorFormManager.Data.form.dateOfBirth.control.value;

    return AuthorsManager
      .AuthorFrom(firstName, lastName, email, dof, id);
  }

  static ResetForm() {
    const form = ManagementAuthorFormManager.Data.form;
    form.id.control.reset();
    form.firstName.control.reset();
    form.lastName.control.reset();
    form.email.control.reset();
    form.dateOfBirth.control.reset();
    ManagementAuthorFormManager.Data.authorForm = ManagementAuthorFormManager
      .AuthorForm(form);
  }

}
