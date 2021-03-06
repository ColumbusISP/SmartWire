import { Component, OnInit, Injectable } from '@angular/core';
import { ContentAPIService } from '../../../services/content.api.service';

@Component({

  selector: 'app-common',
  templateUrl: './common.component.html',

})

@Injectable()
export class CommonComponent implements OnInit {

  protected stContent: String[] = [];
  protected rtrnContent: String[][];
  constructor(protected contentSrv: ContentAPIService) {}

  ngOnInit() {
  }

  public getViewContent(passedContent: String[]): any {
    this.stContent = passedContent;
    console.log(passedContent);
    this.contentSrv.getContent(this.stContent.join('&')).subscribe((ndata) => {
      this.rtrnContent = this.contentSrv.parseContent(ndata);
      //console.log('Content: ' + this.rtrnContent);
    }
    )
  }
  //Static content getter function for the html
  public gSC(key: String): any {
    for (let i in this.rtrnContent) {
      if (key == this.rtrnContent[i][0]) {
        return this.rtrnContent[i][1];
      }
    }
  }    

}
