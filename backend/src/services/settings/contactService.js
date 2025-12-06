const BaseService = require('../../helpers/baseService');
const contactModel = require('../../models/settings/contactModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class ContactService extends BaseService {
  constructor() {
    super(contactModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'contact settings');

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate contactInfo
    if (data.contactInfo && !Array.isArray(data.contactInfo)) {
      throw new ValidationError('ContactInfo must be an array');
    }

    if (data.contactInfo && data.contactInfo.length > 0) {
      data.contactInfo.forEach((info, index) => {
        if (!info.id || !info.type || !info.label || !info.value) {
          throw new ValidationError(`Invalid contactInfo at index ${index}: must have id, type, label, and value`);
        }
        if (!['address', 'phone', 'email', 'custom'].includes(info.type)) {
          throw new ValidationError(`Invalid contactInfo type at index ${index}: must be address, phone, email, or custom`);
        }
      });
    }

    // Validate formFields
    if (data.formFields && !Array.isArray(data.formFields)) {
      throw new ValidationError('FormFields must be an array');
    }

    if (data.formFields && data.formFields.length > 0) {
      data.formFields.forEach((field, index) => {
        if (!field.id || !field.name || !field.label || !field.type) {
          throw new ValidationError(`Invalid formField at index ${index}: must have id, name, label, and type`);
        }
        if (!['text', 'email', 'tel', 'textarea', 'select', 'number'].includes(field.type)) {
          throw new ValidationError(`Invalid formField type at index ${index}: must be text, email, tel, textarea, select, or number`);
        }
      });
    }

    // Validate contactInfoColumns (1-3)
    if (data.contactInfoColumns !== undefined && (typeof data.contactInfoColumns !== 'number' || data.contactInfoColumns < 1 || data.contactInfoColumns > 3)) {
      throw new ValidationError('ContactInfoColumns must be a number between 1 and 3');
    }

    return true;
  }
}

module.exports = new ContactService();

