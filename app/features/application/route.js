import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.get('session').fetch().catch((error) => {
      console.log(error);
    });
  },
  actions: {
    logout(){
      this.get('session').close();
    }
  }
});
