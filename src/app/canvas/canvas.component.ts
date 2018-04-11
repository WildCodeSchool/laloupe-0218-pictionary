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


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  room: any;
  lines;

  private cx: CanvasRenderingContext2D;
  roomId: any;
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 500;
  @Input() public height = 500;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.lines = [];
    
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        for (let index = 0; index < this.room.canvas.length; index++) {
          const element = this.room.canvas[index];
          this.lines.push({ origin: element.origin, dest: element.dest });
          this.drawOnCanvas(element.origin, element.dest);
          
        }
        console.log(this.room);
      })
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

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .pairwise();
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        console.log('coucou');
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
