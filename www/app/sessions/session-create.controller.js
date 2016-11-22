angular.module('starter')
  .controller('SessionCreateCtrl',function($state ,$cordovaOauth, $scope, $rootScope, $ionicSlideBoxDelegate){

    this.loginwithFacebook = function(){
      console.log("clicked");
      $cordovaOauth.facebook("684059831775645", ["email"]).then(function(result) {
        console.log(JSON.stringify(result));
        //alert("Auth Success..!!"+result);
        $state.go('sessionDetail', {access_token: result.access_token});
      }, function(error) {
        alert("Auth Failed..!!"+error);
      });
    };

    $scope.sliderData = [ ];
    $scope.dummySlide = { dummy: 0};
    $scope.defaultSlideIndices = [ -1, 0, 1];
    $scope.defaultSlides = [ { dummy: 0}, { dummy: 0}, { dummy: 0} ];
    $scope.circularSlides = [];
    $scope.direction = 0;
    $scope.gHead = 0;
    $scope.gTail = 0;
    $scope.currIndex = 0;
    $scope.lHead = 0;
    $scope.lTail = 0;


    var makeSlide = function(pSlideIndex){
      return {
        title: sprintf('Slide %d', pSlideIndex),
        data: {
          text: sprintf('text for slide %d', pSlideIndex)
        },
        slideIndex: pSlideIndex
      };
    }

    $scope.initSlides = function(){
      for (var i = 0; i < 10; i++){
        var slide = {
          title: sprintf('Slide %d', i),
          data: {
            text: sprintf('text for slide %d', i)
          },
          slideIndex: i,
        };
        $scope.sliderData.push(slide);
      }
    }

    $scope.showDefaultSlides = function(){
      var defaultIndex = 1;
      var previousIndex = (defaultIndex === 0) ? 2 : defaultIndex - 1;
      var nextIndex = (defaultIndex === 2) ? 0 : defaultIndex + 1;
      console.log(sprintf('$scope.showDefaultSlides: defaultIndex: %d; previousIndex: %d; nextIndex: %d', defaultIndex, previousIndex, nextIndex));
      angular.copy($scope.sliderData[1], $scope.defaultSlides[defaultIndex]);
      angular.copy($scope.sliderData[0], $scope.defaultSlides[previousIndex]);
      angular.copy($scope.sliderData[2], $scope.defaultSlides[nextIndex]);
      $scope.direction = 0;
      $scope.gHead = 0;
      $scope.gTail = $scope.sliderData.length - 1;
      $scope.circularSlides = angular.copy($scope.defaultSlides);
      $scope.lHead = $scope.circularSlides[0].slideIndex;
      $scope.lTail = $scope.circularSlides[$scope.circularSlides.length - 1].slideIndex;
    }
    //
    $scope.initSlides();
    $scope.showDefaultSlides();

    //
    $scope.swiperOptions = {
      loop: true,
      grabCursor: true,
      pagination: '.custom-swiper-pagination',
      paginationHide: false,
      paginationClickable: false,
      direction: 'horizontal',
      spaceBetween: 50,
      speed: 100,
      initialSlide: 1,
      runCallbacksOnInit : false,
      onInit: function(swiper){
        console.log(sprintf('onInit: Got the swiper. Active Index: %d', swiper.activeIndex - 1));
        $scope.currIndex = swiper.activeIndex - 1;
      },
      onTransitionStart : function(swiper){
        var curr = swiper.activeIndex - 1;
        var prev = (swiper.previousIndex - 1 < 0) ? 0 : swiper.previousIndex - 1;

        var whichDirection = (curr > prev) ? 1 : -1;
        console.log(sprintf('onTransitionStart: Active Index: %d; Previous Index: %d; direction: %d', curr, prev, whichDirection));
      },
      onSlideChangeEnd : function(swiper){
        var curr = swiper.activeIndex - 1;
        var prev = (swiper.previousIndex - 1 < 0) ? 0 : swiper.previousIndex - 1;
        var whichDirection = (curr > prev) ? 1 : -1;
        console.log(sprintf('onSlideChangeEnd: Active Index: %d; Previous Index: %d; Direction: %d ', curr, prev, whichDirection));
      },
    };
    $scope.createSlide = function(pNewDirection, pOldDirection){

      var head = 0;
      if (pNewDirection === 1){
        $scope.lTail = pOldDirection < 0 ? $scope.lHead + 3 : $scope.lTail + 1;
      }else{
        $scope.lHead = pOldDirection > 0 ? $scope.lTail - 3 : $scope.lHead - 1;
      }
      var slideIndex = (pNewDirection === 1) ? $scope.lTail : $scope.lHead;
      console.log(sprintf('createSlide: head: %d; tail: %d; slideIndex: %d', $scope.lHead, $scope.lTail, slideIndex));

      /*if ($scope.defaultSlideIndices.indexOf(slideIndex) !== -1){
       return  $scope.defaultSlides[$scope.defaultSlideIndices.indexOf(slideIndex)];
       }*/
      console.log(sprintf('createSlide: slideIndex: %d', slideIndex));
      return $scope.sliderData[slideIndex];
    }

    $scope.repeatDone = function() {
      console.log('Repeat done!');
    };
  });