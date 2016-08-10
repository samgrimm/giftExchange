import Ember from 'ember';
//import config from '../../config/environment';
//import FirebaseAdapter from 'emberfire/adapters/firebase';

export default Ember.Route.extend({
  beforeModel() {
    this.get('session').fetch().catch((error) => {
      console.log(error);
    });
  },
  firebaseApp: Ember.inject.service(),
  actions: {
    signup() {
      var email = this.controller.get('email');
      var pass = this.controller.get('password');
      const auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, pass).then((userResponse) => {
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email
        });
        user.save().then(() => {
          this.transitionTo('login');
        }).catch(err => console.warn('was not able to save: ', err));
      });
    }
}
});
