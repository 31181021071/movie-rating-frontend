import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Editor } from 'primeng/editor';
import Quill from 'quill';
import { AppConstants } from 'src/app/constant/app.constants';
import { ActorDetail } from 'src/app/models/admin-profile/admin-profile.model';
import { Mcodes } from 'src/app/models/mcodes.model';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { StringUtils } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  @ViewChild('quillEditor', { static: false }) quillEditor!: Editor;
  quillInstance: Quill | undefined;

  data: any;
  actorDetail: ActorDetail = {};

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
    let resutlInit = await this.adminProfileService.getInitActorDetail();
    this.listCountry = resutlInit.listCountry;
    if (this.data) {
      this.adminProfileService
        .getActorDetail(this.data)
        .subscribe((response) => {
          this.imageUrl = response.img ? 'data:image/jpeg;base64,' + response.img : null;
          this.actorDetail = response;
          this.actorDetail.img = this.imageUrl;
          this.actorDetail.birth = this.convertStringToDate(response.birth);
        });
    }
  }

  ngAfterViewInit() {
    // Access the Quill instance after the view has been initialized
    setTimeout(() => {
      if (this.quillEditor && this.quillEditor.getQuill()) {
        this.quillInstance = this.quillEditor.getQuill();
      }
      this.setContent(this.actorDetail.description);
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
    let checkRequired = this.validationActorDetail();
    if (checkRequired) {
      return;
    }
    let img = this.imageUrl.split(',')[1];
    let param = {
      id: this.actorDetail.id ? this.actorDetail.id : 0,
      name: this.actorDetail.name,
      country: this.actorDetail.country,
      birth: this.datePipe.transform(this.actorDetail.birth, AppConstants.DATE_FORMAT_YYYYMMDD),
      description: this.actorDetail.description,
      img: img,
    };

    this.adminProfileService.saveActor(param).subscribe((response) => {
      if (response) {
        this.toastService.showSuccess('Save successfully!');
        this.ref.close(response);
      }
    });
  }

  validationActorDetail() {
    this.showErrorMessage = false;
    this.errorMessages = [];
    if (
      StringUtils.isEmpty(this.actorDetail.name) ||
      StringUtils.isEmpty(this.actorDetail.country) ||
      StringUtils.isEmpty(this.actorDetail.description)
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
