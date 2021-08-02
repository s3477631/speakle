import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {CameraPreview, CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
import {ModalController} from '@ionic/angular';
import {PopoverComponent} from '../popover-component/popover-component.component';

@Component({
    selector: 'app-explore-container',
    templateUrl: './explore-container.component.html',
    styleUrls: ['./explore-container.component.scss'],
    animations: [
        trigger('cardFlip', [
            state('default', style({
                transform: 'none'
            })),
            state('flipped', style({
                transform: 'rotateY(180deg)'
            })),
            transition('default => flipped', [
                animate('400ms')
            ]),
            transition('flipped => default', [
                animate('200ms')
            ])
        ])
    ]
})
export class ExploreContainerComponent implements OnInit {
    data = {
        state: 'default'
    };
    timer = 0;
    cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height - 300,
        camera: 'front',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
        alpha: 1
    };
    flip = false;
    quote = 'it is better to have loved and lost, than to never have loved at all';
    quoteChinese = 'ài hé shī qù zǒng bǐ cóng wèi ài guò hǎo';
    author = 'devin reeks';

    constructor(
        private cameraPreview: CameraPreview,
        public popoverController: ModalController,
        private ref: ChangeDetectorRef,
        private httpClient: HttpClient
    ) {
    }


    ngOnInit() {
        this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
            (res) => {
                console.log(res);
            },
            (err) => {
                console.log(err);
            });
        // this.httpClient.get('/quote').subscribe(result => {
        //     if (result) {
        //         console.log(result);
        //         this.quote = result[0]['q'];
        //         this.author = result[0]['a'];
        // const translate = [
        //     {Text: `${this.quote}`}
        // ];
        // const httpHeaders: HttpHeaders = new HttpHeaders({
        //     'Ocp-Apim-Subscription-Key': '0be28609a81142b48a46db9a4b37a28c',
        //     'Content-Type': 'application/json; charset=UTF-8',
        //     'Ocp-Apim-Subscription-Region': 'eastus'
        // });
        // this.httpClient.post('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-Hans&toScript=Latn',
        //     translate,
        //     {headers: httpHeaders, observe: 'response'}).subscribe(response => {
        //     console.log(response);
        //     return response;
        // }, err => {
        //     throw err;
        // });
        // } else {
        //     this.quote = 'quote is loading';
        // }
        // });
    }

    recordVideo() {
        const opt = {
            cameraDirection: this.cameraPreview.CAMERA_DIRECTION.BACK,
            width: (window.screen.width / 2),
            height: (window.screen.height / 2),
            quality: 60,
            withFlash: false
        };

        // tslint:disable-next-line:only-arrow-functions
        this.cameraPreview.startRecordVideo(opt);
        setInterval(() => {
            this.timer++;
            if (this.timer === 20) {
                this.stopVideo();
                // this.presentPopover('filess');
            }
        }, 1000);

    }

    stopVideo() {
        this.cameraPreview.stopRecordVideo().then((filePath) => {
            this.cameraPreview.stopCamera().then(() => {
                        this.presentPopover(filePath).then(() => {
                        });
                // this.presentPopover(filePath).then(() => {});
            });
        });
    }

    async presentPopover(filePath) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                pathway: filePath
            }
        });
        return await popover.present();
    }

    startCameraAbove() {
        // this.cameraPreview.startRecordVideo()
        this.flip = !this.flip;
        if (this.data.state === 'default') {
            this.recordVideo();
            this.data.state = 'flipped';
        } else {
            // this.cameraPreview.startRecordVideo().then()
            this.data.state = 'default';
        }
        // start camera
        // const translate = [
        //     {Text: `${this.quote}`}
        // ];
        // const httpHeaders: HttpHeaders = new HttpHeaders({
        //     'Ocp-Apim-Subscription-Key': '0be28609a81142b48a46db9a4b37a28c',
        //     'Content-Type': 'application/json; charset=UTF-8',
        //     'Ocp-Apim-Subscription-Region': 'eastus'
        // });
        // this.httpClient.post('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-Hans&toScript=Latn',
        //     translate,
        //     {headers: httpHeaders, observe: 'response'}).subscribe(response => {
        //     return response;
        // }, err => {
        //     throw err;
        // });

        // this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        //     (res) => {
        //         console.log(res);
        //     },
        //     (err) => {
        //         console.log(err);
        //     });
    }
}
