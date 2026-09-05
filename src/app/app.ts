import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatrixContainer } from "./features/matrix/matrix-container/matrix-container";

@Component({
  selector: 'app-root',
  imports: [MatrixContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eisenhower-matrix');
}
