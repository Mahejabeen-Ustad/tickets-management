import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TICKES_LIST_DATA_KEY, Ticket } from 'src/app/services/ticket.service';
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
  sessionData = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
    let editDat = {};
    this.sessionData = JSON.parse(sessionStorage.getItem(TICKES_LIST_DATA_KEY));
    this.route.params.subscribe(data => {
      if(data) {
        data.id ? this.isEditFrom = true : null;
        this.editTicketId = data.id;
        editDat = this.sessionData.find(ele => ele.id === this.editTicketId);
      }
    });
    this.addEditTicketForm = this.generateForm(editDat);
  }

  generateForm(editDat) {
    const addForm: FormGroup = this.formBuilder.group({
      id: this.formBuilder.control(this.editTicketId && editDat? editDat.id: this.sessionData.length+1),
      title: this.formBuilder.control(editDat && editDat.title ? editDat.title : '', 
        [Validators.maxLength(128), Validators.required], ),
      description: this.formBuilder.control(editDat && editDat.description ? editDat.description : '',
        [Validators.maxLength(1024), Validators.required] ),
      created_date: this.formBuilder.control(editDat && editDat.created_date ? editDat.created_date : new Date(),
        [Validators.required]),
      status: this.formBuilder.control(editDat && editDat.title ? editDat.title : 'Open', [Validators.required]),
    });
    return addForm;
  }

  cancel() {
  }

  addEditHandler() {
    if(this.isEditFrom) {
      const index = this.sessionData.findIndex(ele => ele.id.toString() === this.editTicketId.toString());
      this.sessionData[index] = this.addEditTicketForm.value;
    } else {
      this.sessionData.push(this.addEditTicketForm.value);
    }
    sessionStorage.setItem(TICKES_LIST_DATA_KEY, JSON.stringify(this.sessionData));
  }

  getErrorMessage(control) {

  }
}
