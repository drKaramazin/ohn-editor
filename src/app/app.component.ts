import { Component, OnInit } from '@angular/core';

import { OhnApiService } from './services/ohn-api.service';
import { StorageService } from './services/storage.service';
import { Item } from './models/storage/item';
import { Element } from './models/element/element';
import { LoadingService } from './services/loading.service';
import { CurrentElementService } from './services/current-element.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'editor';

  xMoesifApplicationId: string;
  apiUrl: string;
  appName: string;
  token: string;

  element: Element;

  constructor(
    private ohnApi: OhnApiService,
    private storage: StorageService,
    public loading: LoadingService,
    public current: CurrentElementService,
  ) {}

  getParams() {
    this.apiUrl = this.storage.get(Item.ApiUrl);
    this.appName = this.storage.get(Item.AppName);
    this.xMoesifApplicationId = this.storage.get(Item.XMoesifApplicationId);
    this.token = this.storage.get(Item.Token);
  }

  setParams() {
    this.storage.set(Item.ApiUrl, this.apiUrl);
    this.storage.set(Item.AppName, this.appName);
    this.storage.set(Item.XMoesifApplicationId, this.xMoesifApplicationId);
    this.storage.set(Item.Token, this.token);
  }

  ngOnInit(): void {
    this.getParams();
  }

  paramChanged() {
    this.setParams();
  }

  browseApp() {
    this.ohnApi.apiUrl = this.apiUrl;
    this.ohnApi.appName = this.appName;
    this.ohnApi.xMoesifApplicationId = this.xMoesifApplicationId;
    this.ohnApi.token = this.token;

    this.ohnApi.getElement('app', 999).subscribe((resp) => this.element = resp);
  }

}
