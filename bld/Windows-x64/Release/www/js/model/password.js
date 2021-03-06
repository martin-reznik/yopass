﻿function Password() {

    var __self__ = this;

    this._fields = {};
    this._defaultFields = ['title', 'username', 'password']

    this.addField = function (name) {
        __self__._fields[name] = '';
    }

    this.setValue = function (field, value) {
        __self__._fields[field] = value;
    }

    this.getTitle = function () {
        return __self__._fields['title'];
    }

    $.each(__self__._defaultFields, function (key, item) {
        __self__.addField(item);
    });

    this.dict = function () {
        return __self__._fields;
    };
}

Password.fromDict = function (dict) {
    p = new Password();
    p._fields = dict;
    return p;
}

Password.flags = {
    lowercase : 1,
    uppercase : 2,
    numbers   : 4,
    special   : 8,
    all: function () {
        return Password.flags.lowercase | Password.flags.uppercase | Password.flags.numbers | Password.flags.special;
    },
    noSpecial: function () {
        return Password.flags.lowercase | Password.flags.uppercase | Password.flags.numbers;
    },
    alnum: function () {
        return Password.flags.uppercase | Password.flags.numbers;
    }
};

Password.generate = function (options) {
    var lowercase = 'abcdefghijklmnopqrstuvwxyz';
    var uppercase = lowercase.toUpperCase();
    var numbers = '0123456789';
    var special = '.-,!?<>\\/{}()_=+*%@&|#';

    var defaultOptions = { len: 15, flags: Password.flags.all(), safe: false };

    if (typeof options == 'undefined') {
        options = defaultOptions;
    } else {
        $.each(defaultOptions, function (key, value) {
            if (typeof options[key] == 'undefined') {
                options[key] = value;
            }
        });
    }

    var chars = '';
    chars += options.flags & Password.flags.lowercase ? lowercase : '';
    chars += options.flags & Password.flags.lowercase ? uppercase : '';
    chars += options.flags & Password.flags.numbers ? numbers : '';
    chars += options.flags & Password.flags.special ? special : '';
    if (options.safe) {
        chars = chars.replace(/0|O|o|I|l|1|\||S|5|s/g, '');
    }

    var password = '';
    for (var i = 0; i < options.len; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
};