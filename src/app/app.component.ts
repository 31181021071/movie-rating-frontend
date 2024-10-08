import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/common/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie rating';

  constructor(public loadingService: LoadingService){}
}
