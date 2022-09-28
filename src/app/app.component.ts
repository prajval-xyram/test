import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputForm = new FormGroup({
    fileInput: new FormControl(''),
  });
  fileExtension: string = '';
  filesToUpload: any;
  fd: any;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.fileExtension = '';
    this.filesToUpload = [];

    if (event.target.files.length) {
      if (event.target.files[0].name.lastIndexOf('.') !== -1) {
        this.fileExtension = event.target.files[0].name.substring(
          event.target.files[0].name.lastIndexOf('.') + 1,
          event.target.files[0].name.length
        );
        if (this.fileExtension.toLowerCase() === 'xlsx') {
          this.filesToUpload.push(event.target.files[0]);
          this.inputForm.controls['fileInput'].setValue(
            this.filesToUpload[0].name
          );
        } else {
          this.fileExtension = '';
        }
      } else {
        this.fileExtension = '';
      }
    } else {
      this.inputForm.controls['fileInput'].setValue('Upload files');
    }
  }

  onSubmit() {
    this.fd = new FormData();

    if (this.fileExtension !== '') {
      this.fd.append('file', this.filesToUpload[0]);
    }
  }

  fileUpload() {
    this.http.post('/api/generateCcda', this.fd).subscribe((res) => {
      console.log(res);
      return res;
    });
  }
}
