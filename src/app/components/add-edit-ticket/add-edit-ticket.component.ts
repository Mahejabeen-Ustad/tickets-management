import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TICKES_LIST_DATA_KEY, Ticket } from 'src/app/services/ticket.service';
import { DialogComponent } from '../dialog/dialog.component';
// import { FormGroup, UntypedFormBuilder, Validators, AbstractControl, ControlContainer, UntypedFormControl, ValidationErrors, UntypedFormArray, FormControlName, ValidatorFn, Form } from '@angular/forms';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.scss']
})
export class AddEditTicketComponent implements OnInit {

  title: string = 'Create New Ticket';
  addEditTicketForm: FormGroup;
  statusList = ['Open', 'In-progress', 'Completed', 'Deferred'];
  isEditFrom: boolean = false;
  editTicketId: number;
  storageData = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    
   }

  ngOnInit(): void {
    let editDat = {};
    this.storageData = JSON.parse(localStorage.getItem(TICKES_LIST_DATA_KEY));
    this.route.params.subscribe(data => {
      if(data) {
        data.id ? this.isEditFrom = true : null;
        this.editTicketId = data.id;
        editDat = this.storageData.find(ele => ele.id.toString() === this.editTicketId.toString());
      }
    });
    this.addEditTicketForm = this.generateForm(editDat);
  }

  generateForm(editDat) {
    const addForm: FormGroup = this.formBuilder.group({
      id: this.formBuilder.control(this.editTicketId && editDat? editDat.id: this.storageData.length+1),
      title: this.formBuilder.control(editDat && editDat.title ? editDat.title : '', 
        [Validators.maxLength(128), Validators.required], ),
      description: this.formBuilder.control(editDat && editDat.description ? editDat.description : '',
        [Validators.maxLength(1024), Validators.required] ),
      created_date: this.formBuilder.control(editDat && editDat.created_date ? editDat.created_date : new Date(),
        [Validators.required]),
      status: this.formBuilder.control(editDat && editDat.status ? editDat.status : 'Open', [Validators.required]),
    });
    return addForm;
  }

  cancel() {
    this.router.navigate(['/tickets']);
  }

  addEditHandler() {
    let message = '';
    if(this.isEditFrom) {
      const index = this.storageData.findIndex(ele => ele.id.toString() === this.editTicketId.toString());
      this.storageData[index] = this.addEditTicketForm.value;
      message = 'You have successfully updated the ticket details'
    } else {
      this.storageData.push(this.addEditTicketForm.value);
      message = 'You have successfully created new ticket'
    }
    localStorage.setItem(TICKES_LIST_DATA_KEY, JSON.stringify(this.storageData));
    this.openDialog(message);
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: message,
      width: '30vw',
      height: '30vh'
    });
  }

  getErrorMessage(control) {
    const controlRef = this.addEditTicketForm.get(control);
    if(controlRef.touched && controlRef.dirty && !controlRef.valid ) {
      if(control == 'title') {
        return controlRef.value.length > 128 ? 'Title cannot be more than 128 characters' : 'field is required'
      } else if(control === 'description') {
        return controlRef.value.length > 1024 ? 'description cannot be more than 1024 characters' : 'field is required'
      }
    }
    return ''
  }
}

