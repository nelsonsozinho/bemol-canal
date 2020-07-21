import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensagemComponent } from './dialog-mensagem.component';

describe('DialogMensagemComponent', () => {
  let component: DialogMensagemComponent;
  let fixture: ComponentFixture<DialogMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
