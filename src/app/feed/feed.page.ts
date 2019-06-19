import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  postdoc: AngularFirestoreDocument
  posts: any = []
  heartType: string = 'heart-empty'

  constructor(public userS: UserService, public afstore: AngularFirestore, private aff: AngularFireFunctions) {
            //this.postdoc = this.afstore.doc(`posts`)
            //this.posts = this.postdoc.valueChanges()
            //console.log(this.posts)
   }

  ngOnInit() {
    //this.userS.checkUser()

  }

  toggleHeart() {
    this.heartType = this.heartType == 'heart' ? "heart-empty" : "heart"
  }



}


  