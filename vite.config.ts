// @ts-check
import preactRefresh from '@prefresh/vite'
import { join } from 'path'
import type { UserConfig } from 'vite'

/**
 * @type { import('vite').UserConfig }
 */
const config: UserConfig = {
  alias: {
    '/@/': join(__dirname, 'src'),
  },
  jsx: {
    factory: 'h',
    fragment: 'Fragment',
  },
  plugins: [preactRefresh()],
}

export default config
