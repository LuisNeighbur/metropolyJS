var property = function(zone, title, AB, valor, valorCasa) {
	return {
	zone: 'Cordon',
		title: 'Calle Magallanes',
		AB: 6,
		valor: 100,
		valorCasa: 100,
		valorHotel: function(){
			return this.valorCasa * 5; 
		}, 
		hipoteca: function(){
			return this.valor / 2;
		},
		A1: function() {
			return Math.round(this.AB * 5);
		},
		A2: function() {
			return Math.round(this.A1() * 3);
		},
		A3: function() {
			return Math.round(this.A2() * 3);
		},
		A4: function() {
			return Math.round(this.A3() * 1.481481481);
		},
		H: function() {
			return Math.round(this.A4() * 1.375);
		}
	}
}; 
module.exports = property;