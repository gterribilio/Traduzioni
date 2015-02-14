/*  MODULO CON CONSTANTI  */
angular.module('ConfigModule', [])
.constant('APP_CFG','strasburgo');

var common = angular.module('CommonModule', ['ConfigModule'])

/*  FACTORY  */

.factory('customFactory', ['APP_CFG', function(APP_CFG) {
	var securizer = new Secur(APP_CFG);
	return {
		login: function (pp){
			securizer.setK(pp, true);
		},
		logout: function() {
			localStorage.clear();
			securizer.setK(APP_CFG);
		},
		get: function(getter) {
			var present = localStorage[getter];
			return present ? angular.fromJson(securizer.decrypt(present)) : null;
		},
		set: function(setter,data) {
			localStorage[setter] = securizer.encrypt(angular.toJson(data || "undefined"));
		}
	}
}]);