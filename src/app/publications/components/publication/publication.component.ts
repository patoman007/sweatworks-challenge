import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PublicationManager } from './publication.manager';

import { PublicationsService } from '../../services/publications.service';

import {
  PublicationModel
} from '../../../shared/publications/publications.manager';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent {

  data = PublicationManager.Data;
  deleting = false;

  @Input()
  model: PublicationModel;

  @Output()
  edit = new EventEmitter<string>();

  constructor(private publicationsService: PublicationsService) { }

  onEdit() {
    if (!this.model.id) { return; }
    this.edit.emit(this.model.id);
  }

  onDelete() {
    if (!this.model.id) { return; }

    this.deleting = true;
    this.publicationsService.deletePublication(this.model.id)
      .subscribe(() => {
        this.deleting = false;
      });
  }

}
