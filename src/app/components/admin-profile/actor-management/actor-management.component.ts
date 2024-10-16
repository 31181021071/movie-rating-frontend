import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constant/app.constants';
import { ActorSearchCondition } from 'src/app/models/admin-profile/admin-profile.model';
import { Mcodes } from 'src/app/models/mcodes.model';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { ShareDialogService } from 'src/app/services/common/dialog.service';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';

@Component({
  selector: 'app-actor-management',
  templateUrl: './actor-management.component.html',
  styleUrls: ['./actor-management.component.scss']
})
export class ActorManagementComponent implements OnInit {
  actorSearchCondition: ActorSearchCondition = {};

  listCountry: Mcodes[] = [];

  actorList = [];

  size = 50;
  totalRecord = 0;
  currentPage = 1;

  constructor(
    private dialogService: ShareDialogService,
    public adminProfileService: AdminProfileService,
    public datePipe: DatePipe
  ){}


  async ngOnInit(): Promise<void> {
    let resutlInit = await this.adminProfileService.getInitActorManagement();
    this.listCountry = resutlInit.listCountry;
  }

  onSearch() {
    const offset = 0;
    const limit = this.size;
    this.currentPage = 1;

    this.search(offset, limit);
  }

  onClear() {
    this.actorSearchCondition = {};
  }

  openDialogDetail(id?: any) {
    let param = {
      title: "Actor Detail",
      data: id
    }
    this.dialogService.openDialog(ActorDetailComponent, param).onClose.subscribe(data => {
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
    let birthFrom = this.datePipe.transform(this.actorSearchCondition.birthFrom, AppConstants.DATE_FORMAT_YYYYMMDD);
    let birthTo = this.datePipe.transform(this.actorSearchCondition.birthTo, AppConstants.DATE_FORMAT_YYYYMMDD);
    let param = {
      name: this.actorSearchCondition.name,
      birthFrom: birthFrom,
      birthTo: birthTo,
      country: this.actorSearchCondition.country,
      offset: offset,
      limit: limit
    }

    this.adminProfileService.searchActor(param).subscribe(result => {
      if(result) {
        this.totalRecord = result.totalRecord
        this.actorList = result.actorList
      }
    })
  }
}
