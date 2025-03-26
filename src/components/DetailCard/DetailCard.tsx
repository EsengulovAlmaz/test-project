import { ReactNode } from 'react'

import { Flex } from 'antd'

import cls from './DetailCard.module.css'

interface Props {
  title: string
  value?: string | ReactNode
}

export const DetailCard: React.FC<Props> = ({ title, value }) => {
  return (
    <Flex className={cls.detailCard}>
      <p className={cls.detailCard__title}>
        {title}
      </p>
      <p className={cls.detailCard__value}>
        {value}
      </p>
    </Flex>
  )
}
