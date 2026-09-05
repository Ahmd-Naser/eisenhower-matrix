import { Component, computed, inject } from '@angular/core';
import { StorageService } from '../../../core/services/storage';
import { EisenhowerQuadrant } from '../../../core/models/task.model';
import { Quadrant } from "../quadrant/quadrant";

@Component({
  imports: [Quadrant],
  selector: 'app-matrix-container',
  styleUrl: './matrix-container.scss',
  templateUrl: './matrix-container.html',
})
export class MatrixContainer {
  private storage = inject(StorageService);

  // قراءة كل المهام من الخدمة
  allTasks = this.storage.tasks;

  // يمكنك استخدام computed لفلترة المهام لكل مربع برمجياً (هذه ميزة قوية جداً في الـ Signals)
  doFirstTasks = computed(() => this.allTasks().filter(t => t.quadrant === EisenhowerQuadrant.DoFirst && !t.isCompleted));
  scheduleTasks = computed(() => this.allTasks().filter(t => t.quadrant === EisenhowerQuadrant.Schedule && !t.isCompleted));
  delegateTasks = computed(() => this.allTasks().filter(t => t.quadrant === EisenhowerQuadrant.Delegate && !t.isCompleted));
  eliminateTasks = computed(() => this.allTasks().filter(t => t.quadrant === EisenhowerQuadrant.Eliminate && !t.isCompleted));

  onTaskAdded(title: string, quadrant: EisenhowerQuadrant) {
    this.storage.addTask({
      title: title,
      expectedTimeInMinutes: null,
      quadrant: quadrant,
      isCompleted: false
    });
  }

  onTaskToggled(taskId: string) {
    const task = this.allTasks().find(t => t.id === taskId);
    if (task) {
      this.storage.updateTask({ ...task, isCompleted: !task.isCompleted });
    }
  }
}
