(function(){
'use strict';
angular.module('E2EMocks',['ngMockE2E']);
 angular.module('E2EMocks').run(['$httpBackend','E2EMocksService',function($httpBackend, E2EMocksService){
   "use strict";
      var url, 
          data, 
          regex,
          e2eMockCfg = E2EMocksService.config,
          getUrls = e2eMockCfg.get,
          postUrls = e2eMockCfg.post,
          deleteUrls = e2eMockCfg.delete,
          passthruUrls = e2eMockCfg.passthru,
          i;
     
      for(url in getUrls){
         $httpBackend.whenGET(url).respond(function(method,url,headers){
             var key = getUrls[url].split('.').join('_').replace("_json",'');
             data = E2EMocksService[key];
             return data?[200,data,{}]:[404,'',{}];
         });
      }
      
      for(url in postUrls){
         $httpBackend.whenPOST(url).respond(function(method,url,headers){
             var key = postUrls[url].split('.').join('_');
             data = E2EMocksService[key];
             return data?[200,data,{}]:[404,'',{}];
         });
      }
      
      for(url in deleteUrls){
         $httpBackend.whenDELETE(url).respond(function(method,url,headers){
             var key = deleteUrls[url].split('.').join('_');
             data = E2EMocksService[key];
             return data?[200,data,{}]:[404,'',{}];
         });
      }
     
      for(i=0;i<passthruUrls.length;i++){
        regex = new RegExp(passthruUrls[i]);
        $httpBackend.whenGET(regex).passThrough();
      }
     
  }]);
})();