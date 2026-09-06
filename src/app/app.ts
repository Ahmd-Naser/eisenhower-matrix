import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatrixContainer } from "./features/matrix/matrix-container/matrix-container";
import { RoutineList } from './features/routine/routine-list/routine-list';
import { TaskList } from './features/matrix/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [MatrixContainer , RoutineList ,TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eisenhower-matrix');
}
