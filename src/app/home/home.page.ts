import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodolistService } from '../shared/services/todolist.service';
import { ModalController } from '@ionic/angular';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomePage implements OnInit {
  todoListArray: any = [];

  newTask: string = '';
  updateTask: string = '';

  constructor(
    private todoListService: TodolistService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.todoListService.getTodoList().subscribe({
      next: (response) => {
        this.todoListArray = response;
      },
    });
  }

  addTask(task: string) {
    this.todoListService.createTask(task).subscribe({
      next: (response) => {
        this.reloadPage();
      },
    });
  }

  changeTask(id: number, task: string) {
    this.todoListService.updateTask(id, task).subscribe({
      next: (response) => {
        this.reloadPage();
      },
    });
  }

  removeTask(id: number) {
    this.todoListService.deleteTask(id).subscribe({
      next: (response) => {
        this.reloadPage();
      },
    });
  }

  async openModal(id: number) {
    const modal = await this.modalCtrl.create({
      component: UpdateModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.updateTask = data;
      this.changeTask(id, this.updateTask);
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
