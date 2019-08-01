import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'ss-modal-image',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

    @ViewChild('myModal', {static: false}) imageModal: ElementRef;

    @Input() public display: any;
    @Input() public src: any;
    @Input() public innerHTML: any;

    constructor() {}

    ngOnInit() {
    }

    open() {
      debugger;
      this.imageModal.nativeElement.style.display='block'; 
      this.imageModal.nativeElement.children[1].src = this.src;
      this.imageModal.nativeElement.children[2].innerHTML = this.innerHTML;
    }

}
