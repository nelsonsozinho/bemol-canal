import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mensagem',
  templateUrl: './dialog-mensagem.component.html',
  styleUrls: ['./dialog-mensagem.component.css']
})
export class DialogMensagemComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit() {
    }
  

}
