import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""
  

  constructor(
              public afauth: AngularFireAuth, 
              private userService: UserService, 
              private afstore: AngularFirestore,
              public alertC: AlertController,
              private router: Router
              ) { }

  ngOnInit() {
  }


  async presentAlert(title: string, content: string) {
    const alert = await this.alertC.create({header: title, message: content, buttons: ['OK'] })
    await alert.present()
  }

  gologin() {
    this.router.navigate(['/login'])
  }

  async register(){
      const { username, password, cpassword } = this
      if(password != cpassword) {
          return console.log('Password do not Match')
      }

      try {
          const PostId = []
          const Email = username + "door.com"
          const res = await this.afauth.auth.createUserWithEmailAndPassword(username + "@door.com", password)
          console.log(res, 'successful')
          this.userService.setUser({username, userid: res.user.uid})

          this.afstore.doc(`userdetails/${res.user.uid}`)
          .set({username, Email, Gender: '', ProfilePic: '', PostId})   //storing info to database

          this.presentAlert('Success', 'You are registerd!')
          this.router.navigate(['/tabs/profile'])


      } catch (error) {
          return console.dir(error)  
      }


  }

  

}
