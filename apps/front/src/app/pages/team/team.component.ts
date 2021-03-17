import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nicecactus-platform-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  modalGames = null;
  name = new FormControl('', [Validators.required]);
  tag = new FormControl('', [Validators.required]);
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content) {
    this.modalGames = this.modalService.open(content, {centered: true, size: 'sm' });
   }
   getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
  }
  getErrorTag() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
  }
  ngOnInit(): void {
  }

}
