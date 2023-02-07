import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Input() todos: Todo[] = []
  inputTodo: string = "";

  constructor(private localStorage: LocalStorageService) {}

  addTodo(el: HTMLElement) {
    if (this.inputTodo !== "") {
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        deleted: false
      })

      this.localStorage.saveData('todos', JSON.stringify(this.todos))

      this.inputTodo = "";
      el.focus();
    }
  }
}
