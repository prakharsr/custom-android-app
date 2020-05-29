import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public task: Task;

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private navCtrl: NavController) { 

    this.task = {
      id: '',
      title: '',
      content: ''
    };

  }

  ngOnInit() {

    let taskId = this.route.snapshot.paramMap.get('id');

    if(this.tasksService.loaded){
      this.task = this.tasksService.getTask(taskId)
    } else {
      this.tasksService.load().then(() => {
        this.task = this.tasksService.getTask(taskId)
      });
    }
  }

  taskChanged(){
    this.tasksService.save();
  }

  deleteTask(){
    this.tasksService.deleteTask(this.task);
    this.navCtrl.navigateBack('/home');
  }

}