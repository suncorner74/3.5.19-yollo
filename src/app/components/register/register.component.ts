import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';\
import { FileUploadModule } from 'primeng/fileupload';
import { UserService } from './../../services/user.service'
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { CustomValidator } from 'src/app/_helpers/customValidator';
import { DataShareService } from 'src/app/_helpers/data-share.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {
  @Input() display: boolean = false;
  selectedValues: string[] = [];
  registerForm: FormGroup;
  submitted = false;
  getLoginSubscription = null;
  userDetetails = null;
  invalid = false;
  val1: string;
  val2: string = 'Provider';
  uploadedFiles: any[] = [];
  show_button: Boolean = false;
  show_eye: Boolean = true;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private customValidator: CustomValidator,
    private dataShareService: DataShareService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, this.customValidator.phoneNumberValidation]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required],
    // }, {
    //     validator: MustMatch('password', 'confirmPassword')
    //   });
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.getLoginSubscription = this.userService.register(this.registerForm.value)
      .subscribe((resp) => {
        this.dataShareService.changeMessage(
          {
            label: 'succcessRegister',
            data: true
          });
          this.registerForm.reset();
      }, (error) => {
        this.invalid = true;
        console.log(`error: ${error}`);
      });

  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
}



