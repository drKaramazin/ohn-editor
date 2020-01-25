import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/storage/item';

import { StorageService } from '../../services/storage.service';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  xMoesifApplicationId: string;
  apiUrl: string;
  appName: string;
  token: string;

  constructor(
    private storage: StorageService,
    private links: LinksService,
  ) {}

  getParams() {
    this.apiUrl = this.storage.get(Item.ApiUrl);
    this.appName = this.storage.get(Item.AppName);
    this.xMoesifApplicationId = this.storage.get(Item.XMoesifApplicationId);
    this.token = this.storage.get(Item.Token);
  }

  ngOnInit(): void {
    setTimeout(() => this.links.current.next(0));
    this.getParams();
  }

  setParams() {
    this.storage.set(Item.ApiUrl, this.apiUrl);
    this.storage.set(Item.AppName, this.appName);
    this.storage.set(Item.XMoesifApplicationId, this.xMoesifApplicationId);
    this.storage.set(Item.Token, this.token);
  }

  paramChanged() {
    this.setParams();
  }

}
