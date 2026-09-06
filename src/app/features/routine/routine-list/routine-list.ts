import { Component, inject } from '@angular/core';
import { StorageService } from '../../../core/services/storage';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  templateUrl: './routine-list.html',
  styleUrls: ['./routine-list.scss']
})
export class RoutineList {
  public storage = inject(StorageService);

  // جلب مصفوفة الروتينات باستخدام الـ Signal
  routines = this.storage.routines;

  onAddRoutine(event: Event, inputElement: HTMLInputElement) {
    if ((event as KeyboardEvent).key === 'Enter' && inputElement.value.trim() !== '') {
      this.storage.addRoutine({
        title: inputElement.value.trim(),
        expectedTimeInMinutes: null // يمكننا إضافة حقل للوقت لاحقاً إذا أردت
      });
      inputElement.value = '';
    }
  }

  onToggleRoutine(id: string) {
    this.storage.toggleRoutineCompletion(id);
  }

  // هذه الدالة ستستخدم في الـ HTML لمعرفة هل الروتين متاح للإنجاز الآن أم لا
  isDue(routine: any): boolean {
    return this.storage.isRoutineDue(routine);
  }

  onDeleteRoutine(id: string) {
    this.storage.deleteRoutine(id);  
  }
}