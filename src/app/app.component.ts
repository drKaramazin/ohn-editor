import { Component, OnInit } from '@angular/core';

import { OhnApiService } from './services/ohn-api.service';
import { StorageService } from './services/storage.service';
import { Item } from './models/storage/item';
import { LinksService } from './services/links.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'editor';

  constructor(
    private ohnApi: OhnApiService,
    private storage: StorageService,
    public links: LinksService,
    private auth: AuthService,
  ) {}

  getParams() {
    this.ohnApi.apiUrl = this.storage.get(Item.ApiUrl);
    this.ohnApi.appName = this.storage.get(Item.AppName);
    this.ohnApi.xMoesifApplicationId = this.storage.get(Item.XMoesifApplicationId);
    this.ohnApi.token = this.storage.get(Item.Token);
  }

  ngOnInit(): void {
    this.getParams();
    this.auth.init();
  }

}
