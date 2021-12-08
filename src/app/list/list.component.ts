import { Component, OnInit } from '@angular/core';
import { listType } from '../types';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  list:listType[] = []

  constructor() { }

  ngOnInit(): void { 
    // Initalize list to the list saved in local storage
    const listStr:string|null = localStorage.getItem('list')
    if(listStr) this.list = JSON.parse(listStr)
  }

  addItem(todo:string):void {
    if(todo) { // Ignore empty strings
      /* The unique id generated is a string of the current timestamp */
      this.list.push({todo, completed:false, id:Date.now().toString()})
      this.saveList()
    }
  }

  deleteItem(id:string):void {
    this.list.splice(this.getIndexById(id), 1)
    this.saveList() // Save changed list in storage
  }

  toggleComplete(id:string):void {
    this.list[this.getIndexById(id)].completed = !this.list[this.getIndexById(id)].completed
    this.saveList() // Save changed list in storage
  }

  getIndexById(id:string):number {
    return this.list.findIndex((item:listType) => item.id == id)
  }

  saveList():void {
    localStorage.setItem('list', JSON.stringify(this.list)) // Save to local storage
  }

}
