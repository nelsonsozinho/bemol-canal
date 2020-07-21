import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem-error',
  templateUrl: './mensagem-error.component.html',
  styleUrls: ['./mensagem-error.component.css']
})
export class MensagemErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
