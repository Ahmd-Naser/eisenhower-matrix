import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';


@Component({
  imports: [],
  selector: 'app-quadrant',
  styleUrl: './quadrant.scss',
  templateUrl: './quadrant.html',
})
export class Quadrant {
  title = input.required<string>();
  tasks = input.required<Task[]>();
  quadrantClass = input.required<string>(); // q1, q2, q3, q4 لتحديد اللون

  // إرسال حدث للـ Container عند كتابة مهمة جديدة
  taskAdded = output<string>();
  taskToggled = output<string>();

  onAddTask(event: Event, inputElement: HTMLInputElement) {
    // التأكد من أن المستخدم ضغط على زر Enter
    if ((event as KeyboardEvent).key === 'Enter' && inputElement.value.trim() !== '') {
      this.taskAdded.emit(inputElement.value.trim());
      inputElement.value = ''; // تفريغ الحقل بعد الإضافة
    }
  }

}