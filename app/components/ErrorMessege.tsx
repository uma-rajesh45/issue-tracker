import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessege = ({children}:PropsWithChildren) => {
    if(!children) return null;
  return (
    <div>
        <Text as="p" color="red">{children}</Text>
    </div>
  )
}

export default ErrorMessege
