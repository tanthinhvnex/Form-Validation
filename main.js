function Validator(options) {
    function Validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // Xử lý khi người dùng blur khỏi đối tượng
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                };
                // Xử lý khi người dùng đang nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}

// Nguyên tắc của các rule:
// Khi có lỗi thì báo lỗi
// Khi hợp lệ thì không trả ra gì cả
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này";
        },
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là email";
        },
    };
};

Validator.minlength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Tối thiểu ${min} kí tự`;
        },
    };
};
