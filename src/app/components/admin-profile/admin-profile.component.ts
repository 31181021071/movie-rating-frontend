import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {

  activeTab: number = 0;

  onTabChange(event: any) {
    this.activeTab = event.index;
  }
}
