import Ember from 'ember';

export default Ember.Route.extend({

actions: {
  login(provider, param1, param2) {
    let authPromise;
    if (provider === 'password') {
      authPromise = this.get('session').open('firebase', {
        provider: provider,
        email: param1,
        password: param2
      });
    } else if (provider === 'custom') {
      authPromise = this.get('session').open('firebase', {
        provider: provider,
        token: param1
      });
    } else {
      authPromise = this.get('session').open('firebase', {
        provider: provider,
        redirect: param1
      });
    }

    authPromise.then((result) => {
      console.log('session.open result:', result);
      this.transitionTo('index');
  })
      .catch(err => console.warn('session.open error:', err));
  },
}
});
