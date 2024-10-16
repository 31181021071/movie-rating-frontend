import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Editor } from 'primeng/editor';
import Quill from 'quill';
import { AppConstants } from 'src/app/constant/app.constants';
import { DirectorDetail } from 'src/app/models/admin-profile/admin-profile.model';
import { Mcodes } from 'src/app/models/mcodes.model';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { StringUtils } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.scss']
})
export class DirectorDetailComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  @ViewChild('quillEditor', { static: false }) quillEditor!: Editor;
  quillInstance: Quill | undefined;

  data: any;
  directorDetail: DirectorDetail = {};

  showErrorMessage = false;
  errorMessages = [];

  listCountry: Mcodes[] = [];

  imageUrl: string = '';
  altText: string = 'Uploaded Image';
  selectedImg: File | null = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public adminProfileService: AdminProfileService,
    public toastService: ToastService,
    public datePipe: DatePipe
  ) {
    this.data = config.data;
  }

  async ngOnInit(): Promise<void> {
    let resutlInit = await this.adminProfileService.getInitDirectorDetail();
    this.listCountry = resutlInit.listCountry;
    if (this.data) {
      this.adminProfileService
        .getDirectorDetail(this.data)
        .subscribe((response) => {
          this.imageUrl = response.img ? 'data:image/jpeg;base64,' + response.img : null;
          this.directorDetail = response;
          this.directorDetail.img = this.imageUrl;
          this.directorDetail.birth = this.convertStringToDate(response.birth);
        });
    }
  }

  ngAfterViewInit() {
    // Access the Quill instance after the view has been initialized
    setTimeout(() => {
      if (this.quillEditor && this.quillEditor.getQuill()) {
        this.quillInstance = this.quillEditor.getQuill();
      }
      this.setContent(this.directorDetail.description);
    }, 500);
  }

  setContent(content: string) {
    if (this.quillInstance) {
      this.quillInstance.clipboard.dangerouslyPasteHTML(content);
    }
  }

  onFileSelect(event: any) {
    this.selectedImg = event.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    if (this.selectedImg) {
      reader.readAsDataURL(this.selectedImg);
    }
  }

  clearFileSelection() {
    this.selectedImg = null;
    this.imageUrl = '';
  }

  onSave() {
    let checkRequired = this.validationDirectorDetail();
    if (checkRequired) {
      return;
    }
    let img = this.imageUrl.split(',')[1];
    let param = {
      id: this.directorDetail.id ? this.directorDetail.id : 0,
      name: this.directorDetail.name,
      country: this.directorDetail.country,
      birth: this.datePipe.transform(this.directorDetail.birth, AppConstants.DATE_FORMAT_YYYYMMDD),
      description: this.directorDetail.description,
      img: img,
    };

    this.adminProfileService.saveDirector(param).subscribe((response) => {
      if (response) {
        this.toastService.showSuccess('Save successfully!');
        this.ref.close(response);
      }
    });
  }

  validationDirectorDetail() {
    this.showErrorMessage = false;
    this.errorMessages = [];
    if (
      StringUtils.isEmpty(this.directorDetail.name) ||
      StringUtils.isEmpty(this.directorDetail.country) ||
      StringUtils.isEmpty(this.directorDetail.description)
    ) {
      this.showErrorMessage = true;
      this.errorMessages.push('Please fill out all required field.');
    }

    if (this.showErrorMessage) {
      return this.showErrorMessage;
    }
    return this.showErrorMessage;
  }

  onCancel() {
    this.ref.close();
  }

  onDelete() {}

  convertStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
