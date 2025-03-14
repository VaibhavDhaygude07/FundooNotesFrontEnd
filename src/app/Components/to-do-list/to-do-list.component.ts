import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  standalone: false,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

  newTask: string = '';
  tasks: { id: number; title: string; isEditing: boolean }[] = [];
  nextId: number = 1;

  ngOnInit() {
    this.loadTasks(); 
  }


  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    
    }
  }


  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: this.nextId++,
        title: this.newTask,
        isEditing: false,
      });
      this.newTask = ''; 
      this.saveTasks();
    }
  }

  
  enableEdit(task: any) {
    task.isEditing = true;
  }


  updateTask(task: any) {
    if (task.title.trim()) {
      task.isEditing = false;
      this.saveTasks(); 
    } else {
      alert('Task cannot be empty!');
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks(); 
  }
}


  

