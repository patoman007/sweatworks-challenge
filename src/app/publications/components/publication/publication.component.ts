import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicationModel } from './publication.manger';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input()
  model: PublicationModel;

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    if (!this.model.id) { return; }
    this.edit.emit(this.model.id);
  }

  onDelete() {
    if (!this.model.id) { return; }
    this.delete.emit(this.model.id);
  }

}
