import {Component, OnInit} from '@angular/core';
import {StoreService} from "./logic/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private storeService: StoreService) {
  }

  subscribe: Subscription;
  list;

  ngOnInit(): void {
    this.storeService.initOrResetList();
    this.list = this.storeService.getList();
    this.subscribe = this.storeService.listChanged
      .subscribe(
        () => {
          this.list = this.storeService.getList();
        }
      );
  }

  onReset(): void {
    this.storeService.initOrResetList();
    this.list = this.storeService.getList();
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp': {
        this.storeService.onMoveUp();
      }
        break;
      case 'ArrowDown': {
        this.storeService.onMoveDown();
      }
        break;
      case 'ArrowRight': {
        this.storeService.onMoveRight();
      }
        break;
      case 'ArrowLeft': {
        this.storeService.onMoveLeft();
      }
        break;
      default: {

      }
    }
  }
}
