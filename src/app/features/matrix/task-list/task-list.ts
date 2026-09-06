import { Component, inject, computed } from '@angular/core';
import { StorageService } from '../../../core/services/storage';
import { EisenhowerQuadrant } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList {
  private storage = inject(StorageService);
  
  // جلب المهام غير المنجزة فقط
  sortedTasks = computed(() => {
    // نأخذ نسخة من المصفوفة لترتيبها حتى لا نغير الإشارة الأصلية
    const tasks = [...this.storage.tasks()];
    return tasks.sort((a, b) => Number(a.quadrant) - Number(b.quadrant));
  });

  onDelete(id: string) {
    this.storage.deleteTask(id);
  }

  onToggle(id: string) {
    const task = this.storage.tasks().find(t => t.id === id);
    if (task) {
      this.storage.updateTask({ ...task, isCompleted: !task.isCompleted });
    }
  }

  // تحديد اسم المربع للـ Badge
  getQuadrantName(q: EisenhowerQuadrant): string {
    switch(Number(q)) {
      case 1: return 'Do First';
      case 2: return 'Schedule';
      case 3: return 'Delegate';
      case 4: return 'Eliminate';
      default: return '';
    }
  }

  // تحديد كلاس اللون للـ Badge
  getQuadrantClass(q: EisenhowerQuadrant): string {
    return 'q' + q + '-badge';
  }
}