import { Select, Form } from 'antd'

import cls from './SelectField.module.css'

type SelectType = {
  data: { label: string; value: string }[];
  placeholder: string;
  text?: string;
  label?: string;
  name: string;
  style?: object;
  required?: boolean;
  selected?: string;
  onChange?: (value: string) => void;
  disabled?: boolean
};

export const SelectField = ({
  required,
  style,
  label,
  text,
  placeholder,
  data,
  onChange,
  selected,
  disabled,
  name,
}: SelectType) => {
  const isRequired = required !== undefined ? required : false

  return (
    <div className={cls.formSelectBlock} style={style}>
      <Form.Item
        className={cls.selectField}
        label={label}
        name={name}
        rules={[{ required: isRequired, message: 'Обязательное поле' }]}
      >
        {text && <p className={cls.selectField__description}>{text}</p>}

        <Select
          className={cls.selectField__select}
          placeholder={placeholder}
          options={data}
          onChange={onChange}
          value={selected}
          disabled={disabled || false}
        />
      </Form.Item>
    </div>
  )
}