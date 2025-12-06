/**
 * Shared form field components
 */

import React from 'react';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import type { FormItemProps } from 'antd';
import { createFormRule } from '@/utils/validation';
import type { ValidationRule } from '@/types/common';

const { TextArea } = Input;
const { Option } = Select;

interface BaseFormItemProps extends Omit<FormItemProps, 'rules'> {
  validationRules?: ValidationRule[];
}

/**
 * Base form item with validation
 */
export const BaseFormItem: React.FC<BaseFormItemProps> = ({
  validationRules,
  children,
  ...props
}) => {
  const rules = validationRules?.map(createFormRule) || [];

  return (
    <Form.Item {...props} rules={rules.length > 0 ? rules : undefined}>
      {children}
    </Form.Item>
  );
};

/**
 * Text input field
 */
interface TextInputProps extends BaseFormItemProps {
  maxLength?: number;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  maxLength,
  placeholder,
  ...props
}) => {
  return (
    <BaseFormItem {...props}>
      <Input maxLength={maxLength} placeholder={placeholder} />
    </BaseFormItem>
  );
};

/**
 * Textarea field
 */
interface TextAreaInputProps extends BaseFormItemProps {
  maxLength?: number;
  rows?: number;
  placeholder?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  maxLength,
  rows = 4,
  placeholder,
  ...props
}) => {
  return (
    <BaseFormItem {...props}>
      <TextArea maxLength={maxLength} rows={rows} placeholder={placeholder} />
    </BaseFormItem>
  );
};

/**
 * Number input field
 */
interface NumberInputProps extends BaseFormItemProps {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  min,
  max,
  step,
  ...props
}) => {
  return (
    <BaseFormItem {...props}>
      <InputNumber min={min} max={max} step={step} style={{ width: '100%' }} />
    </BaseFormItem>
  );
};

/**
 * Select field
 */
interface SelectInputProps extends BaseFormItemProps {
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  placeholder,
  ...props
}) => {
  return (
    <BaseFormItem {...props}>
      <Select placeholder={placeholder}>
        {options.map((option) => (
          <Option key={String(option.value)} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </BaseFormItem>
  );
};

/**
 * Switch field
 */
export const SwitchInput: React.FC<BaseFormItemProps> = (props) => {
  return (
    <BaseFormItem {...props} valuePropName="checked">
      <Switch />
    </BaseFormItem>
  );
};

