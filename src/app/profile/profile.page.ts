import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})


export class ProfilePage implements OnInit {

  userdoc: AngularFirestoreDocument
  username
  profilepic: string = 'assets/icon/profileavatar.svg'
  posts: any =[]
  gender: string
  email
  sub
 // picURL: string

  @ViewChild('fileButton') fileButton
  
  constructor(private afAuth: AngularFireAuth, private userS: UserService, private http: Http,
            private afstore: AngularFirestore) {  

              this.userdoc = afstore.doc(`userdetails/${userS.getUID()}`)               
              this.sub = this.userdoc.valueChanges().subscribe(event => {
                        console.log(event)
                        this.username = event['username']
                        this.posts = event['PostId']
                        this.gender = event['Gender']
                        this.email = event['Email']
                        if(event['ProfilePic'] !== '') { this.profilepic = 'https://ucarecdn.com/' + event['ProfilePic'] + '/' }
              })
              
   }


  ngOnDestroy() {
      this.sub.unsubscribe()
  }

  ngOnInit() {
    this.userS.checkUser()
    

  }

  


  uploadProfile() {
      this.fileButton.nativeElement.click()
  }

  

  changeProfile(event) {
      const file = event.target.files
      const data = new FormData()

      data.append('file', file[0])
      data.append('UPLOADCARE_STORE', '1')
      data.append('UPLOADCARE_PUB_KEY', '6d145d0c62a427cf2a4b')

      this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
          console.log(event)
          const pic = event.json().file
          this.afstore.doc(`userdetails/${this.userS.getUID()}`).update({ProfilePic: pic}).then(event2 =>{
            console.log(event2)
            this.profilepic = 'https://ucarecdn.com/' + pic + '/'
          })
          
          console.log('success saved')
      })


  }


}
