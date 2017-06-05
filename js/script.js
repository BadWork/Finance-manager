$('.btn-addPayment').on('click', function () {
	financeMngr.addPayment();
	financeMngr.showRecent();
})

function Payment() {
	this.sum = 0;
	this.category = "";
	this.date = new Date();
	this.sign = "+";
	this.description = "";
	this.currency = "BYN";
}

var financeMngr = {
	balance: 0,
	payments: [],
	categories: [],
	dates: [],
	addPayment: function () {
		var payment = new Payment();
		payment.sum = +($(".input-addPayment-sum").val());
		payment.category = $(".input-addPayment-category").val();
		payment.date = $('.date').datepicker('getDate');
		payment.sign = $('.btn-type').find('.active').find('input').val();
		payment.description = $(".input-description").val();
		this.payments.unshift(payment);
		this.payments.sort(function (a, b) {
			if (new Date(b.date).getTime() != new Date(a.date).getTime()){
				return new Date(b.date).getTime() - new Date(a.date).getTime()				
			}
		});
		if (payment.sign == "+") {
			this.balance += +payment.sum;
		} else {
			this.balance -= +payment.sum;
		}

		console.log(payment.date);
	},
	showRecent: function () {
		var recentAmount = 8;
		$('.lastPayments-list').text('');
		if (this.payments.length < recentAmount) {
			var recentAmount = this.payments.length;
		}
		for (var i = 0; i < recentAmount; i++) {
			var recent = $('.lastPayments-list');
			recent.append('<li><span class="sign"></span><span class="sum"></span><span class="currency"></span><span class="category pull-right"></span><span class="glyphicon glyphicon-tag pull-right" aria-hidden="true"></span></li>');
			recent.find('.sign').last().text(this.payments[i].sign);
			recent.find('.sum').last().text(this.payments[i].sum);
			recent.find('.currency').last().text(this.payments[i].currency);
			recent.find('.category').last().text(this.payments[i].category);
		}
		$('.balance').text(this.balance);
	}
}
