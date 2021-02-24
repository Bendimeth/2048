import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GameStatus, IStoreReducer, MoveTo} from './entities/IStoreService';

import {StoreService} from './logic/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private storeService: StoreService) {
  }

  subscribe: Subscription;
  stateInstance: IStoreReducer;

  ngOnInit(): void {
    this.storeService.initOrResetList();
    this.stateInstance = this.storeService.getState();
    this.subscribe = this.storeService.listChanged
      .subscribe(
        (state) => {
          this.stateInstance = state;
        }
      );
  }

  onReset(): void {
    this.storeService.initOrResetList();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.stateInstance.status !== GameStatus.Finished) {
        const directionByKeyEvent = {
          ArrowUp: MoveTo.Top,
          ArrowDown: MoveTo.Bottom,
          ArrowRight: MoveTo.Right,
          ArrowLeft: MoveTo.Left
        };
        if (Object.keys(directionByKeyEvent).includes(event.key)) {
          this.storeService.onMove(directionByKeyEvent[event.key]);
        }
    }
  }
}
