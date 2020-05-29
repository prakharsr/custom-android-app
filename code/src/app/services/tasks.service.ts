import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks: Task[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { 

  }

  load(): Promise<boolean> {

    return new Promise((resolve) => {

      this.storage.get('tasks').then((tasks) => {
  
        if(tasks != null){
          this.tasks = tasks;
        }
  
        this.loaded = true;
        resolve(true);

      });

    });
    
  }

  save(): void {
    this.storage.set('tasks', this.tasks);
  }

  getTask(id): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(title): void {

    let id = Math.max(...this.tasks.map(task => parseInt(task.id)), 0) + 1;

    this.tasks.push({
      id: id.toString(),
      title: title,
      content: ''
    });

    this.save();

  }

  deleteTask(task): void {

    let index = this.tasks.indexOf(task);

    if(index > -1){
      this.tasks.splice(index, 1);
      this.save();
    }

  }

}