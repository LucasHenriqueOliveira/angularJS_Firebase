(function(angular) {
  'use strict';

  angular.module('angularJsFirebaseApp')
    .service('MessageService', function (FBURL, $q) {
      var messageRef = new Firebase(FBURL).child('messages');
      return {
        childAdded: function childAdded(limitNumber, cb) {

          messageRef.startAt().limitToFirst(limitNumber).on('child_added', function(snapshot) {
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
        },
        
        pageNext: function pageNext(name, numberOfItems){
          var deferred = $q.defer();
          var messages = [];

          messageRef.startAt(null, name).limitToFirst(numberOfItems).once('value', function(snapshot) {
            snapshot.forEach(function(snapItem) {
              var itemVal = snapItem.val();
              itemVal.name = snapItem.key();
              messages.push(itemVal);
            });
            deferred.resolve(messages);
          });

          return deferred.promise;
        },

        pageBack: function pageBack(name, numberOfItems){
          var deferred = $q.defer();
          var messages = [];

          messageRef.endAt(null, name).limitToFirst(numberOfItems).once('value', function(snapshot) {
            snapshot.forEach(function(snapItem) {
              var itemVal = snapItem.val();
              itemVal.name = snapItem.key();
              messages.push(itemVal);
            });
            deferred.resolve(messages);
          });

          return deferred.promise;
        }
      }
    });

})(window.angular);
