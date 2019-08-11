import {
  FormInputManager
} from '../../../shared/form/form-input/form-input.manager';

import {
  SectionHeaderInterface,
  SectionHeaderManager
} from '../../../shared/ui/section-header/section-header.manager';

import { AuthorModel } from '../../../shared/authors/authors.manager';

import {
  CancelConfirmManager
} from '../../../shared/ui/cancel-confirm/cancel-confirm.manager';

import {
  FormInputInterface
} from '../../../shared/form/form-input/form-input.interface';
import {
  CancelConfirmInterface
} from '../../../shared/ui/cancel-confirm/cancel-confirm.interface';

import {
  SelectOptionInterface
} from '../../../shared/form/select-input/select-option.interface';

import {
  PublicationInterface,
  PublicationModel,
  PublicationsManager
} from '../../../shared/publications/publications.manager';

export enum PublicationFormMode {
  Creation,
  Edition
}

export interface PublicationFormDataHeaderLabelsInterface {
  create: string;
  update: string;
}

export interface PublicationFormDataPublicationLabelsInterface {
  title: string;
  body: string;
  author: string;
  datetime: string;
}

export interface PublicationFormDataActionLabelsInterface {
  create: string;
  update: string;
  cancel: string;
}

export interface PublicationFormDataInformationLabelsInterface {
  creating: string;
  created: string;
  updating: string;
  updated: string;
}

export interface PublicationFormDataErrorLabelsInterface {
  invalidForm: string;
  invalidTitle: string;
  invalidBody: string;
  invalidAuthor: string;
  invalidDatetime: string;
  create: string;
  update: string;
}

export interface PublicationFormDataLabelsInterface {
  header: PublicationFormDataHeaderLabelsInterface;
  publication: PublicationFormDataPublicationLabelsInterface;
  actions: PublicationFormDataActionLabelsInterface;
  information: PublicationFormDataInformationLabelsInterface;
  errors: PublicationFormDataErrorLabelsInterface;
}

export interface PublicationFormDataFormInterface {
  id: FormInputInterface;
  title: FormInputInterface;
  body: FormInputInterface;
  authorId: FormInputInterface;
  datetime: FormInputInterface;
}

export interface PublicationFormDataInterface {
  labels: PublicationFormDataLabelsInterface;
  sectionHeader: SectionHeaderInterface;
  form: PublicationFormDataFormInterface;
  publicationForm: FormInputInterface[];
  actions: CancelConfirmInterface;
  requesting: boolean;
  informationIsAnError: boolean;
  informationMessage?: string;
}

export interface PublicationFormDialogDataInterface {
  mode: PublicationFormMode;
  publication?: PublicationModel;
}

export class PublicationFormManager {

  private static Labels: PublicationFormDataLabelsInterface = {
    header: {
      create: 'New Publication',
      update: 'Edit Publication'
    },
    publication: {
      title: 'Title',
      body: 'Body',
      author: 'Author',
      datetime: 'Created datetime'
    },
    actions: {
      create: 'Save',
      update: 'Update',
      cancel: 'Cancel'
    },
    information: {
      created: 'The publication was created 😃',
      creating: 'Creating publication ...',
      updated: 'The publication was updated 😃',
      updating: 'Updating publication ...'
    },
    errors: {
      invalidForm: 'You should complete all the required fields.',
      invalidTitle: 'You must complete the title field.',
      invalidBody: 'You must complete the body field.',
      invalidAuthor: 'You must complete the author field.',
      invalidDatetime: 'You must complete the datetime field.',
      create: 'Usps! An error has occurred when trying to create the publication 😔',
      update: 'Usps! An error has occurred when trying to update the publication 😔'
    }
  };

  private static CretePublicationHeader = SectionHeaderManager
    .SectionHeader(PublicationFormManager.Labels.header.create);

  private static FormInputId = FormInputManager
    .From('hidden', 'id', FormInputManager.Control(null));

  private static FormInputTitle = FormInputManager
    .From('input', 'title', FormInputManager.RequiredControl(),
      PublicationFormManager.Labels.publication.title,
      PublicationFormManager.Labels.errors.invalidTitle);

  private static FormInputBody = FormInputManager
    .From('input', 'body', FormInputManager.RequiredControl(),
      PublicationFormManager.Labels.publication.body,
      PublicationFormManager.Labels.errors.invalidBody);

  private static FormInputAuthorId = FormInputManager
    .From('select', 'author', FormInputManager.RequiredControl(),
      PublicationFormManager.Labels.publication.author,
      PublicationFormManager.Labels.errors.invalidAuthor,
      '', null, []);

  private static FormInputDatetime = FormInputManager
    .From('date', 'datetime', FormInputManager.RequiredControl(),
      PublicationFormManager.Labels.publication.datetime,
      PublicationFormManager.Labels.errors.invalidDatetime);

  private static FormInputs: PublicationFormDataFormInterface = {
    id: PublicationFormManager.FormInputId,
    title: PublicationFormManager.FormInputTitle,
    body: PublicationFormManager.FormInputBody,
    authorId: PublicationFormManager.FormInputAuthorId,
    datetime: PublicationFormManager.FormInputDatetime
  };

  private static FormActions = CancelConfirmManager
    .From(() => {}, () => {},
      PublicationFormManager.Labels.actions.create,
      PublicationFormManager.Labels.actions.cancel);

  static Data: PublicationFormDataInterface = {
    labels: PublicationFormManager.Labels,
    sectionHeader: PublicationFormManager.CretePublicationHeader,
    form: PublicationFormManager.FormInputs,
    publicationForm: PublicationFormManager
      .PublicationForm(PublicationFormManager.FormInputs),
    actions: PublicationFormManager.FormActions,
    requesting: false,
    informationIsAnError: false
  };

  private static PublicationForm(inputs: PublicationFormDataFormInterface): FormInputInterface[] {
    return Object.keys(inputs)
      .map(key => inputs[key]);
  }

  private static AuthorIntoSelectOption(author: AuthorModel): SelectOptionInterface {
    return { value: author.id,  label: author.fullName };
  }

  static UpdateFormInputAuthors(authors: AuthorModel[]) {
    PublicationFormManager.Data.form.authorId.selectOptions = authors
      .map(PublicationFormManager.AuthorIntoSelectOption);
    PublicationFormManager.Data.publicationForm = PublicationFormManager
      .PublicationForm(PublicationFormManager.Data.form);
  }

  static PublicationFromForm(): PublicationInterface {
    const id = PublicationFormManager.Data.form.id.control.value;
    const title = PublicationFormManager.Data.form.title.control.value;
    const body = PublicationFormManager.Data.form.body.control.value;
    const date = PublicationFormManager.Data.form.datetime.control.value;
    const datetime = new Date(date).toISOString();
    const authorId = PublicationFormManager.Data.form.authorId.control.value;

    return PublicationsManager
      .PublicationFrom(title, body, datetime, authorId, id);
  }

  static ResetForm() {
    const form = PublicationFormManager.Data.form;
    form.id.control.reset();
    form.title.control.reset();
    form.body.control.reset();
    form.authorId.control.reset();
    form.datetime.control.reset();
    PublicationFormManager.Data.publicationForm = PublicationFormManager
      .PublicationForm(form);
  }

}
