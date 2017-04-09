'use strict';

angular.
    module('phoneList').
    component('phoneList', {
        templateUrl: 'phone-list/phone-list.template.html',
        controller: ['$scope', '$http', 'Phone',
            function PhoneListController($scope, $http, Phone){
                var self = this;
				
                self.ImagePaths = [];
                
                self.getTheFiles = function ($files) {
                    self.formdata = new FormData();
                    angular.forEach($files, function (value, key) {
                        self.formdata.append(key, value);
                    });
                    self.somefunc();
                };
                
                self.somefunc = function (){
                    var output = '<b> Файлы для загрузки: </b>';
                    
                    for (var value of self.formdata.values()) {
                        output += '<li>' + value.name + '</li>';
                    }
                    
                    document.getElementById('result').innerHTML = output;
                };

                // NOW UPLOAD THE FILES.
                self.uploadFiles = function () {
					self.loading = true;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:58621/api/FilesTransfer',
                        data: self.formdata,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).success(function(response){
                        self.ImagePaths = response.concat(self.ImagePaths);
                        document.getElementById('result').innerHTML = '';
                        self.loading = false;
                    }).error(function(response){
                        self.loading = false;
                        alert('Server error. Update page or try again later. ');
                    });
                };  
            }
        ]
});