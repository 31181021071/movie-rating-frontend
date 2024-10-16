import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constant/app.constants';
import { DirectorSearchCondition } from 'src/app/models/admin-profile/admin-profile.model';
import { Mcodes } from 'src/app/models/mcodes.model';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { ShareDialogService } from 'src/app/services/common/dialog.service';
import { DirectorDetailComponent } from './director-detail/director-detail.component';

@Component({
  selector: 'app-director-management',
  templateUrl: './director-management.component.html',
  styleUrls: ['./director-management.component.scss']
})
export class DirectorManagementComponent implements OnInit{

  directorSearchCondition: DirectorSearchCondition = {};

  listCountry: Mcodes[] = [];

  directorList = [];

  size = 50;
  totalRecord = 0;
  currentPage = 1;

  constructor(
    private dialogService: ShareDialogService,
    public adminProfileService: AdminProfileService,
    public datePipe: DatePipe
  ){}


  async ngOnInit(): Promise<void> {
    let resutlInit = await this.adminProfileService.getInitDirectorManagement();
    this.listCountry = resutlInit.listCountry;
  }

  onSearch() {
    const offset = 0;
    const limit = this.size;
    this.currentPage = 1;

    this.search(offset, limit);
  }

  onClear() {
    this.directorSearchCondition = {};
  }

  openDialogDetail(id?: any) {
    let param = {
      title: "Director Detail",
      data: id
    }
    this.dialogService.openDialog(DirectorDetailComponent, param).onClose.subscribe(data => {
      if (data) {
        const offset = 0;
        const limit = this.size;
        this.currentPage = 1;
        this.search(offset, limit);
      }
    });
  }

  onChangePage(event: any) {
    console.log(event);
    const offset = event.first;
    const limit = event.rows;
    this.currentPage = event.page + 1;

    this.search(offset, limit);
  }

  search(offset: any, limit: any) {
    let birthFrom = this.datePipe.transform(this.directorSearchCondition.birthFrom, AppConstants.DATE_FORMAT_YYYYMMDD);
    let birthTo = this.datePipe.transform(this.directorSearchCondition.birthTo, AppConstants.DATE_FORMAT_YYYYMMDD);
    let param = {
      name: this.directorSearchCondition.name,
      birthFrom: birthFrom,
      birthTo: birthTo,
      country: this.directorSearchCondition.country,
      offset: offset,
      limit: limit
    }

    this.adminProfileService.searchDirector(param).subscribe(result => {
      if(result) {
        this.totalRecord = result.totalRecord
        this.directorList = result.directorList
      }
    })
  }
}
