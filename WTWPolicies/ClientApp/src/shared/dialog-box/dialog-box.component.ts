import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnChanges {
  @Input() show: boolean;

  ngOnChanges() {
    console.log('shiw', this.show);
  }

}
