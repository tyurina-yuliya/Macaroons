'use strict';
window.onload = function () {

    let loader = $('.loader')
    let product = $('#product');
    let name = $('#name');
    let phone = $('#phone');
    phone.inputmask({"mask": "+375 " + "(99) 999 - 99 - 99"}); // маска ввода номера тел

    $('#submit').click(function () {
        let hasError = false; // изначально ошибки нет, поэтому тут храним false
        $('.error-input').hide(); // чтобы скрывать все инпуты при клике (т е бу виден ток текст текущ ошибки)
        $('.input').css('border-color', '#770A1DFF'); // чтобы показ изначальн цвет рамок инпутов (т е  красный бу виден ток где текущ ошибки)

        if (!product.val()) { // если в поле ничего
            product.next().show() // выводим текст ошибки error-input (след за ним)
            hasError = true; // показ текст ошибки сразу на все поля где она есть
            product.css('border-color', 'red'); // меняем цвет рамки на красный если есть ошибка
        }
        if (!name.val()) {
            name.next().show()
            hasError = true;
            name.css('border-color', 'red');
        }
        if (!phone.val()) {
            phone.next().show()
            hasError = true;
            phone.css('border-color', 'red');
        }

        if (!hasError) { // фин проверка если ошибки нет, то оправ ajax запрос (ниже)
            loader.css('display', 'flex'); // грузим лоадер при выводе алерта
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide(); // скрыв лоадер при клике ок в алерте
                    if (msg.success) {
                        $.magnificPopup.open({ // появл попапа если все поля формы заполнены (он работает по типу модального здесь)
                            items: {
                                src: '#popup-thanks'
                            },
                            type: 'inline'
                        });
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
                });
            product.val('');
            name.val('');
            phone.val('');
        }
    })
}
