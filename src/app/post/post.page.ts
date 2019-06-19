import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  imgURL: string
  desc: string = ''
  activeEffect: string = ''
  filters = {original: '', adaris: '-/filter/adaris/-100/', carris: '-/filter/carris/-100/',
             misiara: '-/filter/misiara/-100/', vevera: '-/filter/vevera/-100/'}



  @ViewChild('fileButton') fileButton

  constructor(
              public http: Http,
              public afstore: AngularFirestore,
              public userS: UserService
             ) { }

  ngOnInit() {
    this.userS.checkUser()

  }


  addFile() {
      this.fileButton.nativeElement.click()
       
  }

  createPost() {
      const image = this.imgURL
      const desc = this.desc
      const filter = this.activeEffect
      const time = '22-May'

      this.afstore.doc(`posts/${image}`).set({image,desc,filter,time}).then(event => {
          this.afstore.doc(`userdetails/${this.userS.getUID()}`).update({PostId: firestore.FieldValue.arrayUnion(image)})
      })
      this.userS.presentAlert('Success!', 'Your Post is Live')
  }

  setFilter(effect: string) {
      this.activeEffect = this.filters[effect]
  }

  uploadPost(event) {

      const files = event.target.files

      const data = new FormData()
      data.append('file', files[0])
      data.append('UPLOADCARE_STORE', '1')
      data.append('UPLOADCARE_PUB_KEY', '6d145d0c62a427cf2a4b')
      

      this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
          console.log(event)
          this.imgURL = event.json().file
      })

  }


}
