$(document).ready(function () {
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.sp_celphones').mask(SPMaskBehavior, spOptions);
});

function configContractFormRequest() {

    var contractFormSelector = '#contractModalForm';

    $(contractFormSelector)
        .submit(function (event) {
            event.preventDefault();

            console.log(1)

            var form = document.querySelector(contractFormSelector);
            var $form = $(this);
            var isValidForm = form.checkValidity();

            if (!isValidForm)
                return;

            var url = window.location.href;
            var queryIndex = url.search(/\?/g);
            var urlOriginalParams = '';

            if (queryIndex > -1)
                urlOriginalParams = '&' + url.substring(queryIndex + 1);


            var extraQuestions = {
                nome: $form.find('input[name=fullName]').val(),
                email: $form.find('input[name=email]').val(),
                telefone: $form.find('input[name=phone]').val()

            };

            extraQuestions.utm_source = getUrlParam('utm_source', '');
            extraQuestions.utm_medium = getUrlParam('utm_medium', '');
            extraQuestions.utm_campaign = getUrlParam('utm_campaign', '');
            extraQuestions.utm_content = getUrlParam('utm_content', '');
            extraQuestions.gclid = getUrlParam('gclid', '');

            //var urlOnMe = $form.attr('action');
            var urlOnMe = 'http://cotacaohml.onmeseguros.com.br';
            
            var settings = {
                "url": urlOnMe + "/seguro/preCotacao",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify(extraQuestions),
            };

            $.ajax(settings)
                .done(function (response) {

                    if (urlOriginalParams) {

                        window.location = response + urlOriginalParams;

                    } else {

                        window.location = response;

                    }

                })
                .fail(function (error) {

                    console.log(error);
                    
                });

        });
}


function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
        var result = urlparameter.split("#");
        urlparameter = result[0];
    }
    return urlparameter;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function startBlipChat() {
    new BlipChat().withAppKey('b25tZXNpdGVodW1hbmJvdDozOTIwY2YzMi0zMGU4LTQ3YTktYjQ3Ni1kZjk1MzE4MDYzMGY=').withButton({
        "color": "#b6205a"
    }).build();
}