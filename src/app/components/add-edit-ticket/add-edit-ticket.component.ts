import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName } from '@angular/forms';
// import { FormGroup, UntypedFormBuilder, Validators, AbstractControl, ControlContainer, UntypedFormControl, ValidationErrors, UntypedFormArray, FormControlName, ValidatorFn, Form } from '@angular/forms';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.scss']
})
export class AddEditTicketComponent implements OnInit {

  title: string = 'Create New Ticket';
  addEditTicketForm: FormGroup;
  statusList = ['Open', 'In-progress', 'Completed', 'Deferred']
  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addEditTicketForm = this.generateForm();
  }

  generateForm() {
    const addForm: FormGroup = this.formBuilder.group({
      id: this.formBuilder.control(''),
      title: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      created_date: this.formBuilder.control(''),
      status: this.formBuilder.control('Open'),
    });

    return addForm;
  }

  cancel() {

  }

  addEditHandler() {

  }
}
