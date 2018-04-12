import { Player } from '../models/player';
import { Position } from '../models/position';
export class Room {
  players: Player[];
  canvas: Position[];
  turn: number;
}
