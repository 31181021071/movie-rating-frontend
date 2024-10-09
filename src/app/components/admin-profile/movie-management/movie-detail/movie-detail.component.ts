import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import Quill from 'quill';
import { MovieDetail } from 'src/app/models/admin-profile/admin-profile.model';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { StringUtils } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  @ViewChild('quillEditor', { static: false }) quillEditor!: Editor;
  quillInstance: Quill | undefined;

  data: any;
  movieDetail: MovieDetail = {};

  showErrorMessage = false;
  errorMessages = [];

  listCountry = [{code: "1", codeName: "Vietnam"}];
  listReleaseYear = [];
  listGenre = [{code: "1", codeName: "Action"}];

  imageUrl: string = "";
  altText: string = 'Uploaded Image';
  selectedImg: File | null = null;


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public adminProfileService: AdminProfileService,
    public toastService: ToastService
  ) { 
    this.data = config.data;
  }

  async ngOnInit(): Promise<void> {
    this.listReleaseYear = this.generateReleaseYearArray()
    // let resutlInit = await this.adminProfileService.getInitMovieDetail();
    // this.listCountry = resutlInit.listCountry;
    // this.listGenre = resutlInit.listGenre;
    // if (this.data?.id) {
    //   this.adminProfileService.getMovieDetail(this.data.id).subscribe(response => {
    //     this.movieDetail = response
    //   })
    // }
  }

  ngAfterViewInit() {
    // Access the Quill instance after the view has been initialized
    setTimeout(() => {
      if (this.quillEditor && this.quillEditor.getQuill()) {
        this.quillInstance = this.quillEditor.getQuill();
      }
      this.setContent(this.movieDetail.description);
    }, 500);
  }

  setContent(content: string) {
    if (this.quillInstance) {
      this.quillInstance.clipboard.dangerouslyPasteHTML(content);
    } 
  }

  generateReleaseYearArray() {
    const startYear = 1895;
    const currentYear = new Date().getFullYear(); // Get the current year
    const endYear = currentYear + 5; // Extend to 5 years in the future

    // Generate the array of years from startYear to endYear
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ code: year, codeName: year });
    }
    return years;
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

  clearFileSelection(fileUpload: FileUpload) {
    fileUpload.clear();
    this.selectedImg = null;
    this.imageUrl = "";
  }

  onSave() {
    let checkRequired = this.validationMovieDetail();
    if (checkRequired) {
      return;
    }
    let param = {
      id: this.movieDetail.id ? this.movieDetail.id : null,
      movieName: this.movieDetail.movieName,
      country: this.movieDetail.country,
      releaseYear: this.movieDetail.releaseYear,
      genre: this.movieDetail.genre,
      isShow: this.movieDetail.isShow.toString() == "1" ? true : false,
      description: this.movieDetail.description,
      img: this.imageUrl
    }
    console.log(param);
    this.adminProfileService.save(param).subscribe(response => {
      if (response) {
        this.toastService.showSuccess("Save successfully!");
        this.ref.close();
      }
    })
  }

  validationMovieDetail() {
    this.showErrorMessage = false;
    this.errorMessages = [];
    if (StringUtils.isEmpty(this.movieDetail.movieName) || StringUtils.isEmpty(this.movieDetail.country) || !this.movieDetail.genre || this.movieDetail.genre.length == 0 || StringUtils.isEmpty(this.movieDetail.description)) {
      this.showErrorMessage = true;
      this.errorMessages.push("Please fill out all required field.");
    }

    if(this.showErrorMessage) {
      return this.showErrorMessage;
    }
    return this.showErrorMessage;
  }

  onCancel() {
    this.ref.close();
  }

  onDelete() {
  }

}
