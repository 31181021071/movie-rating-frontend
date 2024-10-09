import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Editor } from 'primeng/editor';
import Quill from 'quill';

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
  movie: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { 
    this.data = config.data;
  }

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.movie = {
        id: 0,
        movieName: "movie name",
        releaseYear: "1999",
        description: "<p>text editor</p>"
      };
    }
  }

  ngAfterViewInit() {
    // Access the Quill instance after the view has been initialized
    setTimeout(() => {
      if (this.quillEditor && this.quillEditor.getQuill()) {
        this.quillInstance = this.quillEditor.getQuill();
      }
      this.setContent(this.movie.description);
    }, 500);
  }

  setContent(content: string) {
    if (this.quillInstance) {
      this.quillInstance.clipboard.dangerouslyPasteHTML(content);
    } 
  }

}
