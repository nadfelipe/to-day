import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent {
  @Input() todos: Todo[] = []
  @Input() filterType: string = "";

  constructor(private localStorage: LocalStorageService) {}
  
  toogleDone(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;

      this.localStorage.saveData('todos', JSON.stringify(this.todos))
      return v;
    })
  }

  deleteTodo(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.deleted = true

      this.localStorage.saveData('todos', JSON.stringify(this.todos))
    })
  }
}
