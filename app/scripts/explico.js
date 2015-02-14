function resize() {
	var h = $(window).height();
	var w = $(window).width();
	$("section, header").css({"width": w, "height": h});
}

$(window).on("load resize scroll",function(e){
	resize();
});

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
				error("Can't decrypt: " + e);
			}
			return plaintext;
		};

		function error(x) {
			showAlert(x);
		}

	}
	return init;
})();