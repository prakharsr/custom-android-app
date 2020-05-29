import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TasksService } from '../../services/tasks.service' 

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(public tasksService: TasksService, private alertCtrl: AlertController, private navCtrl: NavController) { }
  ngOnInit(){
    this.tasksService.load();
  }

  addTask(){

    this.alertCtrl.create({
      header: 'New Task',
      message: 'What should the title of this Task be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.tasksService.createTask(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

}