/*  MODULO CON CONSTANTI  */

'use strict';

var common = angular.module('CommonModule', [])

  /*  FACTORY  */

  .factory('customFactory', ['APP_CFG', 'services', '$q', function (APP_CFG, services, $q) {

    var securizer = null;
    var deferred = $q.defer();
    var promise = deferred.promise;

    //config initialization...
    services.getConfiguration().then(
      function (data, status) {
        angular.extend(APP_CFG, data.data); //unione verso APP_CFG
        securizer = new Secur(APP_CFG.defaultKK);
        deferred.resolve("OK!");
        //console.debug("Configurazioni acquisite dal server: " + angular.toJson(APP_CFG));
      });

    return {

      promise: promise,

      get: function (getter) {
        var present = localStorage[getter];
        return present ? angular.fromJson(securizer.decrypt(present)) : null;
      },
      set: function (setter, data) {
        localStorage[setter] = securizer.encrypt(angular.toJson(data || "undefined"));
      },
      getSessionStorage: function (getter) {
        var present = sessionStorage[getter];
        return present ? angular.fromJson(securizer.decrypt(present)) : null;
      },
      setSessionStorage: function (setter, data) {
        sessionStorage[setter] = securizer.encrypt(angular.toJson(data || "undefined"));
      }
    }
  }]);

var Secur = (function () {
  var kk;
  var p = {iter: 1000, ts: 128, ks: 256};

  function init(kk) {
    var self = this;
    initialize(kk);
    function initialize(pb, f) {
      var p = sjcl.misc.cachedPbkdf2(pb, {iter: 1000});
      self.kk = f ? sjcl.codec.hex.fromBits(p.key) : pb;
    }

    this.encrypt = function encrypt(text) {
      return sjcl.encrypt(self.kk, text, p, {});
    };

    this.setK = function setK(t, f) {
      initialize(t, f);
    };

    this.decrypt = function decript(ct) {
      var plaintext = null;
      try {
        plaintext = sjcl.decrypt(self.kk, ct);
      } catch (e) {
        console.log("Can't decrypt: " + e);
        error("Can't decrypt: " + e);
      }
      return plaintext;
    };

    function error(x) {
      alert(x);
    }

  }

  return init;
})();
