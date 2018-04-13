import {
  Component, Input, ElementRef, AfterViewInit, ViewChild,
} from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../match-making/models/room';
import { Title } from '@angular/platform-browser';
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/observable/interval';

import { Router } from '@angular/router';
import { router } from '../app.routes';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})


export class CanvasComponent implements AfterViewInit {
  room: Room;
  lines;

  private cx: CanvasRenderingContext2D;
  roomId: any;
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.lines = [];
    let index = 0;
    /*   const timer = 60;
  
      if (Object.keys(this.room.players).length === 2) {
        Observable.interval(1000)
        .take(61)
        .subscribe((n) => {
          console.log(timer - n);
          if (n === timer) {
            console.log('perdue');
          }
        }); 
      } */

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        console.log(this.me);
        console.log(this.opponent);
        if (this.me.win) {
          alert('Congratulations ! You find the word !');
          this.router.navigate(['']);
        } else if (this.opponent.win) {
          alert('Congratulations ! the other player has find the word !');
          this.router.navigate(['']);
        }

        while (this.room.canvas && index < this.room.canvas.length) {
          const element = this.room.canvas[index];
          this.lines.push({ origin: element.origin, dest: element.dest });
          this.drawOnCanvas(element.origin, element.dest);
          index += 1;
        }
        /*         for (let index = 0; index < this.room.canvas.length; index++) {
                  const element = this.room.canvas[index];
                  this.lines.push({ origin: element.origin, dest: element.dest });
                  this.drawOnCanvas(element.origin, element.dest);

                } */
        console.log(this.room);
      });
  }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);

    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  get me() {
    if ((this.room.players[0].id === this.authService.authId)) {
      return this.room.players[0];
    }
    return this.room.players[1];
  }

  get opponent() {
    if ((this.room.players[0].id === this.authService.authId)) {
      return this.room.players[1];
    }
    return this.room.players[0];
  }

  checkWord(param){
    let inputValue = (<HTMLInputElement>document.getElementById('mot')).value;

    if(inputValue === this.room.randomWord) {
      this.me.win = true;
      this.updateRoom();
    }
  }

  isMyTurn(): boolean {
    if ((this.room.players[0].id === this.authService.authId && this.room.turn === 0) ||
      (this.room.players[1].id === this.authService.authId && this.room.turn === 1)) {
      return true;
    }
    return false;
  }

  changeTurn() {
    this.room.turn = this.room.turn === 0 ? 1 : 0;
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .set(this.room);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .pairwise();
      })
      .filter(() => {
        return this.isMyTurn();
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };
        this.lines.push({ origin: prevPos, dest: currentPos });
        this.drawOnCanvas(prevPos, currentPos);
      });
    Observable
      .fromEvent(canvasEl, 'mouseup')
      .subscribe((res: MouseEvent) => {
        console.log('saveeee', this.lines);
        this.room.canvas = this.lines;
        this.updateRoom();
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  updateRoom() {
    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
  }
}
