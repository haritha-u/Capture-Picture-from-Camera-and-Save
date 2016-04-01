// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller("MyCtrl", function($scope, $cordovaCamera, $cordovaFile){
  $scope.captureImage = function(){
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 1024,
      targetHeight: 768,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(sourcePath) {
      console.log('image', sourcePath);  
      $scope.img = sourcePath;   

       var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

      console.log("Copying : " + sourceDirectory + sourceFileName);
      //Note: if you want store image in internal storage of mobile use "cordova.file.externalApplicationStorageDirectory" directory as destination directory
      // if you store image in device storage you can see the file in device stoarage
      // Note: if you want store the image in internal storage of application use "cordova.file.dataDirectory" directory as destination directory
      $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName)
      .then(function(success) {
         var fileName = cordova.file.dataDirectory + sourceFileName;
         console.log(fileName);
         alert('copy success');
      }, function(error) {
         console.dir(error);
         alert('error in copy');
      });                     
    }, function(err) {
      // error
      console.log(err);
    });
  }
})
