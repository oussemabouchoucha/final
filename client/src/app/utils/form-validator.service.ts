// Collection of reusable RegExps
export const regExps: { [key: string]: RegExp } = {
  str: /^[a-zA-Z]/, // Validates only strings
  num: /^\d+$/, // Validates only numbers
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/ // Validates email
};

// Collection of reusable error messages
export const errorMessages: { [key: string]: string } = {
  name: 'Required and only strings',
  phone: 'Required and only numbers',
  email: 'Please enter a valid email address.',
};
