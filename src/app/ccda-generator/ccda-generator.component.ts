import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

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

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.fileExtension = '';
    this.fileToUpload = [];
    this.isApiResponse = false;

    if (event.target.files.length) {
      if (event.target.files[0].name.lastIndexOf('.') !== -1) {
        this.fileExtension = event.target.files[0].name.substring(
          event.target.files[0].name.lastIndexOf('.') + 1,
          event.target.files[0].name.length
        );
        if (this.fileExtension.toLowerCase() === 'xlsx') {
          this.fileToUpload.push(event.target.files[0]);
          this.excelInputForm.controls['fileInput'].setValue(
            this.fileToUpload[0].name
          );
        } else {
          this.fileExtension = '';
        }
      } else {
        this.fileExtension = '';
      }
    } else {
      this.excelInputForm.controls['fileInput'].setValue('Upload file');
      this.isApiResponse = false;
    }
  }

  onSubmit() {
    this.fd = new FormData();

    if (this.fileExtension !== '') {
      this.fd.append('file', this.fileToUpload[0]);
    }

    this.appService.getData(this.fd).subscribe((res) => {
      if (res) {
        this.isApiResponse = true;
        console.log(res);
      }
    });
  }
}
