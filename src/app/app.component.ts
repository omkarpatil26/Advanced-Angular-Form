import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form';
  loginForm : FormGroup | any;
  submitted = false;
  form: FormGroup | any;
  formSubmitted = false;
  printValue : any;
  
 // value1a:any;
  value1b:any;
  value2a:any;
  value2b:any;
  value2c:any;
 

  closeResult: string | undefined;
  modalOptions:NgbModalOptions;

  constructor(
    private modalService: NgbModal, private fb: FormBuilder
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
   
    // this.formControlValueChanged();

      this.loginForm = this.fb.group({
      awba: [''],
      awbb: [''],
      fna: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(/^[ A-Za-z0-9]{2}$/)]],
      fnb: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[ 0-9]{4}$/)]],
      fnc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^[ A-Za-z]{1}$/)]],
      date:['', Validators.required],
      shipper: ['', Validators.required],
      forwarder: ['', Validators.required]
    });
     //this.buildForm();
     this.loginForm.get('awba').valueChanges
      .subscribe((awbacheck: any) => {
        const awba = this.loginForm.get('awba');
        const awbb = this.loginForm.get('awbb');
        if (awbacheck) {
          awba.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
          awbb.setValidators([Validators.required,Validators.minLength(8), Validators.maxLength(8)]);
        } else {
          awba.clearValidators();
        }
        awba.updateValueAndValidity();
      });
  }

  // buildForm() {
  //   this.form = this.fb.group({
  //     awba: ['', [ Validators.required ]],
  //     awbb: ['', [ Validators.required ]],
      
  //   });
  // }

  // setUserCategoryValidators() {
  //   const awba = this.form.get('awba');
  //   const awbb = this.form.get('awbb');

  //   this.form.get('awba').valueChanges
  //     .subscribe(() => {

  //       if (awba !== '') {
  //         awba.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
  //         awbb.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  //       }

        
  //     });
  // }
    

//   formControlValueChanged() {
//     this.loginForm.get('notification').valueChanges.subscribe(
//         (mode: string) => {
//             console.log(mode);
//         });
// }

  
  
  open(content:any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  showAdvsaerch = {
    advsearch : false
  }

  submit(form:any){
    var value1a = form.value1a;
    console.log(value1a);
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
   
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.loginForm.value);
      this.printValue = this.loginForm.value;
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

 }