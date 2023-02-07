import { Component, Input, SimpleChanges } from '@angular/core';
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

  anyCompleted: boolean;
  allDeleted: boolean;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.updateCompleted();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changesFilterType = changes['filterType']

    if (changesFilterType.currentValue !== changesFilterType.previousValue) {
      this.updateCompleted();
    }
  }
  
  toogleDone(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;      
      return v;
    })

    this.localStorage.saveData('todos', JSON.stringify(this.todos));
    this.updateCompleted();
  }

  deleteTodo(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.deleted = true;
    })
    
    this.localStorage.saveData('todos', JSON.stringify(this.todos));
    this.updateCompleted();
  }

  deleteAll() {
    this.todos.map((v) => {
      if (v.completed) {
        v.deleted = true;
      }
    })

    this.localStorage.saveData('todos', JSON.stringify(this.todos));
    this.updateCompleted();
  }

  updateCompleted() {
    this.anyCompleted = this.todos.filter(v => {return v.completed}).some((v) => {
      return v.deleted == false
    })

    this.allDeleted = false;

    if(this.todos.filter(v => {return v.deleted}).length == this.todos.length)
      this.allDeleted = true;    
  }
}
