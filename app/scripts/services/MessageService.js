(function(angular) {
  'use strict';

  angular.module('angularJsFirebaseApp')
    .service('MessageService', function (FBURL) {
      var messageRef = new Firebase(FBURL).child('messages');
      return {
        childAdded: function childAdded(limitNumber, cb) {

          messageRef.limitToLast(limitNumber).on('child_added', function(snapshot) {
            var val = snapshot.val();
            cb.call(this, {
              user: val.user,
              text: val.text,
              name: snapshot.key()
            });
          });
        },
        add: function addMessage(message){
          messageRef.push(message);
        },
        off: function turnMessagesOff(){
          messageRef.off();
        }
      }
    });

})(window.angular);
