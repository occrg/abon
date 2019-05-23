$(document).on('click', '.number-spinner button', function () {
	var btn = $(this),
		oldValue = btn.closest('.number-spinner').find('input').val().trim(),
		newVal = 0;

	if (btn.attr('data-dir') == 'up') {
        if(oldValue <= 19){
            newVal = parseInt(oldValue) + 1;
        } else{
            newVal = 20;
        }
	} else {
		if (oldValue >= 1) {
			newVal = parseInt(oldValue) - 1;
		} else {
			newVal = 0;
		}
	}
	btn.closest('.number-spinner').find('input').val(newVal);
    subtotal();
});
