const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

export default {
  isRequired: { rule: v => !!v, msg: '%s er et krævet felt.' },
  isPhone: { rule: v => !!v.match(phoneRegex), msg: "invalid %s format"},
  isEmail: { rule: v => !!v.match(emailRegex), msg: "invalid %s format"}
}
