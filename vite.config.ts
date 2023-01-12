// import { defineConfig } from 'vite'
import { createLogger, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*//* interface Logger {
  info(msg: string, options?: LogOptions): void
  warn(msg: string, options?: LogOptions): void
  warnOnce(msg: string, options?: LogOptions): void
  error(msg: string, options?: LogErrorOptions): void
  clearScreen(type: LogType): void
  hasErrorLogged(error: Error | RollupError): boolean
  hasWarned: boolean
} */

const logger = createLogger()

logger.warn = (msg, options) => {
  // Ignore empty CSS files warning
  if (msg.search('vite:css') > 0 && msg.search(' is empty') > 0) return
  logger.warn(msg, options)
}

type ViteConfigInput = {
  mode: string,
  command: string
}

// https://vitejs.dev/config/
export default (args: ViteConfigInput) => {
  const generateScopedName = args.mode === 'production' ? '[hash:base64:8]' : '[local]_[hash:base64:2]'
  return defineConfig({
    appType: 'mpa',
    build: {
      watch: {
        include: [ 'src/*', '*/**.html' ],
        exclude: [ 'dist/**', 'node_modules/**' ]
      }
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: generateScopedName,
        localsConvention: 'camelCase'
      },
      lightningcss: {
        cssModules: {
          dashedIdents: true,
        }
      }
    },
    customLogger: logger,
    esbuild: {
      target: 'ESNext'
    },
    logLevel: 'info',
    plugins: [react()],
  })
}
