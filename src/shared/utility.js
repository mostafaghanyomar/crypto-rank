export const HOME_PAGE_PATH = "/action-board";
export const AUTH_PATH = "/";
export const COOKIE_NAME = "vis";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const isValidValue = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return isValid;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.passwordRepeat) {
    isValid = value === rules.passwordRepeat;
  }

  if (rules.isNumeric) {
    const testValue = value.replaceAll('.','');
    const pattern = /^\d+$/;
    isValid = pattern.test(testValue) && isValid;
  }

  if (rules.min) {
    isValid = Number.parseFloat(value) >= rules.min && isValid;
  }

  return isValid;
};
