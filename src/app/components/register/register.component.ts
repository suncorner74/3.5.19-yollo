import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';\
import { FileUploadModule } from 'primeng/fileupload';
import { UserService } from './../../services/user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {
  selectedValues: string[] = [];
  registerForm: FormGroup;
  submitted = false;
  getLoginSubscription = null;
  userDetetails = null;
  invalid = false;
  val1: string;
  val2: string = 'Provider';
  uploadedFiles: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      // photoUpload: ['', Validators.required],
      // panCard: ['', Validators.required],
      role: ['',Validators.required]
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
        this.userDetetails = Object.assign({}, resp);
        // this.router.navigateByUrl('/');
        if (resp.user_level) {
          location.reload();
        } else {
          this.invalid = true;
        }

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
}



