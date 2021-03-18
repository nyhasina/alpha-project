import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
interface iTeam {
name: string;
date: Date;
tag: string;
owner: string;
}
@Component({
  selector: 'nicecactus-platform-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  modalGames = null;
  name = new FormControl('', [Validators.required]);
  tag = new FormControl('', [Validators.required]);
  formTeam: FormGroup;
  tabsTeam: Array<iTeam> = []
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder?: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.createTeam()
  }
  createTeam() {
    this.formTeam = this.formBuilder.group({
      name: ['', Validators.required],
      tag: ['', Validators.required],
  });
  }
  get f() { return this.formTeam.controls; }
  open(content) {
    this.modalGames = this.modalService.open(content, {centered: true, size: 'sm' });
   }
   confirm() {
     console.log(this.formTeam.value.name)
   }
  ngOnInit(): void {
  }

}
