export const required = { required: true, message: 'Поле обязательно для заполнения' }

export const ProductRules = {
  Title: [
    required,
    { min: 2, message: 'Минимальная длина — 2 символа' },
    { max: 100, message: 'Максимальная длина — 100 символов' },
  ],
  Description: [
    required,
    { min: 2, message: 'Минимальная длина — 2 символа' },
    { max: 300, message: 'Максимальная длина — 300 символов' },
  ],
  Price: [
    required,
    { pattern: /^[0-9]+$/, message: 'Поле должно содержать только цифры' },
  ],
  Image: [
    required,
    { 
      pattern: /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|webp))$/, 
      message: 'Введите корректную ссылку на изображение (jpg, jpeg, png, gif, webp)', 
    },
  ],
}