import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-ccda-generator',
  templateUrl: './ccda-generator.component.html',
  styleUrls: ['./ccda-generator.component.css'],
})
export class CcdaGeneratorComponent implements OnInit {
  excelInputForm = new FormGroup({
    fileInput: new FormControl(''),
  });

  fileExtension: string = '';
  fileToUpload: any;
  fd: any;
  isApiResponse: boolean = false;
  message: string = '';
  isFileInvalid: boolean = false;

  constructor(
    private appService: AppService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.fileExtension = '';
    this.fileToUpload = [];
    this.isApiResponse = false;
    this.excelInputForm.controls['fileInput'].setValue('Upload file');

    if (event.target.files.length) {
      if (event.target.files[0].name.lastIndexOf('.') !== -1) {
        this.fileExtension = event.target.files[0].name.substring(
          event.target.files[0].name.lastIndexOf('.') + 1,
          event.target.files[0].name.length
        );
        if (this.fileExtension.toLowerCase() === 'xlsx') {
          this.isFileInvalid = false;
          this.fileToUpload.push(event.target.files[0]);
          this.excelInputForm.controls['fileInput'].setValue(
            this.fileToUpload[0].name
          );
        } else {
          this.fileExtension = '';
          this.isFileInvalid = true;
        }
      } else {
        this.fileExtension = '';
      }
    } else {
      this.excelInputForm.controls['fileInput'].setValue('Upload file');
      this.isApiResponse = false;
      this.isFileInvalid = false;
    }
    event.target.value = '';
  }

  onSubmit() {
    this.ngxService.start();
    this.fd = new FormData();

    if (this.fileExtension !== '') {
      this.fd.append('file', this.fileToUpload[0]);
    }

    this.appService.postData(this.fd).subscribe(
      (res: any) => {
        if (res) {
          this.isApiResponse = true;
          this.excelInputForm.controls['fileInput'].setValue('Upload file');
          if (res?.message === 'succesfully generated ccda data files') {
            this.message = 'Succesfully generated CCDA data files';
          }
          this.ngxService.stop();
        }
      },
      (error) => {
        if (
          error.error.message &&
          error.error.message.includes('Invalid Header In xls File')
        ) {
          this.message = 'Invalid Header In XLSX File';
        } else {
          this.message =
            'Could not reach the server. Try again after sometime.';
        }
        this.excelInputForm.controls['fileInput'].setValue('Upload file');
        this.isApiResponse = true;
        this.ngxService.stop();
      }
    );
  }
}
