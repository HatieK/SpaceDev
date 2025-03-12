const REGEXP = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};

const ERROR_MESSAGE = {
  required: "Please enter this field",
  regexExp: "Field is not valid",
  minMax: (min, max) => `Xin vui lòng nhập từ ${min} - ${max} ký tự`,
  confirm: "Xác nhận mật khẩu sai",
};

export const validate = (rules, form) => {
  const errorObject = {};
  for (let name in rules) {
    for (let rule of rules[name]) {
      if (rule.required) {
        if (
          (typeof form[name] === "boolean" && !form[name]) ||
          (typeof form[name] !== "boolean" && !form[name]?.trim())
        ) {
          errorObject[name] = rule.message || ERROR_MESSAGE.required;
          break;
        }
      }

      if (rule.regex && form[name]) {
        let regex = rule.regex;
        if (regex in REGEXP) {
          regex = REGEXP[regex];
        } else if (!(regex instanceof RegExp)) {
          regex = new RegExp();
        }
        if (!regex.test(form[name])) {
          errorObject[name] = rule.message || ERROR_MESSAGE.regexExp;
        }
      }

      if (rule.min || rule.max) {
        if (form[name]?.length < rule.min || form[name]?.length > rule.max) {
          errorObject[name] =
            rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max);
        }
      }

      if (rule.confirm) {
        if (form[rule.confirm] !== form[name]) {
          errorObject[name] = rule.message || ERROR_MESSAGE.confirm;
        }
      }
    }
  }
  return errorObject;
};

export const required = (message) => {
  return {
    required: true,
    message,
  };
};

export const regex = (pattern, message) => {
  return {
    regex: pattern,
    message,
  };
};

export const minMax = (min, max) => {
  return {
    min,
    max,
  };
};

export const confirm = (field) => {
  return {
    confirm: field,
  };
};
