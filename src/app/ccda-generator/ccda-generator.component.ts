import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-ccda-generator',
  templateUrl: './ccda-generator.component.html',
  styleUrls: ['./ccda-generator.component.css'],
})
export class CcdaGeneratorComponent implements OnInit {
  inputForm = new FormGroup({
    fileInput: new FormControl(''),
  });
  fileExtension: string = '';
  filesToUpload: any;
  fd: any;
  response: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.fileExtension = '';
    this.filesToUpload = [];
    this.response = false;

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
      this.inputForm.controls['fileInput'].setValue('Upload file');
      this.response = false;
    }
  }

  onSubmit() {
    this.fd = new FormData();

    if (this.fileExtension !== '') {
      this.fd.append('file', this.filesToUpload[0]);
    }

    this.appService.getData(this.fd).subscribe((res) => {
      if (res) {
        this.response = true;
        console.log(res);
      }
    });
  }
}
