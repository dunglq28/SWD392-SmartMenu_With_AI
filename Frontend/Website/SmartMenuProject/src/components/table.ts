import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  td: {
    fontSize: '15px',
  },
})

export const tableTheme = defineMultiStyleConfig({ baseStyle })