import { Injectable, signal } from '@angular/core';
import { Task, EisenhowerQuadrant } from '../models/task.model';
import { Routine } from '../models/routine.model';

@Injectable({
  providedIn: 'root' // يجعل هذه الخدمة Singleton (نسخة واحدة مشتركة في التطبيق كله)
})
export class StorageService {
  // 1. تعريف الـ Signals (إدارة الحالة)
  tasks = signal<Task[]>([]);
  routines = signal<Routine[]>([]);

  // مفاتيح الحفظ في LocalStorage
  private readonly TASKS_KEY = 'eisenhower_tasks';
  private readonly ROUTINES_KEY = 'eisenhower_routines';

  constructor() {
    this.loadData();
  }

  // ─── دوال التعامل مع الذاكرة المحلية ───

  private loadData(): void {
    const savedTasks = localStorage.getItem(this.TASKS_KEY);
    const savedRoutines = localStorage.getItem(this.ROUTINES_KEY);

    if (savedTasks) this.tasks.set(JSON.parse(savedTasks));
    if (savedRoutines) this.routines.set(JSON.parse(savedRoutines));
  }

  private saveData(): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.tasks()));
    localStorage.setItem(this.ROUTINES_KEY, JSON.stringify(this.routines()));
  }

  // ─── دوال إدارة المهام (Tasks CRUD) ───

  addTask(taskData: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID() // توليد GUID فريد للمهمة
    };
    
    // تحديث الـ Signal بإنشاء مصفوفة جديدة تحتوي المهام القديمة + الجديدة
    this.tasks.update(currentTasks => [...currentTasks, newTask]);
    this.saveData();
  }

  updateTask(updatedTask: Task): void {
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    this.saveData();
  }

  deleteTask(id: string): void {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
    this.saveData();
  }

  // ─── دوال إدارة الروتين (Routine Logic) ───

  addRoutine(routineData: Omit<Routine, 'id' | 'lastCompletedAt'>): void {
    const newRoutine: Routine = {
      ...routineData,
      id: crypto.randomUUID(),
      lastCompletedAt: null
    };
    
    this.routines.update(current => [...current, newRoutine]);
    this.saveData();
  }

  deleteRoutine(id: string): void {
    // تحديث الإشارة (Signal) بفلترة المصفوفة وإزالة الروتين الذي يحمل هذا الـ ID
    this.routines.update(current => current.filter(r => r.id !== id));
    
    // حفظ التغييرات في LocalStorage
    this.saveData(); 
  }

  toggleRoutineCompletion(id: string): void {
    this.routines.update(current => 
      current.map(r => {
        if (r.id === id) {
          // تسجيل الوقت الحالي فوراً لتصفير عداد الـ 24 ساعة
          return { ...r, lastCompletedAt: new Date().toISOString() };
        }
        return r;
      })
    );
    this.saveData();
  }

  isRoutineDue(routine: Routine): boolean {
    if (!routine.lastCompletedAt) return true; // لم تنجز من قبل أبداً

    const lastCompleted = new Date(routine.lastCompletedAt).getTime();
    const now = Date.now();
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    // الفرق بين الآن ووقت الإنجاز أكبر من 24 ساعة
    return (now - lastCompleted) >= twentyFourHoursInMs;
  }

  // ─── دوال الاستيراد والتصدير (JSON Export/Import) ───

  exportToJson(): void {
    const data = {
      tasks: this.tasks(),
      routines: this.routines()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // خدعة لإنشاء رابط مخفي والضغط عليه برمجياً لتحميل الملف
    const a = document.createElement('a');
    a.href = url;
    a.download = `eisenhower-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url); // تنظيف الذاكرة
  }

  importFromJson(file: File): void {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (parsedData.tasks) this.tasks.set(parsedData.tasks);
        if (parsedData.routines) this.routines.set(parsedData.routines);
        
        this.saveData();
      } catch (error) {
        console.error('Invalid JSON file format');
      }
    };
    
    reader.readAsText(file);
  }

  
 
}