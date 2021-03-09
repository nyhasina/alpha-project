import { Component, OnInit } from '@angular/core';
interface iParticipant {
  avatar: string,
  name: string
}
@Component({
  selector: 'nicecactus-platform-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})

export class ParticipantsComponent implements OnInit {
  participants: Array<iParticipant> = [
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'Reyna Chung'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      name: 'Rafael Briggs'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Michael Bean'
    },
    {
      avatar: '',
      name: 'Roderick Moss'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      name: 'Rafael Briggs'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Michael Bean'
    },
    {
      avatar: '',
      name: 'Roderick Moss'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'Reyna Chung'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      name: 'Rafael Briggs'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Michael Bean'
    },
    {
      avatar: '',
      name: 'Roderick Moss'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      name: 'Rafael Briggs'
    },
    {
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Michael Bean'
    },
    {
      avatar: '',
      name: 'Roderick Moss'
    },
  ] 
  constructor() { }

  ngOnInit(): void {
  }

}
