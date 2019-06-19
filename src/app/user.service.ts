import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface user {
    username: string,
    userid: string
}

@Injectable()
export class UserService {

    private user: user

    constructor(private afAuth: AngularFireAuth, public router: Router, public alertC: AlertController)   {    }

    setUser(user: user) {
        this.user = user
    }
    checkUser() {
        if(!this.user) {
            if(this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    username: user.email.split('@')[0],
                    userid: user.uid
                })
                
            }else{
                console.log('user not logged in')
                this.router.navigate(['/login'])
            }
        }else{
            console.log('user logged')
        }
    }

    getUID( ) {
        return this.user.userid        
    }

    async presentAlert(title: string, content: string) {
        const alert = await this.alertC.create({header: title, message: content, buttons: ['OK'] })
        await alert.present()
      }

      
}