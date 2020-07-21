import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../services/event.service';
import { GenericStorageService } from '../services/generic-storage.service';
import { Router } from '@angular/router';
import { DependencyInjector } from './dependency-injector';
import { ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export class BaseComponent {

    public innerWidth: number;
    public loading: boolean;
    public saveLoading: boolean;
    public noResults: boolean;   
    @ViewChild('f') form: NgForm;
    protected toastr?: ToastrService;
    protected router?: Router;
    protected storageService: GenericStorageService;
    protected eventsService: EventService;
    private _snackBar: MatSnackBar;
    
    constructor() {
        this.storageService = DependencyInjector.inject(GenericStorageService);
        this.toastr = DependencyInjector.inject(ToastrService);
        this.router = DependencyInjector.inject(Router);
        this._snackBar = DependencyInjector.inject(MatSnackBar);
        this.innerWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    canLeave(): boolean {
        return true;
    }

    checkMinResolution() {
        return this.innerWidth > 800;
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
    }

}