import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/app/models/Todo.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  inputTodo: string = "";
  filterList: string = "Todos";

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorage.isKeySet('todos')) {
      this.todos = JSON.parse(this.localStorage.getData('todos') || '{}')
    } else {
      this.todos = []
    }
  }

  setFilterList(event: any) {
    switch (event.tab.textLabel) {
      case 'Todos':
        this.filterList = 'Todos'
        break;
      case 'Ativos':
        this.filterList = 'Ativos'
        break;
      case 'Completos':
        this.filterList = 'Completos'
        break;
      default:
        this.filterList = 'Todos'
        break;
    }
  }
}
