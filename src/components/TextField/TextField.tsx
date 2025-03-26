import React from 'react'

import { Input, InputProps } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'

import cls from './textfield.module.css'

interface Props extends InputProps {
  label?: string
  initialValue?: string
  rules?: Rule[]
  maxLength?: number
}

export const Textfield: React.FC<Props> = ({
  disabled,
  label,
  name,
  rules,
  initialValue,
  placeholder,
  onChange,
  type,
  maxLength,
}) => {
  return (
    <FormItem
      className={`${cls.textField} ${disabled && cls.textField_disabled}`}
      label={label}
    >
      <FormItem
        name={name}
        rules={rules}
        initialValue={initialValue}
        noStyle
      >
        <Input
          className={cls.textField__input}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          type={type}
          maxLength={maxLength}
        />
      </FormItem>
    </FormItem>
  )
}