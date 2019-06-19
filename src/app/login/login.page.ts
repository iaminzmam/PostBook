import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(
              private afAuth: AngularFireAuth, 
              private userservice: UserService, 
              private router: Router,
              private alertC: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertC.create({header: title, message: content, buttons: ['OK'] })
    await alert.present()
}


  goreg() {
      this.router.navigate(['/register'])
  }

  async login(){

    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + "@door.com", password)
      console.log(res.user,"successful")

      if(res.user) {
          this.userservice.setUser({username, userid: res.user.uid})
          this.router.navigate(['/tabs'])
      }

      

    } catch (error) {
          console.dir(error)
    }

  }

}
