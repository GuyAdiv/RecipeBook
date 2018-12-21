import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
    selector : 'app-message-page',
    templateUrl: './message-page.component.html',
    styleUrls : ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit{

    pageMessage:string;

    constructor(private route:ActivatedRoute)
    {

    }

    ngOnInit()
    {
        this.route.data.subscribe(
            (data:Data) => {
                this.pageMessage = data['message'];
            }
        )
    }
}